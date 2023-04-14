import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import * as utils from "../../common/util";

const Adjustduration = (props) => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [addtime, setAddtime] = useState({
		Adjustduration: "",
	});
	const [time, setTime] = useState("");
	const handleChange = (event) => {
		setAddtime({ Adjustduration: event.target.value });
		setTime(event);
	};
	const getButtonClass = () => {
		let vtext = addtime.Adjustduration === "" ? "@#@" : addtime.Adjustduration;
		let rvalue = "aebuttongrey";

		if (vtext.indexOf("@#@") >= 0) {
			rvalue = "aebuttongrey";
		} else {
			rvalue = "aebuttonblack";
		}
		return rvalue;
	};

	const add = () => {
		props.onDurationChange(addtime);
		setShow(false);
	};

	const duration = [
		"..select..",
		"5 mins",
		"10 mins",
		"15 mins",
		"20 mins",
		"25 mins",
		"30 mins",
		"35 mins",
		"40 mins",
		"45 mins",
		"50 mins",
		"55 mins",
		"60 mins",
	];
	return (
		<div style={{ borderRadius: "20px" }}>
			<div
				className="col-xl col-lg col-md col-xs col-sm"
				style={{ paddingTop: "10px" }}
				onClick={handleShow}
			>
				<label
					className="f-fm fm-w4-s16 color-40"
					style={{ textDecoration: "underline", cursor: "pointer" }}
				>
					AdjustDuration
				</label>
			</div>
			<div>
				<Modal
					style={{}}
					show={show}
					onHide={handleClose}
					dialogClassName="modal-sm-30px"
					size="md"
					backdropClassName="childmodal"
					backdrop="static"
					centered
				>
					<Modal.Body>
						<div>
							<div className="row" style={{ padding: "10px 10px 0px 0px" }}>
								<div className="col-xl col-lg col-md col-xs col-sm">
									{/* <CloseButton/>  */}
									<img
										loading="lazy"
										alt=""
										onClick={handleClose}
										style={{ cursor: "pointer", float: "right" }}
										src="../images/closeone.png"
									></img>
								</div>
							</div>
							<div className="row" style={{ padding: "50px 150px 30px 20px" }}>
								<div className="col-xl col-lg col-md col-xs col-sm">
									<label className="f-fm fm-w6-s18 color-00">
										We recommand aduration of 20 mins for Hyderation Lips
									</label>
								</div>
							</div>
							<div className="row" style={{ padding: "0px 50px 50px 20px" }}>
								<div className="col-xl col-lg col-md col-xs col-sm">
									<label className="f-fm fm-w6-s18 color-00">
										Adjust Duration to
									</label>
								</div>
								<div className="col-xl col-lg col-md col-xs col-sm ">
									<select
										className="form-select form-select-lg mb-3 f-fm fm-w5-s14 color-7"
										style={{ borderRadius: "10px" }}
										name="Adjustduration"
										onChange={(e) =>
											setAddtime({ Adjustduration: e.target.value })
										}
									>
										{duration.map((key) => (
											<option key={key} value={key.replace("mins", "")}>
												{key}
											</option>
										))}
									</select>
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
											onClick={add}
										/>
									</div>
								</div>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			</div>
		</div>
	);
};
export default Adjustduration;
