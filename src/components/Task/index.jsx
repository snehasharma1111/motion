import React, { useState } from "react";
import Typography from "../../library/Typography";
import Avatar from "../Avatar";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils";
import Status from "../Status";
import { toast } from "react-hot-toast";
import { patchTask } from "../../utils/api/tasks";
import { AiOutlineEdit } from "react-icons/ai";
import AllUsers from "../AllUsers";

const classes = stylesConfig(styles, "task");

const Task = (props) => {
	const [task, setTask] = useState({
		_id: props?._id,
		title: props?.title,
		description: props?.description,
		dueDate: props?.dueDate,
		status: props?.status,
		assignee: props?.assignee,
	});

	const updateTask = async (body) => {
		try {
			const res = await patchTask(task._id, body);
			setTask((prev) => ({
				...prev,
				...res.data,
			}));
		} catch (error) {
			console.error(error);
			toast.error(error.message ?? "Something went wrong");
		}
	};

	return (
		<div className={classes("")}>
			<div className={classes("-header")}>
				<Typography type="heading" variant="title-2">
					{task.title}
				</Typography>
				<div className={classes("-actions")}>
					<button className={classes("-actions-btn")}>
						<AiOutlineEdit />
					</button>
					<Status
						id={task.status}
						dropdown
						onSelect={(status) => {
							updateTask({
								status: status,
							});
						}}
					/>
				</div>
			</div>
			{task.description ? (
				<div className={classes("-body")}>{task.description}</div>
			) : null}
			<div className={classes("-footer")}>
				<div className={classes("-assignee")}>
					<AllUsers
						currentUser={task.assignee}
						onSelect={(user) => {
							updateTask({
								assignee: user._id,
							});
						}}
					/>
				</div>
				<div className={classes("-date")}>{task.dueDate}</div>
			</div>
		</div>
	);
};

export default Task;
