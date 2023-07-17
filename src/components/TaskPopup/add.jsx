import React from "react";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils";
import Popup from "../../library/Popup";

const classes = stylesConfig(styles, "dashboard");

const TaskPopup = ({ onClose }) => {
	return (
		<Popup onClose={onClose} title="Create Task">
			<form className={classes("-form")}></form>
		</Popup>
	);
};

export default TaskPopup;
