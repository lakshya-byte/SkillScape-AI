import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  createRoadmap,
  getRoadmaps,
  getRoadmap,
  streamRoadmap,
} from "../controllers/roadmap.controller.js";

const router = Router();

// All routes require authentication
router.use(verifyJWT);

router.post("/create", createRoadmap);
router.get("/", getRoadmaps);
router.get("/stream/:id", streamRoadmap);
router.get("/:id", getRoadmap);

export default router;
