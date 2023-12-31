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

export const fetchTask = async (id) => {
	try {
		const res = await http.get(`/tasks/${id}`);
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error.response.data);
	}
};

export const postTask = async (body) => {
	try {
		const res = await http.post("/tasks", body);
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

export const deleteTask = async (id) => {
	try {
		const res = await http.delete(`/tasks/${id}`);
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error.response.data);
	}
};
