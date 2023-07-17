import styles from "./styles.module.scss";
import React, { useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { IoIosClose } from "react-icons/io";
import { stylesConfig } from "../../utils";

const classes = stylesConfig(styles, "popup");

const Popup = ({
	title,
	width = "500px",
	height = "500px",
	onClose,
	children,
	styles = {
		container: {},
		header: {},
	},
}) => {
	const containerRef = useRef();
	useOnClickOutside(containerRef, onClose);

	return (
		<div className={classes("")}>
			<div
				className={classes("-container")}
				style={{ width: width, height: height, ...styles.container }}
				data-aos="zoom-in"
				ref={containerRef}
			>
				<div className={classes("-header")} style={styles.header}>
					<h3>{title}</h3>
					<button onClick={onClose}>
						<IoIosClose />
					</button>
				</div>
				{children}
			</div>
		</div>
	);
};

export default Popup;
