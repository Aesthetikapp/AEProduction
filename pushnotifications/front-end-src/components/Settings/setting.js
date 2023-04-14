import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ManageTeam from "./manageteam";
import * as UserServices from "../../services/user";
import Cropmodal from "./../ProfileSetup/cropmodal";
import Modal from "react-bootstrap/Modal";
import * as utils from "../../common/util";

const Setting = (props) => {
	// console.log("settings props", props.params);
	const navigate = useNavigate();
	const [isManageTeam, setisManageTeam] = useState("none");
	const firstupdate = useRef(true);
	const [team, setTeam] = useState([]);
	const [docs, setDocs] = useState([]);
	const [update, setUpdate] = useState(false);
	const [edit, setEdit] = useState(false);
	const [file, setFile] = useState();
	const [filebavatar, setFilebavatar] = useState();
	const [state, setState] = useState({
		personalbio: props.params.bio1,
		website: props.params.business[0].website,
		noofemployees: props.params.business[0].noofemployees,
		businessname: props.params.business[0].name,
	});

	var today = new Date();
	const userName = props.params.email.replace(/[^a-zA-Z0-9]/g, "") + "/";

	const hideManageTeam = () => {
		setisManageTeam("none");
	};
	const handleShow = () => setEdit(true);
	const handleClose = () => setEdit(false);

	useLayoutEffect(() => {
		// console.log("props.params.clinicname", props.params);

		if (firstupdate.current || update) {
			let clinic = props.params.clinicname;

			UserServices.getDoctors(clinic).then(function (result) {
				// console.log("doctors", result.data.usersByClinicName);
				setTeam(result.data.usersByClinicName);
			});
		}
		setUpdate(false);
	}, [update]);

	useEffect(() => {
		UserServices.GetSumsubDocs(
			// "level-106e6748-fa62-4fb6-9d87-57d67d6fb480"
			// "636de11178e59270608aa6a4"
			props.params.id
			// "63d75d72536a1affe7ebe740"
		).then((result) => {
			// console.log("sumsub details", result.docSets);
			setDocs(result.docSets);
			// console.log(result);
			// navigate("../personalprofile", { state: state.params });
		});
	}, []);

	const handleChange = (event) => {
		if (event.target.name === "businessname") {
			state.businessname = event.target.value;
		}
		if (event.target.name === "personalbio") {
			state.personalbio = event.target.value;
		}
		if (event.target.name === "businesswebsite") {
			state.website = event.target.value;
		}
		setState({ ...state, params: state.params });
		// console.log(state);
	};

	const handleSelectChange = (event) => {
		state.noofemployees = event.target.value;
		setState({ ...state, params: state.params });
		// console.log(state);
	};

	const onImageChange = (image) => {
		image = new File([image], "Profile.png", { type: "image/png" });
		// console.log(image);
		state.avatar = image;
		setState({ ...state, params: state.params });
		setFile(image);
	};

	const onImageChangebavatar = (image) => {
		image = new File([image], "Business.png", { type: "image/png" });
		// console.log(image);
		state.bavatar = image;
		setState({ ...state, params: state.params });
		setFilebavatar(image);
	};

	const showNextStep = (doctortype) => {
		// console.log("values", state, file, filebavatar);

		var updateVariables1;
		if (props.params.isadmin) {
			updateVariables1 = UserServices.returnUpdateVariables({
				id: props.params.id,
				bio1: state.personalbio,
				business: [
					{
						website: state.website,
						name: state.businessname,
						noofemployees: state.noofemployees,
					},
				],
			});
		} else {
			updateVariables1 = UserServices.returnUpdateVariables({
				id: props.params.id,
				bio1: state.personalbio,
			});
		}
		const updateVariables = updateVariables1;
		// console.log(updateVariables);

		(async function anyNameFunction() {
			const formData = new FormData();
			formData.append("user", userName);
			if (file !== undefined) {
				formData.append("file1", file);
			}
			if (props.params.isadmin) {
				if (filebavatar !== undefined) {
					formData.append("file2", filebavatar);
				}
			}
			if (file !== undefined || filebavatar !== undefined) {
				UserServices.Imageuploader(formData).then((result) => {
					// console.log("res", result);
				});
			}

			if (props.params.isadmin) {
				UserServices.getDoctors(props.params.clinicname).then(function (
					result
				) {
					// console.log("doctors", result.data.usersByClinicName);
					result.data.usersByClinicName.forEach((doctor) => {
						// patient_detials(doctor.id);
						// console.log("ids", doctor);
						updateVariables1 = UserServices.returnUpdateVariables({
							id: doctor.id,
							bio1: state.personalbio,
							business: [
								{
									website: state.website,
									name: state.businessname,
									noofemployees: state.noofemployees,
								},
							],
						});
						var updateVariables = updateVariables1;
						UserServices.UpdateUser(updateVariables).then((value) => {
							// console.log(value);
							// window.location.reload();
						});
					});
				});
				setTimeout(() => {
					(async function anyNameFunction() {
						var c = await UserServices.GetUserByEmail(props.params.email);
						navigate("../dashboard", { state: c.userByEmail[0] });
					})();
				}, 500);
			} else {
				UserServices.UpdateUser(updateVariables).then((value) => {
					// console.log(value);
					// window.location.reload();
					setTimeout(() => {
						(async function anyNameFunction() {
							var c = await UserServices.GetUserByEmail(props.params.email);
							navigate("../dashboard", { state: c.userByEmail[0] });
						})();
					}, 500);
				});
			}
		})();
	};

	const getButtonClass = () => {
		// console.log(state);
		let rvalue = "aebuttonblack";
		let urlregex =
			/(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/;
		let validbussinesswebsite = urlregex.test(state.website);
		let _blogo = props.params.business[0].bavatar;
		let svalue;
		if (props.params.isadmin) {
			svalue =
				(state.personalbio === "" ? "@#@" : state.personalbio) +
				(state.website === "" ? "@#@" : state.website) +
				(state.noofemployees === "" ? "@#@" : state.noofemployees) +
				(!validbussinesswebsite ? "@#@" : validbussinesswebsite) +
				(state.businessname === "" ? "@#@" : state.businessname);
		} else {
			svalue = state.personalbio === "" ? "@#@" : state.personalbio;
		}

		// console.log(svalue);

		if (svalue.indexOf("@#@") >= 0) {
			rvalue = "aebuttongrey";
		}
		return rvalue;
	};

	return (
		<>
			{isManageTeam === "none" && (
				<div className="row" style={{ width: "100%", paddingTop: "4vh" }}>
					<div className="col-xl-4 col-lg-4 col-md-12 col-xs-12 col-sm-12">
						<div className="card scard" style={{ height: "100%" }}>
							<div className="card-body">
								<div className="col-xl-12 col-lg-12 col-md-12 col-xs-12 col-sm-12">
									<div className="row">
										<div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1"></div>
										<div className="col-xl-9 col-lg-6 col-md-6 col-xs-6 col-sm-6">
											<label
												style={{
													color: "#ACACAC",
													height: "15px",
													width: "91px",
												}}
												className="f-fm fm-w6-s12"
											>
												BUSINESS INFO
											</label>
										</div>
										<div className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3"></div>
									</div>
									<div className="row">
										<div className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2"></div>
										<div
											style={{
												display: "flex",
												textAlign: "center",
												justifyContent: "center",
												paddingTop: "10vh",
												paddingBottom: "6vh",
											}}
										>
											<img
												onError={(e) => {
													e.target.src = "../images/Healthcare-Clinic-icon.png";
												}}
												loading="lazy"
												alt="Bussiness avatar"
												style={{
													width: "100px",
													height: "100px",
													borderRadius: "50%",
												}}
												src={
													props.params.business[0].bavatar +
													"?" +
													today.getHours() +
													today.getMinutes() +
													today.getSeconds()
												}
											/>
										</div>
									</div>

									<div className="row">
										<div
											className="col-xl-12 col-lg-12 col-md-12 col-xs-12 col-sm-12"
											style={{
												display: "flex",
												textAlign: "center",
												justifyContent: "center",
											}}
										>
											<label className="f-fm fm-w7-s24">
												{props.params.clinicname}
											</label>
										</div>
									</div>
									<br />
									<div className="row">
										<div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1"></div>
										<div
											className="col-xl-6 col-lg-6 col-md-6 col-xs-6 col-sm-6 f-fm fm-w4-s16 "
											style={{ paddingTop: "2vh", paddingBottom: "2vh" }}
										>
											Type: {props.params.business[0].btype}
										</div>
									</div>
									<div className="row">
										<div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1"></div>
										<div
											className="col-xl-11 col-lg-6 col-md-6 col-xs-6 col-sm-6 f-fm fm-w4-s16  "
											style={{ paddingTop: "2vh", paddingBottom: "2vh" }}
										>
											Website:&nbsp;
											<a
												className="f-fm fm-w4-s16"
												href={"https://" + props.params.business[0].website}
												style={{ color: "#4786FF" }}
											>
												{props.params.business[0].website}
											</a>
										</div>
									</div>
									<div className="row">
										<div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1"></div>
										<div
											className="col-xl-11  col-lg-6 col-md-6 col-xs-6 col-sm-6 f-fm fm-w4-s16  "
											style={{ paddingTop: "2vh" }}
										>
											Size:&nbsp; {props.params.business[0].noofemployees}
											&nbsp;employees
										</div>
									</div>

									<div className="row pt-5 pb-5">
										<div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1"></div>
										{team.slice(0, 4).map((key) => (
											<div
												key={key.avatar}
												className="col-2"
												style={{ paddingRight: "0px", paddingLeft: "20px" }}
											>
												<img
													onError={(e) => {
														e.target.src = "../images/avatar.png";
													}}
													src={key.avatar}
													alt="avatar"
													style={{
														width: "56px",
														height: "56px",
														borderRadius: "50%",
													}}
												/>
											</div>
										))}

										{team.length > 4 && (
											<div
												className="col-auto"
												style={{ paddingRight: "0px", paddingLeft: "20px" }}
											>
												<div
													style={{
														display: "flex",
														height: "56px",
														width: "56px",
														border: "1px solid #777777",
														borderRadius: "50%",
													}}
												>
													<p
														style={{ fontFamily: "Mulish", margin: "auto" }}
														className="fm-w6-s12"
													>
														+ {team.length - 4}
													</p>
												</div>
											</div>
										)}
									</div>
									{props.params.isadmin && (
										<div className="row">
											<div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1"></div>
											<div
												className="col-xl-6  col-lg-6 col-md-6 col-xs-6 col-sm-6 managebuttonresp"
												style={{ paddingRight: "0px", paddingLeft: "15px" }}
											>
												<button
													type="btn"
													style={{
														borderRadius: "40px",
														width: "231px",
														height: "60px",
														background: "#000000",
													}}
													onClick={() => {
														setisManageTeam("block");
													}}
												>
													<label
														style={{ color: "white", cursor: "pointer" }}
														className=" f-fm fm-w6-s20"
													>
														Manage Team
													</label>
												</button>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>

					<div className="col-xl-7 col-lg-7 col-md-12 col-xs-12 col-sm-12">
						<div className="card scard" style={{ height: "100%" }}>
							<div className="card-body">
								<div
									style={{ paddingLeft: "10px" }}
									className="col-xl-12 col-lg-12 col-md-12 col-xs-12 col-sm-12"
								>
									<div>
										{" "}
										<h5 style={{ color: "#ACACAC" }} className="f-fm fm-w6-s12">
											PERSONAL INFO{" "}
											<span
												className="f-fm fm-w6-s12"
												style={{ color: "#ACACAC", paddingLeft: "10px" }}
											>
												(Public)
											</span>
										</h5>
									</div>{" "}
									<hr />
									<div className="row">
										<div className="col-xl-11  col-lg-8 col-md-8 col-xs-8 col-sm-8 pb-2">
											<div className="f-fm fm-w7-s24">
												{props.params.firstName} &nbsp; {props.params.lastName}
											</div>
										</div>
										<div className="col-xl-1 col-lg-3 col-md-3 col-xs-3 col-sm-3">
											<div
												style={{
													display: "flex",
													height: "30px",
													width: "30px",
													border: "none",
													borderRadius: "50%",
													background: "#F4F4F4",
													cursor: "pointer",
												}}
												onClick={handleShow}
											>
												<img
													alt=""
													loading="lazy"
													src="./images/Group258.png"
												/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-xl-8 col-lg-8 col-md-8 col-xs-8 col-sm-8">
											<div className="f-fm fm-w4-s14 color-7">
												{props.params.email}
											</div>
										</div>
										<div className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3"></div>
									</div>
									<div className="row">
										<div className="col-xl-8 col-lg-8 col-md-8 col-xs-8 col-sm-8">
											<div className="f-fm fm-w4-s14 color-7">
												{props.params.primaryTelephone}
											</div>
										</div>
										<div className=" col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3"></div>
									</div>
									<br></br>
									<div className="row">
										<div className="col-xl-12  col-lg-6 col-md-6 col-xs-6 col-sm-6 ">
											<div
												style={{ color: "#000000" }}
												className="f-fm fm-w4-s14 "
											>
												{props.params.bio1}
												<br></br> {props.params.bio2}
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-xl-8 col-lg-8 col-md-8 col-xs-8 col-sm-8">
											<div
												className="f-fm fm-w6-s12 "
												style={{ paddingTop: "120px", color: "#ACACAC" }}
											>
												DOCUMENT
												<span
													className="f-fm fm-w6-s12"
													style={{
														color: "#ACACAC",
														paddingLeft: "10px",
													}}
												>
													(Private)
												</span>
											</div>
										</div>
										<div className=" col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3"></div>
									</div>
									<hr></hr>
									{Object.values(docs).map((i, index) => {
										return (
											<>
												<div className="row" key={index}>
													<div className="col-xl-5 col-lg-6 col-md-6 col-xs-6 col-sm-6">
														<div className="f-fm fm-w4-s14">
															{i.idDocSetType}
														</div>
														{i.types.map((t) => {
															return <span key={t}>{t} </span>;
														})}
													</div>
													<div
														className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3 f-fm fm-w6-s14"
														style={{
															color: "#00C3A0",
															textAlign: "end",
														}}
													>
														<img
															loading="lazy"
															alt=""
															src="./images/Vector 8.png"
														/>
														&nbsp;Approved
													</div>

													<div
														className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3 profile f-fm fm-w6-s14"
														style={{
															color: "#ACACAC",
															textAlign: "end",
														}}
													>
														<label
															style={{
																color: "#ACACAC",
																lineHeight: "18px",
																textDecorationLine: "underline",
															}}
														>
															File added
														</label>
													</div>
												</div>
												<div className="thin">
													<hr />
												</div>
											</>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{isManageTeam === "block" && (
				<ManageTeam
					hideManagTeam={hideManageTeam}
					team={team}
					params={props}
					update={(e) => setUpdate(e)}
				></ManageTeam>
			)}

			<Modal
				show={edit}
				onHide={handleClose}
				dialogClassName="modal-sm-30px modal-lg modal-md"
				position="top-right"
			>
				<Modal.Body>
					<div>
						<div className="row">
							<div className="col-xl col-lg col-md col-xs col-sm">
								<img
									alt="Close"
									onClick={handleClose}
									style={{
										cursor: "pointer",
										padding: "30px",
										float: "right",
										paddingRight: "52px",
									}}
									src="../images/close.png"
								></img>
							</div>
						</div>
						<div className="row" style={{ padding: "20px" }}>
							<div className="col-xl col-lg col-md col-xs col-sm">
								<div className="row">
									<div className="col-xl col-lg col-md col-xs col-sm">
										<label className="f-fm fm-w7-s18 color-00">
											Edit Profile
										</label>
									</div>
								</div>
								<div className="row">
									<div className="col-xl col-lg col-md col-xs col-sm">
										<hr
											style={{
												color: "rgb(149 142 142)",
												backgroundColor: "#000000",
												height: 2,
											}}
										/>
									</div>
								</div>

								<div className="row">
									<div className="form-outline pt-3">
										<label
											className="form-label form f-fm fm-w6-s12"
											htmlFor="form3Example8"
											style={{ marginLeft: "0px" }}
										>
											BIO
										</label>
										<textarea
											className="form-control"
											id="exampleFormControlTextarea1"
											rows="3"
											name="personalbio"
											defaultValue={props.params.bio1}
											onChange={handleChange}
										></textarea>
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
								<div class="row pt-3">
									<div className="form-outline">
										<label
											className="form-label form f-fm fm-w6-s12"
											htmlFor="form3Example8"
											style={{ marginLeft: "0px" }}
										>
											Your Avatar
										</label>
										<br></br>
										<Cropmodal
											onImageChange={onImageChange}
											ttype="edit"
											ttypetext={props.params.avatar}
										></Cropmodal>
										<label
											className="form-label form f-fm fm-w6-s10"
											htmlFor="form3Example8"
											style={{
												marginLeft: "0px",
												fontSize: "10px",
												color: "darkgrey",
											}}
										>
											Note: Click on the image to edit.
										</label>
										<br></br>
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
						</div>

						{props.params.isadmin && (
							<div className="row" style={{ padding: "20px" }}>
								<div className="col-xl col-lg col-md col-xs col-sm">
									<div className="row">
										<div className="col-xl col-lg col-md col-xs col-sm">
											<label className="f-fm fm-w7-s18 color-00">
												Edit Business
											</label>
										</div>
									</div>

									<div className="row">
										<div className="col-xl col-lg col-md col-xs col-sm">
											<hr
												style={{
													color: "rgb(149 142 142)",
													backgroundColor: "#000000",
													height: 2,
												}}
											/>
										</div>
									</div>

									<div className="row pb-3">
										<div className="form-outline pt-3">
											<label
												className="form-label form  f-fm fm-w6-s12"
												htmlFor="form3Example8"
												style={{ marginLeft: "0px" }}
											>
												Business Website
											</label>
											<input
												type="text"
												id="txtbusinesswebsite"
												style={{ height: "60px" }}
												name="businesswebsite"
												defaultValue={props.params.business[0].website}
												className="form-control form-control-lg"
												// value={state.website}
												onChange={handleChange}
											/>
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
									<div class="row pb-3">
										<div className="form-outline">
											<label
												className="form-label form f-fm fm-w6-s12"
												htmlFor="form3Example8"
												style={{ marginLeft: "0px" }}
											>
												Your Business Avatar
											</label>
											<br></br>
											<Cropmodal
												onImageChange={onImageChangebavatar}
												ttype="edit"
												ttypetext={props.params.business[0].bavatar}
											></Cropmodal>
											<label
												className="form-label form f-fm fm-w6-s10"
												htmlFor="form3Example8"
												style={{
													marginLeft: "0px",
													fontSize: "10px",
													color: "darkgrey",
												}}
											>
												Note: Click on the image to edit.
											</label>
											<br></br>
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
									<div class="row pb-3">
										<div className="form-outline">
											<label
												className="form-label form f-fm fm-w6-s12"
												htmlFor="form3Example8"
												style={{ marginLeft: "0px" }}
											>
												Number Of Employees
											</label>
											<select
												className="form-select form-select-lg mb-3"
												name="noofemployees"
												defaultValue={props.params.business[0].noofemployees}
												aria-label=".form-select-lg example"
												onChange={handleSelectChange}
											>
												<option value=""></option>
												<option value="1-10">1-10</option>
												<option value="11-50">11-50</option>
												<option value="51-200">51-200</option>
												<option value="201-500">201-500</option>
												<option value="501-1000">501-1000</option>
												<option value="1001-5000">1001-5000</option>
												<option value=">5000">&gt;5000</option>
											</select>
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
									<div class="row pb-3">
										<div className="form-outline">
											<label
												className="form-label form f-fm fm-w6-s12"
												htmlFor="form3Example8"
												style={{ marginLeft: "0px" }}
											>
												Business Name
											</label>
											<input
												type="text"
												id="txtbusinessname"
												style={{ height: "60px" }}
												name="businessname"
												defaultValue={props.params.business[0].name}
												className="form-control form-control-lg"
												// value={state.email}
												onChange={handleChange}
											/>
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
							</div>
						)}
						<div className="row">
							<div className="col d-flex justify-content-center">
								<utils.aeButton
									classNames="aebutton fm-w6-s18"
									text="Update"
									enabled="false"
									disabledClass={getButtonClass()}
									onClick={() => showNextStep("Doctor")}
								/>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};
export default Setting;
