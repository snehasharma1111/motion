import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";

const PrivateRoute = ({ children }) => {
	const { loggedIn } = useContext(GlobalContext);
	if (loggedIn) return children;
	else return <Navigate to="/login" />;
};

export default PrivateRoute;
