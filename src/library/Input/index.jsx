import React from "react";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils";

const classNames = stylesConfig(styles);

export const Input = ({ error, errorMessage, className = "", ...props }) => {
	return (
		<div className={classNames("input__container")}>
			{props.label ? (
				<label
					className={classNames("input__label")}
					htmlFor={props.id}
				>
					{props.label}
				</label>
			) : null}
			<input
				className={
					classNames(
						"input",
						{ "input--error": error },
						{ "input--disabled": props.disabled }
					) + ` ${className}`
				}
				onInvalid={(e) => {
					e.currentTarget.setCustomValidity(errorMessage + "");
				}}
				onInput={(e) => {
					e.currentTarget.setCustomValidity("");
				}}
				title={error ? errorMessage : ""}
				{...props}
			/>
		</div>
	);
};

export const Textarea = ({ error, errorMessage, className, ...props }) => {
	return (
		<div className={classNames("input__container")}>
			{props.label ? (
				<label
					className={classNames("input__label")}
					htmlFor={props.id}
				>
					{props.label}
				</label>
			) : null}
			<textarea
				className={
					classNames(
						"input",
						{ "input--error": error },
						{ "input--disabled": props.disabled }
					) + ` ${className}`
				}
				onInvalid={(e) => {
					e.currentTarget.setCustomValidity(errorMessage + "");
				}}
				onInput={(e) => {
					e.currentTarget.setCustomValidity("");
				}}
				title={error ? errorMessage : ""}
				{...props}
			/>
		</div>
	);
};

export default Input;
