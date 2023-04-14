import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Animated } from "react-animated-css";
import MyModal from "../ModalComponent/mymodal";
import * as utils from "../../common/util";
import Overview from "./overview";
import * as UserServices from "../../services/user";
import * as TreatmentServices from "../../services/treatments";
import * as NotificationServices from "../../services/notifications";

const DashBoard = (props) => {
	const firstupdate = useRef(true);
	const firststateupdate = useRef(true);

	const myObject = [
		{
			img: "../images/Group434.png",
			message1: "Manage Your \nSchedule",
			message2: "A simple way to manage your \nappointment and patients.",
		},
		{
			img: "../images/Group422.png",
			message1: "On-demand \nHome Service",
			message2:
				"Consult with patients with live \nvideo, view treatments, and track \nyour orders.",
		},
		{
			img: "../images/Group435.png",
			message1: "Secure and \nSafe Check-in",
			message2:
				"Home service via secure PIN code \nwith Uber-like map tracking.",
		},
	];

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

	const [treatmentDetails, setTreatmentDetails] = useState([]);
	const [tempArray, setTempdArray] = useState([]);
	const [appointments, setAppointments] = useState([]);
	const [sliceStart, setSliceStart] = useState(12);
	const [sliceEnd, setSliceEnd] = useState(15);
	const [tdate, setTdate] = useState(
		new Date().getDate().toString().padStart(2, "0")
	);
	const [treatments, setTreatments] = useState([]);
	const [price] = useState([]);

	var today = new Date();

	useEffect(() => {
		(async function anyNameFunction() {
			var duplicate = false;
			var defaulttreatments = await TreatmentServices.GetGlobalTreatments();
			if (params.isadmin) {
				let i = 1;
				defaulttreatments.globaltreatments.forEach((treat) => {
					// console.log("df: " + i);
					// let j = 1;
					duplicate = false;
					treatments.forEach((t) => {
						if (t.photo1 === treat.photo1) {
							duplicate = true;
						}
					});

					if (treat.userid === params.id && !duplicate) {
						console.log(treat);
						console.log(treatments);
						// setTreatments((prev) => [...prev, treat]);
						treatments.push(treat);
						treatmentDetails.push(treat.treatmentname);
						tempArray.push(treat.id);
						price.push(treat.sellingprice);
					}
					// }
					i = i + 1;
				});
			} else {
				defaulttreatments.globaltreatments.forEach((treat) => {
					treatments.forEach((t) => {
						if (t.photo1 === treat.photo1) {
							duplicate = true;
						}
					});
					if (
						treat.assigneddoctors.length > 0 &&
						treat.assigneddoctors[0].includes(params.id) &&
						!duplicate
					) {
						console.log(treat);
						console.log(treatments);
						treatments.push(treat);
						treatmentDetails.push(treat.treatmentname);
						tempArray.push(treat.id);
						price.push(treat.sellingprice);
					}
				});
			}
			// console.log("tttt2", treatments);
			// console.log("tttt2d", treatmentDetails);
			// console.log("tttt2ta", tempArray);
			// console.log("tttt2p", price);
		})();
	}, []);

	const getvalue = (tid) => {
		var index = tempArray.indexOf(tid);
		return treatmentDetails[index];
	};

	const sliceDecreseValue = () => {
		setSliceStart(sliceStart - 1);
		setSliceEnd(sliceEnd - 1);
	};

	const sliceIncreseValue = () => {
		setSliceStart(sliceStart + 1);
		setSliceEnd(sliceEnd + 1);
	};

	const onChangeDate = () => {
		let l = new Date();
		let curr = new Date();
		let week = [];

		var today = new Date();
		var dd = today.getDate();

		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();
		if (dd < 10) {
			dd = "0" + dd;
		}

		if (mm < 10) {
			mm = "0" + mm;
		}
		today = yyyy + " " + mm + " " + dd;
		setTdate(yyyy + "-" + mm + "-" + dd);

		var d = new Date();

		var monthIndex = d.getMonth(); // 0..11 instead of 1..12
		var names = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
		var date = new Date(d.getFullYear(), monthIndex, 1);
		var result = [];
		while (date.getMonth() == monthIndex) {
			result.push(date.toString());
			date.setDate(date.getDate() + 1);
		}
		// console.log("newdates", result);
		setAppointments(result);
	};

	const getPrice = (tid) => {
		// console.log("555", price);

		var index = tempArray.indexOf(tid);
		let mul = parseInt(price[index]);
		// console.log("mul", mul);

		return mul;
	};

	const [page, setPage] = useState("dashboard");
	const params = useLocation().state;
	const navigate = useNavigate();
	const [dstate, setDstate] = useState({
		params,
	});
	// console.log(dstate);
	const [state, setState] = useState({});
	const [isPageLoaded, setisPageLoaded] = useState(false);
	const [isIntro, setisIntro] = useState(false);
	const [firstTime, setFirstTime] = useState(false);
	const [steps, setSteps] = useState({ step: 0 });
	// console.log(steps);

	useEffect(() => {
		// console.log("user", firstupdate.current);

		if (firstupdate.current) {
			(async function anyNameFunction() {
				var user = await UserServices.GetUserById(params.id);
				// console.log(user.userByID);
				setState(user.userByID);
				const timer = setTimeout(() => {
					setisPageLoaded(true);
					setisIntro(true);
					firstupdate.current = false;
					firststateupdate.current = false;
				}, 2000);
				return () => clearTimeout(timer);
			})();
			if (
				dstate !== undefined &&
				localStorage.getItem("throughsignup") === "true"
			) {
				setFirstTime(true);
			}
		}
	}, []);

	const [appointmentStatus, setAppointmentStatus] = useState();
	const [generalStatus, setGeneralStatus] = useState();
	const [calendarStatus, setCalendarStatus] = useState();
	const [notificationStatus, setNotificationStatus] = useState();
	const [apatientDetails, setAPatientDetails] = useState([]);
	const [initialapatientDetails, setinitialAPatientDetails] = useState([]);
	const [messages, setMessages] = useState([]);

	useLayoutEffect(() => {
		localStorage.removeItem("comeFrom");
		localStorage.removeItem("preference");
		onChangeDate();
		UserServices.GetUserSettingsById(params.id).then((existUser) => {
			// console.log("util", existUser.userSettingsByUserID.appointment[0]);
			setAppointmentStatus(
				existUser.userSettingsByUserID.appointment[0].status
			);
			setGeneralStatus(existUser.userSettingsByUserID.general[0].status);
			setCalendarStatus(existUser.userSettingsByUserID.calendar[0].status);
			setNotificationStatus(
				existUser.userSettingsByUserID.notification[0].status
			);
		});

		NotificationServices.GetNotificationByDoctorid(params.id).then(
			(patient) => {
				// console.log("notificationdata", patient.notificationByDoctorid);
				var earr = patient.notificationByDoctorid.filter(function (elem) {
					return elem.status === "pending";
				});
				setMessages(earr);
			}
		);

		UserServices.GetAppointment(params.id).then((patient) => {
			var arr = [{ obj1: 1 }, { obj2: 2 }];
			let clone = JSON.parse(JSON.stringify(patient.data));
			let newobj = clone.concat(patient.data);
			let previd = [];
			let new_array = newobj.map(function (ele) {
				console.log("iddd", ele._id);
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
					if (
						ele.iscompleted === "false" &&
						ele.isdoctorcheckedin === "" &&
						ele.videourl !== ""
					) {
						cname = "treatmentparked";
						aptdisable = "false";
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
			setinitialAPatientDetails(new_array);

			let curr = new Date();
			let week = [];

			var today = new Date();
			var dd = today.getDate();

			var mm = today.getMonth() + 1;
			var yyyy = today.getFullYear();
			if (dd < 10) {
				dd = "0" + dd;
			}

			if (mm < 10) {
				mm = "0" + mm;
			}
			today = yyyy + " " + mm + " " + dd;
			setTdate(yyyy + "-" + mm + "-" + dd);

			var d = new Date();

			var monthIndex = d.getMonth(); // 0..11 instead of 1..12
			var names = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
			var date = new Date(d.getFullYear(), monthIndex, 1);
			var result = [];
			while (date.getMonth() == monthIndex) {
				// result.push(date.getDate() + "-" + names[date.getDay()]);
				result.push(date.toString());
				date.setDate(date.getDate() + 1);
			}
			// console.log("newdates", result);
			setAppointments(result);

			result.map((e, id) => {
				if (e.split(" ")[2] === dd.toString()) {
					// console.log("index", id);
					setSliceStart(id);
					setSliceEnd(id + 3);
				}
			});

			let dalassigneddoctors = [];
			let elemid = [];

			var doctorearr = new_array.forEach(function (elem) {
				// var dt = new Date(elem.appointmentdate);
				var dt = new Date(
					elem.consultationtype === "appointment"
						? elem.appointmentdate
						: elem.consultationdate
				);
				var year = dt.getFullYear();
				var month = (dt.getMonth() + 1).toString().padStart(2, "0");
				var day = dt.getDate().toString().padStart(2, "0");

				if (
					dd.toString() === day &&
					(elem.status === "Accepted" || elem.cstatus === "Accepted") &&
					month === mm &&
					yyyy === dt.getFullYear()
				) {
					dalassigneddoctors.push(elem);
				}
			});
			setAPatientDetails(dalassigneddoctors);
		});
	}, []);

	const handleAppointments = (date) => {
		let curr = new Date();
		let week = [];

		var today = new Date(date);
		var dd = today.getDate();

		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();
		if (dd < 10) {
			dd = "0" + dd;
		}

		if (mm < 10) {
			mm = "0" + mm;
		}
		today = yyyy + " " + mm + " " + dd;
		setTdate(yyyy + "-" + mm + "-" + dd);

		let dalassigneddoctors = [];
		let elemid = [];

		var doctorearr = initialapatientDetails.forEach(function (elem) {
			// var dt = new Date(elem.appointmentdate);
			var dt = new Date(
				elem.consultationtype === "appointment"
					? elem.appointmentdate
					: elem.consultationdate
			);
			var year = dt.getFullYear();
			var month = (dt.getMonth() + 1).toString().padStart(2, "0");
			var day = dt.getDate().toString().padStart(2, "0");
			console.log("nbh", month, mm);
			if (
				dd.toString() === day &&
				(elem.consultationtype === "appointment"
					? elem.status === "Accepted"
					: elem.cstatus === "Accepted") &&
				month === mm &&
				yyyy === dt.getFullYear()
			) {
				dalassigneddoctors.push(elem);
			}
		});
		setAPatientDetails(dalassigneddoctors);
	};

	const handleClick = (key) => {
		params["page"] = key;
		// console.log("navigatetopage " + params);
		navigate("../profile", { state: params });
		localStorage.setItem("preference", params.page);
	};

	const hideIntro = () => {
		localStorage.removeItem("throughsignup");
		setisIntro(false);
		setFirstTime(false);
	};
	const gotop = (path, obj) => {
		params["page"] = obj;
		// console.log("navigateto ", params);
		navigate(path, { state: params });
	};
	return (
		<>
			<img
				loading="lazy"
				alt=""
				src="../images/intro1.png"
				style={{ display: "none" }}
			></img>
			<img
				loading="lazy"
				src="../images/intro2.png"
				alt=""
				style={{ display: "none" }}
			></img>
			<img
				loading="lazy"
				src="../images/intro3.png"
				alt=""
				style={{ display: "none" }}
			></img>

			{!isPageLoaded && (
				<>
					<Animated
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
						animationIn="slideInDown"
						animationOut="fadeOutDown"
						animationInDuration={1000}
						animationOutDuration={1000}
						isVisible={false}
					>
						<div
							className="coralbg"
							style={{
								position: "relative",
								height: "100%",
								width: "100%",
								minHeight: "100%",
							}}
						></div>
					</Animated>
					<Animated
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
						animationIn="slideInUp"
						animationOut="fadeOutDown"
						animationInDuration={1000}
						animationOutDuration={1000}
						isVisible={true}
					>
						<div
							style={{
								height: "100%",
								position: "relative",
								minHeight: "100%",
								color: "#FFFFFF",
								backgroundColor: "#000000",
								textAlign: "center",
								verticalAlign: "middle",
								display: "table",
							}}
						>
							<div style={{ display: "table-cell", verticalAlign: "middle" }}>
								<img
									// onError={(e) => {
									// 	e.target.src = "../images/avatar.png";
									// }}
									// loading="lazy"
									style={{
										borderRadius: "50%",
										width: "103px",
										height: "103px",
									}}
									src={
										state.avatar +
										"?" +
										today.getHours() +
										today.getMinutes() +
										today.getSeconds()
									}
									alt="avatar"
								></img>
								<br></br>
								<br></br>
								<label className="fm-w7-s37">Welcome {state.firstName}</label>
								<br></br>
								<br></br>
								<label className="fm-w3-s34">
									We are preparing your dashboard one moment please....
								</label>
							</div>
						</div>
					</Animated>
				</>
			)}
			{isPageLoaded && (
				<>
					<Animated
						style={{
							height: "100%",
							bottom: "0px",
							left: "0px",
							display: "grid",
							alignItems: "center",
							minHeight: "100%",
							color: "#FFFFFF",
							textAlign: "center",
							verticalAlign: "middle",
						}}
						animationIn="slideInDown"
						animationOut="fadeOutDown"
						animationInDuration={1000}
						animationOutDuration={1000}
						isVisible={true}
					>
						{firstTime && (
							<MyModal
								show={firstTime}
								data={myObject}
								hideIntro={hideIntro}
								dialogClassName=""
							/>
						)}
						<div
							style={{
								backgroundColor: "#F9F9FB",
								overflowX: "hidden",
								position: "relative",
								minHeight: "100%",
							}}
						>
							<utils.AeNav
								clinicname={state?.clinicname}
								userid={state?.firstName}
								avatar={state?.avatar}
								goto={gotop}
								params={state}
							/>

							{process.env.REACT_APP_TITLE}
							<div className="container-fluid dashboard pl-4">
								<Overview
									params={params}
									myschedule={apatientDetails}
									messages={messages}
									appointmentStatus={appointmentStatus}
									calendarStatus={calendarStatus}
									notificationStatus={notificationStatus}
									generalStatus={generalStatus}
									handleClick={handleClick}
									calculateage={calculate_age}
									getvalue={getvalue}
									getprice={getPrice}
									appointments={appointments}
									tdate={tdate}
									handleAppointments={handleAppointments}
									sliceStart={sliceStart}
									sliceEnd={sliceEnd}
									sliceDecreseValue={sliceDecreseValue}
									sliceIncreseValue={sliceIncreseValue}
								/>
							</div>
							<br></br>
							<br></br>
							<br></br>
							<br></br>
							<br></br>
							<br></br>
						</div>
					</Animated>
				</>
			)}
		</>
	);
};
export default DashBoard;
