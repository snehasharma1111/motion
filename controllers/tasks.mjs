import { RESPONSE_MESSAGES } from "../constants/enum.mjs";
import Task from "../models/Task.mjs";

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        return res.status(200).json({message: RESPONSE_MESSAGES.SUCCESS, data: tasks});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: RESPONSE_MESSAGES.SERVER_ERROR});
    }
};
