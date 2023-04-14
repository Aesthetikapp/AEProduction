import React from "react";
import { useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import styled from "styled-components";

const DropDownContainer = styled("div")``;
const DropDownHeader = styled("div")``;
const DropDownListContainer = styled("div")``;
const DropDownList = styled("ul")``;
const ListItem = styled("li")``;

function Payments() {
	const [data, setData] = useState([5, 6, 1, 1, 1, 1, 1]);
	const [showResults, setShowResults] = useState("none");

	function myFunction() {
		if (showResults === "none") {
			setShowResults("block");
		} else {
			setShowResults("none");
		}
	}

	const options = ["Date", "Transaction id", "Treatment", "Amount"];

	const [isOpen, setIsOpen] = useState(false);
	const [filterList, setFilterList] = useState([]);
	const [selectedOption, setSelectedOption] = useState(null);
	const toggling = () => {
		setIsOpen(!isOpen);
	};

	const onOptionClicked = (value) => {
		setSelectedOption(value);
		setIsOpen(false);
	};

	return (
		<div className="col-xl-11 col-lg-11 col-md-11 col-xs-11 col-sm-11 pt-4">
			<div className="card scard" style={{ padding: "30px 30px" }}>
				<div
					className="card-body"
					style={{ color: "#ACACAC", padding: "5px", fontWeight: "bold" }}
				>
					BUSINESS TRANSACTIONS
				</div>
				<span>
					<hr style={{ margin: "0px 0px" }}></hr>
				</span>
				<div
					className="col-lg-2 col-md-3 col-sm-4"
					style={{ width: "143px", paddingTop: "20px", paddingBottom: "10px" }}
				>
					<DropDownContainer className="customdropmain">
						<DropDownHeader
							onClick={toggling}
							className="form-select form-select-lg mb-1 select-round-custom-dropdown-payments"
							style={{
								boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.15)",
								paddingTop: "10px",
							}}
						>
							{selectedOption && (
								<p className="f-fm fm-w4-s14 color-7">{selectedOption}</p>
							)}
							{!selectedOption && (
								<p className="f-fm fm-w4-s16 color-7">Sort By</p>
							)}
						</DropDownHeader>
						{isOpen && (
							<div
								style={{
									width: "223px",
									height: "283px",
									position: "absolute",
								}}
							>
								<DropDownListContainer className="customdropcontainer">
									<DropDownList className="customdroptwo">
										{options.map((k) => (
											<ListItem
												key={k}
												className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
												onClick={() => {
													onOptionClicked(k);
												}}
												value={k}
											>
												{k}
											</ListItem>
										))}
									</DropDownList>
								</DropDownListContainer>
							</div>
						)}
					</DropDownContainer>
				</div>
				<div className="table-responsive">
					<table className="table table-borderless">
						<thead>
							<tr style={{ borderBottom: "hidden" }}>
								<th
									scope="col"
									style={{ color: "#ACACAC", paddingLeft: "0px" }}
									className="col-xl-2"
								>
									TRANSACTION ID
								</th>
								<th
									scope="col"
									style={{ color: "#ACACAC" }}
									className="col-xl-2"
								>
									Date
								</th>
								<th
									scope="col"
									style={{ color: "#ACACAC" }}
									className="col-xl-3"
								>
									Treatment
								</th>
								<th
									scope="col"
									style={{ color: "#ACACAC", textAlign: "left" }}
									className="col-xl-3"
								>
									Amount
								</th>
								<th
									scope="col"
									style={{ color: "#ACACAC", textAlign: "left" }}
									className="col-xl-2"
								>
									Assigned doctor
								</th>
								<th scope="col" className="col-xl-1"></th>
							</tr>
						</thead>
						<tbody>
							{data.map((item, key) => {
								return (
									<tr key={key} style={{ borderBottom: "hidden" }}>
										<td
											style={{ textAlign: "left" }}
											className="f-fm fm-w6-s14"
										>
											124617@sd4567
										</td>
										<td
											style={{ textAlign: "left" }}
											className="f-fm fm-w6-s14"
										>
											12/06/2021
										</td>
										<td className="f-fm fm-w6-s14">Treatment name</td>
										<td
											style={{ textAlign: "left" }}
											className="f-fm fm-w6-s14"
										>
											$132.6
										</td>
										<td
											style={{ textAlign: "left" }}
											className="f-fm fm-w6-s14"
										>
											marvin mckinney
										</td>

										<td>
											<OverlayTrigger
												trigger="click"
												rootClose
												placement="left-start"
												overlay={
													<Popover
														id="popover-basic"
														style={{
															height: "60px",
															width: "170px",
															backgroundColor: "rgba(0, 0, 0, 0.8)",
															borderRadius: "10px",
														}}
													>
														<Popover.Body style={{ padding: "0px 0px" }}>
															<div
																style={{
																	color: "rgba(255, 255, 255, 0.8)",
																	paddingTop: "20px",
																	paddingLeft: "20px",
																	cursor: "pointer",
																}}
																// onClick={() => {
																//   props.disableTreatmentHandler(id);
																// }}
																className="f-fm fm-w4-s14"
															>
																Refund
															</div>
														</Popover.Body>
													</Popover>
												}
												style={{ alignItems: "end" }}
											>
												<img
													loading="lazy"
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
	);
}

export default Payments;
