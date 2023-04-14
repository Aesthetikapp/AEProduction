import React, { useRef, useState, useEffect } from "react";
import Revenue from "./revenue";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AgeDifference from "./agedifference";
import Locations from "./locations";
import { GetGlobalTreatments } from "../../services/treatments";
import * as UserServices from "../../services/user";
import * as PatientpaymentServices from "../../services/patientpayment";
import * as PatientServices from "../../services/patient";
import Row from "react-bootstrap/Row";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import * as NotificationServices from "../../services/notifications";
import { Baseurl } from "../../common/util";

const axios = require("axios").default;

const Overview = (props) => {
	// console.log("overview props", props);

	// var baseurl1;
	// if (process.env.REACT_APP_HOST === "local") {
	// 	baseurl1 = "http://localhost:3001/";
	// } else if (process.env.REACT_APP_HOST === "123") {
	// 	baseurl1 = "http://123.176.43.187:3004/";
	// } else {
	// 	baseurl1 = window.location.origin + "/api/";
	// }

	var date = new Date();

	// Get year, month, and day part from the date
	var currentyear = date.toLocaleString("default", { year: "numeric" });
	// var currentyear = "2022";
	var currentmonth = date.toLocaleString("default", { month: "2-digit" });
	var currentday = date.toLocaleString("default", { day: "2-digit" });

	// Generate yyyy-mm-dd date string
	var formattedDate = currentday + "-" + currentmonth + "-" + currentyear;
	// console.log("formated", formattedDate);

	const [patientids, setPatientids] = useState([]);
	const [paymentids, setPaymentids] = useState([]);
	const [males, setMales] = useState(0);
	const [females, setFemales] = useState(0);
	const [others, setOthers] = useState(0);
	const [total, setTotal] = useState(0);
	const [totalrevenue, setTotalrevenue] = useState(0);
	const [firstagerange, setFirstagerange] = useState(0);
	const [secondagerange, setSecondagerange] = useState(0);
	const [thirdagerange, setThirdagerange] = useState(0);
	const [fouragerange, setFouragerange] = useState(0);
	const [fiveagerange, setFiveagerange] = useState(0);
	const [sixagerange, setSixagerange] = useState(0);
	const [sold, setSold] = useState([]);
	const [appointments, setAppointments] = useState(props.appointmentDetails);
	const [appointmentids, setAppointmentids] = useState([]);
	const [doctorids, setDoctorids] = useState([]);
	const [paymentDetails, setPaymentDetails] = useState([]);
	const [totalmonths, setTotalmonths] = useState([]);
	const [totalyears, setTotalyears] = useState([]);
	const [totalyearsamount, setTotalyearsamount] = useState([]);
	const [ismonthly, setIsmonthly] = useState(true);
	const [isyearly, setIsyearly] = useState(false);
	const [isdaily, setIsdaily] = useState(false);
	const [dailylabel, setDailylabel] = useState([]);
	const [dailyamount, setDailyamount] = useState([]);
	const [totaldailyamount, setTotaldailyamount] = useState([]);
	const [count, setcount] = useState(0);
	const [first, setFirst] = useState(true);
	const [second, setSecond] = useState(0);
	const [selectedyear, setSelectedyear] = useState(currentyear);
	const [selectedmonth, setSelectedmonth] = useState(currentmonth);
	const [homerevenue, setHomerevenue] = useState(0);
	const [googleApiKey, setGoogleApiKey] = useState("");
	const navigate = useNavigate();

	if (props.patients !== undefined) {
		var pcounts = { mypatients: "0", potentialpatients: "0" };
		var countfiltered = props.patients.filter(function (p) {
			return props.appointmentDetails.filter(function (element) {
				return element.filter(function (e) {
					return p.id === e.patientid ? e.ispaymentdone : "";
				}).length;
			}).length;
		});
		pcounts.mypatients = countfiltered.length;
		pcounts.potentialpatients = props.patients.length - pcounts.mypatients;
	}

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

	const goToAppointmentPage = (key) => {
		navigate("../appointments", { state: params });
	};

	const goToRequestPage = (key) => {
		navigate("../request", { state: params });
	};

	const getqtysold = (id) => {
		var v = "";
		sold.forEach((value, key) => {
			if (key === id) {
				v = value;
			}
		});
		return v;
	};

	const patient_analytics = (id) => {
		UserServices.GetAppointment(id).then((app) => {
			Object.values(app.data).forEach((ids) => {
				if (!appointmentids.includes(ids._id)) {
					setAppointmentids((prev) => [...prev, ids._id]);
				}
				if (!patientids.includes(ids.patientid)) {
					patientids.push(ids.patientid);
					setTotal((prev) => prev + 1);
					if (ids.patient_details[0].gender === "Male") {
						setMales((prev) => prev + 1);
					} else if (ids.patient_details[0].gender === "Female") {
						setFemales((prev) => prev + 1);
					} else {
						setOthers((prev) => prev + 1);
					}

					var age = calculate_age(ids.patient_details[0].dob);
					if (18 <= age && age <= 30) {
						setFirstagerange((prev) => prev + 1);
					}
					if (31 <= age && age <= 35) {
						setSecondagerange((prev) => prev + 1);
					}
					if (36 <= age && age <= 40) {
						setThirdagerange((prev) => prev + 1);
					}
					if (41 <= age && age <= 45) {
						setFouragerange((prev) => prev + 1);
					}
					if (46 <= age && age <= 50) {
						setFiveagerange((prev) => prev + 1);
					}
					if (50 < age) {
						setSixagerange((prev) => prev + 1);
					}
				}
			});
		});
	};

	useEffect(() => {
		setAppointments(props.appointmentDetails);
		const map1 = new Map();
		PatientServices.GetAllAppointments().then(function (result) {
			result.appointment.filter((currentValue, index, arr) => {
				currentValue.treatmentid[0].split(",").forEach((ids, index) => {
					if (map1.has(ids)) {
						map1.set(
							ids,
							parseInt(map1.get(ids)) +
								parseInt(currentValue.finalsyringes.split(",")[index])
						);
					} else {
						map1.set(
							ids,
							parseInt(currentValue.finalsyringes.split(",")[index])
						);
					}
				});
				return map1;
			});
			setSold(map1);
		});
		if (props.params.isadmin) {
			if (first) {
				UserServices.getDoctors(props.params.clinicname).then(function (
					result
				) {
					Object.values(result.data.usersByClinicName).forEach((doctors) => {
						console.log("userid", doctors.id);
						if (!doctorids.includes(doctors.id)) {
							doctorids.push(doctors.id);
							patient_analytics(doctors.id);
						}
					});
				});
				setFirst(false);
			}
		} else {
			patient_analytics(props.params.id);
		}
	}, [props]);

	const handleViewClick = (value) => {
		// console.log("slected", value);

		if (value === "Monthly") {
			setIsmonthly(true);
			setIsyearly(false);
			setIsdaily(false);
		} else if (value === "Yearly") {
			setIsmonthly(false);
			setIsyearly(true);
			setIsdaily(false);
		} else {
			setIsmonthly(false);
			setIsyearly(false);
			setIsdaily(true);
		}
	};

	const handleyearClick = (value) => {
		setSelectedyear(value);
	};

	const handlemonthClick = (value) => {
		setSelectedmonth(parseInt(value));
	};

	const getDays = (year, month) => {
		return new Date(year, month, 0).getDate();
	};

	var monthbackground = [
		"#000000",
		"#000000",
		"#000000",
		"#000000",
		"#000000",
		"#000000",
		"#000000",
		"#000000",
		"#000000",
		"#000000",
		"#000000",
		"#000000",
	];

	var yearbackground = [];
	var dailybackground = [];

	monthbackground[currentmonth - 1] = "#AF805E";
	const monthlabels = [
		{ label: "JAN", value: "1" },
		{ label: "FEB", value: "2" },
		{ label: "MAR", value: "3" },
		{ label: "APR", value: "4" },
		{ label: "MAY", value: "5" },
		{ label: "JUN", value: "6" },
		{ label: "JUL", value: "7" },
		{ label: "AUG", value: "8" },
		{ label: "SEP", value: "9" },
		{ label: "OCT", value: "10" },
		{ label: "NOV", value: "11" },
		{ label: "DEC", value: "12" },
	];

	// console.log("appt ids", appointmentids);

	useEffect(() => {
		var payid = [];
		appointmentids.forEach((app) => {
			PatientpaymentServices.GetPatientpaymentByAppointmentId(app).then(
				(payment) => {
					if (
						!totalyears.includes(
							payment.patientpaymentByAppointmentID[0].date.split("-")[0]
						)
					) {
						totalyears.push(
							payment.patientpaymentByAppointmentID[0].date.split("-")[0]
						);
					}

					if (
						!payid.includes(
							payment.patientpaymentByAppointmentID[0].appointmentid
						)
					) {
						payid.push(payment.patientpaymentByAppointmentID[0].appointmentid);
						setPaymentDetails((prev) => [
							...prev,
							payment.patientpaymentByAppointmentID,
						]);
					}
				}
			);
		});
	}, [appointmentids]);

	totalyears.sort(function (a, b) {
		return a - b;
	});

	useEffect(() => {
		axios({
			url: Baseurl() + "getGoogleApiKey",
			method: "GET",
		})
			.then((res) => {
				setGoogleApiKey(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	var month = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var year = [];

	useEffect(() => {
		setTimeout(() => {
			if (!totalyears.includes(currentyear)) {
				setSelectedyear(totalyears[totalyears.length - 1]);
			} else {
				setSelectedyear(currentyear);
			}
		}, 100);
	}, [paymentDetails]);

	useEffect(() => {
		setTotalrevenue(0);
		setHomerevenue(0);
		setTotaldailyamount([]);
		setTotalmonths([]);
		setTotalyearsamount([]);

		for (var c = 0; c < getDays(selectedyear, selectedmonth); c++) {
			dailylabel[c] = c + 1;
			dailyamount[c] = 0;
		}
		let payment = [];

		paymentDetails.forEach((pay) => {
			if (!payment.includes(pay[0].id)) {
				payment.push(pay[0].id);

				setTotalrevenue((prev) => prev + parseInt(pay[0].amount));
				setHomerevenue(
					(prev) => prev + parseInt(pay[0].amount) - parseInt(pay[0].refund)
				);
				if (
					parseInt(pay[0].date.split("-")[1]) == 1 &&
					parseInt(pay[0].date.split("-")[0]) == selectedyear
				) {
					month[0] = month[0] + parseInt(pay[0].amount);
				} else if (
					parseInt(pay[0].date.split("-")[1]) == 2 &&
					parseInt(pay[0].date.split("-")[0]) == selectedyear
				) {
					month[1] = month[1] + parseInt(pay[0].amount);
				} else if (
					parseInt(pay[0].date.split("-")[1]) == 3 &&
					parseInt(pay[0].date.split("-")[0]) == selectedyear
				) {
					month[2] = month[2] + parseInt(pay[0].amount);
				} else if (
					parseInt(pay[0].date.split("-")[1]) == 4 &&
					parseInt(pay[0].date.split("-")[0]) == selectedyear
				) {
					month[3] = month[3] + parseInt(pay[0].amount);
				} else if (
					parseInt(pay[0].date.split("-")[1]) == 5 &&
					parseInt(pay[0].date.split("-")[0]) == selectedyear
				) {
					month[4] = month[4] + parseInt(pay[0].amount);
				} else if (
					parseInt(pay[0].date.split("-")[1]) == 6 &&
					parseInt(pay[0].date.split("-")[0]) == selectedyear
				) {
					month[5] = month[5] + parseInt(pay[0].amount);
				} else if (
					parseInt(pay[0].date.split("-")[1]) == 7 &&
					parseInt(pay[0].date.split("-")[0]) == selectedyear
				) {
					// console.log(pay[0].amount);
					month[6] = month[6] + parseInt(pay[0].amount);
				} else if (
					parseInt(pay[0].date.split("-")[1]) == 8 &&
					parseInt(pay[0].date.split("-")[0]) == selectedyear
				) {
					month[7] = month[7] + parseInt(pay[0].amount);
				} else if (
					parseInt(pay[0].date.split("-")[1]) == 9 &&
					parseInt(pay[0].date.split("-")[0]) == selectedyear
				) {
					month[8] = month[8] + parseInt(pay[0].amount);
				} else if (
					parseInt(pay[0].date.split("-")[1]) == 10 &&
					parseInt(pay[0].date.split("-")[0]) == selectedyear
				) {
					month[9] = month[9] + parseInt(pay[0].amount);
				} else if (
					parseInt(pay[0].date.split("-")[1]) == 11 &&
					parseInt(pay[0].date.split("-")[0]) == selectedyear
				) {
					month[10] = month[10] + parseInt(pay[0].amount);
				} else if (
					parseInt(pay[0].date.split("-")[1]) == 12 &&
					parseInt(pay[0].date.split("-")[0]) == selectedyear
				) {
					month[11] = month[11] + parseInt(pay[0].amount);
				}
				if (pay[0].date.split("-")[0] === totalyears[0]) {
					year[0] = year[0] + parseInt(pay[0].amount);
				} else if (pay[0].date.split("-")[0] === totalyears[1]) {
					year[1] = year[1] + parseInt(pay[0].amount);
				}
				for (var d = 0; d < dailyamount.length; d++) {
					if (
						selectedmonth == parseInt(pay[0].date.split("-")[1]) &&
						selectedyear == parseInt(pay[0].date.split("-")[0]) &&
						parseInt(dailylabel[d]) == parseInt(pay[0].date.split("-")[2])
					) {
						dailyamount[d] = dailyamount[d] + parseInt(pay[0].amount);
					}
				}
			}
		});

		setTotalmonths(month);
		setTotalyearsamount(year);
		setTotaldailyamount(dailyamount);
	}, [paymentDetails, selectedyear, selectedmonth]);

	const firstupdate = useRef(true);
	const [treatments, setTreatments] = useState([]);

	for (var r = 0; r < dailylabel.length; r++) {
		if (dailylabel[r] === parseInt(currentday)) {
			dailybackground[r] = "#AF805E";
		} else {
			dailybackground[r] = "#000000";
		}
	}

	for (var i = 0; i < totalyears.length; i++) {
		// console.log("enter");
		year[i] = 0;
		if (totalyears[i] === currentyear) {
			yearbackground[i] = "#AF805E";
		} else {
			yearbackground[i] = "#000000";
		}
	}

	useEffect(() => {
		if (firstupdate.current) {
			(async function anyNameFunction() {
				var duplicate = false;
				var defaulttreatments = await GetGlobalTreatments();

				if (params.isadmin) {
					let i = 1;
					defaulttreatments.globaltreatments.forEach((treat) => {
						duplicate = false;
						treatments.forEach((t) => {
							if (t.photo1 === treat.photo1) {
								duplicate = true;
							}
						});

						if (
							treat.userid === params.id &&
							!duplicate &&
							treat.active === "Enabled"
						) {
							treatments.push(treat);
						}
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
							!duplicate &&
							treat.active === "Enabled"
						) {
							treatments.push(treat);
						}
					});
				}
			})();
			firstupdate.current = false;
		}
	}, [treatments]);

	const params = useLocation().state;
	const [consuCount, setConsuCount] = useState(0);
	const [apptareqCount, setApptReqCount] = useState(0);
	const [systemCount, setSystemCount] = useState(0);
	const [futureDates] = useState([]);
	const [appointmentStatus, setAppointmentStatus] = useState();
	const [generalStatus, setGeneralStatus] = useState();
	const [calendarStatus, setCalendarStatus] = useState();
	const [notificationStatus, setNotificationStatus] = useState();
	const [notifications, setNotifications] = useState();

	useEffect(() => {
		setSystemCount(0);
		UserServices.GetUserSettingsById(params.id).then((existUser) => {
			setAppointmentStatus(
				existUser.userSettingsByUserID.appointment[0].status
			);
			setGeneralStatus(existUser.userSettingsByUserID.general[0].status);
			setCalendarStatus(existUser.userSettingsByUserID.calendar[0].status);
			setNotificationStatus(
				existUser.userSettingsByUserID.notification[0].status
			);
			setNotifications(existUser.userSettingsByUserID.notification[0]);
		});

		console.log("notification", notifications);
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
		});

		NotificationServices.GetNotificationByAdminid(params.id).then((patient) => {
			var earr = patient.notificationByAdminid.filter(function (elem) {
				return elem.status === "pending";
			});

			setApptReqCount(earr.length);
		});
	}, []);

	useEffect(() => {
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

	return (
		<>
			{!props.page && (
				<div className="row pt-5">
					<div className="col-xl col-lg col-md col-xs col-sm">
						<label className="f-rl fm-w4-s30">Overview Revenue</label>
					</div>
				</div>
			)}
			{props.page === "analytics" && (
				<div className="row pt-5">
					<div className="col-xl col-lg col-md col-xs col-sm">
						<label className="f-rl fm-w4-s30">Revenue Analytics</label>
						<hr className="graphhr"></hr>
					</div>
				</div>
			)}
			<div className="row pt-5">
				<div className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3">
					<div className="row">
						<div
							className="col-xl col-lg col-md col-xs col-sm"
							style={{ paddingBottom: "25px" }}
						>
							<div className="row">
								<div className="col-xl col-lg col-md col-xs col-sm">
									<label className="f-fm fm-w6-s14 color-AC">
										TOTAL REVENUE
									</label>
								</div>
							</div>
							<div className="row">
								<div className="col-xl col-lg col-md col-xs col-sm">
									<label className="f-fm fm-w7-s24">
										$ {totalrevenue.toFixed(2)}
									</label>
								</div>
							</div>
						</div>
						<div className="col-xl col-lg col-md col-xs col-sm">
							<div className="row">
								<div className="col-xl col-lg col-md col-xs col-sm">
									<label
										className="f-fm fm-w6-s14 color-AC"
										style={{
											width: "max-content",
										}}
									>
										TAKE HOME REVENUE
									</label>
								</div>
							</div>
							<div className="row">
								<div className="col-xl col-lg col-md col-xs col-sm">
									<label className="f-fm fm-w7-s24  color-00C3A0">
										$ {homerevenue.toFixed(2)}
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3">
					<div className="row"></div>
					<div className="row"></div>
				</div>
				<div
					className="col-xl-6 col-lg-6 col-md-6 col-xs-6 col-sm-6"
					style={{ paddingRight: "210px" }}
				>
					<div className="row">
						<div
							className="col-xl col-lg col-md col-xs col-sm"
							style={{ paddingBottom: "25px" }}
						>
							<label className="select-label">
								<select
									style={{ width: "175px" }}
									className="f-fm fm-w4-s16 select-round color-7"
									onChange={(e) => handleViewClick(e.target.value)}
								>
									<option className="f-fm fm-w5-s14" value="Daily">
										Daily View
									</option>
									<option className="f-fm fm-w5-s14" value="Monthly" selected>
										Monthly View
									</option>
									<option className="f-fm fm-w5-s14" value="Yearly">
										Yearly View
									</option>
								</select>
							</label>
						</div>
						{ismonthly && totalyears.length !== 0 && (
							<div className="col-xl col-lg col-md col-xs col-sm">
								<label className="select-label">
									<select
										style={{ width: "135px" }}
										className="f-fm fm-w4-s16 select-round color-7"
										onChange={(e) => handleyearClick(e.target.value)}
									>
										{totalyears.map((year) => {
											if (year === selectedyear) {
												return (
													<option
														className="f-fm fm-w5-s14"
														key={year}
														value={year}
														selected
													>
														{year}
													</option>
												);
											} else {
												return (
													<option
														className="f-fm fm-w5-s14"
														key={year}
														value={year}
													>
														{year}
													</option>
												);
											}
										})}
									</select>
								</label>
							</div>
						)}
						{isdaily && totalyears.length !== 0 && (
							<>
								<div className="col">
									<label className="select-label">
										<select
											className="f-fm fm-w4-s16 select-round color-7"
											onChange={(e) => handlemonthClick(e.target.value)}
										>
											{monthlabels.map(({ label, value }, index) => {
												if (parseInt(value) == selectedmonth) {
													return (
														<option
															className="f-fm fm-w5-s14"
															key={value}
															value={value}
															selected
														>
															{label}
														</option>
													);
												} else {
													return (
														<option
															className="f-fm fm-w5-s14"
															key={value}
															value={value}
														>
															{label}
														</option>
													);
												}
											})}
										</select>
									</label>
								</div>
								<div className="col">
									<label className="select-label">
										<select
											className="f-fm fm-w4-s16 select-round color-7"
											onChange={(e) => handleyearClick(e.target.value)}
										>
											{totalyears.map((year) => {
												if (year === selectedyear) {
													return (
														<option
															className="f-fm fm-w5-s14"
															key={year}
															value={year}
															selected
														>
															{year}
														</option>
													);
												} else {
													return (
														<option
															className="f-fm fm-w5-s14"
															key={year}
															value={year}
														>
															{year}
														</option>
													);
												}
											})}
										</select>
									</label>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
			<div className="row pt-3">
				<div className="col-xl-5 col-lg-5 col-md-5 col-xs-5 col-sm-5"></div>
				<div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1"></div>
				<div className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2"></div>
			</div>
			<div className="row pt-5">
				<div
					className="col-xl-10 col-lg-10 col-md-12 col-xs-12 col-sm-12"
					style={{
						marginLeft: "-5px",
						height: "350px",
						// width: "75%",
					}}
				>
					{ismonthly && (
						<Revenue
							amount={totalmonths}
							color={monthbackground}
							labels={monthlabels.map((m) => {
								return m.label;
							})}
						></Revenue>
					)}
					{isyearly && (
						<Revenue
							amount={totalyearsamount}
							color={yearbackground}
							labels={totalyears}
						></Revenue>
					)}
					{isdaily && (
						<Revenue
							amount={totaldailyamount}
							color={dailybackground}
							labels={dailylabel}
						></Revenue>
					)}
				</div>
			</div>
			{!props.page && (
				<>
					<div className="row pt-3">
						<div
							className="col-xl-12 col-lg-12 col-md-12 col-xs-12 col-sm-12"
							style={{ marginLeft: "-5px" }}
						>
							<hr className="graphhr"></hr>
							<br></br>
							<br></br>
						</div>
					</div>
					<div className="row pt-3">
						{notifications !== undefined && notifications.d_apt_activity && (
							<div className="col-xl-7 col-lg-7 col-md-12 col-xs-12 col-sm-12">
								<div className="row">
									<div className="col-xl-7 col-lg-7 col-md-7 col-xs-7 col-sm-7  pb-4">
										<label className="f-fm fm-w4-s30">Your Schedule</label>
									</div>
									<div
										className="col-xl-4 col-lg-4 col-md-4 col-xs-4 col-sm-4 pt-0p7rem"
										style={{ textAlign: "right" }}
									>
										<label
											className="f-fm fm-w6-s16 color-7"
											onClick={() => props.handleClick("overview")}
											style={{ cursor: "pointer" }}
										>
											View Calendar &gt;
										</label>
									</div>
									<div className="col-1"></div>
								</div>
								<br></br>
								<div className="row pb-5">
									<div className="col-12 col-lg-6 col-xl-6">
										<div
											className="row"
											style={{
												backgroundColor: "#fff",
												borderRadius: "20px",
											}}
										>
											<div
												className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1 col-1"
												style={{
													display: "flex",
													alignItems: "center",
													textAlign: "right",
													cursor: "pointer",
												}}
												onClick={() => {
													props.sliceDecreseValue();
												}}
											>
												&lt;
											</div>
											<div className="col-xl-9 col-lg-9 col-md-9 col-xs-9 col-sm-9 col-9">
												<Row>
													{props.appointments
														.slice(props.sliceStart, props.sliceEnd)
														?.map((apts) => {
															return (
																<div
																	key={apts.id}
																	style={{
																		height: "40px",
																		display: "flex",
																		alignItems: "center",
																		justifyContent: "center",
																		cursor: "pointer",
																	}}
																	className={
																		apts === props.tdate
																			? "f-fm fm-w5-s16 col-4"
																			: "f-fm fm-w5-s16 color-AC col-4"
																	}
																	onClick={() => {
																		props.handleAppointments(apts);
																	}}
																>
																	<span
																		className={
																			apts.split(" ")[2] ===
																			props.tdate.split("-")[2]
																				? "today"
																				: ""
																		}
																	>
																		{apts.split(" ")[2]}&nbsp;&nbsp;
																	</span>
																	{new Date(apts.replace("-", " "))
																		.toString()
																		.split(" ")[0]
																		.toUpperCase()}
																</div>
															);
														})}
												</Row>
											</div>
											<div
												className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1 col-1"
												style={{
													display: "flex",
													alignItems: "center",
													cursor: "pointer",
												}}
												onClick={() => {
													props.sliceIncreseValue();
												}}
											>
												&gt;
											</div>
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col-11">
										{!props.calendarStatus && (
											<div
												style={{
													height: "800px",
													backgroundColor: "#F4F4F4",
												}}
											>
												<div
													style={{ textAlign: "center", paddingTop: "10vw" }}
												>
													<button
														style={{ width: "270px", height: "55px" }}
														className="btn-round"
														onClick={() => props.handleClick("overview")}
													>
														<span style={{ color: "#fff" }}>
															Set up your calendar
														</span>
													</button>
												</div>
											</div>
										)}
									</div>
								</div>

								<div className="row">
									<div className="col-11">
										{props.calendarStatus && props.myschedule.length == 0 && (
											<div
												style={{
													height: "867px",
													backgroundColor: "#F4F4F4",
												}}
											>
												<div
													style={{ textAlign: "center", paddingTop: "40px" }}
												>
													No appointments yet
												</div>
											</div>
										)}
									</div>
								</div>

								<div className="row">
									<div className="col-11">
										{props.calendarStatus &&
											props.myschedule.length > 0 &&
											props.myschedule.map((i, id) => {
												var dt = new Date(i.appointmentdate);
												var year = dt.getFullYear();
												var month = (dt.getMonth() + 1)
													.toString()
													.padStart(2, "0");
												var day = dt.getDate().toString().padStart(2, "0");

												return (
													<div key={i.id}>
														{(i.status === "Accepted" ||
															i.cstatus === "Accepted") && (
															<>
																<div
																	className="f-fm fm-w7-s18 color-00"
																	style={{
																		paddingTop: "20px",
																		paddingBottom: "10px",
																	}}
																>
																	TODAY,&nbsp;
																	{i.consultationtype === "appointment"
																		? i.starttime
																		: i.cstarttime}
																</div>
																<div
																	style={{
																		backgroundColor: "#FFFFFF",
																		borderRadius: "10px",
																	}}
																>
																	<div style={{ paddingLeft: "20px" }}>
																		<div className="row">
																			<div
																				className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2"
																				style={{
																					width: "75px",
																					//   display: "flex",
																					//   alignItems: "center",
																					paddingTop: "10px",
																				}}
																			>
																				{i.patient_details[0].avatar === "" ? (
																					<img
																						src="images/avatar.png"
																						style={{
																							width: "56px",
																							height: "56px",
																						}}
																						alt="imgfemale"
																					></img>
																				) : (
																					<img
																						src={
																							process.env.REACT_APP_AWS_S3 +
																							i.patient_details[0].avatar
																						}
																						style={{
																							width: "56px",
																							height: "56px",
																							borderRadius: "50%",
																						}}
																						alt="imgfemale"
																					></img>
																				)}
																			</div>
																			<div className="col-xl-10 col-lg-10 col-md-10 col-xs-10 col-sm-10">
																				<div
																					className="row"
																					style={{
																						marginLeft: "-20px",
																					}}
																				>
																					<div className="col-xl col-lg col-md col-xs col-sm">
																						<label className="f-fm fm-w7-s24 color-00">
																							{i.patient_details[0].firstName}
																						</label>
																					</div>
																				</div>
																				<div
																					className="row"
																					style={{
																						marginLeft: "-20px",
																					}}
																				>
																					<div className="col-xl col-lg col-md col-xs col-sm">
																						{i.patient_details[0].gender ===
																						"Male" ? (
																							<i
																								class="fa fa-regular fa-mars"
																								style={{
																									color: "#AF805E",
																								}}
																							></i>
																						) : (
																							<i
																								class="fa fa-solid fa-venus"
																								style={{
																									color: "#AF805E",
																								}}
																							></i>
																						)}
																						&nbsp;&nbsp;
																						<label className="f-fm fm-w6-s14 color-00">
																							{props.calculateage(
																								i.patient_details[0].dob.split(
																									"T"
																								)[0]
																							)}
																						</label>
																					</div>
																				</div>
																				<div className="row pt-3">
																					<div
																						className="col-xl col-lg col-md col-xs col-sm"
																						style={{ paddingLeft: "0px" }}
																					>
																						<label
																							className="f-fm fm-w6-s12 color-AC"
																							style={{
																								paddingBottom: "5px",
																							}}
																						>
																							TREATMENT
																						</label>
																					</div>
																				</div>
																				<div
																					style={{
																						verticalAlign: "middle",
																						// width: "25vw",
																					}}
																					className="f-fm fm-w4-s14"
																				>
																					{i.treatmentid[0]
																						.split(",")
																						.map((e, k) => {
																							return (
																								<>
																									<div
																										className="row"
																										key={e.id}
																									>
																										<div
																											className="col-xl-7 col-lg-7 col-md-7 col-xs-7 col-sm-7"
																											style={{
																												paddingBottom: "3px",
																												paddingLeft: "0px",
																											}}
																										>
																											<label className="f-fm fm-w6-s16 color-00 treat">
																												{props.getvalue(e)}
																											</label>
																										</div>
																										<div
																											className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3"
																											style={{
																												paddingBottom: "25px",
																											}}
																										>
																											<img
																												src="images/injection.png"
																												alt="injection"
																											></img>

																											<label className="f-fm fm-w6-s14 color-00">
																												x
																												{
																													i.finalsyringes.split(
																														","
																													)[k]
																												}
																											</label>
																										</div>
																										<div className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2">
																											<label
																												className="f-fm fm-w7-s14 "
																												style={{
																													color: "#AF805E",
																												}}
																											>
																												$
																												{parseInt(
																													i.finalsyringes.split(
																														","
																													)[k]
																												) * props.getprice(e)}
																											</label>
																										</div>
																									</div>
																								</>
																							);
																						})}
																				</div>
																				<div className="row">
																					<div
																						className="col-xl col-lg col-md col-xs col-sm"
																						style={{ paddingLeft: "0px" }}
																					>
																						<label
																							className="f-fm fm-w6-s12 color-AC"
																							style={{
																								paddingBottom: "5px",
																							}}
																						>
																							TYPE
																						</label>
																					</div>
																				</div>
																				<div
																					className="f-fm fm-w6-s16 color-00 treat"
																					style={{ marginLeft: "-12px" }}
																				>
																					{i.consultationtype === "appointment"
																						? "APPOINTMENT"
																						: "CONSULTATION"}
																				</div>
																			</div>
																		</div>
																	</div>

																	<div className="row">
																		<div
																			className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1 col-1"
																			style={{ paddingRight: "0px" }}
																		></div>
																		<div
																			className="col-xl-10 col-lg-10 col-md-10 col-xs-10 col-sm-10 col-10"
																			style={{
																				paddingLeft: "0px",
																				paddingRight: "0px",
																			}}
																		>
																			<hr
																				style={{
																					color: "rgb(149 142 142)",
																					backgroundColor: "#000000",
																					height: 2,
																				}}
																			/>
																		</div>
																		<div
																			className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1 col-1"
																			style={{ paddingLeft: "0px" }}
																		></div>
																	</div>

																	<div
																		className="row"
																		style={{ paddingLeft: "20px" }}
																	>
																		<div
																			className="col-xl col-lg col-md col-xs col-sm"
																			style={{
																				paddingBottom: "3px",
																			}}
																		>
																			{i.consultationtype === "appointment" ? (
																				<>
																					{" "}
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
																							src="images/time.png"
																							alt="time"
																						></img>
																					</label>
																					&nbsp;&nbsp;
																					<label className="f-fm fm-w4-s15 color-00">
																						{i.appointmentdate.split("T")[0]}
																						&nbsp;&nbsp;
																						{i.starttime}
																						&nbsp;&nbsp;
																						{i.endtime}
																					</label>
																				</>
																			) : (
																				<>
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
																							src="images/time.png"
																							alt="time"
																						></img>
																					</label>
																					&nbsp;&nbsp;
																					<label className="f-fm fm-w4-s15 color-00">
																						{i.consultationdate.split("T")[0]}
																						&nbsp;&nbsp;
																						{i.cstarttime}
																						&nbsp;&nbsp;
																						{i.cendtime}
																					</label>
																				</>
																			)}
																		</div>
																	</div>
																	<div
																		className="row"
																		style={{ paddingLeft: "20px" }}
																	>
																		<div
																			className="col-xl col-lg col-md col-xs col-sm"
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
																					src="images/map.png"
																					alt="map"
																				></img>
																			</label>
																			&nbsp;&nbsp;
																			<label className="f-fm fm-w4-s15 color-00">
																				{i.patient_details[0].address[0].line1 +
																					" " +
																					i.patient_details[0].address[0]
																						.line2 +
																					" " +
																					i.patient_details[0].address[0]
																						.towncity +
																					" " +
																					i.patient_details[0].address[0]
																						.country +
																					" " +
																					i.patient_details[0].address[0]
																						.postcode}
																			</label>
																		</div>
																	</div>
																</div>
															</>
														)}
													</div>
												);
											})}
									</div>
								</div>
							</div>
						)}
						{notifications !== undefined && !notifications.d_apt_activity && (
							<div className="col-7"></div>
						)}
						<div className="col-xl-5 col-lg-5 col-md-12 col-xs-12 col-sm-12">
							<div className="row">
								<div className="col-xl-7 col-lg-7 col-md-7 col-xs-7 col-sm-7  pb-4">
									<label className="f-fm fm-w4-s30">Notification</label>
									<br></br>
									<br></br>
									{notifications !== undefined &&
										notifications.d_conslt_request && (
											<div className="row consultation-ml">
												<div
													className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1 pb-4"
													onClick={() => goToAppointmentPage()}
													style={{ cursor: "pointer" }}
												>
													<div className="note-card">
														<img
															loading="lazy"
															className="img-consultation"
															alt="Consultation"
														></img>
														<label
															className="f-fm fm-w7-s18"
															style={{ cursor: "pointer" }}
														>
															Consultation
														</label>
														&nbsp;&nbsp;
														{consuCount > 0 && (
															<label
																className="notify f-fm fm-w7-s18"
																style={{
																	backgroundColor: "blue",
																	cursor: "pointer",
																	marginRight: "-48px",
																}}
															>
																+{consuCount}
															</label>
														)}
														<label
															className="f-fm fm-w7-s18 consultation"
															style={{ cursor: "pointer" }}
														>
															&gt;
														</label>
													</div>
												</div>
											</div>
										)}
									{notifications !== undefined &&
										notifications.d_request_approval && (
											<div className="row requestapproval-ml">
												<div
													className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1 pb-4"
													onClick={() => goToRequestPage()}
													style={{ cursor: "pointer" }}
												>
													<div className="note-card">
														<img
															loading="lazy"
															className="img-request"
															alt="Request"
														></img>
														<label
															className="f-fm fm-w7-s18"
															style={{
																paddingRight: "0px",
																cursor: "pointer",
															}}
														>
															Request Approval
														</label>
														&nbsp;&nbsp;
														{apptareqCount > 0 && (
															<label
																className="notify f-fm fm-w7-s18"
																style={{
																	backgroundColor: "#AF805E",
																	cursor: "pointer",
																	marginRight: "-48px",
																}}
															>
																+{apptareqCount}
															</label>
														)}
														<label
															className="f-fm fm-w7-s18 requestapproval"
															style={{
																paddingLeft: "180px",
																cursor: "pointer",
															}}
														>
															&gt;
														</label>
													</div>
												</div>
											</div>
										)}
									<div className="row consultation-ml">
										<div
											className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1 pb-6rem"
											onClick={() => props.handleClick("overview")}
											style={{ cursor: "pointer" }}
										>
											<div className="note-card">
												<img
													loading="lazy"
													className="img-system"
													alt="system"
												></img>
												<label
													className="f-fm fm-w7-s18"
													style={{ cursor: "pointer" }}
												>
													System
												</label>
												&nbsp;&nbsp;
												{systemCount > 0 && (
													<label
														className="notify f-fm fm-w7-s18 "
														style={{
															cursor: "pointer",
															marginRight: "-48px",
														}}
													>
														+{systemCount}
													</label>
												)}
												<label
													className="f-fm fm-w7-s18 consultation"
													style={{
														paddingLeft: "250px",
														cursor: "pointer",
													}}
												>
													&gt;
												</label>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
			{props.page === "analytics" && (
				<>
					<div className="row pt-7">
						<div className="col-xl col-lg col-md col-xs col-sm">
							<label className="f-rl fm-w4-s30">Patient Analytics</label>
							<hr className="graphhr"></hr>
						</div>
						<div className="row pt-3">
							<div className="col-xl-1 col-lg-1 col-md-6 col-xs-1 col-sm-6">
								MY PATIENTS
							</div>
							<div className="col-xl-1 col-lg-1 col-md-6 col-xs-1 col-sm-6">
								POTENTIAL PATIENTS
							</div>
						</div>
						<div className="row pt-3">
							<div className="col-xl-1 col-lg-1 col-md-6 col-xs-1 col-sm-6">
								{pcounts.mypatients}
							</div>
							<div className="col-xl-1 col-lg-1 col-md-6 col-xs-1 col-sm-6">
								{pcounts.potentialpatients}
							</div>
						</div>
						<div className="row pt-3">
							<div className="col-xl-4 col-lg-4 col-md-6 col-xs-4 col-sm-6 mb-3">
								<div
									className="card"
									style={{ padding: "20px", height: "100%" }}
								>
									<div className="row pl-6">
										<label className="f-fm fm-w7-s14 color-7">Gender</label>
									</div>
									<div
										className="row pt-5 pl-6"
										style={{ justifyContent: "space-between" }}
									>
										<div
											className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3"
											style={{ display: "inline-block", textAlign: "center" }}
										>
											<CircularProgressbar
												value={total === 0 ? 0 : (females / total) * 100}
												styles={{
													path: {
														transform: "rotate(95deg)",
														transformOrigin: "center center",
													},
												}}
												counterClockwise
												strokeWidth="10"
											/>
											<br></br>
											<label className="pt-3 f-fm fm-w4-s24 color-7">
												{total !== 0 &&
													((females / total) * 100)
														.toFixed(2)
														.replace(".00", "") + "%"}
												{total === 0 && "0%"}
											</label>
											<br></br>
											<label className="f-fm fm-w4-s12 color-7">Female</label>
										</div>
										<div
											className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3"
											style={{ display: "inline-block", textAlign: "center" }}
										>
											<CircularProgressbar
												value={total === 0 ? 0 : (males / total) * 100}
												styles={{
													path: {
														transform: "rotate(95deg)",
														transformOrigin: "center center",
													},
												}}
												counterClockwise
												strokeWidth="10"
											/>
											<br></br>
											<label className="pt-3 f-fm fm-w4-s24 color-7">
												{total !== 0 &&
													((males / total) * 100)
														.toFixed(2)
														.replace(".00", "") + "%"}
												{total === 0 && "0%"}
											</label>
											<br></br>
											<label className="f-fm fm-w4-s12 color-7">Male</label>
										</div>
										<div
											className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3"
											style={{ display: "inline-block", textAlign: "center" }}
										>
											<CircularProgressbar
												value={total === 0 ? 0 : (others / total) * 100}
												styles={{
													path: {
														transform: "rotate(95deg)",
														transformOrigin: "center center",
													},
												}}
												counterClockwise
												strokeWidth="10"
											/>
											<br></br>
											<label className="pt-3 f-fm fm-w4-s24 color-7">
												{total !== 0 &&
													((others / total) * 100)
														.toFixed(2)
														.replace(".00", "") + "%"}
												{total === 0 && "0%"}
											</label>
											<br></br>
											<label className="f-fm fm-w4-s12 color-7">
												Non Binary
											</label>
										</div>
									</div>
								</div>
								<br></br>
								<br></br>
								<br></br>
							</div>
							<div className="col-xl-4 col-lg-4 col-md-6 col-xs-4 col-sm-6 mb-3">
								<div
									className="card"
									style={{ padding: "20px", height: "100%" }}
								>
									<div className="row pl-6">
										<label className="f-fm fm-w7-s14 color-7">Age</label>
									</div>
									<div className="row pt-3 pl-6">
										<div
											className="agegraph col-xl col-lg col-md col-xs col-sm"
											style={{ display: "inline-block" }}
										>
											<AgeDifference
												firstagerange={firstagerange}
												secondagerange={secondagerange}
												thirdagerange={thirdagerange}
												fouragerange={fouragerange}
												fiveagerange={fiveagerange}
												sixagerange={sixagerange}
												total={total}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-4 col-lg-4 col-md-6 col-xs-4 col-sm-6 mb-3">
								<div
									className="card"
									style={{
										padding: "20px",
										height: "100%",
										minHeight: "220px",
									}}
								>
									<div className="pl-6">
										<label className="f-fm fm-w7-s14 color-7">Location</label>
									</div>
									<div className="pl-6">
										{googleApiKey !== "" && (
											<Locations
												patients={props.patients}
												apikey={googleApiKey}
											/>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row pt-7">
						<div className="col-xl col-lg col-md col-xs col-sm">
							<label className="f-rl fm-w4-s30">Treatment Analytics</label>
							<hr className="graphhr"></hr>
						</div>
						<div className="row pt-3">
							<div className="col-xl col-lg col-md col-xs col-sm">
								<div
									className="card"
									style={{
										paddingLeft: "70px",
										paddingTop: "20px",
										height: "100%",
										width: "95%",
									}}
								>
									<div className="table-responsive">
										<table
											className="table table-borderless aetable"
											style={{ width: "90%" }}
										>
											<thead className="f-fm fm-w6-s16p3 color-AC">
												<tr>
													<th
														scope="col"
														// colSpan="3"
														style={{
															display: "inline-flex",
															flexDirection: "row",
															justifyContent: "flex-start",
															alignItems: "center",
														}}
													>
														<label>PRODUCT</label>

														<img
															loading="lazy"
															alt="Treatment logo"
															src=""
															style={{
																display: "none",
																width: "75.64px",
																height: "76px",
															}}
														></img>
													</th>

													<th scope="col">UNIT PRICE</th>
													<th scope="col">
														SOLD {props.params.isadmin && "/ TOTAL"}
													</th>
												</tr>
											</thead>

											<tbody>
												{treatments.length === 0 && (
													<tr>
														<td></td>
														<td>
															<center>
																<b>No Treatments</b>
															</center>
														</td>
														<td></td>
													</tr>
												)}
												{treatments.map(function (ta, i) {
													return (
														<>
															<tr
																key={i}
																id={"tr" + i}
																style={{
																	backgroundColor: "#FFFFFF",
																	verticalAlign: "middle",
																}}
															>
																<td
																	// colSpan="3"
																	style={{
																		display: "inline-flex",
																		flexDirection: "row",
																		justifyContent: "flex-start",
																		alignItems: "center",
																	}}
																>
																	<label className="f-fm fm-w6-s16p3 color-AC">
																		{i + 1}
																	</label>
																	<img
																		loading="lazy"
																		alt="Treatment logo"
																		src={
																			ta.photo1 === ""
																				? "./images/tdetails.png"
																				: ta.photo1
																		}
																		style={{
																			width: "54.34px",
																			height: "55.75px",
																			margin: "10px",
																		}}
																	></img>

																	<label
																		// style={{ width: "176.62px" }}
																		className="f-fm fm-w6-s19p02 color-00"
																	>
																		{ta.treatmentname}
																	</label>
																</td>
																<td className="f-fm fm-w6-s16p3 color-7">
																	{ta.pricepersyring}
																</td>
																<td>
																	<label className="f-fm fm-w7-s19p02 coral">
																		{getqtysold(ta.id) === ""
																			? "00"
																			: getqtysold(ta.id)}
																	</label>
																	{props.params.isadmin && (
																		<label className="f-fm fm-w4-s16p3 color-7">
																			{" / " + ta.quantityavailable}
																		</label>
																	)}
																</td>
															</tr>
														</>
													);
												})}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};
export default Overview;
