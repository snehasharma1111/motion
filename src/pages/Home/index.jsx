import React from "react";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils";
import Typography from "../../library/Typography";
import Button from "../../library/Button";
import { AiOutlineArrowRight } from "react-icons/ai";
import { homeHero } from "../../images";
import { useNavigate } from "react-router-dom";

const classes = stylesConfig(styles, "home");

const Home = () => {
	const navigate = useNavigate();
	return (
		<main className={classes("")}>
			<Typography
				type="heading"
				variant="display"
				style={{
					fontSize: "64px",
				}}
			>
				Motion ✨
			</Typography>
			<Typography type="heading" variant="subtitle">
				Mange all your tasks in one place and keep flowing throught the
				day
			</Typography>
			<Button
				size="large"
				icon={<AiOutlineArrowRight />}
				iconPosition="right"
				onClick={() => {
					navigate("/login");
				}}
			>
				Get Started Today
			</Button>
			<img src={homeHero} alt="home-hero" />
		</main>
	);
};

export default Home;
