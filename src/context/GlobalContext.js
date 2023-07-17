import { createContext } from "react";

const GlobalContext = createContext({
	loggedIn: "",
	setLoggedIn: () => {},
	user: {},
	setUser: () => {},
	logout: () => {},
	allUsers: [],
	setAllUsers: () => {},
});

export default GlobalContext;
