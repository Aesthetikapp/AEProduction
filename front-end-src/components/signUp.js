import React from "react";
import Socialsignup from "./SignUpPages/socialsignup";
import SignUpWithEmail from "./SignUpPages/signupwithemail";
import { useParams } from "react-router-dom";
import * as utils from "../common/util";

const Signup = () => {
	const signupstate = {
		signupwith: useParams(),
	};
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
				<div className="col-xl-6 col-lg-6 col-md-4 col-xs-4 col-sm-4 mt-p18">
					<utils.aeLogo_signup fcolor="color-FF" />
				</div>
				<div
					className="col-xl-6 col-lg-6 col-md-7 col-xs-7 col-sm-8  pr-n185"
					style={{ paddingRight: "0px !important" }}
				>
					<div
						className="text-black mt-n5 pr-n73 pr-n65 pr-n25 prl pr-n90 pr-n17"
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
									<label className="pt-4 f-fm fm-w4-s14">
										Let’s get you all set up so you can verify your account and
										begin setting up your profile.
									</label>
								</div>
							</div>
							<div className=""></div>
						</div>
						{signupstate.signupwith.signupstate === "social" && (
							<Socialsignup />
						)}
						{signupstate.signupwith.signupstate === "email" && (
							<SignUpWithEmail />
						)}
						{signupstate.signupwith.signupstate === "social" && (
							<>
								<div className="row">
									<div className=""></div>
									<div className="col">
										<div className="form-outline">
											<label className="pt-9">&nbsp;</label>
										</div>
									</div>
									<div className=""></div>
								</div>
								<div className="row">
									<div className=""></div>
									<div className="col">
										<div className="form-outline">
											<label className="pt-2rem">&nbsp;</label>
										</div>
									</div>
									<div className=""></div>
								</div>
							</>
						)}
					</div>
				</div>
				<div className="col-lg-1 col-md-2 col-xs-3 col-sm-4"></div>
			</div>
			<div className="row">
				<div className="col-xl-6 col-lg-6 col-md-4 col-xs-4 col-sm-4"></div>
				<div className="col-xl-5 col-lg-5 col-md-7 col-xs-7 col-sm-7 text-center">
					<br></br>
					<label className="text-center f-fm fm-w5-s16 color-FF">
						Already have an account?{" "}
						<a href="/login" style={{ color: "#FFFFFF" }}>
							Login
						</a>
					</label>
				</div>
				<div className="col-xl-1 col-lg-1 col-md-2 col-xs-3 col-sm-4"></div>
			</div>
			{signupstate.signupwith.signupstate === "social" && (
				<>
					<div style={{ paddingTop: "133px" }}>
						<br></br>
					</div>
				</>
			)}
			{signupstate.signupwith.signupstate === "email" && (
				<>
					<div style={{ paddingTop: "27px" }}>&nbsp;</div>
				</>
			)}
		</div>
	);
};
export default Signup;
