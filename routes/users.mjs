import { Router } from "express";
import authMiddleware from "../middleware/auth.mjs";
import { getAllUsers } from "../controllers/users.mjs";

const router = Router();

router.get("/", authMiddleware, getAllUsers);

export default router;
