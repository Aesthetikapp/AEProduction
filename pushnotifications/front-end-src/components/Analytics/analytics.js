import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Revenue from "../DashBoard/revenue";
import { Animated } from "react-animated-css";
import * as utils from "../../common/util";
import Overview from "../DashBoard/overview";
import * as UserServices from "../../services/user";

const Analytics = () => {
	const navigate = useNavigate();
	const params = useLocation().state;
	console.log("paarams", params);
	const navigatetopage = (path, obj) => {
		params["page"] = obj;
		console.log("navigatetopage " + path, params);
		navigate(path, { state: params });
	};
	const [patientids, setPatientids] = useState([]);
	const [temparray, setTemparray] = useState([]);
	const [patients, setPatients] = useState([]);
	const [appointments, setAppointments] = useState([]);

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
							console.log("app.data", app.data);
							setAppointments((prev) => [...prev, app.data]);
						}
					);
				}
			});
		});
	};
	useEffect(() => {
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
						page="analytics"
						goto={navigatetopage}
					/>
					<div className="container-fluid dashboard pl-4">
						<Overview
							params={params}
							appointmentDetails={appointments}
							patients={patients}
							page="analytics"
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
	);
};

export default Analytics;
