import { RESPONSE_MESSAGES, TASK_STATUS } from "../constants/enum.mjs";
import Task from "../models/Task.mjs";
import User from "../models/User.mjs";
import { createUpdateTask } from "../validations/tasks.mjs";

export const getAllTasks = async (req, res) => {
	try {
		const tasks = await Task.find({ createdBy: req.user.id })
			.sort({
				date: -1,
			})
			.populate({
				path: "createdBy assignee",
				select: "name email avatar",
			})
			.select("title description dueDate status createdBy assignee");
		return res
			.status(200)
			.json({ message: RESPONSE_MESSAGES.SUCCESS, data: tasks });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const getTask = async (req, res) => {
	try {
		const task = await Task.findById(req.params.id)
			.populate({
				path: "createdBy assignee",
				select: "name email avatar",
			})
			.select("title description dueDate status createdBy assignee");
		if (!task) return res.status(404).json({ message: "Task not found" });
		if (
			task.createdBy._id.toString() !== req.user.id &&
			task.assignee._id.toString() !== req.user.id
		)
			return res.status(401).json({ message: RESPONSE_MESSAGES.FAILED });
		return res.status(200).json({
			message: RESPONSE_MESSAGES.SUCCESS,
			data: task,
		});
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Task not found" });
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const createTask = async (req, res) => {
	try {
		const { title, description, dueDate, status, assignee } = req.body;
		const newTaskBody = {
			title,
			description,
			dueDate,
			status,
			assignee,
			createdBy: req.user.id,
		};
		if (!assignee) newTaskBody.assignee = req.user.id;
		const foundAssignee = await User.findById(newTaskBody.assignee);
		if (!foundAssignee)
			return res.status(404).json({ message: "Assignee not found" });
		const validation = await createUpdateTask(newTaskBody)
			.then(() => RESPONSE_MESSAGES.SUCCESS)
			.catch((err) => err.message);
		if (validation !== RESPONSE_MESSAGES.SUCCESS)
			return res.status(400).json({ message: validation });
		const newTask = new Task(newTaskBody);
		const createdTask = await newTask.save();
		const taskToSend = await Task.findById(createdTask._id)
			.populate({
				path: "createdBy assignee",
				select: "name email avatar",
			})
			.select("title description dueDate status");
		return res.status(201).json({
			message: RESPONSE_MESSAGES.SUCCESS,
			data: taskToSend,
		});
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "User not found" });
		return res.status(500).json({
			message: RESPONSE_MESSAGES.SERVER_ERROR,
		});
	}
};
