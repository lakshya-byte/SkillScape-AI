import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { chat, getConversations } from "../controllers/agent.controller.js";

const router = express.Router();

router.post("/chat", verifyJWT, chat);
router.get("/history", verifyJWT, getConversations);

export default router;
