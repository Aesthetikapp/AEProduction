import React, { useState } from "react";
import * as utils from "../../common/util";
import Modal from "react-bootstrap/Modal";

const Disclosurepopup = (props) => {
	const [show, setShow] = useState(true);
	const handleClose = () => {
		setShow(false);
	};

	const [state, setState] = useState({
		Disclosuretitle: "",
		Body: "",
	});
	const handleChange = (event) => {
		console.log("b", event);
		setState({ ...state, [event.target.name]: event.target.value });
	};

	const getButtonClass = () => {
		let vtext =
			(state.Disclosuretitle === "" ? "@#@" : state.Disclosuretitle) +
			(state.Body === "" ? "@#@" : state.Body);
		let rvalue = "aebuttongrey";

		if (vtext.indexOf("@#@") >= 0) {
			rvalue = "aebuttongrey";
		} else {
			rvalue = "aebuttonblack";
		}
		return rvalue;
	};
	const handleaddChange = () => {
		setShow(false);
		localStorage.setItem("Disclosuretitle", state.Disclosuretitle);
		localStorage.setItem("Body", state.Body);
		props.onDisclosureChange({
			Disclosuretitle: state.Disclosuretitle,
			Body: state.Body,
		});
		console.log(state);
	};

	return (
		<>
			<Modal
				style={{}}
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
									loading="lazy"
									alt=""
									onClick={handleClose}
									style={{ cursor: "pointer", float: "right" }}
									src="../images/closeone.png"
								></img>
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
								<div className="col-xl col-lg col-md col-xs col-sm ">
									<input
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
										name="Body"
										value={state.Body}
										className="form-control form-control-lg"
										onChange={handleChange}
									></textarea>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-xl col-lg col-md col-xs col-sm">
								<div
									className="form-outline"
									style={{
										float: "right",
										marginRight: "40px",
										paddingBottom: "20px",
									}}
								>
									<utils.aeButton
										classNames="aebutton ae-w6-s18"
										text="Add"
										enabled="false"
										disabledClass={getButtonClass()}
										onClick={handleaddChange}
									/>
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};
export default Disclosurepopup;
