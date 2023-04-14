import React, { useState, useLayoutEffect, useRef } from "react";
// import { Animated } from "react-animated-css";
import { useNavigate, useLocation } from "react-router-dom";
import * as utils from "../../common/util";
import * as UserServices from "../../services/user";

const DoctorOrClinic = () => {
	const navigate = useNavigate();
	const params = useLocation().state;
	const firstupdate = useRef(true);

	const [state, setState] = useState({
		params,
	});
	console.log(state);
	useLayoutEffect(() => {
		console.log(firstupdate.current);
		if (firstupdate.current) {
			return;
		}

		console.log("Updated State", state);
	}, [state]);

	const showNextStep = (event) => {
		event.stopPropagation();
		let sindex = state.params.currentstep;
		sindex++;
		state.params.currentstep = sindex.toString();
		state.params.business[0].btype = event.target.dataset.name;
		const updateVariables = UserServices.returnUpdateVariables({
			id: state.params.id,
			currentstep: "2",
			step: state.params.step.toString(),
			prevstep: state.params.prevstep.toString(),
			business: [
				{
					btype: state.params.business[0].btype,
					location: [{ line1: "", line2: "" }],
				},
			],
		});
		UserServices.UpdateUser(updateVariables).then((value) => {
			console.log(state.params);
			navigate("../clinicname", { state: state.params });
		});
	};
	return (
		<>
			{utils.aeProgressBar({ width: "6%" })}

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
							<div className="row">
								<div className="col pl-12">
									<utils.aeButton
										classNames="aebutton fm-w6-s18"
										text="Let's start"
										enabled="false"
										disabledClass="aebuttonblack"
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
								<div className="col pl-2 pt-2rem"></div>
							</div>
							<div className="row">
								<div className="col-8 pl-10">
									<label className="f-rl fm-w7-s35">
										Okay, tell us about yourself
									</label>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-2rem"></div>
							</div>
							<div className="row">
								<div className="col-10 pl-10" style={{ zIndex: 1 }}>
									<button
										className="btn-rounded-bselect w100"
										data-name="business"
										onClick={showNextStep}
									>
										I work for a clinic/ institution practise
										<span
											data-name="business"
											onClick={showNextStep}
											className="coral b1 fm-w6-s16"
										>
											Business
										</span>
										&nbsp;&nbsp;&nbsp;&nbsp;
									</button>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-6"></div>
							</div>
							<div className="row">
								<div className="col-10 pl-10" style={{ zIndex: 1 }}>
									<button
										className="btn-rounded-bselect w100"
										onClick={showNextStep}
										data-name="doctor"
									>
										I am a personal doctor
										<span
											onClick={showNextStep}
											data-name="doctor"
											className="coral b2 fm-w6-s16"
										>
											Self-employed
										</span>
										&nbsp;&nbsp;&nbsp;&nbsp;
									</button>
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
								className="body-bg-clinic-s2"
								alt="clinic"
							></img>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default DoctorOrClinic;
