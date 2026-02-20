import mongoose from "mongoose";

const roadmapNodeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    level: { type: Number, default: 0 },
    position: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
    },
  },
  { _id: false },
);

const roadmapEdgeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    source: { type: String, required: true },
    target: { type: String, required: true },
  },
  { _id: false },
);

const roadmapSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    prompt: { type: String, required: true },
    graph: {
      nodes: [roadmapNodeSchema],
      edges: [roadmapEdgeSchema],
    },
    status: {
      type: String,
      enum: ["generating", "completed"],
      default: "generating",
    },
    completedNodeIds: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

export const Roadmap = mongoose.model("Roadmap", roadmapSchema);
