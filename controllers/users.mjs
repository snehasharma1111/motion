import { RESPONSE_MESSAGES } from "../constants/enum.mjs";
import User from "../models/User.mjs";

export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find()
			.sort({
				name: 1,
			})
			.select("name email username avatar");
		return res.status(200).json({
			message: RESPONSE_MESSAGES.SUCCESS,
			data: users,
		});
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};
