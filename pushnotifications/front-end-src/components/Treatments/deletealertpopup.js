import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

const Deletealertpopup = (props) => {
	const [show, setShow] = useState(true);
	const handleClose = () => {
		setShow(false);
	};
	const keepit = () => {
		setShow(false);
	};
	const Delete = () => {
		setShow(false);
		props.Clear();
	};
	return (
		<>
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
									loading="lazy"
									alt=""
									onClick={handleClose}
									style={{ cursor: "pointer", float: "right" }}
									src="../images/closeone.png"
								></img>
							</div>
						</div>
						<div className="row" style={{ padding: "50px 30px 80px 20px" }}>
							<div className="col-xl col-lg col-md col-xs col-sm">
								<label className="f-fm fm-w6-s18 color-00">
									Are you sure to delete this disclosure?
								</label>
							</div>
						</div>
						<div className="row" style={{ padding: "0px 30px 30px 20px" }}>
							<div className="col-xl col-lg col-md col-xs col-sm">
								<button
									style={{
										border: "1px solid #000000",
										borderRadius: "31.5px",
										width: "200px",
										height: "60px",
										backgroundColor: "#ffffff",
									}}
								>
									{" "}
									<label
										className="f-fm fm-w6-s18 color-00"
										style={{
											display: "flex",
											cursor: "pointer",
											justifyContent: "center",
										}}
										onClick={keepit}
									>
										Keep It
									</label>
								</button>
								<button
									style={{
										border: "1px solid #000000",
										borderRadius: "31.5px",
										width: "200px",
										height: "60px",
										float: "right",
										background: "#000000",
									}}
								>
									{" "}
									<label
										className="f-fm fm-w6-s18 color-FF"
										style={{
											display: "flex",
											cursor: "pointer",
											justifyContent: "center",
										}}
										onClick={Delete}
									>
										Delete
									</label>
								</button>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};
export default Deletealertpopup;
