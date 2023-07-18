import React from "react";
import PrivateRoute from "./components/PrivateRoute";
import Tasks from "./pages/Tasks";
import Home from "./pages/Home";
import Signup from "./pages/Auth/signup";
import Login from "./pages/Auth/login";
import NotFound from "./pages/NotFound";

const protectedRoutes = [
	{
		path: "/tasks",
		component: <Tasks />,
	},
];

const nonProtectedRoutes = [
	{
		path: "/",
		component: <Home />,
	},
	{
		path: "/login",
		component: <Login />,
	},
	{
		path: "/signup",
		component: <Signup />,
	},
	{
		path: "*",
		component: <NotFound />,
	},
];

const routes = protectedRoutes
	.map((route) => ({
		...route,
		component: <PrivateRoute>{route.component}</PrivateRoute>,
	}))
	.concat(nonProtectedRoutes);

export default routes;
