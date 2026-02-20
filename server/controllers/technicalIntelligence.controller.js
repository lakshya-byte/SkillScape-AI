import { TechnicalTest } from "../models/TechnicalTest.model.js";
import { TechnicalTestAttempt } from "../models/TechnicalTestAttempt.model.js";
import { generateTest, generateReview } from "../services/aiTest.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

/* ──────────────────────────────────────────────────────────────────
 *  1. POST /generate-test — AI generates a new test
 * ──────────────────────────────────────────────────────────────── */
export const createTest = async (req, res) => {
    try {
        const { topic, difficulty = "intermediate", totalQuestions = 10 } = req.body;

        if (!topic) {
            return res.status(400).json(new ApiError(400, "Topic is required"));
        }

        const count = Math.min(Math.max(Number(totalQuestions) || 10, 1), 50);

        // AI generates questions
        const questions = await generateTest(topic, difficulty, count);

        if (!questions || questions.length === 0) {
            return res
                .status(500)
                .json(new ApiError(500, "AI failed to generate questions. Try again."));
        }

        // Save to DB
        const test = await TechnicalTest.create({
            userId: req.user._id,
            topic,
            difficulty,
            totalQuestions: questions.length,
            questions,
        });

        return res.status(201).json(
            new ApiResponse(201, test, "Test generated successfully"),
        );
    } catch (error) {
        console.error("createTest error:", error);
        return res.status(500).json(new ApiError(500, error.message));
    }
};

/* ──────────────────────────────────────────────────────────────────
 *  2. GET /tests — All tests by user
 * ──────────────────────────────────────────────────────────────── */
export const getUserTests = async (req, res) => {
    try {
        const tests = await TechnicalTest.find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .select("topic difficulty totalQuestions createdAt")
            .lean();

        return res
            .status(200)
            .json(new ApiResponse(200, tests, "Tests fetched"));
    } catch (error) {
        console.error("getUserTests error:", error);
        return res.status(500).json(new ApiError(500, error.message));
    }
};

/* ──────────────────────────────────────────────────────────────────
 *  3. GET /tests/:testId — Single test
 * ──────────────────────────────────────────────────────────────── */
export const getTestById = async (req, res) => {
    try {
        const test = await TechnicalTest.findOne({
            _id: req.params.testId,
            userId: req.user._id,
        }).lean();

        if (!test) {
            return res.status(404).json(new ApiError(404, "Test not found"));
        }

        return res
            .status(200)
            .json(new ApiResponse(200, test, "Test fetched"));
    } catch (error) {
        console.error("getTestById error:", error);
        return res.status(500).json(new ApiError(500, error.message));
    }
};

/* ──────────────────────────────────────────────────────────────────
 *  4. POST /submit — Submit test attempt
 * ──────────────────────────────────────────────────────────────── */
export const submitAttempt = async (req, res) => {
    try {
        const { testId, answers, startedAt } = req.body;

        if (!testId || !answers || !Array.isArray(answers)) {
            return res
                .status(400)
                .json(new ApiError(400, "testId and answers[] are required"));
        }

        // Fetch the test
        const test = await TechnicalTest.findOne({
            _id: testId,
            userId: req.user._id,
        });

        if (!test) {
            return res.status(404).json(new ApiError(404, "Test not found"));
        }

        // Score the answers
        const scoredAnswers = answers.map((a) => {
            const question = test.questions.find((q) => q.id === a.questionId);
            return {
                questionId: a.questionId,
                selectedAnswer: a.selectedAnswer,
                isCorrect: question
                    ? question.correctAnswer === a.selectedAnswer
                    : false,
            };
        });

        const score = scoredAnswers.filter((a) => a.isCorrect).length;
        const percentage = Math.round((score / test.totalQuestions) * 100);

        // AI review
        let aiReview = {
            strengths: [],
            weaknesses: [],
            improvementAreas: [],
            recommendations: [],
            summary: "",
        };

        try {
            aiReview = await generateReview(test, scoredAnswers, score, test.totalQuestions);
        } catch (aiErr) {
            console.error("AI Review generation failed:", aiErr);
            aiReview.summary = "AI review could not be generated at this time.";
        }

        // Calculate duration
        const now = new Date();
        const start = startedAt ? new Date(startedAt) : now;
        const durationSeconds = Math.max(
            0,
            Math.round((now.getTime() - start.getTime()) / 1000),
        );

        // Save attempt
        const attempt = await TechnicalTestAttempt.create({
            userId: req.user._id,
            testId: test._id,
            answers: scoredAnswers,
            score,
            totalQuestions: test.totalQuestions,
            percentage,
            aiReview,
            startedAt: start,
            submittedAt: now,
            durationSeconds,
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    attemptId: attempt._id,
                    score,
                    totalQuestions: test.totalQuestions,
                    percentage,
                    aiReview,
                    durationSeconds,
                },
                "Test submitted and reviewed",
            ),
        );
    } catch (error) {
        console.error("submitAttempt error:", error);
        return res.status(500).json(new ApiError(500, error.message));
    }
};

/* ──────────────────────────────────────────────────────────────────
 *  5. GET /attempts — User's attempt history
 * ──────────────────────────────────────────────────────────────── */
export const getUserAttempts = async (req, res) => {
    try {
        const attempts = await TechnicalTestAttempt.find({ userId: req.user._id })
            .sort({ submittedAt: -1 })
            .populate("testId", "topic difficulty totalQuestions")
            .select("testId score totalQuestions percentage submittedAt durationSeconds")
            .lean();

        return res
            .status(200)
            .json(new ApiResponse(200, attempts, "Attempts fetched"));
    } catch (error) {
        console.error("getUserAttempts error:", error);
        return res.status(500).json(new ApiError(500, error.message));
    }
};

/* ──────────────────────────────────────────────────────────────────
 *  6. GET /attempts/:attemptId — Single attempt detail
 * ──────────────────────────────────────────────────────────────── */
export const getAttemptById = async (req, res) => {
    try {
        const attempt = await TechnicalTestAttempt.findOne({
            _id: req.params.attemptId,
            userId: req.user._id,
        })
            .populate("testId")
            .lean();

        if (!attempt) {
            return res.status(404).json(new ApiError(404, "Attempt not found"));
        }

        return res
            .status(200)
            .json(new ApiResponse(200, attempt, "Attempt fetched"));
    } catch (error) {
        console.error("getAttemptById error:", error);
        return res.status(500).json(new ApiError(500, error.message));
    }
};
