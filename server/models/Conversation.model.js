import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["system", "user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const conversationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: "New Conversation",
    },
    messages: [messageSchema],
    lastActivity: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// Auto-generate title from first user message
conversationSchema.pre("save", function () {
  if (this.isNew && this.messages.length > 0) {
    const firstUserMsg = this.messages.find((m) => m.role === "user");
    if (firstUserMsg) {
      this.title =
        firstUserMsg.content.slice(0, 60) +
        (firstUserMsg.content.length > 60 ? "..." : "");
    }
  }
});

export const Conversation = mongoose.model("Conversation", conversationSchema);
