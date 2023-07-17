import React from "react";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils";

const classes = stylesConfig(styles, "not-found");

const NotFound = () => {
	return (
		<main className={classes("")}>
			<h1>404</h1>
			<h2>Page Not Found</h2>
		</main>
	);
};

export default NotFound;
