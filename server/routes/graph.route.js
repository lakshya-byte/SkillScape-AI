import express from "express";
import { generateKnowledgeGraph } from "../controllers/graph.controller.js";

const router = express.Router();

router.get("/generate/:userId", generateKnowledgeGraph);

export default router;