import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validPasswordExp } from "../../common/validations";
import * as utils from "../../common/util";
// import * as UserServices from "../../services/user";
import * as PatientServices from "../../services/patient";

const Patientresetpassword = () => {
	const params = {
		params: useParams(),
	};
	// console.log("params", params.params.userid);

	const [state, setState] = useState({
		id: params.params.userid,
		password: "",
		confirmpassword: "",
		validpassword: false,
		pcolor: "#000",
		ecolor: "#FFFFFF",
		ptype: "password",
		cptype: "password",
	});
	const [comparePasswords, setComparePasswords] = useState(false);
	const [show, setShow] = useState(true);

	useEffect(() => {
		if (
			state.confirmpassword !== "" &&
			state.password !== state.confirmpassword
		) {
			setComparePasswords(true);
		} else {
			setComparePasswords(false);
		}
	}, [state.confirmpassword, state.password]);

	const getclassname = () => {
		let vtext =
			(state.password === "" ? "@#@" : state.password) +
			(state.confirmpassword === "" ? "@#@" : state.confirmpassword) +
			(state.confirmpassword !== state.password
				? "@#@"
				: state.confirmpassword);

		let validf = state.validpassword ? "true" : "@#@";
		vtext = vtext + validf;
		let rvalue = "aebuttongrey";

		if (vtext.indexOf("@#@") >= 0) {
			rvalue = "aebuttongrey";
		} else {
			rvalue = "aebuttonwhite";
		}
		return rvalue;
	};

	const togglePassword = (event) => {
		let ptype = "password";

		ptype = state.ptype === "password" ? "text" : "password";

		setState((prevState) => ({
			id: prevState.id,
			password: prevState.password,
			confirmpassword: prevState.confirmpassword,
			validpassword: prevState.validpassword,
			pcolor: prevState.pcolor,
			ecolor: prevState.ecolor,
			ptype: ptype,
			cptype: prevState.cptype,
		}));
	};
	const toggleConfirmPassword = (event) => {
		let cptype = "password";

		cptype = state.cptype === "password" ? "text" : "password";
		setState((prevState) => ({
			id: prevState.id,
			password: prevState.password,
			confirmpassword: prevState.confirmpassword,
			validpassword: prevState.validpassword,
			pcolor: prevState.pcolor,
			ecolor: prevState.ecolor,
			ptype: prevState.ptype,
			cptype: cptype,
		}));
	};

	const handleChange = (event) => {
		if (typeof event != "undefined") {
			if (typeof event === "string") {
				state.phone = event;
			} else {
				let vp = validPasswordExp.test(event.target.value);
				let pcolor = "#FFFFFF";

				setState({ ...state, [event.target.name]: event.target.value });
				if (event.target.name === "password") {
					if (!vp) {
						pcolor = "#FFFFFF";
					} else if (state.validpassword && state.password !== "") {
						pcolor = "#000000";
					} else {
						pcolor = "#000000";
					}
					setState((prevState) => ({
						id: prevState.id,
						password: prevState.password,
						confirmpassword: prevState.confirmpassword,
						validpassword: vp,
						pcolor: pcolor,
						ecolor: prevState.ecolor,
						ptype: prevState.ptype,
						cptype: prevState.cptype,
					}));
				}
			}
		}
	};

	const navigate = useNavigate();
	const firstupdate = useRef(true);

	console.log(state);
	useLayoutEffect(() => {
		if (firstupdate.current) {
			return;
		}
	}, [state]);

	const showNextStep = (doctortype, type) => {
		console.log(state);
		const updateVariables = PatientServices.returnUpdateVariables({
			id: params.params.userid,
			password: state.password,
		});
		console.log(updateVariables);
		PatientServices.UpdatePatientUser(updateVariables).then((value) => {
			console.log("value", value);
			// navigate("../login");
			setShow(false);
		});
	};
	return (
		<>
			{/* {utils.aeProgressBar({ width: "12.5%" })} */}
			<div className="progress-col">
				<div className="progress aeprogress">
					<div
						className="progress-bar eprogress-bar"
						style={{ width: "100%", backgroundColor: "#fff" }}
						role="progressbar"
						aria-valuenow="0"
						aria-valuemin="0"
						aria-valuemax="100"
					></div>
				</div>
			</div>

			<div className="slider">
				<div style={{ backgroundColor: "#000000", overflow: "hidden" }}>
					<div className="row pt-3" style={{ backgroundColor: "#000" }}>
						{show && (
							<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
								<utils.aeLogo fcolor="color-FF" />
								<div className="row">
									<div className="col pl-2 pt-4rem"></div>
								</div>
								<div className="row">
									<div className="col pl-2 pt-4rem"></div>
								</div>
								<div className="row">
									<div className="col pl-2 pt-2rem"></div>
								</div>
								<div className="row">
									<div className="col-8 pl-12">
										<label className="f-rl fm-w7-s36">
											{/* Please enter following information to proceed */}
										</label>
									</div>
								</div>
								<div className="row">
									<div className="col pl-2 pt-2rem"></div>
								</div>

								<div className="row">
									<div className="col-8 pl-12">
										<div className="form-outline">
											<label
												className="form-label form f-fm fm-w6-s12"
												htmlFor="form3Example8"
												style={{ marginLeft: "0px", color: "#fff" }}
											>
												New Password
											</label>
											<div
												className="input-group mb-3"
												style={{ cursor: "pointer" }}
											>
												<input
													type={state.ptype}
													id="txtPassword"
													name="password"
													className="input form-control-patient form-control-lg"
													// style={{
													// 	backgroundColor: "#000",
													// 	color: "#fff",
													// }}
													value={state.password}
													onChange={handleChange}
												/>
												<div className="input-group-append">
													<span
														className="input-group-text"
														onClick={togglePassword}
														style={{
															backgroundColor: "#000",
															color: "#fff",
														}}
													>
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
												className="form-label form f-fm fm-w6-s12"
												htmlFor="form3Example8"
												style={{ marginLeft: "0px", color: "#fff" }}
											>
												Confirm New Password
											</label>
											<div
												className="input-group mb-3"
												style={{ cursor: "pointer" }}
											>
												<input
													type={state.cptype}
													id="txtConfirmPassword"
													name="confirmpassword"
													className="input form-control-patient form-control-lg"
													value={state.confirmpassword}
													onChange={handleChange}
												/>
												<div className="input-group-append">
													<span
														className="input-group-text"
														onClick={toggleConfirmPassword}
														style={{
															backgroundColor: "#000",
															color: "#fff",
														}}
													>
														{state.cptype === "password" && (
															<i className="fa fa-eye-slash" id="show_eye"></i>
														)}
														{state.cptype === "text" && (
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
												least 1 Upper Case, 1 lower case and 1 special character
												except (.).
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
								{comparePasswords && (
									<div className="row">
										<div className="col-8 pl-12 mb-2">
											<div className="form-outline">
												<label
													id="lblMessage"
													style={{
														marginLeft: "0px",
														marginTop: "-6px",
														fontStyle: "normal",
														fontWeight: "400",
														fontSize: "12px",
														color: "#FFF",
													}}
												>
													Passwords Don't Match
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
								)}
								{/* <div className="row">
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
												color: "#fff",
											}}
										>
											<b>Note:</b> After clicking on submit button you will be
											redirected to login page, where you have to login with the
											new password.
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
							</div> */}
								<div className="row">
									<div className="col pl-2 pt-3rem"></div>
								</div>
								<div className="row">
									<div className="col pl-12">
										<utils.aeButton
											classNames="aebutton color-00 fm-w6-s18"
											text="Submit"
											enabled="false"
											disabledClass={getclassname()}
											onClick={() => showNextStep("Doctor", "business")}
										/>
									</div>
								</div>
								<div className="row">
									<div className="col pl-2 pt-4rem"></div>
								</div>
							</div>
						)}
						{!show && (
							<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
								<utils.aeLogo fcolor="color-FF" />
								<div className="row">
									<div className="col pl-2 pt-4rem"></div>
								</div>
								<div className="row">
									<div className="col pl-2 pt-4rem"></div>
								</div>
								<div className="row">
									<div className="col pl-2 pt-2rem"></div>
								</div>
								<div className="row">
									<div className="col-8 pl-12">
										<label className="f-rl fm-w7-s36 color-FF">
											Your Password has been updated Successfully, please login
											to your account with new password.
										</label>
									</div>
								</div>
								<div className="row">
									<div className="col pl-2 pt-2rem"></div>
								</div>
							</div>
						)}
						<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12 imgalign">
							<img
								loading="lazy"
								className="body-bg-clinic-patientreset"
								alt="clinic"
							></img>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Patientresetpassword;
