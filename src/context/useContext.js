import { useState } from "react";

export const useContextData = () => {
	// Global Authentication State
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState(null);

	const [allUsers, setAllUsers] = useState([]);

	const logout = () => {
		setLoggedIn(false);
		localStorage.removeItem("token");
	};

	return {
		loggedIn,
		setLoggedIn,
		user,
		setUser,
		logout,
		allUsers,
		setAllUsers,
	};
};
