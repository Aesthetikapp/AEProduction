import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tabs";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import TabContainer from "react-bootstrap/TabContainer";
import TabContent from "react-bootstrap/TabContent";
import TabPane from "react-bootstrap/TabPane";
import General from "./general";
import Notification from "./notification";
import Calender from "./calender";
import Appointment from "./appointment";

const AccountSetting = (props) => {
	console.log("ASss", props);
	return (
		<>
			<div style={{ width: "100%", paddingTop: "4vh" }}>
				{localStorage.getItem("comeFrom") === "appointments" && (
					<TabContainer id="left-tabs-example" defaultActiveKey="second">
						<Row style={{ width: "100%" }}>
							<div
								className="card col-xl-3"
								style={{
									height: "180px",
									paddingLeft: "0px",
									paddingRight: "0px",
									cursor: "pointer",
								}}
							>
								<Nav variant="pills" className="flex-column">
									<Nav.Item>
										<Nav.Link eventKey="first" className="nav-link.active">
											General
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="second">Calender</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="third">Appointment</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="fourth">Notification</Nav.Link>
									</Nav.Item>
								</Nav>
							</div>
							<div className="card col-xl-8">
								<TabContent>
									<TabPane eventKey="first">
										<General params={props.params} />
									</TabPane>
									<TabPane eventKey="second">
										<Calender params={props.params} />
									</TabPane>
									<TabPane eventKey="third">
										<Appointment params={props.params} />
									</TabPane>
									<TabPane eventKey="fourth">
										<Notification params={props.params} />
									</TabPane>
								</TabContent>
							</div>
						</Row>
					</TabContainer>
				)}
				{localStorage.getItem("preference") === "overview" && (
					<TabContainer id="left-tabs-example" defaultActiveKey="second">
						<Row style={{ width: "100%" }}>
							<div
								className="card col-xl-3"
								style={{
									height: "180px",
									paddingLeft: "0px",
									paddingRight: "0px",
									cursor: "pointer",
								}}
							>
								<Nav variant="pills" className="flex-column">
									<Nav.Item>
										<Nav.Link eventKey="first" className="nav-link.active">
											General
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="second">Calender</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="third">Appointment</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="fourth">Notification</Nav.Link>
									</Nav.Item>
								</Nav>
							</div>
							<div className="card col-xl-8">
								<TabContent>
									<TabPane eventKey="first">
										<General params={props.params} />
									</TabPane>
									<TabPane eventKey="second">
										<Calender params={props.params} />
									</TabPane>
									<TabPane eventKey="third">
										<Appointment params={props.params} />
									</TabPane>
									<TabPane eventKey="fourth">
										<Notification params={props.params} />
									</TabPane>
								</TabContent>
							</div>
						</Row>
					</TabContainer>
				)}

				{localStorage.getItem("preference") !== "apptPref" &&
					localStorage.getItem("preference") !== "generalPref" &&
					localStorage.getItem("preference") !== "calendarPref" &&
					localStorage.getItem("preference") !== "notiPref" &&
					localStorage.getItem("comeFrom") !== "appointments" &&
					localStorage.getItem("preference") !== "overview" && (
						<TabContainer id="left-tabs-example" defaultActiveKey="first">
							<Row style={{ width: "100%" }}>
								<div
									className="card col-xl-3 col-lg-3 col-md-11 col-xs-11 col-sm-11 col-11"
									style={{
										height: "250px",
										paddingLeft: "0px",
										paddingRight: "0px",
										cursor: "pointer",
									}}
								>
									<Nav variant="pills" className="flex-column">
										<Nav.Item>
											<Nav.Link eventKey="first" className="nav-link.active">
												General
											</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link eventKey="second">Calender</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link eventKey="third">Appointment</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link eventKey="fourth">Notification</Nav.Link>
										</Nav.Item>
									</Nav>
								</div>
								<div className="card col-xl-8 col-lg-8 col-md-11 col-xs-11 col-sm-11 col-11">
									<TabContent>
										<TabPane eventKey="first">
											<General params={props.params} />
										</TabPane>
										<TabPane eventKey="second">
											<Calender params={props.params} />
										</TabPane>
										<TabPane eventKey="third">
											<Appointment params={props.params} />
										</TabPane>
										<TabPane eventKey="fourth">
											<Notification params={props.params} />
										</TabPane>
									</TabContent>
								</div>
							</Row>
						</TabContainer>
					)}

				{localStorage.getItem("preference") === "apptPref" && (
					<TabContainer id="left-tabs-example" defaultActiveKey="third">
						<Row style={{ width: "100%" }}>
							<Col
								className="card col-xl-3"
								style={{
									height: "180px",
									paddingLeft: "0px",
									paddingRight: "0px",
									cursor: "pointer",
								}}
							>
								<Nav variant="pills" className="flex-column">
									<Nav.Item>
										<Nav.Link eventKey="first" className="nav-link.active">
											General
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="second">Calender</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="third">Appointment</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="fourth">Notification</Nav.Link>
									</Nav.Item>
								</Nav>
							</Col>
							<Col className="card col-xl-8">
								<TabContent>
									<TabPane eventKey="first">
										<General params={props.params} />
									</TabPane>
									<TabPane eventKey="second">
										<Calender params={props.params} />
									</TabPane>
									<TabPane eventKey="third">
										<Appointment params={props.params} />
									</TabPane>
									<TabPane eventKey="fourth">
										<Notification params={props.params} />
									</TabPane>
								</TabContent>
							</Col>
						</Row>
					</TabContainer>
				)}
				{localStorage.getItem("preference") === "generalPref" && (
					<TabContainer id="left-tabs-example" defaultActiveKey="first">
						<Row style={{ width: "100%" }}>
							<Col
								className="card col-xl-3"
								style={{
									height: "180px",
									paddingLeft: "0px",
									paddingRight: "0px",
									cursor: "pointer",
								}}
							>
								<Nav variant="pills" className="flex-column">
									<Nav.Item>
										<Nav.Link eventKey="first" className="nav-link.active">
											General
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="second">Calender</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="third">Appointment</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="fourth">Notification</Nav.Link>
									</Nav.Item>
								</Nav>
							</Col>
							<Col className="card col-xl-8">
								<TabContent>
									<TabPane eventKey="first">
										<General params={props.params} />
									</TabPane>
									<TabPane eventKey="second">
										<Calender params={props.params} />
									</TabPane>
									<TabPane eventKey="third">
										<Appointment params={props.params} />
									</TabPane>
									<TabPane eventKey="fourth">
										<Notification params={props.params} />
									</TabPane>
								</TabContent>
							</Col>
						</Row>
					</TabContainer>
				)}
				{localStorage.getItem("preference") === "calendarPref" && (
					<TabContainer id="left-tabs-example" defaultActiveKey="second">
						<Row style={{ width: "100%" }}>
							<Col
								className="card col-xl-3"
								style={{
									height: "180px",
									paddingLeft: "0px",
									paddingRight: "0px",
									cursor: "pointer",
								}}
							>
								<Nav variant="pills" className="flex-column">
									<Nav.Item>
										<Nav.Link eventKey="first" className="nav-link.active">
											General
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="second">Calender</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="third">Appointment</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="fourth">Notification</Nav.Link>
									</Nav.Item>
								</Nav>
							</Col>
							<Col className="card col-xl-8">
								<TabContent>
									<TabPane eventKey="first">
										<General params={props.params} />
									</TabPane>
									<TabPane eventKey="second">
										<Calender params={props.params} />
									</TabPane>
									<TabPane eventKey="third">
										<Appointment params={props.params} />
									</TabPane>
									<TabPane eventKey="fourth">
										<Notification params={props.params} />
									</TabPane>
								</TabContent>
							</Col>
						</Row>
					</TabContainer>
				)}
				{localStorage.getItem("preference") === "notiPref" && (
					<TabContainer id="left-tabs-example" defaultActiveKey="fourth">
						<Row style={{ width: "100%" }}>
							<Col
								className="card col-xl-3"
								style={{
									height: "180px",
									paddingLeft: "0px",
									paddingRight: "0px",
									cursor: "pointer",
								}}
							>
								<Nav variant="pills" className="flex-column">
									<Nav.Item>
										<Nav.Link eventKey="first" className="nav-link.active">
											General
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="second">Calender</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="third">Appointment</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="fourth">Notification</Nav.Link>
									</Nav.Item>
								</Nav>
							</Col>
							<Col className="card col-xl-8">
								<TabContent>
									<TabPane eventKey="first">
										<General params={props.params} />
									</TabPane>
									<TabPane eventKey="second">
										<Calender params={props.params} />
									</TabPane>
									<TabPane eventKey="third">
										<Appointment params={props.params} />
									</TabPane>
									<TabPane eventKey="fourth">
										<Notification params={props.params} />
									</TabPane>
								</TabContent>
							</Col>
						</Row>
					</TabContainer>
				)}
			</div>
		</>
	);
};
export default AccountSetting;
