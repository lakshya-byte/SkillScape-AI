import express from 'express';
import { getAllMyRepos,getGithubAuth,getGithubCallback } from '../controllers/github.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get("/getAllMyRepos",verifyJWT, getAllMyRepos);
router.get("/oauth",getGithubAuth)
router.get("/callback",getGithubCallback)

export default router
