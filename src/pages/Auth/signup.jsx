import React, { useState } from "react";
import { stylesConfig } from "../../utils";
import styles from "./styles.module.scss";
import { logo } from "../../vectors";
import Typography from "../../library/Typography";
import Input from "../../library/Input";
import Button from "../../library/Button";
import { FiLogIn } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const classes = stylesConfig(styles, "auth");

const Signup = () => {
	const navigate = useNavigate();
	const [inputCred, setInputCred] = useState({
		name: "",
		email: "",
		username: "",
		password: "",
		avatar: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputCred((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e?.preventDefault();
		console.log(inputCred);
	};

	return (
		<main className={classes("")}>
			<img
				src={logo}
				alt="Motion"
				className={classes("-logo")}
				onClick={() => navigate("/")}
			/>
			<Typography type="heading" variant="display">
				Get Started with Motion
			</Typography>
			<form className={classes("-form")} onSubmit={handleSubmit}>
				<Input
					label="Full Name"
					name="name"
					type="text"
					id="login-name"
					placeholder="Enter your full name"
					errorMessage="Please enter your full name"
					value={inputCred.name}
					onChange={handleChange}
					required
					style={{
						width: "100%",
					}}
				/>
				<Input
					label="Email"
					name="email"
					type="text"
					id="login-email"
					placeholder="Enter your email"
					errorMessage="Please enter your email"
					value={inputCred.email}
					onChange={handleChange}
					required
					style={{
						width: "100%",
					}}
				/>
				<Input
					label="Username"
					name="username"
					type="text"
					id="login-username"
					placeholder="Enter your username"
					errorMessage="Please enter your username"
					value={inputCred.username}
					onChange={handleChange}
					required
					style={{
						width: "100%",
					}}
				/>
				<Input
					label="Password"
					name="password"
					type="password"
					id="login-password"
					placeholder="Your Password"
					errorMessage="Please enter your password"
					value={inputCred.password}
					onChange={handleChange}
					required
					style={{
						width: "100%",
					}}
				/>
				<Input
					label="Avatar"
					name="avatar"
					type="text"
					id="login-avatar"
					placeholder="Avatar Image URL"
					value={inputCred.avatar}
					onChange={handleChange}
					style={{
						width: "100%",
					}}
				/>
				<Button
					style={{
						width: "100%",
					}}
					type="submit"
					variant="filled"
					size="medium"
					icon={<FiLogIn />}
					iconPosition="right"
				>
					Login
				</Button>
			</form>
			<Typography type="body" variant="large">
				Already Have an account? <Link to="/login">Login</Link>
			</Typography>
		</main>
	);
};

export default Signup;
