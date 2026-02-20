import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
    getLeaderboard,
    getMyRank,
} from "../controllers/leaderboard.controller.js";

const router = express.Router();

router.get("/", verifyJWT, getLeaderboard);
router.get("/me", verifyJWT, getMyRank);

export default router;
