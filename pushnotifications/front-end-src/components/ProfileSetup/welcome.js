import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as utils from "../../common/util";
import * as UserServices from "../../services/user";
import { validPasswordExp } from "../../common/validations";

const Welcome = () => {
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
	const params = {
		params: useParams(),
	};
	const [state, setState] = useState({
		id: params.params.userid,
		password: "",
		phone: "",
		email: "",
		validpassword: false,
		pcolor: "#FFFFFF",
		ecolor: "#FFFFFF",
		ptype: "password",
		source: "web",
		step: "",
		prevstep: "",
		business: "",
		clinicname: "",
		isadmin: false,
		params: {},
	});

	useEffect(() => {
		console.log(state);
		UserServices.GetUserById(params.params.userid).then((value) => {
			console.log(value);
			console.log(value.userByID.id);

			if (value.userByID != null && value.userByID.complete !== "complete") {
				setState({ ...state, params: value.userByID });

				if (
					value.userByID.currentstep !== "0" &&
					value.userByID.currentstep !== ""
				) {
					navigate("../" + stepspage[parseInt(value.userByID.currentstep)], {
						state: value.userByID,
					});
					return;
				}
			} else if (
				value.userByID != null &&
				value.userByID.complete === "complete"
			) {
				navigate("../login");
			} else {
				navigate("../../error");
			}
		});
	}, []);

	const handleChange = (event) => {
		if (typeof event != "undefined") {
			if (typeof event === "string") {
				state.phone = event;
			} else {
				let vp = validPasswordExp.test(event.target.value);
				let pcolor = "#FFFFFF";
				// let ecolor = "#FFFFFF";

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
						password: prevState.password,
						validpassword: vp,
						pcolor: pcolor,
						ptype: prevState.ptype,
						params: prevState.params,
					}));
				}
				// if (event.target.name === "email") {
				// 	let validemail = validEmailExp.test(event.target.value);
				// 	if (validemail) {
				// 		ecolor = "#FFFFFF";
				// 	} else {
				// 		ecolor = "#E10000";
				// 	}
				// 	setState((prevState) => ({
				// 		firstname: prevState.firstname,
				// 		lastname: prevState.lastname,
				// 		password: prevState.password,
				// 		email: prevState.email,
				// 		phone: prevState.phone,
				// 		validpassword: prevState.validpassword,
				// 		validemail: validemail,
				// 		pcolor: prevState.pcolor,
				// 		ecolor: ecolor,
				// 		ptype: prevState.ptype,
				// 		source: prevState.source,
				// 	}));
				// }
			}
		}
	};

	const togglePassword = (event) => {
		let ptype = "password";
		ptype = state.ptype === "password" ? "text" : "password";
		setState((prevState) => ({
			password: prevState.password,
			validpassword: prevState.validpassword,
			pcolor: prevState.pcolor,
			ptype: ptype,
			source: prevState.source,
			params: prevState.params,
		}));
	};

	const getclassname = () => {
		if (state.params.step === "google" || state.params.step === "facebook") {
			let vtext = state.password === "" ? "@#@" : state.password;
			let validf = state.validpassword ? "true" : "@#@";
			vtext = vtext + validf;
			let rvalue = "aebuttongrey";

			if (vtext.indexOf("@#@") >= 0) {
				rvalue = "aebuttongrey";
			} else {
				rvalue = "aebuttonblack";
			}
			return rvalue;
		} else {
			return "aebuttonblack";
		}
	};

	const showNextStep = () => {
		if (state.params.step === "google" || state.params.step === "facebook") {
			let sindex = state.params.currentstep;
			sindex++;
			console.log(sindex);
			state.params.currentstep = "1";
			console.log(state.params);
			const updateVariables = UserServices.returnUpdateVariables({
				id: state.params.id,
				currentstep: "1",
				prevstep: "entered",
				password: state.password,
			});
			UserServices.UpdateUser(updateVariables).then((value) => {
				console.log(state.params);
				navigate("../doctororclinic", { state: state.params });
			});
		} else {
			let sindex = state.params.currentstep;
			sindex++;
			console.log(sindex);
			state.params.currentstep = "1";
			console.log(state.params);
			const updateVariables = UserServices.returnUpdateVariables({
				id: state.params.id,
				currentstep: "1",
				prevstep: "entered",
			});
			UserServices.UpdateUser(updateVariables).then((value) => {
				console.log(state.params);
				navigate("../doctororclinic", { state: state.params });
			});
		}
	};
	return state ? (
		<>
			<div className="slider">
				{utils.aeProgressBar({ width: "0%" })}
				<div style={{ backgroundColor: "#FFFFFF", overflow: "hidden" }}>
					<div className="row pt-3" style={{ backgroundColor: "#FFFFFF" }}>
						<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
							<utils.aeLogo fcolor="color-00" />
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
							<div className="row">
								<div className="col-8 pl-12">
									<label className="f-rl fm-w7-s36">
										Hello {state.params.firstName},<br></br>We're so glad to
										have you on board!
									</label>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-2rem"></div>
							</div>
							<div className="row">
								<div className="col pl-12">
									<label className="f-fm fm-w4-s18">
										In order for us to get to know you better,<br></br>please
										follow the steps to complete your profile.
									</label>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-3rem"></div>
							</div>
							{(state.params.step === "google" ||
								state.params.step === "facebook") && (
								<>
									<div className="row">
										<div className="col-8 pl-12">
											<div className="form-outline">
												<label
													className="form-label form f-fm fm-w6-s12"
													htmlFor="form3Example8"
													style={{ marginLeft: "0px" }}
												>
													Create Your Password
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
														onChange={handleChange}
													/>
													<div className="input-group-append">
														<span
															className="input-group-text"
															onClick={togglePassword}
														>
															{state.ptype === "password" && (
																<i
																	className="fa fa-eye-slash"
																	id="show_eye"
																></i>
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
														style={{ width: "55.2px" }}
													></div>
													<div className="form-notch-trailing"></div>
												</div>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-8 pl-12">
											<div className="form-outline">
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
													Password must be at least 8 characters long with at
													least 1 Upper Case, 1 lower case and 1 special
													character except (.).
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
										</div>
									</div>
								</>
							)}
							<div className="row">
								<div className="col pl-12 pt-4">
									<utils.aeButton
										classNames="aebutton fm-w6-s18"
										text="Let's start"
										enabled="false"
										disabledClass={getclassname()}
										onClick={showNextStep}
									/>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12 imgalign">
							<img
								style={{ width: "100%" }}
								loading="lazy"
								className="body-bg-clinic-s1"
								alt="clinic"
							></img>
						</div>
					</div>
				</div>
			</div>
		</>
	) : (
		<>
			<utils.aeLoader></utils.aeLoader>
		</>
	);
};
export default Welcome;
