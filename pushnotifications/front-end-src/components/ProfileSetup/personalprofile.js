import React, { useState, useLayoutEffect, useRef, createRef } from "react";
// import { Animated } from "react-animated-css";
import { useNavigate, useLocation } from "react-router-dom";
import * as utils from "../../common/util";
import * as UserServices from "../../services/user";
import * as moment from "moment";
import Cropmodal from "./cropmodal";
import validator from "validator";
import PhoneInput from "react-phone-number-input";
import Internationalphone from "../../common/internationalphone";
import { format } from "date-fns";

const ref = createRef();

const Personalprofile = () => {
	const navigate = useNavigate();
	const params = useLocation().state;
	const firstupdate = useRef(true);
	const [file, setFile] = useState();
	const [state, setState] = useState({
		params,
		phone: "",
	});
	const [backspace, setBackSpace] = useState(false);
	const [phonealreadyexist, setPhonealreadyexist] = useState(false);

	// console.log("params",params);
	console.log("state", state);

	const userName = state.params.email.replace(/[^a-zA-Z0-9]/g, "") + "/";

	useLayoutEffect(() => {
		if (state.params.source === "web" || state.params.source === "") {
			state.params.dob = "";
			setState({ ...state, params: state.params });
		}
	}, [state.params.source]);

	useLayoutEffect(() => {
		console.log(firstupdate.current);

		console.log("dob", state.params.dob);
		if (firstupdate.current) {
			return;
		}
		if (state.params.source === "mobile") {
			var dobarray = state.params.dob.split("-");
			if (!dobarray[2].split("T")[0] === "undefined") {
				var d =
					dobarray[2].split("T")[0] + "/" + dobarray[1] + "/" + dobarray[0];
			}
		}
		// else {
		// 	if (!dobarray[2].split("T")[0] === "undefined") {
		state.params.dob =
			state.params.dob.split("/")[2] +
			"-" +
			state.params.dob.split("/")[1] +
			"-" +
			state.params.dob.split("/")[0];
		// 	}
		// }

		console.log("dob", state.params.dob);
		console.log("Updated State", state);
		if (
			state.params.step === "google" ||
			state.params.step === "facebook" ||
			state.params.source === "mobile"
		) {
			const updateVariables = UserServices.returnUpdateVariables({
				id: state.params.id,
				currentstep: "5",
				step: state.params.step.toString(),
				prevstep: state.params.prevstep.toString(),
				gender: state.params.gender,
				primaryTelephone: state.phone,
				avatar: process.env.REACT_APP_AWS_S3 + userName + file.name,
				dob: state.params.source === "mobile" ? d : state.params.dob,
				bio1: state.params.bio1,
			});
			console.log("file", file);
			console.log("updateVariables", updateVariables);

			(async function anyNameFunction() {
				console.log("enter");
				const existUserphone = await UserServices.GetUserByPhone(state.phone);
				if (existUserphone.userByPhone.length === 0) {
					setPhonealreadyexist(false);
					const formData = new FormData();
					formData.append("file", file);
					formData.append("user", userName);
					console.log("formdata", formData);
					UserServices.Uploadandupdate(formData, updateVariables).then(
						(result) => {
							console.log("result", result);
							navigate("../adddocument", { state: state.params });
						}
					);
				} else {
					setPhonealreadyexist(true);
				}
			})();
		}
		if (state.params.step === "") {
			const updateVariables = UserServices.returnUpdateVariables({
				id: state.params.id,
				currentstep: "5",
				step: state.params.step.toString(),
				prevstep: state.params.prevstep.toString(),
				gender: state.params.gender,
				avatar: process.env.REACT_APP_AWS_S3 + userName + file.name,
				dob: state.params.source === "mobile" ? d : state.params.dob,
				bio1: state.params.bio1,
			});
			console.log(file);

			(async function anyNameFunction() {
				const formData = new FormData();
				formData.append("file", file);
				formData.append("user", userName);
				console.log(formData);
				UserServices.Uploadandupdate(formData, updateVariables).then(
					(result) => {
						console.log("res", result);
						navigate("../adddocument", { state: state.params });
					}
				);
			})();
		}
		firstupdate.current = true;
	});

	const showNextStep = (doctortype) => {
		let sindex = state.params.currentstep;
		sindex++;
		state.params.currentstep = sindex.toString();
		firstupdate.current = false;
		setState({ ...state, params: state.params });
	};
	const handleChange = (event) => {
		if (event.target.name === "dob") {
			const re = /^[0-9-/\b]+$/;

			console.log(event.target.value);

			if (event.target.value === "" || re.test(event.target.value)) {
				if (
					(event.target.value.length === 2 ||
						event.target.value.length === 5) &&
					!backspace
				) {
					state.params.dob = event.target.value + "/";
				} else {
					state.params.dob = event.target.value;
				}
			}

			document
				.getElementById("txtFirstName")
				.addEventListener("keydown", function (event) {
					if (event.keyCode == 8) {
						console.log("BACKSPACE was pressed");
						setBackSpace(true);
						// Call event.preventDefault() to stop the character before the cursor
						// from being deleted. Remove this line if you don't want to do that.
					} else {
						setBackSpace(false);
					}
				});
		}
		if (event.target.name === "bio") {
			state.params.bio1 = event.target.value;
		}

		setState({ ...state, params: state.params });
		console.log(state);
	};

	const handlePhoneChange = (event) => {
		if (typeof event != "undefined") {
			if (typeof event === "string") {
				state.phone = event;
				setState({ ...state, phone: state.phone });
				setPhonealreadyexist(false);
			}
		}
	};

	const handleSelectChange = (event) => {
		state.params.gender = event.target.value;
		setState({ ...state, params: state.params });
		console.log(state);
	};

	const onImageChange = (image) => {
		// image.name = "Profile.png";
		image = new File([image], "Profile.png", { type: "image/png" });
		console.log(image);
		state.params.avatar = image;
		setState({ ...state, params: state.params });
		setFile(image);
	};

	const getButtonClass = () => {
		console.log(state);
		let rvalue = "aebuttonblack";
		let _plogo = state.params.avatar;
		var validdate;
		if (state.params.source === "mobile") {
			validdate = validator.isDate(
				state.params.dob.split("-")[0] +
					"/" +
					state.params.dob.split("-")[1] +
					"/" +
					state.params.dob.split("-")[2]
			);
		} else {
			validdate = validator.isDate(
				state.params.dob.split("/")[2] +
					"/" +
					state.params.dob.split("/")[1] +
					"/" +
					state.params.dob.split("/")[0]
			);
		}
		console.log("validdate", validdate);

		let svalue;
		if (
			state.params.step === "google" ||
			state.params.step === "facebook" ||
			state.params.source === "mobile"
		) {
			svalue =
				(state.params.dob === "" || !validdate ? "@#@" : state.params.dob) +
				(state.params.gender === "" ? "@#@" : state.params.gender) +
				(state.params.bio1 === "" ? "@#@" : state.params.bio1) +
				(state.phone === "" ? "@#@" : state.phone) +
				(!_plogo || _plogo === "path" ? "@#@" : _plogo);
		} else {
			svalue =
				(state.params.dob === "" || !validdate ? "@#@" : state.params.dob) +
				(state.params.gender === "" ? "@#@" : state.params.gender) +
				(state.params.bio1 === "" ? "@#@" : state.params.bio1) +
				(!_plogo || _plogo === "path" ? "@#@" : _plogo);
		}

		console.log(svalue);
		if (svalue) {
			if (svalue.indexOf("@#@") >= 0) {
				rvalue = "aebuttongrey";
			}
		} else {
			rvalue = "aebuttongrey";
		}
		return rvalue;
	};

	return (
		<>
			{utils.aeProgressBar({ width: "35.5%" })}
			<div className="slider1">
				<div style={{ backgroundColor: "#FFFFFF", overflow: "hidden" }}>
					<div className="row pt-3" style={{ backgroundColor: "#FFFFFF" }}>
						<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12">
							<utils.aeLogo fcolor="color-00" />
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
							<div className="row">
								<div className="col-8 pl-12">
									<label className="f-rl fm-w7-s36 col-lg-12 col-xl-12 col-6">
										Create an account for your business
									</label>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-2rem"></div>
							</div>
							<div className="row">
								<div className="col-sm-8 col-xs-8 col-md-8 col-xl-6 col-lg-6 col-8 pl-12">
									<div className="form-outline">
										<label
											className="form-label form f-fm fm-w6-s12"
											htmlFor="form3Example8"
										>
											Business Logo
										</label>
										<br></br>
										<Cropmodal onImageChange={onImageChange}></Cropmodal>
										<br></br>
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
									<div className="form-outline">
										<label
											className="form-label form  f-fm fm-w6-s12"
											htmlFor="form3Example8"
											style={{ marginLeft: "0px" }}
										>
											Business Name
										</label>
										<input
											type="text"
											id="txtbusinessname"
											style={{ height: "60px" }}
											name="businessname"
											defaultValue={state.params.business[0].name}
											className="form-control form-control-lg"
											value={state.email}
											onChange={handleChange}
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
									<div className="form-outline  pt-4">
										<label
											className="form-label form  f-fm fm-w6-s12"
											htmlFor="form3Example8"
											style={{ marginLeft: "0px" }}
										>
											Business Location
										</label>
										<div className="gplaces"></div>
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
									<div className="form-outline pt-4">
										<label
											className="form-label form  f-fm fm-w6-s12"
											htmlFor="form3Example8"
											style={{ marginLeft: "0px" }}
										>
											Business Website
										</label>
										<input
											type="text"
											id="txtbusinesswebsite"
											style={{ height: "60px" }}
											name="businesswebsite"
											defaultValue={state.params.business[0].website}
											className="form-control form-control-lg"
											value={state.email}
											onChange={handleChange}
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
									<div className="form-outline pt-4">
										<label
											className="form-label form  f-fm fm-w6-s12"
											htmlFor="form3Example8"
											style={{ marginLeft: "0px" }}
										>
											Number Of Employees
										</label>
										<select
											className="form-select form-select-lg mb-3"
											name="noofemployees"
											defaultValue={state.params.business[0].noofemployees}
											aria-label=".form-select-lg example"
											onChange={handleSelectChange}
										>
											<option value=""></option>
											<option value="1-10">1-10</option>
											<option value="11-50">11-50</option>
											<option value="51-200">51-200</option>
											<option value="201-500">201-500</option>
											<option value="501-1000">501-1000</option>
											<option value="1001-5000">1001-5000</option>
											<option value=">5000">&gt;5000</option>
										</select>
										<div className="form-notch">
											<div
												className="form-notch-middle"
												style={{ width: "55.2px" }}
											></div>
											<div className="form-notch-trailing"></div>
										</div>
									</div>
									<div className="form-outline pt-3">
										<label
											className="form-label form f-fm fm-w6-s12"
											htmlFor="form3Example8"
											style={{ marginLeft: "0px" }}
										>
											BIO
										</label>
										<textarea
											className="form-control"
											id="exampleFormControlTextarea1"
											rows="3"
											name="bio"
											defaultValue={state.params.business[0].bio}
											onChange={handleChange}
										></textarea>
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
								<div className="col pl-2 pt-3rem"></div>
							</div>
							<div className="row">
								<div className="col pl-12">
									<utils.aeButton
										classNames="aebutton fm-w6-s18"
										text="Create"
										enabled="false"
										disabledClass={getButtonClass()}
										onClick={() => showNextStep("Doctor")}
									/>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12 imgalign">
							<img
								style={{ width: "100%" }}
								loading="lazy"
								className="body-bg-clinic-s3"
								alt="clinic"
							></img>
						</div>
					</div>
				</div>
			</div>
			<div className="slider">
				<div style={{ backgroundColor: "#FFFFFF", overflow: "hidden" }}>
					<div className="row pt-3" style={{ backgroundColor: "#FFFFFF" }}>
						<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
							<utils.aeLogo fcolor="color-00" />
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-1"></div>
							</div>
							<div className="row">
								<div className="col-8 pl-12">
									<label className="coral f-rl fm-w7-s20">
										Your business account is now set up!
									</label>
									<br></br>
									<label className=" f-rl fm-w7-s36 pt-1">
										Let us now know a little bit about you:)
									</label>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-2rem"></div>
							</div>
							<div className="row">
								<div className="col-sm-8 col-xs-8 col-md-8 col-xl-6 col-lg-6 col-8 pl-12">
									<div className="form-outline">
										<label
											className="form-label form f-fm fm-w6-s12"
											htmlFor="form3Example8"
											style={{ marginLeft: "0px" }}
										>
											Your Avatar
										</label>
										<br></br>
										<Cropmodal onImageChange={onImageChange}></Cropmodal>
										<br></br>
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
									<div className="form-outline">
										<div className="row">
											<div className="col-md-6">
												<div className="form-outline">
													<label
														className="form-label form f-fm fm-w6-s12"
														htmlFor="form3Example1m"
														style={{ marginLeft: "0px" }}
													>
														Date Of Birth
													</label>
													<div
														className="form-inline"
														style={{ display: "flex" }}
													>
														{state.params.source === "mobile" ? (
															<input
																type="text"
																placeholder="DD/MM/YYYY"
																id="txtFirstName"
																name="dob"
																maxLength={10}
																className="form-control form-control-lg"
																value={moment(
																	state.params.dob,
																	"YYYY-MM-DD"
																).format("DD/MM/YYYY")}
																onChange={handleChange}
																disabled
															/>
														) : (
															<input
																type="text"
																placeholder="DD/MM/YYYY"
																id="txtFirstName"
																name="dob"
																maxLength={10}
																className="form-control form-control-lg"
																value={state.params.dob}
																onChange={handleChange}
															/>
														)}
													</div>
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
														className="form-label form f-fm fm-w6-s12"
														htmlFor="form3Example1n"
														style={{ marginLeft: "0px" }}
													>
														Gender
													</label>
													{state.params.source === "mobile" ? (
														<select
															className="form-select form-select-lg mb-3"
															name="gender"
															disabled
															defaultValue={state.params.gender}
															aria-label=".form-select-lg example"
															onChange={handleSelectChange}
														>
															<option value=""></option>
															<option value="Male">Male</option>
															<option value="Female">Female</option>
															<option value="non-binary">non-binary</option>
														</select>
													) : (
														<select
															className="form-select form-select-lg mb-3"
															name="gender"
															defaultValue={state.params.gender}
															aria-label=".form-select-lg example"
															onChange={handleSelectChange}
														>
															<option value=""></option>
															<option value="Male">Male</option>
															<option value="Female">Female</option>
															<option value="non-binary">non-binary</option>
														</select>
													)}
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
									{(state.params.step === "google" ||
										state.params.step === "facebook" ||
										state.params.source === "mobile") && (
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
												onChange={handlePhoneChange}
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
														marginLeft: "0px",
														marginTop: "-6px",
														fontStyle: "normal",
														fontWeight: "400",
														fontSize: "12px",
														color: "red",
													}}
												>
													Sorry this mobile number is already registered
												</label>
											)}
										</div>
									)}

									<div className="form-outline pt-3">
										<label
											className="form-label form f-fm fm-w6-s12"
											htmlFor="form3Example8"
											style={{ marginLeft: "0px" }}
										>
											BIO
										</label>
										<textarea
											className="form-control"
											id="exampleFormControlTextarea1"
											rows="3"
											name="bio"
											defaultValue={state.params.bio1}
											onChange={handleChange}
										></textarea>
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
								<div className="col pl-2 pt-3rem"></div>
							</div>
							<div className="row">
								<div className="col pl-12">
									<utils.aeButton
										classNames="aebutton fm-w6-s18"
										text="Create"
										enabled="false"
										disabledClass={getButtonClass()}
										onClick={() => showNextStep("Doctor")}
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
								className="body-bg-clinic-s4"
								alt="clinic"
							></img>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Personalprofile;
