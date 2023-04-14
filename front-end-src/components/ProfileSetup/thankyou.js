import React from "react";
import * as utils from "../../common/util";

const Thankyou = () => {
	return (
		<>
			{utils.aeProgressBar({ width: "100%" })}
			<div className="slider1">
				<div style={{ backgroundColor: "#FFFFFF", overflow: "hidden" }}>
					<div className="row pt-3" style={{ backgroundColor: "#FFFFFF" }}>
						<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
							<utils.aeLogo fcolor="color-00" />
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-1"></div>
							</div>
							<div className="row">
								<div className="col-8 pl-10">
									<label className="f-rl fm-w7-s36">
										You need to upload the following documents
									</label>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-2rem"></div>
							</div>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12 imgalign">
							<img
								style={{ width: "100%" }}
								loading="lazy"
								className="body-bg-clinic-s5"
								alt="clinic"
							></img>
						</div>
					</div>
				</div>
			</div>
			<div className="slider">
				<div style={{ backgroundColor: "#FFFFFF", overflow: "hidden" }}>
					<div className="row pt-3" style={{ backgroundColor: "#FFFFFF" }}>
						<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
							<utils.aeLogo fcolor="color-00" />
							<div className="row">
								<div
									className="col pl-2 pt-4rem"
									style={{ justifyContent: "center", textAlign: "center" }}
								>
									<img
										alt=""
										style={{ height: "400px", width: "100%" }}
										src="/images/finding-signatures.gif"
									></img>
									<br></br>
									<div
										style={{
											width: "inherit",
											color: "#000",
											fontSize: "35px",
											padding: "10px",
											fontFamily: "Mulish",
										}}
									>
										Thank you for submitting your documents for approval, We
										will send you a email once we verify your documents. <br />
										<br />
										Please login with your profile after you receive the email.
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12 imgalign">
							<img
								style={{ width: "100%" }}
								loading="lazy"
								className="body-bg-clinic-s2"
								alt="clinic"
							></img>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Thankyou;
