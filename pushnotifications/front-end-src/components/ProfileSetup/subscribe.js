import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as utils from "../../common/util";
import * as UserServices from "../../services/user";

const Subscribe = () => {
	const navigate = useNavigate();
	const params = useLocation().state;
	const firstupdate = useRef(true);
	const [dstate, setDstate] = useState({
		params,
	});
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
	});
	const [subscription, setSubscription] = useState();
	const [getSub, setGetSub] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState("");
	useEffect(() => {
		function getData() {
			(async function () {
				var c = await UserServices.GetSubscription();
				console.log(c.Subscription);
				setSubscription(c.Subscription);
				setGetSub(true);
			})();
		}
		getData();
	}, []);

	useLayoutEffect(() => {
		console.log(firstupdate.current);
		if (firstupdate.current) {
			return;
		}
		if (!dstate.params.isadmin) {
			const updateVariable = UserServices.returnUpdateVariables({
				id: dstate.params.id,
				complete: "complete",
			});
			console.log(updateVariable);
			UserServices.UpdateUser(updateVariable).then((value) => {
				console.log(value);
				navigate("../dashboard", { state: dstate.params });
			});
		}

		console.log("Updated State", state);
		dstate.params.currentstep = (
			parseInt(dstate.params.currentstep) + 1
		).toString();
		const updateVariables = UserServices.returnUpdateVariables({
			id: dstate.params.id,
			currentstep: "8",
			step: dstate.params.step.toString(),
			prevstep: dstate.params.prevstep.toString(),
			plan: "free",
			complete: "complete",
		});
		console.log(updateVariables);
		const settingsVariable = UserServices.returnCreateSettings({
			id: dstate.params.id,
			subscription_id: selectedPlan,
		});
		console.log(settingsVariable);
		UserServices.CreateSettings(settingsVariable).then((result) => {
			console.log("entered update");
			console.log(result);
		});
		UserServices.CreateAgoraUser({
			username: dstate.params.email.replace(/[^a-zA-Z0-9]/g, ""),
			password: "agorachat",
			nickname: dstate.params.firstName,
		});
		UserServices.UpdateUser(updateVariables).then((value) => {
			console.log(value);
			localStorage.setItem("throughsignup", true);
			navigate("../dashboard", { state: dstate.params });
		});
	}, [state]);

	const showNextStep = (doctortype, s_id) => {
		setSelectedPlan(s_id);
		let sindex = state.currentstep;
		sindex++;
		state.currentstep = sindex;

		setState((prevState) => ({
			id: params.id,
			username: params.username,
			step: prevState.step,
			prevstep: prevState.prevstep,
			currentstep: prevState.currentstep,
			doctortype: prevState.doctortype,
			clinicname: prevState.clinicname,
			businessname: prevState.businessname,
			businesswebsite: prevState.businesswebsite,
			noofemployees: prevState.noofemployees,
			blogo: prevState.blogo,
			plogo: prevState.plogo,
			dob: prevState.dob,
			gender: prevState.gender,
			bio: prevState.bio,
		}));
		firstupdate.current = false;
		//setModalShow(true)
	};

	return (
		<>
			{utils.aeProgressBar({ width: "100%" })}

			<div className="slider1">
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
								<div className="col-8 pl-12">
									<label
										style={{
											fontStyle: "normal",
											fontWeight: "700",
											fontSize: "34px",
										}}
									>
										Connect your Business <br></br>Account via{" "}
										<span
											style={{
												fontStyle: "normal",
												fontWeight: "700",
												fontSize: "34px",
												color: "#216AC2",
											}}
										>
											Stripe
										</span>
									</label>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-2rem"></div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-3rem"></div>
							</div>
							<div className="row">
								<div className="col pl-12" style={{ zIndex: 1 }}>
									<utils.aeButton
										text="Connect with "
										onClick={() => showNextStep("Doctor")}
										classNames="f-rl aebutton aebuttonblack aebuttonstripe fm-w6-s20 pt-3"
									></utils.aeButton>
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
								className="body-bg-clinic-s6"
								alt="clinic"
							></img>
						</div>
					</div>
				</div>
			</div>
			<div className="slider">
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
									<label
										style={{
											fontStyle: "normal",
											fontWeight: "700",
											fontSize: "34px",
										}}
										className="col-lg-12 col-xl-12 col-8"
									>
										Choose a plan that works best for you and your team.
									</label>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-2rem"></div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-3rem"></div>
							</div>
							<div className="row">
								<div className="col-sm-8 col-xs-8 col-md-8 col-xl-6 col-lg-6 col-8 pl-12 marginleftzero">
									{getSub &&
										subscription.map(
											(k) =>
												k.active && (
													<div
														key={k.name}
														className="card w18"
														style={{
															width: "25rem",
															background: "#FFFFFF",
															boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.22)",
															borderRadius: "10px",
														}}
													>
														<div className="card-body">
															<h5
																className="card-title"
																style={{
																	fontStyle: "normal",
																	fontWeight: "700",
																	fontSize: "24px",
																	padding: "20px",
																}}
															>
																{k.name}
																<span
																	style={{
																		fontWeight: "400",
																		paddingLeft: "4rem",
																		fontFamily: "mulish",
																		fontStyle: "normal",
																	}}
																>
																	{k.amount}
																</span>
															</h5>
															<p
																className="card-text"
																style={{
																	fontStyle: "normal",
																	fontWeight: "400",
																	fontSize: "14px",
																	padding: "8px",
																}}
															>
																{k.details.split("|").map((j) => (
																	<ul>
																		<li key={j}>{j}</li>
																	</ul>
																))}
															</p>
															<p
																className="card-text"
																style={{
																	fontStyle: "normal",
																	fontWeight: "400",
																	fontSize: "14px",
																	padding: "8px",
																	paddingLeft: "25px",
																}}
															>
																{k.bottom_line}
															</p>
															<img
																loading="lazy"
																className="btnselect"
																alt="Next"
																style={{
																	paddingBottom: "30px",
																	paddingTop: "20px",
																	paddingLeft: "25px",
																}}
																onClick={() => showNextStep("Doctor", k.id)}
															></img>
														</div>
													</div>
												)
										)}
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
								className="body-bg-clinic-s7"
								alt="clinic"
							></img>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Subscribe;
