import React from "react";
import * as utils from "../../common/util";
import { Animated } from "react-animated-css";
import NotificationList from "./notificationlist";

const Notification = () => {
	const patients = null;

	return (
		<Animated
			style={{
				height: "100%",
				bottom: "0px",
				left: "0px",
				display: "grid",
				alignItems: "center",
				minHeight: "100%",
				color: "#FFFFFF",
				textAlign: "center",
				verticalAlign: "middle",
			}}
			animationIn="slideInDown"
			animationOut="fadeOutDown"
			animationInDuration={1000}
			animationOutDuration={1000}
			isVisible={true}
		>
			<div
				style={{
					backgroundColor: "#F9F9FB",
					overflowX: "hidden",
					position: "relative",
					minHeight: "100%",
				}}
			>
				<utils.AeNav clinicname="test clinic" userid="mahesh" />
				<div className="row container-fluid dashboard pl-4">
					<NotificationList data={patients}></NotificationList>
				</div>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
			</div>
		</Animated>
	);
};

export default Notification;
