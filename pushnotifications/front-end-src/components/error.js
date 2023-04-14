import React, { useState, useEffect } from "react";
import * as utils from "../common/util";
import { useLocation } from "react-router-dom";

const Error = () => {
	const params = useLocation().state;
	console.log("params", params);
	const [text, settext] = useState("");

	useEffect(() => {
		if (params === "loginfirst") {
			settext(
				"Some error occured, please Signup through the link sent to your registered Email."
			);
		} else {
			settext("Some error occured, please try through google or facebook.");
		}
		if (params === null) {
			settext("Some error occured please contact your administrator.");
		}
	}, []);

	return (
		<div className="body-bg ">
			<div className="row">
				<div className="col-xl-7 col-lg-6 col-md-4 col-xs-4 col-sm-4">
					&nbsp;
				</div>
				<div className="col-xl-4 col-lg-5 col-md-7 col-xs-7 col-sm-7"></div>
				<div className="col-lg-1 col-md-2 col-xs-3 col-sm-4"></div>
			</div>
			<div className="row">
				<div className="col-xl-7 col-lg-6 col-md-4 col-xs-4 col-sm-4 mt-p18">
					<utils.aeLogo_signup fcolor="color-FF" />
				</div>
				<div
					className="col-xl-5 col-lg-6 col-md-7 col-xs-7 col-sm-8  pr-n185"
					style={{ paddingRight: "0px !important" }}
				>
					<div
						className=" text-black mt-n5 pr-n73 pr-n65 pr-n25 prl pr-n90 pr-n17"
						style={{
							borderBottomLeftRadius: "20px",
							boxShadow: "0px 4px 40px rgba(0, 0, 0, 0.15)",
							borderBottomRightRadius: "20px",
							backgroundColor: "#FFFFFF",
						}}
					>
						<div className="row">
							<div className=""></div>
							<div className="col pt-ssignup">
								<div className="form-outline"></div>
							</div>
							<div className=""></div>
						</div>
						<div className="row">
							<div className=""></div>
							<div className="col">
								<div className="form-outline">
									<label
										style={{
											fontStyle: "normal",
											fontWeight: "400",
											fontSize: "30px",
										}}
									>
										Sign Up
									</label>
								</div>
							</div>
							<div className=""></div>
						</div>
						<div className="row">
							<div className=""></div>
							<div className="col">
								<div className="form-outline">
									<label className="pt-4 f-fm fm-w4-s14">{text}</label>
								</div>
							</div>
							<div className=""></div>
						</div>
						<label
							className="text-center f-fm fm-w5-s16"
							style={{ paddingTop: "20px" }}
						>
							<a href="/login" style={{ color: "#ACACAC" }}>
								log in
							</a>
						</label>
						<label
							className="text-center f-fm fm-w5-s16"
							style={{ paddingLeft: "4vw" }}
						>
							Don't have an account?{" "}
							<a href="/signup/social" style={{ color: "#ACACAC" }}>
								Sign Up
							</a>
						</label>
					</div>
				</div>
				<div className="col-lg-1 col-md-2 col-xs-3 col-sm-4"></div>
			</div>
			<div className="row">
				<div className="col-xl-7 col-lg-6 col-md-4 col-xs-4 col-sm-4"></div>
				<div className="col-xl-4 col-lg-5 col-md-7 col-xs-7 col-sm-7 text-center">
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
					<br></br>
					<br></br>
					<br></br>
					<br></br>
				</div>
				<div className="col-lg-1 col-md-2 col-xs-3 col-sm-4 pt-3"></div>
			</div>
		</div>
	);
};
export default Error;
