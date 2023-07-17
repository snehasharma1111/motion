import { Router } from "express";
import { login, register, verifyUser } from "../controllers/auth.mjs";
import authMiddleware from "../middleware/auth.mjs";
import { validateEmail, validatePassword } from "../middleware/validate.mjs";

const router = Router();

router.post("/register", validateEmail, validatePassword, register);
router.post("/login", login);
router.get("/verify", authMiddleware, verifyUser);

export default router;
