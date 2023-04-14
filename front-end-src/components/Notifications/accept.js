import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import * as utils from "../../common/util";
import * as UserServices from "../../services/user";
import { sendAcceptRequestEmailNotification } from "../../services/notificationservices";
import * as NotificationServices from "../../services/notifications";

const Accept = () => {
	const params = {
		params: useParams(),
	};

	const firstupdate = useRef(true);
	const [params1, setParams1] = useState({ userByID: {} });
	const [params2, setParams2] = useState({ userByID: {} });
	const [ustate, setState] = useState(false);
	const [styless, setStyless] = useState({
		display: "block",
		zIndex: "2000",
		position: "absolute",
		top: "38%",
		left: "38%",
	});
	const [pos, setPos] = useState(0);
	const stateRef = useRef(ustate);
	const stylessRef = useRef(styless);
	stateRef.current = ustate;
	stylessRef.current = styless;

	// console.log("params.params", params.params);
	useEffect(() => {
		UserServices.GetUserById(params.params.userid).then((value) => {
			console.log("req", value.userByID);
			setParams1({ ...params1, userByID: value.userByID });
		});
		console.log("Ppar1", params1);
		UserServices.GetUserById(params.params.userid1).then((value) => {
			setParams2({ ...params2, userByID: value.userByID });
			console.log("value.userByID", value.userByID);
		});
		console.log("Ppar2", params2);
		console.log("params2.userByID.business[0].name", params2.userByID);
		const timer = setTimeout(() => {
			firstupdate.current = false;
			setstateRef(true);
			let t = "40";
			let l = "40";
			let s = setInterval(() => {
				animateEmail(t, l);
				t = t - 1;
				l = l - 1;
				if (t <= 20) {
					setStyless({
						display: "none",
						zIndex: "2000",
						position: "absolute",
						top: t + "%",
						left: l + "%",
					});
					clearInterval(s);
				}
				if (t === 21) {
					setTimeout(() => {
						setPos(t);
					}, 100);
				}
			}, 50);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);
	const setstateRef = (v) => {
		setState(v);
	};
	const animateEmail = (t, l) => {
		setStyless({
			display: "block",
			zIndex: "2000",
			position: "absolute",
			top: t + "%",
			left: l + "%",
		});
	};
	if (firstupdate.current) {
		// console.log("params1.userByID str", JSON.stringify(params1.userByID));
		// console.log("params2.userByID str", JSON.stringify(params2.userByID));
		if (
			JSON.stringify(params1.userByID) !== "{}" ||
			JSON.stringify(params2.userByID) !== "{}"
		) {
			firstupdate.current = false;
			const updateVariables = UserServices.returnUpdateVariables({
				id: params.params.userid,
				currentstep: "4",
			});
			sendAcceptRequestEmailNotification(
				params1.userByID.id,
				params1.userByID.firstName,
				params1.userByID.email,
				window.location.origin + "/welcome/",
				params2.userByID.business[0].name +
					" ( Clinic: " +
					params2.userByID.clinicname +
					" )"
			);
			const updateSettingsvariables =
				NotificationServices.returnUpdateVariables({
					id: params.params.userid2,
					status: "accepted",
				});

			UserServices.UpdateUser(updateVariables).then((value) => {
				console.log("update value", value);
			});
			console.log("lok", updateSettingsvariables);

			NotificationServices.UpdateNotification(updateSettingsvariables).then(
				(res) => {
					console.log("updated", res);
				}
			);
		}
	}
	return (
		<div className="body-bg ">
			<div className="row">
				<div className="col-xl-7 col-lg-6 col-md-4 col-xs-4 col-sm-4">
					&nbsp;
				</div>
				<div className="col-xl-4 col-lg-5 col-md-7 col-xs-7 col-sm-7"></div>
				<div className="col-lg-1 col-md-2 col-xs-3 col-sm-4"></div>
			</div>
			<div className="row">
				<div className="col-xl-7 col-lg-6 col-md-4 col-xs-4 col-sm-4">
					<utils.aeLogo fcolor="color-FF" />
				</div>
				<div className="col-xl-4 col-lg-5 col-md-7 col-xs-7 col-sm-7">
					<div
						className=" text-black mt-n5"
						style={{
							position: "relative",
							borderBottomLeftRadius: "0.5rem",
							borderBottomRightRadius: "0.5rem",
							backgroundColor: "#FFFFFF",
						}}
					>
						<img
							loading="lazy"
							id="elogo10"
							className="emaillogo img-fluid"
							alt="email logo"
							style={styless}
						></img>
						{pos === 20 ? (
							<>
								<div className="row">
									<div className="col-1"></div>
									<div className="col">
										<div className="form-outline">
											<br></br>
											<br></br>
											<br></br>
											<br></br>
											<br></br>
											<br></br>
											<br></br>
											<br></br>
										</div>
									</div>
									<div className="col-1"></div>
								</div>
								<div className="row">
									<div className="col-1"></div>
									<div className="col">
										<div className="form-outline" style={{ opacity: "1" }}>
											<img
												loading="lazy"
												className="emaillogo img-fluid"
												alt="email logo"
											></img>
											<div
												className="fade-in-text f-rl fm-w4-s16"
												style={{ color: "#777777", paddingTop: "10px" }}
											></div>
										</div>
									</div>
									<div className="col-1"></div>
								</div>
								<div className="row">
									<div className="col-1"></div>
									<div className="col">
										<div className="form-outline">
											<br></br>
											<br></br>
											<div
												className="fade-in-text f-rl fm-w4-s30"
												style={{ color: "#000000" }}
											>
												Hi, {params2.userByID.firstName}
											</div>
											<br></br>
											<br></br>
											<label
												className="pt-4 fade-in-text f-fm fm-w7-s18"
												style={{ color: "#000000" }}
											>
												We have sent an confirmation email to "
												{params1.userByID.email}" inbox, that his request got
												accepted for joining business "
												{params2.userByID.business[0].name +
													" ( Clinic: " +
													params2.userByID.clinicname +
													" )"}
												" at Aesthetik
												<br />
											</label>
										</div>
									</div>
									<div className="col-1"></div>
								</div>
								<div className="row">
									<div className="col-1"></div>
									<div className="col">
										<div className="pt-5 form-outline"></div>
									</div>
									<div className="col-1"></div>
								</div>
							</>
						) : (
							<>
								<div className="row">
									<div className="col-1"></div>
									<div className="col">
										<div className="form-outline">
											<br></br>
											<br></br>
											<br></br>
											<br></br>
											<br></br>
											<br></br>
											<br></br>
											<br></br>
										</div>
									</div>
									<div className="col-1"></div>
								</div>
								<div className="row">
									<div className="col-1"></div>
									<div className="col">
										<div className="form-outline" style={{ opacity: "0" }}>
											<img
												loading="lazy"
												className="emaillogo img-fluid"
												alt="email logo"
											></img>
											<div
												className="fade-in-text f-rl fm-w4-s16"
												style={{ color: "#FFFFFF", paddingTop: "10px" }}
											>
												To: {params.emailid}
											</div>
										</div>
									</div>
									<div className="col-1"></div>
								</div>
								<div className="row">
									<div className="col-1"></div>
									<div className="col">
										<div className="form-outline">
											<br></br>
											<br></br>
											<div
												className="fade-in-text f-rl fm-w4-s30"
												style={{ color: "#FFFFFF" }}
											>
												Hi, {params.name}
											</div>
											<br></br>
											<br></br>
											<label
												className="pt-4 fade-in-text f-fm fm-w7-s18"
												style={{ color: "#FFFFFF" }}
											>
												We have sent an confirmation email to your inbox.
												<br />
												Please verify the email address and you can get started!
											</label>
											<label
												className="pt-5 fade-in-text f-fm fm-w4-s14"
												style={{ color: "#FFFFFF" }}
											>
												If you have not received the email after a few minutes.
												please check your spam folder.
												<a
													href="/"
													className="ps-2"
													style={{ color: "#FFFFFF" }}
												>
													Resend email
												</a>
											</label>
										</div>
									</div>
									<div className="col-1"></div>
								</div>
								<div className="row">
									<div className="col-1"></div>
									<div className="col">
										<div className="pt-5 form-outline">
											<center>
												<label
													className="fade-in-text f-fm fm-w4-s14"
													style={{
														paddingTop: "8rem",
														textAlign: "center",
														color: "#FFFFFF",
													}}
												>
													If you have any questions.please{" "}
													<a href="/" style={{ color: "#FFFFFF" }}>
														contact us
													</a>
												</label>
											</center>
											<br></br>
										</div>
									</div>
									<div className="col-1"></div>
								</div>
							</>
						)}
					</div>
				</div>
				<div className="col-lg-1 col-md-2 col-xs-3 col-sm-4"></div>
			</div>
			<div className="row">
				<div className="col-xl-7 col-lg-6 col-md-4 col-xs-4 col-sm-4"></div>
				<div className="col-xl-4 col-lg-5 col-md-7 col-xs-7 col-sm-7 text-center">
					<br></br>
				</div>
				<div className="col-lg-1 col-md-2 col-xs-3 col-sm-4"></div>
			</div>
			<div style={{ paddingTop: "500px" }}>&nbsp;</div>
		</div>
	);
};

export default Accept;
