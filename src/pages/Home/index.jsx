import React from "react";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils";

const classes = stylesConfig(styles, "home");

const Home = () => {
	return <main className={classes("")}></main>;
};

export default Home;
