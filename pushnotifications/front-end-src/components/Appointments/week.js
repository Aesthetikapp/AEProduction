import React, { useState, useEffect, useRef } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as TreatmentServices from "../../services/treatments";
// import PopoverComponent from "./popovercomponent";
import Reschedule from "./reschedule";
import * as UserServices from "../../services/user";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tabs";
import styled from "styled-components";
import * as PatientServices from "../../services/patient";
import moment from "moment";
// import Tooltip from "react-bootstrap/Tooltip";
import { useLocation, useNavigate } from "react-router-dom";

const DropDownContainer = styled("div")``;
const DropDownHeader = styled("div")``;
const DropDownListContainer = styled("div")``;
const DropDownList = styled("ul")``;
const ListItem = styled("li")``;

const Weeks = (props) => {
	const [selectedOption, setSelectedOption] = useState("");
	const params = useLocation().state;
	const [isOpen2, setIsOpen2] = useState(false);
	const [selectedOption2, setSelectedOption2] = useState(null);
	const [filterList, setFilterList] = useState(["Reschedule", "Remove"]);
	const [treatments, setTreatments] = useState([]);

	const toggling2 = () => setIsOpen2(!isOpen2);
	const onOptionClicked2 = (value, event, apd, type) => {
		setSelectedOption2(value);
		setIsOpen2(false);
		if (value === "Reschedule") {
			if (event === "5") {
				document.body.click();
				setSelectedOption(event);
			}
		}
		if (value === "Remove") {
			Remove(apd, type);
		}
	};

	const setSelectedOptionEmpty = () => {
		setSelectedOption("");
	};

	const [futureDates, setFutureDated] = useState([]);
	const [backDates, setBackDates] = useState([]);
	useEffect(() => {
		for (var i = 1; i < 50; i++) {
			const date = moment()
				.add(-i, i > 1 ? "days" : "day")
				.format("YYYY-MM-DD");

			if (!backDates.includes(date)) {
				futureDates.push(date);
				backDates.push(date);
			}
		}
	}, []);

	const getPaddingBottom = (st, dt) => {
		var startTime = moment(st, "HH:mm:ss");
		var endTime = moment(dt, "HH:mm:ss");

		var duration = moment.duration(endTime.diff(startTime));

		var minutes = parseInt(duration.asMinutes());

		return minutes;
	};

	const [previosHistoryArray, setPreviosHistoryArray] = useState([]);
	const [historyTempArray, setHistoryTempArray] = useState([]);
	const [duphistoryTempArray, setdupHistoryTempArray] = useState([]);

	const getArray60Lines = (id) => {
		return [...Array(60)].map((x, j) => (
			<div
				className={id != 0 && id != 6 ? "Mins" : ""}
				key={j}
				style={{
					height: "1.13px",
				}}
			>
				{" "}
			</div>
		));
	};

	const getTreatmentLabel = () => {
		return (
			<>
				<div
					style={{
						backgroundColor: "#00C3A0",
						height: "40px",
						width: "500px",
						borderRadius: "10px 10px 0px 0px",
						paddingLeft: "30px",
					}}
				>
					<div>
						<span>
							<label
								className="f-fm fm-w7-s14"
								style={{
									paddingRight: "25px",
									color: "#fff",
									paddingTop: "12px",
								}}
							>
								Treatment List
							</label>
						</span>
					</div>
				</div>
			</>
		);
	};

	const getAppointmentLabel = () => {
		return (
			<div className="col-4">
				<label
					className="f-fm color-AC"
					style={{
						paddingBottom: "5px",
						fontSize: "12px",
					}}
				>
					APPOINTMENT TIME
				</label>
			</div>
		);
	};
	const getConsultationLabel = () => {
		return (
			<div className="col-4">
				<label
					className="f-fm color-AC"
					style={{
						paddingBottom: "5px",
						fontSize: "12px",
					}}
				>
					CONSULTATION TIME
				</label>
			</div>
		);
	};
	const getTimeAndLocationLabel = () => {
		return (
			<div className="row">
				<div className="col">
					<label
						className="f-fm fm-w6-s12 color-AC"
						style={{
							paddingBottom: "5px",
						}}
					>
						TIME AND LOCATION
					</label>
				</div>
			</div>
		);
	};

	const hashCode = (str) => {
		let hash = 0;
		for (var i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		return hash;
	};

	const pickColor = (str) => {
		return `hsl(${hashCode(str) % 360}, 72%, 86%)`;
	};
	const pickColor1 = (str) => {
		return `hsl(${hashCode(str) % 360}, 96%, 16%)`;
	};
	const getColumnString = (i, id, props, ta) => {
		var colclass = "";
		var padding = "0px";
		var borderBottom = "2px solid #000000";
		var borderLeft = "1px solid #ACACAC";
		var height = "70px";
		var position = "relative";
		var border = "1px solid #D6D6D6";

		colclass =
			i !== 0 && i !== 4
				? "012 "
				: i === 0
				? ""
				: id === 0
				? " lunch lunchs "
				: id === 6
				? " lunch lunche week12 "
				: "";
		var mstyle = {};
		if (i === 4) {
			mstyle = {
				padding: "0px",
				borderBottom: "2px solid #000000",
				borderLeft: "1px solid #ACACAC",
				height: "70px",
				position: "relative",
			};
		} else if (i !== 0 && i !== 4) {
			mstyle = {
				position: "relative",
				padding: "0px",
				border: "1px solid #D6D6D6",
				height: "70px",
			};
		} else {
			mstyle = {};
		}
		if (i === 0) {
			return <Col className="firstcell"></Col>;
		} else {
			return (
				<Col className={colclass} style={mstyle}>
					{props.apatientDetails.map((apd, indx) => {
						var dt = new Date(
							apd.consultationtype === "appointment"
								? apd.appointmentdate
								: apd.consultationdate
						);
						var year = dt.getFullYear();
						var month = (dt.getMonth() + 1).toString().padStart(2, "0");
						var day = dt.getDate().toString().padStart(2, "0");
						if (
							apd.consultationtype === "appointment"
								? apd.status === "Accepted"
								: apd.cstatus === "Accepted"
						) {
							if (props.appointments[id] !== undefined) {
								if (
									props.appointments[id].split("-")[2] === day &&
									(apd.consultationtype === "appointment"
										? apd.starttime.replace(/^0/, "").split(":")[0] + ":00" ===
										  convertTime12to24(ta)
										: apd.cstarttime.replace(/^0/, "").split(":")[0] + ":00" ===
										  convertTime12to24(ta)) &&
									new Date(props.appointments[id]).toString().split(" ")[1] ===
										dt.toString().split(" ")[1]
								) {
									return (
										<div>
											{apd.treatmentid[0].split(",").length > 1 ? (
												<h
													style={{
														width: "100%",
														position: "absolute",
														zIndex: 100000,
														left: "-5px",
														top:
															apd.consultationtype === "consultation"
																? apd.cstarttime.split(":")[1] + "px"
																: apd.starttime.split(":")[1] + "px",
													}}
												>
													{apd.treatmentid[0]
														.split(",")
														.slice(0, 1)
														.map((e, j) => {
															return (
																<>
																	<>
																		{apd.iscompleted === "true" ? (
																			<OverlayTrigger
																				onEnter={getEnter}
																				trigger="click"
																				rootClose
																				placement="auto"
																				overlay={
																					<Popover
																						id="popover-basic"
																						style={{
																							backgroundColor: "#FFFFFF",
																							width: "500px",
																							height: "840px",
																							borderRadius: "10px",
																							maxWidth: "500px",
																						}}
																					>
																						<Popover.Body
																							style={{
																								padding: "0px",
																							}}
																						>
																							{getTreatmentLabel()}

																							<div>
																								<div
																									class="accordion"
																									id="accordionExample"
																								>
																									{apd.treatmentid[0]
																										.split(",")
																										.map((k, h) => {
																											return (
																												<>
																													<div class="accordion-item">
																														<h2
																															class="accordion-header"
																															id={
																																"headingOne" + h
																															}
																														>
																															<button
																																class="accordion-button"
																																type="button"
																																data-bs-toggle="collapse"
																																data-bs-target={
																																	"#collapseOne" +
																																	h
																																}
																																aria-expanded="true"
																																aria-controls={
																																	"collapseOne" +
																																	h
																																}
																															>
																																{getvalue(k)}
																															</button>
																														</h2>
																														<div
																															id={
																																"collapseOne" +
																																h
																															}
																															class="accordion-collapse collapse"
																															aria-labelledby={
																																"headingOne" + h
																															}
																															data-bs-parent="#accordionExample"
																														>
																															<div>
																																<div>
																																	<div
																																		style={{
																																			backgroundColor:
																																				"#00C3A0",
																																			height:
																																				"40px",
																																			width:
																																				"500px",
																																			borderRadius:
																																				"10px 10px 0px 0px",
																																			paddingLeft:
																																				"30px",
																																		}}
																																	>
																																		<div>
																																			<label
																																				className="f-fm fm-w4-s12 color-7"
																																				style={{
																																					color:
																																						"#fff",
																																					paddingTop:
																																						"10px",
																																				}}
																																			>
																																				{
																																					apd.appointmentdate.split(
																																						"T"
																																					)[0]
																																				}
																																				&nbsp;&nbsp;
																																				{
																																					apd.starttime
																																				}
																																				&nbsp;&nbsp;
																																				{
																																					apd.endtime
																																				}
																																			</label>
																																			<span>
																																				<label
																																					className="f-fm fm-w7-s14"
																																					style={{
																																						paddingBottom:
																																							"25px",
																																						paddingRight:
																																							"25px",
																																						paddingLeft:
																																							"120px",
																																						color:
																																							"#fff",
																																						paddingTop:
																																							"10px",
																																					}}
																																				>
																																					Treatment
																																					Completed&nbsp;&nbsp;
																																					<i class="fa fa-light fa-check"></i>
																																				</label>
																																			</span>
																																		</div>
																																	</div>

																																	<div
																																		className="row pt-4"
																																		style={{
																																			paddingLeft:
																																				"22px",
																																		}}
																																	>
																																		<div className="col-2">
																																			{getPatientImage(
																																				apd
																																					.patient_details[0],
																																				"56px"
																																			)}
																																		</div>
																																		<div className="col-8">
																																			<div
																																				className="row"
																																				style={{
																																					marginLeft:
																																						"-30px",
																																				}}
																																			>
																																				<div className="col">
																																					<label className="f-fm fm-w7-s24 color-00">
																																						{
																																							apd
																																								.patient_details[0]
																																								.firstName
																																						}
																																					</label>
																																				</div>
																																			</div>
																																			<div
																																				className="row"
																																				style={{
																																					marginLeft:
																																						"-30px",
																																				}}
																																			>
																																				<div className="col">
																																					{apd
																																						.patient_details[0]
																																						.gender ===
																																					"Male" ? (
																																						<i
																																							class="fa fa-regular fa-mars"
																																							style={{
																																								color:
																																									"red",
																																							}}
																																						></i>
																																					) : (
																																						<i
																																							class="fa fa-solid fa-venus"
																																							style={{
																																								color:
																																									"red",
																																							}}
																																						></i>
																																					)}
																																					&nbsp;&nbsp;
																																					<label className="f-fm fm-w6-s14 color-00">
																																						{calculate_age(
																																							apd.patient_details[0].dob.split(
																																								"T"
																																							)[0]
																																						)}
																																					</label>
																																				</div>
																																			</div>
																																		</div>

																																		<div className="row">
																																			<Tabs
																																				defaultActiveKey="Treatment"
																																				id="profiletab"
																																				className="list-tab"
																																			>
																																				<Tab
																																					eventKey="Treatment"
																																					title="Treatment"
																																				>
																																					<div className="row">
																																						<div className="col-3 f-fm fm-w7-s14">
																																							Treatment
																																							Time
																																						</div>
																																						<div
																																							className="col-4 f-fm fm-w5-s14"
																																							style={{
																																								color:
																																									"#ACACAC",
																																							}}
																																						>
																																							TIME
																																							STARTED
																																							<br />
																																							<span
																																								className="f-fm fm-w6-s14"
																																								style={{
																																									color:
																																										"#000",
																																								}}
																																							>
																																								{
																																									apd.starttime
																																								}
																																							</span>
																																						</div>
																																						<div
																																							className="col-5 f-fm fm-w5-s14"
																																							style={{
																																								color:
																																									"#ACACAC",
																																							}}
																																						>
																																							TIME
																																							ENDED
																																							<br />
																																							<span
																																								className="f-fm fm-w6-s14"
																																								style={{
																																									color:
																																										"#000",
																																								}}
																																							>
																																								{
																																									apd.endtime
																																								}
																																							</span>
																																						</div>
																																					</div>
																																					<div className="row pt-5">
																																						<div className="col-3 f-fm fm-w7-s14">
																																							Syringes
																																						</div>
																																						<div className="col-9">
																																							<div className="row">
																																								<div
																																									className="col-12"
																																									style={{
																																										color:
																																											"#ACACAC",
																																									}}
																																								>
																																									BEFORE
																																								</div>
																																								<div className="col-12 pt-1">
																																									{apd.starttreatmentsyringes ===
																																									""
																																										? "No images"
																																										: apd.starttreatmentsyringes
																																												.split(
																																													","
																																												)
																																												.map(
																																													(
																																														start
																																													) => {
																																														return (
																																															<img
																																																key={
																																																	start
																																																}
																																																className="p-2"
																																																alt="before"
																																																width="100"
																																																height="100"
																																																src={
																																																	process
																																																		.env
																																																		.REACT_APP_AWS_S3 +
																																																	start
																																																}
																																															></img>
																																														);
																																													}
																																												)}
																																								</div>
																																								<div
																																									className="col-12 pt-4"
																																									style={{
																																										color:
																																											"#ACACAC",
																																									}}
																																								>
																																									AFTER
																																								</div>
																																								<div className="col-12">
																																									{apd.endtreatmentsyringes ===
																																									""
																																										? "No images"
																																										: apd.endtreatmentsyringes
																																												.split(
																																													","
																																												)
																																												.map(
																																													(
																																														start
																																													) => {
																																														return (
																																															<img
																																																key={
																																																	start
																																																}
																																																className="p-2"
																																																alt="before"
																																																width="100"
																																																height="100"
																																																src={
																																																	process
																																																		.env
																																																		.REACT_APP_AWS_S3 +
																																																	start
																																																}
																																															></img>
																																														);
																																													}
																																												)}
																																								</div>
																																							</div>
																																						</div>
																																					</div>
																																					<div className="row pt-5">
																																						<div className="col-3 f-fm fm-w7-s14">
																																							Medical
																																							Photos
																																						</div>
																																						<div className="col-9">
																																							<div className="row">
																																								<div
																																									className="col-12"
																																									style={{
																																										color:
																																											"#ACACAC",
																																									}}
																																								>
																																									BEFORE
																																								</div>
																																								<div className="col-12 pt-1">
																																									{apd.startmedicalphotos ===
																																									""
																																										? "No images"
																																										: apd.startmedicalphotos
																																												.split(
																																													","
																																												)
																																												.map(
																																													(
																																														start
																																													) => {
																																														return (
																																															<img
																																																key={
																																																	start
																																																}
																																																className="p-2"
																																																alt="before"
																																																width="100"
																																																height="100"
																																																src={
																																																	process
																																																		.env
																																																		.REACT_APP_AWS_S3 +
																																																	start
																																																}
																																															></img>
																																														);
																																													}
																																												)}
																																								</div>
																																								<div
																																									className="col-12 pt-4"
																																									style={{
																																										color:
																																											"#ACACAC",
																																									}}
																																								>
																																									AFTER
																																								</div>
																																								<div className="col-12">
																																									{apd.endmedicalphotos ===
																																									""
																																										? "No images"
																																										: apd.endmedicalphotos
																																												.split(
																																													","
																																												)
																																												.map(
																																													(
																																														start
																																													) => {
																																														return (
																																															<img
																																																key={
																																																	start
																																																}
																																																className="p-2"
																																																alt="before"
																																																width="100"
																																																height="100"
																																																src={
																																																	process
																																																		.env
																																																		.REACT_APP_AWS_S3 +
																																																	start
																																																}
																																															></img>
																																														);
																																													}
																																												)}
																																								</div>
																																							</div>
																																						</div>
																																					</div>
																																					<div className="row pt-5">
																																						<div className="col-3 f-fm fm-w7-s14">
																																							Others
																																						</div>
																																						<div className="col-9">
																																							<div className="row">
																																								<div
																																									className="col-12 pb-2"
																																									style={{
																																										color:
																																											"#ACACAC",
																																									}}
																																								>
																																									ADDITIONAL
																																									SYRINGES
																																								</div>
																																								<div
																																									className="col-8"
																																									style={{
																																										backgroundColor:
																																											"#F4F4F4",
																																										borderRadius:
																																											"10px",
																																										padding:
																																											"8px",
																																										color:
																																											"#AF805E",
																																									}}
																																								>
																																									{getvalue(
																																										k
																																									)}
																																									<span
																																										style={{
																																											backgroundColor:
																																												"#000",
																																											color:
																																												"#fff",
																																											paddingLeft:
																																												"10px",
																																											paddingRight:
																																												"10px",
																																											borderRadius:
																																												"20px",
																																											textAlign:
																																												"end",
																																										}}
																																									>
																																										+
																																										{parseInt(
																																											apd.finalsyringes.split(
																																												","
																																											)[
																																												h
																																											]
																																										) -
																																											parseInt(
																																												apd.initialsyringes.split(
																																													","
																																												)[
																																													h
																																												]
																																											)}
																																									</span>
																																								</div>
																																							</div>
																																						</div>
																																					</div>
																																				</Tab>
																																				<Tab
																																					eventKey="Appointment Details"
																																					title="Appointment Details"
																																					onClick={(
																																						e
																																					) => {
																																						temp();
																																					}}
																																					tabIndex="1"
																																				>
																																					<>
																																						{getTimeAndLocationLabel()}
																																						<div className="row">
																																							{getConsultationLabel()}
																																							<div
																																								className="col"
																																								style={{
																																									paddingBottom:
																																										"3px",
																																								}}
																																							>
																																								<label
																																									style={{
																																										width:
																																											"14px",
																																										height:
																																											"14px",
																																									}}
																																								>
																																									<img
																																										style={{
																																											width:
																																												"14px",
																																											height:
																																												"14px",
																																											Color:
																																												"#777777",
																																										}}
																																										src="images/Group.png"
																																										alt="time"
																																									></img>
																																								</label>
																																								&nbsp;&nbsp;
																																								<label className="f-fm fm-w4-s12 color-7">
																																									{
																																										apd.consultationdate.split(
																																											"T"
																																										)[0]
																																									}
																																									&nbsp;&nbsp;
																																									{
																																										apd.cstarttime
																																									}
																																									&nbsp;&nbsp;
																																									{
																																										apd.cendtime
																																									}
																																								</label>
																																							</div>
																																						</div>

																																						<div className="row">
																																							{getAppointmentLabel()}
																																							<div
																																								className="col"
																																								style={{
																																									paddingBottom:
																																										"3px",
																																								}}
																																							>
																																								<label
																																									style={{
																																										width:
																																											"14px",
																																										height:
																																											"14px",
																																									}}
																																								>
																																									<img
																																										style={{
																																											width:
																																												"14px",
																																											height:
																																												"14px",
																																											Color:
																																												"#777777",
																																										}}
																																										src="images/Group.png"
																																										alt="time"
																																									></img>
																																								</label>
																																								&nbsp;&nbsp;
																																								<label className="f-fm fm-w4-s12 color-7">
																																									{
																																										apd.appointmentdate.split(
																																											"T"
																																										)[0]
																																									}
																																									&nbsp;&nbsp;
																																									{
																																										apd.starttime
																																									}
																																									&nbsp;&nbsp;
																																									{
																																										apd.endtime
																																									}
																																								</label>
																																							</div>
																																						</div>
																																						<div className="row">
																																							<div
																																								className="col"
																																								style={{
																																									paddingBottom:
																																										"25px",
																																								}}
																																							>
																																								<label>
																																									<img
																																										style={{
																																											width:
																																												"14px",
																																											height:
																																												"14px",
																																											Color:
																																												"#777777",
																																										}}
																																										src="images/maps-and-flags.png"
																																										alt="map"
																																									></img>
																																								</label>
																																								&nbsp;&nbsp;
																																								<label className="f-fm fm-w4-s12 color-7">
																																									{
																																										apd
																																											.patient_details[0]
																																											.address[0]
																																											.line1
																																									}
																																									&nbsp;
																																									{
																																										apd
																																											.patient_details[0]
																																											.address[0]
																																											.line2
																																									}
																																									&nbsp;
																																									{
																																										apd
																																											.patient_details[0]
																																											.address[0]
																																											.towncity
																																									}
																																									&nbsp;
																																									{
																																										apd
																																											.patient_details[0]
																																											.address[0]
																																											.country
																																									}
																																									&nbsp;
																																									{
																																										apd
																																											.patient_details[0]
																																											.address[0]
																																											.postcode
																																									}
																																								</label>
																																							</div>
																																						</div>

																																						<div className="row">
																																							<div
																																								className="col"
																																								style={{
																																									paddingBottom:
																																										"5px",
																																								}}
																																							>
																																								<label className="f-fm fm-w6-s12 color-AC">
																																									TREATMENT
																																								</label>
																																							</div>
																																						</div>

																																						<div className="row">
																																							<div
																																								className="col"
																																								style={{
																																									paddingBottom:
																																										"3px",
																																								}}
																																							>
																																								<label className="f-fm fm-w6-s16 color-00 treat">
																																									{getTreatmentName(
																																										k
																																									)}
																																								</label>
																																							</div>
																																						</div>
																																						<div className="row">
																																							<div
																																								className="col"
																																								style={{
																																									paddingBottom:
																																										"25px",
																																								}}
																																							>
																																								<img
																																									src="images/injection.png"
																																									alt="injection"
																																								></img>
																																								&nbsp;
																																								<label className="f-fm fm-w6-s14 color-00">
																																									x
																																									{
																																										apd.finalsyringes.split(
																																											","
																																										)[
																																											h
																																										]
																																									}
																																								</label>
																																								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																																								<label
																																									className="f-fm fm-w7-s14 "
																																									style={{
																																										color:
																																											"#AF805E",
																																									}}
																																								>
																																									$
																																									{parseInt(
																																										apd.finalsyringes.split(
																																											","
																																										)[
																																											h
																																										]
																																									) *
																																										getPrice(
																																											k
																																										)}
																																								</label>
																																							</div>
																																						</div>

																																						<div className="row">
																																							<div
																																								className="col"
																																								style={{
																																									paddingBottom:
																																										"5px",
																																								}}
																																							>
																																								<label className="f-fm fm-w6-s12 color-AC">
																																									CONSULTATION
																																								</label>
																																							</div>
																																						</div>
																																						<div className="row">
																																							<div
																																								className="col-6"
																																								style={{
																																									paddingBottom:
																																										"3px",
																																								}}
																																							>
																																								<video
																																									style={{
																																										height:
																																											"200px",
																																										width:
																																											"400px",
																																									}}
																																									controls
																																								>
																																									<source
																																										src={
																																											process
																																												.env
																																												.REACT_APP_AWS_S3 +
																																											apd.videourl
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
																																									paddingBottom:
																																										"5px",
																																								}}
																																							>
																																								<label className="f-fm fm-w3-s10 color-00">
																																									{
																																										apd.videodatetime.split(
																																											" "
																																										)[0]
																																									}
																																									&nbsp;
																																									{
																																										apd.videodatetime.split(
																																											" "
																																										)[1]
																																									}
																																								</label>
																																							</div>
																																						</div>
																																						<div className="row">
																																							<div
																																								className="col"
																																								style={{
																																									paddingBottom:
																																										"25px",
																																								}}
																																							>
																																								<label className="f-fm fm-w3-s10 color-00">
																																									Duration:
																																									{
																																										apd.videoduration
																																									}
																																								</label>
																																							</div>
																																						</div>

																																						<div className="row">
																																							<div
																																								className="col"
																																								style={{
																																									paddingBottom:
																																										"5px",
																																								}}
																																							>
																																								<label className="f-fm fm-w6-s12 color-AC">
																																									ALLERGY
																																								</label>
																																							</div>
																																						</div>
																																						<div className="row">
																																							<div
																																								className="col"
																																								style={{
																																									paddingBottom:
																																										"25px",
																																								}}
																																							>
																																								<label
																																									className="f-fm fm-w5-s14 color-00"
																																									style={{
																																										display:
																																											"flex",
																																										flexFlow:
																																											"wrap",
																																									}}
																																								>
																																									{apd
																																										.patient_details[0]
																																										.allergies ===
																																										"" ||
																																									apd
																																										.patient_details[0]
																																										.allergies ===
																																										" "
																																										? "N/A"
																																										: apd.patient_details[0].allergies
																																												.split(
																																													"|"
																																												)
																																												.map(
																																													(
																																														allergy
																																													) => {
																																														return (
																																															<span
																																																style={{
																																																	backgroundColor:
																																																		"#ACACAC36",
																																																	margin:
																																																		"5px",
																																																	paddingTop:
																																																		"3px",
																																																	paddingBottom:
																																																		"3px",
																																																	paddingRight:
																																																		"15px",
																																																	paddingLeft:
																																																		"15px",
																																																	borderRadius:
																																																		"5px",
																																																}}
																																															>
																																																{
																																																	allergy
																																																}
																																															</span>
																																														);
																																													}
																																												)}
																																								</label>
																																							</div>
																																						</div>
																																						<div className="row">
																																							<div
																																								className="col"
																																								style={{
																																									paddingBottom:
																																										"5px",
																																								}}
																																							>
																																								<label className="f-fm fm-w6-s12 color-Ac">
																																									TREATMENT
																																									HISTORY
																																								</label>
																																							</div>
																																						</div>
																																						<div className="row">
																																							<div className="col-10">
																																								<label
																																									style={{
																																										width:
																																											"429px",
																																										height:
																																											"68px",
																																										background:
																																											"#acacac36",
																																										borderRadius:
																																											"5px 5px 0px 0px",
																																										float:
																																											"left",
																																										cursor:
																																											"pointer",
																																										display:
																																											"flex",
																																										alignItems:
																																											"center",
																																										justifyContent:
																																											duphistoryTempArray.length ===
																																											0
																																												? "center"
																																												: "left",
																																									}}
																																									onClick={() => {
																																										getPatients(
																																											apd.patientid,
																																											apd.appointmentdate,
																																											apd.doctorid
																																										);

																																										handleHistory();
																																									}}
																																								>
																																									<label
																																										className="f-fm fm-w5-s12 color-00"
																																										style={{
																																											fontWeight:
																																												"bold",
																																											paddingLeft:
																																												"30px",
																																										}}
																																									>
																																										{history1 ===
																																											false && (
																																											<label>
																																												previous
																																												history
																																											</label>
																																										)}
																																										{duphistoryTempArray.length ===
																																											0 &&
																																											history1 ===
																																												true && (
																																												<label>
																																													-
																																													No
																																													previous
																																													history
																																													-
																																												</label>
																																											)}
																																										{duphistoryTempArray.length !==
																																											0 &&
																																											history1 ===
																																												true && (
																																												<label>
																																													{
																																														duphistoryTempArray.length
																																													}
																																													&nbsp;
																																													treatment
																																													history
																																												</label>
																																											)}
																																									</label>
																																								</label>
																																							</div>
																																							<div
																																								className="col-1"
																																								style={{
																																									display:
																																										"flex",
																																									alignItems:
																																										"center",
																																									justifyContent:
																																										"left",
																																								}}
																																							>
																																								{history ? (
																																									<i class="fa fa-light fa-angle-up"></i>
																																								) : (
																																									<i class="fa fa-light fa-angle-down"></i>
																																								)}
																																							</div>
																																						</div>
																																						{history && (
																																							<div className="row">
																																								<div className="col">
																																									<label
																																										style={{
																																											width:
																																												"429px",
																																											height:
																																												"140px",
																																											background:
																																												"#acacac36",
																																											borderRadius:
																																												"0px 0px 5px 5px",
																																											overflowY:
																																												"auto",
																																										}}
																																									>
																																										{duphistoryTempArray.map(
																																											(
																																												w,
																																												k
																																											) => {
																																												return (
																																													<>
																																														<label
																																															className="f-fm fm-w5-s12 color-00"
																																															style={{
																																																paddingLeft:
																																																	"30px",
																																															}}
																																														>
																																															{
																																																w.appointmentdate.split(
																																																	"T"
																																																)[0]
																																															}
																																															&nbsp;&nbsp;
																																															{
																																																w.starttime
																																															}
																																															&nbsp;&nbsp;
																																															{
																																																w.endtime
																																															}
																																														</label>
																																														<br />
																																														<label
																																															className="f-fm fm-w6-s16 color-00"
																																															style={{
																																																paddingLeft:
																																																	"30px",
																																																paddingBottom:
																																																	"25px",
																																															}}
																																														>
																																															{w.treatmentid[0]
																																																.split(
																																																	","
																																																)
																																																.map(
																																																	(
																																																		tid,
																																																		l
																																																	) => {
																																																		return (
																																																			<>
																																																				<label>
																																																					{getTreatmentName(
																																																						tid
																																																					)}
																																																				</label>
																																																				<label
																																																					className="col f-fm fm-w6-s14 color-00"
																																																					style={{
																																																						paddingLeft:
																																																							"20px",
																																																					}}
																																																				>
																																																					<img
																																																						src="images/injection.png"
																																																						alt="injection"
																																																					></img>
																																																					&nbsp;
																																																					<label className="f-fm fm-w6-s14 color-00">
																																																						x
																																																						{
																																																							w.finalsyringes.split(
																																																								","
																																																							)[
																																																								l
																																																							]
																																																						}
																																																					</label>
																																																				</label>
																																																				;
																																																				<br />
																																																			</>
																																																		);
																																																	}
																																																)}
																																														</label>

																																														<br />
																																													</>
																																												);
																																											}
																																										)}

																																										<br />
																																									</label>
																																								</div>
																																							</div>
																																						)}
																																					</>
																																				</Tab>
																																			</Tabs>
																																		</div>
																																	</div>
																																</div>
																															</div>
																														</div>
																													</div>
																												</>
																											);
																										})}
																								</div>
																							</div>
																						</Popover.Body>
																					</Popover>
																				}
																			>
																				<button
																					className={
																						apd.consultationtype ===
																						"consultation"
																							? apd.videourl !== "" &&
																							  apd.isdoctorcheckedin === "" &&
																							  apd.iscompleted === "false"
																								? "videocompleted"
																								: apd.videourl == "" &&
																								  apd.isdoctorcheckedin ===
																										"" &&
																								  apd.iscompleted === "false"
																								? "video"
																								: "videocompleted"
																							: apd.iscompleted === "true"
																							? "treatmentcompleted"
																							: apd.iscompleted === "false" &&
																							  apd.isdoctorcheckedin === "true"
																							? "treatment"
																							: "treatmentparked"
																					}
																					disabled={
																						apd.consultationtype ===
																						"appointment"
																							? apd.aptdisable === "true"
																								? true
																								: false
																							: apd.cnsdisable === "true"
																							? true
																							: false
																					}
																					style={{
																						paddingBottom:
																							apd.consultationtype ===
																							"consultation"
																								? getPaddingBottom(
																										apd.cstarttime,
																										apd.cendtime
																								  ) -
																								  20 +
																								  "px"
																								: getPaddingBottom(
																										apd.starttime,
																										apd.endtime
																								  ) -
																								  20 +
																								  "px",
																						textAlign: "left",
																						border: "none",
																					}}
																				>
																					<span
																						style={{
																							float: "left",
																							width: "75%",
																							paddingTop: "2px",
																						}}
																						className="text-truncate"
																					>
																						{getvalue(e)}
																					</span>

																					<span
																						style={{
																							display: "inline-block",
																						}}
																					>
																						{apd.treatmentid[0].split(",")
																							.length > 1 && (
																							<span
																								class="badge rounded-pill badge-notification bg-dark"
																								style={{
																									display: "flex",
																									height: "16px",
																									width: "36px",
																								}}
																							>
																								<p
																									style={{
																										fontFamily: "Mulish",
																										margin: "auto",
																									}}
																									className="fm-w6-s12"
																								>
																									+{" "}
																									{apd.treatmentid[0].split(",")
																										.length - 1}
																								</p>
																							</span>
																						)}
																					</span>
																				</button>
																			</OverlayTrigger>
																		) : (
																			<OverlayTrigger
																				onEnter={getEnter}
																				trigger="click"
																				rootClose
																				placement="auto"
																				overlay={
																					<Popover
																						id="popover-basic"
																						style={{
																							backgroundColor: "#FFFFFF",
																							width: "500px",
																							height: "840px",
																							borderRadius: "10px",
																							maxWidth: "500px",
																						}}
																					>
																						<Popover.Body
																							style={{
																								padding: "0px",
																							}}
																						>
																							{getTreatmentLabel()}

																							<div>
																								<div
																									class="accordion"
																									id="accordionExample"
																								>
																									{apd.treatmentid[0]
																										.split(",")
																										.map((k, h) => {
																											return (
																												<>
																													<div class="accordion-item">
																														<h2
																															class="accordion-header"
																															id={
																																"headingOne" + h
																															}
																														>
																															<button
																																class="accordion-button"
																																type="button"
																																data-bs-toggle="collapse"
																																data-bs-target={
																																	"#collapseOne" +
																																	h
																																}
																																aria-expanded="true"
																																aria-controls={
																																	"collapseOne" +
																																	h
																																}
																															>
																																{getvalue(k)}
																															</button>
																														</h2>
																														<div
																															id={
																																"collapseOne" +
																																h
																															}
																															class="accordion-collapse collapse"
																															aria-labelledby={
																																"headingOne" + h
																															}
																															data-bs-parent="#accordionExample"
																														>
																															<div>
																																<div>
																																	{apd.iscompleted ===
																																		"false" &&
																																		apd.isdoctorcheckedin ===
																																			"true" &&
																																		apd.isautoacceptbooking && (
																																			<div className="row">
																																				<div className="col">
																																					<label
																																						className="f-fm fm-w7-s14 color-00C3A0"
																																						style={{
																																							paddingBottom:
																																								"25px",
																																							paddingRight:
																																								"25px",
																																							paddingTop:
																																								"15px",
																																							float:
																																								"right",
																																						}}
																																					>
																																						Auto-accepted&nbsp;&nbsp;
																																						<img
																																							src="images/rightmark.png"
																																							alt="rightmark"
																																						></img>
																																					</label>
																																				</div>
																																			</div>
																																		)}

																																	{apd.videourl !==
																																		"" &&
																																		apd.isdoctorcheckedin ===
																																			"" &&
																																		apd.iscompleted ===
																																			"false" &&
																																		apd.consultationtype ===
																																			"consultation" && (
																																			<div
																																				style={{
																																					backgroundColor:
																																						"#446BF7",
																																					height:
																																						"40px",
																																					width:
																																						"500px",
																																					borderRadius:
																																						"10px 10px 0px 0px",
																																					paddingLeft:
																																						"30px",
																																				}}
																																			>
																																				<div>
																																					<label
																																						className="f-fm fm-w4-s12 color-7"
																																						style={{
																																							color:
																																								"#fff",
																																							paddingTop:
																																								"10px",
																																						}}
																																					>
																																						{
																																							apd.consultationdate.split(
																																								"T"
																																							)[0]
																																						}
																																						&nbsp;&nbsp;
																																						{
																																							apd.cstarttime
																																						}
																																						&nbsp;&nbsp;
																																						{
																																							apd.cendtime
																																						}
																																					</label>
																																					<span>
																																						<label
																																							className="f-fm fm-w7-s14"
																																							style={{
																																								paddingLeft:
																																									"120px",
																																								color:
																																									"#fff",
																																							}}
																																						>
																																							Consultation
																																							Completed&nbsp;&nbsp;
																																							<i class="fa fa-light fa-check"></i>
																																						</label>
																																					</span>
																																				</div>
																																			</div>
																																		)}
																																	{apd.videourl !==
																																		"" &&
																																		apd.isdoctorcheckedin ===
																																			"" &&
																																		apd.iscompleted ===
																																			"false" &&
																																		apd.consultationtype ===
																																			"appointment" && (
																																			<div
																																				style={{
																																					backgroundColor:
																																						"#af805e",
																																					height:
																																						"40px",
																																					width:
																																						"500px",
																																					borderRadius:
																																						"10px 10px 0px 0px",
																																					paddingLeft:
																																						"30px",
																																				}}
																																			>
																																				<div>
																																					<label
																																						className="f-fm fm-w4-s12 color-7"
																																						style={{
																																							color:
																																								"#fff",
																																							paddingTop:
																																								"10px",
																																						}}
																																					>
																																						{
																																							apd.consultationdate.split(
																																								"T"
																																							)[0]
																																						}
																																						&nbsp;&nbsp;
																																						{
																																							apd.cstarttime
																																						}
																																						&nbsp;&nbsp;
																																						{
																																							apd.cendtime
																																						}
																																					</label>
																																					<span>
																																						<label
																																							className="f-fm fm-w7-s14"
																																							style={{
																																								paddingRight:
																																									"25px",
																																								paddingLeft:
																																									"120px",
																																								color:
																																									"#fff",
																																								paddingTop:
																																									"10px",
																																								paddingBottom:
																																									"25px",
																																							}}
																																						>
																																							Appointment
																																							Pending&nbsp;&nbsp;
																																						</label>
																																					</span>
																																				</div>
																																			</div>
																																		)}
																																	{apd.videourl ==
																																		"" &&
																																		apd.isdoctorcheckedin ===
																																			"" &&
																																		apd.iscompleted ===
																																			"false" &&
																																		apd.isautoacceptconsulting && (
																																			<div className="row">
																																				<div className="col">
																																					<label
																																						className="f-fm fm-w7-s14 color-blue"
																																						style={{
																																							paddingBottom:
																																								"25px",
																																							paddingRight:
																																								"25px",
																																							paddingTop:
																																								"15px",
																																							float:
																																								"right",
																																							color:
																																								"#446bf7",
																																						}}
																																					>
																																						Consultation
																																						accepted&nbsp;&nbsp;
																																						<i class="fa fa-light fa-check"></i>
																																					</label>
																																				</div>
																																			</div>
																																		)}

																																	<div
																																		className="row pt-4"
																																		style={{
																																			paddingLeft:
																																				"22px",
																																		}}
																																	>
																																		<div className="col-2">
																																			{getPatientImage(
																																				apd
																																					.patient_details[0],
																																				"56px"
																																			)}
																																		</div>
																																		<div className="col-8">
																																			<div
																																				className="row"
																																				style={{
																																					marginLeft:
																																						"-30px",
																																				}}
																																			>
																																				<div className="col">
																																					<label className="f-fm fm-w7-s24 color-00">
																																						{
																																							apd
																																								.patient_details[0]
																																								.firstName
																																						}
																																					</label>
																																				</div>
																																			</div>
																																			<div
																																				className="row"
																																				style={{
																																					marginLeft:
																																						"-30px",
																																				}}
																																			>
																																				<div className="col">
																																					{apd
																																						.patient_details[0]
																																						.gender ===
																																					"Male" ? (
																																						<i
																																							class="fa fa-regular fa-mars"
																																							style={{
																																								color:
																																									"red",
																																							}}
																																						></i>
																																					) : (
																																						<i
																																							class="fa fa-solid fa-venus"
																																							style={{
																																								color:
																																									"red",
																																							}}
																																						></i>
																																					)}
																																					&nbsp;&nbsp;
																																					<label className="f-fm fm-w6-s14 color-00">
																																						{calculate_age(
																																							apd.patient_details[0].dob.split(
																																								"T"
																																							)[0]
																																						)}
																																					</label>
																																				</div>
																																			</div>
																																		</div>

																																		<div
																																			className="col-2"
																																			style={{
																																				marginLeft:
																																					"-22px",
																																			}}
																																		>
																																			<label
																																				style={{
																																					border:
																																						"1px solid #D6D6D6",
																																					width:
																																						"45px",
																																					borderRadius:
																																						"22px",
																																					height:
																																						"45px",
																																					float:
																																						"right",
																																				}}
																																			>
																																				<img
																																					src="images/Vector.png"
																																					alt="Vector"
																																					style={{
																																						padding:
																																							"11px",
																																					}}
																																				></img>
																																			</label>
																																		</div>

																																		<div className="row">
																																			<div className="col">
																																				<hr
																																					style={{
																																						color:
																																							"rgb(149 142 142)",
																																						backgroundColor:
																																							"#000000",
																																						height:
																																							"1px",
																																					}}
																																				/>
																																			</div>
																																		</div>
																																		{getTimeAndLocationLabel()}
																																		<div className="row">
																																			{getConsultationLabel()}
																																			<div
																																				className="col"
																																				style={{
																																					paddingBottom:
																																						"3px",
																																				}}
																																			>
																																				<label
																																					style={{
																																						width:
																																							"14px",
																																						height:
																																							"14px",
																																					}}
																																				>
																																					<img
																																						style={{
																																							width:
																																								"14px",
																																							height:
																																								"14px",
																																							Color:
																																								"#777777",
																																						}}
																																						src="images/Group.png"
																																						alt="time"
																																					></img>
																																				</label>
																																				&nbsp;&nbsp;
																																				<label className="f-fm fm-w4-s12 color-7">
																																					{
																																						apd.consultationdate.split(
																																							"T"
																																						)[0]
																																					}
																																					&nbsp;&nbsp;
																																					{
																																						apd.cstarttime
																																					}
																																					&nbsp;&nbsp;
																																					{
																																						apd.cendtime
																																					}
																																				</label>
																																			</div>
																																		</div>

																																		<div className="row">
																																			{getAppointmentLabel()}
																																			<div
																																				className="col"
																																				style={{
																																					paddingBottom:
																																						"3px",
																																				}}
																																			>
																																				<label
																																					style={{
																																						width:
																																							"14px",
																																						height:
																																							"14px",
																																					}}
																																				>
																																					<img
																																						style={{
																																							width:
																																								"14px",
																																							height:
																																								"14px",
																																							Color:
																																								"#777777",
																																						}}
																																						src="images/Group.png"
																																						alt="time"
																																					></img>
																																				</label>
																																				&nbsp;&nbsp;
																																				<label className="f-fm fm-w4-s12 color-7">
																																					{
																																						apd.appointmentdate.split(
																																							"T"
																																						)[0]
																																					}
																																					&nbsp;&nbsp;
																																					{
																																						apd.starttime
																																					}
																																					&nbsp;&nbsp;
																																					{
																																						apd.endtime
																																					}
																																				</label>
																																			</div>
																																		</div>

																																		<div className="row">
																																			<div
																																				className="col"
																																				style={{
																																					paddingBottom:
																																						"25px",
																																				}}
																																			>
																																				<label>
																																					<img
																																						style={{
																																							width:
																																								"14px",
																																							height:
																																								"14px",
																																							Color:
																																								"#777777",
																																						}}
																																						src="images/maps-and-flags.png"
																																						alt="map"
																																					></img>
																																				</label>
																																				&nbsp;&nbsp;
																																				<label className="f-fm fm-w4-s12 color-7">
																																					{
																																						apd
																																							.patient_details[0]
																																							.address[0]
																																							.line1
																																					}
																																					&nbsp;
																																					{
																																						apd
																																							.patient_details[0]
																																							.address[0]
																																							.line2
																																					}
																																					&nbsp;
																																					{
																																						apd
																																							.patient_details[0]
																																							.address[0]
																																							.towncity
																																					}
																																					&nbsp;
																																					{
																																						apd
																																							.patient_details[0]
																																							.address[0]
																																							.country
																																					}
																																					&nbsp;
																																					{
																																						apd
																																							.patient_details[0]
																																							.address[0]
																																							.postcode
																																					}
																																				</label>
																																			</div>
																																		</div>

																																		<div className="row">
																																			<div
																																				className="col"
																																				style={{
																																					paddingBottom:
																																						"5px",
																																				}}
																																			>
																																				<label className="f-fm fm-w6-s12 color-AC">
																																					TREATMENT
																																				</label>
																																			</div>
																																		</div>

																																		<div className="row">
																																			<div
																																				className="col"
																																				style={{
																																					paddingBottom:
																																						"3px",
																																				}}
																																			>
																																				<label className="f-fm fm-w6-s16 color-00 treat">
																																					{getTreatmentName(
																																						k
																																					)}
																																				</label>
																																			</div>
																																		</div>
																																		<div className="row">
																																			<div
																																				className="col"
																																				style={{
																																					paddingBottom:
																																						"25px",
																																				}}
																																			>
																																				<img
																																					src="images/injection.png"
																																					alt="injection"
																																				></img>
																																				&nbsp;
																																				<label className="f-fm fm-w6-s14 color-00">
																																					x
																																					{
																																						apd.finalsyringes.split(
																																							","
																																						)[h]
																																					}
																																				</label>
																																				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																																				<label
																																					className="f-fm fm-w7-s14 "
																																					style={{
																																						color:
																																							"#AF805E",
																																					}}
																																				>
																																					$
																																					{parseInt(
																																						apd.finalsyringes.split(
																																							","
																																						)[h]
																																					) *
																																						getPrice(
																																							k
																																						)}
																																				</label>
																																			</div>
																																		</div>

																																		{apd.videourl !==
																																			"" &&
																																			apd.isdoctorcheckedin ===
																																				"" &&
																																			apd.iscompleted ===
																																				"false" && (
																																				<>
																																					{" "}
																																					<div className="row">
																																						<div
																																							className="col"
																																							style={{
																																								paddingBottom:
																																									"5px",
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
																																								paddingBottom:
																																									"3px",
																																							}}
																																						>
																																							<video
																																								style={{
																																									height:
																																										"200px",
																																									width:
																																										"400px",
																																								}}
																																								controls
																																							>
																																								<source
																																									src={
																																										process
																																											.env
																																											.REACT_APP_AWS_S3 +
																																										apd.videourl
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
																																								paddingBottom:
																																									"5px",
																																							}}
																																						>
																																							<label className="f-fm fm-w3-s10 color-00">
																																								{
																																									apd.videodatetime.split(
																																										" "
																																									)[0]
																																								}
																																								&nbsp;
																																								{
																																									apd.videodatetime.split(
																																										" "
																																									)[1]
																																								}
																																							</label>
																																						</div>
																																					</div>
																																					<div className="row">
																																						<div
																																							className="col"
																																							style={{
																																								paddingBottom:
																																									"25px",
																																							}}
																																						>
																																							<label className="f-fm fm-w3-s10 color-00">
																																								Duration:
																																								{
																																									apd.videoduration
																																								}
																																							</label>
																																						</div>
																																					</div>
																																				</>
																																			)}

																																		{apd.iscompleted ===
																																			"false" &&
																																			apd.isdoctorcheckedin ===
																																				"true" && (
																																				<>
																																					{" "}
																																					<div className="row">
																																						<div
																																							className="col"
																																							style={{
																																								paddingBottom:
																																									"5px",
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
																																								paddingBottom:
																																									"3px",
																																							}}
																																						>
																																							<video
																																								style={{
																																									height:
																																										"200px",
																																									width:
																																										"400px",
																																								}}
																																								controls
																																							>
																																								<source
																																									src={
																																										process
																																											.env
																																											.REACT_APP_AWS_S3 +
																																										apd.videourl
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
																																								paddingBottom:
																																									"5px",
																																							}}
																																						>
																																							<label className="f-fm fm-w3-s10 color-00">
																																								{
																																									apd.videodatetime.split(
																																										" "
																																									)[0]
																																								}
																																								&nbsp;
																																								{
																																									apd.videodatetime.split(
																																										" "
																																									)[1]
																																								}
																																							</label>
																																						</div>
																																					</div>
																																					<div className="row">
																																						<div
																																							className="col"
																																							style={{
																																								paddingBottom:
																																									"25px",
																																							}}
																																						>
																																							<label className="f-fm fm-w3-s10 color-00">
																																								Duration:
																																								{
																																									apd.videoduration
																																								}
																																							</label>
																																						</div>
																																					</div>
																																				</>
																																			)}

																																		<div className="row">
																																			<div
																																				className="col"
																																				style={{
																																					paddingBottom:
																																						"5px",
																																				}}
																																			>
																																				<label className="f-fm fm-w6-s12 color-AC">
																																					ALLERGY
																																				</label>
																																			</div>
																																		</div>
																																		<div className="row">
																																			<div
																																				className="col"
																																				style={{
																																					paddingBottom:
																																						"25px",
																																				}}
																																			>
																																				<label
																																					className="f-fm fm-w5-s14 color-00"
																																					style={{
																																						display:
																																							"flex",
																																						flexFlow:
																																							"wrap",
																																					}}
																																				>
																																					{apd
																																						.patient_details[0]
																																						.allergies ===
																																						"" ||
																																					apd
																																						.patient_details[0]
																																						.allergies ===
																																						" "
																																						? "N/A"
																																						: apd.patient_details[0].allergies
																																								.split(
																																									"|"
																																								)
																																								.map(
																																									(
																																										allergy
																																									) => {
																																										return (
																																											<span
																																												style={{
																																													backgroundColor:
																																														"#ACACAC36",
																																													margin:
																																														"5px",
																																													paddingTop:
																																														"3px",
																																													paddingBottom:
																																														"3px",
																																													paddingRight:
																																														"15px",
																																													paddingLeft:
																																														"15px",
																																													borderRadius:
																																														"5px",
																																												}}
																																											>
																																												{
																																													allergy
																																												}
																																											</span>
																																										);
																																									}
																																								)}
																																				</label>
																																			</div>
																																		</div>

																																		<div className="row">
																																			<div
																																				className="col"
																																				style={{
																																					paddingBottom:
																																						"5px",
																																				}}
																																			>
																																				<label className="f-fm fm-w6-s12 color-Ac">
																																					TREATMENT
																																					HISTORY
																																				</label>
																																			</div>
																																		</div>

																																		<>
																																			{" "}
																																			<div className="row">
																																				<div className="col-10">
																																					<label
																																						style={{
																																							width:
																																								"429px",
																																							height:
																																								"68px",
																																							background:
																																								"#acacac36",
																																							borderRadius:
																																								"5px 5px 0px 0px",
																																							float:
																																								"left",
																																							cursor:
																																								"pointer",
																																							display:
																																								"flex",
																																							alignItems:
																																								"center",
																																							justifyContent:
																																								duphistoryTempArray.length ===
																																								0
																																									? "center"
																																									: "left",
																																						}}
																																						onClick={() => {
																																							getPatients(
																																								apd.patientid,
																																								apd.appointmentdate,
																																								apd.doctorid
																																							);
																																							handleHistory();
																																						}}
																																					>
																																						<label
																																							className="f-fm fm-w5-s12 color-00"
																																							style={{
																																								fontWeight:
																																									"bold",
																																								paddingLeft:
																																									"30px",
																																							}}
																																						>
																																							{history1 ===
																																								false && (
																																								<label>
																																									previous
																																									history
																																								</label>
																																							)}
																																							{duphistoryTempArray.length ===
																																								0 &&
																																								history1 ===
																																									true && (
																																									<label>
																																										-
																																										No
																																										previous
																																										history
																																										-
																																									</label>
																																								)}
																																							{duphistoryTempArray.length !==
																																								0 &&
																																								history1 ===
																																									true && (
																																									<label>
																																										{
																																											duphistoryTempArray.length
																																										}
																																										&nbsp;
																																										treatment
																																										history
																																									</label>
																																								)}
																																						</label>
																																					</label>
																																				</div>
																																				<div
																																					className="col-1"
																																					style={{
																																						display:
																																							"flex",
																																						alignItems:
																																							"center",
																																						justifyContent:
																																							"left",
																																					}}
																																				>
																																					{history ? (
																																						<i class="fa fa-light fa-angle-up"></i>
																																					) : (
																																						<i class="fa fa-light fa-angle-down"></i>
																																					)}
																																				</div>
																																			</div>
																																			{history && (
																																				<div className="row">
																																					<div className="col">
																																						<label
																																							style={{
																																								width:
																																									"429px",
																																								height:
																																									"140px",
																																								background:
																																									"#acacac36",
																																								borderRadius:
																																									"0px 0px 5px 5px",
																																								overflowY:
																																									"auto",
																																							}}
																																						>
																																							{duphistoryTempArray.map(
																																								(
																																									w
																																								) => {
																																									return (
																																										<>
																																											<label
																																												className="f-fm fm-w5-s12 color-00"
																																												style={{
																																													paddingLeft:
																																														"30px",
																																												}}
																																											>
																																												{
																																													w.appointmentdate.split(
																																														"T"
																																													)[0]
																																												}
																																												&nbsp;&nbsp;
																																												{
																																													w.starttime
																																												}
																																												&nbsp;&nbsp;
																																												{
																																													w.endtime
																																												}
																																											</label>
																																											<br />
																																											<label
																																												className="f-fm fm-w6-s16 color-00"
																																												style={{
																																													paddingLeft:
																																														"30px",
																																													paddingBottom:
																																														"25px",
																																												}}
																																											>
																																												{w.treatmentid[0]
																																													.split(
																																														","
																																													)
																																													.map(
																																														(
																																															tid,
																																															l
																																														) => {
																																															return (
																																																<>
																																																	<label>
																																																		{getTreatmentName(
																																																			tid
																																																		)}
																																																	</label>
																																																	<label
																																																		className="col f-fm fm-w6-s14 color-00"
																																																		style={{
																																																			paddingLeft:
																																																				"20px",
																																																		}}
																																																	>
																																																		<img
																																																			src="images/injection.png"
																																																			alt="injection"
																																																		></img>
																																																		&nbsp;
																																																		<label className="f-fm fm-w6-s14 color-00">
																																																			x
																																																			{
																																																				w.finalsyringes.split(
																																																					","
																																																				)[
																																																					l
																																																				]
																																																			}
																																																		</label>
																																																	</label>
																																																	;
																																																	<br />
																																																</>
																																															);
																																														}
																																													)}
																																											</label>

																																											<br />
																																										</>
																																									);
																																								}
																																							)}

																																							<br />
																																						</label>
																																					</div>
																																				</div>
																																			)}
																																		</>

																																		<div className="row">
																																			<div className="col">
																																				<hr
																																					style={{
																																						color:
																																							"rgb(149 142 142)",
																																						backgroundColor:
																																							"#000000",
																																						height:
																																							"1px",
																																					}}
																																				/>
																																			</div>
																																		</div>

																																		<div className="row">
																																			{((apd.videourl ===
																																				"" &&
																																				apd.consultationtype ===
																																					"consultation") ||
																																				(apd.consultationtype ===
																																					"appointment" &&
																																					apd.isdoctorcheckedin ===
																																						"")) && (
																																				<div
																																					className="col-2"
																																					style={{
																																						width:
																																							"160px",
																																					}}
																																				>
																																					<>
																																						<DropDownContainer className="customdropmain">
																																							<DropDownHeader
																																								onClick={
																																									toggling2
																																								}
																																								className="form-select form-select-lg mb-1 select-round-custom-dropdown-small-reschedule"
																																								style={{
																																									paddingTop:
																																										"10px",
																																								}}
																																							>
																																								{selectedOption2 && (
																																									<p className="f-fm fm-w4-s14 color-7">
																																										{
																																											selectedOption2
																																										}
																																									</p>
																																								)}
																																								{!selectedOption2 && (
																																									<p className="f-fm fm-w4-s16 color-7">
																																										Reschedule
																																									</p>
																																								)}
																																							</DropDownHeader>

																																							{filterList.map(
																																								(
																																									k
																																								) =>
																																									isOpen2 && (
																																										<div
																																											style={{
																																												width:
																																													"223px",
																																												height:
																																													"103px",
																																												position:
																																													"absolute",
																																											}}
																																										>
																																											<DropDownListContainer className="customdropcontainer">
																																												<DropDownList className="customdroptwo-new">
																																													{filterList.map(
																																														(
																																															k
																																														) => (
																																															<ListItem
																																																className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
																																																onClick={() => {
																																																	onOptionClicked2(
																																																		k,
																																																		"5",
																																																		apd,
																																																		apd.consultationtype
																																																	);
																																																	setRescheduleObject(
																																																		apd
																																																	);
																																																}}
																																																value={
																																																	k
																																																}
																																															>
																																																<span
																																																	style={{
																																																		paddingLeft:
																																																			"10px",
																																																		paddingRight:
																																																			"10px",
																																																		paddingTop:
																																																			"1px",
																																																		paddingBottom:
																																																			"4px",
																																																	}}
																																																>
																																																	{
																																																		k
																																																	}
																																																</span>
																																															</ListItem>
																																														)
																																													)}
																																												</DropDownList>
																																											</DropDownListContainer>
																																										</div>
																																									)
																																							)}
																																						</DropDownContainer>
																																					</>
																																				</div>
																																			)}
																																		</div>
																																	</div>
																																</div>
																															</div>
																														</div>
																													</div>
																												</>
																											);
																										})}
																								</div>
																							</div>
																						</Popover.Body>
																					</Popover>
																				}
																			>
																				<button
																					className={
																						apd.consultationtype ===
																						"consultation"
																							? apd.videourl !== "" &&
																							  apd.isdoctorcheckedin === "" &&
																							  apd.iscompleted === "false"
																								? "videocompleted"
																								: apd.videourl == "" &&
																								  apd.isdoctorcheckedin ===
																										"" &&
																								  apd.iscompleted === "false"
																								? "video"
																								: "videocompleted"
																							: apd.iscompleted === "true"
																							? "treatmentcompleted"
																							: apd.iscompleted === "false" &&
																							  apd.isdoctorcheckedin === "true"
																							? "treatment"
																							: "treatmentparked"
																					}
																					disabled={
																						apd.consultationtype ===
																						"appointment"
																							? apd.aptdisable === "true"
																								? true
																								: false
																							: apd.cnsdisable === "true"
																							? true
																							: false
																					}
																					style={{
																						paddingBottom:
																							apd.consultationtype ===
																							"consultation"
																								? getPaddingBottom(
																										apd.cstarttime,
																										apd.cendtime
																								  ) -
																								  20 +
																								  "px"
																								: getPaddingBottom(
																										apd.starttime,
																										apd.endtime
																								  ) -
																								  20 +
																								  "px",
																						textAlign: "left",
																					}}
																				>
																					<span
																						style={{
																							float: "left",
																							width: "75%",
																							paddingTop: "2px",
																						}}
																						className="text-truncate"
																					>
																						{getvalue(e)}
																					</span>

																					<span
																						style={{
																							display: "inline-block",
																						}}
																					>
																						{apd.treatmentid[0].split(",")
																							.length > 1 && (
																							<span
																								class="badge rounded-pill badge-notification bg-dark"
																								style={{
																									display: "flex",
																									height: "16px",
																									width: "36px",
																								}}
																							>
																								<p
																									style={{
																										fontFamily: "Mulish",
																										margin: "auto",
																									}}
																									className="fm-w6-s12"
																								>
																									+{" "}
																									{apd.treatmentid[0].split(",")
																										.length - 1}
																								</p>
																							</span>
																						)}
																					</span>
																				</button>
																			</OverlayTrigger>
																		)}
																	</>
																</>
															);
														})}
												</h>
											) : (
												<>
													<div
														className="apatient"
														style={{
															backgroundColor: pickColor(
																apd.patient_details[0].memberid
															),
															color: pickColor1(
																apd.patient_details[0].memberid
															),
															border:
																"solid 1px " +
																pickColor1(apd.patient_details[0].memberid),
														}}
													>
														&nbsp;&nbsp;
														{getPatientImage(apd.patient_details[0], "16px")}
														&nbsp;&nbsp;{apd.patient_details[0].memberid}
													</div>
													<h
														style={{
															width: "100%",
															position: "absolute",
															zIndex: 100000,
															left: "-5px",
															top:
																apd.consultationtype === "consultation"
																	? apd.cstarttime.split(":")[1] + "px"
																	: apd.starttime.split(":")[1] + "px",
														}}
													>
														{apd.treatmentid.map((e, j) => {
															return (
																<>
																	<>
																		{apd.iscompleted === "true" ? (
																			<OverlayTrigger
																				onEnter={getEnter}
																				trigger="click"
																				rootClose
																				placement="auto"
																				overlay={
																					<Popover
																						id="popover-basic"
																						style={{
																							backgroundColor: "#FFFFFF",
																							width: "500px",
																							borderRadius: "10px",
																							maxWidth: "500px",
																						}}
																					>
																						<Popover.Body
																							style={{
																								padding: "0px",
																								paddingBottom: "10px",
																							}}
																						>
																							<div>
																								<div
																									style={{
																										backgroundColor: "#00C3A0",
																										height: "40px",
																										width: "500px",
																										borderRadius:
																											"10px 10px 0px 0px",
																										paddingLeft: "30px",
																									}}
																								>
																									<div>
																										<label
																											className="f-fm fm-w4-s12 color-7"
																											style={{
																												color: "#fff",
																												paddingTop: "10px",
																											}}
																										>
																											{
																												apd.appointmentdate.split(
																													"T"
																												)[0]
																											}
																											&nbsp;&nbsp;
																											{apd.starttime}
																											&nbsp;&nbsp;
																											{apd.endtime}
																										</label>
																										<span>
																											<label
																												className="f-fm fm-w7-s14"
																												style={{
																													paddingBottom: "25px",
																													paddingRight: "25px",
																													paddingLeft: "120px",
																													color: "#fff",
																													paddingTop: "10px",
																												}}
																											>
																												Treatment
																												Completed&nbsp;&nbsp;
																												<i class="fa fa-light fa-check"></i>
																											</label>
																										</span>
																									</div>
																								</div>

																								<div
																									className="row pt-4"
																									style={{
																										paddingLeft: "22px",
																									}}
																								>
																									<div className="col-2">
																										{getPatientImage(
																											apd.patient_details[0],
																											"56px"
																										)}
																									</div>
																									<div className="col-8">
																										<div
																											className="row"
																											style={{
																												marginLeft: "-30px",
																											}}
																										>
																											<div className="col">
																												<label className="f-fm fm-w7-s24 color-00">
																													{
																														apd
																															.patient_details[0]
																															.firstName
																													}
																												</label>
																											</div>
																										</div>
																										<div
																											className="row"
																											style={{
																												marginLeft: "-30px",
																											}}
																										>
																											<div className="col">
																												{apd.patient_details[0]
																													.gender === "Male" ? (
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
																												&nbsp;&nbsp;
																												<label className="f-fm fm-w6-s14 color-00">
																													{calculate_age(
																														apd.patient_details[0].dob.split(
																															"T"
																														)[0]
																													)}
																												</label>
																											</div>
																										</div>
																									</div>

																									<div className="row">
																										<Tabs
																											defaultActiveKey="Treatment"
																											id="profiletab"
																											className="list-tab"
																										>
																											<Tab
																												eventKey="Treatment"
																												title="Treatment"
																											>
																												<div className="row">
																													<div className="col-3 f-fm fm-w7-s14">
																														Treatment Time
																													</div>
																													<div
																														className="col-4 f-fm fm-w5-s14"
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
																															{apd.starttime}
																														</span>
																													</div>
																													<div
																														className="col-5 f-fm fm-w5-s14"
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
																															{apd.endtime}
																														</span>
																													</div>
																												</div>
																												<div className="row pt-5">
																													<div className="col-3 f-fm fm-w7-s14">
																														Syringes
																													</div>
																													<div className="col-9">
																														<div className="row">
																															<div
																																className="col-12"
																																style={{
																																	color:
																																		"#ACACAC",
																																}}
																															>
																																BEFORE
																															</div>
																															<div className="col-12 pt-1">
																																{apd.starttreatmentsyringes ===
																																""
																																	? "No images"
																																	: apd.starttreatmentsyringes
																																			.split(
																																				","
																																			)
																																			.map(
																																				(
																																					start
																																				) => {
																																					return (
																																						<img
																																							key={
																																								start
																																							}
																																							className="p-2"
																																							alt="before"
																																							width="100"
																																							height="100"
																																							src={
																																								process
																																									.env
																																									.REACT_APP_AWS_S3 +
																																								start
																																							}
																																						></img>
																																					);
																																				}
																																			)}
																															</div>
																															<div
																																className="col-12 pt-4"
																																style={{
																																	color:
																																		"#ACACAC",
																																}}
																															>
																																AFTER
																															</div>
																															<div className="col-12">
																																{apd.endtreatmentsyringes ===
																																""
																																	? "No images"
																																	: apd.endtreatmentsyringes
																																			.split(
																																				","
																																			)
																																			.map(
																																				(
																																					start
																																				) => {
																																					return (
																																						<img
																																							key={
																																								start
																																							}
																																							className="p-2"
																																							alt="before"
																																							width="100"
																																							height="100"
																																							src={
																																								process
																																									.env
																																									.REACT_APP_AWS_S3 +
																																								start
																																							}
																																						></img>
																																					);
																																				}
																																			)}
																															</div>
																														</div>
																													</div>
																												</div>
																												<div className="row pt-5">
																													<div className="col-3 f-fm fm-w7-s14">
																														Medical Photos
																													</div>
																													<div className="col-9">
																														<div className="row">
																															<div
																																className="col-12"
																																style={{
																																	color:
																																		"#ACACAC",
																																}}
																															>
																																BEFORE
																															</div>
																															<div className="col-12 pt-1">
																																{apd.startmedicalphotos ===
																																""
																																	? "No images"
																																	: apd.startmedicalphotos
																																			.split(
																																				","
																																			)
																																			.map(
																																				(
																																					start
																																				) => {
																																					return (
																																						<img
																																							key={
																																								start
																																							}
																																							className="p-2"
																																							alt="before"
																																							width="100"
																																							height="100"
																																							src={
																																								process
																																									.env
																																									.REACT_APP_AWS_S3 +
																																								start
																																							}
																																						></img>
																																					);
																																				}
																																			)}
																															</div>
																															<div
																																className="col-12 pt-4"
																																style={{
																																	color:
																																		"#ACACAC",
																																}}
																															>
																																AFTER
																															</div>
																															<div className="col-12">
																																{apd.endmedicalphotos ===
																																""
																																	? "No images"
																																	: apd.endmedicalphotos
																																			.split(
																																				","
																																			)
																																			.map(
																																				(
																																					start
																																				) => {
																																					return (
																																						<img
																																							key={
																																								start
																																							}
																																							className="p-2"
																																							alt="before"
																																							width="100"
																																							height="100"
																																							src={
																																								process
																																									.env
																																									.REACT_APP_AWS_S3 +
																																								start
																																							}
																																						></img>
																																					);
																																				}
																																			)}
																															</div>
																														</div>
																													</div>
																												</div>
																												<div className="row pt-5">
																													<div className="col-3 f-fm fm-w7-s14">
																														Others
																													</div>
																													<div className="col-9">
																														<div className="row">
																															<div
																																className="col-12 pb-2"
																																style={{
																																	color:
																																		"#ACACAC",
																																}}
																															>
																																ADDITIONAL
																																SYRINGES
																															</div>
																															<div
																																className="col-8"
																																style={{
																																	backgroundColor:
																																		"#F4F4F4",
																																	borderRadius:
																																		"10px",
																																	padding:
																																		"8px",
																																	color:
																																		"#AF805E",
																																}}
																															>
																																{getvalue(e)}
																																<span
																																	style={{
																																		backgroundColor:
																																			"#000",
																																		color:
																																			"#fff",
																																		paddingLeft:
																																			"10px",
																																		paddingRight:
																																			"10px",
																																		borderRadius:
																																			"20px",
																																		textAlign:
																																			"end",
																																	}}
																																>
																																	+
																																	{parseInt(
																																		apd.finalsyringes
																																	) -
																																		parseInt(
																																			apd.initialsyringes
																																		)}
																																</span>
																															</div>
																														</div>
																													</div>
																												</div>
																											</Tab>
																											<Tab
																												eventKey="Appointment Details"
																												title="Appointment Details"
																												onClick={(e) => {
																													temp();
																												}}
																												tabIndex="1"
																											>
																												<>
																													{getTimeAndLocationLabel()}
																													<div className="row">
																														{getConsultationLabel()}
																														<div
																															className="col"
																															style={{
																																paddingBottom:
																																	"3px",
																															}}
																														>
																															<label
																																style={{
																																	width: "14px",
																																	height:
																																		"14px",
																																}}
																															>
																																<img
																																	style={{
																																		width:
																																			"14px",
																																		height:
																																			"14px",
																																		Color:
																																			"#777777",
																																	}}
																																	src="images/Group.png"
																																	alt="time"
																																></img>
																															</label>
																															&nbsp;&nbsp;
																															<label className="f-fm fm-w4-s12 color-7">
																																{
																																	apd.consultationdate.split(
																																		"T"
																																	)[0]
																																}
																																&nbsp;&nbsp;
																																{apd.cstarttime}
																																&nbsp;&nbsp;
																																{apd.cendtime}
																															</label>
																														</div>
																													</div>

																													<div className="row">
																														{getAppointmentLabel()}
																														<div
																															className="col"
																															style={{
																																paddingBottom:
																																	"3px",
																															}}
																														>
																															<label
																																style={{
																																	width: "14px",
																																	height:
																																		"14px",
																																}}
																															>
																																<img
																																	style={{
																																		width:
																																			"14px",
																																		height:
																																			"14px",
																																		Color:
																																			"#777777",
																																	}}
																																	src="images/Group.png"
																																	alt="time"
																																></img>
																															</label>
																															&nbsp;&nbsp;
																															<label className="f-fm fm-w4-s12 color-7">
																																{
																																	apd.appointmentdate.split(
																																		"T"
																																	)[0]
																																}
																																&nbsp;&nbsp;
																																{apd.starttime}
																																&nbsp;&nbsp;
																																{apd.endtime}
																															</label>
																														</div>
																													</div>
																													<div className="row">
																														<div
																															className="col"
																															style={{
																																paddingBottom:
																																	"25px",
																															}}
																														>
																															<label>
																																<img
																																	style={{
																																		width:
																																			"14px",
																																		height:
																																			"14px",
																																		Color:
																																			"#777777",
																																	}}
																																	src="images/maps-and-flags.png"
																																	alt="map"
																																></img>
																															</label>
																															&nbsp;&nbsp;
																															<label className="f-fm fm-w4-s12 color-7">
																																{
																																	apd
																																		.patient_details[0]
																																		.address[0]
																																		.line1
																																}
																																&nbsp;
																																{
																																	apd
																																		.patient_details[0]
																																		.address[0]
																																		.line2
																																}
																																&nbsp;
																																{
																																	apd
																																		.patient_details[0]
																																		.address[0]
																																		.towncity
																																}
																																&nbsp;
																																{
																																	apd
																																		.patient_details[0]
																																		.address[0]
																																		.country
																																}
																																&nbsp;
																																{
																																	apd
																																		.patient_details[0]
																																		.address[0]
																																		.postcode
																																}
																															</label>
																														</div>
																													</div>

																													<div className="row">
																														<div
																															className="col"
																															style={{
																																paddingBottom:
																																	"5px",
																															}}
																														>
																															<label className="f-fm fm-w6-s12 color-AC">
																																TREATMENT
																															</label>
																														</div>
																													</div>

																													<div className="row">
																														<div
																															className="col"
																															style={{
																																paddingBottom:
																																	"3px",
																															}}
																														>
																															<label className="f-fm fm-w6-s16 color-00 treat">
																																{getTreatmentName(
																																	e
																																)}
																															</label>
																														</div>
																													</div>
																													<div className="row">
																														<div
																															className="col"
																															style={{
																																paddingBottom:
																																	"25px",
																															}}
																														>
																															<img
																																src="images/injection.png"
																																alt="injection"
																															></img>
																															&nbsp;
																															<label className="f-fm fm-w6-s14 color-00">
																																x
																																{
																																	apd.finalsyringes
																																}
																															</label>
																															&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																															<label
																																className="f-fm fm-w7-s14 "
																																style={{
																																	color:
																																		"#AF805E",
																																}}
																															>
																																$
																																{parseInt(
																																	apd.finalsyringes
																																) * getPrice(e)}
																															</label>
																														</div>
																													</div>

																													<div className="row">
																														<div
																															className="col"
																															style={{
																																paddingBottom:
																																	"5px",
																															}}
																														>
																															<label className="f-fm fm-w6-s12 color-AC">
																																CONSULTATION
																															</label>
																														</div>
																													</div>
																													<div className="row">
																														<div
																															className="col-6"
																															style={{
																																paddingBottom:
																																	"3px",
																															}}
																														>
																															<video
																																style={{
																																	height:
																																		"200px",
																																	width:
																																		"400px",
																																}}
																																controls
																															>
																																<source
																																	src={
																																		process.env
																																			.REACT_APP_AWS_S3 +
																																		apd.videourl
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
																																paddingBottom:
																																	"5px",
																															}}
																														>
																															<label className="f-fm fm-w3-s10 color-00">
																																{
																																	apd.videodatetime.split(
																																		" "
																																	)[0]
																																}
																																&nbsp;
																																{
																																	apd.videodatetime.split(
																																		" "
																																	)[1]
																																}
																															</label>
																														</div>
																													</div>
																													<div className="row">
																														<div
																															className="col"
																															style={{
																																paddingBottom:
																																	"25px",
																															}}
																														>
																															<label className="f-fm fm-w3-s10 color-00">
																																Duration:
																																{
																																	apd.videoduration
																																}
																															</label>
																														</div>
																													</div>

																													<div className="row">
																														<div
																															className="col"
																															style={{
																																paddingBottom:
																																	"5px",
																															}}
																														>
																															<label className="f-fm fm-w6-s12 color-AC">
																																ALLERGY
																															</label>
																														</div>
																													</div>
																													<div className="row">
																														<div
																															className="col"
																															style={{
																																paddingBottom:
																																	"25px",
																															}}
																														>
																															<label
																																className="f-fm fm-w5-s14 color-00"
																																style={{
																																	display:
																																		"flex",
																																	flexFlow:
																																		"wrap",
																																}}
																															>
																																{apd
																																	.patient_details[0]
																																	.allergies ===
																																	"" ||
																																apd
																																	.patient_details[0]
																																	.allergies ===
																																	" "
																																	? "N/A"
																																	: apd.patient_details[0].allergies
																																			.split(
																																				"|"
																																			)
																																			.map(
																																				(
																																					allergy
																																				) => {
																																					return (
																																						<span
																																							style={{
																																								backgroundColor:
																																									"#ACACAC36",
																																								margin:
																																									"5px",
																																								paddingTop:
																																									"3px",
																																								paddingBottom:
																																									"3px",
																																								paddingRight:
																																									"15px",
																																								paddingLeft:
																																									"15px",
																																								borderRadius:
																																									"5px",
																																							}}
																																						>
																																							{
																																								allergy
																																							}
																																						</span>
																																					);
																																				}
																																			)}
																															</label>
																														</div>
																													</div>
																													<div className="row">
																														<div
																															className="col"
																															style={{
																																paddingBottom:
																																	"5px",
																															}}
																														>
																															<label className="f-fm fm-w6-s12 color-Ac">
																																TREATMENT
																																HISTORY
																															</label>
																														</div>
																													</div>
																													<div className="row">
																														<div className="col-10">
																															<label
																																style={{
																																	width:
																																		"429px",
																																	height:
																																		"68px",
																																	background:
																																		"#acacac36",
																																	borderRadius:
																																		"5px 5px 0px 0px",
																																	float: "left",
																																	cursor:
																																		"pointer",
																																	display:
																																		"flex",
																																	alignItems:
																																		"center",
																																	justifyContent:
																																		duphistoryTempArray.length ===
																																		0
																																			? "center"
																																			: "left",
																																}}
																																onClick={() => {
																																	getPatients(
																																		apd.patientid,
																																		apd.appointmentdate,
																																		apd.doctorid
																																	);

																																	handleHistory();
																																}}
																															>
																																<label
																																	className="f-fm fm-w5-s12 color-00"
																																	style={{
																																		fontWeight:
																																			"bold",
																																		paddingLeft:
																																			"30px",
																																	}}
																																>
																																	{history1 ===
																																		false && (
																																		<label>
																																			previous
																																			history
																																		</label>
																																	)}
																																	{duphistoryTempArray.length ===
																																		0 &&
																																		history1 ===
																																			true && (
																																			<label>
																																				- No
																																				previous
																																				history
																																				-
																																			</label>
																																		)}
																																	{duphistoryTempArray.length !==
																																		0 &&
																																		history1 ===
																																			true && (
																																			<label>
																																				{
																																					duphistoryTempArray.length
																																				}
																																				&nbsp;
																																				treatment
																																				history
																																			</label>
																																		)}
																																</label>
																															</label>
																														</div>
																														<div
																															className="col-1"
																															style={{
																																display: "flex",
																																alignItems:
																																	"center",
																																justifyContent:
																																	"left",
																															}}
																														>
																															{history ? (
																																<i class="fa fa-light fa-angle-up"></i>
																															) : (
																																<i class="fa fa-light fa-angle-down"></i>
																															)}
																														</div>
																													</div>
																													{history && (
																														<div className="row">
																															<div className="col">
																																<label
																																	style={{
																																		width:
																																			"429px",
																																		height:
																																			"140px",
																																		background:
																																			"#acacac36",
																																		borderRadius:
																																			"0px 0px 5px 5px",
																																		overflowY:
																																			"auto",
																																	}}
																																>
																																	{duphistoryTempArray.map(
																																		(w, k) => {
																																			return (
																																				<>
																																					<label
																																						className="f-fm fm-w5-s12 color-00"
																																						style={{
																																							paddingLeft:
																																								"30px",
																																						}}
																																					>
																																						{
																																							w.appointmentdate.split(
																																								"T"
																																							)[0]
																																						}
																																						&nbsp;&nbsp;
																																						{
																																							w.starttime
																																						}
																																						&nbsp;&nbsp;
																																						{
																																							w.endtime
																																						}
																																					</label>
																																					<br />
																																					<label
																																						className="f-fm fm-w6-s16 color-00"
																																						style={{
																																							paddingLeft:
																																								"30px",
																																							paddingBottom:
																																								"25px",
																																						}}
																																					>
																																						{w.treatmentid[0]
																																							.split(
																																								","
																																							)
																																							.map(
																																								(
																																									tid,
																																									l
																																								) => {
																																									return (
																																										<>
																																											<label>
																																												{getTreatmentName(
																																													tid
																																												)}
																																											</label>
																																											<label
																																												className="col f-fm fm-w6-s14 color-00"
																																												style={{
																																													paddingLeft:
																																														"20px",
																																												}}
																																											>
																																												<img
																																													src="images/injection.png"
																																													alt="injection"
																																												></img>
																																												&nbsp;
																																												<label className="f-fm fm-w6-s14 color-00">
																																													x
																																													{
																																														w.finalsyringes.split(
																																															","
																																														)[
																																															l
																																														]
																																													}
																																												</label>
																																											</label>
																																											;
																																											<br />
																																										</>
																																									);
																																								}
																																							)}
																																					</label>

																																					<br />
																																				</>
																																			);
																																		}
																																	)}

																																	<br />
																																</label>
																															</div>
																														</div>
																													)}
																												</>
																											</Tab>
																										</Tabs>
																									</div>
																								</div>
																							</div>
																						</Popover.Body>
																					</Popover>
																				}
																			>
																				<button
																					className={
																						apd.consultationtype ===
																						"consultation"
																							? apd.videourl !== "" &&
																							  apd.isdoctorcheckedin === "" &&
																							  apd.iscompleted === "false"
																								? "videocompleted"
																								: apd.videourl == "" &&
																								  apd.isdoctorcheckedin ===
																										"" &&
																								  apd.iscompleted === "false"
																								? "video"
																								: "videocompleted"
																							: apd.iscompleted === "true"
																							? "treatmentcompleted"
																							: apd.iscompleted === "false" &&
																							  apd.isdoctorcheckedin === "true"
																							? "treatment"
																							: "treatmentparked"
																					}
																					disabled={
																						apd.consultationtype ===
																						"appointment"
																							? apd.aptdisable === "true"
																								? true
																								: false
																							: apd.cnsdisable === "true"
																							? true
																							: false
																					}
																					style={{
																						paddingBottom:
																							apd.consultationtype ===
																							"consultation"
																								? getPaddingBottom(
																										apd.cstarttime,
																										apd.cendtime
																								  ) -
																								  20 +
																								  "px"
																								: getPaddingBottom(
																										apd.starttime,
																										apd.endtime
																								  ) -
																								  20 +
																								  "px",
																						textAlign: "left",
																						border: "none",
																					}}
																				>
																					<span className="text-truncate">
																						{getvalue(e)}
																					</span>
																				</button>
																			</OverlayTrigger>
																		) : (
																			<OverlayTrigger
																				onEnter={getEnter}
																				trigger="click"
																				rootClose
																				placement="auto"
																				overlay={
																					<Popover
																						id="popover-basic"
																						style={{
																							backgroundColor: "#FFFFFF",
																							width: "500px",
																							borderRadius: "10px",
																							maxWidth: "500px",
																						}}
																					>
																						<Popover.Body
																							style={{
																								padding: "0px",
																							}}
																						>
																							<div>
																								{apd.iscompleted === "false" &&
																									apd.isdoctorcheckedin ===
																										"true" &&
																									apd.isautoacceptbooking && (
																										<div className="row">
																											<div className="col">
																												<label
																													className="f-fm fm-w7-s14 color-00C3A0"
																													style={{
																														paddingBottom:
																															"25px",
																														paddingRight:
																															"25px",
																														paddingTop: "15px",
																														float: "right",
																													}}
																												>
																													Auto-accepted&nbsp;&nbsp;
																													<img
																														src="images/rightmark.png"
																														alt="rightmark"
																													></img>
																												</label>
																											</div>
																										</div>
																									)}

																								{apd.videourl !== "" &&
																									apd.isdoctorcheckedin ===
																										"" &&
																									apd.iscompleted === "false" &&
																									apd.consultationtype ===
																										"consultation" && (
																										<div
																											style={{
																												backgroundColor:
																													"#446BF7",
																												height: "40px",
																												width: "500px",
																												borderRadius:
																													"10px 10px 0px 0px",
																												paddingLeft: "30px",
																											}}
																										>
																											<div>
																												<label
																													className="f-fm fm-w4-s12 color-7"
																													style={{
																														color: "#fff",
																														paddingTop: "10px",
																													}}
																												>
																													{
																														apd.consultationdate.split(
																															"T"
																														)[0]
																													}
																													&nbsp;&nbsp;
																													{apd.cstarttime}
																													&nbsp;&nbsp;
																													{apd.cendtime}
																												</label>
																												<span>
																													<label
																														className="f-fm fm-w7-s14"
																														style={{
																															paddingLeft:
																																"120px",
																															color: "#fff",
																														}}
																													>
																														Consultation
																														Completed&nbsp;&nbsp;
																														<i class="fa fa-light fa-check"></i>
																													</label>
																												</span>
																											</div>
																										</div>
																									)}
																								{apd.videourl !== "" &&
																									apd.isdoctorcheckedin ===
																										"" &&
																									apd.iscompleted === "false" &&
																									apd.consultationtype ===
																										"appointment" && (
																										<div
																											style={{
																												backgroundColor:
																													"#af805e",
																												height: "40px",
																												width: "500px",
																												borderRadius:
																													"10px 10px 0px 0px",
																												paddingLeft: "30px",
																											}}
																										>
																											<div>
																												<label
																													className="f-fm fm-w4-s12 color-7"
																													style={{
																														color: "#fff",
																														paddingTop: "10px",
																													}}
																												>
																													{
																														apd.consultationdate.split(
																															"T"
																														)[0]
																													}
																													&nbsp;&nbsp;
																													{apd.cstarttime}
																													&nbsp;&nbsp;
																													{apd.cendtime}
																												</label>
																												<span>
																													<label
																														className="f-fm fm-w7-s14"
																														style={{
																															paddingRight:
																																"25px",
																															paddingLeft:
																																"120px",
																															color: "#fff",
																															paddingTop:
																																"10px",
																															paddingBottom:
																																"25px",
																														}}
																													>
																														Appointment
																														Pending&nbsp;&nbsp;
																													</label>
																												</span>
																											</div>
																										</div>
																									)}
																								{apd.videourl == "" &&
																									apd.isdoctorcheckedin ===
																										"" &&
																									apd.iscompleted === "false" &&
																									apd.isautoacceptconsulting && (
																										<div className="row">
																											<div className="col">
																												<label
																													className="f-fm fm-w7-s14 color-blue"
																													style={{
																														paddingBottom:
																															"25px",
																														paddingRight:
																															"25px",
																														paddingTop: "15px",
																														float: "right",
																														color: "#446bf7",
																													}}
																												>
																													Consultation
																													accepted&nbsp;&nbsp;
																													<i class="fa fa-light fa-check"></i>
																												</label>
																											</div>
																										</div>
																									)}

																								<div
																									className="row pt-4"
																									style={{
																										paddingLeft: "22px",
																									}}
																								>
																									<div className="col-2">
																										{getPatientImage(
																											apd.patient_details[0],
																											"56px"
																										)}
																									</div>
																									<div className="col-8">
																										<div
																											className="row"
																											style={{
																												marginLeft: "-30px",
																											}}
																										>
																											<div className="col">
																												<label className="f-fm fm-w7-s24 color-00">
																													{
																														apd
																															.patient_details[0]
																															.firstName
																													}
																												</label>
																											</div>
																										</div>
																										<div
																											className="row"
																											style={{
																												marginLeft: "-30px",
																											}}
																										>
																											<div className="col">
																												{apd.patient_details[0]
																													.gender === "Male" ? (
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
																												&nbsp;&nbsp;
																												<label className="f-fm fm-w6-s14 color-00">
																													{calculate_age(
																														apd.patient_details[0].dob.split(
																															"T"
																														)[0]
																													)}
																												</label>
																											</div>
																										</div>
																									</div>

																									<div
																										className="col-2"
																										style={{
																											marginLeft: "-22px",
																										}}
																									>
																										<label
																											style={{
																												border:
																													"1px solid #D6D6D6",
																												width: "45px",
																												borderRadius: "22px",
																												height: "45px",
																												float: "right",
																											}}
																										>
																											<img
																												src="images/Vector.png"
																												alt="Vector"
																												style={{
																													padding: "11px",
																												}}
																											></img>
																										</label>
																									</div>

																									<div className="row">
																										<div className="col">
																											<hr
																												style={{
																													color:
																														"rgb(149 142 142)",
																													backgroundColor:
																														"#000000",
																													height: "1px",
																												}}
																											/>
																										</div>
																									</div>

																									{getTimeAndLocationLabel()}

																									<div className="row">
																										{getConsultationLabel()}
																										<div
																											className="col"
																											style={{
																												paddingBottom: "3px",
																											}}
																										>
																											<label
																												style={{
																													width: "14px",
																													height: "14px",
																												}}
																											>
																												<img
																													style={{
																														width: "14px",
																														height: "14px",
																														Color: "#777777",
																													}}
																													src="images/Group.png"
																													alt="time"
																												></img>
																											</label>
																											&nbsp;&nbsp;
																											<label className="f-fm fm-w4-s12 color-7">
																												{
																													apd.consultationdate.split(
																														"T"
																													)[0]
																												}
																												&nbsp;&nbsp;
																												{apd.cstarttime}
																												&nbsp;&nbsp;
																												{apd.cendtime}
																											</label>
																										</div>
																									</div>

																									<div className="row">
																										{getAppointmentLabel()}
																										<div
																											className="col"
																											style={{
																												paddingBottom: "3px",
																											}}
																										>
																											<label
																												style={{
																													width: "14px",
																													height: "14px",
																												}}
																											>
																												<img
																													style={{
																														width: "14px",
																														height: "14px",
																														Color: "#777777",
																													}}
																													src="images/Group.png"
																													alt="time"
																												></img>
																											</label>
																											&nbsp;&nbsp;
																											<label className="f-fm fm-w4-s12 color-7">
																												{
																													apd.appointmentdate.split(
																														"T"
																													)[0]
																												}
																												&nbsp;&nbsp;
																												{apd.starttime}
																												&nbsp;&nbsp;
																												{apd.endtime}
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
																											<label>
																												<img
																													style={{
																														width: "14px",
																														height: "14px",
																														Color: "#777777",
																													}}
																													src="images/maps-and-flags.png"
																													alt="map"
																												></img>
																											</label>
																											&nbsp;&nbsp;
																											<label className="f-fm fm-w4-s12 color-7">
																												{
																													apd.patient_details[0]
																														.address[0].line1
																												}
																												&nbsp;
																												{
																													apd.patient_details[0]
																														.address[0].line2
																												}
																												&nbsp;
																												{
																													apd.patient_details[0]
																														.address[0].towncity
																												}
																												&nbsp;
																												{
																													apd.patient_details[0]
																														.address[0].country
																												}
																												&nbsp;
																												{
																													apd.patient_details[0]
																														.address[0].postcode
																												}
																											</label>
																										</div>
																									</div>

																									<div className="row">
																										<div
																											className="col"
																											style={{
																												paddingBottom: "5px",
																											}}
																										>
																											<label className="f-fm fm-w6-s12 color-AC">
																												TREATMENT
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
																											<label className="f-fm fm-w6-s16 color-00 treat">
																												{getTreatmentName(e)}
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
																											<img
																												src="images/injection.png"
																												alt="injection"
																											></img>
																											&nbsp;
																											<label className="f-fm fm-w6-s14 color-00">
																												x{apd.finalsyringes}
																											</label>
																											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																											<label
																												className="f-fm fm-w7-s14 "
																												style={{
																													color: "#AF805E",
																												}}
																											>
																												$
																												{parseInt(
																													apd.finalsyringes
																												) * getPrice(e)}
																											</label>
																										</div>
																									</div>

																									{apd.videourl !== "" &&
																										apd.isdoctorcheckedin ===
																											"" &&
																										apd.iscompleted ===
																											"false" && (
																											<>
																												{" "}
																												<div className="row">
																													<div
																														className="col"
																														style={{
																															paddingBottom:
																																"5px",
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
																															paddingBottom:
																																"3px",
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
																																	process.env
																																		.REACT_APP_AWS_S3 +
																																	apd.videourl
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
																															paddingBottom:
																																"5px",
																														}}
																													>
																														<label className="f-fm fm-w3-s10 color-00">
																															{
																																apd.videodatetime.split(
																																	" "
																																)[0]
																															}
																															&nbsp;
																															{
																																apd.videodatetime.split(
																																	" "
																																)[1]
																															}
																														</label>
																													</div>
																												</div>
																												<div className="row">
																													<div
																														className="col"
																														style={{
																															paddingBottom:
																																"25px",
																														}}
																													>
																														<label className="f-fm fm-w3-s10 color-00">
																															Duration:
																															{
																																apd.videoduration
																															}
																														</label>
																													</div>
																												</div>
																											</>
																										)}

																									{apd.iscompleted ===
																										"false" &&
																										apd.isdoctorcheckedin ===
																											"true" && (
																											<>
																												{" "}
																												<div className="row">
																													<div
																														className="col"
																														style={{
																															paddingBottom:
																																"5px",
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
																															paddingBottom:
																																"3px",
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
																																	process.env
																																		.REACT_APP_AWS_S3 +
																																	apd.videourl
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
																															paddingBottom:
																																"5px",
																														}}
																													>
																														<label className="f-fm fm-w3-s10 color-00">
																															{
																																apd.videodatetime.split(
																																	" "
																																)[0]
																															}
																															&nbsp;
																															{
																																apd.videodatetime.split(
																																	" "
																																)[1]
																															}
																														</label>
																													</div>
																												</div>
																												<div className="row">
																													<div
																														className="col"
																														style={{
																															paddingBottom:
																																"25px",
																														}}
																													>
																														<label className="f-fm fm-w3-s10 color-00">
																															Duration:
																															{
																																apd.videoduration
																															}
																														</label>
																													</div>
																												</div>
																											</>
																										)}

																									<div className="row">
																										<div
																											className="col"
																											style={{
																												paddingBottom: "5px",
																											}}
																										>
																											<label className="f-fm fm-w6-s12 color-AC">
																												ALLERGY
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
																											<label
																												className="f-fm fm-w5-s14 color-00"
																												style={{
																													display: "flex",
																													flexFlow: "wrap",
																												}}
																											>
																												{apd.patient_details[0]
																													.allergies === "" ||
																												apd.patient_details[0]
																													.allergies === " "
																													? "N/A"
																													: apd.patient_details[0].allergies
																															.split("|")
																															.map(
																																(allergy) => {
																																	return (
																																		<span
																																			style={{
																																				backgroundColor:
																																					"#ACACAC36",
																																				margin:
																																					"5px",
																																				paddingTop:
																																					"3px",
																																				paddingBottom:
																																					"3px",
																																				paddingRight:
																																					"15px",
																																				paddingLeft:
																																					"15px",
																																				borderRadius:
																																					"5px",
																																			}}
																																		>
																																			{allergy}
																																		</span>
																																	);
																																}
																															)}
																											</label>
																										</div>
																									</div>

																									<div className="row">
																										<div
																											className="col"
																											style={{
																												paddingBottom: "5px",
																											}}
																										>
																											<label className="f-fm fm-w6-s12 color-Ac">
																												TREATMENT HISTORY
																											</label>
																										</div>
																									</div>

																									<>
																										{" "}
																										<div className="row">
																											<div className="col-10">
																												<label
																													style={{
																														width: "429px",
																														height: "68px",
																														background:
																															"#acacac36",
																														borderRadius:
																															"5px 5px 0px 0px",
																														float: "left",
																														cursor: "pointer",
																														display: "flex",
																														alignItems:
																															"center",
																														justifyContent:
																															duphistoryTempArray.length ===
																															0
																																? "center"
																																: "left",
																													}}
																													onClick={() => {
																														getPatients(
																															apd.patientid,
																															apd.appointmentdate,
																															apd.doctorid
																														);
																														handleHistory();
																													}}
																												>
																													<label
																														className="f-fm fm-w5-s12 color-00"
																														style={{
																															fontWeight:
																																"bold",
																															paddingLeft:
																																"30px",
																														}}
																													>
																														{history1 ===
																															false && (
																															<label>
																																previous history
																															</label>
																														)}
																														{duphistoryTempArray.length ===
																															0 &&
																															history1 ===
																																true && (
																																<label>
																																	- No previous
																																	history -
																																</label>
																															)}
																														{duphistoryTempArray.length !==
																															0 &&
																															history1 ===
																																true && (
																																<label>
																																	{
																																		duphistoryTempArray.length
																																	}
																																	&nbsp;
																																	treatment
																																	history
																																</label>
																															)}
																													</label>
																												</label>
																											</div>
																											<div
																												className="col-1"
																												style={{
																													display: "flex",
																													alignItems: "center",
																													justifyContent:
																														"left",
																												}}
																											>
																												{history ? (
																													<i class="fa fa-light fa-angle-up"></i>
																												) : (
																													<i class="fa fa-light fa-angle-down"></i>
																												)}
																											</div>
																										</div>
																										{history && (
																											<div className="row">
																												<div className="col">
																													<label
																														style={{
																															width: "429px",
																															height: "140px",
																															background:
																																"#acacac36",
																															borderRadius:
																																"0px 0px 5px 5px",
																															overflowY: "auto",
																														}}
																													>
																														{duphistoryTempArray.map(
																															(w, k) => {
																																return (
																																	<>
																																		<label
																																			className="f-fm fm-w5-s12 color-00"
																																			style={{
																																				paddingLeft:
																																					"30px",
																																			}}
																																		>
																																			{
																																				w.appointmentdate.split(
																																					"T"
																																				)[0]
																																			}
																																			&nbsp;&nbsp;
																																			{
																																				w.starttime
																																			}
																																			&nbsp;&nbsp;
																																			{
																																				w.endtime
																																			}
																																		</label>
																																		<br />
																																		<label
																																			className="f-fm fm-w6-s16 color-00"
																																			style={{
																																				paddingLeft:
																																					"30px",
																																				paddingBottom:
																																					"25px",
																																			}}
																																		>
																																			{w.treatmentid[0]
																																				.split(
																																					","
																																				)
																																				.map(
																																					(
																																						tid,
																																						l
																																					) => {
																																						return (
																																							<>
																																								<label>
																																									{getTreatmentName(
																																										tid
																																									)}
																																								</label>
																																								<label
																																									className="col f-fm fm-w6-s14 color-00"
																																									style={{
																																										paddingLeft:
																																											"20px",
																																									}}
																																								>
																																									<img
																																										src="images/injection.png"
																																										alt="injection"
																																									></img>
																																									&nbsp;
																																									<label className="f-fm fm-w6-s14 color-00">
																																										x
																																										{
																																											w.finalsyringes.split(
																																												","
																																											)[
																																												l
																																											]
																																										}
																																									</label>
																																								</label>
																																								;
																																								<br />
																																							</>
																																						);
																																					}
																																				)}
																																		</label>

																																		<br />
																																	</>
																																);
																															}
																														)}

																														<br />
																													</label>
																												</div>
																											</div>
																										)}
																									</>

																									<div className="row">
																										<div className="col">
																											<hr
																												style={{
																													color:
																														"rgb(149 142 142)",
																													backgroundColor:
																														"#000000",
																													height: "1px",
																												}}
																											/>
																										</div>
																									</div>

																									<div className="row">
																										{((apd.videourl === "" &&
																											apd.consultationtype ===
																												"consultation") ||
																											(apd.consultationtype ===
																												"appointment" &&
																												apd.isdoctorcheckedin ===
																													"")) && (
																											<div
																												className="col-2"
																												style={{
																													width: "160px",
																												}}
																											>
																												<>
																													<DropDownContainer className="customdropmain">
																														<DropDownHeader
																															onClick={
																																toggling2
																															}
																															className="form-select form-select-lg mb-1 select-round-custom-dropdown-small-reschedule"
																															style={{
																																paddingTop:
																																	"10px",
																															}}
																														>
																															{selectedOption2 && (
																																<p className="f-fm fm-w4-s14 color-7">
																																	{
																																		selectedOption2
																																	}
																																</p>
																															)}
																															{!selectedOption2 && (
																																<p className="f-fm fm-w4-s16 color-7">
																																	Reschedule
																																</p>
																															)}
																														</DropDownHeader>

																														{filterList.map(
																															(k) =>
																																isOpen2 && (
																																	<div
																																		style={{
																																			width:
																																				"223px",
																																			height:
																																				"103px",
																																			position:
																																				"absolute",
																																		}}
																																	>
																																		<DropDownListContainer className="customdropcontainer">
																																			<DropDownList className="customdroptwo-new">
																																				{filterList.map(
																																					(
																																						k
																																					) => (
																																						<ListItem
																																							className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
																																							onClick={() => {
																																								onOptionClicked2(
																																									k,
																																									"5",
																																									apd,
																																									apd.consultationtype
																																								);
																																								setRescheduleObject(
																																									apd
																																								);
																																							}}
																																							value={
																																								k
																																							}
																																						>
																																							<span
																																								style={{
																																									paddingLeft:
																																										"10px",
																																									paddingRight:
																																										"10px",
																																									paddingTop:
																																										"1px",
																																									paddingBottom:
																																										"4px",
																																								}}
																																							>
																																								{
																																									k
																																								}
																																							</span>
																																						</ListItem>
																																					)
																																				)}
																																			</DropDownList>
																																		</DropDownListContainer>
																																	</div>
																																)
																														)}
																													</DropDownContainer>
																												</>
																											</div>
																										)}
																									</div>
																								</div>
																							</div>
																						</Popover.Body>
																					</Popover>
																				}
																			>
																				<button
																					className={
																						apd.consultationtype ===
																						"consultation"
																							? apd.videourl !== "" &&
																							  apd.isdoctorcheckedin === "" &&
																							  apd.iscompleted === "false"
																								? "videocompleted"
																								: apd.videourl == "" &&
																								  apd.isdoctorcheckedin ===
																										"" &&
																								  apd.iscompleted === "false"
																								? "video"
																								: "videocompleted"
																							: apd.iscompleted === "true"
																							? "treatmentcompleted"
																							: apd.iscompleted === "false" &&
																							  apd.isdoctorcheckedin === "true"
																							? "treatment"
																							: "treatmentparked"
																					}
																					disabled={
																						apd.consultationtype ===
																						"appointment"
																							? apd.aptdisable === "true"
																								? true
																								: false
																							: apd.cnsdisable === "true"
																							? true
																							: false
																					}
																					style={{
																						paddingBottom:
																							apd.consultationtype ===
																							"consultation"
																								? getPaddingBottom(
																										apd.cstarttime,
																										apd.cendtime
																								  ) -
																								  20 +
																								  "px"
																								: getPaddingBottom(
																										apd.starttime,
																										apd.endtime
																								  ) -
																								  20 +
																								  "px",
																						textAlign: "left",
																					}}
																				>
																					<span className="text-truncate">
																						{getvalue(e)}
																					</span>
																				</button>
																			</OverlayTrigger>
																		)}
																	</>
																</>
															);
														})}
													</h>
												</>
											)}
										</div>
									);
								}
							}
						}
					})}
					{getArray60Lines(id)}
				</Col>
			);
		}
	};
	const getPatientImage = (pdetails, width) => {
		return pdetails.avatar === "" ? (
			<img
				src="images/avatar.png"
				style={{
					width: width,
					height: width,
				}}
				alt="imgfemale"
			></img>
		) : (
			<img
				src={process.env.REACT_APP_AWS_S3 + pdetails.avatar}
				style={{
					width: width,
					height: width,
					borderRadius: "50%",
				}}
				alt="imgfemale"
			></img>
		);
	};

	const getPatients = (patientid, date, doctorid) => {
		historyTempArray.length = 0;
		previosHistoryArray.length = 0;
		setdupHistoryTempArray([]);

		UserServices.GetAppointmentOfPatientswithDoctors(patientid, doctorid).then(
			(app) => {
				app.data.map((st) => {
					if (!historyTempArray.includes(st._id)) {
						const d1 = st.appointmentdate.split("T")[0];
						const clickDate = date.split("T")[0];

						if (
							moment(d1, "YYYY-MM-DD").valueOf() <
							moment(clickDate, "YYYY-MM-DD").valueOf()
						) {
							previosHistoryArray.push(st);
							historyTempArray.push(st._id);
						}
					}
				});
				setdupHistoryTempArray(previosHistoryArray);
			}
		);
		return previosHistoryArray;
	};

	const calculate_age = (dob1) => {
		var today = new Date();
		var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
		var age_now = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age_now--;
		}
		return age_now;
	};

	const convertTime12to24 = (time12h) => {
		const time = time12h.replace(/\s(PM|AM)/, "");
		const modifier = time12h.replace(time, "");
		let [hours, minutes] = time.split(":");
		if (hours === "12") {
			hours = "00";
		}
		if (modifier.replace(/\s/, "") === "PM") {
			hours = parseInt(hours, 10) + 12;
		}

		return `${hours}:${minutes}`;
	};

	const [patient, setPatient] = useState();
	const [temp, setTemp] = useState();
	const [startTime, setStartTime] = useState();
	const [aptstartTime, setAptStartTime] = useState();
	const [treatmentDetails, setTreatmentDetails] = useState([]);
	const [tempArray, setTempArray] = useState([]);
	const [price, setPrice] = useState([]);

	useEffect(() => {
		let time = props.availbleTime.days;
		let st = time.split("to")[0].split(":")[0];
		setStartTime(st);
		setAptStartTime();
		let endTime = time.split("to")[1].split(":")[0];
		let r = parseInt(endTime) - st;
		setTemp(parseInt(st) + r);
	}, []);

	const [existUser, setExistUser] = useState();

	useEffect(() => {
		setPrice(props.price);
		setTreatmentDetails(props.treatmentDetails);
		setTempArray(props.tempArray);
	}, [props]);

	const getvalue = (tid) => {
		var index = tempArray.indexOf(tid);

		return treatmentDetails[index];
	};

	const getTreatmentName = (tid) => {
		var index = tempArray.indexOf(tid);

		return (
			<div
				style={{
					borderRadius: "5px",
					color: "#000",
				}}
			>
				{treatmentDetails[index]}
			</div>
		);
	};

	const getPrice = (tid) => {
		var index = tempArray.indexOf(tid);
		let mul = parseInt(price[index]);
		return mul;
	};

	const [history, setHistory] = useState(false);
	const [history1, setHistory1] = useState(false);
	const [rescheduleObject, setRescheduleObject] = useState(undefined);
	const handleHistory = () => {
		setHistory(!history);
		setHistory1(true);
	};

	const Remove = (apd, type) => {
		if (type === "appointment") {
			if (apd !== "") {
				(async function anyNameFunction() {
					const updateSettingsvariables =
						PatientServices.returnUpdateAppointments({
							id: apd._id,
							status: "Decline",
						});
					PatientServices.UpdatePatientAppointment(
						updateSettingsvariables
					).then((value) => {
						window.location.reload();
					});
				})();
			}
		}
		if (type === "consultation") {
			if (apd !== "") {
				(async function anyNameFunction() {
					const updateSettingsvariables =
						PatientServices.returnUpdateAppointments({
							id: apd._id,
							cstatus: "Decline",
						});
					PatientServices.UpdatePatientAppointment(
						updateSettingsvariables
					).then((value) => {
						window.location.reload();
					});
				})();
			}
		}
	};

	const getEnter = () => {
		setdupHistoryTempArray([]);
		setHistory1(false);
		setHistory(false);
	};
	return (
		<div>
			<div className="row" style={{ paddingTop: "30px" }}>
				{selectedOption === "5" ? (
					<Reschedule
						reschedule={rescheduleObject}
						timeArray={props.timearray}
						appointments={props.apatientDetails}
						empty={setSelectedOptionEmpty}
					/>
				) : (
					<p></p>
				)}
				<div
					className="col-1"
					style={{
						backgroundColor: "#fff",
						borderTopLeftRadius: "8px",
						borderTopRightRadius: "8px",
					}}
				>
					&nbsp;
				</div>

				<div className="col-10">
					<div style={{ paddingTop: "0px" }}>
						<Row style={{ backgroundColor: "#fff" }}>
							{props.appointments?.map((apts) => {
								return (
									<Col
										style={{
											height: "40px",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											cursor: "pointer",
										}}
										className={
											apts === props.tdate
												? "f-fm fm-w5-s16"
												: "f-fm fm-w5-s16 color-AC"
										}
										onClick={() => {
											props.setOneDay(!props.oneDay);
											props.dayclick(apts);
										}}
									>
										<span className={apts === props.tdate ? "today" : ""}>
											{apts.split("-")[2]}&nbsp;&nbsp;
										</span>
										{new Date(apts.replace("-", " "))
											.toString()
											.split(" ")[0]
											.toUpperCase()}
									</Col>
								);
							})}
						</Row>
					</div>
				</div>
			</div>
			<div className="row" style={{ paddingTop: "5px" }}>
				<div className="col-1" style={{ backgroundColor: "#ffffff" }}>
					{props.timearray?.slice(8, props.timearray.length).map((ta, idx) => {
						return (
							<>
								<div
									className="row f-fm fm-w4-s14 color-AC time"
									style={{ position: "relative" }}
								>
									{ta}
								</div>
							</>
						);
					})}
				</div>
				<div
					className="col-10"
					style={{
						backgroundColor: "#F5F5F5",
						paddingLeft: "30px",
						paddingTop: "10px",
					}}
				>
					<div style={{ marginTop: "-18px" }}>
						{props.timearray?.slice(7, props.timearray.length).map((ta, i) => {
							var yy = i >= 5 ? 0 : i;
							return (
								<Row
									style={{
										display: "grid",
										gridTemplateColumns: "repeat(7, 1fr)",
									}}
								>
									<>
										{props.firstCell.map((e, id) => {
											return getColumnString(i, id, props, ta);
										})}
									</>
								</Row>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Weeks;
