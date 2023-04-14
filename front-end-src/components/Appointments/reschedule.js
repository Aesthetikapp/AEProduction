import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { OverlayTrigger, Popover } from "react-bootstrap";
import * as PatientServices from "../../services/patient";
import {
	sendRescheduleEmailNotification,
	SendTestNotification,
} from "../../services/notificationservices";
import moment from "moment";
import * as UserServices from "../../services/user";
import { format } from "date-fns";

function Example(props) {
	const params = useLocation().state;
	console.log("resch", props.reschedule);
	const [show, setShow] = useState(true);
	const [showAlert, setShowAlert] = useState(false);
	const handleClose = () => {
		setShow(false);
		props.empty();
	};
	const handleCloseAlert = () => {
		setShowAlert(false);
		setShow(true);
		// props.empty();
	};
	const handleShow = () => setShow(true);
	const [time, setTime] = useState("");
	const [startTime, setStartTime] = useState("Start Time");
	const [endTime, setEndTime] = useState("");

	const convertTime12to24 = (time12h) => {
		const [time, modifier] = time12h.split(" ");

		let [hours, minutes] = time.split(":");

		if (hours === "12") {
			hours = "00";
		}

		if (modifier === "PM") {
			hours = parseInt(hours, 10) + 12;
		}

		return `${hours}:${minutes}`;
	};

	const [availbleTime, setAvailbleTime] = useState();
	const [filteredAppt, setFilteredAppt] = useState([]);
	const [type, setType] = useState([]);
	const [reschDate, setReschDate] = useState();
	const [disableStartTime, setDisableStartTime] = useState(false);
	const [id, setId] = useState([]);
	const [id1, setId1] = useState([]);
	const [workingDaysArray] = useState([]);
	useLayoutEffect(() => {
		// const ti = getIntervalDates("09:00to23:00", 60);
		// console.log(ti);
		//(async function anyNameFunction() {
		setType(props.reschedule.consultationtype);
		setReschDate(
			props.reschedule.consultationtype === "appointment"
				? props.reschedule.appointmentdate
				: props.reschedule.consultationdate
		);
		UserServices.GetUserSettingsById(params.id).then((existUser) => {
			console.log("pink", existUser.userSettingsByUserID);
			console.log("pink1", existUser.userSettingsByUserID.appointment[0]);
			setAvailbleTime(
				parseInt(existUser.userSettingsByUserID.appointment[0].interval)
			);
		});

		(async function () {
			var c = await UserServices.GetUserSettingsById(params.id);
			var a = c.userSettingsByUserID.calendar[0];
			console.log("settings", a);
			var v = a.days.split("|");

			v.forEach((ele) => {
				var a = ele.split("-");
				if (!workingDaysArray.includes(a[0])) {
					workingDaysArray.push(a[0]);
				}
			});
			console.log("ele", workingDaysArray);
		})();
	}, []);

	const handler = (event) => {
		setStartTime(event.split("-")[0]);
		setEndTime(event.split("-")[1]);
	};

	const [tarray, setTArray] = useState();
	const generate_series = (step) => {
		const dt = new Date(2022, 0, 1);
		const rc = [];
		while (dt.getDate() === 1) {
			rc.push(dt.toLocaleTimeString("en-US").replace(":00", ""));
			dt.setMinutes(dt.getMinutes() + step);
		}
		console.log("rcc", rc);
		// setTArray(rc)
		return rc;
	};
	// const timearray = generate_series(parseInt(availbleTime));

	const getIntervalDates = (dateTime, interval) => {
		//let day = dateTime.slice(0,2);
		let time = dateTime.split("to");
		console.log("-times:" + dateTime + " : " + JSON.stringify(time));
		const sTime = moment(time[0], "HH:mm").add(interval, "minutes");

		let value = {
			interval: "00:" + (interval >= 60 ? "59" : interval),
			startTime: sTime.hour() + ":" + sTime.minute(),
			//startTime: time[0],
			endTime: time[1],
		};
		//console.log('-startTime: ' + moment(time[0], 'HH:mm').add(interval, 'minutes').hour);

		var inputDataFormat = "HH:mm";
		//var outputFormat = "HH:mm a";
		var outputFormat = "HH:mm";

		var tmp =
			interval >= 60
				? moment(value.interval, inputDataFormat).add(1, "minute")
				: moment(value.interval, inputDataFormat);
		var dif = tmp - moment().startOf("day");

		var startIntervalTime = moment(value.startTime, inputDataFormat).add(
			-dif,
			"ms"
		);
		var endIntervalTime = moment(value.startTime, inputDataFormat);
		var finishTime = moment(value.endTime, inputDataFormat);

		var intervals = [];
		while (startIntervalTime.format("x") < finishTime.format("x")) {
			//   console.log("startIntervalTime", startIntervalTime, finishTime);
			//   console.log("finishTime", finishTime);
			var format =
				startIntervalTime.format(outputFormat) +
				"-" +
				endIntervalTime.format(outputFormat);
			//var format = startIntervalTime.format(outputFormat);
			intervals.push(format);
			startIntervalTime.add(dif, "ms");
			endIntervalTime.add(dif, "ms");
		}
		return intervals;
	};
	console.log("avail", availbleTime);
	//   const timearray = getIntervalDates(
	//     "09:00to17:00",
	//     availbleTime === undefined ? 20 : availbleTime
	//   );
	//   console.log("naresh", timearray);

	const [date1, setDate] = useState("");
	const [tempArray, setTempArray] = useState([]);
	const [timearray, setTimeArray] = useState([]);
	const [lateFeesTimeArray, setLateFeesTimeArray] = useState([]);

	const onChangeDate = (date) => {
		setId([]);
		setId1([]);
		setFilteredAppt([]);
		setTempArray([]);
		let l = new Date(date.target.value);
		console.log(l);
		setDate(date.target.value);
		if (workingDaysArray.includes(l.toString().split(" ")[0])) {
			(async function () {
				var c = await UserServices.GetUserSettingsById(params.id);
				var a = c.userSettingsByUserID.calendar[0];
				console.log("settings", a);
				var v = a.days.split("|");
				var w = a.latefeesamount.split("|");
				if (a.latefeesamount !== "") {
					w.forEach((e) => {
						var b = e.split("-");
						console.log(b[0], l.toString().split(" ")[0]);
						if (b[0] === l.toString().split(" ")[0]) {
							v.forEach((ele) => {
								var a = ele.split("-");

								if (a[0] === l.toString().split(" ")[0]) {
									const t = getIntervalDates(
										a[1],
										availbleTime === undefined ? 20 : availbleTime
									);
									console.log(t);
									setTimeArray(t);
									const lateFeeTime = moment(a[1].split("to")[1], "HH:mm")
										.add(-1, "hour")
										.valueOf();
									console.log(lateFeeTime);

									let l = [];

									t.forEach((e) => {
										console.log(
											e,
											moment(e.split("-")[0], "HH:mm").valueOf(),
											lateFeeTime
										);
										if (
											lateFeeTime <= moment(e.split("-")[0], "HH:mm").valueOf()
										) {
											l.push(e.split("-")[0]);
										}
									});
									console.log(l);
									setLateFeesTimeArray(l);
								}
							});
						} else {
							v.forEach((ele) => {
								var a = ele.split("-");
								console.log(a[1]);
								if (a[0] === l.toString().split(" ")[0]) {
									const t = getIntervalDates(
										a[1],
										availbleTime === undefined ? 20 : availbleTime
									);
									setTimeArray(t);
								}
							});
						}
					});
				}
				if (a.latefeesamount === "") {
					v.forEach((ele) => {
						var a = ele.split("-");

						const t = getIntervalDates(
							a[1],
							availbleTime === undefined ? 20 : availbleTime
						);
						setTimeArray(t);
					});
				}
			})();
			setDisableStartTime(false);
			var catearr = props.appointments.forEach(function (elem) {
				if (elem.status === "Accepted") {
					if (
						elem.appointmentdate.split("T")[0].split("-")[1] ===
							date.target.value.split("T")[0].split("-")[1] &&
						elem.appointmentdate.split("T")[0].split("-")[2] ===
							date.target.value.split("T")[0].split("-")[2]
					) {
						if (!id.includes(elem._id)) {
							tempArray.push(elem.starttime);
							id.push(elem._id);
						}
					}
				}
				if (elem.cstatus === "Accepted") {
					if (
						elem.consultationdate.split("T")[0].split("-")[1] ===
							date.target.value.split("T")[0].split("-")[1] &&
						elem.consultationdate.split("T")[0].split("-")[2] ===
							date.target.value.split("T")[0].split("-")[2]
					) {
						if (!id1.includes(elem._id)) {
							tempArray.push(elem.cstarttime);
							id1.push(elem._id);
						}
					}
				}
			});
		} else {
			setStartTime("Start Time");
			setEndTime("");
			setDisableStartTime(true);
			setShowAlert(true);
			setShow(false);
		}

		console.log("block", tempArray);
		setFilteredAppt(tempArray);
	};

	const popover = (
		<Popover
			id="popover-basic"
			style={{ maxWidth: "518px" }}
			positionLeft={700}
		>
			<Popover.Body>
				<div
					style={{
						backgroundColor: "#FFFFFF",
						width: "400px",
						height: "240px",
						borderRadius: "10px",
					}}
				>
					<div
						className="row"
						style={{
							overflowY: "scroll",
							display: "flex",
							flexDirection: "row",
							flexWrap: "wrap",
							justifyContent: "start",
							height: "238px",
							overflowY: "scroll",
							alignContent: "flex-start",
						}}
					>
						{timearray.map((time) => {
							return (
								<div style={{ width: "100px", padding: "2px" }}>
									<button
										style={{
											width: "95px",
											height: "35px",
											borderRadius: "40px",
											backgroundColor: filteredAppt.includes(time.split("-")[0])
												? "#F4F4F4"
												: "#fff",
											border: filteredAppt.includes(time.split("-")[0])
												? "none"
												: lateFeesTimeArray.includes(time.split("-")[0])
												? "1px solid red"
												: "1px solid #000000",
										}}
										onClick={(e) => handler(time)}
										disabled={
											filteredAppt.includes(time.split("-")[0]) ? true : false
										}
									>
										{filteredAppt.includes(time.split("-")[0]) ? (
											<label
												style={{
													textDecorationLine: "line-through",
													textDecorationStyle: "solid",
													color: "#ACACAC",
													fontFamily: "Mulish",
												}}
												className="fm-w4-s14"
											>
												{time.split("-")[0]}
											</label>
										) : (
											<label className="fm-w4-s14"> {time.split("-")[0]}</label>
										)}
									</button>
								</div>
							);
						})}
					</div>
				</div>
			</Popover.Body>
		</Popover>
	);

	const Reschedule = () => {
		// console.log(startTime,endTime,date1)
		if (type === "consultation") {
			(async function anyNameFunction() {
				console.log("end..", startTime, endTime, date1);

				const updateSettingsvariables =
					PatientServices.returnUpdateAppointments({
						id: props.reschedule._id,
						consultationdate: date1,
						cstarttime: startTime,
						cendtime: endTime,
					});
				console.log("lok", updateSettingsvariables);
				PatientServices.UpdatePatientAppointment(updateSettingsvariables).then(
					(value) => {
						console.log(value);
						sendRescheduleEmailNotification(
							props.reschedule.patient_details[0].firstName,
							props.reschedule.patient_details[0].email,
							props.reschedule.doctor_details[0].firstName,
							format(
								new Date(props.reschedule.consultationdate.split("T")[0]),
								"do MMM yyyy"
							) +
								// props.reschedule.consultationdate.split("T")[0] +
								" from " +
								props.reschedule.cstarttime +
								" - " +
								props.reschedule.cendtime,
							format(new Date(date1), "do MMM yyyy") +
								" from " +
								startTime +
								" - " +
								endTime,
							props.reschedule.consultationtype
						);
						let doctordata = {
							senddata: {
								audience: {
									android_channel:
										props.reschedule.doctor_details[0].channelid.split("|"),
								},
								notification: {
									alert:
										"The " +
										props.reschedule.doctor_details[0].firstName +
										" confirms the new appoint date and time. ie from " +
										format(
											new Date(props.reschedule.consultationdate.split("T")[0]),
											"do MMM yyyy"
										) +
										// props.reschedule.consultationdate.split("T")[0] +
										" from " +
										props.reschedule.cstarttime +
										" - " +
										props.reschedule.cendtime +
										" to " +
										format(new Date(date1), "do MMM yyyy") +
										" from " +
										startTime +
										" - " +
										endTime,
								},
								device_types: ["android"],
							},
							role: "doctor",
						};
						let patientdata = {
							senddata: {
								audience: {
									android_channel:
										props.reschedule.patient_details[0].channelid.split("|"),
								},
								notification: {
									alert:
										"The " +
										props.reschedule.doctor_details[0].firstName +
										" confirms the new appoint date and time. ie from " +
										format(
											new Date(props.reschedule.consultationdate.split("T")[0]),
											"do MMM yyyy"
										) +
										// props.reschedule.consultationdate.split("T")[0] +
										" from " +
										props.reschedule.cstarttime +
										" - " +
										props.reschedule.cendtime +
										" to " +
										format(new Date(date1), "do MMM yyyy") +
										" from " +
										startTime +
										" - " +
										endTime,
									// alert: "Hi naresh bro",
								},
								device_types: ["android"],
							},
							role: "patient",
						};
						SendTestNotification(doctordata).then((res) => {
							SendTestNotification(patientdata).then((res) => {
								window.location.reload();
							});
						});

						// toast.success("Successfully record saved", {
						// 	toastId: "calender",
						// 	position: "top-right",
						// 	autoClose: 5000,
						// 	hideProgressBar: false,
						// 	closeOnClick: true,
						// 	pauseOnHover: true,
						// 	draggable: true,
						// 	progress: undefined,
						// });
						// window.scrollTo(0, 0);
						// setTimeout(() => {
						// 	setIstoastg(false);
						// }, 5000);
					}
				);
			})();
		} else {
			(async function anyNameFunction() {
				console.log("end..", startTime, endTime, date1);

				const updateSettingsvariables =
					PatientServices.returnUpdateAppointments({
						id: props.reschedule._id,
						appointmentdate: date1,
						starttime: startTime,
						endtime: endTime,
					});
				console.log("lok", updateSettingsvariables);
				PatientServices.UpdatePatientAppointment(updateSettingsvariables).then(
					(value) => {
						console.log(value);
						sendRescheduleEmailNotification(
							props.reschedule.patient_details[0].firstName,
							props.reschedule.patient_details[0].email,
							props.reschedule.doctor_details[0].firstName,
							format(
								new Date(props.reschedule.appointmentdate.split("T")[0]),
								"do MMM yyyy"
							) +
								" from " +
								props.reschedule.starttime +
								" - " +
								props.reschedule.endtime,
							format(new Date(date1), "do MMM yyyy") +
								" from " +
								startTime +
								" " +
								"-" +
								" " +
								endTime
						);
						let doctordata = {
							senddata: {
								audience: {
									android_channel:
										props.reschedule.doctor_details[0].channelid.split("|"),
								},
								notification: {
									alert:
										"The " +
										props.reschedule.doctor_details[0].firstName +
										" confirms the new appoint date and time. ie from " +
										format(
											new Date(props.reschedule.appointmentdate.split("T")[0]),
											"do MMM yyyy"
										) +
										" from " +
										props.reschedule.starttime +
										" - " +
										props.reschedule.endtime +
										" to " +
										format(new Date(date1), "do MMM yyyy") +
										" from " +
										startTime +
										" - " +
										endTime,
								},
								device_types: ["android"],
							},
							role: "doctor",
						};
						let patientdata = {
							senddata: {
								audience: {
									android_channel:
										props.reschedule.patient_details[0].channelid.split("|"),
								},
								notification: {
									alert:
										"The " +
										props.reschedule.doctor_details[0].firstName +
										" confirms the new appoint date and time. ie from " +
										format(
											new Date(props.reschedule.appointmentdate.split("T")[0]),
											"do MMM yyyy"
										) +
										" from " +
										props.reschedule.starttime +
										" - " +
										props.reschedule.endtime +
										" to " +
										format(new Date(date1), "do MMM yyyy") +
										" from " +
										startTime +
										" - " +
										endTime,
								},
								device_types: ["android"],
							},
							role: "patient",
						};
						SendTestNotification(doctordata).then((res) => {
							SendTestNotification(patientdata).then((res) => {
								window.location.reload();
							});
						});
						// toast.success("Successfully record saved", {
						// 	toastId: "calender",
						// 	position: "top-right",
						// 	autoClose: 5000,
						// 	hideProgressBar: false,
						// 	closeOnClick: true,
						// 	pauseOnHover: true,
						// 	draggable: true,
						// 	progress: undefined,
						// });
						// window.scrollTo(0, 0);
						// setTimeout(() => {
						// 	setIstoastg(false);
						// }, 5000);
					}
				);
			})();
		}
	};

	return (
		<>
			<Modal
				show={showAlert}
				onHide={handleCloseAlert}
				size="sm"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<div
					style={{
						height: "100px",
						padding: "10px 10px",
						fontFamily: "Mulish",
						fontStyle: "normal",
						fontWeight: "500",
						fontSize: "16px",
					}}
				>
					Looks like this time or date is not available for appointment or
					consultation
				</div>
				<div
					style={{ textAlign: "end", padding: "10px 10px" }}
					onClick={() => {
						setShowAlert(false);
						setShow(true);
					}}
				>
					<button
						style={{
							alignContent: "center",
							borderRadius: "30px",
							width: "50px",
							height: "35px",
							color: "#fff",
							fontWeight: "600",
							fontSize: "20px",
							lineHeight: "150%",
							background: "#000",
						}}
					>
						Ok
					</button>
				</div>
			</Modal>
			<Modal
				show={show}
				onHide={handleClose}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<div className="row" style={{}}>
					<div
						className="col-3"
						style={{
							background: "#F4F4F4",
							borderTopLeftRadius: "10px",
							borderBottomLeftRadius: "10px",
						}}
					>
						<div className="row" style={{ paddingTop: "500px" }}>
							<div className="col-2"></div>

							<div
								className="col-8"
								style={{
									fontFamily: "Mulish",
									fontStyle: "normal",
									fontWeight: "500",
									fontSize: "16px",
									lineHeight: "20px",
									color: "#000000",
								}}
							>
								<img
									src="images/alert 1.png"
									style={{ width: "40px", height: "40px" }}
								></img>
								<br />
								<br />
								If you want to reschedule the appointment, we recommend you to
								connect and notify your patient first.
							</div>
						</div>
					</div>

					<div className="col-9 pt-4">
						<div className="row">
							<div className="col-10"></div>
							<div
								className="col-1"
								onClick={handleClose}
								style={{ cursor: "pointer" }}
							>
								<img
									src="images/close.png"
									style={{ width: "24px", height: "24px" }}
								></img>
							</div>
						</div>
						<div className="col-9">
							<div className="row">
								<h3
									style={{
										paddingLeft: "80px",
										paddingTop: "20px",
										fontWeight: "700",
										fontSize: "40px",
										lineHeight: "50px",
									}}
								>
									Reschedule Appointment/Consultation
								</h3>
							</div>
							<div
								className="row fm-w4-s12"
								style={{
									paddingLeft: "80px",
									paddingTop: "5px",
									fontFamily: "mulish",
									lineHeight: "15px",
								}}
							>
								<div className="row">
									<div
										className="col-4"
										style={{
											paddingLeft: 0,
										}}
									>
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
									<div
										className="col"
										style={{
											paddingBottom: "3px",
										}}
									>
										{/* <label
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
                  </label> */}
										&nbsp;&nbsp;
										<label className="f-fm fm-w4-s12 color-7">
											{props.reschedule.consultationdate &&
												props.reschedule.consultationdate.split("T")[0]}
											&nbsp;&nbsp;
											{props.reschedule.cstarttime}
											&nbsp;&nbsp;
											{props.reschedule.cendtime}
										</label>
									</div>
								</div>

								<div className="row">
									<div
										className="col-4"
										style={{
											paddingLeft: 0,
										}}
									>
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
									<div
										className="col"
										style={{
											paddingBottom: "3px",
										}}
									>
										{/* <label
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
                  </label> */}
										&nbsp;&nbsp;
										<label className="f-fm fm-w4-s12 color-7">
											{props.reschedule.appointmentdate.split("T")[0]}
											&nbsp;&nbsp;
											{props.reschedule.starttime}
											&nbsp;&nbsp;
											{props.reschedule.endtime}
										</label>
									</div>
								</div>
							</div>

							<div
								className="row"
								style={{
									paddingLeft: "80px",
									paddingTop: "13px",
								}}
							>
								<hr></hr>
							</div>
							<div
								className="row fm-w5-s14"
								style={{
									paddingLeft: "80px",
									paddingTop: "10px",
									color: "777777",
								}}
							>
								Select new date of your appointment
							</div>
							<div
								className="col-12"
								style={{
									paddingLeft: "70px",
									paddingTop: "10px",
								}}
							>
								<input
									style={{
										height: "50px",
										width: "100%",
										backgroundColor: "#fff",
										borderRadius: "10px",
										border: "none",
										boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.15)",
									}}
									type="date"
									value={date1}
									onChange={(e) => {
										onChangeDate(e);
										lateFeesTimeArray.length = 0;
									}}
									min={moment().format("YYYY-MM-DD")}
								/>
							</div>
							<div className="row">
								<div
									className="col-7"
									style={{
										display: "flex",
										alignItems: "center",
									}}
								>
									<div
										className="row fm-w5-s14"
										style={{ paddingLeft: "80px", paddingTop: "20px" }}
									>
										Select new Time of your appointment
									</div>
								</div>
								<div className="col-2">
									<div
										style={{
											width: "100px",
											padding: "2px",
											paddingTop: "20px",
										}}
									>
										<button
											style={{
												width: "95px",
												height: "30px",
												borderRadius: "40px",
												backgroundColor: "#fff",
												border: "1px solid #000000",
											}}
										>
											Normal
										</button>
									</div>
								</div>
								<div className="col pl-2">
									<div
										style={{
											width: "100px",
											padding: "2px",
											paddingTop: "20px",
										}}
									>
										<button
											style={{
												width: "95px",
												height: "30px",
												borderRadius: "40px",
												backgroundColor: "#fff",
												border: "1px solid red",
											}}
										>
											Late fee
										</button>
									</div>
								</div>
							</div>

							<div
								className="row"
								style={{ paddingLeft: "80px", paddingTop: "20px" }}
							>
								<OverlayTrigger
									trigger="click"
									rootClose
									placement="bottom-start"
									overlay={popover}
								>
									<button
										style={{
											width: "200px",
											height: "50px",
											borderRadius: "10px",
											backgroundColor: "#fff",
											border: "none",
											boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.15)",
											textAlign: "left",
										}}
										disabled={disableStartTime}
									>
										{startTime}
									</button>
								</OverlayTrigger>

								{/* <select
                  style={{
                    width: "200px",
                    height: "50px",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    border: "none",
                    boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.15)",
                  }}
                  onChange={(val) => handler(val.target.value)}
                >
                  <option value="Start time">Start time</option>
                  <option value="10:00AM">10:00AM</option>
                  <option value="11:00AM">11:00AM</option>
                  <option value="1:00PM">1:00PM</option>
                  <option value="2:00PM">2:00PM</option>
                </select> */}
								{/* <input
                  type="text"
                  style={{
                    width: "200px",
                    height: "50px",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    border: "none",
                    boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.15)"
                  }}
                /> */}
								<div className="col-2 fm-w5-s12" style={{ paddingTop: "15px" }}>
									....60 mins..
								</div>
								<input
									type="text"
									placeholder="End time"
									disabled
									value={endTime}
									style={{
										width: "200px",
										height: "50px",
										borderRadius: "10px",
										backgroundColor: "#F4F4F4",
										border: "none",
									}}
								/>
							</div>
							<div
								className="row fm-w5-s14"
								style={{
									paddingTop: "40px",
									paddingLeft: "80px",
								}}
							>
								Add an optional notification for your patient
							</div>
							<div
								className="row"
								style={{
									paddingLeft: "80px",
									paddingTop: "10px",
									paddingBottom: "40px",
								}}
							>
								<textarea
									style={{
										borderRadius: "10px",
										border: "1px solid #ACACAC",
									}}
									type="text"
									rows={5}
								/>
							</div>
						</div>
						<hr className="col-12"></hr>
						<div className="col-9">
							<div
								style={{ paddingLeft: "70px", paddingBottom: "20px" }}
								className="row"
							>
								<div className="col-5">
									<button
										style={{
											alignContent: "center",
											borderRadius: "30px",
											width: "184px",
											height: "60px",
											background: "white",
											fontWeight: "600",
											fontSize: "20px",
											lineHeight: "150%",
										}}
										onClick={handleClose}
									>
										Cancel
									</button>
								</div>

								<div className="col-7" style={{ paddingLeft: "30px" }}>
									<button
										style={{
											alignContent: "center",
											borderRadius: "30px",
											width: "267px",
											height: "60px",
											fontWeight: "600",
											fontSize: "20px",
											lineHeight: "150%",
											border: "none",
											color: "white",
											fontFamily: "mulish",
											backgroundColor:
												(date1 && endTime) !== "" ? "black" : "grey",
										}}
										disabled={(date1 && endTime) !== "" ? false : true}
										className="fm-w6-s20"
										onClick={Reschedule}
									>
										Reschedule
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default Example;
