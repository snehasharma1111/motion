import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { fetchAllTasks } from "../../utils/api/tasks.js";
import Task from "../../components/Task/index.jsx";
import Masonry from "../../layout/Masonry/index.jsx";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils";
import TaskPopup from "../../components/TaskPopup/add.jsx";

const classes = stylesConfig(styles, "dashboard");

const Dashboard = () => {
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
				<Masonry xlg={4} lg={3} md={2} sm={1}>
					{tasks.map((task) => (
						<Task {...task} key={task._id} />
					))}
				</Masonry>
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
				<TaskPopup onClose={() => setShowAddPopup(false)} />
			) : null}
		</>
	);
};

export default Dashboard;
