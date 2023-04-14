import React, { useEffect, useState, useRef } from "react";
import {
	sendWelcomeEmailNotification,
	sendResetEmailNotification,
} from "../../services/notificationservices";
import { useLocation } from "react-router-dom";
import * as utils from "../../common/util";

const EmailNotification = () => {
	const params = useLocation().state;
	console.log("params", params);
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

	useEffect(() => {
		const timer = setTimeout(() => {
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
	const resend = () => {
		if (params.type === "reset") {
			sendResetEmailNotification(
				params.id,
				params.name,
				params.emailid,
				window.location.origin
			);
		} else {
			sendWelcomeEmailNotification(
				params.id,
				params.name,
				params.emailid,
				window.location.origin
			);
		}

		window.location.reload();
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

	return (
		<div className="body-bg">
			<div className="row">
				<div className="col-xl-7 col-lg-6 col-md-4 col-xs-4 col-sm-4">
					&nbsp;
				</div>
				<div className="col-xl-4 col-lg-5 col-md-7 col-xs-7 col-sm-7"></div>
				<div className="col-lg-1 col-md-2 col-xs-3 col-sm-4"></div>
			</div>
			<div className="row">
				<div className="col-xl-7 col-lg-6 col-md-4 col-xs-4 col-sm-4">
					<utils.aeLogo_signup fcolor="color-FF" />
				</div>
				<div className="col-xl-4 col-lg-5 col-md-7 col-xs-7 col-sm-7">
					<div
						className="text-black mt-n5"
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
												style={{ color: "#000000" }}
											>
												Hi, {params.name}
											</div>
											<br></br>
											<br></br>
											{params.type !== "reset" ? (
												<label
													className="pt-4 fade-in-text f-fm fm-w7-s18"
													style={{ color: "#000000" }}
												>
													We have sent an confirmation email to your inbox.
													<br />
													Please verify the email address and you can get
													started!
												</label>
											) : (
												<label
													className="pt-4 fade-in-text f-fm fm-w7-s18"
													style={{ color: "#000000" }}
												>
													We have sent a reset link email to your inbox.
													<br />
													Please click on the link sent to your email to reset
													your password!
												</label>
											)}
											<label
												className="pt-5 fade-in-text f-fm fm-w4-s14"
												style={{ color: "#777777" }}
											>
												If you have not received the email after a few minutes.
												please check your spam folder.
												<a
													// href="/"
													className="ps-2"
													style={{ color: "#777777", cursor: "pointer" }}
													onClick={resend}
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
														color: "#777777",
													}}
												>
													If you have any questions.please{" "}
													<a href="/" style={{ color: "#777777" }}>
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
													// href="/"
													className="ps-2"
													style={{ color: "#FFFFFF", cursor: "pointer" }}
													onClick={resend}
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
			<div style={{ paddingTop: "139px" }}>&nbsp;</div>
		</div>
	);
};

export default EmailNotification;
