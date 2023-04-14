import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tabs";

const NotificationList = (props) => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShow(true);
		}, 1000);
		return () => clearTimeout(timer);
	}, []);
	const handleClose = () => setShow(false);
	const getTableBody = (props) => {
		if (props.data !== null) {
			props.data.map(function (patient) {
				return (
					<>
						{" "}
						<tr id={"tr" + patient} style={{ backgroundColor: "#FFFFFF" }}>
							<td colSpan="3" style={{ padding: "25px" }}>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										alignContent: "center",
										justifyContent: "space-evenly",
										alignItems: "center",
									}}
								>
									<label
										className="aecontainer"
										style={{ marginLeft: "-58px" }}
									>
										<input type="checkbox" />
										<span className="checkmark"></span>
									</label>

									<img
										loading="lazy"
										alt="Treatment logo"
										src={patient.logo}
										style={{ width: "45px", height: "45px" }}
									></img>

									<div
										style={{
											display: "flex",
											flexDirection: "column",
											alignContent: "center",
											justifyContent: "space-evenly",
											alignItems: "flex-start",
										}}
									>
										<label className="f-fm fm-w6-s18">
											{patient.patientinfo}
										</label>
									</div>
								</div>
							</td>

							<td>{patient.noofvisit}</td>
							<td>
								{patient.upcomingtreatment[0].date} |{" "}
								{patient.upcomingtreatment[0].time} <br></br>
								<span style={{ marginLeft: "-27px", marginTop: "4px" }}>
									<button className="roundBrown2">
										{patient.upcomingtreatment[0].tinfo1}
									</button>
									<a>{patient.upcomingtreatment[0].tinfo2}</a>
								</span>
							</td>
							<td>
								{patient.latesttreatment[0].date} |{" "}
								{patient.latesttreatment[0].time} <br></br>
								<span style={{ marginLeft: "-27px", marginTop: "4px" }}>
									<button className="roundBrown2">
										{patient.latesttreatment[0].tinfo1}
									</button>
									<a>{patient.latesttreatment[0].tinfo2}</a>
								</span>
							</td>
							<td>
								{patient.rating}
								<br></br>
								<span>
									<i class="bi bi-star-fill"></i>
									<i class="bi bi-star-fill"></i>
									<i class="bi bi-star-fill"></i>
									<i class="bi bi-star-fill"></i>
									<i class="bi bi-star-fill"></i>
								</span>
							</td>
							<td></td>
						</tr>
					</>
				);
			});
		} else {
			return (
				<tr style={{ backgroundColor: "#FFFFFF" }}>
					<td
						colspan="3"
						style={{ padding: "10%", verticalAlign: "middle" }}
					></td>
					<td colspan="5" style={{ verticalAlign: "middle" }}>
						No patients yet{" "}
					</td>
				</tr>
			);
		}
	};
	//console.log(props.data);
	return (
		<>
			<Modal show={show} dialogClassName="modal-sm-30px" size="md">
				<Modal.Header>
					<Modal.Title>
						<span onClick={handleClose}>x</span>
						<img
							loading="lazy"
							style={{ paddingLeft: "40vh" }}
							src="./images/vector.png"
							alt=""
						/>
						<div
							style={{
								justifyContent: "center",
								textAlign: "center",
								paddingLeft: "5vh",
							}}
						>
							<img
								loading="lazy"
								src="../images/avatar.png"
								style={{ width: "46px", height: "46px" }}
								alt="avatar"
							></img>
							<br></br>Savannah Nguyan<br></br>
							<img
								loading="lazy"
								style={{ paddingLeft: "10" }}
								src="./images/vector (1).PNG"
								alt=""
							/>
							32
						</div>{" "}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Card style={{ width: "20vw" }}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								contact info
								<span>
									<img
										loading="lazy"
										style={{ paddingLeft: "10vh" }}
										src="./images/vector (2).png"
										alt=""
									/>
								</span>
								<img
									loading="lazy"
									style={{ paddingLeft: "10vh" }}
									src="./images/vector (3).png"
									alt=""
								/>{" "}
							</ListGroup.Item>
							<ListGroup.Item>
								Regesrtred<br></br> facial scan{" "}
								<span>
									<img loading="lazy" src="./images/Srceen shot.png" alt="" />
								</span>
							</ListGroup.Item>
							<ListGroup.Item>
								{" "}
								Alergy
								<span style={{ paddingLeft: "3vh" }}>
									Penicillin and realaed antibaitics{" "}
								</span>{" "}
								<img
									loading="lazy"
									style={{ paddingLeft: "4vh" }}
									src="./images/vector (4).png"
									alt=""
								/>{" "}
							</ListGroup.Item>
							<ListGroup.Item>
								{" "}
								Notes
								<span style={{ paddingLeft: "3vh" }}>
									Savannah prefer to amet minimum mollit non desununt ullomco
									est sit aliqu{" "}
								</span>{" "}
								<img
									loading="lazy"
									style={{ paddingLeft: "4vh" }}
									src="./images/vector (4).png"
									alt=""
								/>
							</ListGroup.Item>
						</ListGroup>
					</Card>

					<Tabs defaultActiveKey="upcoming App(1)" id="upcomingtab">
						<Tab eventKey="upcoming App(1)" title="upcoming App(1)">
							<Card>
								<Card.Body>
									{" "}
									Time And Location
									<br></br>
									<Card.Title>
										<img
											loading="lazy"
											style={{ paddingLeft: "0vh", paddingBottom: "0vh" }}
											src="./images/time.png"
											alt=""
										/>
										May 19/2022 09.00Am to 10.00Am
										<Card.Text>
											{" "}
											<img
												loading="lazy"
												style={{ paddingLeft: "0vh" }}
												src="./images/map.png"
												alt=""
											/>
											Not available to view
										</Card.Text>
										<br></br>
										<h6>Treatment</h6>
										<button style={{ borderRadius: "30px" }}>Bottox </button>
										<span>Nefertiti lift (NECK) </span>
										<span>
											<button
												style={{ borderRadius: "30px", textAlign: "end" }}
											>
												$182
											</button>
										</span>
									</Card.Title>
								</Card.Body>
							</Card>
							<Card>
								<Card.Body>
									{" "}
									CONSULTATION
									<br></br>
									<Card.Title>
										<img
											loading="lazy"
											style={{ paddingLeft: "2vh" }}
											src="./images/Rectangle 81.png"
											alt=""
										/>

										<p>march 10 2022 6.20pm</p>
									</Card.Title>
								</Card.Body>
							</Card>
						</Tab>
						<Tab eventKey="past App(6)" title="past App(6)">
							<Card>
								<Card.Body>
									{" "}
									Time And Location
									<br></br>
									<Card.Title>
										<img
											loading="lazy"
											style={{ paddingLeft: "0vh", paddingBottom: "0vh" }}
											src="./images/time.png"
											alt=""
										/>
										Aug 21/2021| 11.00Am to 12.00Am
										<br></br>
										<h6>Treatment</h6>
										<button style={{ borderRadius: "30px" }}>Bottox </button>
										<span>Nefertiti lift (NECK) </span>
									</Card.Title>
								</Card.Body>
							</Card>
							<Card>
								<Card.Body>
									{" "}
									Time And Location
									<br></br>
									<Card.Title>
										<img
											loading="lazy"
											style={{ paddingLeft: "0vh", paddingBottom: "0vh" }}
											src="./images/time.png"
											alt=""
										/>
										Aug 21/2021| 11.00Am to 12.00Am
										<br></br>
										<h6>Treatment</h6>
										<button style={{ borderRadius: "30px" }}>Bottox </button>
										<span>Nefertiti lift (NECK) </span>
									</Card.Title>
								</Card.Body>
							</Card>
							<Card>
								<Card.Body>
									{" "}
									Time And Location
									<br></br>
									<Card.Title>
										<img
											loading="lazy"
											style={{ paddingLeft: "0vh", paddingBottom: "0vh" }}
											src="./images/time.png"
											alt=""
										/>
										Aug 21/2021| 11.00Am to 12.00Am
										<br></br>
										<h6>Treatment</h6>
										<button style={{ borderRadius: "30px" }}>Bottox </button>
										<span>Nefertiti lift (NECK) </span>
									</Card.Title>
								</Card.Body>
							</Card>
							<br></br>
							<Card>
								<Card.Body>
									{" "}
									Time And Location
									<br></br>
									<Card.Title>
										<img
											loading="lazy"
											style={{ paddingLeft: "0vh", paddingBottom: "0vh" }}
											src="./images/time.png"
											alt=""
										/>
										Aug 21/2021| 11.00Am to 12.00Am
										<br></br>
										<h6>Treatment</h6>
										<button style={{ borderRadius: "30px" }}>Bottox </button>
										<span>Nefertiti lift (NECK) </span>
									</Card.Title>
								</Card.Body>
							</Card>
						</Tab>
					</Tabs>
				</Modal.Body>
			</Modal>

			<div className="row">
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
			</div>
			<div className="row">
				<div className="aecol6p1">&nbsp;</div>
				<div className="col-10">
					<div className="row pb-5 flex-col">
						<div className="col-lg-3 col-md-3 col-sm-3">
							<label className="f-rl fm-w4-s30">Patients (137)</label>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-2">
							<label className="f-m fm-w7-s18">My Patients</label>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-2">
							<label className="f-fm fm-w4-s18">Potential Patients</label>
						</div>
					</div>
					<div className="row pb-5">
						<div className="col-lg-3 col-md-3 col-sm-3">
							<input
								type="text"
								className="search f-fm fm-w4-s16 input form-control form-control-lg"
								placeholder="Search"
							></input>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-2">
							<label className="select-label">
								<select className="f-fm fm-w4-s16 select-round color-7">
									<option>Sort by</option>
									<option>Patient Info</option>
									<option>No of visits</option>
									<option>Rating</option>
								</select>
							</label>
						</div>
					</div>
					<div className="row">
						<table className="col-10 table table-borderless aetable">
							<thead className="f-rl fm-w6-s14 color-AC">
								<tr>
									<th scope="col" colSpan="3">
										<div
											style={{
												display: "flex",
												flexDirection: "row",
												alignContent: "center",
												justifyContent: "space-evenly",
												alignItems: "center",
												marginBottom: "-10px",
											}}
										>
											<label
												className="aecontainer"
												style={{ paddingLeft: "60px" }}
											>
												Patient Info
												<input type="checkbox" />
												<span className="checkmark"></span>
											</label>

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

											<div
												style={{
													display: "flex",
													opacity: 0,
													flexDirection: "column",
													alignContent: "center",
													justifyContent: "space-evenly",
													alignItems: "flex-start",
												}}
											>
												<label className="f-fm fm-w6-s18">&nbsp;</label>
												<label
													style={{ width: "300px" }}
													className="f-fm fm-w4-s14"
												>
													&nbsp;
												</label>
											</div>
										</div>
									</th>
									<th scope="col">No. of visit</th>
									<th scope="col">Treatments (From the latest)</th>
									<th scope="col">Consultation</th>
									<th scope="col">Facial Scan</th>
								</tr>
							</thead>
							<tbody>{getTableBody(props)}</tbody>
						</table>
					</div>
				</div>
				<div className="col-2">&nbsp;</div>
			</div>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
		</>
	);
};
export default NotificationList;
