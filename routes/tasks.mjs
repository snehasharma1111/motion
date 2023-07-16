import { Router } from "express";
import { getAllTasks } from "../controllers/tasks.mjs";
import { isAdmin } from "../middleware/roles.mjs";

const router = Router();

router.get("/", isAdmin, getAllTasks);

export default router;
