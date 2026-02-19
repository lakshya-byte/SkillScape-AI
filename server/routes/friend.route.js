import express from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import {
    sendRequest,
    acceptRequest,
    rejectRequest,
    cancelRequest,
    unfriend,
    getMyFriends,
    getPendingRequests,
    searchPeople
} from '../controllers/friend.controller.js';

const router = express.Router();

router.get("/search", verifyJWT, searchPeople);
router.post("/request/:userId", verifyJWT, sendRequest);
router.patch("/accept/:requestId", verifyJWT, acceptRequest);
router.patch("/reject/:requestId", verifyJWT, rejectRequest);
router.delete("/cancel/:requestId", verifyJWT, cancelRequest);
router.delete("/unfriend/:userId", verifyJWT, unfriend);
router.get("/", verifyJWT, getMyFriends);
router.get("/pending", verifyJWT, getPendingRequests);

export default router;
