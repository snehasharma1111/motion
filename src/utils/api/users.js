import { http } from "./http";

export const fetchAllUsers = async () => {
	try {
		const res = await http.get("/users");
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error.response.data);
	}
};
