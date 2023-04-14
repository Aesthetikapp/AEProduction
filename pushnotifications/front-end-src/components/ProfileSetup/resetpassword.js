import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validPasswordExp } from "../../common/validations";
import * as utils from "../../common/util";
import * as UserServices from "../../services/user";

const Resetpassword = () => {
	const params = {
		params: useParams(),
	};
	// console.log("params", params.params.userid);

	const [state, setState] = useState({
		id: params.params.userid,
		password: "",
		confirmpassword: "",
		validpassword: false,
		pcolor: "#FFFFFF",
		ecolor: "#FFFFFF",
		ptype: "password",
		cptype: "password",
	});
	const [comparePasswords, setComparePasswords] = useState(false);

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
			rvalue = "aebuttonblack";
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
						pcolor = "#777777";
					} else if (state.validpassword && state.password !== "") {
						pcolor = "#FFFFFF";
					} else {
						pcolor = "#FFFFFF";
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
		const updateVariables = UserServices.returnUpdateVariables({
			id: params.params.userid,
			password: state.password,
		});
		console.log(updateVariables);
		UserServices.UpdateUser(updateVariables).then((value) => {
			// console.log("value", value);
			navigate("../login");
		});
	};
	return (
		<>
			{/* {utils.aeProgressBar({ width: "12.5%" })} */}

			<div className="slider">
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
								<div className="col pl-2 pt-2rem"></div>
							</div>
							<div className="row">
								<div className="col-8 pl-12">
									<label className="f-rl fm-w7-s36">
										Please enter following information to proceed
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
											style={{ marginLeft: "0px" }}
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
											style={{ marginLeft: "0px" }}
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
												className="input form-control form-control-lg"
												value={state.confirmpassword}
												onChange={handleChange}
											/>
											<div className="input-group-append">
												<span
													className="input-group-text"
													onClick={toggleConfirmPassword}
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
											Password must be at least 8 characters long with at least
											1 Upper Case, 1 lower case and 1 special character except
											(.).
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
													color: "#777777",
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
												color: "#777777",
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
							</div>
							<div className="row">
								<div className="col pl-2 pt-3rem"></div>
							</div>
							<div className="row">
								<div className="col pl-12">
									<utils.aeButton
										classNames="aebutton fm-w6-s18"
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
						<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12 imgalign">
							<img
								loading="lazy"
								className="body-bg-clinic-s3"
								alt="clinic"
							></img>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Resetpassword;
