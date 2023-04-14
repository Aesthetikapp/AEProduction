import React, { createRef, useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import Internationalphone from "../../common/internationalphone";
import { validEmailExp, validPasswordExp } from "../../common/validations";
import { useNavigate } from "react-router-dom";
import { sendWelcomeEmailNotification } from "../../services/notificationservices";
import * as UserServices from "../../services/user";

const ref = createRef();

const SignUpWithEmail = () => {
	const navigate = useNavigate();
	const [state, setState] = useState({
		firstname: "",
		lastname: "",
		password: "",
		email: "",
		phone: "",
		validpassword: false,
		validemail: false,
		pcolor: "#FFFFFF",
		ecolor: "#FFFFFF",
		ptype: "password",
		source: "web",
	});
	const [errMsg, setErrMsg] = useState("");
	const [phonealreadyexist, setPhonealreadyexist] = useState(false);
	const getclassname = () => {
		let vtext =
			(state.lastname === "" ? "@#@" : state.lastname) +
			(state.firstname === "" ? "@#@" : state.firstname) +
			(state.email === "" ? "@#@" : state.email) +
			(state.password === "" ? "@#@" : state.password) +
			(state.phone === "" ? "@#@" : state.phone);
		let validf = state.validemail && state.validpassword ? "true" : "@#@";
		vtext = vtext + validf;
		let rvalue = "aebuttongrey";

		if (vtext.indexOf("@#@") >= 0) {
			rvalue = "signupbtngrey";
		} else {
			rvalue = "signupbtn";
		}
		return rvalue;
	};

	const togglePassword = (event) => {
		let ptype = "password";
		ptype = state.ptype === "password" ? "text" : "password";
		setState((prevState) => ({
			firstname: prevState.firstname,
			lastname: prevState.lastname,
			password: prevState.password,
			email: prevState.email,
			phone: prevState.phone,
			validpassword: prevState.validpassword,
			validemail: prevState.validemail,
			pcolor: prevState.pcolor,
			ecolor: prevState.ecolor,
			ptype: ptype,
			source: prevState.source,
		}));
	};
	const handleChange = (event) => {
		if (typeof event != "undefined") {
			if (typeof event === "string") {
				state.phone = event;
			} else {
				let vp = validPasswordExp.test(event.target.value);
				let pcolor = "#FFFFFF";
				let ecolor = "#FFFFFF";

				setState({ ...state, [event.target.name]: event.target.value });
				if (event.target.name === "password") {
					if (!vp) {
						pcolor = "#777777";
					} else if (state.validpassword && state.password !== "") {
						pcolor = "#FFFFFF";
					} else {
						pcolor = "#FFFFFF";
					}
					setState((prevState) => ({
						firstname: prevState.firstname,
						lastname: prevState.lastname,
						password: prevState.password,
						email: prevState.email,
						phone: prevState.phone,
						validpassword: vp,
						validemail: prevState.validemail,
						pcolor: pcolor,
						ecolor: prevState.ecolor,
						ptype: prevState.ptype,
						source: prevState.source,
					}));
				}
				if (event.target.name === "email") {
					let validemail = validEmailExp.test(event.target.value);
					if (validemail) {
						ecolor = "#FFFFFF";
					} else {
						ecolor = "#E10000";
					}
					setState((prevState) => ({
						firstname: prevState.firstname,
						lastname: prevState.lastname,
						password: prevState.password,
						email: prevState.email,
						phone: prevState.phone,
						validpassword: prevState.validpassword,
						validemail: validemail,
						pcolor: prevState.pcolor,
						ecolor: ecolor,
						ptype: prevState.ptype,
						source: prevState.source,
					}));
				}
			}
		}
	};

	const sendEmailShowNotification = () => {
		(async function anyNameFunction() {
			const existUser = await UserServices.GetUserByEmail(
				state.email.toLowerCase()
			);
			setState((prevState) => ({
				firstname: prevState.firstname,
				lastname: prevState.lastname,
				password: prevState.password,
				email: state.email.toLowerCase(),
				phone: prevState.phone,
				validpassword: prevState.validpassword,
				validemail: prevState.validemail,
				pcolor: prevState.pcolor,
				ecolor: "#FFFFFF",
				ptype: prevState.ptype,
				source: prevState.source,
			}));
			const existUserphone = await UserServices.GetUserByPhone(state.phone);
			console.log(existUser.userByEmail);
			console.log(existUser.userByEmail.length);
			if (existUserphone.userByPhone.length === 0) {
				setPhonealreadyexist(false);
				if (existUser.userByEmail.length === 0) {
					var data = state;
					console.log(data);

					const variables = UserServices.returnCreateVariables(state);
					console.log(variables);
					setErrMsg("");
					setState((prevState) => ({
						firstname: prevState.firstname,
						lastname: prevState.lastname,
						password: prevState.password,
						email: state.email.toLowerCase(),
						phone: prevState.phone,
						validpassword: prevState.validpassword,
						validemail: prevState.validemail,
						pcolor: prevState.pcolor,
						ecolor: "#FFFFFF",
						ptype: prevState.ptype,
						source: prevState.source,
					}));
					const tmpUser = await UserServices.CreateUser(variables);
					console.log(tmpUser.user, tmpUser.user.id);
					if (tmpUser.user !== null) {
						sendWelcomeEmailNotification(
							tmpUser.user.id,
							state.firstname,
							state.email.toLowerCase(),
							window.location.origin
						);
						navigate("../emailnotify", {
							state: {
								id: tmpUser.user.id,
								emailid: state.email.toLowerCase(),
								name: state.firstname,
							},
						});
					} else {
						navigate("../error");
					}
				} else {
					setErrMsg(
						"User with email already exists, Please try with another email"
					);
					setState((prevState) => ({
						firstname: prevState.firstname,
						lastname: prevState.lastname,
						password: prevState.password,
						email: "",
						phone: prevState.phone,
						validpassword: prevState.validpassword,
						validemail: prevState.validemail,
						pcolor: prevState.pcolor,
						ecolor: "#E10000",
						ptype: prevState.ptype,
						source: prevState.source,
					}));
				}
			} else {
				// alert("number exist");
				setPhonealreadyexist(true);
			}
		})();
		//
	};

	return (
		<>
			<div className="row" style={{ paddingTop: "40px" }}>
				<div className=""></div>
				<div className="col pb-eform">
					<div className="form-outline">
						<div className="row">
							<div className="col-md-6">
								<div className="form-outline">
									<label
										className="form-label form"
										htmlFor="form3Example1m"
										style={{ marginLeft: "0px" }}
									>
										First Name
									</label>
									<input
										type="text"
										id="txtFirstName"
										name="firstname"
										className="form-control form-control-lg"
										value={state.firstname}
										onChange={handleChange}
									/>
									<div className="form-notch">
										<div
											className="form-notch-leading"
											style={{ width: "9px" }}
										></div>
										<div
											className="form-notch-middle"
											style={{ width: "68.8px" }}
										></div>
										<div className="form-notch-trailing"></div>
									</div>
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-outline">
									<label
										className="form-label form"
										htmlFor="form3Example1n"
										style={{ marginLeft: "0px" }}
									>
										Last Name
									</label>
									<input
										type="text"
										id="txtLastName"
										name="lastname"
										className="form-control form-control-lg"
										value={state.lastname}
										onChange={handleChange}
									/>
									<div className="form-notch">
										<div
											className="form-notch-leading"
											style={{ width: "9px" }}
										></div>
										<div
											className="form-notch-middle"
											style={{ width: "68px" }}
										></div>
										<div className="form-notch-trailing"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className=""></div>
			</div>
			<div className="row">
				<div className=""></div>
				<div className="col mb-n15">
					<div className="form-outline">
						<label
							className="form-label form"
							htmlFor="form3Example8"
							style={{ marginLeft: "0px" }}
						>
							Email Address
						</label>
						<input
							type="text"
							name="email"
							className="form-control form-control-lg"
							value={state.email}
							onChange={handleChange}
						/>
						{errMsg === "" ? (
							<label
								style={{
									marginLeft: "0px",
									// marginTop: "-6px",
									fontStyle: "normal",
									fontWeight: "400",
									fontSize: "12px",
									color: state.ecolor,
								}}
							>
								Not valid email
							</label>
						) : (
							<label
								style={{
									marginLeft: "0px",
									// marginTop: "-6px",
									fontStyle: "normal",
									fontWeight: "400",
									fontSize: "12px",
									color: state.ecolor,
								}}
							>
								{errMsg}
							</label>
						)}
						<br></br>
						<div className="form-notch pt-3">
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
			<div className="row">
				<div className=""></div>
				<div className="col pb-eform">
					<div className="form-outline">
						<label
							className="form-label form"
							htmlFor="form3Example90"
							style={{ marginLeft: "0px" }}
						>
							Phone Number
						</label>
						<PhoneInput
							id="txtPhone"
							name="phone"
							international
							countryCallingCodeEditable={false}
							defaultCountry="GB"
							inputComponent={Internationalphone}
							ref={ref}
							onChange={handleChange}
							value={state.phone}
						/>
						<div className="form-notch">
							<div
								className="form-notch-leading"
								style={{ width: "9px" }}
							></div>
							<div
								className="form-notch-middle"
								style={{ width: "54.4px" }}
							></div>
							<div className="form-notch-trailing"></div>
						</div>
						{phonealreadyexist && (
							<label
								style={{
									marginLeft: "42px",
									marginTop: "5px",
									fontStyle: "normal",
									fontWeight: "400",
									fontSize: "12px",
									color: "red",
								}}
							>
								User with mobile already exists, Please try with another mobile
							</label>
						)}
					</div>
				</div>
				<div className=""></div>
			</div>
			<div className="row">
				<div className=""></div>
				<div className="col pb-eform">
					<div className="form-outline">
						<label
							className="form-label form"
							htmlFor="form3Example97"
							style={{ marginLeft: "0px", color: "#000000" }}
						>
							Create Your Password
						</label>
						<div className="input-group mb-3" style={{ cursor: "pointer" }}>
							<input
								type={state.ptype}
								id="txtPassword"
								name="password"
								className="input form-control form-control-lg"
								value={state.password}
								onChange={handleChange}
							/>
							<div className="input-group-append">
								<span className="input-group-text" onClick={togglePassword}>
									{state.ptype === "password" && (
										<i className="fa fa-eye-slash" id="show_eye"></i>
									)}
									{state.ptype === "text" && (
										<i className="fa fa-eye" id="show_eye"></i>
									)}
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
					<div className="col-11" style={{ marginTop: "-10px" }}>
						<label
							id="lblMessage"
							style={{
								marginLeft: "0px",
								marginTop: "-6px",
								fontStyle: "normal",
								fontWeight: "400",
								fontSize: "12px",
								color: state.pcolor,
							}}
						>
							Password must be at least 8 characters long with at least 1 Upper
							Case, 1 lower case and 1 special character except (.).
						</label>
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
					<div className=""></div>
				</div>
				<div className="row">
					<div className=""></div>
					<div className="col">
						<div className="form-outline" style={{ marginTop: "17px" }}>
							<label
								className="form-label"
								htmlFor="form3Example97"
								style={{
									marginLeft: "0px",
									marginTop: "-24px",
									fontStyle: "normal",
									fontWeight: "400",
									fontSize: "14px",
									color: "#777777",
								}}
							>
								By signning up, I agree to <b>Terms</b>, <b>Privacy</b> and{" "}
								<b>Policy</b>
							</label>
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
				<div className="row">
					<div className=""></div>
					<div className="col">
						<div className="form-outline">
							{getclassname() === "signupbtngrey" && (
								<img loading="lazy" className={getclassname()} alt="ae"></img>
							)}
							{getclassname() === "signupbtn" && (
								<img
									loading="lazy"
									className={getclassname()}
									alt="ae"
									onClick={sendEmailShowNotification}
								></img>
							)}
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
		</>
	);
};

export default SignUpWithEmail;
