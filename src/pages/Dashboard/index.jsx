import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Task from "../../components/Task/index.jsx";
import Masonry from "../../layout/Masonry/index.jsx";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils";
import { FiLogOut } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import TaskPopup from "../../components/TaskPopup";
import Button from "../../library/Button/index.jsx";
import GlobalContext from "../../context/GlobalContext.js";
import { logo } from "../../vectors/index.js";
import { useNavigate } from "react-router-dom";
import Typography from "../../library/Typography/index.jsx";
import Avatar from "../../components/Avatar/index.jsx";
import Input from "../../library/Input/index.jsx";
import { debounce } from "../../utils/functions.js";
import { fetchAllTasks } from "../../utils/api/admin.js";
import Status from "../../components/Status/index.jsx";
import AllUsers from "../../components/AllUsers/index.jsx";

const classes = stylesConfig(styles, "dashboard");

const Tasks = () => {
	const navigate = useNavigate();
	const { user, logout } = useContext(GlobalContext);
	const [tasks, setTasks] = useState([]);
	const [showAddPopup, setShowAddPopup] = useState(false);
	const [searchString, setSearchString] = useState("");
	const [filters, setFilters] = useState({
		text: "",
		status: "none",
		user: {
			_id: "",
			avatar: "https://raw.githubusercontent.com/snehasharma1111/planner/master/src/images/user.svg",
			name: "All Users",
		},
	});

	const handleSearch = (searchString) => {
		setFilters((prev) => ({
			...prev,
			text: searchString,
		}));
	};

	const getAllTasks = async () => {
		try {
			const res = await fetchAllTasks({
				...filters,
				user: filters.user._id,
			});
			setTasks(res.data);
		} catch (error) {
			console.error(error);
			toast.error(error.message ?? "Something went wrong");
		}
	};

	useEffect(() => {
		getAllTasks();
	}, [filters]);

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
				<div className={classes("-parameters")}>
					<div className={classes("-parameters-actions")}>
						<Status
							isFilter
							id={filters.status}
							dropdown
							onSelect={(status) =>
								setFilters((prev) => ({
									...prev,
									status: status,
								}))
							}
						/>
						<AllUsers
							isFilter
							currentUser={filters.user}
							setCurrentUser={(user) => {
								setFilters((prev) => ({
									...prev,
									user: user,
								}));
							}}
						/>
					</div>
					<Input
						value={searchString}
						icon={<BsSearch />}
						iconPosition="right"
						name="search-string"
						id="search-string"
						placeholder="Search by name or task title"
						onChange={(e) => {
							setSearchString(e.target.value);
							debounce(handleSearch(e.target.value), 500);
						}}
					/>
				</div>
				{tasks.length > 0 ? (
					<Masonry xlg={4} lg={3} md={2} sm={1}>
						{tasks.map((task) => (
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
										prev.filter((t) => t._id !== task._id)
									);
								}}
							/>
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

export default Tasks;
