import { createContext } from "react";

const GlobalContext = createContext({
	loggedIn: "",
	setLoggedIn: () => {},
	user: {},
	setUser: () => {},
});

export default GlobalContext;
