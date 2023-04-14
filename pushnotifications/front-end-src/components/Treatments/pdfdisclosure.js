import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Deletealertpopup from "./deletealertpopup";

const Pdfdiclosure = (props) => {
	const [show, setShow] = useState(false);
	const handleClose = () => {
		setShow(false);
	};
	const handleShow = () => {
		setShow(true);
		setEnable(true);
		setState({
			Disclosuretitle: localStorage.getItem("Disclosuretitle"),
			Body: localStorage.getItem("Body"),
		});
	};

	const [state, setState] = useState({
		Disclosuretitle: "",
		Body: "",
	});

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.value });
	};

	const handleaddChange = (event) => {
		setShow(false);
		setGoback(event);
		setEnable(true);
		localStorage.setItem("Disclosuretitle", state.Disclosuretitle);
		localStorage.setItem("Body", state.Body);
		props.pdfdisclosure({
			Disclosuretitle: state.Disclosuretitle,
			Body: state.Body,
		});
	};
	const [enable, setEnable] = useState(true);
	const [goback, setGoback] = useState("");
	const [showmadal, setShowModal] = useState(false);
	const handleDisclosureChange = (event) => {
		setShowModal(false);
		setEnable(true);
		setGoback(event);
		if (event === "Delete") {
			setShowModal(true);
			// setGoback("More Option")
		}
		if (event === "Edit") {
			setEnable(false);
		}
	};
	const Optionchange = (event) => {
		setGoback(event);
	};
	const Clear = () => {
		setShow(false);
		localStorage.removeItem("Disclosuretitle");
		localStorage.removeItem("Body");
	};
	const handleEntered = () => {
		setShowModal(false);
	};

	return (
		<>
			<div
				className="col-xl col-lg col-md col-xs col-sm"
				style={{ float: "right", paddingTop: "4px", cursor: "pointer" }}
				onClick={handleShow}
			>
				<img src="./images/pdfdisclosure.png" alt="pdf"></img>
			</div>
			{showmadal && (
				<Deletealertpopup
					Clear={Clear}
					Optionchange={Optionchange}
					handleEntered={handleEntered}
				></Deletealertpopup>
			)}
			<Modal
				show={show}
				onHide={handleClose}
				dialogClassName="modal-sm-30px"
				size="md"
				backdropClassName="childmodal"
				backdrop="static"
				centered
				onEntered={() => props.handleEntered}
			>
				<Modal.Body>
					<div style={{}}>
						<div className="row" style={{ padding: "10px 10px 0px 0px" }}>
							<div className="col-xl col-lg col-md col-xs col-sm">
								<img
									alt="close"
									onClick={handleClose}
									style={{ cursor: "pointer", float: "right" }}
									src="../images/closeone.png"
								></img>
							</div>
						</div>
						<div className="row" style={{ padding: "20px 50px 10px 20px" }}>
							<div className="col-xl-5 col-lg-5 col-md-5 col-xs-5 col-sm-5 ">
								<select
									className="form-select form-select-lg mb-3 f-fm fm-w5-s14 color-7"
									style={{ borderRadius: "10px" }}
									value={goback}
									onChange={(e) => handleDisclosureChange(e.target.value)}
								>
									<option
										className="f-fm fm-w5-s16 color-7"
										value="More Options"
									>
										More Options
									</option>
									<option className="f-fm fm-w5-s14 color-7" value="Edit">
										Edit
									</option>
									<option className="f-fm fm-w5-s14 color-7" value="Delete">
										Delete
									</option>
								</select>
							</div>
						</div>
						<div className="row" style={{ padding: "20px 50px 30px 20px" }}>
							<div className="col-xl col-lg col-md col-xs col-sm">
								<label className="f-fm fm-w6-s18 color-00">
									Please add your diclosure content to the form
								</label>
							</div>
						</div>
						<div className="row" style={{ padding: "0px 30px 30px 20px" }}>
							<div className="col-xl col-lg col-md col-xs col-sm">
								<label
									className="f-fm fm-w4-s16 color-00"
									style={{ paddingBottom: "10px" }}
								>
									Disclosure title
								</label>
							</div>
							<div className="row">
								<div className="col-xl col-lg col-md col-xs col-sm">
									<input
										disabled={enable}
										className="form-control form-control-lg"
										placeholder="Please mention your disclosure title"
										name="Disclosuretitle"
										onChange={handleChange}
										value={state.Disclosuretitle}
									></input>
								</div>
							</div>
						</div>
						<div className="row" style={{ padding: "0px 30px 30px 20px" }}>
							<div className="col-xl col-lg col-md col-xs col-sm">
								<label
									className="f-fm fm-w4-s16 color-00"
									style={{ paddingBottom: "10px" }}
								>
									Body
								</label>
							</div>
							<div className="row">
								<div className="col-xl col-lg col-md col-xs col-sm">
									<textarea
										disabled={enable}
										name="Body"
										className="form-control form-control-lg"
										onChange={handleChange}
										value={state.Body}
									></textarea>
								</div>
							</div>
							<div className="row pt-4">
								<div className="col-xl col-lg col-md col-xs col-sm">
									{enable === true ? (
										<button
											style={{
												border: "1px solid #ACACAC",
												borderRadius: "31.5px",
												width: "150px",
												height: "60px",
												float: "right",
												background: "#ACACAC",
											}}
										>
											{" "}
											<label
												className="f-fm fm-w6-s18 color-FF"
												style={{ display: "flex", justifyContent: "center" }}
											>
												Add
											</label>
										</button>
									) : (
										<button
											style={{
												border: "1px solid #000000",
												borderRadius: "31.5px",
												width: "150px",
												height: "60px",
												float: "right",
												background: "#000000",
											}}
										>
											{" "}
											<label
												className="f-fm fm-w6-s18 color-FF"
												style={{ display: "flex", justifyContent: "center" }}
												onClick={handleaddChange}
											>
												Add
											</label>
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};
export default Pdfdiclosure;
