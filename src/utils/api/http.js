import axios from "axios";
import { backendBaseUrl } from "../../constants/variables";

export const http = axios.create({
	baseURL: backendBaseUrl,
	headers: {
		"Content-Type": "application/json",
	},
});

http.interceptors.request.use(
	async function (Config) {
		const config = Config;
		let token = localStorage?.getItem("token");
		try {
			if (token) {
				config.headers["x-auth-token"] = `${token}`;
			}
			return config;
		} catch (err) {
			return config;
		}
	},
	function (error) {
		return Promise.reject(error);
	}
);
