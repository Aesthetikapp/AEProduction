import React, { useState, useEffect } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import * as UserServices from "../../services/user";
import Addmember from "./addmumberpop";

const ManageTeam = (props) => {
	const [arr, setArr] = useState([]);

	useEffect(() => {
		setArr(props.team);
	}, [props.team]);

	const deleteTreatmentHandler = (id) => {
		UserServices.DeleteUser(id).then(function (result) {
			console.log(result);
			if (result.data.deleteUser.id) {
				props.update(true);
			}
		});
	};

	return (
		<div className="roundedWhite-80p">
			<div style={{ padding: "30px" }}>
				<div className="col-12">
					<div className="row">
						<div
							className="col-xl-6 col-lg-6 col-md-6 col-xs-6 col-sm-6"
							style={{ paddingTop: "4vh", paddingBottom: "4vh" }}
						>
							<label
								className="f-fm fm-w6-s20"
								style={{ cursor: "pointer" }}
								onClick={props.hideManagTeam}
							>
								&lt;&nbsp;&nbsp;Manage team
							</label>
						</div>
						<div
							className="col-xl-6 col-lg-6 col-md-6 col-xs-6 col-sm-6 rightremove"
							style={{
								justifycontent: "end",
								paddingTop: "2vh",
							}}
						>
							<Addmember
								clinicname={props.params.params.clinicname}
								business={props.params.params.business[0]}
								name={
									props.params.params.firstName +
									" " +
									props.params.params.lastName
								}
								adminid={props.params.params.id}
							/>
						</div>
					</div>
					<div className="row">
						<div className="table-responsive">
							<table className="table table-responsive">
								<thead>
									<tr>
										<th className="col-1" style={{ color: "#ACACAC" }}>
											{" "}
										</th>
										<th className="col-5" style={{ color: "#ACACAC" }}>
											{" "}
											NAME
										</th>
										<th className="col-5" style={{ color: "#ACACAC" }}>
											{" "}
											TEAM PERMISSION
										</th>
										<th
											className="col-3"
											style={{ textAlign: "center", color: "#ACACAC" }}
										>
											MORE
										</th>
									</tr>
								</thead>
								<tbody>
									{arr.map((key) => {
										return (
											<tr style={{ borderBottom: "hidden" }} key={key.email}>
												<td style={{ textAlign: "end" }}>
													<img
														onError={(e) => {
															e.target.src = "../images/avatar.png";
														}}
														src={key.avatar}
														style={{
															width: "56px",
															height: "56px",
															borderRadius: "50%",
														}}
														alt="avatar"
													></img>
												</td>
												<td className="f-fm fm-w6-s20">
													{key.firstName}
													<br></br>
													<span className="f-fm fm-w5-s14">{key.email}</span>
												</td>
												<td className="fm-w6-s16">
													{key.isadmin === true ? "Admin user" : "Member"}
												</td>
												<td style={{ textAlign: "center" }}>
													<OverlayTrigger
														trigger="click"
														rootClose
														placement="left-start"
														overlay={
															<Popover
																id="popover-basic"
																style={{
																	height: "58px",
																	width: "121px",
																	backgroundColor: "#fff",
																	borderRadius: "10px",
																}}
															>
																<Popover.Body
																	style={{ padding: "0px", paddingTop: "13px" }}
																>
																	<div
																		style={{
																			color: "#777777",
																			cursor: "pointer",
																			background: "#F4F4F4",
																			width: "121px",
																			height: "32px",
																			paddingTop: "5px",
																			paddingLeft: "10px",
																		}}
																		onClick={() => {
																			// deleteTreatmentHandler(key.id);
																		}}
																		className="f-fm fm-w5-s14"
																	>
																		Remove
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
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ManageTeam;
