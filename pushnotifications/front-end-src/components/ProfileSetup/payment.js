import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { Animated } from "react-animated-css";
import * as utils from "../../common/util";
import * as UserServices from "../../services/user";
import { Baseurl } from "../../common/util";
import axios from "axios";

const baseurl = Baseurl() + "onboard-user";
const baseurlrefresh = Baseurl() + "onboard-user/refresh";

const Payment = () => {
	const navigate = useNavigate();
	const params = useLocation().state;
	const firstupdate = useRef(true);
	const [dstate, setDstate] = useState({
		params,
	});
	const [loader, setLoader] = useState(false);
	// console.log(dstate);
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

	useEffect(() => {
		if (!dstate.params.isadmin) {
			const updateVariable = UserServices.returnUpdateVariables({
				id: dstate.params.id,
				complete: "complete",
			});
			console.log(updateVariable);
			const settingsVariable = UserServices.returnCreateSettings({
				id: dstate.params.id,
				// subscription_id: selectedPlan,
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
			UserServices.UpdateUser(updateVariable).then((value) => {
				console.log(value);
				// navigate("../dashboard", { state: dstate.params });
			});
		}
	}, []);

	useLayoutEffect(() => {
		console.log(firstupdate.current);

		if (firstupdate.current) {
			return;
		}
		setLoader(true);
		console.log("Updated State", state);
		dstate.params.currentstep = (
			parseInt(dstate.params.currentstep) + 1
		).toString();
		const updateVariables = UserServices.returnUpdateVariables({
			id: dstate.params.id,
			//   currentstep: "8",
			step: dstate.params.step.toString(),
			prevstep: dstate.params.prevstep.toString(),
			// payment: "no payment",
		});
		console.log(updateVariables);
		UserServices.UpdateUser(updateVariables).then((value) => {
			firstupdate.current = true;
			console.log(value);
			// navigate("../subscribe", { state: dstate.params });
			if (dstate.params.payment === "") {
				axios
					.post(baseurl, {
						state: dstate.params,
					})
					.then((response) => {
						console.log("response", response);
						if (response.data) {
							window.location.href = response.data;
							// window.open(response.data, "_blank", "noopener,noreferrer");
						}
					})
					.catch((err) => console.log(err.message));
			} else {
				axios
					.post(baseurlrefresh, {
						accountId: dstate.params.payment.split("|")[0],
						id: dstate.params.id,
					})
					.then((response) => {
						console.log("response", response);
						if (response.data) {
							window.location.href = response.data;
							// window.open(response.data, "_blank", "noopener,noreferrer");
						}
					})
					.catch((err) => console.log(err.message));
			}
		});
	}, [state]);

	const showNextStep = (doctortype) => {
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
			{utils.aeProgressBar({ width: "75.5%" })}
			<div>
				{loader === true && (
					<div className={loader === true ? "parentDisable" : ""} width="100%">
						<div className="overlay-box">
							<div class="spinner-border" role="status">
								<span class="sr-only">Loading...</span>
							</div>
						</div>
					</div>
				)}
			</div>

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
								<div className="col pl-2 pt-4rem"></div>
							</div>
							<div className="row">
								<div></div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-2rem"></div>
							</div>
							<div className="row">
								<div className="col pl-12"></div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-3rem"></div>
							</div>
							<div className="row">
								<div className="col pl-12"></div>
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
										{dstate.params.payment !== "" &&
											dstate.params.payment.split("|")[1] === "pending" && (
												<div
													style={{
														fontStyle: "normal",
														fontWeight: "600",
														fontSize: "20px",
													}}
												>
													<br />
													Please complete your Connect account with stripe
												</div>
											)}
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
									{/* <form action={baseurl} method="POST"> */}
									<utils.aeButton
										text="Connect with "
										onClick={() => showNextStep("Doctor")}
										classNames="f-rl aebutton aebuttonblack aebuttonstripe fm-w6-s20 pt-3"
									></utils.aeButton>
									{/* </form> */}
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
		</>
	);
};
export default Payment;
