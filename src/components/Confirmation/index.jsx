import React, { useState } from "react";
import Button from "../../library/Button";
import Popup from "../../library/Popup";
import { stylesConfig } from "../../utils";
import styles from "./styles.module.scss";

const classes = stylesConfig(styles, "confirmation-modal");

const ConfirmationModal = ({ title, body, onConfirm, onCancel }) => {
	return (
		<Popup title={title} onClose={onCancel} width="550px" height="250px">
			<div className={classes("-body")}>{body}</div>
			<div className={classes("-footer")}>
				<Button variant="outlined" onClick={onCancel} size="small">
					Cancel
				</Button>
				<Button variant="filled" onClick={onConfirm} size="small">
					Confirm
				</Button>
			</div>
		</Popup>
	);
};

export default ConfirmationModal;

const useConfirmationModal = (title, body, onConfirm, onCancel) => {
	const [showPopup, setShowPopup] = useState(false);

	const openPopup = () => setShowPopup(true);
	const closePopup = () => setShowPopup(false);

	const Modal = (
		<ConfirmationModal
			title={title}
			body={body}
			onConfirm={() => {
				onConfirm();
				closePopup();
			}}
			onCancel={() => {
				onCancel();
				closePopup();
			}}
		/>
	);
	return { openPopup, closePopup, showPopup, Modal };
};

export { useConfirmationModal };
