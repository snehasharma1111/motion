import { http } from "./http";

export const fetchAllTasks = async () => {
	try {
		const res = await http.get("/tasks");
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error.response.data);
	}
};

export const patchTask = async (id, body) => {
	try {
		const res = await http.patch(`/tasks/${id}`, body);
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error.response.data);
	}
};
