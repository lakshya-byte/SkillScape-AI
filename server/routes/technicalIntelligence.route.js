import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
    createTest,
    getUserTests,
    getTestById,
    submitAttempt,
    getUserAttempts,
    getAttemptById,
} from "../controllers/technicalIntelligence.controller.js";

const router = express.Router();

router.post("/generate-test", verifyJWT, createTest);
router.get("/tests", verifyJWT, getUserTests);
router.get("/tests/:testId", verifyJWT, getTestById);
router.post("/submit", verifyJWT, submitAttempt);
router.get("/attempts", verifyJWT, getUserAttempts);
router.get("/attempts/:attemptId", verifyJWT, getAttemptById);

export default router;
