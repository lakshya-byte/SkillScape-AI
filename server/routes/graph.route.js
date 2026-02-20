import express from "express";
import {
  generateKnowledgeGraph,
  regenerateKnowledgeGraph,
  getGraphStats,
} from "../controllers/graph.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();


router.get("/generate/:userId", verifyJWT, generateKnowledgeGraph);
router.post("/regenerate/:userId", verifyJWT, regenerateKnowledgeGraph);
router.get("/stats", getGraphStats);

export default router;
