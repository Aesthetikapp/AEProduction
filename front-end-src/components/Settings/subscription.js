import React, { useState } from "react";

const Subscription = () => {
	const [toggle, setToggle] = useState(false);
	const handleChange = (e) => {
		let isChecked = e.target.checked;
		setToggle(isChecked);
	};

	const arr = [
		{
			Date: "08/07/2021",
			Detailes: " standard plan monthly",
			Amount: "Free",
		},
		{
			Date: "07/07/2021",
			Detailes: " standard plan monthly",
			Amount: "Free",
		},
		{
			Date: "06/07/2021",
			Detailes: " standard plan monthly",
			Amount: "Free",
		},
		{
			Date: "05/07/2021",
			Detailes: " standard plan monthly",
			Amount: "Free",
		},
		{
			Date: "04/07/2021",
			Detailes: " standard plan monthly",
			Amount: "Free",
		},
	];
	return (
		<>
			<div className="row" style={{ width: "100%", paddingTop: "4vh" }}>
				<div className="col-xl-4 col-lg-12 col-md-12 col-xs-12 col-sm-12">
					<div className="card scard" style={{ height: "100%" }}>
						<div className="card-body">
							<div className="col-xl-12 col-lg-12 col-md-12 col-xs-12 col-sm-12">
								<div className="row">
									<div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1"></div>
									<div className="col-xl-11 col-lg-12 col-md-12 col-xs-12 col-sm-12">
										<label
											className="f-fm fm-w6-s12 "
											style={{ color: "#ACACAC" }}
										>
											Business Subscription
										</label>
										<hr />
									</div>
									<div className=" col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3"></div>
								</div>

								<div className="row">
									<div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1"></div>
									<div
										className="col-xl-6  col-lg-6 col-md-6 col-xs-6 col-sm-6"
										style={{ paddingTop: "2vh", paddingBottom: "2vh" }}
									>
										<label
											className="f-fm fm-w7-s16  color-00"
											style={{ color: "#000000" }}
										>
											Plan
										</label>
									</div>
								</div>
								<div className="row">
									<div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1"></div>
									<div className="col-xl-9  col-lg-6 col-md-6 col-xs-6 col-sm-6">
										<div
											className="alert alert-dark"
											style={{ backgroundColor: "black", borderRadius: "10px" }}
										>
											<p
												className="f-rl fm-w7-s14 "
												style={{
													textAlign: "end",
													justifyContent: "end",
													color: "#AF805E",
												}}
											>
												Subscribed by your business&nbsp;&nbsp;
												<img
													loading="lazy"
													src="./images/Vector8.png"
													alt="mark"
												/>
											</p>
											<label
												className="f-rl fm-w7-s24"
												style={{ color: "#FFFFFF" }}
											>
												Standard plan
											</label>
											<div
												className="f-fm fm-w4-s14  color-FF pt-3"
												style={{ color: "#FFFFFF" }}
											>
												Amet minim mollit non desernut ullamco est sit aliqua
												dolor do amet sint.velit afficia consequa duis enim
												velit molit.Exerciion veniam consequant{" "}
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1"></div>
									<div
										className="col-xl-6  col-lg-6 col-md-6 col-xs-6 col-sm-6"
										style={{ paddingTop: "2vh", paddingBottom: "2vh" }}
									>
										<label
											className="f-fm fm-w7-s16  color-00"
											style={{ color: "#000000" }}
										>
											Enable Auto renew
										</label>
									</div>
									<div
										className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1 form-check form-switch "
										style={{ paddingTop: "2vh", paddingBottom: "2vh" }}
									>
										<div className="col toggle" style={{ marginTop: "-25px" }}>
											<input
												type="checkbox"
												id="switch1"
												className="autor"
												checked={toggle}
												name="sameeveryday"
												onChange={(e) => handleChange(e)}
											/>
											<label htmlFor="switch1" className="autorl">
												Toggle
											</label>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1"></div>
									<div
										className="col-xl-6  col-lg-6 col-md-6 col-xs-6 col-sm-6"
										style={{ paddingTop: "2vh", paddingBottom: "2vh" }}
									>
										<label
											className="f-fm fm-w7-s16  color-00"
											style={{ color: "#000000" }}
										>
											Payment method
										</label>
									</div>
									<div className=" col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3"></div>
								</div>
								<div className="row">
									<div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1"></div>
									<div
										className="col-xl-6  col-lg-6 col-md-6 col-xs-6 col-sm-6"
										style={{
											paddingTop: "2vh",
											paddingBottom: "2vh",
											backgroundColor: "#F4F4F4",
											paddingRight: "0px",
											borderRadius: "10px",
											width: "88%",
										}}
									>
										<label
											className="f-fm fm-w7-s16  color-00"
											style={{ color: "#000000" }}
										>
											<img loading="lazy" alt="" src="./images/image10.png" />
											&nbsp;&nbsp;Ending in 2534
										</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="col-xl-7 col-lg-12 col-md-12 col-xs-12 col-sm-12">
					<div className="card scard" style={{ height: "100%" }}>
						<div className="card-body">
							<div className="col-xl col-lg col-md col-xs col-sm">
								<div className="">
									<div className="col-xl col-lg col-md col-xs col-sm">
										<label
											className="f-fm fm-w6-s12"
											style={{ color: "#ACACAC" }}
										>
											Subscription History
										</label>
										<hr />
									</div>
									<div className="table-responsive">
										<table className="table">
											<thead
												style={{ color: "#ACACAC", borderBottom: "hidden" }}
											>
												<tr>
													<th
														className="f-rl fm-w6-s14 col-4"
														style={{ color: "#ACACAC" }}
													>
														{" "}
														Date
													</th>
													<th
														className="f-rl fm-w6-s14 col-4"
														style={{ color: "#ACACAC" }}
													>
														{" "}
														Details
													</th>
													<th
														className="f-rl fm-w6-s14 col-4"
														style={{ color: "#ACACAC" }}
													>
														Amount
													</th>
												</tr>
											</thead>
											<tbody>
												{arr.map((key) => {
													return (
														<tr key={key} style={{ borderBottom: "hidden" }}>
															<td
																className="f-fm fm-w6-s14"
																style={{ color: "#404040" }}
															>
																{key.Date}
															</td>
															<td
																className="f-fm fm-w6-s14"
																style={{ color: "#404040" }}
															>
																{key.Detailes}
															</td>

															<td
																className="f-fm fm-w6-s14"
																style={{ color: "#404040" }}
															>
																{key.Amount}
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
				</div>
			</div>
		</>
	);
};
export default Subscription;
