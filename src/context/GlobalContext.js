import { createContext } from "react";

const GlobalContext = createContext({
	breakpoint: () => {},
	isAuthenticated: "",
	setIsAuthenticated: () => {},
	axiosInstance: undefined,
});

export default GlobalContext;
