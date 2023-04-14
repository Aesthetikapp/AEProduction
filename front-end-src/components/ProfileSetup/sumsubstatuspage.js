import React, { useEffect, useRef, useState } from "react";
import Sumsub from "../sumsub";
import * as UserServices from "../../services/user";
import { useNavigate, useLocation } from "react-router-dom";
import * as utils from "../../common/util";

const Sumsuberror = () => {
	const navigate = useNavigate();
	const params = useLocation().state;
	const firstupdate = useRef(true);
	const [dstate, setDstate] = useState({
		params,
	});
	const redirect = (c) => {
		console.log("c enter");
		if (firstupdate.current === true) {
			console.log("current true enter");
			return;
		}
		console.log("update enter");
		const updateVariable = UserServices.returnUpdateVariables({
			id: c.userByEmail[0].id,
			complete: "complete",
		});
		console.log(updateVariable);

		UserServices.UpdateUser(updateVariable).then((value) => {
			console.log(value);
			const settingsVariable = UserServices.returnCreateSettings({
				id: c.userByEmail[0].id,
				subscription_id: "",
			});
			console.log(settingsVariable);
			UserServices.CreateSettings(settingsVariable).then((result) => {
				console.log("entered update");
				console.log(result);
				UserServices.CreateAgoraUser({
					username: c.userByEmail[0].email.replace(/[^a-zA-Z0-9]/g, ""),
					password: "agorachat",
					nickname: c.userByEmail[0].firstName,
				});
				localStorage.setItem("throughsignup", true);
				navigate("../dashboard", { state: c.userByEmail[0] });
			});
		});
		firstupdate.current = true;
	};

	useEffect(() => {
		(async function anyNameFunction() {
			var c = await UserServices.GetUserByEmail(params.email);
			console.log("login", c.userByEmail);
			if (c.userByEmail[0].title === "accepted") {
				if (c.userByEmail[0].isadmin === true) {
					navigate("../payment", { state: c.userByEmail[0] });
				} else {
					console.log("function else enter");
					firstupdate.current = false;
					redirect(c);
				}
			}
		})();
	}, []);

	return (
		<>
			{utils.aeProgressBar({ width: "100%" })}
			<div className="slider1">
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
			<div className="slider">
				<div style={{ backgroundColor: "#FFFFFF", overflow: "hidden" }}>
					<div className="row pt-3" style={{ backgroundColor: "#FFFFFF" }}>
						<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
							<utils.aeLogo fcolor="color-00" />
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
							<div className="row">
								<div>
									<Sumsub params={params}></Sumsub>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-2rem"></div>
							</div>
							<div className="row">
								<div className="col pl-12"></div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-3rem"></div>
							</div>
							<div className="row">
								<div className="col pl-12"></div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12 imgalign">
							<img
								style={{ width: "100%" }}
								loading="lazy"
								className="body-bg-clinic-s1"
								alt="clinic"
							></img>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Sumsuberror;
