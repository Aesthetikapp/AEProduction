import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import { useNavigate } from "react-router-dom";
import { sendWelcomeEmailNotification } from "../../services/notificationservices";
import * as UserServices from "../../services/user";

export default function Signupthroughfb(props) {
	// const responseFacebook = (response) => {
	// 	console.log(response);
	// };
	const stepspage = [
		"welcome",
		"doctororclinic",
		"clinicname",
		"createbusiness",
		"personalprofile",
		"adddocument",
		"sumsuberror",
		"payment",
		"subscribe",
	];

	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState("");

	const responseFacebook = (response) => {
		// console.log(response);
		if (response.status === "unknown") {
			return;
		}
		if (response.email === undefined) {
			setErrorMessage("Link email with your facebook account");
		} else {
			const userInfo = {
				email: response.email,
				firstname: response.name,
				lastname: "",
				step: "facebook",
				source: "web",
			};
			(async function anyNameFunction() {
				const existUser = await UserServices.GetUserByEmail(userInfo.email);
				console.log(existUser.userByEmail);
				console.log(existUser.userByEmail.length);
				if (existUser.userByEmail.length === 0) {
					const variables = UserServices.returnCreateVariables(userInfo);
					console.log(variables);
					const tmpUser = await UserServices.CreateUser(variables);
					console.log(tmpUser.user, tmpUser.user.id);
					if (tmpUser.user !== null) {
						sendWelcomeEmailNotification(
							tmpUser.user.id,
							userInfo.firstname,
							userInfo.email,
							window.location.origin
						);
						navigate("../emailnotify", {
							state: {
								id: tmpUser.user.id,
								emailid: userInfo.email,
								name: userInfo.firstname,
							},
						});
					} else {
						navigate("../error");
					}
				} else {
					if (existUser.userByEmail[0].prevstep === "") {
						navigate("../../error", { state: "loginfirst" });
						return;
					}
					if (existUser.userByEmail[0].complete === "") {
						if (
							existUser.userByEmail[0].currentstep !== "0" &&
							existUser.userByEmail[0].currentstep !== ""
						) {
							navigate(
								"../" +
									stepspage[parseInt(existUser.userByEmail[0].currentstep)],
								{
									state: existUser.userByEmail[0],
								}
							);
							return;
						} else {
							navigate(
								"../" + stepspage[0] + "/" + existUser.userByEmail[0].id
							);
							return;
						}
					}
					if (existUser.userByEmail[0].complete === "complete") {
						navigate("../dashboard", { state: existUser.userByEmail[0] });
					}
				}
			})();
		}
		//
	};
	return (
		<>
			{errorMessage}
			<FacebookLogin
				appId={process.env.REACT_APP_FACEBOOK_APPID}
				autoLoad={false}
				fields="name,email,picture"
				scope="public_profile,email"
				callback={responseFacebook}
				// icon="fa-facebook"
				cssClass="socialButton1 faceBookButton-sm f-fm fm-w6-s16 lh-15"
				textButton={
					props.page === "login"
						? "Login with Facebook"
						: "Sign Up with Facebook"
				}
			/>
		</>
	);
}
