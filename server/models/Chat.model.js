import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    lastMessage: {
      content: { type: String, default: "" },
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      createdAt: { type: Date },
    },
  },
  { timestamps: true },
);

// Fast lookup: find all chats a user is in
chatSchema.index({ participants: 1 });

// Prevent duplicate chats between same pair
chatSchema.index(
  { participants: 1 },
  {
    unique: true,
    partialFilterExpression: { "participants.1": { $exists: true } },
  },
);

export const Chat = mongoose.model("Chat", chatSchema);
