import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./style.scss";
import { useContextData } from "./context/useContext";
import GlobalContext from "./context/GlobalContext";
import routes from "./routes";
import { Toaster, toast } from "react-hot-toast";
import { fetchLoggedInUser } from "./utils/api/auth";
import { useContext } from "react";

const Wrapper = () => {
	AOS.init();
	const { setUser, setLoggedIn } = useContext(GlobalContext);

	const verify = async () => {
		try {
			const res = await fetchLoggedInUser();
			setLoggedIn(true);
			setUser(res.user);
			toast.success(`Logged in as ${res.user.name ?? res.user.username}`);
		} catch (error) {
			console.error(error);
			toast.error("Unable to login");
			localStorage.removeItem("token");
		}
	};

	useEffect(() => {
		if (localStorage.getItem("token")) verify();
	}, []);

	return (
		<>
			<Routes>
				{routes.map((route, index) => {
					return (
						<Route
							key={index}
							path={route.path}
							element={route.component}
						/>
					);
				})}
			</Routes>
			<Toaster />
		</>
	);
};

const App = () => {
	const context = useContextData();
	return (
		<GlobalContext.Provider value={context}>
			<Wrapper />
		</GlobalContext.Provider>
	);
};

export default App;
