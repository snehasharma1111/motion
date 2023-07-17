import { createContext } from "react";

const GlobalContext = createContext({
	loggedIn: "",
	setLoggedIn: () => {},
	user: {},
	setUser: () => {},
	logout: () => {},
});

export default GlobalContext;
