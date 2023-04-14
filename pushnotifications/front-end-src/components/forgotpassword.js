import React, { useState, useLayoutEffect, useRef } from "react";
import * as utils from "../common/util";
import { validEmailExp } from "../common/validations";
import * as UserServices from "../services/user";
import { useNavigate } from "react-router-dom";
import { sendResetEmailNotification } from "../services/notificationservices";

const ForgotPassword = () => {
	const firstupdate = useRef(true);
	const navigate = useNavigate();
	const [state, setState] = useState({
		email: "",
		validemail: false,
		pcolor: "#FFFFFF",
		ecolor: "#FFFFFF",
		ptype: "password",
	});
	const [errorText, setErrorText] = useState("");

	const handleResetClick = () => {
		setState((prevState) => ({
			password: prevState.password,
			email: prevState.email,
			validpassword: prevState.validpassword,
			validemail: prevState.validemail,
			pcolor: prevState.pcolor,
			ecolor: prevState.ecolor,
			ptype: prevState.ptype,
		}));
		// console.log("reset click", state);

		firstupdate.current = false;
	};

	useLayoutEffect(() => {
		// console.log(firstupdate.current);
		if (firstupdate.current) {
			return;
		}
		(async function anyNameFunction() {
			const existUser = await UserServices.GetUserByEmail(state.email);
			if (existUser.userByEmail.length !== 0) {
				sendResetEmailNotification(
					existUser.userByEmail[0].id,
					existUser.userByEmail[0].firstName,
					state.email,
					window.location.origin
				);
				navigate("../emailnotify", {
					state: {
						id: existUser.userByEmail[0].id,
						emailid: state.email,
						name: existUser.userByEmail[0].firstName,
						type: "reset",
					},
				});
			} else {
				setErrorText("Email doesn't exist !!!");
			}
		})();
		firstupdate.current = true;
	}, [state]);

	const getButtonClass = () => {
		let vtext = state.email === "" ? "@#@" : state.email;
		let validf = state.validemail ? "true" : "@#@";
		vtext = vtext + validf;
		let rvalue = "aebuttongrey";

		if (vtext.indexOf("@#@") >= 0) {
			rvalue = "aebuttongrey";
		} else {
			rvalue = "aebuttonblack";
		}
		return rvalue;
	};

	const handleEmailChange = (event) => {
		// console.log("event", event.target.value);
		let ecolor = "#FFFFFF";

		let validemail = validEmailExp.test(event.target.value);
		state.validemail = validemail;
		if (validemail) {
			ecolor = "#FFFFFF";
		} else {
			ecolor = "red";
		}

		setState((prevState) => ({
			password: prevState.password,
			email: event.target.value,
			validpassword: prevState.validpassword,
			validemail: validemail,
			pcolor: prevState.pcolor,
			ecolor: ecolor,
			ptype: prevState.ptype,
		}));
	};

	return (
		<>
			<div className="body-bg ">
				<div className="row">
					<div className="col-xl-7 col-lg-6 col-md-4 col-xs-4 col-sm-4">
						&nbsp;
					</div>
					<div className="col-xl-4 col-lg-5 col-md-7 col-xs-7 col-sm-7"></div>
					<div className="col-lg-1 col-md-2 col-xs-3 col-sm-4"></div>
				</div>
				<div className="row">
					<div className="col-xl-6 col-lg-6 col-md-4 col-xs-4 col-sm-4 mt-p18">
						<utils.aeLogo fcolor="color-FF" />
					</div>
					<div
						className="col-xl-6 col-lg-6 col-md-7 col-xs-7 col-sm-8  pr-n185"
						style={{ paddingRight: "0px !important" }}
					>
						<div
							className=" text-black mt-n5 pr-n73 pr-n65 pr-n25 prl pr-n90 pr-n17"
							style={{
								borderBottomLeftRadius: "20px",
								boxShadow: "0px 4px 40px rgba(0, 0, 0, 0.15)",
								borderBottomRightRadius: "20px",
								backgroundColor: "#FFFFFF",
							}}
						>
							<div className="row">
								<div className=""></div>
								<div className="col pt-ssignup">
									<div className="form-outline"></div>
								</div>
								<div className=""></div>
							</div>
							<div className="row">
								<div className=""></div>
								<div className="col">
									<div className="form-outline">
										<label
											style={{ paddingBottom: "10px" }}
											className="f-rl fm-w4-s30 color-00"
										>
											Forgot Your Password?
										</label>
									</div>
								</div>
								<div className=""></div>
							</div>
							<div className="row">
								<div className=""></div>
								<div className="col">
									<div className="form-outline">
										<label className="f-fm fm-w6-s12 color-7">
											Please enter the email you use to sign in{" "}
										</label>
									</div>
								</div>
								<div className=""></div>
							</div>
							<br></br>
							<div className="row">
								<div className=""></div>
								<div className="col mb-n15">
									<div className="form-outline">
										<label
											className="f-fm fm-w6-s12 color-7 form-label form"
											htmlFor="form3Example8"
											style={{ marginLeft: "0px" }}
										>
											Email Address
										</label>
										<input
											type="text"
											style={{}}
											id="txtEmail"
											name="email"
											className="form-control form-control-lg"
											value={state.email}
											onChange={handleEmailChange}
										/>
										<div className="form-notch">
											<div
												className="form-notch-leading"
												style={{ width: "9px" }}
											></div>
											<div
												className="form-notch-middle"
												style={{ width: "55.2px" }}
											></div>
											<div className="form-notch-trailing"></div>
										</div>
									</div>
								</div>
								<div className=""></div>
							</div>
							<br></br>
							<div className="row">
								<div className="col mb-n15">
									<label
										className="f-fm fm-w6-s12 color-7 form-label form"
										htmlFor="form3Example8"
										style={{ marginLeft: "0px" }}
									>
										{errorText}
									</label>
								</div>
							</div>
							<br></br>
							<div className="row">
								<div className=""></div>
								<div className="col">
									<div className="form-outline">
										<utils.aeButton
											classNames="aebutton f-fm fm-w6-s18"
											text="Request Password Reset"
											enabled="false"
											disabledClass={getButtonClass()}
											onClick={handleResetClick}
										/>
										<br></br> <br></br> <br></br>
										<br></br>
										<br></br>
										<div className="form-notch">
											<div
												className="form-notch-leading"
												style={{ width: "9px" }}
											></div>
											<div
												className="form-notch-middle"
												style={{ width: "56px" }}
											></div>
											<div className="form-notch-trailing"></div>
										</div>
									</div>
								</div>
								<div className=""></div>
							</div>

							<br></br>
							<br></br>
							<br></br>
							<br></br>
							<br></br>
							<br></br>
							<br></br>
							<br></br>
							<br></br>
							<br></br>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-xl-6 col-lg-6 col-md-4 col-xs-4 col-sm-4"></div>
					<div className="col-xl-5 col-lg-5 col-md-7 col-xs-7 col-sm-7 text-center">
						<br></br>
						<label className="text-center f-fm fm-w5-s16 color-FF">
							<a href="../login" style={{ color: "#FFFFFF" }}>
								Back to Sign In
							</a>
						</label>
					</div>
					<div className="col-lg-1 col-md-2 col-xs-3 col-sm-4"></div>
				</div>
				<div className="row pt-6">
					<div className="col-xl-7 col-lg-6 col-md-4 col-xs-4 col-sm-4"></div>
					<div className="col-xl-4 col-lg-5 col-md-7 col-xs-7 col-sm-7 text-center">
						&nbsp;
					</div>
					<div className="col-lg-1 col-md-2 col-xs-3 col-sm-4"></div>
				</div>
				<div className="row pt-7">
					<div className="col-xl-7 col-lg-6 col-md-4 col-xs-4 col-sm-4"></div>
					<div className="col-xl-4 col-lg-5 col-md-7 col-xs-7 col-sm-7 text-center">
						&nbsp;
					</div>
					<div className="col-lg-1 col-md-2 col-xs-3 col-sm-4"></div>
				</div>
			</div>
		</>
	);
};
export default ForgotPassword;
