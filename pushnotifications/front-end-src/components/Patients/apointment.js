import React, { useState, useEffect } from "react";
// import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";

const Apointment = (props) => {
	console.log("props app", props);
	const [show, setShow] = useState(true);
	const [appointment, setappointment] = useState(props.appointment);
	const handleClose = () => {
		setShow(false);
		props.show();
	};
	const handleShow = () => setShow(false);
	console.log(props.hideapointment);
	const hideAndTrue = () => {
		setShow(false);
		props.show();
	};

	useEffect(() => {
		setappointment(props.appointment);
	}, [props]);

	function calculationoffinalsyringes(j) {
		var val = parseInt(
			appointment.finalsyringes.split(",")[j] -
				appointment.initialsyringes.split(",")[j]
		);
		if (val > 0) {
			return <>+{val}</>;
		} else if (val === 0) {
			return <>{" " + val}</>;
		}
		return <>-{val}</>;
	}
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header>
					<Modal.Title>
						<Modal.Body style={{ paddingTop: 0 }}>
							<div>
								<div>
									<div className="row" style={{ backgroundColor: "#fff" }}>
										<Tabs
											defaultActiveKey="Treatment"
											id="profiletab"
											className="list-tab ptab1"
											style={{ backgroundColor: "#fff" }}
										>
											<Tab
												eventKey="Treat"
												title={
													<i
														class="fa fa-angle-left"
														aria-hidden="true"
														onClick={hideAndTrue}
													></i>
												}
												onClick={hideAndTrue}
											></Tab>
											<Tab
												eventKey="Treatment"
												title="Treatment"
												style={{ backgroundColor: "#fff", marginTop: "57px" }}
											>
												<div className="row">
													<div className="col-3 f-fm fm-w7-s16">
														Treatment Time
													</div>
													<div
														className="col-4 f-fm fm-w6-s14"
														style={{
															color: "#ACACAC",
														}}
													>
														TIME STARTED
														<br />
														<span
															className="f-fm fm-w6-s14"
															style={{
																color: "#000",
															}}
														>
															{appointment.starttime}
														</span>
													</div>
													<div
														className="col-5 f-fm fm-w6-s14"
														style={{
															color: "#ACACAC",
														}}
													>
														TIME ENDED
														<br />
														<span
															className="f-fm fm-w6-s14"
															style={{
																color: "#000",
															}}
														>
															{appointment.endtime}
														</span>
													</div>
												</div>
												<div className="row pt-5">
													<div className="col-3 f-fm fm-w7-s16">Syringes</div>
													<div className="col-9">
														<div className="row">
															<div
																className="col-12 f-fm fm-w6-s14"
																style={{
																	color: "#ACACAC",
																}}
															>
																BEFORE
															</div>
															<div className="col-12 pt-1">
																{appointment.starttreatmentsyringes === ""
																	? "No images"
																	: appointment.starttreatmentsyringes
																			.split(",")
																			.map((start) => {
																				return (
																					<img
																						key={start}
																						className="p-2"
																						alt="before"
																						width="100"
																						height="100"
																						src={
																							process.env.REACT_APP_AWS_S3 +
																							start
																						}
																					></img>
																				);
																			})}
															</div>
															<div
																className="col-12 pt-4 f-fm fm-w6-s14"
																style={{
																	color: "#ACACAC",
																}}
															>
																AFTER
															</div>
															<div className="col-12">
																{appointment.endtreatmentsyringes === ""
																	? "No images"
																	: appointment.endtreatmentsyringes
																			.split(",")
																			.map((start) => {
																				return (
																					<img
																						key={start}
																						className="p-2"
																						alt="before"
																						width="100"
																						height="100"
																						src={
																							process.env.REACT_APP_AWS_S3 +
																							start
																						}
																					></img>
																				);
																			})}
															</div>
														</div>
													</div>
												</div>
												<div className="row pt-5">
													<div className="col-3 f-fm fm-w7-s16">
														Medical Photos
													</div>
													<div className="col-9">
														<div className="row">
															<div
																className="col-12 f-fm fm-w6-s14"
																style={{
																	color: "#ACACAC",
																}}
															>
																BEFORE
															</div>
															<div className="col-12 pt-1">
																{appointment.startmedicalphotos === ""
																	? "No images"
																	: appointment.startmedicalphotos
																			.split(",")
																			.map((start) => {
																				return (
																					<img
																						key={start}
																						className="p-2"
																						alt="before"
																						width="100"
																						height="100"
																						src={
																							process.env.REACT_APP_AWS_S3 +
																							start
																						}
																					></img>
																				);
																			})}
															</div>
															<div
																className="col-12 pt-4 f-fm fm-w6-s14"
																style={{
																	color: "#ACACAC",
																}}
															>
																AFTER
															</div>
															<div className="col-12">
																{appointment.endmedicalphotos === ""
																	? "No images"
																	: appointment.endmedicalphotos
																			.split(",")
																			.map((start) => {
																				return (
																					<img
																						key={start}
																						className="p-2"
																						alt="before"
																						width="100"
																						height="100"
																						src={
																							process.env.REACT_APP_AWS_S3 +
																							start
																						}
																					></img>
																				);
																			})}
															</div>
														</div>
													</div>
												</div>
												<div className="row pt-5">
													<div className="col-3 f-fm fm-w7-s16">Others</div>
													<div className="col-9">
														<div className="row">
															<div
																className="col-12 pb-2 f-fm fm-w6-s14"
																style={{
																	color: "#ACACAC",
																}}
															>
																ADDITIONAL SYRINGES
															</div>
															{appointment.treatmentid[0]
																.split(",")
																.map((e, j) => {
																	return (
																		<div
																			className="col-10"
																			style={{
																				padding: "8px",
																				color: "#AF805E",
																				display: "flex",
																				alignItems: "center",
																				background: "#F4F4F4",
																				justifyContent: "space-between",
																				boxShadow:
																					"0px 4.69421px 46.9421px rgba(0, 0, 0, 0.02)",
																				borderRadius: "11.7355px",
																			}}
																		>
																			{props.getvalue(e, j, "none", "app")}
																			<span
																				style={{
																					color: "#fff",
																					paddingLeft: "10px",
																					paddingRight: "10px",
																					width: "43.64px",
																					height: "24.24px",
																					fontWeight: 700,
																					fontSize: "16px",
																					fontFamily: "mulish",
																					background: "#000000",
																					boxShadow:
																						"0px 4.69421px 46.9421px rgba(0, 0, 0, 0.02)",
																					borderRadius: "11.7355px",
																				}}
																			>
																				{calculationoffinalsyringes(j)}
																			</span>
																		</div>
																	);
																})}
														</div>
													</div>
													<div class="col-3"></div>
													<div className="col-9 mt-3">
														<div className="row">
															<div
																className="col-12 pb-2 f-fm fm-w6-s14"
																style={{
																	color: "#ACACAC",
																}}
															>
																ADDITIONAL TIME REPORT
															</div>

															<div
																className="col-8"
																style={{
																	background: "#F4F4F4",
																	height: "31px",
																	boxShadow:
																		"0px 4.69421px 46.9421px rgba(0, 0, 0, 0.02)",
																	borderRadius: "11.7355px",
																	display: "flex",
																	alignItems: "center",
																	color: "#777777",
																}}
															>
																--
															</div>
														</div>
													</div>
													<div class="col-3"></div>
													<div className="col-9 mt-3">
														<div className="row">
															<div
																className="col-12 pb-2 f-fm fm-w6-s14"
																style={{
																	color: "#ACACAC",
																}}
															>
																OTHER ISSUES
															</div>

															<div
																className="col-8"
																style={{
																	background: "#F4F4F4",
																	height: "31px",
																	boxShadow:
																		"0px 4.69421px 46.9421px rgba(0, 0, 0, 0.02)",
																	borderRadius: "11.7355px",
																	display: "flex",
																	alignItems: "center",
																	color: "#777777",
																}}
															>
																--
															</div>
														</div>
													</div>
												</div>
											</Tab>
											<Tab
												eventKey="Appointment Details"
												title="Appointment Details"
												tabIndex="1"
											>
												<>
													<div>
														<label
															style={{ color: "#ACACAC" }}
															className="f-fm fm-w6-s12 "
														>
															Time and Location
														</label>
													</div>
													<div>
														<label>
															<img
																style={{
																	width: "14px",
																	height: "14px",
																	color: "#777777",
																}}
																src="./images/time.png"
																alt=""
															/>
															&nbsp;&nbsp;
															<span className="f-fm fm-w4-s16 color-7">
																{appointment.appointmentdate.split("T")[0] +
																	" "}
																{appointment.starttime} - {appointment.endtime}
															</span>
														</label>
													</div>

													<div className="col">
														<img
															style={{
																width: "14px",
																height: "14px",
																color: "#777777",
															}}
															src="./images/map.png"
															alt=""
														/>
														&nbsp;&nbsp;
														<label className="f-fm fm-w4-s16 color-7">
															Not available to view
														</label>
													</div>

													<div className="row" style={{ paddingTop: "30px" }}>
														<label
															style={{ color: "#ACACAC" }}
															className="f-fm fm-w6-s12 "
														></label>
													</div>
													{appointment.treatmentid[0].split(",").map((e, j) => {
														return (
															<div
																style={{
																	display: "flex",
																	alignItems: "flex-end",
																	justifyContent: "space-between",
																}}
															>
																<>
																	{props.getvalue(e, j)}
																	&nbsp;
																	{props.getprice(
																		e,
																		appointment.finalsyringes.split(","),
																		j
																	)}
																</>
															</div>
														);
													})}

													<div className="col">
														<label className="f-fm fm-w3-s12 color-00"></label>
													</div>

													<div className="row">
														<div
															className="col"
															style={{
																paddingBottom: "5px",
															}}
														>
															<label className="f-fm fm-w6-s12 color-AC">
																CONSULTATION
															</label>
														</div>
													</div>
													<div className="row">
														<div
															className="col"
															style={{
																paddingBottom: "3px",
															}}
														>
															<video
																style={{
																	height: "200px",
																	width: "400px",
																}}
																controls
															>
																<source
																	src={
																		process.env.REACT_APP_AWS_S3 +
																		appointment.videourl
																	}
																	type="video/mp4"
																/>
															</video>
														</div>
													</div>
													<div className="row">
														<div
															className="col"
															style={{
																paddingBottom: "5px",
															}}
														>
															<label className="f-fm fm-w3-s10 color-00">
																{appointment.appointmentdate.split("T")[0] +
																	" "}
																{appointment.starttime} - {appointment.endtime}
															</label>
														</div>
													</div>
													<div className="row">
														<div
															className="col"
															style={{
																paddingBottom: "25px",
															}}
														>
															<label className="f-fm fm-w3-s10 color-00">
																Duration: {appointment.videoduration}
															</label>
														</div>
													</div>
												</>
											</Tab>
										</Tabs>
									</div>
								</div>
							</div>
						</Modal.Body>
					</Modal.Title>
				</Modal.Header>
			</Modal>
		</>
	);
};

export default Apointment;
