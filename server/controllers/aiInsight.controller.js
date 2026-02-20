import fs from "fs";
import path from "path";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import mammoth from "mammoth";
import { ResumeInsight } from "../models/ResumeInsight.model.js";
import { User } from "../models/User.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

/* ──────────────────────────────────────────────────────────────────
 *  Helpers
 * ──────────────────────────────────────────────────────────────── */

/**
 * Extract plain text from a PDF file using pdf-parse.
 */
async function extractPdfText(filePath) {
    const pdfParse = (await import("pdf-parse/lib/pdf-parse.js")).default;
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);
    return data.text;
}

/**
 * Extract plain text from a DOCX file using mammoth.
 */
async function extractDocxText(filePath) {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
}

/**
 * Build the analysis prompt for the AI model.
 */
function buildPrompt(resumeText) {
    return `You are an expert career coach and resume analyst. Analyze the following resume text and generate deep intelligence insights.

Return your analysis as a valid JSON object with EXACTLY this structure (no markdown, no code fences, just raw JSON):

{
  "overallScore": <number 0-100>,
  "strengths": ["strength1", "strength2", ...],
  "weaknesses": ["weakness1", "weakness2", ...],
  "skillGaps": ["gap1", "gap2", ...],
  "extractedSkills": ["skill1", "skill2", ...],
  "recommendedRoles": ["role1", "role2", ...],
  "improvementSuggestions": ["suggestion1", "suggestion2", ...],
  "careerRoadmap": ["step1", "step2", ...]
}

Rules:
- overallScore: holistic 0-100 score evaluating the resume's competitiveness
- strengths: 4-6 concrete strengths observed
- weaknesses: 3-5 concrete weaknesses or red flags
- skillGaps: 3-5 trending/in-demand skills the candidate is missing
- extractedSkills: ALL technical and soft skills found in the resume
- recommendedRoles: 3-5 job roles that best match the candidate's profile
- improvementSuggestions: 4-6 actionable steps to improve the resume
- careerRoadmap: 4-6 sequential career progression steps with timeframes

RESUME TEXT:
"""
${resumeText.slice(0, 12000)}
"""

Respond ONLY with the JSON object.`;
}

/* ──────────────────────────────────────────────────────────────────
 *  Controllers
 * ──────────────────────────────────────────────────────────────── */

/**
 * POST /api/ai-insight
 * Upload a resume, extract text, analyze with AI, save & return insights.
 */
export const uploadAndAnalyze = async (req, res) => {
    let filePath = null;

    try {
        // ── 1. Validate upload ──────────────────────────────────────
        if (!req.file) {
            return res.status(400).json(new ApiError(400, "No resume file uploaded"));
        }

        filePath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase();

        // ── 2. Extract text ─────────────────────────────────────────
        let extractedText = "";

        if (ext === ".pdf") {
            extractedText = await extractPdfText(filePath);
        } else if (ext === ".docx") {
            extractedText = await extractDocxText(filePath);
        } else {
            return res
                .status(400)
                .json(new ApiError(400, "Unsupported file type. Use PDF or DOCX."));
        }

        if (!extractedText || extractedText.trim().length < 50) {
            return res
                .status(400)
                .json(
                    new ApiError(
                        400,
                        "Could not extract meaningful text from the resume. Please upload a text-based PDF or DOCX.",
                    ),
                );
        }

        // ── 3. AI Analysis via OpenAI ───────────────────────────────
        const llm = new ChatOpenAI({
            modelName: "gpt-4o-mini",
            temperature: 0.3,
            apiKey: process.env.OPENAI_URI,
        });

        const prompt = buildPrompt(extractedText);
        const response = await llm.invoke([new HumanMessage(prompt)]);

        // Parse the JSON from the AI response
        let insights;
        try {
            const raw = response.content
                .replace(/```json\n?/g, "")
                .replace(/```\n?/g, "")
                .trim();
            insights = JSON.parse(raw);
        } catch (parseErr) {
            console.error("AI response parse error:", parseErr);
            console.error("Raw response:", response.content);
            return res
                .status(500)
                .json(
                    new ApiError(
                        500,
                        "Failed to parse AI analysis. Please try again.",
                    ),
                );
        }

        // ── 4. Upload resume to Cloudinary ──────────────────────────
        let resumeUrl = null;
        try {
            const cloudinaryRes = await uploadOnCloudinary(filePath);
            if (cloudinaryRes?.secure_url) {
                resumeUrl = cloudinaryRes.secure_url;

                // Push URL into the user's certificate array
                await User.findByIdAndUpdate(req.user._id, {
                    $push: {
                        certificate: {
                            url: resumeUrl,
                            filename: req.file.originalname,
                        },
                    },
                });
            }
        } catch (cloudErr) {
            console.error("Cloudinary upload warning:", cloudErr);
            // Non-blocking — analysis continues even if upload fails
        }

        // ── 5. Save insights to MongoDB ─────────────────────────────
        const doc = await ResumeInsight.create({
            userId: req.user._id,
            originalFilename: req.file.originalname,
            resumeFileUrl: resumeUrl,
            extractedText: extractedText.slice(0, 50000), // cap storage
            insights: {
                overallScore: Number(insights.overallScore) || 0,
                strengths: insights.strengths || [],
                weaknesses: insights.weaknesses || [],
                skillGaps: insights.skillGaps || [],
                extractedSkills: insights.extractedSkills || [],
                recommendedRoles: insights.recommendedRoles || [],
                improvementSuggestions: insights.improvementSuggestions || [],
                careerRoadmap: insights.careerRoadmap || [],
            },
        });

        // ── 6. Cleanup temp file ────────────────────────────────────
        try {
            fs.unlinkSync(filePath);
        } catch (_) {
            /* ignore cleanup errors */
        }

        // ── 7. Respond ──────────────────────────────────────────────
        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    _id: doc._id,
                    originalFilename: doc.originalFilename,
                    resumeFileUrl: resumeUrl,
                    insights: doc.insights,
                    createdAt: doc.createdAt,
                },
                "Resume analyzed successfully",
            ),
        );
    } catch (error) {
        // Cleanup on error
        if (filePath) {
            try {
                fs.unlinkSync(filePath);
            } catch (_) { }
        }

        console.error("AI Insight error:", error);
        return res
            .status(500)
            .json(new ApiError(500, error.message || "Resume analysis failed"));
    }
};

/**
 * GET /api/ai-insight/history
 * Returns all past resume insights for the current user.
 */
export const getMyInsights = async (req, res) => {
    try {
        const insights = await ResumeInsight.find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .select("-extractedText")
            .limit(20);

        return res
            .status(200)
            .json(new ApiResponse(200, insights, "Insights history fetched"));
    } catch (error) {
        console.error("Insights history error:", error);
        return res.status(500).json(new ApiError(500, error.message));
    }
};
