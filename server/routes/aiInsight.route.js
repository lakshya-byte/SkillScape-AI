import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { resumeUpload } from "../middleware/resumeMulter.js";
import {
    uploadAndAnalyze,
    getMyInsights,
} from "../controllers/aiInsight.controller.js";

const router = express.Router();

// POST /api/ai-insight — upload resume + analyze
router.post("/", verifyJWT, resumeUpload.single("resume"), uploadAndAnalyze);

// GET /api/ai-insight/history — past results
router.get("/history", verifyJWT, getMyInsights);

export default router;
