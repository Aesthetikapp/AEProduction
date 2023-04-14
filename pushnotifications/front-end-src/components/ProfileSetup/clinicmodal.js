import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import * as utils from "../../common/util";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClinicModal = (props) => {
	const [clinicName1, setClinicName1] = useState("");
	const handleChange1 = (event) => {
		console.log(event.target.value);
		let val = event.target.value;
		setClinicName1(val);
	};
	const notify = () =>
		toast("Link Copied!", {
			position: toast.POSITION.BOTTOM_CENTER,
			autoClose: 3000,
		});
	const showNextStep1 = () => {
		props.showNextStep(clinicName1, "continue");
	};
	return (
		<>
			<ToastContainer
				hideProgressBar
				autoClose={3000}
				className="tcontainer"
				toastClassName="twrapper"
				bodyClassName="tbody"
				progressClassName="tprogress"
			/>
			<Modal
				className="modal-create"
				show={props.show}
				{...props}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				backdrop="static"
				keyboard="false"
			>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>
					<p style={{ padding: "50px 50px 50px 50px" }}>
						<div className="f-rl fm-w7-s36">
							Oops!<br></br>
							<br></br>
							<div className="fm-w7-s30" style={{ paddingBottom: "60px" }}>
								Seems like your clinic hasn’t set up a business <br></br>account
								at <label style={{ color: "#AF805E" }}> Aethetik.</label>
								<br></br>
								<label
									className="form-label form f-fm fm-w6-s12"
									htmlFor="form3Example8"
									style={{ marginLeft: "0px" }}
								>
									Clinic / Institution Name
								</label>
								<input
									type="text"
									style={{ height: "60px" }}
									name="clinicname1"
									className="form-control form-control-lg"
									onChange={handleChange1}
								/>
							</div>
						</div>
						<utils.aeButton
							classNames="f-rl aebutton fm-w6-s20 pt-3"
							disabledClass={
								clinicName1 === "" ? "aebuttongrey" : "aebuttonblack"
							}
							text="Create a Business Account"
							onClick={showNextStep1}
						/>
					</p>
					<p
						className="f-fm fm-w6-s18"
						style={{ textAlign: "center", padding: "50px 50px 50px 50px" }}
					>
						Or invite an admin user to create an account{" "}
						<img
							loading="lazy"
							style={{ cursor: "pointer" }}
							src="../images/Copylink.png"
							alt="copy link"
							onClick={() => {
								navigator.clipboard.writeText(
									window.location.href.replace("clinicname", "signup")
								);
								notify();
							}}
						></img>
					</p>
				</Modal.Body>
			</Modal>
		</>
	);
};
export default ClinicModal;
