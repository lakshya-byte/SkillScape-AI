import mongoose from "mongoose";

const resumeInsightSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        originalFilename: {
            type: String,
            required: true,
        },
        resumeFileUrl: {
            type: String,
            default: null,
        },
        extractedText: {
            type: String,
            required: true,
        },
        insights: {
            overallScore: { type: Number, default: 0 },
            strengths: [String],
            weaknesses: [String],
            skillGaps: [String],
            extractedSkills: [String],
            recommendedRoles: [String],
            improvementSuggestions: [String],
            careerRoadmap: [String],
        },
    },
    { timestamps: true },
);

export const ResumeInsight = mongoose.model("ResumeInsight", resumeInsightSchema);
