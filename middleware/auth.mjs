import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/index.mjs";

const authMiddleware = (req, res, next) => {
	// get x-auth-token from header
	try {
		const token = req.headers["x-auth-token"] + "";
		if (!token) {
			return res
				.status(401)
				.json({ message: "No token, authorization denied" });
		}
		const decoded = jwt.verify(token, jwtSecret);
		req.user = decoded.user;
		return next();
	} catch (err) {
		console.error(err);
		return res.status(401).json({ message: "Token is not valid" });
	}
};

export default authMiddleware;
