import React from "react";
import Signupthroughgoogle from "../components/SignUpPages/signupthroughgoogle";
import Signupthroughfb from "./SignUpPages/signupthroughfb";
const ThirdPartyLogin = (props) => {
	console.log("props", props);
	// const google = window.google;
	console.log("window.google", window.google);
	return (
		<div style={{ backgroundColor: "#FFFFFF" }}>
			<div style={{}}>
				{window.google !== undefined && (
					<Signupthroughgoogle page={props.page} />
				)}
			</div>
			<div style={{ height: "60px" }}></div>
			<div style={{ paddingRight: "5px" }}>
				<Signupthroughfb page={props.page} />
			</div>
		</div>
	);
};
export default ThirdPartyLogin;
