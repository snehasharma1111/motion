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

const classes = stylesConfig(styles, "dashboard");

const Dashboard = () => {
	const navigate = useNavigate();
	const { logout } = useContext(GlobalContext);
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
					<img src={logo} alt="logo" onClick={() => navigate("/")} />
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
						{tasks.map((task) => (
							<Task {...task} key={task._id} />
						))}
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

export default Dashboard;
