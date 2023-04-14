import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tabs";
import Patient2 from "./patient2";
import * as TreatmentServices from "../../services/treatments";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Patient1 = (props) => {
	console.log("props", props);
	const params = useLocation().state;

	const [patients, setPatients] = useState([]);
	const [appointments, setAppointments] = useState([]);
	const [rating, setRating] = useState(0);
	const [existUser, setExistUser] = useState();
	const [treatmentname, setTreatmentname] = useState([]);
	const [tempArray, setTempdArray] = useState([]);
	const [treatmenttype, settreatmenttype] = useState([]);
	const [advancedsetting, setAdvancedsetting] = useState([]);
	const [sellingprice, setSellingprice] = useState([]);
	const [sortArray, setSortArray] = useState(props.patients);
	const [initialpatients, setinitialpatients] = useState(props.patients);
	const [treatments, setTreatments] = useState([]);
	const [count, setCount] = useState(0);
	const [allquestions, setAllQuestions] = useState([]);
	const [allquestionsp, setAllQuestionsP] = useState([]);
	const [allquestionsc, setAllQuestionsC] = useState([]);
	const [search, setSearch] = useState("");

	console.log("params", params);

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

	var pcounts = { mypatients: "0", potentialpatients: "0" };
	var countfiltered = props.patients.filter(function (p) {
		return props.appointments.filter(function (element) {
			return element.filter(function (e) {
				return p.id === e.patientid ? e.ispaymentdone : "";
			}).length;
		}).length;
	});

	pcounts.mypatients = countfiltered.length;
	pcounts.potentialpatients = props.patients.length - pcounts.mypatients;

	useEffect(() => {
		getvalue();
		setPatients(props.patients);
		setSortArray(props.patients);
		setinitialpatients(props.patients);
		setAppointments(props.appointments);
		setAllQuestions(props.allquestions);
		setAllQuestionsP(props.allquestionsP);
		setAllQuestionsC(props.allquestionsC);
	}, [props]);

	const sortByFilter = (event) => {
		setSortArray([]);
		console.log("rhh", event);

		if (event === "A - Z") {
			let res = initialpatients.sort((a, b) =>
				a.firstName > b.firstName ? 1 : -1
			);
			setSortArray(res);
			setCount((prev) => prev + 1);
			return;
		}
		if (event === "Z - A") {
			let res = initialpatients.sort((a, b) =>
				a.firstName < b.firstName ? 1 : -1
			);
			setSortArray(res);
			setCount((prev) => prev + 1);
			return;
		}
		if (event === "upcomingtreatment") {
			let res = initialpatients.sort((a, b) =>
				new Date(a.upcomingtreatment) > new Date(b.upcomingtreatment) ? 1 : -1
			);
			console.log("3", res);
			setSortArray(res);
			return;
		}
		if (event === "latesttreatment") {
			let res = initialpatients.sort((a, b) =>
				new Date(a.time) > new Date(b.time) ? 1 : -1
			);
			console.log("4", res);
			setSortArray(res);
			return;
		}
		if (event === "Sort By") {
			setSortArray(initialpatients);
			return;
		}
	};
	// console.log("sort", sortArray);

	useEffect(() => {
		(async function anyNameFunction() {
			var duplicate = false;
			var defaulttreatments = await TreatmentServices.GetGlobalTreatments();
			if (params.isadmin) {
				let i = 1;
				defaulttreatments.globaltreatments.forEach((treat) => {
					console.log("treat", treat);
					duplicate = false;
					treatments.forEach((t) => {
						if (t.photo1 === treat.photo1) {
							duplicate = true;
						}
					});

					if (treat.userid === params.id && !duplicate) {
						console.log(treat);
						console.log(treatments);
						if (!tempArray.includes(treat.id)) {
							tempArray.push(treat.id);
							treatmentname.push(treat.treatmentname);
							treatmenttype.push(treat.treatmenttype);
							advancedsetting.push(treat.advancedsetting);
							sellingprice.push(treat.sellingprice);
							setTreatments((prev) => [...prev, treat]);
						}
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
						!duplicate
					) {
						console.log(treat);
						console.log(treatments);
						if (!tempArray.includes(treat.id)) {
							tempArray.push(treat.id);
							treatmentname.push(treat.treatmentname);
							treatmenttype.push(treat.treatmenttype);
							advancedsetting.push(treat.advancedsetting);
							sellingprice.push(treat.sellingprice);
							setTreatments((prev) => [...prev, treat]);
						}
					}
				});
			}
			// console.log("tttt2", treatments);
			// console.log("tttt2ta", tempArray);
		})();
	}, []);

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

	const getvalue = (tid, j) => {
		var index = tempArray.indexOf(tid);

		// console.log("tempArray", tempArray);
		// console.log("treatmentname", treatmentname);
		// console.log("treatments", treatments);
		// console.log("appointments", appointments);
		return (
			<>
				<div>
					<div
						style={{
							backgroundColor: "#00C3A0",
							borderRadius: "5px",
							color: "#FFFFFF",
							margin: "5px",
							cursor: "pointer",
						}}
					></div>
					<label
						className="f-fm fm-w6-s14"
						style={{
							background: "#EDE3DC",
							borderRadius: "25px",
							padding: "5px",
							textAlign: "center",
						}}
					>
						<span
							className="f-fm fm-w6-s14"
							style={{
								color: "#777777",
							}}
						>
							{treatmenttype[index]}
						</span>
					</label>
					<label>
						<span
							className="f-fm fm-w4-s12 color-00"
							style={{ textDecoration: "underline", marginLeft: "5px" }}
						>
							{treatmentname[index]}
						</span>
					</label>
				</div>
			</>
		);
	};

	const getdefaultvalue = (tid, x, y, z) => {
		var index = tempArray.indexOf(tid);

		return (
			<>
				{z === "app" && (
					<span
						className="f-fm fm-w6-s16"
						style={{ marginLeft: "5px", color: "#AF805E" }}
					>
						{treatmentname[index]}
					</span>
				)}
				{z !== "app" && (
					<div>
						<div
							style={{
								backgroundColor: "#00C3A0",
								borderRadius: "5px",
								color: "#FFFFFF",
								margin: "5px",
								cursor: "pointer",
							}}
						></div>
						<label
							className="f-fm fm-w6-s14"
							style={{
								background: "#EDE3DC",
								borderRadius: "25px",
								padding: "5px",
								textAlign: "center",
							}}
						>
							<span
								className="f-fm fm-w6-s14"
								style={{
									color: "#777777",
								}}
							>
								{treatmenttype[index]}
							</span>
						</label>
						{y !== "none" && (
							<label>
								<span
									className="f-fm fm-w4-s12 color-00"
									style={{ textDecoration: "underline", marginLeft: "5px" }}
								>
									{treatmentname[index]}
								</span>
							</label>
						)}
					</div>
				)}
			</>
		);
	};

	const getprice = (tid, syr, j) => {
		var index = tempArray.indexOf(tid);
		return (
			<span>
				<img src="./images/injection.png" alt="img" />
				&nbsp;
				<label>x{syr[j]}</label>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<label>
					<label
						className="f-fm fm-w6-s14 color-7"
						style={{
							paddingTop: "2px",
							display: "flex",
							justifyContent: "center",
							color: "#AF805E",
						}}
					>
						$ {parseInt(syr[j]) * parseInt(sellingprice[index])}
					</label>
				</label>
			</span>
		);
	};

	const getVisits = (pid, payment) => {
		let tempCount = 0;
		Object.values(appointments).forEach((a) => {
			Object.values(a).forEach((app) => {
				if (pid.id === app.patientid && app.iscompleted === "true") {
					tempCount++;
				}
			});
		});
		return <>{tempCount}</>;
	};

	var enter = 0;
	const DisplayAppointments = (i, app, x, tab, payment) => {
		if (enter < 2) {
			enter++;
			return (
				<>
					<label className="f-fm fm-w4-s12 color-7">
						{app.appointmentdate.split("T")[0]} | {app.starttime} -{" "}
						{app.endtime}
					</label>
					<br></br>
					{app.treatmentid[0].split(",").map((e, j) => {
						return <>{getvalue(e, j)}</>;
					})}
				</>
			);
		} else if (enter === 2) {
			enter++;
			return (
				<Patient2
					payment={payment}
					patients={i}
					tab={tab}
					view="inline-block"
					image="none"
					appointments={appointments}
					treatments={treatments}
					getvalue={getdefaultvalue}
					getprice={getprice}
					calculate_age={calculate_age}
					allquestions={allquestions}
					allquestionsP={allquestionsp}
					allquestionsC={allquestionsc}
				></Patient2>
			);
		} else {
			enter++;
			return <></>;
		}
	};

	const DisplayRatings = (appointments, i, payment) => {
		// console.log("ratimg", i);
		// console.log("rating", appointments, i, payment);
		var rat = 0;
		var user = 0;
		// rat = 0;
		// user = 0;
		Object.values(appointments).forEach((a) => {
			Object.values(a).forEach((app) => {
				if (i.id === app.patientid) {
					// console.log(app.rating);
					if (app.rating !== "") {
						user++;
						rat = rat + parseInt(app.rating);
						rat = parseInt(rat) / parseInt(user);
					}
				}
			});
			// console.log("rat", rat);
		});

		return (
			<>
				{/* {rat} */}
				<span className="fm-w4-s16p3">
					&nbsp;{rat === 0 ? "No Reviews" : rat}
				</span>
				<br></br>
				<span
					style={{
						display: "inline-flex",
					}}
				>
					<Rating
						count={5}
						// onClick={handleChange}
						size={24}
						// color2={"#000"}
						fillColor="#000"
						emptyColor="#CBCBCB"
						initialValue={rat}
						// allowHover="false"
						readonly="true"
					/>

					{payment && (
						<Patient2
							payment={true}
							patients={i}
							image="inline-block"
							tab="upcoming App"
							view="none"
							appointments={appointments}
							treatments={treatments}
							getvalue={getdefaultvalue}
							getprice={getprice}
							calculate_age={calculate_age}
							allquestions={allquestions}
							allquestionsP={allquestionsp}
							allquestionsC={allquestionsc}
						></Patient2>
					)}
				</span>
			</>
		);
	};

	const handleSearch = (value) => {
		setSearch(value);
		if (value) {
			let data = initialpatients.filter((el) =>
				(
					el.email.toLowerCase() +
					el.memberid.toLowerCase() +
					el.gender.toLowerCase() +
					el.lastName.toLowerCase() +
					el.firstName.toLowerCase()
				).includes(value.toLowerCase())
			);
			setSortArray(data);
		} else {
			setSortArray(initialpatients);
		}
	};

	const ispotentialpatient = (i, index, payment) => {
		var potentialpatient = "";
		for (var x = 0; x < appointments.length; x++) {
			for (var y = 0; y < appointments[x].length; y++) {
				if (appointments[x][y].patientid === i.id) {
					potentialpatient += appointments[x][y].ispaymentdone;
				}
			}
		}

		if (potentialpatient.indexOf("true") >= 0 && payment === false) {
			return false;
		}
		if (potentialpatient.indexOf("true") < 0 && payment === false) {
			return true;
		}
		if (potentialpatient.indexOf("true") >= 0 && payment === true) {
			return true;
		}
	};

	const showPatient = (i, index, payment) => {
		return (
			<>
				{ispotentialpatient(i, index, payment) === true &&
					(payment === false || payment === true) && (
						<tr key={i._id} style={{ backgroundColor: "#FFFFFF" }}>
							<td style={{ textAlign: "left", padding: "10px" }}>
								<label
									style={{
										display: "flex",
										flexDirection: "row",
										alignContent: "center",
										alignItems: "center",
										justifyContent: "center",
										fontWeight: 600,
										fontFamily: "Mulish",
									}}
								>
									{i.memberid}
								</label>
							</td>
							<td style={{ textAlign: "left", padding: "10px" }}>
								<label
									style={{
										display: "flex",
										flexDirection: "row",
										alignContent: "center",
										alignItems: "center",
									}}
								>
									{/* {console.log("i", i)} */}
									{i.avatar === "" ? (
										<img
											alt="patient avatar"
											src="./images/imgfemale.png"
											style={{
												width: "45px",
												borderRadius: "50%",
												height: "45px",
											}}
										></img>
									) : (
										<img
											src={process.env.REACT_APP_AWS_S3 + i.avatar}
											style={{
												width: "45px",
												height: "45px",
												borderRadius: "50%",
											}}
											alt="patient avatar"
										></img>
									)}
									{/* <img
										alt="patient logo"
										src="./images/imgfemale.png"
										style={{
											width: "45px",
											height: "45px",
										}}
									></img> */}
									&nbsp;
									<label
										style={{
											flexDirection: "row",
											alignContent: "center",

											alignItems: "center",
										}}
										className="f-fm fm-w6-s18"
									>
										{i.firstName} {i.lastName}
										<br></br>
										<label className="f-fm fm-w4-s14">
											{i.gender === "Male" ? (
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
											{calculate_age(i.dob.split("T")[0])}
										</label>
									</label>
								</label>
							</td>

							<>
								<td style={{ textAlign: "left" }}>
									{payment && (
										<label className="f-fm fm-w4-s16">
											{getVisits(i, true)}
										</label>
									)}
									{!payment && <label className="f-fm fm-w4-s16">0</label>}
								</td>

								<td
									style={{
										textAlign: "left",
										color: "#777777",
									}}
								>
									{Object.values(appointments).map((a) => {
										return (
											<>
												<div className="d-none">{(enter = 0)}</div>

												{Object.values(a)
													.sort((a, b) =>
														a.appointmentdate < b.appointmentdate ? 1 : -1
													)
													.map((app, id) => {
														return (
															i.id === app.patientid && (
																<>
																	{app.iscompleted !== "true" &&
																		((app.complete !== "true" &&
																			app.ispaymentdone === false) ||
																			(app.complete === "true" &&
																				currentTime < videoDateTime3hr(app))) &&
																		currentTime < treatmentDateTime(app) &&
																		DisplayAppointments(
																			i,
																			app,
																			enter,
																			"upcoming App",
																			payment
																		)}
																</>
															)
														);
													})}
											</>
										);
									})}
								</td>

								<td
									style={{
										textAlign: "left",
										color: "#777777",
									}}
								>
									{Object.values(appointments).map((a) => {
										return (
											<>
												<div className="d-none">{(enter = 0)}</div>
												{Object.values(a)
													.sort((a, b) =>
														a.appointmentdate < b.appointmentdate ? 1 : -1
													)
													.map((app) => {
														return (
															i.id === app.patientid && (
																<>
																	{app.iscompleted === "true" &&
																		DisplayAppointments(
																			i,
																			app,
																			enter,
																			"past App",
																			payment
																		)}
																</>
															)
														);
													})}
											</>
										);
									})}
								</td>
								<td
									style={{
										textAlign: "left",
										color: "#777777",
									}}
								>
									{Object.values(appointments).map((a) => {
										return (
											<>
												<div className="d-none">{(enter = 0)}</div>
												{Object.values(a)
													.sort((a, b) =>
														a.appointmentdate < b.appointmentdate ? 1 : -1
													)
													.map((app) => {
														return (
															i.id === app.patientid && (
																<>
																	{app.iscompleted !== "true" &&
																		((app.complete !== "true" &&
																			app.ispaymentdone === false) ||
																			(app.complete === "true" &&
																				currentTime > videoDateTime3hr(app))) &&
																		(currentTime > treatmentDateTime(app) ||
																			currentTime > consultDT(app)) &&
																		DisplayAppointments(
																			i,
																			app,
																			enter,
																			"Missed App",
																			payment
																		)}
																</>
															)
														);
													})}
											</>
										);
									})}
								</td>
							</>

							<td
								style={{
									textAlign: "left",
									filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
								}}
							>
								{/* {rating} */}
								{/* <span className="fm-w4-s16p3">&nbsp;{rating}</span>
								<br></br>
								<span
									style={{
										display: "inline-flex",
									}}
								> */}
								{DisplayRatings(appointments, i, payment)}

								{/* {payment && (
										<Patient2
											payment={true}
											patients={i}
											image="inline-block"
											tab="upcoming App"
											view="none"
											appointments={appointments}
											treatments={treatments}
											getvalue={getdefaultvalue}
											getprice={getprice}
											calculate_age={calculate_age}
										></Patient2>
									)}
								</span> */}
							</td>
						</tr>
					)}
			</>
		);
	};
	return (
		<div>
			<div className="row">
				<div className="aecol6p1">&nbsp;</div>

				<div className="col-10">
					<Tabs
						className="f-rl fm-w4-s30"
						defaultActiveKey="My Patients"
						id="Patients(2)"
					>
						<Tab
							className="f-m fm-w7-s18"
							eventKey="Patients"
							title={"Patients (" + patients.length + ")"}
							disabled
						></Tab>

						<Tab
							className="f-m fm-w7-s18"
							eventKey="My Patients"
							title={" My Patients (" + pcounts.mypatients + ")"}
						>
							<div className="row pb-5">
								<div className="col-10">
									<div className="row">
										<div className="col-lg-auto col-md-auto col-sm-auto">
											<input
												type="text"
												value={search}
												onChange={(e) => handleSearch(e.target.value)}
												className="search f-fm fm-w4-s16 input form-control form-control-lg"
												placeholder="Search"
											></input>
										</div>
										<div className="col-lg-auto col-md-auto col-sm-auto">
											<label className="select-label">
												<select
													className="f-fm fm-w4-s16 select-round color-7"
													// defaultValue={sortArray}
													onChange={(val) => sortByFilter(val.target.value)}
												>
													<option>Sort By</option>
													<option value="A - Z">Patient Name (A-Z) </option>
													<option value="Z - A">Patient Name (Z-A) </option>
												</select>
											</label>
										</div>
									</div>
								</div>
							</div>

							<div className="row pt-4 table-responsive">
								<table
									style={{ padding: "0px" }}
									className="col-10 table table-borderless aetable"
								>
									<thead className="f-rl fm-w6-s14 color-AC">
										<tr>
											<th scope="col">
												<div
													style={{
														display: "flex",
														flexDirection: "row",
														alignContent: "center",
														alignItems: "center",
														paddingLeft: "30px",
														color: "#ACACAC",
														textAlign: "left",
													}}
												>
													Membership ID
												</div>
											</th>
											<th scope="col">
												<div
													style={{
														display: "flex",
														flexDirection: "row",
														alignContent: "center",
														alignItems: "center",
														paddingLeft: "30px",
														color: "#ACACAC",
														textAlign: "left",
													}}
												>
													Patient Info
												</div>
											</th>

											<th
												scope="col"
												style={{ color: "#ACACAC", textAlign: "left" }}
											>
												No. of Visit
											</th>
											<th
												scope="col"
												style={{ color: "#ACACAC", textAlign: "left" }}
											>
												Upcoming Treatment
											</th>
											<th
												scope="col"
												style={{ color: "#ACACAC", textAlign: "left" }}
											>
												Latest Treatment
											</th>
											<th
												scope="col"
												style={{ color: "#ACACAC", textAlign: "left" }}
											>
												Missed Treatment
											</th>
											<th
												scope="col"
												style={{ color: "#ACACAC", textAlign: "left" }}
											>
												Rating
											</th>
										</tr>
									</thead>
									<tbody
										className={
											pcounts.mypatients === 0 ||
											(sortArray.length === 0 && pcounts.mypatients !== 0)
												? "norecords"
												: ""
										}
									>
										{pcounts.mypatients === 0 && (
											<>
												<tr>
													<td></td>
													<td></td>
													<td></td>
													<td>No Patients</td>
													<td></td>
													<td></td>
													<td></td>
												</tr>
											</>
										)}
										{sortArray.length === 0 && pcounts.mypatients !== 0 && (
											<>
												<tr>
													<td></td>
													<td></td>
													<td></td>
													<td>No Patients for this search</td>
													<td></td>
													<td></td>
													<td></td>
												</tr>
											</>
										)}
										{sortArray.length > 0 &&
											sortArray.map(function (i, index) {
												return <>{showPatient(i, index, true)}</>;
											})}
									</tbody>
								</table>
							</div>
						</Tab>

						<Tab
							className="f-m fm-w7-s18"
							eventKey="Potential Patients(0)"
							title={"Potential Patients (" + pcounts.potentialpatients + ")"}
						>
							<div className="row pb-5">
								<div className="col-10">
									<div className="row">
										<div className="col-lg-auto col-md-auto col-sm-auto">
											<input
												type="text"
												value={search}
												onChange={(e) => handleSearch(e.target.value)}
												className="search f-fm fm-w4-s16 input form-control form-control-lg"
												placeholder="Search"
											></input>
										</div>
										<div className="col-lg-auto col-md-auto col-sm-auto">
											<label className="select-label">
												<select
													className="f-fm fm-w4-s16 select-round color-7"
													onChange={(val) => sortByFilter(val.target.value)}
												>
													<option>Sort By</option>
													<option value="A - Z">Patient Name (A-Z) </option>
													<option value="Z - A">Patient Name (Z-A) </option>
												</select>
											</label>
										</div>
									</div>
								</div>
							</div>

							<div className="row pt-4 table-responsive">
								<table
									style={{ padding: "0px" }}
									className="col-10 table table-borderless aetable"
								>
									<thead className="f-rl fm-w6-s14 color-AC">
										<tr>
											<th scope="col" style={{}}>
												<div
													style={{
														display: "flex",
														flexDirection: "row",
														alignContent: "center",
														alignItems: "center",
														paddingLeft: "30px",
														color: "#ACACAC",
														textAlign: "left",
													}}
												>
													Membership ID
												</div>
											</th>
											<th scope="col" style={{}}>
												<div
													style={{
														display: "flex",
														flexDirection: "row",
														alignContent: "center",
														alignItems: "center",
														paddingLeft: "30px",
														color: "#ACACAC",
														textAlign: "left",
													}}
												>
													Patient Info
												</div>
											</th>
											<th
												scope="col"
												style={{ color: "#ACACAC", textAlign: "left" }}
											>
												No. of Visit
											</th>
											<th
												scope="col"
												style={{ color: "#ACACAC", textAlign: "left" }}
											>
												Upcoming Treatment
											</th>
											<th
												scope="col"
												style={{ color: "#ACACAC", textAlign: "left" }}
											>
												Latest Treatment
											</th>{" "}
											<th
												scope="col"
												style={{ color: "#ACACAC", textAlign: "left" }}
											>
												Missed Treatment
											</th>
											<th
												scope="col"
												style={{ color: "#ACACAC", textAlign: "left" }}
											>
												Rating
											</th>
										</tr>
									</thead>
									<tbody
										className={
											pcounts.potentialpatients === 0 ||
											(sortArray.length === 0 &&
												pcounts.potentialpatients !== 0)
												? "norecords"
												: ""
										}
									>
										{pcounts.potentialpatients === 0 && (
											<>
												<tr>
													<td></td>
													<td></td>
													<td></td>
													<td>No Patients</td>
													<td></td>
													<td></td>
													<td></td>
												</tr>
											</>
										)}
										{sortArray.length === 0 &&
											pcounts.potentialpatients !== 0 && (
												<>
													<tr>
														<td></td>
														<td></td>
														<td></td>
														<td>No Patients for this search</td>
														<td></td>
														<td></td>
														<td></td>
													</tr>
												</>
											)}
										{sortArray.length > 0 &&
											sortArray.map(function (i, index) {
												return <>{showPatient(i, index, false)}</>;
											})}
									</tbody>
								</table>
							</div>
						</Tab>
					</Tabs>
				</div>
			</div>
			<div className="col-2">&nbsp;</div>
		</div>
	);
};
export default Patient1;
