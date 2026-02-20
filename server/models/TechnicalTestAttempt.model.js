import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
    {
        questionId: { type: String, required: true },
        selectedAnswer: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
    },
    { _id: false },
);

const aiReviewSchema = new mongoose.Schema(
    {
        strengths: [String],
        weaknesses: [String],
        improvementAreas: [String],
        recommendations: [String],
        summary: { type: String, default: "" },
    },
    { _id: false },
);

const technicalTestAttemptSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TechnicalTest",
        required: true,
        index: true,
    },

    answers: [answerSchema],

    score: { type: Number, default: 0 },
    totalQuestions: { type: Number, required: true },
    percentage: { type: Number, default: 0 },

    aiReview: aiReviewSchema,

    startedAt: { type: Date, default: Date.now },
    submittedAt: { type: Date, default: Date.now },
    durationSeconds: { type: Number, default: 0 },
});

technicalTestAttemptSchema.index({ userId: 1, submittedAt: -1 });
technicalTestAttemptSchema.index({ testId: 1 });

export const TechnicalTestAttempt = mongoose.model(
    "TechnicalTestAttempt",
    technicalTestAttemptSchema,
);
