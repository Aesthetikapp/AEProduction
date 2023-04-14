import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tabs";
import Apointment from "./apointment";
import { ListGroupItem } from "react-bootstrap";
import * as HistoryServices from "../../services/patienthistory";
import moment from "moment";

const Patient2 = (props) => {
	// console.log("patient2", props);
	const [appointments, setAppointments] = useState(props.appointments);
	const [patients, setPatients] = useState(props.patients);
	const [payment, setPayment] = useState(props.payment);
	const [selectedAppointment, setSelectedAppointment] = useState("");
	const [allquestions, setAllQuestions] = useState(props.allquestions);
	const [allquestionsp, setAllQuestionsP] = useState(props.allquestionsP);
	const [allquestionsc, setAllQuestionsC] = useState(props.allquestionsC);

	const upp = [];
	const arr = [];
	const mis = [];

	const currentTime = moment().valueOf();
	const consultDT = (appointment) => {
		return appointment.consultationdate
			? moment(
					appointment.consultationdate.slice(0, 10) +
						" " +
						appointment.cstarttime,
					"YYYY-MM-DD HH:mm"
			  ).valueOf()
			: moment(
					appointment.appointmentdate.slice(0, 10) +
						" " +
						appointment.starttime,
					"YYYY-MM-DD HH:mm"
			  ).valueOf();
	};

	const treatmentDateTime = (appointment) => {
		return moment(
			appointment.appointmentdate.slice(0, 10) + " " + appointment.starttime,
			"YYYY-MM-DD HH:mm"
		).valueOf();
	};

	const videoDateTime3hr = (appointment) => {
		return appointment.videodatetime
			? moment(appointment.videodatetime, "YYYY-MM-DD HH:mm:ss")
					.add(3, "hours")
					.valueOf()
			: 0;
	};

	const [show, setShow] = useState(false);
	const [showMedicalHistory, setShowMedicalHistory] = useState(false);

	const handleClose = () => setShow(false);
	const handleCloseMedicalHistory = () => {
		setShowMedicalHistory(false);
		setShow(true);
	};
	const handleShow = () => setShow(true);

	const [apointment, setapointment] = useState("none");
	const [answers, setAnswers] = useState([]);
	const [isupdated, setIsUpdated] = useState("0");
	const hideapointment = () => {
		setapointment("none");
	};

	useEffect(() => {
		setAppointments(props.appointments);
		setPatients(props.patients);
		setPayment(props.payment);
		console.log(props.allquestions);
	}, [props]);

	useEffect(() => {
		if (isupdated === "0") {
			HistoryServices.GetPatienthistoryBypatientid(patients.id).then((app) => {
				console.log("app", app);

				if (app.patienthistorybypatientid.length !== 0) {
					var answers = app.patienthistorybypatientid[0].answers;

					// allquestions.map(function (question) {
					//   console.log("aaaa", question.id, question.question);
					//   answers =
					//     answers == ""
					//       ? app.patienthistorybypatientid[0].answers.replaceAll(
					//           question.id,
					//           question.question
					//         )
					//       : answers.replaceAll(question.id, question.question);
					// });
					console.log("aaaa", answers);
					setAnswers(answers.split("##"));
				}
			});
			setIsUpdated("1");
		} else {
			//answers.map(function (i, id) {});
		}
	}, [answers]);

	console.log(answers);

	Object.values(appointments).forEach((a) => {
		Object.values(a).forEach((app) => {
			if (
				app.iscompleted !== "true" &&
				((app.complete !== "true" && app.ispaymentdone === false) ||
					(app.complete === "true" && currentTime > videoDateTime3hr(app))) &&
				(currentTime > treatmentDateTime(app) ||
					currentTime > consultDT(app)) &&
				patients.id === app.patientid
			) {
				mis.push(app._id);
			} else if (
				app.iscompleted !== "true" &&
				((app.complete !== "true" && app.ispaymentdone === false) ||
					(app.complete === "true" && currentTime < videoDateTime3hr(app))) &&
				currentTime < treatmentDateTime(app) &&
				patients.id === app.patientid
			) {
				upp.push(app._id);
			} else if (app.iscompleted === "true" && patients.id === app.patientid) {
				arr.push(app._id);
			}
		});
	});

	const showAgain = () => {
		setapointment("none");
		handleShow();
	};

	const showAnswers = (i) => {
		return (
			<>
				{answers.map((answer) => {
					return (
						<>
							{i.id == answer.split("|")[0] && answer.split("|")[1] !== "" && (
								<>
									<div style={{ fontWeight: "700" }}>{i.question}</div>
									<div style={{ color: "#AF805E" }}>
										{answer.split("|")[1].charAt(0).toUpperCase() +
											answer.split("|")[1].slice(1)}
									</div>
								</>
							)}
						</>
					);
				})}
			</>
		);
	};
	const returnQuestionaire = () => {
		return (
			<>
				<div>
					{allquestionsp.length > 0 &&
						allquestionsp.map(function (i, id) {
							return (
								<>
									<div
										className="f-fm"
										style={{
											paddingLeft: "10px",
											paddingBottom: "5px",
										}}
									>
										{i.childquestionid !== "" && i.answer !== "" && (
											<div key={"mainq" + i.id} id={i.id}>
												{showAnswers(i)}
												{
													<span>
														{allquestionsc
															.filter((question) => question.parentid === i.id)
															.map((h) => renderChilds(h, i, "childq "))}
													</span>
												}
											</div>
										)}
										{i.childquestionid !== "" && i.answer === "" && (
											<div key={"mainq" + i.id} id={i.id}>
												<div style={{ fontWeight: "700" }}>{i.question}</div>
												<span>
													{allquestionsc
														.filter((question) => question.parentid === i.id)
														.map((h) => renderChilds(h, i, "childq1 "))}
												</span>
											</div>
										)}
										{i.childquestionid === "" &&
											i.parentid === "" &&
											i.answer === "" && (
												<>
													<div key={"mainq" + i.id} id={i.id}>
														<div>{showAnswers(i)}</div>
													</div>
												</>
											)}
									</div>
								</>
							);
						})}
				</div>
			</>
		);
	};

	const renderChilds1 = (h, i, classn) => {
		return (
			<div
				style={{
					padding: "5px",
				}}
			>
				<div key={"childq" + h.id} id={h.id}>
					<div
						style={{
							width: "100%",
						}}
					>
						{/* <div className="question"> {h.question}</div> */}

						{showAnswers(h)}
					</div>
				</div>
			</div>
		);
	};

	const renderChilds = (h, i, classn) => {
		return (
			<div
				style={{
					padding: "5px 5px 5px 20px",
				}}
			>
				<div key={"childq" + h.id} id={h.id}>
					<div
						style={{
							width: "100%",
						}}
					>
						{/* &nbsp; */}
						{/* <div className="question"> {h.question}</div> */}
						{showAnswers(h)}
					</div>
					{
						<span>
							{allquestionsc
								.filter((question) => question.parentid === h.id)
								.map((h1) => renderChilds1(h1, h, "childq2 "))}
						</span>
					}
				</div>
			</div>
		);
	};

	const returnRadio = (checked, i, value) => {
		return checked === "true" ? (
			<div className="custom-disabled">
				<input type="radio" name={i.id} id="l" value={value} checked disabled />
			</div>
		) : checked === "false" ? (
			<div className="custom-disabled1">
				<input type="radio" name={i.id} id="l" value={value} disabled />
			</div>
		) : (
			""
		);
	};

	return (
		<>
			<div onClick={handleShow} style={{ marginLeft: "25px" }}>
				<img
					alt="loading"
					style={{ cursor: "pointer", display: props.image }}
					src="./images/Group210.png"
				/>
			</div>
			<div onClick={handleShow}>
				<button
					style={{
						background: "#F4F4F4",
						borderRadius: "12.5px",
						marginTop: "15px",
						display: props.view,
						border: "none",
					}}
				>
					<span
						style={{
							fontFamily: "Mulish",
							fontStyle: "normal",
							fontWeight: "500",
							fontSize: "14px",
							lineHeight: "18px",
							color: "#777777",
						}}
					>
						View more
					</span>
				</button>
			</div>

			<Modal
				show={showMedicalHistory}
				onHide={handleCloseMedicalHistory}
				dialogClassName="modal-sm-30px"
				size="md"
				position="top-right"
			>
				<Modal.Body>
					<div className="col-2">
						<img
							alt="close"
							style={{
								height: "24px",
								width: "24px",
								cursor: "pointer",
							}}
							onClick={handleCloseMedicalHistory}
							src="./images/close.png"
						/>
					</div>
					<div style={{ textAlign: "center", justifyContent: "center" }}>
						{/* <img
									style={{ textAlign: "center", justifyContent: "center" }}
									src="../images/avatar.png"
									alt="avatar"
								></img> */}
						{props.patients.avatar === "" ? (
							<img
								alt="patient avatar"
								src="./images/avatar.png"
								style={{
									textAlign: "center",
									justifyContent: "center",
									width: "73px",
									borderRadius: "50%",
									height: "73px",
								}}
							></img>
						) : (
							<img
								src={process.env.REACT_APP_AWS_S3 + props.patients.avatar}
								style={{
									textAlign: "center",
									justifyContent: "center",
									width: "73px",
									borderRadius: "50%",
									height: "73px",
								}}
								alt="patient avatar"
							></img>
						)}
						<br></br>
						<label className="f-fm fm-w6-s20 color-00">
							{patients.firstName} {patients.lastName}
						</label>
						<br></br>
						{patients.gender === "Male" ? (
							<i
								class="fa fa-regular fa-mars"
								style={{
									color: "red",
								}}
							></i>
						) : (
							<i
								class="fa fa-solid fa-venus"
								style={{
									color: "red",
								}}
							></i>
						)}
						&nbsp;
						<label className="f-fm fm-w6-s16 " style={{ color: "#404040" }}>
							{props.calculate_age(patients.dob.split("T")[0])}
						</label>
						<br></br> <br></br>
						<div class="ribbon">
							<span>Medical Notes</span>
						</div>
					</div>
					<div //style={{ border: "solid 1px black" }}
					>
						{returnQuestionaire()}
					</div>
				</Modal.Body>
			</Modal>

			<div
				style={{
					paddingTop: "4vh",
					float: "right",
					justifyContent: "right",
					justifyItems: "right",
				}}
			>
				{apointment === "none" && (
					<Modal
						show={show}
						onHide={handleClose}
						dialogClassName="modal-sm-30px"
						size="md"
						position="top-right"
					>
						<div
							className="row"
							style={{
								marginTop: "53px",
								float: "right",
								justifyContent: "right",
								justifyItems: "right",
							}}
						>
							<div className="col-1"></div>
							<div className="col-2">
								<img
									alt="close"
									style={{
										height: "24px",
										width: "24px",
										cursor: "pointer",
									}}
									onClick={handleClose}
									src="./images/close.png"
								/>
							</div>

							<div
								className="col-6"
								style={{ textAlign: "center", justifyContent: "center" }}
							>
								{/* <img
									style={{ textAlign: "center", justifyContent: "center" }}
									src="../images/avatar.png"
									alt="avatar"
								></img> */}
								{props.patients.avatar === "" ? (
									<img
										alt="patient avatar"
										src="./images/avatar.png"
										style={{
											textAlign: "center",
											justifyContent: "center",
											width: "73px",
											borderRadius: "50%",
											height: "73px",
										}}
									></img>
								) : (
									<img
										src={process.env.REACT_APP_AWS_S3 + props.patients.avatar}
										style={{
											textAlign: "center",
											justifyContent: "center",
											width: "73px",
											borderRadius: "50%",
											height: "73px",
										}}
										alt="patient avatar"
									></img>
								)}
								<br></br>
								<label className="f-fm fm-w6-s20 color-00">
									{patients.firstName} {patients.lastName}
								</label>
								<br></br>
								{patients.gender === "Male" ? (
									<i
										class="fa fa-regular fa-mars"
										style={{
											color: "red",
										}}
									></i>
								) : (
									<i
										class="fa fa-solid fa-venus"
										style={{
											color: "red",
										}}
									></i>
								)}
								&nbsp;
								<label className="f-fm fm-w6-s16 " style={{ color: "#404040" }}>
									{props.calculate_age(patients.dob.split("T")[0])}
								</label>
								<div class="ribbon">
									<span style={{ fontSize: "7px" }}>Treatment History</span>
								</div>
							</div>
							<div
								className="col-2"
								style={{
									display: "flex",
									justifyContent: "end",
									alignContent: "end",
									height: "30px",
								}}
							></div>
							<div className="col-1"></div>
						</div>

						<Modal.Body>
							<Card
								style={{
									backgroundColor: "#fff",
									border: "1px solid #D6D6D6",
								}}
							>
								<ListGroup>
									{/* <ListGroupItem>
										<div className="row" style={{ alignItems: "center" }}>
											<div
												className="col-3"
												style={{ whiteSpace: "nowrap", marginRight: "8px" }}
											>
												<label
													className="f-fm fm-w6-s16 "
													style={{ color: "#404040" }}
												>
													Contact Info
												</label>
											</div>
											<div
												className="col-3"
												style={{
													width: "45px",
													height: "45px",
													backgroundColor: "#F4F4F4",
													boxSizing: "border-box",
													borderRadius: "22px",
												}}
											>
												<label
													className="color-7"
													style={{
														width: "14px",
														height: "14px",
														textAlign: "center",
														marginTop: "10px",
														marginLeft: "6px",
													}}
												>
													<i class="fa fa-phone"></i>
												</label>
											</div>
											&nbsp;&nbsp;&nbsp;
											<div
												className="col-3"
												style={{
													width: "45px",
													height: "45px",
													backgroundColor: "#F4F4F4",
													boxSizing: "border-box",
													borderRadius: "22px",
												}}
											>
												<label
													className="color-7"
													style={{
														width: "14px",
														height: "14px",
														textAlign: "center",
														marginTop: "10px",
														marginLeft: "3px",
													}}
												>
													<i class="fa fa-envelope"></i>
												</label>
											</div>
										</div>
									</ListGroupItem> */}
									<ListGroupItem>
										<div className="row" style={{ alignItems: "center" }}>
											<div className="col-3" style={{ paddingRight: "0" }}>
												<label
													className="f-fm fm-w6-s16 "
													style={{ color: "#404040" }}
												>
													Registered Facial Scan
												</label>
											</div>
											<div
												className="col-9 d-flex"
												style={{
													gap: "5px",
												}}
											>
												{patients.scannedimages === "" ||
												patients.scannedimages === undefined ||
												patients.scannedimages === null
													? "No scanned Images"
													: patients.scannedimages.split("|").map((img) => {
															return (
																<img
																	width="58px"
																	height="55px"
																	src={process.env.REACT_APP_AWS_S3 + img}
																	alt=""
																	style={{
																		// paddingRight: "15px",
																		borderRadius: "10px",
																	}}
																/>
															);
													  })}
											</div>
										</div>
									</ListGroupItem>
									<ListGroupItem>
										<div className="row" style={{ alignItems: "center" }}>
											<div className="col-3">
												<label
													className="f-fm fm-w6-s16 "
													style={{ color: "#404040" }}
												>
													Allergy
												</label>
											</div>
											<div className="col-9">
												<label
													className="f-fm fm-w4-s16 "
													style={{ color: "#404040" }}
												>
													{patients.allergies === "" ||
													patients.allergies === " "
														? "No Allergies"
														: // patients.allergies.split("|").map((e) => {
														  // 		return e + ", ";
														  // }
														  patients.allergies.replaceAll("|", ", ")}
												</label>
											</div>
											{/* <div class="col-1">
												<img
													style={{ width: "7.41px", height: "12px" }}
													src="./images/Vector-new.png"
													alt=""
												/>
											</div> */}
										</div>
									</ListGroupItem>
									<ListGroupItem>
										<div className="row" style={{ alignItems: "center" }}>
											<div className="col-3">
												<label
													className="f-fm fm-w6-s16"
													style={{ color: "#404040" }}
												>
													Medical Notes
												</label>
											</div>
											<div
												className="col-9 f-fm"
												style={{ cursor: "pointer" }}
												onClick={() => {
													setShowMedicalHistory(true);
													handleClose();
												}}
											>
												Click here to view Medical History
											</div>
										</div>
									</ListGroupItem>
								</ListGroup>
							</Card>
						</Modal.Body>

						<Tabs
							className="ptab"
							defaultActiveKey={props.tab}
							id="upcomingtab"
							style={{ justifyContent: "center" }}
						>
							<Tab
								eventKey="upcoming App"
								title={"Upcoming Appt (" + upp.length + ")"}
							>
								{upp.length === 0 ? (
									<Card
										style={{
											background: "#FFFFFF",
											boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
											borderRadius: "10px",
											padding: "30px",
											textAlign: "center",
										}}
									>
										<div>
											<label
												style={{
													color: "#000",
													fontStyle: "normal",
													lineHeight: "15px",
													textTransform: "uppercase",
												}}
												className="f-fm fm-w6-s12 "
											>
												No upcoming appointments
											</label>
										</div>
									</Card>
								) : (
									Object.values(appointments).map((a) => {
										return (
											<>
												{Object.values(a)
													.sort((a, b) =>
														a.appointmentdate < b.appointmentdate ? 1 : -1
													)
													.map((app) => {
														return (
															patients.id === app.patientid && (
																<>
																	{app.iscompleted !== "true" &&
																		((app.complete !== "true" &&
																			app.ispaymentdone === false) ||
																			(app.complete === "true" &&
																				currentTime < videoDateTime3hr(app))) &&
																		currentTime < treatmentDateTime(app) && (
																			// ||
																			// currentTime < consultDT(app)
																			<>
																				<Card
																					style={{
																						background: "#FFFFFF",
																						boxShadow:
																							"0px 4px 30px rgba(0, 0, 0, 0.1)",
																						borderRadius: "10px",
																						padding: "30px",
																					}}
																				>
																					<div>
																						<label
																							style={{
																								color: "#ACACAC",
																								fontStyle: "normal",
																								lineHeight: "15px",
																								textTransform: "uppercase",
																							}}
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
																								src="./images/Group.png"
																								alt=""
																							/>
																							&nbsp;&nbsp;
																							<span className="f-fm fm-w4-s16 color-7">
																								{
																									app.appointmentdate.split(
																										"T"
																									)[0]
																								}
																								{" " + app.starttime + " "}-
																								{" " + app.endtime}
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
																							src="./images/maps-and-flags.png"
																							alt=""
																						/>
																						&nbsp;&nbsp;
																						<label className="f-fm fm-w4-s16 color-7">
																							Not available to view
																						</label>
																					</div>
																					<div
																						className="row"
																						style={{ paddingTop: "30px" }}
																					>
																						<label
																							style={{ color: "#ACACAC" }}
																							className="f-fm fm-w6-s12 "
																						></label>
																					</div>
																					{app.treatmentid[0]
																						.split(",")
																						.map((e, j) => {
																							return (
																								<div
																									style={{
																										display: "flex",
																										alignItems: "flex-end",
																										justifyContent:
																											"space-between",
																									}}
																								>
																									<>
																										{props.getvalue(e, j)}
																										&nbsp;
																										{props.getprice(
																											e,
																											app.finalsyringes.split(
																												","
																											),
																											j
																										)}
																									</>
																								</div>
																							);
																						})}
																					<div>
																						<label
																							style={{
																								color: "#ACACAC",
																								paddingTop: "30px",
																							}}
																							className="f-fm fm-w6-s12"
																						></label>
																					</div>

																					<label
																						style={{
																							color: "#ACACAC",
																							fontStyle: "normal",
																							lineHeight: "15px",
																							textTransform: "uppercase",
																						}}
																						className="f-fm fm-w6-s12 "
																					>
																						consultation
																					</label>
																					<div
																						style={{
																							color: "#ACACAC",
																							paddingTop: "10px",
																						}}
																					>
																						{app.videourl === "" ? (
																							"No Consultation Video"
																						) : (
																							<>
																								<video
																									style={{
																										height: "122px",
																										width: "200px",
																									}}
																									controls
																								>
																									<source
																										src={
																											process.env
																												.REACT_APP_AWS_S3 +
																											app.videourl
																										}
																										type="video/mp4"
																									/>
																								</video>
																								<div className="f-fm fm-w3-s12 color-00">
																									{app.videodatetime}
																								</div>
																								<div className="f-fm fm-w3-s12 color-00">
																									Duration: {app.videoduration}
																								</div>
																							</>
																						)}
																						{/* <br /> */}
																					</div>
																					{/* <div className="col">
																				<label className="f-fm fm-w3-s12 color-00"></label>
																			</div>
																			<div className="col">
																				<label className="f-fm fm-w3-s12 color-00"></label>
																			</div> */}
																				</Card>
																			</>
																		)}
																</>
															)
														);
													})}
											</>
										);
									})
								)}
							</Tab>
							<Tab eventKey="past App" title={"Past Appt (" + arr.length + ")"}>
								{arr.length === 0 ? (
									<Card
										style={{
											background: "#FFFFFF",
											boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
											borderRadius: "10px",
											padding: "30px",
											textAlign: "center",
										}}
									>
										<div>
											<label
												style={{
													color: "#000",
													fontStyle: "normal",
													lineHeight: "15px",
													textTransform: "uppercase",
												}}
												className="f-fm fm-w6-s12 "
											>
												No past appointments
											</label>
										</div>
									</Card>
								) : (
									Object.values(appointments).map((a) => {
										return (
											<>
												{Object.values(a)
													.sort((a, b) =>
														a.appointmentdate < b.appointmentdate ? 1 : -1
													)
													.map((app) => {
														return (
															patients.id === app.patientid && (
																<>
																	{app.iscompleted === "true" && (
																		<>
																			<Card
																				onClick={() => {
																					setapointment("block");
																					handleClose();
																					setSelectedAppointment(app);
																				}}
																				style={{
																					background: "#FFFFFF",
																					boxShadow:
																						"0px 4px 30px rgba(0, 0, 0, 0.1)",
																					borderRadius: "10px",
																					padding: "30px",
																					cursor: "pointer",
																				}}
																			>
																				<>
																					<div class="row">
																						<div class="col-11">
																							<div>
																								<label
																									style={{
																										color: "#ACACAC",
																										textTransform: "uppercase",
																									}}
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
																										src="./images/Group.png"
																										alt=""
																									/>
																									&nbsp;&nbsp;
																									<span className="f-fm fm-w4-s16 color-7">
																										{app.appointmentdate.split(
																											"T"
																										)[0] + " "}
																										|{" "}
																										{" " + app.starttime + " "}-
																										{" " + app.endtime}
																									</span>
																								</label>
																							</div>

																							<div
																								className="row"
																								style={{ paddingTop: "28px" }}
																							>
																								<label
																									style={{ color: "#ACACAC" }}
																									className="f-fm fm-w6-s12 "
																								>
																									TREATMENT
																								</label>
																							</div>

																							{app.treatmentid[0]
																								.split(",")
																								.map((e, j) => {
																									return (
																										<>{props.getvalue(e)}</>
																									);
																								})}
																						</div>
																						<div
																							class="col-1"
																							style={{
																								display: "flex",
																								alignItems: "center",
																							}}
																						>
																							<div
																								style={{
																									textAlign: "right",
																									marginRight: "29px",
																								}}
																							>
																								<img
																									src="./images/Vector-new.png"
																									alt=""
																								/>
																							</div>
																						</div>
																					</div>
																				</>
																			</Card>
																		</>
																	)}
																</>
															)
														);
													})}
											</>
										);
									})
								)}
							</Tab>
							<Tab
								eventKey="Missed App"
								title={"Missed Appt (" + mis.length + ")"}
							>
								{mis.length === 0 ? (
									<Card
										style={{
											background: "#FFFFFF",
											boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
											borderRadius: "10px",
											padding: "30px",
											textAlign: "center",
										}}
									>
										<div>
											<label
												style={{
													color: "#000",
													fontStyle: "normal",
													lineHeight: "15px",
													textTransform: "uppercase",
												}}
												className="f-fm fm-w6-s12 "
											>
												No missed appointments
											</label>
										</div>
									</Card>
								) : (
									Object.values(appointments).map((a) => {
										return (
											<>
												{Object.values(a)
													.sort((a, b) =>
														a.appointmentdate < b.appointmentdate ? 1 : -1
													)
													.map((app) => {
														return (
															patients.id === app.patientid && (
																<>
																	{app.iscompleted !== "true" &&
																		((app.complete !== "true" &&
																			app.ispaymentdone === false) ||
																			(app.complete === "true" &&
																				currentTime > videoDateTime3hr(app))) &&
																		(currentTime > treatmentDateTime(app) ||
																			currentTime > consultDT(app)) && (
																			<>
																				<Card
																					style={{
																						background: "#FFFFFF",
																						boxShadow:
																							"0px 4px 30px rgba(0, 0, 0, 0.1)",
																						borderRadius: "10px",
																						padding: "30px",
																					}}
																				>
																					<div>
																						<label
																							style={{
																								color: "#ACACAC",
																								fontStyle: "normal",
																								lineHeight: "15px",
																								textTransform: "uppercase",
																							}}
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
																								src="./images/Group.png"
																								alt=""
																							/>
																							&nbsp;&nbsp;
																							<span className="f-fm fm-w4-s16 color-7">
																								{
																									app.appointmentdate.split(
																										"T"
																									)[0]
																								}
																								{" " + app.starttime + " "}-
																								{" " + app.endtime}
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
																							src="./images/maps-and-flags.png"
																							alt=""
																						/>
																						&nbsp;&nbsp;
																						<label className="f-fm fm-w4-s16 color-7">
																							Not available to view
																						</label>
																					</div>
																					<div
																						className="row"
																						style={{ paddingTop: "30px" }}
																					>
																						<label
																							style={{ color: "#ACACAC" }}
																							className="f-fm fm-w6-s12 "
																						></label>
																					</div>
																					{app.treatmentid[0]
																						.split(",")
																						.map((e, j) => {
																							return (
																								<div
																									style={{
																										display: "flex",
																										alignItems: "flex-end",
																										justifyContent:
																											"space-between",
																									}}
																								>
																									<>
																										{props.getvalue(e, j)}
																										&nbsp;
																										{props.getprice(
																											e,
																											app.finalsyringes.split(
																												","
																											),
																											j
																										)}
																									</>
																								</div>
																							);
																						})}
																					<div>
																						<label
																							style={{
																								color: "#ACACAC",
																								paddingTop: "30px",
																							}}
																							className="f-fm fm-w6-s12"
																						></label>
																					</div>

																					<label
																						style={{
																							color: "#ACACAC",
																							fontStyle: "normal",
																							lineHeight: "15px",
																							textTransform: "uppercase",
																						}}
																						className="f-fm fm-w6-s12 "
																					>
																						consultation
																					</label>
																					<div
																						style={{
																							color: "#ACACAC",
																							paddingTop: "10px",
																						}}
																					>
																						{app.videourl === "" ? (
																							"No Consultation Video"
																						) : (
																							<>
																								<video
																									style={{
																										height: "122px",
																										width: "200px",
																									}}
																									controls
																								>
																									<source
																										src={
																											process.env
																												.REACT_APP_AWS_S3 +
																											app.videourl
																										}
																										type="video/mp4"
																									/>
																								</video>
																								<div className="f-fm fm-w3-s12 color-00">
																									{app.videodatetime}
																								</div>
																								<div className="f-fm fm-w3-s12 color-00">
																									Duration: {app.videoduration}
																								</div>
																							</>
																						)}
																						{/* <br /> */}
																					</div>
																					{/* <div className="col">
																				<label className="f-fm fm-w3-s12 color-00"></label>
																			</div>
																			<div className="col">
																				<label className="f-fm fm-w3-s12 color-00"></label>
																			</div> */}
																				</Card>
																			</>
																		)}
																</>
															)
														);
													})}
											</>
										);
									})
								)}
							</Tab>
						</Tabs>
					</Modal>
				)}
				{apointment === "block" && (
					<Apointment
						hideapointment={hideapointment}
						appointment={selectedAppointment}
						show={showAgain}
						getvalue={props.getvalue}
						getprice={props.getprice}
					></Apointment>
				)}
			</div>
		</>
	);
};

export default Patient2;
