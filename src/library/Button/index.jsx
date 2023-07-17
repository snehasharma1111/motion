import { stylesConfig } from "../../utils";
import styles from "./styles.module.scss";
import React from "react";

const classNames = stylesConfig(styles);

const BUTON_SIZES = {
	small: "btn--small",
	medium: "btn--medium",
	large: "btn--large",
};

const BUTTON_VARIANTS = {
	filled: "btn--filled",
	outlined: "btn--outlined",
};

export const Button = ({
	children,
	className,
	size = "medium",
	variant = "filled",
	loading = false,
	icon,
	iconPosition = "left",
	...props
}) => {
	return (
		<button
			className={[
				classNames(
					"btn",
					BUTON_SIZES[size],
					BUTTON_VARIANTS[variant],
					{ "btn--loading": loading },
					{ "btn--disabled": props.disabled }
				),
				className,
			].join(" ")}
			disabled={props.disabled || loading}
			{...props}
		>
			{loading ? (
				<div className={classNames("btn__loader")}></div>
			) : (
				<>
					{icon && iconPosition === "left" ? (
						<div
							className={classNames(
								"btn__icon",
								"btn__icon--left"
							)}
						>
							{icon}
						</div>
					) : null}
					{children}
					{icon && iconPosition === "right" ? (
						<div
							className={classNames(
								"btn__icon",
								"btn__icon--right"
							)}
						>
							{icon}
						</div>
					) : null}
				</>
			)}
		</button>
	);
};

export default Button;
