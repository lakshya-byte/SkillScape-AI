import express from "express";
import {
  generateKnowledgeGraph,
  regenerateKnowledgeGraph,
} from "../controllers/graph.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/generate/:userId", verifyJWT, generateKnowledgeGraph);
router.post("/regenerate/:userId", verifyJWT, regenerateKnowledgeGraph);

export default router;
