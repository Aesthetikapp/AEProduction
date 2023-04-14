import { useState, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import * as strutility from "./stringutility";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tabs";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import * as UserServices from "../services/user";
import * as NotificationServices from "../services/notifications";
import moment from "moment";

const menuitems = ["appointments", "treatments", "analytics", "patients"];

export const aeLoader = (props) => {
	return (
		<>
			<div
				style={{
					height: "100%",
					position: "absolute",
					top: "0px",
					right: "0px",
					bottom: "0px",
					left: "0px",
					display: "grid",
					alignItems: "center",
					minHeight: "100%",
					color: "#FFFFFF",
					textAlign: "center",
					verticalAlign: "middle",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						position: "relative",
						height: "100%",
						width: "100%",
						minHeight: "100%",
						backgroundColor: "#000000",
					}}
				>
					<div className="spinner-border text-light" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			</div>
		</>
	);
};

export const aeProgressBar = (props) => {
	return (
		<>
			<div className="progress-col">
				<div className="progress aeprogress">
					<div
						className="progress-bar eprogress-bar"
						style={{ width: props.width }}
						role="progressbar"
						aria-valuenow="0"
						aria-valuemin="0"
						aria-valuemax="100"
					></div>
				</div>
			</div>
		</>
	);
};

export const AeProgressAgeBar = (props) => {
	const k = props.k;
	const total = props.total;
	const width = k[1] == 0 ? 0 + "%" : k[1] + "%";
	const cname =
		total != 0
			? "aprogress-bar aeprogress-bar"
			: "aprogress-bar aeprogress-bar-none";
	// console.log("cnamee", cname, total);
	return (
		<>
			<label
				style={{ paddingRight: "45px" }}
				className="f-fm fm-w6-s12 color-00"
				id={"lbl" + k[0]}
			>
				{k[0] == "50+" ? (
					<>
						{k[0]}
						<span style={{ color: "#ffffff" }}>20</span>
					</>
				) : (
					k[0]
				)}
			</label>

			<div className="aaprogress aaeprogress">
				<div
					className={cname}
					style={{ width: width }}
					role="progressbar"
					aria-valuenow="0"
					aria-valuemin="0"
					aria-valuemax="100"
				></div>
			</div>

			<label
				className="f-fm fm-w6-s12 color-00"
				style={{ paddingLeft: "25px" }}
				id={"lbl1" + k[0]}
			>
				{total !== 0 ? k[1] + "%" : 0 + "%"}
			</label>
			<br></br>
		</>
	);
};

export const aeButton = (props) => {
	// console.log(props.disabledClass);
	if (props.disabledClass === "aebuttongrey") {
		return (
			<button className={props.classNames + " " + props.disabledClass}>
				{props.text}
			</button>
		);
	} else {
		return (
			<button
				className={props.classNames + " " + props.disabledClass}
				onClick={props.onClick}
			>
				{props.text}
			</button>
		);
	}
};

export const aeLogo = (props) => {
	return (
		<>
			<a
				className="navbar-brand"
				// href="/"
				onClick={() => props.goto("../dashboard")}
				style={{ paddingLeft: "43px", cursor: "pointer" }}
			>
				<img
					loading="lazy"
					src="/images/Aes2ALPHA.png"
					style={{ width: "43px", height: "47px" }}
					alt="..."
				></img>
				&nbsp;&nbsp;&nbsp;&nbsp;
				<label
					className={"f-fm fm-w7-s28 " + props.fcolor}
					style={{
						lineHeight: "35px",
						verticalAlign: "middle",
						cursor: "pointer",
						paddingRight: "5px",
					}}
				>
					Aesthetik
				</label>
			</a>
		</>
	);
};

export const aeLogo_signup = (props) => {
	return (
		<>
			&nbsp;&nbsp;
			<a
				className="navbar-brand"
				href="/"
				style={{ paddingLeft: "20px", cursor: "pointer" }}
			>
				<img
					loading="lazy"
					src="/images/Aes2ALPHA.png"
					style={{ width: "43px", height: "47px" }}
					alt="..."
				></img>

				<label
					className={"f-fm fm-w7-s28 " + props.fcolor}
					style={{
						lineHeight: "35px",
						verticalAlign: "middle",
						cursor: "pointer",
						padding: "0 5px 0 10px",
					}}
				>
					Aesthetik
				</label>
			</a>
		</>
	);
};

export const getMenuItems = (props) => {
	// console.log(props);
	let nclassName = "nav-link nav-link-ns";
	let sclassName = "nav-link nav-link-ns";
	let mtext = "";
	if (props.page) {
		if (props.page === "appointments") {
			sclassName = "nav-link nav-link-s";
		}
		if (props.page === "treatments") {
			sclassName = "nav-link nav-link-s";
		}
		if (props.page === "analytics") {
			sclassName = "nav-link nav-link-s";
		}
		if (props.page === "patients") {
			sclassName = "nav-link nav-link-s";
		}
	}
	return (
		<>
			{menuitems.map(function (mitem) {
				mtext =
					mitem === "treatments"
						? "Treatment List"
						: strutility.capitalizeFirstLowercaseRest(mitem);
				if (props.page === mitem) {
					return (
						<li key={mitem} className="nav-item">
							<a
								style={{ cursor: "pointer" }}
								className={sclassName}
								onClick={() => {
									props.goto("/" + mitem, {
										state: props.params["mpage"]
											? props.params["mpage"]
											: props.params,
									});
								}}
							>
								{mtext}
							</a>
						</li>
					);
				} else {
					return (
						<li key={mitem} className="nav-item">
							<a
								style={{ cursor: "pointer" }}
								className={nclassName}
								onClick={() => {
									props.goto("/" + mitem);
								}}
							>
								{mtext}
							</a>
						</li>
					);
				}
			})}
		</>
	);
};

export const AeNav = (props) => {
	// console.log(props);
	const params = useLocation().state;
	const navigate = useNavigate();
	const [state, setState] = useState({ page: "profile", mpage: props.params });
	const [read, setRead] = useState("notiback");
	const [read1, setRead1] = useState("notiback");
	const [read2, setRead2] = useState("notiback");
	const [appointmentStatus, setAppointmentStatus] = useState();
	const [generalStatus, setGeneralStatus] = useState();
	const [calendarStatus, setCalendarStatus] = useState();
	const [notificationStatus, setNotificationStatus] = useState();
	const [apatientDetails, setAPatientDetails] = useState([]);
	const [consuCount, setConsuCount] = useState(0);
	const [apptareqCount, setApptReqCount] = useState(0);
	const [systemCount, setSystemCount] = useState(0);
	const [notificationData, setNotificationData] = useState([]);
	const [futureDates] = useState([]);
	const [eal, setEal] = useState(0);

	useLayoutEffect(() => {
		UserServices.GetUserSettingsById(params.id).then((existUser) => {
			setGeneralStatus(existUser.userSettingsByUserID.general[0].status);
			setCalendarStatus(existUser.userSettingsByUserID.calendar[0].status);
			setNotificationStatus(
				existUser.userSettingsByUserID.notification[0].status
			);
			setAppointmentStatus(
				existUser.userSettingsByUserID.appointment[0].status
			);
		});

		for (var i = 0; i < 50; i++) {
			const date = moment()
				.add(i, i > 1 ? "days" : "day")
				.format("YYYY-MM-DD");
			futureDates.push(date);
		}

		UserServices.GetAppointment(params.id).then((patient) => {
			let clone = JSON.parse(JSON.stringify(patient.data));
			let newobj = clone.concat(patient.data);
			let previd = [];
			let new_array = newobj.map(function (ele) {
				// console.log("iddd", ele._id);
				let cname = "";
				let aptdisable = "true";
				let cnsdisable = "true";
				let consultationtype = "consultation";
				if (!previd.includes(ele._id)) {
					previd.push(ele._id);
					if (
						ele.videourl !== "" &&
						ele.isdoctorcheckedin === "" &&
						ele.iscompleted === "false"
					) {
						cname = "videocompleted";
						aptdisable = "true";
						cnsdisable = "";
						consultationtype = "consultation";
					}
					if (
						ele.videourl === "" &&
						ele.isdoctorcheckedin === "" &&
						ele.iscompleted === "false"
					) {
						cname = "video";
						aptdisable = "true";
						cnsdisable = "";
						consultationtype = "consultation";
					}
				} else {
					if (ele.iscompleted === "true") {
						cname = "treatmentcompleted";
						aptdisable = "";
						cnsdisable = "true";
						consultationtype = "appointment";
					}
					if (ele.iscompleted === "false" && ele.isdoctorcheckedin === "true") {
						cname = "treatment";
						aptdisable = "";
						cnsdisable = "true";
						consultationtype = "appointment";
					}
					if (ele.iscompleted === "false" && ele.isdoctorcheckedin === "") {
						cname = "treatmentparked";
						aptdisable = "true";
						cnsdisable = "";
						consultationtype = "appointment";
					}
				}
				return {
					...ele,
					cname: cname,
					aptdisable: aptdisable,
					cnsdisable: cnsdisable,
					consultationtype: consultationtype,
				};
			});
			// console.log("patient11", new_array);
			setAPatientDetails(new_array);
			var earr = new_array.filter(function (elem) {
				return (
					futureDates.includes(
						elem.consultationdate && elem.consultationdate.split("T")[0]
					) &&
					elem.consultationtype === "consultation" &&
					elem.cstatus === "Pending"
				);
			});

			setConsuCount(earr.length);
			var darr = new_array.filter(function (elem) {
				return (
					futureDates.includes(elem.appointmentdate.split("T")[0]) &&
					elem.consultationtype === "appointment" &&
					elem.status === "Pending"
				);
			});
			setApptReqCount(darr.length);
		});

		NotificationServices.GetNotificationByAdminid(params.id).then((patient) => {
			// console.log("notificationdata", patient.notificationByAdminid);
			setNotificationData(patient.notificationByAdminid);
			var earr = patient.notificationByAdminid.filter(function (elem) {
				return elem.status === "pending";
			});

			setEal(earr.length);
		});
	}, []);

	useLayoutEffect(() => {
		setSystemCount(0);

		if (!appointmentStatus) {
			setSystemCount((prev) => prev + 1);
		}
		if (!calendarStatus) {
			setSystemCount((prev) => prev + 1);
		}
		if (!generalStatus) {
			setSystemCount((prev) => prev + 1);
		}
		if (!notificationStatus) {
			setSystemCount((prev) => prev + 1);
		}
	}, [appointmentStatus, generalStatus, calendarStatus, notificationStatus]);

	const handleClick = (key) => {
		state.page = key;
		setState((prevState) => ({ page: prevState.page }));
		// console.log(state.page);
		props.goto("../profile", key);
	};
	const handleNotification = () => {
		navigate("../notifications");
	};

	const goToCalendarSettings = (key) => {
		localStorage.removeItem("comeFrom");
		params["page"] = key;
		// console.log("hnhn ", props.page);
		navigate("../profile", { state: params });
		localStorage.setItem("preference", params.page);
	};

	const [white, setWhite] = useState("");
	const request = (id) => {
		// setWhite("#fff");
		navigate("../request", { state: params });
		const updateSettingsvariables = NotificationServices.returnUpdateVariables({
			id: id,
			isopened: true,
		});
		// console.log("lok", updateSettingsvariables);

		NotificationServices.UpdateNotification(updateSettingsvariables).then(
			(res) => {
				// console.log("res", res);
				// toast.success("successfully record saved", {
				//   toastId: "calender",
				//   position: "top-right",
				//   autoClose: 3000,
				//   hideProgressBar: false,
				//   closeOnClick: true,
				//   pauseOnHover: true,
				//   draggable: true,
				//   progress: undefined,
				// });
				// window.scrollTo(0, 0);
				// setTimeout(() => {
				//   setIstoastr(false);
				//   window.location.reload();
				// }, 3000);
			}
		);
	};

	const goToAppointmentPage = (key) => {
		params["page"] = key;
		navigate("../appointments", { state: params });
	};

	var today = new Date();
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div
				className="container-fluid"
				style={{ justifyContent: "space-between" }}
			>
				{aeLogo(props, { fcolor: "color-FF" })}
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarColor01"
					aria-controls="navbarColor01"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarColor01"
					style={{ fontWeight: "400", fontSize: "18px" }}
				>
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						{getMenuItems(props)}
					</ul>

					<form className="form-inline insidenav">
						<Dropdown style={{ marginLeft: "44px" }}>
							<DropdownToggle className="btn-darkgrey-noti">
								<img
									loading="lazy"
									style={{ cursor: "pointer" }}
									alt="notifications"
									src="../images/notification.png"
								></img>
								{(!appointmentStatus ||
									!calendarStatus ||
									!generalStatus ||
									!notificationStatus ||
									apptareqCount > 0 ||
									consuCount > 0 ||
									systemCount > 0 ||
									eal > 0) && <span className="requestnoti">&nbsp;</span>}
							</DropdownToggle>
							<Dropdown.Menu
								style={{
									padding: "0px 2rem 1rem 2rem",
									overflowY: "auto",
									width: "515px !important",
								}}
								className="dropdown-menu-noti"
							>
								<div className="row">
									<div
										style={{
											height: "500px",
											marginTop: "8px",
											marginLeft: "inherit",
										}}
									>
										<div
											style={{ color: "#000", textAlign: "left" }}
											className="f-rl fm-w4-s30 pt-5"
										>
											Notifications
										</div>
										<Tabs
											defaultActiveKey="Appointments"
											id="profiletab"
											className="nav-noti "
										>
											<Tab
												eventKey="Appointments"
												title={
													<div className="sys">
														Appt Request
														{/* {apptareqCount > 0 && ( */}
														<div className="divsys">
															<span className="requestsystem">
																{apptareqCount}
															</span>
														</div>
														{/* )} */}
														<hr className="hrr"></hr>
													</div>
												}
											>
												<div
													className="row pb-4"
													style={{ paddingTop: "32px" }}
												>
													<div
														className="col-12"
														style={{
															display: "flex",
															justifyContent: "end",
														}}
													>
														<a
															onClick={() => {
																setRead2("notiread");
															}}
															style={{
																color: "#000",
																cursor: "pointer",
															}}
															className="f-fm fm-w4-s19"
														>
															Mark all as read
														</a>
													</div>
												</div>
												<div style={{ paddingTop: "20px" }}>
													{apptareqCount > 0 ? (
														apatientDetails.map((record) => {
															return (
																<>
																	{futureDates.includes(
																		record.appointmentdate.split("T")[0]
																	) &&
																		record.consultationtype === "appointment" &&
																		record.iscompleted === "false" &&
																		record.status === "Pending" && (
																			<>
																				<div
																					key={record.id}
																					style={{
																						paddingBottom: "20px",
																						cursor: "pointer",
																					}}
																					onClick={() =>
																						goToAppointmentPage(
																							record.appointmentdate.split(
																								"T"
																							)[0]
																						)
																					}
																				>
																					<div className={"row " + read2}>
																						<div className="col-1"></div>
																						<div className="col-2">
																							<img
																								loading="lazy"
																								className="img-request"
																								alt="Consultation"
																							></img>
																						</div>
																						<div className="col-9">
																							<div className="row">
																								<div
																									style={{
																										width: "105px",
																										paddingLeft: "0px",
																										paddingRight: "0px",
																									}}
																								>
																									New booking from
																								</div>
																								{record.patient_details.length >
																									0 && (
																									<div
																										className="col f-fm fm-w7-s14"
																										style={{
																											paddingLeft: "4px",
																											paddingRight: "0px",
																											fontWeight: "bold",
																										}}
																									>
																										{
																											record.patient_details[0]
																												.firstName
																										}
																										&nbsp;
																										{
																											record.patient_details[0]
																												.lastName
																										}
																									</div>
																								)}
																							</div>
																						</div>
																					</div>
																				</div>
																			</>
																		)}
																</>
															);
														})
													) : (
														<table
															align="center"
															className="f-fm fm-w6-s16"
															style={{
																height: "400px",
																color: "#777777",
																lineHeight: "20.08px",
															}}
														>
															<tr>
																<td>No appointment requests yet</td>
															</tr>
														</table>
													)}
												</div>
											</Tab>
											<Tab
												eventKey="Weekly"
												title={
													<div className="sys">
														Consultation
														{/* <div className="divsys">
                              <span className="requestsystem">
                                {consuCount}
                              </span>
                            </div> */}
														{/* {consuCount > 0 && ( */}
														<div className="divsys">
															<span className="requestsystem">
																{consuCount}
															</span>
														</div>
														{/* )} */}
														<hr className="hrr"></hr>
													</div>
												}
											>
												<div
													className="row pb-4"
													style={{ paddingTop: "35px" }}
												>
													<div
														className="col-12"
														style={{
															display: "flex",
															justifyContent: "end",
														}}
													>
														<a
															onClick={() => {
																setRead1("notiread");
															}}
															style={{
																color: "#000",
																cursor: "pointer",
															}}
															className="f-fm fm-w4-s19"
														>
															Mark all as read
														</a>
													</div>
												</div>
												<div style={{ paddingTop: "20px" }}>
													{consuCount > 0 ? (
														apatientDetails.map((record) => {
															return (
																<>
																	{futureDates.includes(
																		record.consultationdate &&
																			record.consultationdate.split("T")[0]
																	) &&
																		record.videourl == "" &&
																		record.consultationtype ===
																			"consultation" &&
																		record.cstatus === "Pending" &&
																		record.iscompleted === "false" && (
																			<>
																				<div
																					key={record.id}
																					style={{
																						paddingBottom: "20px",
																						cursor: "pointer",
																					}}
																					onClick={() =>
																						goToAppointmentPage(
																							record.appointmentdate.split(
																								"T"
																							)[0]
																						)
																					}
																				>
																					<div className={"row " + read1}>
																						<div className="col-1"></div>
																						<div className="col-2">
																							<img
																								loading="lazy"
																								className="img-consultation"
																								alt="Consultation"
																							></img>
																						</div>
																						<div className="col-9">
																							<div className="row">
																								<div
																									style={{
																										width: "133px",
																										paddingLeft: "0px",
																										paddingRight: "0px",
																									}}
																								>
																									New Appointment from
																								</div>
																								{record.patient_details.length >
																									0 && (
																									<div
																										className="col f-fm fm-w7-s14"
																										style={{
																											paddingLeft: "4px",
																											paddingRight: "0px",
																											fontWeight: "bold",
																										}}
																									>
																										{
																											record.patient_details[0]
																												.firstName
																										}
																										&nbsp;
																										{
																											record.patient_details[0]
																												.lastName
																										}
																									</div>
																								)}
																							</div>
																						</div>
																					</div>
																				</div>
																			</>
																		)}
																</>
															);
														})
													) : (
														<table
															align="center"
															className="f-fm fm-w6-s16"
															style={{
																height: "400px",
																color: "#777777",
																lineHeight: "20.08px",
															}}
														>
															<tr>
																<td>No consultation requests yet</td>
															</tr>
														</table>
													)}
												</div>
											</Tab>
											<Tab
												eventKey="Monthly"
												title={
													<div className="sys">
														System
														{/* {(systemCount > 0 || eal > 0) && ( */}
														<div className="divsys" style={{ width: "135px" }}>
															<span className="requestsystem">
																{systemCount + eal}
															</span>
														</div>
														{/* )} */}
														<hr className="hrr"></hr>
													</div>
												}
											>
												<>
													<br></br>
													<br></br>
													{appointmentStatus &&
													generalStatus &&
													calendarStatus &&
													notificationStatus &&
													eal < 0 ? (
														<table
															align="center"
															className="f-fm fm-w6-s16"
															style={{
																height: "400px",
																color: "#777777",
																lineHeight: "20.08px",
															}}
														>
															<tr>
																<td>No system requests yet</td>
															</tr>
														</table>
													) : (
														<>
															{" "}
															<div className="row pb-4">
																<div
																	className="col-12"
																	style={{
																		display: "flex",
																		justifyContent: "end",
																	}}
																>
																	<a
																		onClick={() => {
																			setRead("notiread");
																		}}
																		style={{ color: "#000", cursor: "pointer" }}
																		className="f-fm fm-w4-s19"
																	>
																		Mark all as read
																	</a>
																</div>
															</div>
															{!appointmentStatus && (
																<div
																	style={{
																		paddingBottom: "20px",
																		cursor: "pointer",
																	}}
																	onClick={() =>
																		goToCalendarSettings("apptPref")
																	}
																>
																	<div className={"row " + read}>
																		<div className="col-1"></div>
																		<div className="col-2">
																			<img
																				alt="appointment"
																				src="../images/appointment1.png"
																			></img>
																		</div>
																		<div className="col-9">
																			<div className="row">
																				<div
																					style={{
																						width: "63px",
																						paddingLeft: "0px",
																						paddingRight: "0px",
																					}}
																				>
																					Set up your
																				</div>
																				<div
																					className="col f-fm fm-w7-s14"
																					style={{
																						paddingLeft: "4px",
																						paddingRight: "0px",
																						fontWeight: "bold",
																					}}
																				>
																					appointment preference
																				</div>
																			</div>

																			<div className="row f-fm fm-w4-s14 pt-2">
																				Including appointment intervals, radius
																				preferency...
																			</div>
																		</div>
																	</div>
																</div>
															)}
															{!generalStatus && (
																<div
																	style={{
																		paddingBottom: "20px",
																		cursor: "pointer",
																	}}
																	onClick={() =>
																		goToCalendarSettings("generalPref")
																	}
																>
																	<div className={"row " + read}>
																		<div className="col-1"></div>
																		<div className="col-2">
																			<img
																				alt="appointment"
																				src="../images/appointment1.png"
																			></img>
																		</div>
																		<div className="col-9">
																			<div className="row">
																				<div
																					style={{
																						width: "63px",
																						paddingLeft: "0px",
																						paddingRight: "0px",
																					}}
																				>
																					Set up your
																				</div>
																				<div
																					className="col f-fm fm-w7-s14"
																					style={{
																						paddingLeft: "4px",
																						paddingRight: "0px",
																						fontWeight: "bold",
																					}}
																				>
																					general preference
																				</div>
																			</div>

																			<div className="row f-fm fm-w4-s14 pt-2">
																				Including time zones, date formats,
																				language...
																			</div>
																		</div>
																	</div>
																</div>
															)}
															{!calendarStatus && (
																<div
																	style={{
																		paddingBottom: "20px",
																		cursor: "pointer",
																	}}
																	onClick={() =>
																		goToCalendarSettings("calendarPref")
																	}
																>
																	<div className={"row " + read}>
																		<div className="col-1"></div>
																		<div className="col-2">
																			<img
																				alt="appointment"
																				src="../images/appointment1.png"
																			></img>
																		</div>
																		<div className="col-9">
																			<div className="row">
																				<div
																					style={{
																						width: "63px",
																						paddingLeft: "0px",
																						paddingRight: "0px",
																					}}
																				>
																					Set up your
																				</div>
																				<div
																					className="col f-fm fm-w7-s14"
																					style={{
																						paddingLeft: "4px",
																						paddingRight: "0px",
																						fontWeight: "bold",
																					}}
																				>
																					calender preference
																				</div>
																			</div>

																			<div className="row f-fm fm-w4-s14 pt-2">
																				Including working time,add late fees,
																				view options...
																			</div>
																		</div>
																	</div>
																</div>
															)}
															{!notificationStatus && (
																<div
																	style={{
																		paddingBottom: "20px",
																		cursor: "pointer",
																	}}
																	onClick={() =>
																		goToCalendarSettings("notiPref")
																	}
																>
																	<div className={"row " + read}>
																		<div className="col-1"></div>
																		<div className="col-2">
																			<img
																				alt="appointment"
																				src="../images/appointment1.png"
																			></img>
																		</div>
																		<div className="col-9">
																			<div className="row">
																				<div
																					style={{
																						width: "63px",
																						paddingLeft: "0px",
																						paddingRight: "0px",
																					}}
																				>
																					Set up your
																				</div>
																				<div
																					className="col f-fm fm-w7-s14"
																					style={{
																						paddingLeft: "4px",
																						paddingRight: "0px",
																						fontWeight: "bold",
																					}}
																				>
																					notification preference
																				</div>
																			</div>

																			<div className="row f-fm fm-w4-s14 pt-2">
																				Including email notifications, dashboard
																				notificaions...
																			</div>
																		</div>
																	</div>
																</div>
															)}
															{notificationData.map((e) => {
																return (
																	<>
																		{e.status === "pending" && (
																			<div
																				key={e.id}
																				style={{
																					paddingBottom: "20px",
																					cursor: "pointer",
																				}}
																				onClick={() => request(e.id)}
																			>
																				<div
																					className={"row "}
																					style={{
																						backgroundColor: e.isopened
																							? white
																							: read === "notiback"
																							? "rgba(243, 108, 80, 0.1)"
																							: "rgba(80, 243, 108, 0.1)",

																						height: "60px",
																						display: "flex",
																						alignItems: "center",
																					}}
																				>
																					<div className="col-1"></div>
																					<div className="col-2">
																						<img
																							loading="lazy"
																							src="../images/hand.png"
																							alt="Consultation"
																							style={{
																								height: "35px",
																								width: "35px",
																							}}
																						></img>
																					</div>
																					<div className="col-9">
																						<div className="row">
																							<div
																								className="col f-fm fm-w7-s14"
																								style={{
																									paddingLeft: "4px",
																									paddingRight: "0px",
																									fontWeight: "bold",
																								}}
																							>
																								{e.message1}
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																		)}
																	</>
																);
															})}
														</>
													)}
												</>
											</Tab>
										</Tabs>
									</div>
								</div>
							</Dropdown.Menu>
						</Dropdown>

						<Dropdown className="marginleftzero" style={{ marginLeft: "50px" }}>
							<Dropdown.Toggle
								className={
									props.dropMenuClassName
										? props.dropMenuClassName
										: "btn-darkgrey"
								}
								id="dropdown-basic"
							>
								<div
									style={{
										textAlign: "left",
										display: "flex",
										flexDirection: "row",
										alignItems: "flex-end",
									}}
								>
									<span style={{ paddingLeft: "28px", width: "150px" }}>
										<label
											className="f-rl fm-w6-s16 color"
											style={{ cursor: "pointer" }}
										>
											{props.userid}
										</label>
										<br></br>
										<label
											className="f-fm fm-w4-s12 color-D6 color1"
											style={{ cursor: "pointer" }}
										>
											{props.clinicname}
										</label>
									</span>
									<span>
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										<img
											onError={(e) => {
												e.target.src = "../images/avatar.png";
											}}
											// loading="lazy"
											src={
												props.avatar +
												"?" +
												today.getHours() +
												today.getMinutes() +
												today.getSeconds()
											}
											style={{
												width: "47px",
												height: "47px",
												borderRadius: "50%",
											}}
											alt="avatar"
										></img>
									</span>
								</div>
							</Dropdown.Toggle>
							<Dropdown.Menu
								style={{ width: "94.8%", padding: "0px 2rem 1rem 2rem" }}
							>
								<Dropdown.Item
									onClick={() => handleClick("profile")}
									eventKey="profile"
									href=""
								>
									Profile
								</Dropdown.Item>
								<Dropdown.Item
									onClick={() => handleClick("subscription")}
									eventKey="subscription"
									href=""
								>
									Subscription
								</Dropdown.Item>
								<Dropdown.Item
									onClick={() => handleClick("payments")}
									eventKey="payments"
									href=""
								>
									Payments
								</Dropdown.Item>
								<Dropdown.Item
									onClick={() => handleClick("settings")}
									eventKey="settings"
									href=""
								>
									Account Setting
								</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item href="/help">Get Help</Dropdown.Item>
								<Dropdown.Item href="/termsandpolicy">
									Terms and Privacy Policy
								</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item href="/logout">Log out</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</form>
				</div>
			</div>
		</nav>
	);
};

export const Baseurl = () => {
	var baseurl1 = "";
	if (process.env.REACT_APP_HOST === "local") {
		baseurl1 = "http://localhost:3001/";
	} else if (process.env.REACT_APP_HOST === "123") {
		baseurl1 = "http://123.176.43.187:3004/";
	} else {
		baseurl1 = window.location.origin + "/api/";
	}
	return baseurl1;
};

export const Footer = () => {
	const navigate = useNavigate();
	const getCurrentYear = () => {
		return new Date().getFullYear();
	};

	return (
		<footer
			className="footer footer-2 footer-four col-xl-12 col-lg-12 col-md-12 col-xs-12 col-sm-12"
			style={{
				width: "100%",
			}}
		>
			<div className="footer-top">
				<div className="row pt-5">
					<br></br>
				</div>
				<div className="row">
					<div className="col-1"></div>
					<div
						className="col-3 justify-content-center "
						style={{ marginTop: "32px" }}
					>
						<hr className="bighr"></hr>
					</div>
					<div className="col-4 justify-content-center">
						<img
							loading="lazy"
							src="../images/AES6ALPHA.png"
							style={{ width: "83px", height: "92px" }}
							alt="logo"
						></img>
					</div>
					<div
						className="col-3 justify-content-center "
						style={{
							marginTop: "32px",
						}}
					>
						<hr className="bighr"></hr>
					</div>
					<div className="col-1"></div>
				</div>
				<div className="row pt-8">
					<br></br>
				</div>
				<div className="row color-FF f-fm fm-w5-s18">
					<div className="col-lg-4 col-sm-12 col-md-4 justify-content-center">
						<div className="row">
							<div className="col">
								<div
									className="row d-flex justify-content-center"
									style={{
										cursor: "pointer",
										marginTop: "32px",
									}}
									onClick={() => navigate("/home")}
								>
									PRIVACY POLICY
								</div>
								<div
									className="row d-flex justify-content-center pt-4"
									style={{ cursor: "pointer" }}
									onClick={() => navigate("/home")}
								>
									TERMS AND CONDITIONS
								</div>
								<div
									className="row d-flex justify-content-center  pt-4"
									style={{ cursor: "pointer" }}
									onClick={() => navigate("/home")}
								>
									ABOUT
								</div>
							</div>
						</div>
					</div>
					<div
						className="col-lg-4 col-sm-12 col-md-4 justify-content-center"
						style={{ marginTop: "32px" }}
					>
						<div className="row">
							<div className="col-lg-4 col-sm-12 col-md-4 justify-content-center">
								<img
									loading="lazy"
									alt="instagram"
									src="../images/instagram.png"
									style={{ width: "39px", height: "39px" }}
								></img>
							</div>
							<div className="col-lg-4 col-sm-12 col-md-4 justify-content-center">
								<img
									loading="lazy"
									alt="twitter"
									src="../images/twitter.png"
									style={{ width: "38px", height: "38px" }}
								></img>
							</div>
							<div className="col-lg-4 col-sm-12 col-md-4 justify-content-center">
								<img
									alt="pinterest"
									loading="lazy"
									src="../images/pinterest.png"
									style={{ width: "40px", height: "40px" }}
								></img>
							</div>
						</div>
					</div>
					<div
						className="col-lg-4 col-sm-12 col-md-4  justify-content-center "
						style={{ paddingLeft: "0px" }}
					>
						<div className="row">
							<div className="col">
								<div
									className="row d-flex justify-content-center"
									style={{
										cursor: "pointer",
										marginTop: "32px",
									}}
									onClick={() => navigate("/home")}
								>
									FAQ
								</div>
								<div
									className="row d-flex justify-content-center pt-4"
									style={{ cursor: "pointer" }}
									onClick={() => navigate("/home")}
								>
									CONTACT US
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row pt-7">
					<div
						className="col-12 justify-content-center "
						style={{ paddingLeft: "0px" }}
					>
						<center>
							<div className="row">
								<div className="col">
									<hr className="vhr"></hr>
								</div>
							</div>
						</center>
					</div>
				</div>
				<div className="row pt-8 f-fm f-w5-s18 color-FF">
					<div className="col-12 justify-content-center ">
						© {getCurrentYear()} | AESTHETIK, llc. All Rights Reserved
					</div>
				</div>
				<div className="row pt-5 f-fm f-w5-s18 color-FF">
					<div
						className="col d-flex justify-content-center "
						style={{ paddingLeft: "0px" }}
					>
						<div className="row">
							<div className="col">&nbsp;</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
