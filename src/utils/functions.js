import { TASK_STATUS } from "../constants/enum.mjs";

export const getStatusLabel = (status) => {
	switch (status) {
		case TASK_STATUS.PENDING:
			return "To-Do";
		case TASK_STATUS.PROGRESS:
			return "In-Progress";
		case TASK_STATUS.DONE:
			return "Completed";
		default:
			return undefined;
	}
};

// debounce function for delaying function calls
export const debounce = (func, wait) => {
	let timeout;
	return (e) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func(e);
		}, wait);
	};
};
