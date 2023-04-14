import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import * as utils from "../../common/util";
// import { Scheduler } from "@aldabil/react-scheduler";
import { Animated } from "react-animated-css";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tabs";
// import Reschedule from "./reschedule";
import Month from "./month";
import CalendarSetting from "./calendarsetting";
import Weeks from "./week";
import * as UserServices from "../../services/user";
import Legend from "./legend";
import * as PatientServices from "../../services/patient";
import * as TreatmentServices from "../../services/treatments";

const Appointments = (props) => {
	const params = useLocation().state;
	console.log("props", params);
	const [appointments, setAppointments] = useState([]);
	const [initialAppointments, setInitialAppointments] = useState([]);
	const myRefnamew = useRef(null);
	const myRefnamem = useRef(null);
	const [selectedOption, setSelectedOption] = useState("");
	const navigate = useNavigate();

	const [state, setState] = useState({
		page: "profile",
		mpage: "appointments",
	});

	const calculate_age = (dob1) => {
		var today = new Date();
		var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
		var age_now = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age_now--;
		}
		console.log("age", age_now);
		return age_now;
	};

	const minutes = 60;
	const [firstCell] = useState([1, 2, 3, 4, 5, 6, 7]);
	const [tdate, setTdate] = useState("");
	const [fullMonth, setFullMonth] = useState([]);
	const [enabled, setEnabled] = useState("");
	const [activeTab, setActiveTab] = useState(1);
	const [apatientDetails, setAPatientDetails] = useState([]);
	const [availbleTime, setAvailbleTime] = useState();
	const [calendarStatus, setCalendarStatus] = useState();

	const handleClick = (key) => {
		params["page"] = key;
		console.log("navigatetopage " + params);
		navigate("../profile", { state: params });
		localStorage.setItem("comeFrom", props.page);
	};

	const [requsetApprovalState, setRequestApprovalState] = useState(false);
	const requestApp = (key) => {
		console.log("req", key);
		setRequestApprovalState(key);
	};

	const navigatetopage = (path, obj) => {
		params["page"] = obj;
		console.log("navigatetopage " + path, params);
		navigate(path, { state: params });
	};
	const handler = (event) => {
		const value = event;
		if (value === "5") {
			document.body.click();
			setSelectedOption(value);
		}
	};
	const generate_series = (step) => {
		const dt = new Date(1970, 0, 1);
		const rc = [];
		while (dt.getDate() === 1) {
			rc.push(dt.toLocaleTimeString("en-US").replace(":00", ""));
			dt.setMinutes(dt.getMinutes() + step);
		}
		console.log("rc", rc);
		return rc;
	};
	const timearray = generate_series(60);
	const [tent, setTent] = useState(false);
	const [eal, setEal] = useState();
	const [pendingCount, setPendindCount] = useState();
	const [acceptedCount, setAcceptedCount] = useState();
	const [declineCount, setDeclineCount] = useState();
	useLayoutEffect(() => {
		localStorage.removeItem("comeFrom");
		localStorage.removeItem("preference");
		//(async function anyNameFunction() {
		UserServices.GetUserSettingsById(params.id).then((existUser) => {
			console.log("doctor1", existUser.userSettingsByUserID);
			console.log("doctor", existUser.userSettingsByUserID.calendar[0]);
			setAvailbleTime(existUser.userSettingsByUserID.calendar[0]);
			setCalendarStatus(existUser.userSettingsByUserID.calendar[0].status);
			UserServices.GetAppointment(params.id).then((patient) => {
				var arr = [{ obj1: 1 }, { obj2: 2 }];
				let clone = JSON.parse(JSON.stringify(patient.data));
				console.log(clone);
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
						if (
							ele.iscompleted === "false" &&
							ele.isdoctorcheckedin === "true"
						) {
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
				console.log("patient11", new_array);
				setAPatientDetails(new_array);
				setInitialAppointments(new_array);

				var earr = new_array.filter(function (elem) {
					console.log("elem", elem);
					return (
						(elem.consultationtype === "appointment" &&
							elem.status === "Pending") ||
						(elem.consultationtype === "consultation" &&
							elem.cstatus === "Pending")
					);
				});
				console.log("noti", earr);

				setEal(earr.length);

				var pendingCnt = new_array.filter(function (elem) {
					console.log("elem", elem);

					return (
						(elem.consultationtype === "appointment" &&
							elem.status === "Pending") ||
						(elem.consultationtype === "consultation" &&
							elem.cstatus === "Pending")
					);
				});

				setPendindCount(pendingCnt.length);

				var acceptedCnt = new_array.filter(function (elem) {
					console.log("elem", elem);
					return (
						(elem.consultationtype === "appointment" &&
							elem.status === "Accepted") ||
						(elem.consultationtype === "consultation" &&
							elem.cstatus === "Accepted")
					);
				});

				setAcceptedCount(acceptedCnt.length);

				var declineCnt = new_array.filter(function (elem) {
					console.log("elem", elem);
					return (
						(elem.consultationtype === "appointment" &&
							elem.status === "Decline") ||
						(elem.consultationtype === "consultation" &&
							elem.cstatus === "Decline")
					);
				});

				setDeclineCount(declineCnt.length);

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
				console.log("else", params.page);
				// if (params.page === undefined) {
				// 	handleAppointments(today);
				// } else {
				// 	let tempArray = params.page.split("-");

				// 	handleAppointments(
				// 		tempArray[0] + " " + tempArray[1] + " " + tempArray[2]
				// 	);
				// }

				if (params.page === undefined) {
					// alert(today);
					handleAppointments(today);
				} else {
					setRequestApprovalState(true);
				}

				var d = new Date();
				// d = new Date(d.getFullYear(), d.getMonth(), 1);
				// var month;
				// function setMonth() {
				// 	month = [];
				// 	for (
				// 		var i = 1;
				// 		i < new Date(d.getFullYear(), d.getMonth(), 0).getDate() + 1;
				// 		i++
				// 	) {
				// 		var _d = new Date(d);
				// 		month[i - 1] = new Date(_d.setDate(_d.getDate() - _d.getDay() + i));
				// 	}
				// }

				// setMonth();

				// let monthss = [];
				// month.forEach((element) => {
				// 	monthss.push(new Date(element).toString());
				// });

				// setFullMonth(monthss);
				var monthIndex = d.getMonth(); // 0..11 instead of 1..12
				var names = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
				var date = new Date(d.getFullYear(), monthIndex, 1);
				var result = [];
				while (date.getMonth() == monthIndex) {
					// result.push(date.getDate() + "-" + names[date.getDay()]);
					result.push(date.toString());
					date.setDate(date.getDate() + 1);
				}
				console.log("newdates", result);
				setFullMonth(result);
			});
		});
	}, [params]);

	const handleAppointments = (date) => {
		let l = new Date(date);
		// alert("date $ " + date);
		let curr = new Date(date.replace(/\s/gi, "-").replace(/-/g, "/"));
		// let curr = new Date(date.replace(/-/g, "/"));
		// alert("datereplace $ " + date.replace(/\s/gi, "-"));
		let week = [];
		// alert("curr $ " + curr);
		for (let i = 1; i <= 7; i++) {
			let first = curr.getDate() - curr.getDay() + i;
			let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
			week.push(day);
		}
		console.log("week:", week);
		setAppointments(week);
	};

	const [filteredData, setFilteredData] = useState([]);
	const [selectedValue, setSelectedValue] = useState("");
	const [onclickSelectedValue, setOnclickSelectedValue] = useState(true);

	const handleSearch = (value) => {
		setSelectedValue(value);
		setOnclickSelectedValue(true);
		if (value) {
			let data = initialAppointments.filter((el) =>
				el.patient_details[0].memberid
					.toLowerCase()
					.includes(value.toLowerCase())
			);

			let uniqueIds = [
				...new Set(data.map((e) => e.patient_details[0].memberid)),
			];
			console.log("data", uniqueIds);
			setFilteredData(uniqueIds);
		} else {
			setFilteredData([]);
			setAPatientDetails(initialAppointments);
		}
	};

	const handleSearchFilter = (value) => {
		setSelectedValue(value);
		setOnclickSelectedValue(false);
		if (value) {
			let data = initialAppointments.filter((el) =>
				el.patient_details[0].memberid
					.toLowerCase()
					.includes(value.toLowerCase())
			);
			console.log("data", data);

			setAPatientDetails(data);
		} else {
			setAPatientDetails(initialAppointments);
		}
	};

	const handleApprovalState = () => {
		setRequestApprovalState(false);
		let today = new Date();
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
		handleAppointments(today);
	};

	const onChangeDate = (date) => {
		let tempArray = date.target.value.split("-");
		console.log(
			"temparray",
			tempArray[0] + " " + tempArray[1] + " " + tempArray[2]
		); //always log "1970-01-01"
		let l = new Date(tempArray[0] + " " + tempArray[1] + " " + tempArray[2]);
		let curr = new Date(tempArray[0] + "/" + tempArray[1] + "/" + tempArray[2]);
		let week = [];

		for (let i = 1; i <= 7; i++) {
			let first = curr.getDate() - curr.getDay() + i;
			let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
			week.push(day);
		}
		console.log("week:", week);
		setTdate(tempArray[0] + "-" + tempArray[1] + "-" + tempArray[2]);
		setAppointments(week);
	};

	const [oneDay, setOneDay] = useState(true);
	const dayclick = (date) => {
		let r = date;
		let tempArray = date.split("-");
		let curr = new Date(tempArray[0] + "/" + tempArray[1] + "/" + tempArray[2]);
		let week = [];

		for (let i = 1; i <= 7; i++) {
			let first = curr.getDate() - curr.getDay() + i;
			let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
			week.push(day);
		}
		// console.log("week:", week);
		let week2 = [];
		var catearr = week.forEach(function (elem) {
			if (elem === r) {
				week2.push(elem);
			}
		});
		// console.log(week2);

		if (oneDay) {
			setAppointments(week2);
		} else {
			setAppointments(week);
		}
	};

	const onChangeMonth = (date) => {
		let tempArray = date.target.value.split("-");
		var d = new Date(tempArray[0] + "-" + tempArray[1] + "-" + tempArray[2]);
		// alert("month $" + d);
		// d = new Date(d.getFullYear(), d.getMonth(), 1);
		// var month;
		// function setMonth() {
		// 	month = [];
		// 	for (
		// 		var i = 1;
		// 		i < new Date(d.getFullYear(), d.getMonth(), 0).getDate() + 1;
		// 		i++
		// 	) {
		// 		var _d = new Date(d);
		// 		month[i - 1] = new Date(_d.setDate(_d.getDate() - _d.getDay() + i));
		// 	}
		// }

		// setMonth();

		// console.log(month);
		// let monthss = [];
		// month.forEach((element) => {
		// 	console.log(new Date(element));
		// 	monthss.push(new Date(element).toString());
		// });
		// console.log(monthss.length);
		// setFullMonth(monthss);
		var monthIndex = d.getMonth(); // 0..11 instead of 1..12
		// alert("monthIndex" + monthIndex);
		var names = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
		var date = new Date(d.getFullYear(), monthIndex, 1);
		var result = [];
		while (date.getMonth() == monthIndex) {
			// result.push(date.getDate() + "-" + names[date.getDay()]);
			result.push(date.toString());
			date.setDate(date.getDate() + 1);
		}
		console.log("newdates", result);
		setFullMonth(result);
	};

	const onOptionClicked = (date) => {
		let tempArray = date.split(" ");
		let curr = new Date(tempArray[1] + "-" + tempArray[2] + "-" + tempArray[3]);
		let week = [];

		for (let i = 1; i <= 7; i++) {
			let first = curr.getDate() - curr.getDay() + i;
			let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
			week.push(day);
		}
		console.log("weekj:", week);
		setAppointments(week);

		setTent(true);
		setActiveTab(2);
	};

	const temp = () => {
		setEnabled("Weekly");
		// setTent(false);
		// setActiveTab(1);
	};

	const temp2 = () => {
		setEnabled("Monthly");
		setActiveTab(2);
	};

	const temp3 = (e) => {
		setEnabled("Monthly");
		setActiveTab(1);
		setTent(false);
	};

	const [treatmentDetails, setTreatmentDetails] = useState([]);
	const [tempArray, setTempdArray] = useState([]);
	const [treatments, setTreatments] = useState([]);

	useEffect(() => {
		(async function anyNameFunction() {
			var duplicate = false;
			var defaulttreatments = await TreatmentServices.GetGlobalTreatments();
			// console.log("treatments", defaulttreatments);
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
						// console.log(
						// 	"ts: " +
						// 		j +
						// 		" userid:  " +
						// 		treat.userid +
						// 		" params.id: " +
						// 		params.id +
						// 		" dup: " +
						// 		duplicate
						// );
						// j = j + 1;
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
				// setTreatments(treatments.globaltreatments);
			} else {
				defaulttreatments.globaltreatments.forEach((treat) => {
					treatments.forEach((t) => {
						if (t.photo1 === treat.photo1) {
							duplicate = true;
						}
					});
					// if () {
					if (
						treat.assigneddoctors.length > 0 &&
						treat.assigneddoctors[0].includes(params.id) &&
						!duplicate
					) {
						console.log(treat);
						console.log(treatments);
						// setTreatments((prev) => [...prev, treat]);
						treatments.push(treat);
						treatmentDetails.push(treat.treatmentname);
						tempArray.push(treat.id);
						price.push(treat.sellingprice);
					}
					// }
				});
				// setTreatments(treatments.globaltreatments);
			}
			console.log("tttt2", treatments);
			console.log("tttt2d", treatmentDetails);
			console.log("tttt2ta", tempArray);
			console.log("tttt2p", price);
		})();
	}, []);

	const getvalue = (tid) => {
		// (async function anyNameFunction() {
		// 	if (!tempArray.includes(tid)) {
		// 		const existUser = await TreatmentServices.GetTreatmentById(tid);
		// 		console.log("sss", existUser);
		// 		setExistUser(existUser);
		// 		if (!tempArray.includes(tid)) {
		// 			treatmentDetails.push(existUser.treatmentsByID.treatmentname);
		// 			tempArray.push(existUser.treatmentsByID.id);
		// 		}
		// 	}
		// 	// setTreatmentDetails(tempArray)
		// })();

		console.log("loki", treatmentDetails);

		var index = tempArray.indexOf(tid);

		return treatmentDetails[index];
	};

	const [price] = useState([]);
	const [tempArray3, setTempdArray3] = useState([]);
	const getPrice = (tid) => {
		// (async function anyNameFunction() {
		// 	if (!tempArray3.includes(tid)) {
		// 		const existUser = await TreatmentServices.GetTreatmentById(tid);
		// 		console.log("sss", existUser);
		// 		if (!tempArray3.includes(tid)) {
		// 			price.push(existUser.treatmentsByID.sellingprice);
		// 			tempArray3.push(existUser.treatmentsByID.id);
		// 		}
		// 	}
		// 	// setTreatmentDetails(tempArray)
		// })();

		console.log("loki3", price);

		var index = tempArray.indexOf(tid);
		let mul = parseInt(price[index]);
		console.log("mul", mul);

		return mul;
		// <span
		//   style={{
		//     borderRadius: "5px",
		//     color: "#AF805E",
		//     margin: "5px",
		//   }}
		// >
		//   {mul}
		// </span>
	};

	const Remove = (apd, value, type, patientid, doctorid) => {
		UserServices.GetAppointmentOfPatientswithDoctors(patientid, doctorid).then(
			(app) => {
				console.log("length", app.data);
				let firstRecord = false;
				app.data.map((st) => {
					if (st.status === "Accepted" || st.cstatus === "Accepted") {
						firstRecord = true;
					}
				});
				app.data.map((st) => {
					if (
						st.status === "Pending" &&
						st.cstatus === "Pending" &&
						firstRecord === false
					) {
						if (apd !== "") {
							(async function anyNameFunction() {
								console.log("end..", apd);

								const updateSettingsvariables =
									PatientServices.returnUpdateAppointments({
										id: apd,
										status: value,
										cstatus: value,
									});
								console.log("lok", updateSettingsvariables);
								PatientServices.UpdatePatientAppointment(
									updateSettingsvariables
								).then((value) => {
									console.log(value);
									window.location.reload();
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
								});
							})();
						}
					} else {
						if (apd !== "") {
							if (type === "consultation") {
								(async function anyNameFunction() {
									console.log("end..", apd);

									const updateSettingsvariables =
										PatientServices.returnUpdateAppointments({
											id: apd,
											cstatus: value,
										});
									console.log("lok", updateSettingsvariables);
									PatientServices.UpdatePatientAppointment(
										updateSettingsvariables
									).then((value) => {
										console.log(value);
										window.location.reload();
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
									});
								})();
							}
							if (type === "appointment") {
								(async function anyNameFunction() {
									console.log("end..", apd);

									const updateSettingsvariables =
										PatientServices.returnUpdateAppointments({
											id: apd,
											cstatus: value,
											status: value,
										});
									console.log("lok", updateSettingsvariables);
									PatientServices.UpdatePatientAppointment(
										updateSettingsvariables
									).then((value) => {
										console.log(value);
										window.location.reload();
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
									});
								})();
							}
						}
					}
				});
			}
		);
	};

	const [disablecheckeditems, setDisableCheckeditems] = useState([]);
	const [enablecheckeditems, setEnableCheckeditems] = useState([]);
	const [disableallChecked, setDisableAllChecked] = useState(false);
	const handleAllDisableCheckbox = (event) => {
		const { checked } = event.currentTarget;
		setDisableAllChecked(checked);
		if (checked) {
			apatientDetails.forEach((item) => {
				if (
					!disablecheckeditems.includes(item._id) &&
					item.status === "Pending"
					// &&
					// item.assigneddoctors.length > 0
				) {
					setDisableCheckeditems((prev) => [...prev, item._id]);
				}
			});
		} else {
			disablecheckeditems.length = 0;
		}
	};

	const handleDisableCheckbox = (event) => {
		const { checked, value } = event.currentTarget;

		setDisableCheckeditems(
			(prev) =>
				checked ? [...prev, value] : prev.filter((val) => val !== value),
			setDisableAllChecked(false)
		);
	};

	const TreatmentHandler = (active) => {
		var checkeditems =
			active === "Decline" ? disablecheckeditems : enablecheckeditems;

		checkeditems.forEach((item) => {
			const updateSettingsvariables = PatientServices.returnUpdateAppointments({
				id: item,
				status: "Decline",
			});
			console.log("lok", updateSettingsvariables);
			PatientServices.UpdatePatientAppointment(updateSettingsvariables).then(
				(value) => {
					console.log(value);
					window.location.reload();
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
		});

		// window.location.reload();
	};

	return (
		<>
			{availbleTime && (
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
					<div
						style={{
							backgroundColor: "#F9F9FB",
							overflowX: "hidden",

							position: "relative",
							minHeight: "100%",
						}}
					>
						<utils.AeNav
							clinicname={params?.clinicname || params.mpage?.clinicname}
							userid={params?.firstName || params.mpage?.firstName}
							avatar={params?.avatar || params.mpage?.avatar}
							page="appointments"
							goto={navigatetopage}
							params={params.mpage}
						/>

						<div className="row container-fluid dashboard pl-4">
							<div
								style={{
									backgroundColor: "#F9F9FB",
									overflowX: "hidden",

									position: "relative",
									minHeight: "100%",
								}}
							>
								<div className="row">
									<br></br>
									<br></br>
								</div>

								{requsetApprovalState ? (
									<div className="p-60">
										<div
											style={{
												// display: "flex",
												// alignItems: "center",
												cursor: "pointer",
											}}
											onClick={() => handleApprovalState()}
										>
											<span
												className="f-rl fm-w6-s20 color-00"
												style={{
													paddingLeft: "10px",
													// display: "flex",
													// alignItems: "center",
												}}
											>
												<span style={{ paddingTop: "10px" }}>
													<i class="fa fa-solid fa-angle-left"></i>
												</span>

												<span style={{ paddingTop: "5px", paddingLeft: "5px" }}>
													Back to appointments
												</span>
											</span>
											<span>
												{disablecheckeditems.length > 0 && (
													<label style={{ paddingLeft: "20px" }}>
														<button
															style={{ width: "150px", height: "40px" }}
															className="btn-round"
															onClick={() => TreatmentHandler("Decline")}
														>
															<span style={{ color: "#fff" }}>Decline</span>
															&nbsp;
															<label style={{ color: "#fff" }}>
																({disablecheckeditems.length})
															</label>
														</button>
													</label>
												)}
											</span>
										</div>

										<Tabs
											defaultActiveKey="Pending"
											id="profiletab"
											className="list-tab"
										>
											<Tab
												eventKey="profile"
												title={
													"Appointment List (" +
													apatientDetails.length / 2 +
													")"
												}
												disabled
											></Tab>

											<Tab
												eventKey="Pending"
												title={"Pending (" + pendingCount + ")"}
												onClick={temp}
											>
												<div className="table-responsive">
													{" "}
													<table className="col-8 table table-borderless aetable">
														<thead className="f-rl fm-w6-s14 color-AC">
															<tr>
																<th>
																	<div
																		style={{
																			display: "flex",
																			flexDirection: "row",
																			alignContent: "center",
																			// justifyContent: "space-evenly",
																			alignItems: "center",
																			paddingLeft: "25px",
																		}}
																	>
																		<label
																			className="aecontainer"
																			style={{ color: "#ACACAC" }}
																		>
																			Patient Details
																			{/* <input
                                  type="checkbox"
                                  checked={disableallChecked}
                                  onChange={handleAllDisableCheckbox}
                                />
                                <span className="checkmark"></span> */}
																		</label>
																	</div>
																</th>
																<th style={{ color: "#ACACAC" }}>
																	Appointment Type
																</th>
																<th style={{ color: "#ACACAC" }}>
																	Treatment Details
																</th>
																<th style={{ color: "#ACACAC" }}>Status</th>
																<th style={{ color: "#ACACAC" }}>Action</th>
															</tr>
														</thead>
														<tbody>
															{pendingCount == 0 && (
																<tr
																	style={{
																		// textAlign: "center",
																		color: "#000000",
																		fontSize: "25px",
																	}}
																>
																	<td></td>
																	<td></td>
																	<td>No pending found</td>
																	<td></td>
																	<td></td>
																</tr>
															)}
															{apatientDetails.length > 0 &&
																apatientDetails.map(function (i, id) {
																	return (
																		<>
																			{((i.consultationtype ===
																				"consultation" &&
																				i.cstatus === "Pending") ||
																				(i.consultationtype === "appointment" &&
																					i.status === "Pending")) && (
																				<tr
																					key={i}
																					id={"tr" + i}
																					style={{ backgroundColor: "#FFFFFF" }}
																				>
																					<td style={{ width: "48vw" }}>
																						<div
																							style={{
																								display: "flex",
																								flexDirection: "row",
																								alignContent: "center",
																								//   justifyContent: "space-evenly",
																								alignItems: "center",
																								paddingLeft: "30px",
																							}}
																						>
																							{/* <label
                                          className="aecontainer"
                                          style={{ width: "10px" }}
                                        >
                                          <input
                                            type="checkbox"
                                            value={i._id}
                                            checked={disablecheckeditems.some(
                                              (val) => val === i._id
                                            )}
                                            onChange={handleDisableCheckbox}
                                          />
                                          <span className="checkmark"></span>
                                        </label> */}

																							<div
																								style={{
																									display: "flex",
																									flexDirection: "column",
																									alignContent: "center",
																									justifyContent:
																										"space-evenly",
																									alignItems: "flex-start",
																									// paddingLeft: "20px",
																								}}
																							>
																								<div className="row">
																									<div
																										className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2"
																										style={{
																											width: "6vw",
																											display: "flex",
																											alignItems: "center",
																										}}
																									>
																										<img
																											src="images/avatar.png"
																											style={{
																												width: "56px",
																												height: "56px",
																											}}
																											alt="imgfemale"
																										></img>
																									</div>
																									<div className="col-xl-6 col-lg-6 col-md-6 col-xs-6 col-sm-6">
																										<div
																											className="row"
																											style={{
																												marginLeft: "-30px",
																											}}
																										>
																											<div className="col">
																												<label className="f-fm fm-w7-s24 color-00">
																													{
																														i.patient_details[0]
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
																												{i.patient_details[0]
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
																														i.patient_details[0].dob.split(
																															"T"
																														)[0]
																													)}
																												</label>
																											</div>
																											<div className="row">
																												<div className="col">
																													<label
																														className="f-fm fm-w6-s12 color-AC"
																														style={{
																															paddingBottom:
																																"5px",
																														}}
																													>
																														TIME AND LOCATION
																													</label>
																												</div>
																											</div>

																											{i.consultationtype ===
																											"consultation" ? (
																												<div className="row">
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
																																height: "14px",
																															}}
																														>
																															<img
																																style={{
																																	width: "14px",
																																	height:
																																		"14px",
																																	Color:
																																		"#777777",
																																}}
																																src="images/time.png"
																																alt="time"
																															></img>
																														</label>
																														&nbsp;&nbsp;
																														<label className="f-fm fm-w4-s12 color-7">
																															{
																																i.consultationdate.split(
																																	"T"
																																)[0]
																															}
																															&nbsp;&nbsp;
																															{i.cstarttime}
																															&nbsp;&nbsp;
																															{i.cendtime}
																														</label>
																													</div>
																												</div>
																											) : (
																												<div className="row">
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
																																height: "14px",
																															}}
																														>
																															<img
																																style={{
																																	width: "14px",
																																	height:
																																		"14px",
																																	Color:
																																		"#777777",
																																}}
																																src="images/time.png"
																																alt="time"
																															></img>
																														</label>
																														&nbsp;&nbsp;
																														<label className="f-fm fm-w4-s12 color-7">
																															{
																																i.appointmentdate.split(
																																	"T"
																																)[0]
																															}
																															&nbsp;&nbsp;
																															{i.starttime}
																															&nbsp;&nbsp;
																															{i.endtime}
																														</label>
																													</div>
																												</div>
																											)}

																											<div className="row">
																												<div
																													className="col-xl col-lg col-md col-xs col-sm"
																													style={{
																														paddingBottom:
																															"25px",
																														display: "flex",
																														alignItems:
																															"flex-start",
																														justifyContent:
																															"flex-start",
																													}}
																												>
																													<label>
																														<img
																															style={{
																																width: "14px",
																																height: "14px",
																																Color:
																																	"#777777",
																															}}
																															src="images/map.png"
																															alt="map"
																														></img>
																													</label>
																													&nbsp;&nbsp;
																													<label className="f-fm fm-w4-s12 color-7">
																														{
																															i
																																.patient_details[0]
																																.address[0]
																																.line1
																														}
																														&nbsp;
																														{
																															i
																																.patient_details[0]
																																.address[0]
																																.line2
																														}
																														&nbsp;
																														{
																															i
																																.patient_details[0]
																																.address[0]
																																.towncity
																														}
																														&nbsp;
																														{
																															i
																																.patient_details[0]
																																.address[0]
																																.country
																														}
																														&nbsp;
																														{
																															i
																																.patient_details[0]
																																.address[0]
																																.postcode
																														}
																													</label>
																												</div>
																											</div>
																										</div>
																									</div>
																								</div>
																							</div>
																						</div>
																					</td>
																					<td
																						style={{
																							verticalAlign: "middle",
																							width: "25vw",
																						}}
																						className="f-fm fm-w6-s14"
																					>
																						{i.consultationtype ===
																						"appointment"
																							? "Appointment"
																							: "Consultation"}
																					</td>

																					<td
																						style={{
																							verticalAlign: "middle",
																							width: "25vw",
																						}}
																						className="f-fm fm-w4-s14"
																					>
																						{i.treatmentid.map((e) => {
																							return (
																								<>
																									<div className="row">
																										<div
																											className="col"
																											style={{
																												paddingBottom: "3px",
																											}}
																										>
																											<label className="f-fm fm-w6-s16 color-00 treat">
																												{getvalue(e)}
																											</label>
																										</div>
																									</div>
																									<div className="row">
																										<div className="col">
																											<img
																												src="images/injection.png"
																												alt="injection"
																											></img>
																											&nbsp;
																											<label className="f-fm fm-w6-s14 color-00">
																												x{i.finalsyringes}
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
																													i.finalsyringes
																												) * getPrice(e)}
																											</label>
																										</div>
																									</div>
																								</>
																							);
																						})}
																					</td>
																					<td
																						style={{
																							verticalAlign: "middle",
																							width: "25vw",
																						}}
																						className="f-fm fm-w6-s14"
																					>
																						{i.status === "Pending" ||
																						i.cstatus === "Pending"
																							? "Manual accept"
																							: "Auto accept"}
																					</td>
																					<td
																						style={{
																							alignItems: "center",
																							verticalAlign: "middle",
																						}}
																					>
																						<OverlayTrigger
																							trigger="click"
																							rootClose
																							placement="left-start"
																							overlay={
																								<Popover
																									id="popover-basic"
																									style={{
																										height: "106px",
																										width: "200px",
																										backgroundColor:
																											"rgba(0, 0, 0, 0.8)",
																										borderRadius: "10px",
																									}}
																								>
																									<Popover.Body
																										style={{
																											padding: "0px 0px",
																										}}
																									>
																										<div
																											style={{
																												color:
																													"rgba(255, 255, 255, 0.8)",
																												paddingTop: "20px",
																												paddingLeft: "20px",
																												cursor: "pointer",
																											}}
																											className="f-fm fm-w4-s14"
																											onClick={() => {
																												Remove(
																													i._id,
																													"Accepted",
																													i.consultationtype,
																													i.patientid,
																													i.doctorid
																												);
																											}}
																										>
																											Accept
																										</div>
																										<div
																											style={{
																												color:
																													"rgba(255, 255, 255, 0.8)",
																												paddingTop: "20px",
																												paddingLeft: "20px",
																												cursor: "pointer",
																											}}
																											onClick={() => {
																												Remove(
																													i._id,
																													"Decline",
																													i.consultationtype,
																													i.patientid,
																													i.doctorid
																												);
																											}}
																										>
																											Decline
																										</div>
																									</Popover.Body>
																								</Popover>
																							}
																							style={{ alignItems: "end" }}
																						>
																							<img
																								src="./images/Group210.png"
																								alt="avatar"
																								style={{ cursor: "pointer" }}
																							></img>
																						</OverlayTrigger>
																					</td>
																				</tr>
																			)}
																		</>
																	);
																})}
														</tbody>
													</table>
												</div>
											</Tab>

											<Tab
												eventKey="Accepted"
												title={"Accepted (" + acceptedCount + ")"}
												onClick={temp}
											>
												<div className="table-responsive">
													<table className="col-8 table table-borderless aetable">
														<thead className="f-rl fm-w6-s14 color-AC">
															<tr>
																<th>
																	<div
																		style={{
																			display: "flex",
																			flexDirection: "row",
																			alignContent: "center",
																			// justifyContent: "space-evenly",
																			alignItems: "center",
																			paddingLeft: "25px",
																		}}
																	>
																		<label
																			className="aecontainer"
																			style={{ color: "#ACACAC" }}
																		>
																			Patient Details
																			{/* <input
                                  type="checkbox"
                                  checked={disableallChecked}
                                  onChange={handleAllDisableCheckbox}
                                />
                                <span className="checkmark"></span> */}
																		</label>
																	</div>
																</th>
																<th style={{ color: "#ACACAC" }}>
																	Appointment Type
																</th>
																<th style={{ color: "#ACACAC" }}>
																	Treatment Details
																</th>
																<th style={{ color: "#ACACAC" }}>Status</th>
															</tr>
														</thead>
														<tbody>
															{acceptedCount == 0 && (
																<tr
																	style={{
																		textAlign: "center",
																		color: "#000000",
																		fontSize: "25px",
																	}}
																>
																	<td></td>
																	<td>No accepted found</td>
																	<td></td>
																	<td></td>
																</tr>
															)}
															{apatientDetails.length > 0 &&
																apatientDetails.map(function (i, id) {
																	return (
																		<>
																			{((i.consultationtype ===
																				"consultation" &&
																				i.cstatus === "Accepted") ||
																				(i.consultationtype === "appointment" &&
																					i.status === "Accepted")) && (
																				<tr
																					key={i}
																					id={"tr" + i}
																					style={{ backgroundColor: "#FFFFFF" }}
																				>
																					<td style={{ width: "48vw" }}>
																						<div
																							style={{
																								display: "flex",
																								flexDirection: "row",
																								alignContent: "center",
																								//   justifyContent: "space-evenly",
																								alignItems: "center",
																								paddingLeft: "30px",
																							}}
																						>
																							{/* <label
                                          className="aecontainer"
                                          style={{ width: "10px" }}
                                        >
                                          <input
                                            type="checkbox"
                                            value={i._id}
                                            checked={disablecheckeditems.some(
                                              (val) => val === i._id
                                            )}
                                            onChange={handleDisableCheckbox}
                                          />
                                          <span className="checkmark"></span>
                                        </label> */}

																							<div
																								style={{
																									display: "flex",
																									flexDirection: "column",
																									alignContent: "center",
																									justifyContent:
																										"space-evenly",
																									alignItems: "flex-start",
																									// paddingLeft: "20px",
																								}}
																							>
																								<div className="row">
																									<div
																										className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2"
																										style={{
																											width: "6vw",
																											display: "flex",
																											alignItems: "center",
																										}}
																									>
																										<img
																											src="images/avatar.png"
																											style={{
																												width: "56px",
																												height: "56px",
																											}}
																											alt="imgfemale"
																										></img>
																									</div>
																									<div className="col-xl-6 col-lg-6 col-md-6 col-xs-6 col-sm-6">
																										<div
																											className="row"
																											style={{
																												marginLeft: "-30px",
																											}}
																										>
																											<div className="col">
																												<label className="f-fm fm-w7-s24 color-00">
																													{
																														i.patient_details[0]
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
																												{i.patient_details[0]
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
																														i.patient_details[0].dob.split(
																															"T"
																														)[0]
																													)}
																												</label>
																											</div>
																											<div className="row">
																												<div className="col">
																													<label
																														className="f-fm fm-w6-s12 color-AC"
																														style={{
																															paddingBottom:
																																"5px",
																														}}
																													>
																														TIME AND LOCATION
																													</label>
																												</div>
																											</div>

																											{i.consultationtype ===
																											"consultation" ? (
																												<div className="row">
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
																																height: "14px",
																															}}
																														>
																															<img
																																style={{
																																	width: "14px",
																																	height:
																																		"14px",
																																	Color:
																																		"#777777",
																																}}
																																src="images/time.png"
																																alt="time"
																															></img>
																														</label>
																														&nbsp;&nbsp;
																														<label className="f-fm fm-w4-s12 color-7">
																															{i.consultationdate &&
																																i.consultationdate.split(
																																	"T"
																																)[0]}
																															&nbsp;&nbsp;
																															{i.cstarttime}
																															&nbsp;&nbsp;
																															{i.cendtime}
																														</label>
																													</div>
																												</div>
																											) : (
																												<div className="row">
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
																																height: "14px",
																															}}
																														>
																															<img
																																style={{
																																	width: "14px",
																																	height:
																																		"14px",
																																	Color:
																																		"#777777",
																																}}
																																src="images/time.png"
																																alt="time"
																															></img>
																														</label>
																														&nbsp;&nbsp;
																														<label className="f-fm fm-w4-s12 color-7">
																															{
																																i.appointmentdate.split(
																																	"T"
																																)[0]
																															}
																															&nbsp;&nbsp;
																															{i.starttime}
																															&nbsp;&nbsp;
																															{i.endtime}
																														</label>
																													</div>
																												</div>
																											)}

																											<div className="row">
																												<div
																													className="col-xl col-lg col-md col-xs col-sm"
																													style={{
																														paddingBottom:
																															"25px",
																														display: "flex",
																														alignItems:
																															"flex-start",
																														justifyContent:
																															"flex-start",
																													}}
																												>
																													<label>
																														<img
																															style={{
																																width: "14px",
																																height: "14px",
																																Color:
																																	"#777777",
																															}}
																															src="images/map.png"
																															alt="map"
																														></img>
																													</label>
																													&nbsp;&nbsp;
																													<label className="f-fm fm-w4-s12 color-7">
																														{
																															i
																																.patient_details[0]
																																.address[0]
																																.line1
																														}
																														&nbsp;
																														{
																															i
																																.patient_details[0]
																																.address[0]
																																.line2
																														}
																														&nbsp;
																														{
																															i
																																.patient_details[0]
																																.address[0]
																																.towncity
																														}
																														&nbsp;
																														{
																															i
																																.patient_details[0]
																																.address[0]
																																.country
																														}
																														&nbsp;
																														{
																															i
																																.patient_details[0]
																																.address[0]
																																.postcode
																														}
																													</label>
																												</div>
																											</div>
																										</div>
																									</div>
																								</div>
																							</div>
																						</div>
																					</td>
																					<td
																						style={{
																							verticalAlign: "middle",
																							width: "25vw",
																						}}
																						className="f-fm fm-w6-s14"
																					>
																						{i.consultationtype ===
																						"appointment"
																							? "Appointment"
																							: "Consultation"}
																					</td>

																					<td
																						style={{
																							verticalAlign: "middle",
																							width: "25vw",
																						}}
																						className="f-fm fm-w4-s14"
																					>
																						{i.treatmentid.map((e) => {
																							return (
																								<>
																									<div className="row">
																										<div
																											className="col"
																											style={{
																												paddingBottom: "3px",
																											}}
																										>
																											<label className="f-fm fm-w6-s16 color-00 treat">
																												{getvalue(e)}
																											</label>
																										</div>
																									</div>
																									<div className="row">
																										<div className="col">
																											<img
																												src="images/injection.png"
																												alt="injection"
																											></img>
																											&nbsp;
																											<label className="f-fm fm-w6-s14 color-00">
																												x{i.finalsyringes}
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
																													i.finalsyringes
																												) * getPrice(e)}
																											</label>
																										</div>
																									</div>
																								</>
																							);
																						})}
																					</td>
																					<td
																						style={{
																							verticalAlign: "middle",
																							width: "25vw",
																						}}
																						className="f-fm fm-w6-s14"
																					>
																						{i.status === "Pending" ||
																						i.cstatus === "Pending"
																							? "Manual accept"
																							: "Auto accept"}
																					</td>
																				</tr>
																			)}
																		</>
																	);
																})}
														</tbody>
													</table>
												</div>
											</Tab>
											<Tab
												eventKey="Decline"
												title={"Declined (" + declineCount + ")"}
												onClick={temp}
											>
												<div className="table-responsive">
													<table className="col-8 table table-borderless aetable">
														<thead className="f-rl fm-w6-s14 color-AC">
															<tr>
																<th>
																	<div
																		style={{
																			display: "flex",
																			flexDirection: "row",
																			alignContent: "center",
																			// justifyContent: "space-evenly",
																			alignItems: "center",
																			paddingLeft: "25px",
																		}}
																	>
																		<label
																			className="aecontainer"
																			style={{ color: "#ACACAC" }}
																		>
																			Patient Details
																			{/* <input
                                  type="checkbox"
                                  checked={disableallChecked}
                                  onChange={handleAllDisableCheckbox}
                                />
                                <span className="checkmark"></span> */}
																		</label>
																	</div>
																</th>
																<th style={{ color: "#ACACAC" }}>
																	Appointment Type
																</th>
																<th style={{ color: "#ACACAC" }}>
																	Treatment Details
																</th>
																<th style={{ color: "#ACACAC" }}>Status</th>
															</tr>
														</thead>
														<tbody>
															{declineCount == 0 && (
																<tr
																	style={{
																		textAlign: "center",
																		color: "#000000",
																		fontSize: "25px",
																	}}
																>
																	<td></td>
																	<td>No declined found</td>
																	<td></td>
																	<td></td>
																</tr>
															)}
															{apatientDetails.length > 0 &&
																apatientDetails.map(function (i, id) {
																	return (
																		<>
																			{((i.consultationtype ===
																				"consultation" &&
																				i.cstatus === "Decline") ||
																				(i.consultationtype === "appointment" &&
																					i.status === "Decline")) && (
																				<tr
																					key={i}
																					id={"tr" + i}
																					style={{ backgroundColor: "#FFFFFF" }}
																				>
																					<td style={{ width: "48vw" }}>
																						<div
																							style={{
																								display: "flex",
																								flexDirection: "row",
																								alignContent: "center",
																								//   justifyContent: "space-evenly",
																								alignItems: "center",
																								paddingLeft: "30px",
																							}}
																						>
																							{/* <label
                                          className="aecontainer"
                                          style={{ width: "10px" }}
                                        >
                                          <input
                                            type="checkbox"
                                            value={i._id}
                                            checked={disablecheckeditems.some(
                                              (val) => val === i._id
                                            )}
                                            onChange={handleDisableCheckbox}
                                          />
                                          <span className="checkmark"></span>
                                        </label> */}

																							<div
																								style={{
																									display: "flex",
																									flexDirection: "column",
																									alignContent: "center",
																									justifyContent:
																										"space-evenly",
																									alignItems: "flex-start",
																									// paddingLeft: "20px",
																								}}
																							>
																								<div className="row">
																									<div
																										className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2"
																										style={{
																											width: "6vw",
																											display: "flex",
																											alignItems: "center",
																										}}
																									>
																										<img
																											src="images/avatar.png"
																											style={{
																												width: "56px",
																												height: "56px",
																											}}
																											alt="imgfemale"
																										></img>
																									</div>
																									<div className="col-xl-6 col-lg-6 col-md-6 col-xs-6 col-sm-6">
																										<div
																											className="row"
																											style={{
																												marginLeft: "-30px",
																											}}
																										>
																											<div className="col">
																												<label className="f-fm fm-w7-s24 color-00">
																													{
																														i.patient_details[0]
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
																												{i.patient_details[0]
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
																														i.patient_details[0].dob.split(
																															"T"
																														)[0]
																													)}
																												</label>
																											</div>
																											<div className="row">
																												<div className="col">
																													<label
																														className="f-fm fm-w6-s12 color-AC"
																														style={{
																															paddingBottom:
																																"5px",
																														}}
																													>
																														TIME AND LOCATION
																													</label>
																												</div>
																											</div>

																											{i.consultationtype ===
																											"consultation" ? (
																												<div className="row">
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
																																height: "14px",
																															}}
																														>
																															<img
																																style={{
																																	width: "14px",
																																	height:
																																		"14px",
																																	Color:
																																		"#777777",
																																}}
																																src="images/time.png"
																																alt="time"
																															></img>
																														</label>
																														&nbsp;&nbsp;
																														<label className="f-fm fm-w4-s12 color-7">
																															{
																																i.consultationdate.split(
																																	"T"
																																)[0]
																															}
																															&nbsp;&nbsp;
																															{i.cstarttime}
																															&nbsp;&nbsp;
																															{i.cendtime}
																														</label>
																													</div>
																												</div>
																											) : (
																												<div className="row">
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
																																height: "14px",
																															}}
																														>
																															<img
																																style={{
																																	width: "14px",
																																	height:
																																		"14px",
																																	Color:
																																		"#777777",
																																}}
																																src="images/time.png"
																																alt="time"
																															></img>
																														</label>
																														&nbsp;&nbsp;
																														<label className="f-fm fm-w4-s12 color-7">
																															{
																																i.appointmentdate.split(
																																	"T"
																																)[0]
																															}
																															&nbsp;&nbsp;
																															{i.starttime}
																															&nbsp;&nbsp;
																															{i.endtime}
																														</label>
																													</div>
																												</div>
																											)}

																											<div className="row">
																												<div
																													className="col-xl col-lg col-md col-xs col-sm"
																													style={{
																														paddingBottom:
																															"25px",
																														display: "flex",
																														alignItems:
																															"flex-start",
																														justifyContent:
																															"flex-start",
																													}}
																												>
																													<label>
																														<img
																															style={{
																																width: "14px",
																																height: "14px",
																																Color:
																																	"#777777",
																															}}
																															src="images/map.png"
																															alt="map"
																														></img>
																													</label>
																													&nbsp;&nbsp;
																													<label className="f-fm fm-w4-s12 color-7">
																														{
																															i
																																.patient_details[0]
																																.address[0]
																																.line1
																														}
																														&nbsp;
																														{
																															i
																																.patient_details[0]
																																.address[0]
																																.line2
																														}
																														&nbsp;
																														{
																															i
																																.patient_details[0]
																																.address[0]
																																.towncity
																														}
																														&nbsp;
																														{
																															i
																																.patient_details[0]
																																.address[0]
																																.country
																														}
																														&nbsp;
																														{
																															i
																																.patient_details[0]
																																.address[0]
																																.postcode
																														}
																													</label>
																												</div>
																											</div>
																										</div>
																									</div>
																								</div>
																							</div>
																						</div>
																					</td>
																					<td
																						style={{
																							verticalAlign: "middle",
																							width: "25vw",
																						}}
																						className="f-fm fm-w6-s14"
																					>
																						{i.consultationtype ===
																						"appointment"
																							? "Appointment"
																							: "Consultation"}
																					</td>

																					<td
																						style={{
																							verticalAlign: "middle",
																							width: "25vw",
																						}}
																						className="f-fm fm-w4-s14"
																					>
																						{i.treatmentid.map((e) => {
																							return (
																								<>
																									<div className="row">
																										<div
																											className="col"
																											style={{
																												paddingBottom: "3px",
																											}}
																										>
																											<label className="f-fm fm-w6-s16 color-00 treat">
																												{getvalue(e)}
																											</label>
																										</div>
																									</div>
																									<div className="row">
																										<div className="col">
																											<img
																												src="images/injection.png"
																												alt="injection"
																											></img>
																											&nbsp;
																											<label className="f-fm fm-w6-s14 color-00">
																												x{i.finalsyringes}
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
																													i.finalsyringes
																												) * getPrice(e)}
																											</label>
																										</div>
																									</div>
																								</>
																							);
																						})}
																					</td>
																					<td
																						style={{
																							verticalAlign: "middle",
																							width: "25vw",
																						}}
																						className="f-fm fm-w6-s14"
																					>
																						Decline
																					</td>
																					{/* <td
                                          style={{
                                            alignItems: "center",
                                            verticalAlign: "middle",
                                          }}
                                        >
                                          <OverlayTrigger
                                            trigger="click"
                                            rootClose
                                            placement="left-start"
                                            overlay={
                                              <Popover
                                                id="popover-basic"
                                                style={{
                                                  height: "106px",
                                                  width: "200px",
                                                  backgroundColor:
                                                    "rgba(0, 0, 0, 0.8)",
                                                  borderRadius: "10px",
                                                }}
                                              >
                                                <Popover.Body
                                                  style={{ padding: "0px 0px" }}
                                                >
                                                  <div
                                                    style={{
                                                      color:
                                                        "rgba(255, 255, 255, 0.8)",
                                                      paddingTop: "20px",
                                                      paddingLeft: "20px",
                                                      cursor: "pointer",
                                                    }}
                                                    className="f-fm fm-w4-s14"
                                                    onClick={() => {
                                                      Remove(i._id, "Accepted");
                                                    }}
                                                  >
                                                    Accept
                                                  </div>
                                                  <div
                                                    style={{
                                                      color:
                                                        "rgba(255, 255, 255, 0.8)",
                                                      paddingTop: "20px",
                                                      paddingLeft: "20px",
                                                      cursor: "pointer",
                                                    }}
                                                    onClick={() => {
                                                      Remove(i._id, "Decline");
                                                    }}
                                                  >
                                                    Decline
                                                  </div>
                                                </Popover.Body>
                                              </Popover>
                                            }
                                            style={{ alignItems: "end" }}
                                          >
                                            <img
                                              src="./images/Group210.png"
                                              alt="avatar"
                                              style={{ cursor: "pointer" }}
                                            ></img>
                                          </OverlayTrigger>
                                        </td> */}
																				</tr>
																			)}
																		</>
																	);
																})}
														</tbody>
													</table>
												</div>
											</Tab>
										</Tabs>
									</div>
								) : (
									<div>
										{activeTab === 1 && (
											<Tabs
												defaultActiveKey={1}
												id="profiletab"
												className="list-tab"
											>
												<Tab eventKey={0} title="Appointments" disabled></Tab>
												<Tab
													eventKey={1}
													title="Weekly"
													onClick={(e) => {
														temp();
													}}
													tabIndex="1"
												>
													<>
														<CalendarSetting
															onChangeDate={onChangeDate}
															tdate={tdate}
															selectedOption={selectedOption}
															handleClick={handleClick}
															requestApp={requestApp}
															noti={eal}
															calendarStatus={calendarStatus}
															search={handleSearch}
															searchFilter={handleSearchFilter}
															svalue={selectedValue}
															onclicksvalue={onclickSelectedValue}
															fdata={filteredData}
														/>
														<Legend></Legend>
														{availbleTime && (
															<Weeks
																appointments={appointments}
																treatments={treatments}
																price={price}
																tempArray={tempArray}
																treatmentDetails={treatmentDetails}
																tdate={tdate}
																setOneDay={setOneDay}
																oneDay={oneDay}
																timearray={timearray}
																firstCell={firstCell}
																dayclick={dayclick}
																availbleTime={availbleTime}
																apatientDetails={apatientDetails}
															/>
														)}
													</>
												</Tab>
												<Tab eventKey={2} title="Monthly">
													<>
														<CalendarSetting
															onChangeDate={onChangeMonth}
															tdate={tdate}
															selectedOption={selectedOption}
															handleClick={handleClick}
															requestApp={requestApp}
															noti={eal}
															calendarStatus={calendarStatus}
															search={handleSearch}
															searchFilter={handleSearchFilter}
															svalue={selectedValue}
															fdata={filteredData}
															onclicksvalue={onclickSelectedValue}
														/>
														<Legend></Legend>
														<Month
															fullMonth={fullMonth}
															onOptionClicked={onOptionClicked}
															onChangeMonth={onChangeMonth}
															appointments={appointments}
															treatments={treatments}
															price={price}
															tempArray={tempArray}
															treatmentDetails={treatmentDetails}
															tdate={tdate}
															setOneDay={setOneDay}
															oneDay={oneDay}
															timearray={timearray}
															firstCell={firstCell}
															dayclick={dayclick}
															availbleTime={availbleTime}
															apatientDetails={apatientDetails}
														/>
													</>
												</Tab>
											</Tabs>
										)}
										{tent && (
											<Tabs
												defaultActiveKey={1}
												id="profiletab"
												className="list-tab"
											>
												<Tab eventKey={0} title="Appointments" disabled></Tab>
												<Tab
													eventKey={1}
													title="Weekly"
													onClick={(e) => {
														temp();
													}}
													tabIndex="1"
												>
													<>
														<CalendarSetting
															onChangeDate={onChangeDate}
															tdate={tdate}
															selectedOption={selectedOption}
															handleClick={handleClick}
														/>
														<Legend></Legend>
														<Weeks
															appointments={appointments}
															tdate={tdate}
															setOneDay={setOneDay}
															oneDay={oneDay}
															timearray={timearray}
															firstCell={firstCell}
															dayclick={dayclick}
															availbleTime={availbleTime}
															//  popover={popover}
															apatientDetails={apatientDetails}
														/>
													</>
												</Tab>
												<Tab
													eventKey={2}
													title="Monthly"
													onClick={(e) => {
														temp3();
													}}
												>
													<>
														<CalendarSetting
															onChangeDate={onChangeMonth}
															tdate={tdate}
															selectedOption={selectedOption}
															handleClick={handleClick}
															search={handleSearch}
														/>
														<Legend></Legend>
														<Month
															fullMonth={fullMonth}
															onOptionClicked={onOptionClicked}
															onChangeMonth={onChangeMonth}
															appointments={appointments}
															tdate={tdate}
															setOneDay={setOneDay}
															oneDay={oneDay}
															timearray={timearray}
															firstCell={firstCell}
															dayclick={dayclick}
															availbleTime={availbleTime}
															apatientDetails={apatientDetails}
														/>
													</>
												</Tab>
											</Tabs>
										)}
									</div>
								)}

								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
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
					</div>
				</Animated>
			)}
			{/* {fullMonth && availbleTime && (

      )} */}
		</>
	);
};

export default Appointments;
{
	/* <OverlayTrigger
                            trigger="click"
                            rootClose
                            placement="right"
                            overlay={popover}

                          >
                            <button style={{padding:"0px 0px"}}>hii</button>
                          </OverlayTrigger> */
}
