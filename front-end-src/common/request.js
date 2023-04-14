import React, { useState, useLayoutEffect } from "react";
import * as utils from "./util";
import { Animated } from "react-animated-css";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import * as NotificationServices from "../services/notifications";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tabs";
import * as UserServices from "../services/user";
import {
	sendAcceptRequestEmailNotification,
	sendDenyRequestEmailNotification,
} from "../services/notificationservices";
import { ToastContainer, toast } from "react-toastify";

const Businessrequest = () => {
	const navigate = useNavigate();
	const params = useLocation().state;
	console.log("paarams", params);

	const [notificationData, setNotificationData] = useState([]);
	const [eal, setEal] = useState(0);
	const [dal, setDal] = useState(0);
	const [accept, setAccept] = useState(0);
	const [params1, setParams1] = useState({ userByID: {} });
	const [istoastr, setIstoastr] = useState(false);

	useLayoutEffect(() => {
		NotificationServices.GetNotificationByAdminid(params.id).then((patient) => {
			console.log("notificationdata", patient.notificationByAdminid);
			setNotificationData(patient.notificationByAdminid);
			var darr = patient.notificationByAdminid.filter(function (elem) {
				return elem.status === "decline";
			});

			var earr = patient.notificationByAdminid.filter(function (elem) {
				return elem.status === "pending";
			});

			var accept = patient.notificationByAdminid.filter(function (elem) {
				return elem.status === "accepted";
			});

			setEal(earr.length);
			setDal(darr.length);
			setAccept(accept.length);
		});
	}, []);

	const navigatetopage = (path, obj) => {
		params["page"] = obj;
		console.log("navigatetopage " + path, params, "obj ", obj);

		navigate(path, { state: params });
	};

	const Remove = (apd, value, doctorid) => {
		setIstoastr(true);

		if (apd !== "") {
			(async function anyNameFunction() {
				console.log("end..", apd);

				const updateSettingsvariables =
					NotificationServices.returnUpdateVariables({
						id: apd,
						status: value,
					});
				console.log("lok", updateSettingsvariables);

				NotificationServices.UpdateNotification(updateSettingsvariables).then(
					(res) => {
						console.log(value);
						if (value === "pending") {
							toast.success("successfully record saved", {
								toastId: "calender",
								position: "top-right",
								autoClose: 3000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
							});
							window.scrollTo(0, 0);
							setTimeout(() => {
								setIstoastr(false);
								window.location.reload();
							}, 3000);
						}
					}
				);
			})();
		}
		if (value === "accepted") {
			const updateVariables = UserServices.returnUpdateVariables({
				id: doctorid,
				currentstep: "4",
			});
			UserServices.UpdateUser(updateVariables).then((value) => {
				console.log(value);
				// console.log(state.params);
				// navigate("../createbusiness", { state: state.params });
			});
			UserServices.GetUserById(doctorid).then((value) => {
				console.log("req", value.userByID);

				sendAcceptRequestEmailNotification(
					value.userByID.id,
					value.userByID.firstName,
					value.userByID.email,

					window.location.origin + "/welcome/",
					value.userByID.business[0].name +
						" ( Clinic: " +
						value.userByID.clinicname +
						" )"
				);
				toast.success("Invitation mail successful", {
					toastId: "request",
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				window.scrollTo(0, 0);
				setTimeout(() => {
					setIstoastr(false);
					window.location.reload();
				}, 3000);
			});
		}
		if (value === "decline") {
			UserServices.GetUserById(doctorid).then((value) => {
				console.log("req", value.userByID);

				// sendAcceptRequestEmailNotification(
				// 	value.userByID.id,
				// 	value.userByID.firstName,
				// 	value.userByID.email,

				// 	window.location.origin + "/welcome/",
				// 	value.userByID.business[0].name +
				// 		" ( Clinic: " +
				// 		value.clinicname +
				// 		" )"
				// );
				console.log(
					"denymessage",
					value.userByID.id,
					value.userByID.firstName,
					value.userByID.email,
					window.location.origin,
					value.userByID.business[0].name +
						" ( Clinic: " +
						value.clinicname +
						" )"
				);
				sendDenyRequestEmailNotification(
					value.userByID.id,
					value.userByID.firstName,
					value.userByID.email,
					window.location.origin,
					value.userByID.business[0].name +
						" ( Clinic: " +
						value.clinicname +
						" )"
				);
				toast.success("Denied mail successful", {
					toastId: "request",
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				window.scrollTo(0, 0);
				setTimeout(() => {
					setIstoastr(false);
					window.location.reload();
				}, 3000);
			});
		}
	};

	const [disablecheckeditems, setDisableCheckeditems] = useState([]);
	const [enablecheckeditems, setEnableCheckeditems] = useState([]);
	const [disableallChecked, setDisableAllChecked] = useState(false);
	const handleAllDisableCheckbox = (event) => {
		const { checked } = event.currentTarget;
		setDisableAllChecked(checked);
		if (checked) {
			notificationData.forEach((item) => {
				if (
					!disablecheckeditems.includes(item.id) &&
					item.status === "pending"
				) {
					setDisableCheckeditems((prev) => [...prev, item.id]);
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

	const TreatmentHandler = (active, doctorid) => {
		var checkeditems =
			active === "decline" ? disablecheckeditems : enablecheckeditems;

		checkeditems.forEach((item) => {
			const updateSettingsvariables =
				NotificationServices.returnUpdateVariables({
					id: item,
					status: "decline",
				});
			console.log("lok", updateSettingsvariables);
			NotificationServices.UpdateNotification(updateSettingsvariables).then(
				(value) => {
					console.log(value);
					setIstoastr(true);

					toast.success("Successfully record saved", {
						toastId: "calender",
						position: "top-right",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
					window.scrollTo(0, 0);
					setTimeout(() => {
						setIstoastr(false);
						window.location.reload();
					}, 3000);
				}
			);
		});
	};

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
						goto={navigatetopage}
						params={params}
					/>

					<div className="row pt-5">
						<div className="col-1"></div>
						<div className="col-10">
							<Tabs
								defaultActiveKey="Request"
								id="profiletab"
								className="list-tab"
							>
								<Tab
									eventKey="profile"
									title={"Request List (" + notificationData.length + ")"}
									disabled
								></Tab>
								<Tab eventKey="Request" title={"Pending (" + eal + ")"}>
									<>
										<div style={{ display: "flex", alignItems: "center" }}>
											&nbsp;
											<span>
												{disablecheckeditems.length > 0 && (
													<label style={{ paddingLeft: "20px" }}>
														<button
															style={{ width: "150px", height: "40px" }}
															className="btn-round"
															onClick={() => TreatmentHandler("decline")}
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

										<table className="col-8 table table-borderless aetable">
											<thead className="f-rl fm-w6-s14 color-AC">
												{eal !== 0 && (
													<tr>
														<th>
															<div
																style={{
																	display: "flex",
																	flexDirection: "row",
																	alignContent: "center",
																	// justifyContent: "space-evenly",
																	alignItems: "center",
																	paddingLeft: "31px",
																}}
															>
																<label
																	className="aecontainer"
																	style={{ color: "#ACACAC" }}
																>
																	Request Details
																	<input
																		type="checkbox"
																		checked={disableallChecked}
																		onChange={handleAllDisableCheckbox}
																	/>
																	<span className="checkmark"></span>
																</label>
															</div>
														</th>

														<th style={{ color: "#ACACAC" }}>Action</th>
													</tr>
												)}
											</thead>
											<tbody>
												{eal == 0 && (
													<tr
														style={{
															textAlign: "center",
															color: "#000000",
															fontSize: "25px",
														}}
													>
														<td> No requests found</td>
													</tr>
												)}
												{notificationData.length > 0 &&
													notificationData.map(function (i, id) {
														return (
															<>
																{i.status === "pending" && (
																	<tr
																		key={i}
																		id={"tr" + i}
																		style={{ backgroundColor: "#FFFFFF" }}
																	>
																		<td style={{ width: "70vw" }}>
																			<div
																				style={{
																					display: "flex",
																					flexDirection: "row",
																					alignContent: "center",
																					//   justifyContent: "space-evenly",
																					alignItems: "center",
																					paddingLeft: "30px",
																					padding: "30px",
																				}}
																			>
																				<label
																					className="aecontainer"
																					style={{ width: "10px" }}
																				>
																					<input
																						type="checkbox"
																						value={i.id}
																						checked={disablecheckeditems.some(
																							(val) => val === i.id
																						)}
																						onChange={handleDisableCheckbox}
																					/>
																					<span className="checkmark"></span>
																				</label>

																				<div className="f-fm fm-w6-s19p02">
																					{i.message1.split("from")[0]}
																					from
																					<span style={{ color: "red" }}>
																						{
																							i.message1
																								.split("from")[1]
																								.split("to")[0]
																						}
																					</span>
																					to
																					{
																						i.message1
																							.split("to")[1]
																							.split("business")[0]
																					}
																					business
																					<span style={{ color: "green" }}>
																						{i.message1.split("business")[1]}
																					</span>
																					&nbsp;
																				</div>
																			</div>
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
																									Remove(
																										i.id,
																										"accepted",
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
																										i.id,
																										"decline",
																										i.doctorid
																									);
																								}}
																							>
																								Deny
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
									</>
								</Tab>
								<Tab eventKey="Deny" title={"Denied (" + dal + ")"}>
									<>
										{/* <div style={{ display: "flex", alignItems: "center" }}>
                      &nbsp;
                      <span>
                        {disablecheckeditems.length > 0 && (
                          <label style={{ paddingLeft: "20px" }}>
                            <button
                              style={{ width: "150px", height: "40px" }}
                              className="btn-round"
                              onClick={() => TreatmentHandler("decline")}
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
                    </div> */}

										<table className="col-8 table table-borderless aetable">
											<thead className="f-rl fm-w6-s14 color-AC">
												{dal !== 0 && (
													<tr>
														<th>
															<div
																style={{
																	display: "flex",
																	flexDirection: "row",
																	alignContent: "center",
																	// justifyContent: "space-evenly",
																	alignItems: "center",
																	// paddingLeft: "25px",
																}}
															>
																<label
																	// className="aecontainer"
																	style={{ color: "#ACACAC" }}
																>
																	Request Details
																	{/* <input
                                  type="checkbox"
                                  checked={disableallChecked}
                                  onChange={handleAllDisableCheckbox}
                                />
                                <span className="checkmark"></span> */}
																</label>
															</div>
														</th>

														<th style={{ color: "#ACACAC" }}>Action</th>
													</tr>
												)}
											</thead>
											<tbody>
												{dal == 0 && (
													<tr
														style={{
															textAlign: "center",
															color: "#000000",
															fontSize: "25px",
														}}
													>
														<td> No denies found</td>
													</tr>
												)}
												{notificationData.length > 0 &&
													notificationData.map(function (i, id) {
														return (
															<>
																{i.status === "decline" && (
																	<tr
																		key={i}
																		id={"tr" + i}
																		style={{ backgroundColor: "#FFFFFF" }}
																	>
																		<td style={{ width: "50vw" }}>
																			<div
																				style={{
																					display: "flex",
																					flexDirection: "row",
																					alignContent: "center",
																					//   justifyContent: "space-evenly",
																					alignItems: "center",
																					paddingLeft: "30px",
																					padding: "30px",
																				}}
																			>
																				<label
																					className="aecontainer"
																					style={{ width: "10px" }}
																				>
																					{/* <input
                                            type="checkbox"
                                            value={i.id}
                                            checked={disablecheckeditems.some(
                                              (val) => val === i.id
                                            )}
                                            onChange={handleDisableCheckbox}
                                          />
                                          <span className="checkmark"></span> */}
																				</label>

																				<div className="f-fm fm-w6-s19p02">
																					{i.message1.split("from")[0]}
																					from
																					<span style={{ color: "red" }}>
																						{
																							i.message1
																								.split("from")[1]
																								.split("to")[0]
																						}
																					</span>
																					to
																					{
																						i.message1
																							.split("to")[1]
																							.split("business")[0]
																					}
																					business
																					<span style={{ color: "green" }}>
																						{i.message1.split("business")[1]}
																					</span>
																					&nbsp;
																				</div>
																			</div>
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
																									Remove(i.id, "pending");
																								}}
																							>
																								Move To Request
																							</div>
																							{/* <div
                                            style={{
                                              color: "rgba(255, 255, 255, 0.8)",
                                              paddingTop: "20px",
                                              paddingLeft: "20px",
                                              cursor: "pointer",
                                            }}
                                            onClick={() => {
                                              Remove(i.id, "decline");
                                            }}
                                          >
                                            Deny
                                          </div> */}
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
									</>
								</Tab>
								<Tab eventKey="Accept" title={"Accepted (" + accept + ")"}>
									<>
										{/* <div style={{ display: "flex", alignItems: "center" }}>
                      &nbsp;
                      <span>
                        {disablecheckeditems.length > 0 && (
                          <label style={{ paddingLeft: "20px" }}>
                            <button
                              style={{ width: "150px", height: "40px" }}
                              className="btn-round"
                              onClick={() => TreatmentHandler("decline")}
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
                    </div> */}

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
																// paddingLeft: "25px",
															}}
														>
															<label
																// className=""
																style={{ color: "#ACACAC" }}
															>
																Request Details
																{/* <input
                                  type="checkbox"
                                  checked={disableallChecked}
                                  onChange={handleAllDisableCheckbox}
                                />
                                <span className="checkmark"></span> */}
															</label>
														</div>
													</th>

													{/* <th style={{ color: "#ACACAC" }}>Action</th> */}
												</tr>
											</thead>
											<tbody>
												{accept == 0 && (
													<tr
														style={{
															textAlign: "center",
															color: "#000000",
															fontSize: "25px",
														}}
													>
														<td> No accept found</td>
													</tr>
												)}
												{notificationData.length > 0 &&
													notificationData.map(function (i, id) {
														return (
															<>
																{i.status === "accepted" && (
																	<tr
																		key={i}
																		id={"tr" + i}
																		style={{ backgroundColor: "#FFFFFF" }}
																	>
																		<td
																			style={{
																				width: "50vw",
																				paddingBottom: "20px",
																			}}
																		>
																			<div
																				style={{
																					display: "flex",
																					flexDirection: "row",
																					alignContent: "center",
																					//   justifyContent: "space-evenly",
																					alignItems: "center",
																					paddingLeft: "30px",
																					padding: "30px",
																				}}
																			>
																				<label
																					className="aecontainer"
																					style={{ width: "10px" }}
																				>
																					{/* <input
                                            type="checkbox"
                                            value={i.id}
                                            checked={disablecheckeditems.some(
                                              (val) => val === i.id
                                            )}
                                            onChange={handleDisableCheckbox}
                                          />
                                          <span className="checkmark"></span> */}
																				</label>

																				<div className="f-fm fm-w6-s19p02">
																					{i.message1.split("from")[0]}
																					from
																					<span style={{ color: "red" }}>
																						{
																							i.message1
																								.split("from")[1]
																								.split("to")[0]
																						}
																					</span>
																					to
																					{
																						i.message1
																							.split("to")[1]
																							.split("business")[0]
																					}
																					business
																					<span style={{ color: "green" }}>
																						{i.message1.split("business")[1]}
																					</span>
																					&nbsp;
																				</div>
																			</div>
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
                                                  Remove(i.id, "pending");
                                                }}
                                              >
                                                Move To Request
                                              </div>
                                              <div
                                            style={{
                                              color: "rgba(255, 255, 255, 0.8)",
                                              paddingTop: "20px",
                                              paddingLeft: "20px",
                                              cursor: "pointer",
                                            }}
                                            onClick={() => {
                                              Remove(i.id, "decline");
                                            }}
                                          >
                                            Deny
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
									</>
								</Tab>
							</Tabs>
						</div>
						<div className="col-1"></div>
					</div>
					{istoastr && (
						<ToastContainer
							toastId="general"
							position="top-right"
							autoClose={3000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme="colored"
						/>
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
				</div>
			</Animated>
		</>
	);
};

export default Businessrequest;
