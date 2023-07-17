import React from "react";
import Typography from "../../library/Typography";
import Avatar from "../Avatar";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils";
import Status from "../Status";

const classes = stylesConfig(styles, "task");

const Task = ({ title, description, dueDate, status, assignee }) => {
	return (
		<div className={classes("")}>
			<div className={classes("-header")}>
				<Typography type="heading" variant="title-2">
					{title}
				</Typography>
				<Status
					id={status}
					dropdown
					onSelect={(status) => {
						alert(status);
					}}
				/>
			</div>
			{description ? (
				<div className={classes("-body")}>{description}</div>
			) : null}
			<div className={classes("-footer")}>
				<div className={classes("-assignee")}>
					<Avatar
						src={assignee.avatar}
						alt={assignee.name}
						size={24}
					/>
					<Typography type="body" variant="medium">
						{assignee.name}
					</Typography>
				</div>
				<div className={classes("-date")}>{dueDate}</div>
			</div>
		</div>
	);
};

export default Task;
