import { Router } from "express";
import {
	createTask,
	getAllTasks,
	getTask,
	// updateTask,
} from "../controllers/tasks.mjs";
import authMiddleware from "../middleware/auth.mjs";

const router = Router();

router.get("/", authMiddleware, getAllTasks);
router.post("/", authMiddleware, createTask);
router.get("/:id", authMiddleware, getTask);
// router.patch("/:id", authMiddleware, updateTask);

export default router;
