import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils";
import Input, { Textarea } from "../../library/Input";
import GlobalContext from "../../context/GlobalContext";
import Button from "../../library/Button";
import { AiOutlineLoading3Quarters, AiOutlineSave } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { fetchTask, patchTask } from "../../utils/api/tasks";
import {
	fetchTask as fetchTaskAsAdmin,
	patchTask as patchTaskAsAdmin,
} from "../../utils/api/admin";
import Typography from "../../library/Typography";
import AllUsers from "../AllUsers";
import Status from "../Status";
import { USER_ROLES } from "../../constants/enum.mjs";

const classes = stylesConfig(styles, "task-popup-form");

const EditTaskForm = ({ id, onSave }) => {
	const { user } = useContext(GlobalContext);
	const [fetching, setFetching] = useState(false);
	const [updating, setUpdating] = useState(false);
	const [fields, setFields] = useState({
		title: "",
		description: "",
		status: "pending",
		dueDate: Date.now(),
		assignee: user,
	});

	const getTask = async () => {
		try {
			setFetching(true);
			const res =
				user.role === USER_ROLES.ADMIN
					? await fetchTaskAsAdmin(id)
					: await fetchTask(id);
			setFields(res.data);
		} catch (error) {
			console.error(error);
			toast.error(error.message ?? "Something went wrong");
		} finally {
			setFetching(false);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFields((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e?.preventDefault();
		try {
			setUpdating(true);
			const res =
				user.role === USER_ROLES.ADMIN
					? await patchTaskAsAdmin(id, {
							...fields,
							assignee: fields.assignee._id,
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  })
					: await patchTask(id, {
							...fields,
							assignee: fields.assignee._id,
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  });
			toast.success("Updated");
			onSave(res.data);
		} catch (error) {
			console.error(error);
			toast.error(error.message ?? "Something went wrong");
		} finally {
			setUpdating(false);
		}
	};

	useEffect(() => {
		getTask();
	}, []);

	return fetching ? (
		<div className={classes("-loader")}>
			<AiOutlineLoading3Quarters />
		</div>
	) : (
		<form className={classes("")} onSubmit={handleSubmit}>
			<Input
				label="Title"
				placeholder="Title of the Task"
				name="title"
				id="new-task-title"
				required
				errorMessage="Please enter title"
				value={fields.title}
				autoFocus
				onChange={handleChange}
				style={{
					width: "100%",
				}}
			/>
			<div className={classes("-body")}>
				<Textarea
					label="Description"
					placeholder="Describe your task"
					name="description"
					id="new-task-description"
					value={fields.description}
					onChange={handleChange}
					style={{
						width: "100%",
						height: "calc(100% - 32px)",
					}}
				/>
				<div className={classes("-right")}>
					<div className={classes("-right-pane")}>
						<Status
							id={fields.status}
							dropdown
							onSelect={(selectedStatus) => {
								setFields((prev) => ({
									...prev,
									status: selectedStatus,
								}));
							}}
						/>
						<Typography type="body" variant="small">
							Assign to
						</Typography>
						<AllUsers
							currentUser={fields.assignee}
							setCurrentUser={(selectedUser) => {
								setFields((prev) => ({
									...prev,
									assignee: selectedUser,
								}));
							}}
						/>
						<Input
							placeholder="Due Date"
							label="Due Date"
							name="dueDate"
							type="date"
							value={fields.dueDate}
							onChange={handleChange}
						/>
					</div>
					<Button
						icon={<AiOutlineSave />}
						iconPosition="left"
						loading={updating}
						style={{
							width: "100%",
						}}
					>
						Update Task
					</Button>
				</div>
			</div>
		</form>
	);
};

export default EditTaskForm;
