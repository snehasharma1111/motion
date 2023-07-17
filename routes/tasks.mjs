import { Router } from "express";
import {
	createTask,
	deleteTask,
	getAllTasks,
	getTask,
	updateTask,
} from "../controllers/tasks.mjs";
import authMiddleware from "../middleware/auth.mjs";

const router = Router();

router.get("/", authMiddleware, getAllTasks);
router.post("/", authMiddleware, createTask);
router.get("/:id", authMiddleware, getTask);
router.patch("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

export default router;
