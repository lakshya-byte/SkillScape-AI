import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  getOrCreateChat,
  getMyChats,
  getMessages,
} from "../controllers/chat.controller.js";

const router = Router();

router.use(verifyJWT);

router.get("/", getMyChats);
router.post("/:friendId", getOrCreateChat);
router.get("/:chatId/messages", getMessages);

export default router;
