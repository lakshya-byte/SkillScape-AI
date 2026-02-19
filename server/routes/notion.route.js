import express from 'express';
import { getNotionAuth, getNotionCallback } from '../controllers/notion.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get("/oauth",verifyJWT, getNotionAuth);
router.get("/callback",verifyJWT, getNotionCallback);

export default router;
