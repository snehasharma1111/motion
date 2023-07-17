import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils";
import Typography from "../../library/Typography";
import { AiOutlineCaretDown } from "react-icons/ai";
import { TASK_STATUS } from "../../constants/enum.mjs";
import { getStatusLabel } from "../../utils/functions";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const classes = stylesConfig(styles, "status");

const Status = ({ id, dropdown = false, onSelect, className = "" }) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const ref = useRef();

	useOnClickOutside(ref, () => {
		setShowDropdown(false);
	});

	return (
		<div
			className={classes("", `--${id}`) + ` ${className}`}
			onClick={() => {
				if (dropdown) setShowDropdown(true);
			}}
		>
			<svg
				className={classes("-dot")}
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="8" cy="8" r="16" fill="currentColor" />
			</svg>
			<Typography type="body" variant="medium">
				{getStatusLabel(id)}
			</Typography>
			{dropdown ? (
				<>
					<AiOutlineCaretDown
						style={{
							fontSize: "12px",
						}}
					/>
					{showDropdown ? (
						<div className={classes("-dropdown")} ref={ref}>
							{Object.values(TASK_STATUS).map((status) => (
								<div
									className={classes("-option")}
									key={status}
									onClick={() => {
										if (onSelect) onSelect(status);
									}}
								>
									<span className={classes("-dot")} />
									<Typography type="body" variant="medium">
										{getStatusLabel(status)}
									</Typography>
								</div>
							))}
						</div>
					) : null}
				</>
			) : null}
			{}
		</div>
	);
};

export default Status;
