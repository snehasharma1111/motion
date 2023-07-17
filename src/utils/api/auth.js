import { http } from "./http";

export const register = async (body) => {
	try {
		const res = await http.post("/auth/register", body);
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error.response.data);
	}
};

export const login = async (body) => {
	try {
		const res = await http.post("/auth/login", body);
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error.response.data);
	}
};

export const fetchLoggedInUser = async () => {
	try {
		const res = await http.get("/auth/verify");
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error.response.data);
	}
};
