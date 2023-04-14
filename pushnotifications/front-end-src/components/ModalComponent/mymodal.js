import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import NewTreatment from "../Treatments/newtreatment";
import Edittreatment from "../Treatments/editnewtreatment";

const MyModal = (props) => {
	// console.log("mymodal", props);
	const [steps, setSteps] = useState({ step: 0 });
	const showNextStep = (props) => {
		console.log(steps.step);
		//steps.step = steps.step + 1;
		setSteps((prevState) => ({ step: prevState.step + 1 }));
		console.log(steps.step);
		if (steps.step === 3) {
			props.setfirstTime(false);
		}
	};
	const setStep = (stepno, props) => {
		console.log(steps.step);
		//steps.step = stepno;
		setSteps((prevState) => ({ step: stepno }));
		console.log(steps.step);
		if (steps.step === 3) {
			props.setisIntro(false);
		}
	};
	const getImg = (props) => {
		return props.data[steps.step].img;
	};

	const getMessage1 = () => {
		return props.data[steps.step].message1;
	};
	const getMessage2 = () => {
		return props.data[steps.step].message2;
	};
	const GetBody = (props) => {
		if (props.type === "edit") {
			return (
				<Edittreatment
					userid={props.userid}
					useremail={props.useremail}
					cancel={props.cancel}
					save={props.save}
					clinicname={props.clinicname}
					change={props.change}
					id={props.id}
				/>
			);
		}
		if (!props.type) {
			return (
				<div className="padding" style={{ padding: "100px 55px 35px 56px" }}>
					<div className="row">
						<div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
							{steps.step === 2 && (
								<>
									<img
										className="width"
										loading="lazy"
										src={getImg(props)}
										alt="intro1"
										style={{ paddingTop: "22px", paddingLeft: "47px" }}
									></img>
								</>
							)}
							{steps.step !== 2 && (
								<>
									<img
										className="width"
										loading="lazy"
										src={getImg(props)}
										alt="intro1"
										style={{ paddingTop: "22px" }}
									></img>
								</>
							)}
						</div>
						<div className="col paddingleft" style={{ paddingLeft: "190px" }}>
							<div>
								<div
									className="coral f-fm"
									style={{ fontWeight: "700", fontSize: "20px" }}
								>
									WHAT YOU CAN DO
								</div>
								<div
									className="f-fm"
									style={{
										paddingTop: "14px",
										fontWeight: "700",
										fontSize: "40px",
										whiteSpace: "pre-wrap",
									}}
								>
									{getMessage1(props)}
								</div>
								<div
									className="f-fm"
									style={{
										paddingTop: "38px",
										fontWeight: "400",
										fontSize: "18px",
										whiteSpace: "pre-wrap",
									}}
								>
									{getMessage2(props)}
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col">&nbsp;</div>
					</div>
					<div className="row">
						<div className="col">&nbsp;</div>
					</div>
					<div className="row">
						<div className="col">&nbsp;</div>
					</div>
					<div className="row">
						<div className="col">&nbsp;</div>
					</div>
					<div className="row">
						<div className="col-10">
							{steps.step === 0 && (
								<>
									<span
										style={{
											cursor: "pointer",
											display: "inline-block",
											height: "8px",
											width: "8px",
											border: "solid 1px #000000",
											backgroundColor: "#000000",
											borderRadius: "10px",
										}}
									></span>
									&nbsp;
									<span
										onClick={() => setStep(1, props)}
										style={{
											cursor: "pointer",
											display: "inline-block",
											height: "8px",
											width: "8px",
											border: "solid 1px #000000",
											backgroundColor: "#FFFFFF",
											borderRadius: "10px",
										}}
									></span>
									&nbsp;
									<span
										onClick={() => setStep(2, props)}
										style={{
											cursor: "pointer",
											display: "inline-block",
											height: "8px",
											width: "8px",
											border: "solid 1px #000000",
											backgroundColor: "#FFFFFF",
											borderRadius: "10px",
										}}
									></span>
									&nbsp;
								</>
							)}
							{steps.step === 1 && (
								<>
									<span
										style={{
											cursor: "pointer",
											display: "inline-block",
											height: "8px",
											width: "8px",
											border: "solid 1px #000000",
											backgroundColor: "#000000",
											borderRadius: "10px",
										}}
									></span>
									&nbsp;
									<span
										onClick={() => setStep(1, props)}
										style={{
											cursor: "pointer",
											display: "inline-block",
											height: "8px",
											width: "8px",
											border: "solid 1px #000000",
											backgroundColor: "#000000",
											borderRadius: "10px",
										}}
									></span>
									&nbsp;
									<span
										onClick={() => setStep(2, props)}
										style={{
											cursor: "pointer",
											display: "inline-block",
											height: "8px",
											width: "8px",
											border: "solid 1px #000000",
											backgroundColor: "#FFFFFF",
											borderRadius: "10px",
										}}
									></span>
									&nbsp;
								</>
							)}
							{steps.step === 2 && (
								<>
									<span
										style={{
											cursor: "pointer",
											display: "inline-block",
											height: "8px",
											width: "8px",
											border: "solid 1px #000000",
											backgroundColor: "#000000",
											borderRadius: "10px",
										}}
									></span>
									&nbsp;
									<span
										style={{
											cursor: "pointer",
											display: "inline-block",
											height: "8px",
											width: "8px",
											border: "solid 1px #000000",
											backgroundColor: "#000000",
											borderRadius: "10px",
										}}
									></span>
									&nbsp;
									<span
										style={{
											cursor: "pointer",
											display: "inline-block",
											height: "8px",
											width: "8px",
											border: "solid 1px #000000",
											backgroundColor: "#000000",
											borderRadius: "10px",
										}}
									></span>
									&nbsp;
								</>
							)}
						</div>
						<div className="col-2">
							{(steps.step === 0 || steps.step === 1) && (
								<img
									loading="lazy"
									src="../images/Arrowr.png"
									style={{ cursor: "pointer" }}
									onClick={() => showNextStep(props)}
									alt="next"
								></img>
							)}
							{steps.step >= 2 && (
								<img
									className="marginleft"
									loading="lazy"
									src="../images/start.png"
									style={{ cursor: "pointer" }}
									onClick={props.hideIntro}
									alt="start"
								></img>
							)}
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<NewTreatment
					userid={props.userid}
					useremail={props.useremail}
					cancel={props.cancel}
					save={props.save}
					clinicname={props.clinicname}
					change={props.change}
				/>
			);
		}
	};
	return (
		<div>
			<Modal
				show={props.show}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				className="modal-intro"
				backdrop="static"
				keyboard="false"
				dialogClassName={props.dialogClassName}
				centered
			>
				<Modal.Body>{GetBody(props)}</Modal.Body>
			</Modal>
		</div>
	);
};

export default MyModal;
