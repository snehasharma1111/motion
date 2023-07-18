import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { fetchAllTasks } from "../../utils/api/tasks.js";
import Task from "../../components/Task/index.jsx";
import Masonry from "../../layout/Masonry/index.jsx";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils";
import { FiLogOut } from "react-icons/fi";
import TaskPopup from "../../components/TaskPopup";
import Button from "../../library/Button/index.jsx";
import GlobalContext from "../../context/GlobalContext.js";
import { logo } from "../../vectors/index.js";
import { useNavigate } from "react-router-dom";
import Typography from "../../library/Typography/index.jsx";
import Avatar from "../../components/Avatar/index.jsx";

const classes = stylesConfig(styles, "dashboard");

const Tasks = () => {
	const navigate = useNavigate();
	const { user, logout } = useContext(GlobalContext);
	const [tasks, setTasks] = useState([]);
	const [showAddPopup, setShowAddPopup] = useState(false);

	const getAllTasks = async () => {
		try {
			const res = await fetchAllTasks();
			setTasks(res.data);
		} catch (error) {
			console.error(error);
			toast.error(error.message ?? "Something went wrong");
		}
	};

	useEffect(() => {
		getAllTasks();
	}, []);

	return (
		<>
			<main className={classes("")}>
				<header className={classes("-header")}>
					<img
						src={logo}
						alt="logo"
						className={classes("-header-logo")}
						onClick={() => navigate("/")}
					/>
					<div className={classes("-header-user")}>
						<Avatar
							src={user.avatar}
							alt={user.name ?? user.username}
							size={32}
						/>
						<Typography type="body" variant="large">
							{user.name ?? user.username}
						</Typography>
					</div>
					<Button
						variant="outlined"
						icon={<FiLogOut />}
						iconPosition="left"
						size="small"
						onClick={() => {
							logout();
						}}
					>
						Logout
					</Button>
				</header>
				{tasks.length > 0 ? (
					<Masonry xlg={4} lg={3} md={2} sm={1}>
						{tasks.map((task) =>
							task.createdBy._id === user._id ||
							task.assignee._id === user._id ? (
								<Task
									{...task}
									key={task._id}
									onUpdate={(updatedTask) => {
										setTasks((prev) =>
											prev.map((t) =>
												t._id === updatedTask._id
													? updatedTask
													: t
											)
										);
									}}
									onRemove={() => {
										setTasks((prev) =>
											prev.filter(
												(t) => t._id !== task._id
											)
										);
									}}
								/>
							) : null
						)}
					</Masonry>
				) : (
					<div className={classes("-empty")}>
						<Typography type="heading" variant="display">
							No Tasks Yet
						</Typography>
					</div>
				)}
				<button
					className={classes("-fab")}
					onClick={() => {
						setShowAddPopup(true);
					}}
				>
					<AiOutlineAppstoreAdd />
				</button>
			</main>
			{showAddPopup ? (
				<TaskPopup
					onClose={() => setShowAddPopup(false)}
					onSave={(task) => {
						setTasks((prev) => [...prev, task]);
						setShowAddPopup(false);
					}}
					category="new"
				/>
			) : null}
		</>
	);
};

export default Tasks;
