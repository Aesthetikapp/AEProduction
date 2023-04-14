import React, { useState, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as utils from "../common/util";
import { validEmailExp, validPasswordExp } from "../common/validations";
import * as UserServices from "../services/user";
import Signupthroughgoogle from "../components/SignUpPages/signupthroughgoogle";
import ThirdPartyLogin from "./thirdpartylogin";

const Login = () => {
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
	const firstupdate = useRef(true);
	const [state, setState] = useState({
		password: "",
		email: "",
		validpassword: false,
		validemail: false,
		pcolor: "#FFFFFF",
		ecolor: "#FFFFFF",
		ptype: "password",
	});

	useLayoutEffect(() => {
		console.log(firstupdate.current);
		if (firstupdate.current) {
			return;
		}
		(async function anyNameFunction() {
			var c = await UserServices.GetUserByEmail(state.email.toLowerCase());
			console.log("login", c.userByEmail);
			if (c.userByEmail.length === 0) {
				navigate("../../error");
				return;
			}
			var pwdhash = c.userByEmail[0].password;
			var c1 = await UserServices.ComparePassword(state.password, pwdhash);
			console.log(c);
			console.log(c1.comparePassword[0].password);
			if (c1.comparePassword[0].password === "false") {
				if (c.userByEmail[0].step === "") {
					navigate("../../error");
					return;
				} else {
					navigate("../../error");
					return;
				}
			} else if (
				c1.comparePassword[0].password === "true" &&
				c.userByEmail[0].prevstep === ""
			) {
				navigate("../../error", { state: "loginfirst" });
				return;
			} else if (
				c1.comparePassword[0].password === "true" &&
				c.userByEmail[0].complete === "complete"
			) {
				navigate("../dashboard", { state: c.userByEmail[0] });
			} else if (
				c1.comparePassword[0].password === "true" &&
				c.userByEmail[0].complete === ""
			) {
				if (
					c.userByEmail[0].currentstep !== "0" &&
					c.userByEmail[0].currentstep !== ""
				) {
					navigate("../" + stepspage[parseInt(c.userByEmail[0].currentstep)], {
						state: c.userByEmail[0],
					});
					return;
				} else {
					navigate("../" + stepspage[0] + "/" + c.userByEmail[0].id);
					return;
				}
			} else {
				navigate("../../error");
				return;
			}
		})();
		firstupdate.current = true;
	}, [state]);

	const listener = (event) => {
		if (event.code === "Enter" || event.code === "NumpadEnter") {
			console.log("Enter key was pressed. Run your function.");
			event.preventDefault();
			if (state.validpassword && state.password !== "") {
				handleLoginClick();
			}
		}
	};
	document.addEventListener("keydown", listener);

	const getButtonClass = () => {
		let vtext =
			(state.email === "" ? "@#@" : state.email) +
			(state.password === "" ? "@#@" : state.password);
		let validf = state.validemail && state.validpassword ? "true" : "@#@";
		vtext = vtext + validf;
		let rvalue = "aebuttongrey";

		if (vtext.indexOf("@#@") >= 0) {
			rvalue = "aebuttongrey";
		} else {
			rvalue = "aebuttonblack";
		}
		return rvalue;
	};

	const togglePassword = (event) => {
		let ptype = "password";
		if (event.currentTarget.innerHTML.indexOf("fa fa-eye-slash") > 0) {
			event.currentTarget.innerHTML = "<i class='fa fa-eye'></i>";
			ptype = "text";
		} else {
			event.currentTarget.innerHTML = "<i class='fa fa-eye-slash'></i>";
			ptype = "password";
		}
		setState((prevState) => ({
			password: prevState.password,
			email: prevState.email,
			validpassword: prevState.validpassword,
			validemail: prevState.validemail,
			pcolor: prevState.pcolor,
			ecolor: prevState.ecolor,
			ptype: ptype,
		}));
	};
	const handlePasswordChange = (event) => {
		let pcolor = "#FFFFFF";
		setState({ ...state, [event.target.name]: event.target.value });

		let vp = validPasswordExp.test(event.target.value);
		state.validpassword = vp;
		if (!vp && state.password !== "") {
			pcolor = "#777777";
		} else if (state.validpassword && state.password !== "") {
			pcolor = "#FFFFFF";
		} else {
			pcolor = "#FFFFFF";
		}

		setState((prevState) => ({
			password: prevState.password,
			email: prevState.email,
			validpassword: vp,
			validemail: prevState.validemail,
			pcolor: pcolor,
			ecolor: prevState.ecolor,
			ptype: prevState.ptype,
		}));
		console.log("1");
		console.log(state);
	};
	const handleEmailChange = (event) => {
		let ecolor = "#FFFFFF";

		setState({ ...state, [event.target.name]: event.target.value });

		let validemail = validEmailExp.test(event.target.value);
		state.validemail = validemail;
		if (validemail) {
			ecolor = "#FFFFFF";
		} else {
			ecolor = "red";
		}

		setState((prevState) => ({
			password: prevState.password,
			email: prevState.email,
			validpassword: prevState.validpassword,
			validemail: validemail,
			pcolor: prevState.pcolor,
			ecolor: ecolor,
			ptype: prevState.ptype,
		}));
		console.log("2");
		console.log(state);
	};

	const handleLoginClick = () => {
		console.log("ff");
		setState((prevState) => ({
			password: prevState.password,
			email: prevState.email,
			validpassword: prevState.validpassword,
			validemail: prevState.validemail,
			pcolor: prevState.pcolor,
			ecolor: prevState.ecolor,
			ptype: prevState.ptype,
		}));
		firstupdate.current = false;
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
						<utils.aeLogo_signup fcolor="color-FF" />
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
										<label className="f-rl fm-w4-s30 color-00">Log In</label>
									</div>
								</div>
								<div className=""></div>
							</div>

							<div className="row">
								<div className=""></div>
								<div className="col">
									<div className="form-outline">
										<br></br>
										<br></br>
										<ThirdPartyLogin page="login" />
									</div>
								</div>
								<div className=""></div>
							</div>
							<div className="row">
								<div className=""></div>
								<div className="col" style={{ paddingTop: "8px" }}>
									&nbsp;
								</div>
								<div className=""></div>
							</div>
							<div className="row">
								<div className=""></div>
								<div className="col">
									<div className="form-outline"></div>
								</div>
								<div className=""></div>
							</div>
							<div className="row">
								<div className=""></div>
								<div className="col">
									<div className="form-outline">
										<br></br>
										<br></br>
										<label className="f-fm fm-w6-s16 color-00">
											Or enter email address and password
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
											className="f-fm fm-w4-s40 color-7  form-label form"
											htmlFor="form3Example8"
											style={{ marginLeft: "0px" }}
										>
											Email Address
										</label>
										<input
											type="text"
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
								<div className=""></div>
								<div className="col pb-eform">
									<div className="form-outline">
										<label
											className="f-fm fm-w4-s40 color-7  form-label form"
											htmlFor="form3Example97"
											style={{ marginLeft: "0px" }}
										>
											Password
										</label>
										<div
											className="input-group mb-3"
											style={{ cursor: "pointer" }}
										>
											<input
												type={state.ptype}
												id="txtPassword"
												name="password"
												className="input form-control form-control-lg"
												value={state.password}
												onChange={handlePasswordChange}
											/>
											<div className="input-group-append">
												<span
													className="input-group-text"
													onClick={togglePassword}
												>
													<i className="fa fa-eye-slash" id="show_eye"></i>
												</span>
											</div>
										</div>
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
							<div className="row">
								<div className=""></div>
								<div className="col">
									<div className="form-outline">
										<label
											className="f-fm fm-w6-s16 color-7"
											onClick={() => navigate("/forgotpassword")}
											style={{ cursor: "pointer", textDecoration: "underline" }}
										>
											Forgot&nbsp;Password?
										</label>
									</div>
								</div>
								<div className=""></div>
							</div>
							<br></br>
							<div className="row">
								<div className=""></div>
								<div className="col">
									<div className="form-outline">
										<utils.aeButton
											classNames="aebutton f-fm fm-w6-s18"
											text="Log In"
											enabled="false"
											disabledClass={getButtonClass()}
											onClick={handleLoginClick}
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
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-xl-6 col-lg-6 col-md-4 col-xs-4 col-sm-4"></div>
					<div className="col-xl-5 col-lg-5 col-md-7 col-xs-7 col-sm-7 text-center">
						<br></br>
						<label className="text-center f-fm fm-w5-s16 color-FF">
							Don't have an account?{" "}
							<a href="/signup/social" style={{ color: "#FFFFFF" }}>
								Sign Up
							</a>
						</label>
					</div>
					<div className="col-xl-1 col-lg-1 col-md-2 col-xs-3 col-sm-4"></div>
				</div>
				<div className="row pt-6">
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
export default Login;
