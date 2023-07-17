import mongoose from "mongoose";
import { TASK_STATUS } from "../constants/enum.mjs";

const TaskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			default: "",
		},
		dueDate: {
			type: Date,
			default: Date.now,
		},
		status: {
			type: String,
			required: true,
			enum: Object.values(TASK_STATUS),
			default: TASK_STATUS.PENDING,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
		assignee: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
	},
	{
		timestamps: true,
	}
);

const Task = mongoose.model("task", TaskSchema);

export default Task;
