import { http } from "./http";

export const fetchAllTasks = async (body) => {
	try {
		const res = await http.post("/admin/tasks", body);
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error.response.data);
	}
};

export const fetchTask = async (id) => {
	try {
		const res = await http.get(`/admin/tasks/${id}`);
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error.response.data);
	}
};

export const postTask = async (body) => {
	try {
		const res = await http.post("/admin/tasks", body);
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error.response.data);
	}
};

export const patchTask = async (id, body) => {
	try {
		const res = await http.patch(`/admin/tasks/${id}`, body);
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error.response.data);
	}
};

export const deleteTask = async (id) => {
	try {
		const res = await http.delete(`/admin/tasks/${id}`);
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error.response.data);
	}
};
