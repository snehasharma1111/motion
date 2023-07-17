import { Router } from "express";
import { login, register } from "../controllers/auth.mjs";
import { validateEmail, validatePassword } from "../middleware/validate.mjs";

const router = Router();

router.post("/register", validateEmail, validatePassword, register);
router.post("/login", login);

export default router;
