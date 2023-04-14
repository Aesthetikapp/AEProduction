import React from "react";
import { useNavigate } from "react-router-dom";
import Signupthroughgoogle from "./signupthroughgoogle";
import Signupthroughfb from "./signupthroughfb";

const Socialsignup = () => {
	const navigate = useNavigate();
	const signUpWithEmail = () => {
		navigate("../signup/email", { signupstate: "emai;" }, true);
	};
	return (
		<>
			<div className="row">
				<div className=""></div>
				<div className="col">
					<div className="form-outline">
						<br></br>
						<br></br>

						<Signupthroughgoogle />
					</div>
				</div>
				<div className=""></div>
			</div>
			<div className="row">
				<div className=""></div>
				<div className="col" style={{ paddingTop: "8px" }}>
					&nbsp;
				</div>
				<div className=""></div>
			</div>
			<div className="row">
				<div className=""></div>
				<div className="col">
					<div className="form-outline">
						<Signupthroughfb />
					</div>
				</div>
				<div className=""></div>
			</div>

			<div className="row">
				<div className=""></div>
				<div className="col">
					<div className="form-outline">
						<br></br>
						<br></br>
						<br></br>
						<br></br>
						<label
							className="f-fm fm-w6-s16"
							onClick={signUpWithEmail}
							style={{ cursor: "pointer", textDecoration: "underline" }}
						>
							Or sign up with Email
						</label>
					</div>
				</div>
				<div className=""></div>
			</div>
		</>
	);
};
export default Socialsignup;
