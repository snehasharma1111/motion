import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils";
import Input, { Textarea } from "../../library/Input";
import GlobalContext from "../../context/GlobalContext";
import Button from "../../library/Button";
import { AiOutlineSave } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { postTask } from "../../utils/api/tasks";
import Avatar from "../Avatar";
import Typography from "../../library/Typography";

const classes = stylesConfig(styles, "task-popup-form");

const AddTaskForm = ({ onSave }) => {
	const { user } = useContext(GlobalContext);
	const [adding, setAdding] = useState(false);
	const [fields, setFields] = useState({
		title: "",
		description: "",
		status: "pending",
		dueDate: Date.now(),
		assignee: user,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFields((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e?.preventDefault();
		try {
			setAdding(true);
			const res = await postTask({
				...fields,
				assignee: user._id,
			});
			toast.success("Added task successfully");
			onSave(res.data);
		} catch (error) {
			console.error(error);
			toast.error(error.message ?? "Something went wrong");
		} finally {
			setAdding(false);
		}
	};

	return (
		<form className={classes("")} onSubmit={handleSubmit}>
			<Input
				label="Title"
				placeholder="Title of the Task"
				name="title"
				id="new-task-title"
				required
				value={fields.title}
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
						<div className={classes("-assignee")}>
							<Avatar
								src={fields.assignee.avatar}
								alt={fields.assignee.name}
								size={24}
							/>
							<Typography type="body" variant="medium">
								{fields.assignee.name}
							</Typography>
						</div>
					</div>
					<Button
						icon={<AiOutlineSave />}
						iconPosition="left"
						loading={adding}
						style={{
							width: "100%",
						}}
					>
						Create Task
					</Button>
				</div>
			</div>
		</form>
	);
};

export default AddTaskForm;
