import React from "react";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils";

const classes = stylesConfig(styles, "masonry");

const Masonry = ({ sm = 1, md = 2, lg = 3, xlg = 4, children }) => {
	return (
		<div
			className={classes(
				"",
				`-sm-${sm}`,
				`-md-${md}`,
				`-lg-${lg}`,
				`-xlg-${xlg}`
			)}
		>
			{React.Children.map(children, (child, index) => {
				return (
					<div className={classes("-item")} key={index}>
						{child}
					</div>
				);
			})}
		</div>
	);
};

export default Masonry;
