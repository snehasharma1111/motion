import React, { useContext, useEffect, useRef, useState } from "react";
import { stylesConfig } from "../../utils";
import styles from "./styles.module.scss";
import GlobalContext from "../../context/GlobalContext";
import { toast } from "react-hot-toast";
import { fetchAllUsers } from "../../utils/api/users";
import Avatar from "../Avatar";
import Typography from "../../library/Typography";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { PiCaretDown } from "react-icons/pi";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const classes = stylesConfig(styles, "all-users");

const AllUsers = ({ currentUser, setCurrentUser }) => {
	const { allUsers, setAllUsers } = useContext(GlobalContext);
	const dropdownRef = useRef();

	const [activeUser, setActiveUser] = useState(currentUser);
	const [showDropdown, setShowDropdown] = useState(false);
	const [fetching, setFetching] = useState(false);

	const getAllUsers = async () => {
		try {
			setFetching(true);
			const res = await fetchAllUsers();
			setAllUsers(res.data);
		} catch (error) {
			console.error(error);
			toast.error(error.message ?? "Something went wrong");
		} finally {
			setFetching(false);
		}
	};

	useOnClickOutside(dropdownRef, () => setShowDropdown(false));

	useEffect(() => {
		if (allUsers.length === 0) getAllUsers();
	}, []);

	useEffect(() => {
		setActiveUser(currentUser);
	}, [currentUser]);

	return (
		<div className={classes("")}>
			<div
				className={classes("-box", "-user")}
				onClick={() => {
					setShowDropdown(true);
				}}
			>
				<Avatar
					src={activeUser.avatar}
					alt={activeUser.name}
					size={24}
				/>
				<Typography type="body" variant="medium">
					{activeUser.name}
				</Typography>
				<PiCaretDown />
			</div>
			{showDropdown ? (
				<div className={classes("-dropdown")} ref={dropdownRef}>
					{fetching ? (
						<div className={classes("-loader")}>
							<AiOutlineLoading3Quarters />
						</div>
					) : (
						allUsers.map((user) => (
							<div
								className={classes("-user", "-dropdown-option")}
								key={user._id}
								onClick={() => {
									setActiveUser(user);
									setCurrentUser(user);
									setShowDropdown(false);
								}}
							>
								<Avatar
									src={user.avatar}
									alt={user.name}
									size={24}
								/>
								<Typography type="body" variant="medium">
									{user.name}
								</Typography>
							</div>
						))
					)}
				</div>
			) : null}
		</div>
	);
};

export default AllUsers;
