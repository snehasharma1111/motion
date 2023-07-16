import { jwtSecret } from "../config/index.mjs";
import { USER_ROLES } from "../constants/enum.mjs";
import { getUserById } from "../services/user.mjs";
import jwt from "jsonwebtoken";

const isAdmin = async (req, res, next) => {
	try {
		const token = req.headers["x-auth-token"] + "";
		if (!token) {
			return res
				.status(401)
				.json({ message: "No token, authorization denied" });
		}
		const decoded = jwt.verify(token, jwtSecret);
		const user = await getUserById(decoded.user.id);
		if (user.role !== USER_ROLES.ADMIN) {
			return res.status(401).json({ message: "Not authorized" });
		}
		req.user = decoded.user;
		return next(req, res);
	} catch (error) {
		return res.status(401).json({ message: "Token is not valid" });
	}
};

export { isAdmin };
