import React from "react";
import Button from "../../components/Button";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils";

const classes = stylesConfig(styles, "home");

const Home = () => {
	return (
		<main className={classes("")}>
			<Button onClick={() => alert("Clicked")}>Click Me</Button>
		</main>
	);
};

export default Home;
