// import { red } from "@material-ui/core/colors";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { Animated } from "react-animated-css";
import Logo from "../common/logo";
import * as utils from "../common/util";

const Home = () => {
	const [windowSize, setWindowSize] = useState(getWindowSize());
	useEffect(() => {
		function handleWindowResize() {
			setWindowSize(getWindowSize());
		}

		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);
	function getWindowSize() {
		const { innerWidth, innerHeight } = window;
		return { innerWidth, innerHeight };
	}
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
		<>
			<div className="body-bg-home">
				{/* <utils.aeLoader></utils.aeLoader> */}
				<center>
					<nav className="navbar container-fluid fixed-top  navbar-expand-lg navbar-dark bg-light">
						<div className="container-fluid" style={{}}>
							<Logo logo="dark"></Logo>
							<button
								type="button"
								className="navbar-toggler mr-sm rr collapsed"
								data-bs-toggle="collapse"
								data-bs-target="#navbarCollapse"
								aria-expanded="false"
							>
								<span className="navbar-toggler-icon"></span>
							</button>
							<div
								className="navbar-collapse collapse"
								style={{ whiteSpace: "nowrap", width: "100%" }}
								id="navbarCollapse"
							>
								<div className="navbar-nav p-4 pr-r20 p-lg-0">
									<a
										className="nav-link1 f-rl fm-w5-s20"
										href="/everyone"
										style={{ color: "#FFFFFF" }}
									>
										For Everyone
										<div
											style={{
												backgroundColor: "transparent",
												borderRadius: "5px",
												height: "3px",
												marginTop: "3px",
												width: "123px",
											}}
										></div>
									</a>
									<a
										className="nav-link1  f-rl fm-w5-s20"
										href="/business"
										style={{ color: "#FFFFFF" }}
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
										className="nav-link1  f-rl fm-w5-s20"
										href="/login"
										style={{ color: "#FFFFFF" }}
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
				</center>
				<div className="container-fluid">
					<div className="row no-gutters">
						<div
							className="col homebgImage"
							style={{
								backgroundImage: "url('../images/Group571.png')",
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover",
							}}
						>
							<div
								className="row"
								style={{
									paddingTop: "250px",
									paddingBottom: "80px",
								}}
							>
								<div
									className="col-xl-12 col-lg-8 col-md-6 col-xs-1 col-sm-1 d-flex justify-content-start"
									style={{ textAlign: "left" }}
								>
									<div
										className="f-rl fm-w6-s88 color-FF"
										style={{ paddingLeft: "160px" }}
									>
										MEET THE BEST
										<div className="">COSMETIC TREATMENTS</div>
										<div className="" style={{ fontWeight: "bold" }}>
											AT HOME
										</div>
										<div
											className="roundWhiteDownload"
											style={{
												maxWidth: "350px",
												marginTop: "20px",
												marginBottom: "85px",
											}}
										>
											Download the App&nbsp;&nbsp;&nbsp;&nbsp;
											<img
												loading="lazy"
												alt=""
												src="../images/Arrowb4.png"
												style={{ width: "38.11px", height: "20px" }}
											></img>
										</div>
										<br></br>
									</div>
								</div>
							</div>

							<div
								className="row homeImage"
								style={{
									paddingTop: "72px",
									marginBottom: "277px",
									paddingLeft: "80px",
								}}
							>
								<div className="col-xl-8 col-lg-10 col-md-12 col-xs-8 col-sm-12">
									<div className="row color-FF">
										<div className="col-xl col-lg col-md col-xs col-sm">
											<div className="row">
												<div className="col">
													<img
														loading="lazy"
														src="../images/onlinechat.png"
														alt="logo"
														style={{ width: "60px", height: "61px" }}
													></img>
												</div>
											</div>
											<div className="row pt-4">
												<div className="col fm-w60-s22">FREE CONSULTATION</div>
											</div>
											<div className="row pt-3">
												<div className="col-xl-11 fm-w4-s20">
													Talk face-to-face with your doctor online to discuss
													your unique style
												</div>
											</div>
										</div>
										{/* <div class="col-xl-1"></div> */}
										<div className="col-xl col-lg col-md col-xs col-sm homeml">
											<div className="row paddingtop">
												<div className="col">
													<img
														loading="lazy"
														src="../images/booking.png"
														alt="logo"
														style={{ width: "53px", height: "60px" }}
													></img>
												</div>
											</div>
											<div className="row pt-4">
												<div className="col fm-w60-s22">INSTANT BOOKING</div>
											</div>
											<div className="row pt-3">
												<div className="col-xl-11 fm-w4-s20">
													Talk face-to-face with your doctor online to discuss
													your unique style
												</div>
											</div>
										</div>
										{/* <div class="col-xl-1"></div> */}
										<div className="col-xl col-lg col-md col-xs col-sm homeml">
											<div className="row paddingtop">
												<div className="col">
													<img
														loading="lazy"
														src="../images/loan.png"
														alt="logo"
														style={{ width: "62px", height: "62px" }}
													></img>
												</div>
											</div>
											<div className="row pt-4">
												<div className="col fm-w60-s22">
													SECURE HOME SERVICE
												</div>
											</div>
											<div className="row pt-3">
												<div className="col-xl-11 fm-w4-s20">
													Talk face-to-face with your doctor online to discuss
													your unique style
												</div>
											</div>
										</div>
										{/* <div class="col-xl-1"></div> */}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row no-gutters">
						<div
							className="col"
							style={{
								marginTop: "-230px",
								background:
									"linear-gradient(90deg, #AF805E 10.93%, #979289 101.33%)",
							}}
						>
							<div
								className="row"
								style={{ paddingTop: "80px", paddingBottom: "80px" }}
							>
								<div className="col d-flex justify-content-center">
									<div
										className="f-rl fm-w6-s48 homepage color-FF"
										style={{ textAlign: "center" }}
									>
										UNIQUE EXPERIENCE
										<div className="f-rl fm-w3-s48 homepage1 color-FF">
											Seamless connection between you and your doctor
										</div>
									</div>
									<br></br>
								</div>
							</div>
						</div>
					</div>
					<div className="row no-gutters">
						<div
							className="col"
							style={{
								backgroundImage: "url('../images/Rectangle164.png')",
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover",
							}}
						>
							<div className="row">
								<div
									className="col"
									style={{
										background: "rgba(0, 0, 0, 0.8)",
										backdropFilter: "blur(2px)",
									}}
								>
									<div className="row pt-7">
										<div
											className="col f-rl fm-w3-s58 fm-w6-s88 color-FF"
											style={{ paddingLeft: "128px", textAlign: "left" }}
										>
											BOOK ON-DEMAND<br></br>
											COSMETIC <br></br> TREATMENTS
										</div>
									</div>
									<div
										className="row  pt-5 minmanage"
										style={{ paddingLeft: "137px" }}
									>
										<div className="roundWhiteDownload1">
											&nbsp;&nbsp;&nbsp;Visit User App&nbsp;&nbsp;&nbsp;&nbsp;
											<img
												loading="lazy"
												alt=""
												src="../images/Arrowb4.png"
												style={{ width: "38.11px", height: "20px" }}
											></img>
										</div>
										<br></br>
									</div>
									<div className="row  pt-5">
										<div className="col d-flex justify-content-end">
											<img
												loading="lazy"
												src="../images/Group573.png"
												alt=".."
												style={{ width: "376px", height: "628.7px" }}
											></img>
										</div>
									</div>
								</div>
								<div className="col"></div>
							</div>
						</div>
					</div>
					<div className="row no-gutters">
						<div
							className="col"
							style={{
								backgroundImage: "url('../images/Rectangle217.png')",
								backgroundSize: "cover",
								backgroundRepeat: "no-repeat",
							}}
						>
							<div className="row">
								<div className="col">&nbsp;</div>
								<div
									className="col"
									style={{ background: "rgba(255, 255, 255, 0.8)" }}
								>
									<div
										className="row pt-7 maxmanage"
										style={{ marginLeft: "114px", textAlign: "left" }}
									>
										<div className="col f-rl fm-w3-s58 ">
											HELP DOCTORS <br></br> SERVICE BETTER
										</div>
									</div>
									<div
										className="row pt-5 minmanage1"
										style={{ paddingLeft: "120px" }}
									>
										<div className="col-5">
											<div className="roundBlackDownload">
												&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Manage
												Business&nbsp;&nbsp;&nbsp;&nbsp;
												<img
													loading="lazy"
													alt=""
													src="../images/Arrow4.png"
													style={{ width: "38.11px", height: "20px" }}
												></img>
											</div>
											<br></br>
										</div>
									</div>
									<div className="row pt-5">
										<div
											className=" d-flex col f-rl fm-w3-s58"
											style={{ justifyContent: "end" }}
										>
											<img
												loading="lazy"
												alt=""
												src="../images/macbookpro.png"
												style={{ maxWidth: "100%" }}
											></img>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						className="row no-gutters"
						style={{
							backgroundColor: "#000000",
						}}
					>
						<div className="col">
							<div className="row pt-9 ourtreatmenthome">
								<div className="color-FF f-rl fm-w3-s60">OUR TREATMENTS</div>
							</div>
							<div className="row pt-4" style={{ float: "right" }}>
								<div
									className="col-xl-12 col-lg-12 col-md-12 col-xs-12 col-sm-12 col-12"
									style={{
										marginBottom: "100px",
										display: "flex",
										justifyContent: "space-between",
										flexDirection: "row",
									}}
								>
									<div className="row">
										<div className="col-xl-3 col-lg-3 col-md-6 col-xs-12 col-sm-12 col-12 pt-2">
											<img
												loading="lazy"
												alt=""
												src="../images/Group577.png"
												style={{ width: "100%", height: "100%" }}
											></img>
										</div>
										<div className="col-xl-3 col-lg-3 col-md-6 col-xs-12 col-sm-12 col-12 pt-2">
											<img
												style={{ width: "100%", height: "100%" }}
												loading="lazy"
												alt=""
												src="../images/Group578.png"
											></img>
										</div>
										<div className="col-xl-3 col-lg-3 col-md-6 col-xs-12 col-sm-12 col-12 pt-2">
											<img
												style={{ width: "100%", height: "100%" }}
												loading="lazy"
												alt=""
												src="../images/Group579.png"
											></img>
										</div>
										<div
											className="col-xl-3 col-lg-3 col-md-6 col-xs-12 col-sm-12 col-12 pt-2"
											style={{ paddingRight: 0 }}
										>
											<img
												style={{ width: "100%", height: "100%" }}
												loading="lazy"
												alt=""
												src="../images/Group580.png"
											></img>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<center>
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
					</center>
				</div>
			</div>
		</>
	);
};

export default Home;
