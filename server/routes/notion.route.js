import express from 'express';
import { getNotionAuth, getNotionCallback } from '../controllers/notion.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get("/oauth", getNotionAuth);
router.get("/callback", getNotionCallback);

export default router;
