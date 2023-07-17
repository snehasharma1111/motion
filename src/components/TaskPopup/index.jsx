import React from "react";
import Popup from "../../library/Popup";
import AddTaskForm from "./new";

const TaskPopup = ({ category = "new", onSave, onClose }) => {
	return (
		<Popup onClose={onClose} title="Create Task" width="60%" height="80%">
			{category === "new" ? <AddTaskForm onSave={onSave} /> : null}
		</Popup>
	);
};

export default TaskPopup;
