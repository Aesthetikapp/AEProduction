import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../common/logo";
import * as utils from "../common/util";

const Business = () => {
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
						<Logo logo="dark"></Logo>
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
										color: "#000000",
									}}
								>
									For Everyone
									<div
										style={{
											backgroundColor: " transparent",
											borderRadius: "5px",
											height: "3px",
											marginTop: "3px",
										}}
									></div>
								</a>
								<a
									className="nav-link1 f-rl fm-w5-s20"
									href="/business"
									style={{
										color: "#AF805E",
									}}
								>
									For business
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
									href="/login"
									style={{
										color: "#000000",
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
								backgroundColor: "#fff",
								backgroundImage: "url('../images/Rectangle199.png')",
								backgroundRepeat: "no-repeat",
							}}
						>
							<div
								className="row justify-content-center"
								style={{ paddingTop: "250px", paddingBottom: "80px" }}
							>
								<div className="col-12">
									<div className="row">
										<div className="f-rl fm-w7-s24 coral  ">
											For Clinics and Doctors
										</div>
									</div>
									<div className="row pt-3">
										<div
											className="f-rl fm-w3-s68 color-00 textbuss"
											style={{ paddingLeft: "160px", textAlign: "left" }}
										>
											HELPING YOU SERVICE BETTER
										</div>
									</div>
									<div className="row">
										<div
											className="f-rl fm-w4-s28 color-00 textbuss"
											style={{ paddingLeft: "160px", textAlign: "left" }}
										>
											with a simple solution to help you service your<br></br>
											customer while in their own homes.
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
							className="col-xl col-lg col-md col-xs col-sm"
							style={{
								position: "absolute",
								top: "787px",
								backgroundColor: "#FFFFFF",
							}}
						>
							<div className="row pt-6">
								<div
									className="col-xl-6 col-lg-12 col-md-12 col-xs-12 col-sm-12"
									style={{
										backgroundImage: "url(../images/screenshot2.png)",
										backgroundRepeat: "no-repeat",
										height: "800px",
									}}
								>
									<div
										className="calender left485"
										style={{
											position: "absolute",
											left: "378px",
											top: "193px",
										}}
									>
										<img
											loading="lazy"
											alt=""
											src="../images/calendar.png"
											style={{ width: "100%" }}
										></img>
									</div>
								</div>
								<div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1 col-1">
									&nbsp;
								</div>
								<div
									className="col-xl-5 col-lg-10 col-md-10 col-xs-10 col-sm-10 col-11 pt-200 pl-business"
									style={{ textAlign: "left" }}
								>
									<div className="f-rl fm-w3-s52p5">
										Manage Your<br></br>Schedule
									</div>
									<br></br>
									<div className="f-rl fm-w4-s23p5">
										A simple way to set up your<br></br>calender and manage your
										patient<br></br>appointments.
									</div>
								</div>
							</div>
							<div className="row pt-6">
								<div className="col-xl-1 col-lg-2 col-md-2 col-xs-2 col-sm-2 col-2">
									&nbsp;
								</div>
								<div
									className="col-xl-3 col-lg-10 col-md-10 col-xs-10 col-sm-10 col-10 pt-200"
									style={{ textAlign: "left" }}
								>
									<div className="f-rl fm-w3-s52p5">
										On-demand<br></br>Home Service
									</div>
									<br></br>
									<div className="f-rl fm-w4-s23p5">
										Consultant with patients with live video, view treatments,
										and track your orders.
									</div>
								</div>
								<div className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2 col-0"></div>
								<div
									className="col-xl-6 col-lg-10 col-md-10 col-xs-10 col-sm-10 col-12"
									style={{
										backgroundPosition: "top left",
										backgroundImage: "url(../images/screenshot3.png)",
										backgroundRepeat: "no-repeat",
										height: "800px",
									}}
								>
									<div
										className="imgimg left725"
										style={{
											position: "absolute",
											left: "-30px",
											top: "1240px",
										}}
									>
										<img
											loading="lazy"
											alt=""
											src="../images/Treatments.png"
											style={{ width: "100%" }}
										></img>
									</div>
								</div>
							</div>
							<div className="row pt-6">
								<div
									className="col-xl-6 col-lg-12 col-md-12 col-xs-12 col-sm-12"
									style={{
										backgroundImage: "url(../images/screenshot4.png)",
										backgroundRepeat: "no-repeat",
										height: "800px",
									}}
								>
									<div
										className="checkin left560"
										style={{
											position: "absolute",
											left: "402px",
											top: "2059px",
										}}
									>
										<img
											loading="lazy"
											alt=""
											src="../images/checkin.png"
											style={{ width: "100%" }}
										></img>
									</div>
								</div>
								<div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1 col-1">
									&nbsp;
								</div>
								<div
									className="col-xl-5 col-lg-10 col-md-10 col-xs-10 col-sm-10 col-11 pt-230"
									style={{ textAlign: "left" }}
								>
									<div className="f-rl fm-w3-s52p5">
										Secure and<br></br>
										Safe Check-in
									</div>
									<br></br>
									<div className="f-rl fm-w4-s23p5">
										Home service via secure pin code<br></br>
										with Uber-like map tracking.
									</div>
								</div>
							</div>
							<div className="row pt-6" style={{ backgroundColor: "#EDE3DC" }}>
								<div
									className="col-xl-6 col-lg-12 col-md-12 col-xs-12 col-sm-12 pt-90"
									style={{
										textAlign: "left",
										paddingLeft: "110px",
									}}
								>
									<div className="f-rl fm-w3-s52p5 lapyfont">
										Manage Your Business In The Dashboard
									</div>
									<div
										className="lapy"
										style={{
											position: "absolute",
											left: "0px",
											top: "3275px",
										}}
									>
										<img
											loading="lazy"
											alt=""
											src="../images/macbook.png"
											style={{ width: "100%" }}
										></img>
									</div>
								</div>
								<div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1"></div>
								<div
									className="col-xl-5 col-lg-12 col-md-12 col-xs-12 col-sm-12"
									style={{
										backgroundImage: "url(../images/screenshot5.png)",
										backgroundPosition: "top right",
										backgroundRepeat: "no-repeat",
										height: "1294px",
									}}
								></div>
							</div>
							<div className="row pt-6" style={{ backgroundColor: "#F3F1F0" }}>
								<div
									className="col-xl-7 col-lg-9 col-md-12 col-xs-12 col-sm-12 ht-1250 mobilepadding"
									style={{
										backgroundImage: "url(../images/screenshot.png)",
										backgroundRepeat: "no-repeat",
										borderRadius: "28px",
										height: "894px",
									}}
								>
									<div
										className="mobile"
										style={{
											position: "absolute",
											left: "500px",
											top: "4400px",
										}}
									>
										<img
											loading="lazy"
											alt=""
											src="../images/mobile.png"
											style={{ width: "100%" }}
										></img>
									</div>
								</div>
								<div
									className="col-xl-5 col-lg-12 col-md-12 col-xs-12 col-sm-12 mobilepadding paddingleftzero"
									style={{
										textAlign: "left",
										paddingLeft: "50px",
									}}
								>
									<div className="f-rl fm-w3-s52p5 lapyfont">
										Make The Treatment Easy By Using doctor’s App
									</div>
								</div>
							</div>
							<div className="row no-gutters">
								<div
									className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8 col-12 d-flex ht-1"
									style={{
										textAlign: "center",
										backgroundColor: "#b58a6c",
										flexDirection: "column",
										alignContent: "center",
										justifyContent: "center",
									}}
								>
									<div className="row ">
										<div className="col-12">
											<div className="f-rl fm-w3-s52p5 color-FF " style={{}}>
												Let's Get Started
											</div>
										</div>
									</div>
									<br />
									<br />
									<div className="row" style={{}}>
										<div className="col-12 ">
											<button
												className="btn-rounded-black"
												onClick={() => navigate("/signup/social")}
											>
												Sign Up
											</button>
										</div>
									</div>
								</div>
								<div
									className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 col-12 "
									style={{
										padding: "0px",
									}}
								>
									<img
										className="ht-1"
										loading="lazy"
										alt=""
										src="../images/Rectangle194.png"
										style={{ width: "100%" }}
									></img>
								</div>
								{utils.Footer()}
							</div>

							{/* </div> */}
						</div>
					</div>
				</div>
			</div>
		</center>
	);
};

export default Business;
