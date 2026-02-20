import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        id: { type: String, required: true },
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: String, required: true },
        explanation: { type: String, default: "" },
        difficulty: { type: String, default: "intermediate" },
        tags: [String],
    },
    { _id: false },
);

const technicalTestSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        topic: { type: String, required: true },
        difficulty: {
            type: String,
            enum: ["beginner", "intermediate", "advanced", "expert"],
            default: "intermediate",
        },
        totalQuestions: { type: Number, required: true },
        questions: [questionSchema],
    },
    { timestamps: true },
);

technicalTestSchema.index({ userId: 1, createdAt: -1 });

export const TechnicalTest = mongoose.model("TechnicalTest", technicalTestSchema);
