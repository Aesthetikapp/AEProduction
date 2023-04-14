import React, { useState } from "react";
import * as utils from "../../common/util";
import { Animated } from "react-animated-css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tabs";
import Subscription from "./subscription";
import Payments from "./payments";
import Setting from "./setting";
import AccountSetting from "./accountsetting";
import { useLocation, useNavigate } from "react-router-dom";

const Profile = (props) => {
	var today = new Date();
	const navigate = useNavigate();
	const params = useLocation().state;
	console.log(params);
	const [state, setState] = useState({ page: params.page });
	const navigatetopage = (path, obj) => {
		localStorage.removeItem("comeFrom");
		localStorage.removeItem("preference");
		params["page"] = obj;
		console.log("navigatetopage " + path, params);
		navigate(path, { state: params });
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
						overflowY: "",
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
						dropMenuClassName="btn-darkorange"
					/>
					<div className="container-fluid dashboard pl-4">
						<div className="">
							<div
								className="row"
								style={{
									marginLeft: "-10%",
								}}
							>
								<div className="col">
									<br></br>
									<br></br>
									<br></br>

									<div style={{ textAlign: "center" }}>
										<div>
											<img
												onError={(e) => {
													e.target.src = "../images/avatar.png";
												}}
												// loading="lazy"
												src={
													params?.avatar +
														"?" +
														today.getHours() +
														today.getMinutes() +
														today.getSeconds() ||
													params.mpage?.avatar +
														"?" +
														today.getHours() +
														today.getMinutes() +
														today.getSeconds()
												}
												style={{
													width: "103px",
													height: "103px",
													borderRadius: "50%",
												}}
												alt="avatar"
											></img>
											<br></br>
											<br></br>
											<span style={{ display: "block" }}>
												<label className="f-rl fm-w7-s24">
													{params?.firstName || params.mpage?.firstName}
												</label>
											</span>
											<span style={{ display: "block" }}>
												<label className="f-fm fm-w4-s14">
													{params?.email || params.mpage?.email}
												</label>
											</span>
											<br />
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col">
									{params.page === "profile" && (
										<Tabs defaultActiveKey="profile" id="profiletab">
											<Tab eventKey="profile" title="Profile">
												<Setting params={params}></Setting>
											</Tab>
											<Tab eventKey="subscription" title="Subscription">
												<Subscription params={params}></Subscription>
											</Tab>
											<Tab eventKey="payments" title="Payments">
												<Payments params={params}></Payments>
											</Tab>
											<Tab eventKey="settings" title="Account Setting">
												<AccountSetting params={params}></AccountSetting>
											</Tab>
										</Tabs>
									)}
									{params.page === "subscription" && (
										<Tabs defaultActiveKey="subscription" id="profiletab">
											<Tab eventKey="profile" title="Profile">
												<Setting params={params}></Setting>
											</Tab>
											<Tab eventKey="subscription" title="Subscription">
												<Subscription params={params}></Subscription>
											</Tab>
											<Tab eventKey="payments" title="Payments">
												<Payments params={params}></Payments>
											</Tab>
											<Tab eventKey="settings" title="Account Setting">
												<AccountSetting params={params}></AccountSetting>
											</Tab>
										</Tabs>
									)}
									{params.page === "payments" && (
										<Tabs defaultActiveKey="payments" id="profiletab">
											<Tab eventKey="profile" title="Profile">
												<Setting params={params}></Setting>
											</Tab>
											<Tab eventKey="subscription" title="Subscription">
												<Subscription params={params}></Subscription>
											</Tab>
											<Tab eventKey="payments" title="Payments">
												<Payments params={params}></Payments>
											</Tab>
											<Tab eventKey="settings" title="Account Setting">
												<AccountSetting params={params}></AccountSetting>
											</Tab>
										</Tabs>
									)}
									{params.page === "settings" && (
										<Tabs defaultActiveKey="settings" id="profiletab">
											<Tab eventKey="profile" title="Profile">
												<Setting params={params}></Setting>
											</Tab>
											<Tab eventKey="subscription" title="Subscription">
												<Subscription params={params}></Subscription>
											</Tab>
											<Tab eventKey="payments" title="Payments">
												<Payments params={params}></Payments>
											</Tab>
											<Tab eventKey="settings" title="Account Setting">
												<AccountSetting params={params}></AccountSetting>
											</Tab>
										</Tabs>
									)}
									{params.page === "apptPref" && (
										<Tabs defaultActiveKey="settings" id="profiletab">
											<Tab eventKey="profile" title="Profile">
												<Setting params={params}></Setting>
											</Tab>
											<Tab eventKey="subscription" title="Subscription">
												<Subscription params={params}></Subscription>
											</Tab>
											<Tab eventKey="payments" title="Payments">
												<Payments params={params}></Payments>
											</Tab>
											<Tab eventKey="settings" title="Account Setting">
												<AccountSetting params={params}></AccountSetting>
											</Tab>
										</Tabs>
									)}
									{params.page === "calendarPref" && (
										<Tabs defaultActiveKey="settings" id="profiletab">
											<Tab eventKey="profile" title="Profile">
												<Setting params={params}></Setting>
											</Tab>
											<Tab eventKey="subscription" title="Subscription">
												<Subscription params={params}></Subscription>
											</Tab>
											<Tab eventKey="payments" title="Payments">
												<Payments params={params}></Payments>
											</Tab>
											<Tab eventKey="settings" title="Account Setting">
												<AccountSetting params={params}></AccountSetting>
											</Tab>
										</Tabs>
									)}
									{params.page === "generalPref" && (
										<Tabs defaultActiveKey="settings" id="profiletab">
											<Tab eventKey="profile" title="Profile">
												<Setting params={params}></Setting>
											</Tab>
											<Tab eventKey="subscription" title="Subscription">
												<Subscription params={params}></Subscription>
											</Tab>
											<Tab eventKey="payments" title="Payments">
												<Payments params={params}></Payments>
											</Tab>
											<Tab eventKey="settings" title="Account Setting">
												<AccountSetting params={params}></AccountSetting>
											</Tab>
										</Tabs>
									)}
									{params.page === "notiPref" && (
										<Tabs defaultActiveKey="settings" id="profiletab">
											<Tab eventKey="profile" title="Profile">
												<Setting params={params}></Setting>
											</Tab>
											<Tab eventKey="subscription" title="Subscription">
												<Subscription params={params}></Subscription>
											</Tab>
											<Tab eventKey="payments" title="Payments">
												<Payments params={params}></Payments>
											</Tab>
											<Tab eventKey="settings" title="Account Setting">
												<AccountSetting params={params}></AccountSetting>
											</Tab>
										</Tabs>
									)}
									{params.page === "overview" && (
										<Tabs defaultActiveKey="settings" id="profiletab">
											<Tab eventKey="profile" title="Profile">
												<Setting params={params}></Setting>
											</Tab>
											<Tab eventKey="subscription" title="Subscription">
												<Subscription params={params}></Subscription>
											</Tab>
											<Tab eventKey="payments" title="Payments">
												<Payments params={params}></Payments>
											</Tab>
											<Tab eventKey="settings" title="Account Setting">
												<AccountSetting params={params}></AccountSetting>
											</Tab>
										</Tabs>
									)}
								</div>
							</div>
						</div>
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

export default Profile;
