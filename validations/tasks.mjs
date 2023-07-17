import { TASK_STATUS } from "../constants/enum.mjs";

export const createUpdateTask = async (task) => {
	if (!task.title) throw new Error("Title is required");
	if (!task.status || !Object.values(TASK_STATUS).includes(task.status))
		throw new Error("Please assign a valid status");
	if (!task.createdBy) throw new Error("No author found");
};
