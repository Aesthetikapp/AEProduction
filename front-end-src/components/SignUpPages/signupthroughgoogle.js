import React, { useEffect } from "react";
// import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { sendWelcomeEmailNotification } from "../../services/notificationservices";
import * as UserServices from "../../services/user";

export default function Signupthroughgoogle(props) {
	// const [user, setUser] = useState();
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
	const google = window.google;
	const navigate = useNavigate();

	function parseJwt(token) {
		var base64Url = token.split(".")[1];
		var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		var jsonPayload = decodeURIComponent(
			window
				.atob(base64)
				.split("")
				.map(function (c) {
					return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join("")
		);

		return JSON.parse(jsonPayload);
	}

	const handleCallbackResponse = (response) => {
		// var userObject = jwt_decode(response.credential);
		var userObject = parseJwt(response.credential);
		console.log(userObject);
		// setUser(userObject);

		const userInfo = {
			email: userObject.email,
			firstname: userObject.given_name,
			lastname: userObject.family_name,
			step: "google",
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
							"../" + stepspage[parseInt(existUser.userByEmail[0].currentstep)],
							{
								state: existUser.userByEmail[0],
							}
						);
						return;
					} else {
						navigate("../" + stepspage[0] + "/" + existUser.userByEmail[0].id);
						return;
					}
				}
				if (existUser.userByEmail[0].complete === "complete") {
					navigate("../dashboard", { state: existUser.userByEmail[0] });
				}
			}
		})();
		//
	};

	useEffect(() => {
		// Gobal google

		google.accounts.id.initialize({
			client_id: process.env.REACT_APP_GOOGLELOGIN_CLIENT_ID,
			callback: handleCallbackResponse,
		});
		google.accounts.id.renderButton(document.getElementById("google"), {
			theme: "default",
			//size: "large",
			shape: "circle",
			text: "signup_with",
			width: 290,
			//maxWidth: "350px",
			//minWidth: 200,
			height: 350,
		});
	}, [google.accounts]);

	return (
		<div className="col-md-12 mt-3" style={{ position: "relative" }}>
			<div>
				{props.page === "login" ? (
					<button className="socialButton googleButton-sm f-fm fm-w6-s16 lh-15">
						&nbsp;&nbsp;&nbsp;&nbsp;Login with Google
					</button>
				) : (
					<button className="socialButton googleButton-sm f-fm fm-w6-s16 lh-15">
						&nbsp;&nbsp;&nbsp;&nbsp;Sign Up with Google
					</button>
				)}
			</div>
			<div
				id="google"
				style={{
					position: "absolute",
					top: "10%",
					left: "0px",
					opacity: 0,
				}}
			></div>
		</div>
	);
}
