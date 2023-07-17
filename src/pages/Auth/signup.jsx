import React, { useContext, useEffect, useState } from "react";
import { stylesConfig } from "../../utils";
import styles from "./styles.module.scss";
import { logo } from "../../vectors";
import Typography from "../../library/Typography";
import Input from "../../library/Input";
import Button from "../../library/Button";
import { FiLogIn } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import regex from "../../constants/regex.mjs";
import { register } from "../../utils/api/auth";
import GlobalContext from "../../context/GlobalContext";

const classes = stylesConfig(styles, "auth");

const Signup = () => {
	const navigate = useNavigate();
	const { loggedIn } = useContext(GlobalContext);
	const [loading, setLoading] = useState(false);
	const [inputCred, setInputCred] = useState({
		name: "",
		email: "",
		username: "",
		password: "",
		confirmPassword: "",
		avatar: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputCred((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e?.preventDefault();
		try {
			setLoading(true);
			if (inputCred.password !== inputCred.confirmPassword) {
				return toast.error("Passwords do not match");
			}
			await register(inputCred);
			navigate("/login");
		} catch (error) {
			console.error();
			toast.error(error.message ?? "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (loggedIn) navigate("/dashboard");
	}, [loggedIn]);

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
				<div className={classes("-form-group")}>
					<Input
						label="Email"
						name="email"
						type="email"
						id="login-email"
						placeholder="Enter your email"
						error={
							inputCred.email.length > 0 &&
							!regex.email.test(inputCred.email)
						}
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
				</div>
				<div className={classes("-form-group")}>
					<Input
						label="Password"
						name="password"
						type="password"
						id="login-password"
						placeholder="Your Password"
						errorMessage={
							inputCred.password.length === 0
								? "Please enter your password"
								: "password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character"
						}
						error={
							inputCred.password.length > 0 &&
							!regex.password.test(inputCred.password)
						}
						value={inputCred.password}
						onChange={handleChange}
						required
						style={{
							width: "100%",
						}}
					/>
					<Input
						label="Confirm Password"
						name="confirmPassword"
						type="password"
						id="login-confirm-password"
						placeholder="Confirm your Password"
						errorMessage="Please enter your password again"
						error={
							inputCred.confirmPassword.length > 0 &&
							inputCred.password !== inputCred.confirmPassword
						}
						value={inputCred.confirmPassword}
						onChange={handleChange}
						required
						style={{
							width: "100%",
						}}
					/>
				</div>
				<Input
					label="Avatar"
					name="avatar"
					type="url"
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
					loading={loading}
					type="submit"
					variant="filled"
					size="medium"
					icon={<FiLogIn />}
					iconPosition="right"
				>
					Signup
				</Button>
			</form>
			<Typography type="body" variant="large">
				Already Have an account? <Link to="/login">Login</Link>
			</Typography>
		</main>
	);
};

export default Signup;
