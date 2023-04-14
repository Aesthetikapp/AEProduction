import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../common/logo";
import * as utils from "../common/util";

const Everyone = () => {
	const firstupdate = useRef(true);
	const firststateupdate = useRef(true);
	const [isPageLoaded, setisPageLoaded] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (firstupdate.current) {
			(async function anyNameFunction() {
				const timer = setTimeout(() => {
					setisPageLoaded(true);
					firstupdate.current = false;
					firststateupdate.current = false;
				}, 2000);
				return () => clearTimeout(timer);
			})();
		}
	}, []);

	return (
		<center>
			<div className="body-bg-home">
				<nav className="navbar  container-fluid   fixed-top  navbar-expand-lg navbar-dark bg-light">
					<div className="container-fluid">
						<Logo logo="dark-light"></Logo>
						<button
							type="button"
							className="navbar-toggler mr-sm  collapsed"
							data-bs-toggle="collapse"
							data-bs-target="#navbarCollapse"
							aria-expanded="false"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div
							className="navbar-collapse collapse"
							style={{ whiteSpace: "nowrap", width: "100%", height: "100px" }}
							id="navbarCollapse"
						>
							<div className="navbar-nav p-4 p-lg-0 pr-r20">
								<a
									className="nav-link1 f-rl fm-w7-s20"
									href="/everyone"
									style={{
										color: "#AF805E",
									}}
								>
									For Everyone
									<div
										style={{
											backgroundColor: "#B58A6C",
											borderRadius: "5px",
											height: "3px",
											marginTop: "3px",
											width: "123px",
										}}
									></div>
								</a>
								<a
									className="nav-link1 f-rl fm-w5-s20"
									href="/business"
									style={{
										color: "#FFFFFF",
									}}
								>
									For business
									<div
										style={{
											backgroundColor: "transparent",
											borderRadius: "5px",
											height: "3px",
											marginTop: "3px",
										}}
									></div>
								</a>
								<a
									className="nav-link1 f-rl fm-w5-s20"
									href="/login"
									style={{
										color: "#FFFFFF",
									}}
								>
									Login
									<div
										style={{
											backgroundColor: "transparent",
											borderRadius: "5px",
											height: "3px",
											marginTop: "3px",
										}}
									></div>
								</a>
							</div>
							<div className="d-flex burger">
								<button
									className="btn-rounded-black"
									onClick={() => navigate("/signup/social")}
								>
									Business Sign Up
								</button>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<a href="../downloads/app-debug.apk" download>
									<button className="btn-rounded-white">
										{" "}
										Dowload the App
									</button>
								</a>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							</div>
						</div>
					</div>
				</nav>

				<div className="container-fluid">
					<div className="row no-gutters">
						<div
							className="col"
							style={{
								backgroundColor: "#1F1F1F",
								backgroundImage: "url('../images/Rectangle148.png')",
								backgroundRepeat: "no-repeat",
							}}
						>
							<div
								className="row"
								style={{ paddingTop: "250px", paddingBottom: "80px" }}
							>
								<div className="col justify-content-center">
									<div className="row">
										<div className="f-rl fm-w7-s24 coral  ">For Everyone</div>
									</div>
									<div className="row pt-3">
										<div className="f-rl fm-w3-s68 color-FF  ">
											BOOK ON-DEMAND TREATMENTS
										</div>
									</div>
									<div className="row">
										<div
											className="f-rl fm-w4-s28 color-FF  "
											style={{ textAlign: "center" }}
										>
											<br></br>at home with your favourite doctor
										</div>
									</div>
								</div>
							</div>
							<div
								className="row"
								style={{
									marginTop: "240px",
									marginBottom: "200px",
									paddingLeft: "80px",
									backgroundColor: "#000000",
								}}
							>
								<div className="col-8"></div>
							</div>
						</div>
					</div>
					<div className="row no-gutters">
						<div
							className="col"
							style={{
								backgroundColor: "#000000",
							}}
						>
							<div className="row pt-20">
								<div className="col">
									<div className="row">
										<div
											className="col-xl-6 col-lg-6 col-md-6 col-xs-6 col-sm-6"
											style={{
												backgroundColor: "rgb(0, 0 , 0, 0.6)",
												backgroundImage: "url(../images/Rectangle180.png)",
												backgroundRepeat: "no-repeat",
											}}
										>
											<div
												className="f-rl color-FF"
												style={{
													textAlign: "left",
													fontStyle: "normal",
													fontWeight: "600",
													fontSize: "15.8438px",
												}}
											>
												DON'T WORRY IF THIS IS YOUR FIRST<br></br>COSMETIC
												TREATMENT -{" "}
											</div>
											<div
												className="f-rl color-FF pt-2"
												style={{
													textAlign: "left",
													fontStyle: "normal",
													fontWeight: "300",
													fontSize: "42.25px",
												}}
											>
												BEFORE YOU BOOK,<br></br>TAKE A{" "}
												<span
													style={{
														fontStyle: "normal",
														fontWeight: "600",
														fontSize: "42.25px",
													}}
												>
													LIVE CONSULTANT
												</span>
												<br></br>WITH OUR MEDICALLY APPROVED DOCTORS.
											</div>
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-xs-6 col-sm-6">
											<img
												loading="lazy"
												alt=""
												src="../images/Group560.png"
												style={{ width: "100%" }}
											></img>
										</div>
									</div>
									<div className="row">
										<div
											className="col-xl-6 col-lg-6 col-md-6 col-xs-6 col-sm-6"
											style={{
												backgroundColor: "rgb(0, 0 , 0, 0.6)",
												backgroundImage: "url(../images/Rectangle180.png)",
												backgroundRepeat: "no-repeat",
											}}
										>
											<img
												loading="lazy"
												alt=""
												src="../images/Group505.png"
												style={{ width: "100%" }}
											></img>
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-xs-6 col-sm-6">
											<div
												className="f-rl color-FF"
												style={{
													textAlign: "left",
													fontStyle: "normal",
													fontWeight: "600",
													fontSize: "15.8438px",
												}}
											>
												AESTHETIK APP ALLOWS YOU TO -{" "}
											</div>
											<div
												className="f-rl color-FF pt-2"
												style={{
													textAlign: "left",
													fontStyle: "normal",
													fontWeight: "300",
													fontSize: "42.25px",
												}}
											>
												BOOK A TREATMENT<br></br>INSTANTLY WITH OUR OWN -{" "}
												<br></br>DEMAND{" "}
												<span
													style={{
														fontStyle: "normal",
														fontWeight: "600",
														fontSize: "42.25px",
													}}
												>
													INSTANT BOOKING
												</span>
												<br></br>FEATURE.
											</div>
										</div>
									</div>
									<div className="row">
										<div
											className="col-xl-6 col-lg-6 col-md-6 col-xs-6 col-sm-6"
											style={{
												backgroundColor: "rgb(0, 0 , 0, 0.6)",
												backgroundImage: "url(../images/Rectangle180.png)",
												backgroundRepeat: "no-repeat",
											}}
										>
											<div
												className="f-rl color-FF"
												style={{
													textAlign: "left",
													fontStyle: "normal",
													fontWeight: "600",
													fontSize: "15.8438px",
												}}
											>
												WE GUIDE YOU ON HOW TO -{" "}
											</div>
											<div
												className="f-rl color-FF pt-2"
												style={{
													textAlign: "left",
													fontStyle: "normal",
													fontWeight: "300",
													fontSize: "42.25px",
												}}
											>
												SET UP YOUR HOME BEFORE<br></br>THE DOCTORS ARRIVE
												<br></br>
												<br></br>
												<span
													style={{
														fontStyle: "normal",
														fontWeight: "300",
														fontSize: "31.6875px",
													}}
												>
													All our doctors are medically approved and a secure
													check-in is done and all is tracked.
												</span>
											</div>
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-xs-6 col-sm-6">
											<img
												loading="lazy"
												alt=""
												src="../images/Group551.png"
												style={{ width: "100%" }}
											></img>
										</div>
									</div>
									<div className="row mt-5">
										<center>
											<div className="col-xl-6 col-lg-6 col-md-6 col-xs-6 col-sm-6">
												<div
													className="f-rl fm-w3-s60 color-FF"
													style={{ textAlign: "center" }}
												>
													OUR TREATMENTS
												</div>
											</div>
										</center>
									</div>

									{/* <!-- Photo Grid --> */}
									<div className="row " style={{ marginBottom: "100px" }}>
										<div className="column">
											<img
												src="../images/Group577.png"
												style={{ width: "100%" }}
												alt=""
											/>
											<img
												src="../images/Group555.png"
												style={{ width: "100%" }}
												alt=""
											/>
											<img
												src="../images/Group562.png"
												style={{ width: "100%" }}
												alt=""
											/>
										</div>
										<div className="column">
											<img
												src="../images/Group557.png"
												style={{ width: "100%" }}
												alt=""
											/>
											<img
												src="../images/Group556.png"
												style={{ width: "100%" }}
												alt=""
											/>
										</div>
										<div className="column">
											<img
												src="../images/Group559.png"
												style={{ width: "100%" }}
												alt=""
											/>
											<img
												src="../images/Group561.png"
												style={{ width: "100%" }}
												alt=""
											/>
											<img
												src="../images/Group563.png"
												style={{ width: "100%" }}
												alt=""
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className=" row no-gutters">
						<div className="col-xl-12 col-lg-12 col-md-12 col-xs-12 col-sm-12">
							<div className="row ">
								<div
									className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12"
									style={{
										backgroundColor: "#b58a6c",
										display: "flex",
										flexDirection: "Column",
										justifyContent: "flex-end",
										alignItems: "center",
									}}
								>
									<div
										className="f-rl fm-w6-s42p5 color-FF"
										style={{
											// marginTop: "150px",
											marginBottom: "34px",
										}}
									>
										START A TREATMENT AT
										<br />
										YOUR PLACE RIGHT NOW!
									</div>
									<div className="row pt-4" style={{ marginBottom: "34px" }}>
										<div className="col-xl-12 col-lg-12 col-md-12 col-xs-12 col-sm-12  d-flex justify-content-center">
											<div className="roundWhiteDownload">
												Download the Aesthetik App
											</div>
											<br></br>
										</div>
									</div>

									<div className="col-xl-9 col-lg-5 col-md-9 col-xs-9 col-sm-9">
										<img
											loading="lazy"
											alt=""
											src="../images/screenshot1.png"
											style={{
												width: "100%",
											}}
										></img>
									</div>
								</div>

								<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12">
									<div className="row">
										<div className="col-8" style={{ padding: 0 }}>
											<img
												src="../images/Rectangle162.png"
												style={{ width: "100%" }}
												alt=""
											/>
										</div>
										<div className="col-4" style={{ padding: 0 }}>
											<img
												src="../images/Rectangle183.png"
												style={{ height: "100%", width: "100%" }}
												alt=""
											/>
										</div>
										<div className="col-12" style={{ padding: 0 }}>
											<img
												src="../images/Rectangle195.png"
												style={{ width: "100%" }}
												alt=""
											/>
										</div>
									</div>
								</div>

								{utils.Footer()}
							</div>
						</div>
					</div>
				</div>
			</div>
		</center>
	);
};

export default Everyone;
