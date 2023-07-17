import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/index.mjs";
import { getUserById } from "../services/user.mjs";

const authMiddleware = async (req, res, next) => {
	// get x-auth-token from header
	try {
		const token = req.headers["x-auth-token"] + "";
		if (!token) {
			return res.status(401).json({ message: "Login to continue" });
		}
		const decoded = jwt.verify(token, jwtSecret);
		const user = await getUserById(decoded.user.id);
		if (!user)
			return res.status(401).json({ message: "Login to continue" });
		req.user = decoded.user;
		return next();
	} catch (err) {
		console.error(err);
		return res.status(401).json({ message: "Login again to continue" });
	}
};

export default authMiddleware;
