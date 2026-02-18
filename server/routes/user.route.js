import express from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { getMyself, updateUser } from "../controllers/user.controller.js"; 

const router = express.Router();

router.get('/me',verifyJWT,getMyself);
router.post('/updateUser',verifyJWT,updateUser);

export default router

