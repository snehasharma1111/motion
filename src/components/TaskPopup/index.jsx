import React from "react";
import Popup from "../../library/Popup";
import AddTaskForm from "./new";
import EditTaskForm from "./edit";

const TaskPopup = ({ category = "new", onSave, onClose }) => {
	return (
		<Popup
			onClose={onClose}
			title="Create Task"
			width="800px"
			height="480px"
		>
			{category === "new" ? (
				<AddTaskForm onSave={onSave} />
			) : (
				<EditTaskForm id={category} onSave={onSave} />
			)}
		</Popup>
	);
};

export default TaskPopup;
