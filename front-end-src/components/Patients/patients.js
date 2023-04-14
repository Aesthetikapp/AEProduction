import React, { useState, useEffect } from "react";
import * as utils from "../../common/util";
import { Animated } from "react-animated-css";
import Patient1 from "./patient1";
import { useLocation, useNavigate } from "react-router-dom";
import * as UserServices from "../../services/user";
import * as QuestionService from "../../services/questions";
// import * as TreatmentServices from "../../services/treatments";

const Patients = () => {
	const [patients, setPatients] = useState([]);
	const [patientids, setPatientids] = useState([]);
	const [appointments, setAppointments] = useState([]);
	const navigate = useNavigate();
	const params = useLocation().state;
	const [temparray, setTemparray] = useState([]);
	const [tempArray, setTempArray] = useState([]);
	const [treatments, setTreatments] = useState([]);
	const [questions, setQuestions] = useState([]);
	const [allquestions, setAllQuestions] = useState([]);
	const [allquestionsp, setAllQuestionsP] = useState([]);
	const [allquestionsc, setAllQuestionsC] = useState([]);

	const navigatetopage = (path, obj) => {
		params["page"] = obj;
		console.log("navigatetopage " + path, params);
		navigate(path, { state: params });
	};

	// console.log("params", params);
	const patient_detials = (id) => {
		UserServices.GetAppointment(id).then((app) => {
			Object.values(app.data).forEach((ids) => {
				if (!patientids.includes(ids.patientid)) {
					patientids.push(ids.patientid);
				}
			});

			patientids.forEach((pat) => {
				if (!temparray.includes(pat)) {
					temparray.push(pat);
					UserServices.GetPatientById(pat).then((app) => {
						setPatients((prev) => [...prev, app.data.patientByID]);
					});
					UserServices.GetAppointmentOfPatientswithDoctors(pat, id).then(
						(app) => {
							// console.log("patients", app.data);

							console.log("app.data", app.data);
							setAppointments((prev) => [...prev, app.data]);
						}
					);
				}
			});
		});
	};

	async function fetchTodos() {
		try {
			const response = await QuestionService.GetQuestion();
			let qarray = response.questions.map(function (ele) {
				return { ...ele, parentid: "" };
			});
			let qarray1 = qarray;
			qarray1.map(function (ele) {
				if (ele.childquestionid != "") {
					// console.log("all eleid", ele.childquestionid + " " + ele.id);
					ele.childquestionid.split("|").map((h) => {
						qarray.map(function (ele1) {
							// console.log("all x " + h, ele1.id);
							if (h == ele1.id) {
								return (ele1.parentid = ele.id);
							}
						});
					});
				}
				//  return ele.Active='false';
			});
			setAllQuestions(qarray.sort((a, b) => a.order - b.order));
			setAllQuestionsP(
				qarray
					.filter((question) => question.parentid === "")
					.sort((a, b) => a.order - b.order)
			);
			setAllQuestionsC(
				qarray
					.filter((question) => question.parentid !== "")
					.sort((a, b) => a.order - b.order)
			);
			console.log(
				"all",
				"all ques ",
				allquestions,
				"qarray ",
				qarray,
				"qarray1 ",
				qarray1,
				"parentq ",
				qarray.filter((question) => question.parentid === ""),
				"childq ",
				qarray.filter((question) => question.parentid !== "")
			);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchTodos();
		if (params.isadmin) {
			UserServices.getDoctors(params.clinicname).then(function (result) {
				console.log("doctors", result.data.usersByClinicName);
				result.data.usersByClinicName.forEach((doctor) => {
					patient_detials(doctor.id);
				});
			});
		} else {
			patient_detials(params.id);
		}
	}, [params]);

	return (
		<Animated
			style={{
				height: "100%",
				bottom: "0px",
				left: "0px",
				display: "grid",
				alignItems: "center",
				minHeight: "100%",
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
					page="patients"
					goto={navigatetopage}
					params={params}
				/>

				<Patient1
					appointments={appointments}
					patients={patients}
					treatments={treatments}
					tempArray={tempArray}
					allquestions={allquestions}
					allquestionsP={allquestionsp}
					allquestionsC={allquestionsc}
				/>

				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
			</div>
		</Animated>
	);
};
export default Patients;
