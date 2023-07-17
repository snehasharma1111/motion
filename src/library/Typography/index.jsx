import React from "react";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils";

const classes = stylesConfig(styles, "typography-");

const Typography = ({
	type = "body",
	variant = "medium",
	format = "regular",
	children,
	className,
	...rest
}) => {
	return (
		<span
			className={
				classes([type, variant, format].join("-")) + " " + className
			}
			{...rest}
		>
			{children}
		</span>
	);
};

export default Typography;
