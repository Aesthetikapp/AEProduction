import React, { useState, useLayoutEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { Animated } from "react-animated-css";
import * as utils from "../../common/util";
import * as UserServices from "../../services/user";
import Sumsub from "../sumsub";
import { Baseurl } from "../../common/util";

const axios = require("axios").default;
// var baseurl1;
// if (process.env.REACT_APP_HOST === "local") {
// 	baseurl1 = "http://localhost:3001/";
// } else if (process.env.REACT_APP_HOST === "123") {
// 	baseurl1 = "http://123.176.43.187:3004/";
// } else {
// 	baseurl1 = window.location.origin + "/api/";
// }

const AddDocument = () => {
	const navigate = useNavigate();
	const params = useLocation().state;
	const firstupdate = useRef(true);
	const [dstate, setDstate] = useState({
		params,
	});
	console.log(dstate);
	const [state, setState] = useState({
		id: params.id,
		username: params.username,
		step: params.step,
		currentstep: params.currentstep,
		prevstep: params.prevstep,
		doctortype: params.doctortype,
		clinicname: params.clinicname,
		businessname: params.bussinessname,
		businesswebsite: params.businesswebsite,
		noofemployees: params.noofemployees,
		blogo: params.blogo,
		plogo: params.plogo,
		dob: params.dob,
		gender: params.gender,
		bio: params.bio,
		idverification: [],
		medicallicence: [],
		trainingdocs: [],
		professionalmedicalinsurance: [],
		employmentverification: [],
	});
	console.log("dstate.params.isadmin", dstate.params.isadmin);

	useLayoutEffect(() => {
		axios({
			url: Baseurl() + "sumsubdoctor",
			method: "GET",
		})
			.then((res) => {
				if (res.data === "") {
					const updateVariables = UserServices.returnUpdateVariables({
						id: dstate.params.id,
						currentstep: "6",
						step: dstate.params.step.toString(),
						prevstep: dstate.params.prevstep.toString(),
					});
					UserServices.UpdateUser(updateVariables).then((value) => {
						console.log(value);
						navigate("../thankyou", { state: dstate.params });
					});
				}
				console.log("google api key", res.data);
			})
			.catch((err) => console.log(err));

		console.log(firstupdate.current);
		if (firstupdate.current) {
			return;
		}

		console.log("Updated State", state);
		const updateVariables = UserServices.returnUpdateVariables({
			id: dstate.params.id,
			// currentstep: dstate.params.currentstep.toString(),
			currentstep: "6",
			step: dstate.params.step.toString(),
			prevstep: dstate.params.prevstep.toString(),
			verification: [
				{
					idv: state.idverification[0].name,
					ml: state.medicallicence[0].name,
					od: state.trainingdocs[0].name,
					ev: state.employmentverification[0].name,
					mi: state.professionalmedicalinsurance[0].name,
				},
			],
		});
		console.log(updateVariables);
		const data = new FormData();

		data.append("id", params.id);
		data.append("phone", params.primaryTelephone);

		UserServices.UpdateUser(updateVariables).then((value) => {
			console.log(value);
			navigate("../thankyou", { state: dstate.params });
		});
	}, [state, dstate]);

	const gotonextpage = () => {
		const updateVariables = UserServices.returnUpdateVariables({
			id: dstate.params.id,
			currentstep: "6",
			step: dstate.params.step.toString(),
			prevstep: dstate.params.prevstep.toString(),
		});
		UserServices.UpdateUser(updateVariables).then((value) => {
			console.log(value);
			navigate("../thankyou", { state: dstate.params });
		});
	};
	const showNextStep = (doctortype) => {
		let sindex = state.currentstep;
		sindex++;
		let prevstep = state.currentstep;
		let step = state.step;
		dstate.params.currentstep = (
			parseInt(dstate.params.currentstep) + 1
		).toString();
		setDstate({ ...dstate, params: dstate.params });

		setState((prevState) => ({
			id: params.id,
			username: params.username,
			step: step,
			prevstep: prevstep,
			currentstep: sindex,
			doctortype: params.doctortype,
			clinicname: params.clinicname,
			businessname: params.businessname,
			businesswebsite: params.businesswebsite,
			noofemployees: params.noofemployees,
			blogo: params.blogo,
			plogo: params.plogo,
			dob: params.dob,
			gender: params.gender,
			bio: params.bio,
			idverification: prevState.idverification,
			medicallicence: prevState.medicallicence,
			trainingdocs: prevState.trainingdocs,
			professionalmedicalinsurance: prevState.professionalmedicalinsurance,
			employmentverification: prevState.employmentverification,
		}));
		firstupdate.current = false;
	};

	const getButtonClass = () => {
		console.log(state);
		let rvalue = "aebuttonblack";
		let svalue =
			(!state.idverification[0] ? "@#@" : state.idverification[0]) +
			(!state.idverification[1] ? "@#@" : state.idverification[1]) +
			(!state.medicallicence[0] ? "@#@" : state.medicallicence[0]) +
			(!state.trainingdocs[0] ? "@#@" : state.trainingdocs[0]) +
			(!state.professionalmedicalinsurance[0]
				? "@#@"
				: state.professionalmedicalinsurance[0]) +
			(!state.employmentverification[0]
				? "@#@"
				: state.employmentverification[0]);
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
			{utils.aeProgressBar({ width: "58%" })}
			<div className="slider1">
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
														<input
															type="text"
															placeholder="DD/MM/YYYY"
															id="txtFirstName"
															name="dob"
															maxLength={10}
															// defaultValue={state.params.dob}
															className="form-control form-control-lg"
															// value={state.params.dob}
															// onChange={handleChange}
														/>
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
													<select
														className="form-select form-select-lg mb-3"
														name="gender"
														// defaultValue={state.params.gender}
														aria-label=".form-select-lg example"
														// onChange={handleSelectChange}
													>
														<option value=""></option>
														<option value="Male">Male</option>
														<option value="Female">Female</option>
														<option value="non-binary">non-binary</option>
													</select>
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
											// defaultValue={state.params.bio1}
											// onChange={handleChange}
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
								<div className="col-8 pl-10">
									<label className="f-rl fm-w7-s36">
										You need to upload the following documents
									</label>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-2rem"></div>
							</div>
							<Sumsub params={params} gotonextpage={gotonextpage}></Sumsub>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12 imgalign">
							<img
								style={{ width: "100%" }}
								loading="lazy"
								className="body-bg-clinic-s5"
								alt="clinic"
							></img>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default AddDocument;
