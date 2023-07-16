import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";

const authMiddleware = (next) => (req, res) => {
	// get x-auth-token from header
	const token = req.headers["x-auth-token"] + "";
	if (!token) {
		return res
			.status(401)
			.json({ message: "No token, authorization denied" });
	}
	try {
		const decoded = jwt.verify(token, jwtSecret);
		req.user = decoded.user;
		return next(req, res);
	} catch (err) {
		return res.status(401).json({ message: "Token is not valid" });
	}
};

export default authMiddleware;
