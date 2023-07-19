import { Router } from "express";
import {
	createTask,
	deleteTask,
	getAllTasks,
	getTask,
	updateTask,
} from "../controllers/admin.mjs";
import { isAdmin } from "../middleware/roles.mjs";

const router = Router();

router.use(isAdmin);
router.post("/", getAllTasks);
router.post("/", createTask);
router.get("/:id", getTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
