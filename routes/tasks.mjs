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

router.use(authMiddleware);
router.get("/", getAllTasks);
router.post("/", createTask);
router.get("/:id", getTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
