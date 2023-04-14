import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { Modal } from "react-bootstrap";
// import { Animated } from "react-animated-css";
import * as utils from "../../common/util";
import * as UserServices from "../../services/user";
import * as NotificationServices from "../../services/notifications";
import AeAutoSuggest from "./aeautosuggest";
import ClinicModal from "./clinicmodal";
import {
	sendBusinessRequestEmailNotification,
	sendDenyRequestEmailNotification,
} from "../../services/notificationservices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClinicName = () => {
	const [modalShow, setModalShow] = useState(false);

	const notify = () =>
		toast("Email sent to admin to accept your request!", {
			position: toast.POSITION.BOTTOM_CENTER,
			autoClose: 3000,
		});

	const showNewClinic = (show) => {
		state.params.clinicname = "";
		setModalShow(show);
		setState({ ...state, params: state.params });
	};
	const navigate = useNavigate();
	const params = useLocation().state;
	const firstupdate = useRef(true);
	//console.log(Object.keys(params).length);
	const [state, setState] = useState({
		params,
	});
	const [clinicnames, setClinicNames] = useState([]);
	// console.log(state);
	useLayoutEffect(() => {
		// console.log(firstupdate.current);
		if (firstupdate.current) {
			return;
		}
	}, [state]);

	useEffect(() => {
		UserServices.GetClinicsByAdmin().then((res) => {
			// console.log(res.userByAdmin);
			let x = [];
			res.userByAdmin.forEach((item) => {
				x.push(item);
			});
			setClinicNames(x);
		});
	}, []);

	const getValue = (value) => {
		state.params.clinicname = value;
		setState({ ...state, params: state.params });
	};

	const showNextStep = (doctortype, type) => {
		let sindex = state.params.currentstep;
		state.params.clinicname =
			type === "continue" ? doctortype : state.params.clinicname;
		sindex++;
		// console.log(state.params.clinicname);
		var clinic = clinicnames.find((el) => {
			if (el.clinicname === state.params.clinicname) {
				return true;
			} else {
				return false;
			}
		});
		state.params.currentstep = sindex.toString();

		if (clinic !== undefined) {
			// console.log("exist clinic");
			let aclinic = clinicnames.filter(function (elem) {
				return elem.clinicname === state.params.clinicname;
			});
			// console.log(aclinic[0].business[0]);
			const updateVariables = UserServices.returnUpdateVariables({
				id: state.params.id,
				step: state.params.step.toString(),
				prevstep: state.params.prevstep.toString(),
				clinicname: state.params.clinicname,
				isadmin: "false",
				business: [
					{
						btype: "doctor",
						website: aclinic[0].business[0].website,
						bavatar: aclinic[0].business[0].bavatar,
						name: aclinic[0].business[0].name,
						noofemployees: aclinic[0].business[0].noofemployees,
						location: [
							{
								line1: aclinic[0].business[0].location[0].line1,
								line2: aclinic[0].business[0].location[0].line2,
								country: aclinic[0].business[0].location[0].country,
								state: aclinic[0].business[0].location[0].state,
								towncity: aclinic[0].business[0].location[0].towncity,
								postcode: aclinic[0].business[0].location[0].postcode,
							},
						],
					},
				],
			});
			// console.log(updateVariables);
			UserServices.UpdateUser(updateVariables).then((value) => {
				// console.log(
				// 	clinic.id,
				// 	state.params.id,
				// 	state.params.firstName,
				// 	clinic.email,
				// 	clinic.firstName,
				// 	clinic.business[0].name
				// );

				const CreateNotification = NotificationServices.returnCreateVariables({
					adminid: clinic.id,
					doctorid: state.params.id,
					message1:
						"A request from Dr." +
						state.params.firstName +
						" to join the business " +
						clinic.business[0].name +
						" ( Clinic: " +
						clinic.clinicname +
						" )",
					kind: "request",
					status: "pending",
					isopened: false,
				});
				// console.log("createnotif", CreateNotification);
				NotificationServices.CreateNotification(CreateNotification).then(
					(val) => {
						// console.log("value", val);
						sendBusinessRequestEmailNotification(
							clinic.id,
							state.params.id,
							clinic.firstName,
							clinic.email,
							state.params.firstName,
							clinic.business[0].name +
								" ( Clinic: " +
								clinic.clinicname +
								" )",
							window.location.origin,
							window.location.origin + "/accept/",
							window.location.origin + "/request/",
							val.notification.id
						);

						notify();
					}
				);
			});
		} else {
			const updateVariables = UserServices.returnUpdateVariables({
				id: state.params.id,
				currentstep: "3",
				step: state.params.step.toString(),
				prevstep: state.params.prevstep.toString(),
				clinicname: state.params.clinicname,
				isadmin: "true",
				business: [
					{
						btype: "business",
						name: state.params.clinicname,
					},
				],
			});
			state.params.business[0].name = state.params.clinicname;
			setState({ ...state, params: state.params });
			UserServices.UpdateUser(updateVariables).then((value) => {
				// console.log(value);
				// console.log(state.params);
				navigate("../createbusiness", { state: state.params });
			});
		}
	};

	const ClinicName = (val) => {
		state.params.clinicname = val;
		// console.log(val);
		setState({ ...state, params: state.params });
		// console.log(state);
	};
	return (
		<>
			<ToastContainer
				hideProgressBar
				autoClose={3000}
				className="tcontainer"
				toastClassName="twrapper"
				bodyClassName="tbody"
				progressClassName="tprogress"
			/>
			<ClinicModal
				onChange={ClinicName}
				showNextStep={showNextStep}
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
			{utils.aeProgressBar({ width: "12.5%" })}
			<div class="slider1">
				<div style={{ backgroundColor: "#FFFFFF", overflow: "hidden" }}>
					<div className="row pt-3" style={{ backgroundColor: "#FFFFFF" }}>
						<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12">
							<utils.aeLogo fcolor="color-00" />
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-2rem"></div>
							</div>
							<div className="row">
								<div className="col-8 pl-10">
									<label className="f-rl fm-w7-s35">
										Okay, tell us about yourself
									</label>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-2rem"></div>
							</div>
							<div className="row">
								<div className="col-10 pl-10" style={{ zIndex: 1 }}>
									<button
										className="btn-rounded-bselect w100"
										data-name="business"
										onClick={showNextStep}
									>
										I work for a clinic/ institution practise
										<span
											data-name="business"
											onClick={showNextStep}
											className="coral b1 fm-w6-s16"
										>
											Business
										</span>
										&nbsp;&nbsp;&nbsp;&nbsp;
									</button>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-6"></div>
							</div>
							<div className="row">
								<div className="col-10 pl-10" style={{ zIndex: 1 }}>
									<button
										className="btn-rounded-bselect w100"
										onClick={showNextStep}
										data-name="doctor"
									>
										I am a personal doctor
										<span
											onClick={showNextStep}
											data-name="doctor"
											className="coral b2 fm-w6-s16"
										>
											Self-employed
										</span>
										&nbsp;&nbsp;&nbsp;&nbsp;
									</button>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12 imgalign">
							<img
								style={{ width: "100%" }}
								loading="lazy"
								className="body-bg-clinic-s2"
								alt="clinic"
							></img>
						</div>
					</div>
				</div>
			</div>

			<div className="slider">
				<div style={{ backgroundColor: "#FFFFFF", overflow: "hidden" }}>
					<div className="row pt-3" style={{ backgroundColor: "#FFFFFF" }}>
						<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12">
							<utils.aeLogo fcolor="color-00" />
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-2rem"></div>
							</div>
							<div className="row">
								<div className="col-8 pl-12">
									<label className="f-rl fm-w7-s36">
										What’s the name of your clinic / Institution?
									</label>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-2rem"></div>
							</div>
							<div className="row">
								<div className="col-sm-6 col-xs-6 col-md-6 col-8 pl-12">
									<div className="form-outline">
										<label
											className="form-label form f-fm fm-w6-s12"
											htmlFor="form3Example8"
											style={{ marginLeft: "0px" }}
										>
											Clinic / Institution Name
										</label>

										<AeAutoSuggest
											props={clinicnames}
											showNewClinic={showNewClinic}
											getvalue={getValue}
										></AeAutoSuggest>
										<div className="form-notch">
											<div
												className="form-notch-leading"
												style={{ width: "9px" }}
											></div>
											<div
												className="form-notch-middle"
												style={{ width: "55.2px" }}
											></div>
											<div className="form-notch-trailing"></div>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-3rem"></div>
							</div>
							<div className="row">
								<div className="col pl-12">
									<utils.aeButton
										classNames="aebutton fm-w6-s18"
										text="Next"
										enabled="false"
										disabledClass={
											state.params.clinicname === ""
												? "aebuttongrey"
												: "aebuttonblack"
										}
										onClick={() => showNextStep("Doctor", "business")}
									/>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12 imgalign">
							<img
								style={{ width: "100%" }}
								loading="lazy"
								className="body-bg-clinic-s3"
								alt="clinic"
							></img>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default ClinicName;
