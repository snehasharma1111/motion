import React, { useContext, useState } from "react";
import Typography from "../../library/Typography";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils";
import Status from "../Status";
import { toast } from "react-hot-toast";
import { deleteTask, patchTask } from "../../utils/api/tasks";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import AllUsers from "../AllUsers";
import { useConfirmationModal } from "../Confirmation";
import { getStatusLabel } from "../../utils/functions";
import moment from "moment";
import TaskPopup from "../TaskPopup";
import GlobalContext from "../../context/GlobalContext";

const classes = stylesConfig(styles, "task");

const Task = (props) => {
	const { user } = useContext(GlobalContext);
	const [showUpdatePopup, setShowUpdatePopup] = useState(false);
	const [task, setTask] = useState({
		_id: props?._id,
		title: props?.title,
		description: props?.description,
		dueDate: props?.dueDate,
		status: props?.status,
		createdBy: props?.createdBy,
		assignee: props?.assignee,
	});

	const updateTask = async (body) => {
		try {
			const res = await patchTask(task._id, body);
			setTask((prev) => ({
				...prev,
				...res.data,
			}));
			props.onUpdate({
				...task,
				...res.data,
			});
		} catch (error) {
			console.error(error);
			toast.error(error.message ?? "Something went wrong");
		}
	};

	const removeTask = async () => {
		try {
			await deleteTask(task._id);
			props.onRemove();
		} catch (error) {
			console.error(error);
			toast.error(error.message ?? "Something went wrong");
		}
	};

	const removeTaskConfirmation = useConfirmationModal(
		`Delete Task ${task.title}`,
		`Are you sure you want to delete task ${task.title}. This actions can't be undone.`,
		() =>
			toast.promise(removeTask(), {
				loading: "Deleting task",
				success: "Task deleted",
				error: "An error occured",
			}),
		() => {}
	);

	return (
		<>
			<div className={classes("")}>
				<div className={classes("-header")}>
					<Typography type="heading" variant="title-2">
						{task.title}
					</Typography>
					<div className={classes("-actions")}>
						<button
							className={classes("-actions-btn")}
							onClick={() => setShowUpdatePopup(true)}
						>
							<AiOutlineEdit />
						</button>
						<Status
							id={task.status}
							dropdown
							onSelect={(status) => {
								toast.promise(
									updateTask({
										status: status,
									}),
									{
										loading: `Marking ${
											task.title
										} as ${getStatusLabel(status)}`,
										success: "Updated",
										error: "Couldn't update status",
									}
								);
							}}
						/>
						{task.createdBy._id === user._id ? (
							<button
								className={classes("-actions-btn")}
								onClick={() =>
									removeTaskConfirmation.openPopup()
								}
							>
								<AiOutlineDelete />
							</button>
						) : null}
					</div>
				</div>
				{task.description ? (
					<div className={classes("-body")}>{task.description}</div>
				) : null}
				<div className={classes("-footer")}>
					<div className={classes("-assignee")}>
						<AllUsers
							currentUser={task.assignee}
							setCurrentUser={(user) => {
								toast.promise(
									updateTask({
										assignee: user._id,
									}),
									{
										loading: `Assigning ${task.title} to ${
											user.name ?? user.username
										}`,
										success: "Updated",
										error: "Couldn't update assignee",
									}
								);
							}}
						/>
					</div>
					<div className={classes("-date")}>
						{moment(task.dueDate).format("DD-MM-YYYY")}
					</div>
				</div>
			</div>
			{removeTaskConfirmation.showPopup
				? removeTaskConfirmation.Modal
				: null}
			{showUpdatePopup ? (
				<TaskPopup
					category={task._id}
					onSave={(task) => setTask(task)}
					onClose={() => setShowUpdatePopup(false)}
				/>
			) : null}
		</>
	);
};

export default Task;
