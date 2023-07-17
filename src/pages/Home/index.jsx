import React, { useState } from "react";
import Button from "../../library/Button";
import Input, { Textarea } from "../../library/Input";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils";

const classes = stylesConfig(styles, "home");

const Home = () => {
	const [value, setValue] = useState("");
	return (
		<main className={classes("")}>
			<Button onClick={() => alert("Clicked")}>Click Me</Button>
			<Input
				placeholder="Name"
				required
				label="Full Name"
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
			/>
			<Textarea
				placeholder="Name"
				required
				label="Full Name"
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
			/>
		</main>
	);
};

export default Home;
