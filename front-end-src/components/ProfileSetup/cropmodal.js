import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ImageCropper from "./imagecroppopup";
import * as utils from "../../common/util";

const Dragcropmodal = (props) => {
	const [show, setShow] = useState(false);

	const fileInput = React.createRef();

	const [imageToCrop, setImageToCrop] = useState(undefined);
	const [croppedImage, setCroppedImage] = useState(undefined);
	const [getUpload, setGetUpload] = useState();
	const handleClose = () => {
		setImageToCrop(false);
		setShow(false);
	};
	const temp = () => {
		setShow(false);
		setImageToCrop(false);
		localStorage.setItem("cropmodal1", croppedImage);
	};
	const [size, setSize] = useState("");
	const onUploadFile = (event) => {
		let sizeInBytes = event.target.files[0].size;
		var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
		setSize(sizeInMB + "MB");
		setShow(true);
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.addEventListener("load", () => {
				const image = reader.result;
				// console.log(image);
				setGetUpload(image);
				setImageToCrop(image);
			});
			reader.readAsDataURL(event.target.files[0]);
		}
	};
	const deletepop = () => {
		setShow(false);
		setImageToCrop(undefined);
		setCroppedImage(undefined);
		props.onImageChange("");
	};
	const handleChange = () => {
		setShow(true);
	};
	function ConvertToImageFormat(base64ImageFormat) {
		return (
			<ImageCropper
				imageToCrop={getUpload}
				onImageCropped={(croppedImage) => {
					setCroppedImage(croppedImage);
					props.onImageChange2(croppedImage);
				}}
			/>
		);
	}
	const [dragStartImage, setDragStartImage] = useState(undefined);
	const dragStart = (event) => {
		setDragStartImage(event);
	};
	const dragWord = (event) => {
		if (event === dragStartImage) {
			setDragStartImage(undefined);
			return;
		} else {
			setCroppedImage2(croppedImage);
			setCroppedImage(croppedImage2);
			props.onImageChange(croppedImage2);
			props.onImageChange2(croppedImage);
			setGetUpload2(getUpload);
			setGetUpload(getUpload2);
		}
	};

	const [show2, setShow2] = useState(false);

	// const handleShow2 = () => setShow2(true);
	const fileInput2 = React.createRef();

	const [imageToCrop2, setImageToCrop2] = useState(undefined);
	const [croppedImage2, setCroppedImage2] = useState(undefined);
	const [getUpload2, setGetUpload2] = useState();
	const handleClose2 = () => {
		setImageToCrop2(false);
		setShow2(false);
	};
	const temp2 = () => {
		setShow2(false);
		setImageToCrop2(false);
		localStorage.setItem("cropmodal1", croppedImage);
	};
	const [size2, setSize2] = useState("");
	const onUploadFile2 = (event) => {
		let sizeInBytes = event.target.files[0].size;
		var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
		setSize2(sizeInMB + "MB");
		setShow2(true);
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.addEventListener("load", () => {
				const image = reader.result;
				// console.log(image);
				setGetUpload2(image);
				setImageToCrop2(image);
			});
			reader.readAsDataURL(event.target.files[0]);
		}
	};
	const deletepop2 = () => {
		setShow2(false);
		setImageToCrop2(undefined);
		setCroppedImage2(undefined);
		props.onImageChange2("");
	};
	const handleChange2 = () => {
		setShow2(true);
	};
	function ConvertToImageFormat2(base64ImageFormat) {
		// let url = base64ImageFormat;
		return (
			<ImageCropper
				imageToCrop={getUpload2}
				onImageCropped={(croppedImage2) => {
					setCroppedImage2(croppedImage2);
					props.onImageChange2(croppedImage2);
				}}
			/>
		);
	}
	const [dragStartImage2, setDragStartImage2] = useState(undefined);
	const dragStart2 = (event) => {
		setDragStartImage2(event);
	};
	const dragWord2 = (event) => {
		if (event === dragStartImage2) {
			setDragStartImage2(undefined);
			return;
		} else {
			setCroppedImage2(croppedImage);
			setCroppedImage(croppedImage2);
			props.onImageChange(croppedImage2);
			props.onImageChange2(croppedImage);
			setGetUpload2(getUpload);
			setGetUpload(getUpload2);
		}
	};

	return (
		<>
			{" "}
			<div className="row">
				<div
					style={{ borderRadius: "20px", paddingRight: "0px", width: "125px" }}
					className="col-3"
				>
					<>
						{!croppedImage && (
							<label
								style={{
									borderRadius: "50%",
									width: "100px",
									height: "100px",
									backgroundColor: "#D6D6D6",
									backgroundImage:
										// "url(./images/plusone.png)",
										props.ttype === "edit"
											? "url(" + props.ttypetext + ")"
											: "url(./images/plusone.png)",
									backgroundRepeat: "no-repeat",
									backgroundPosition: "center",
									backgroundSize: props.ttype === "edit" ? "cover" : "",
									cursor: "pointer",
								}}
							>
								<input
									ref={fileInput}
									name="file"
									type="file"
									accept="image/*"
									maxfilesize={2000000}
									onChange={onUploadFile}
									style={{ cursor: "pointer", display: "none" }}
								/>
							</label>
						)}

						{croppedImage && (
							<label
								style={{
									borderRadius: "50%",
									width: "100px",
									height: "100px",
									backgroundColor: "#D6D6D6",
									backgroundImage:
										"url(" + window.URL.createObjectURL(croppedImage) + ")",
									backgroundRepeat: "no-repeat",
									backgroundPosition: "center",
									backgroundSize: "cover",
									cursor: "pointer",
								}}
								onClick={handleChange}
								draggable="true"
								onDragStart={() => {
									dragStart(croppedImage);
								}}
								onDragOver={(event) => event.preventDefault()}
								onDrop={() => {
									dragWord(croppedImage);
								}}
							></label>
						)}
					</>

					<br></br>

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
										<div className="col">
											<img
												loading="lazy"
												alt="Close"
												onClick={handleClose}
												style={{ cursor: "pointer", float: "right" }}
												src="../images/closeone.png"
											></img>
										</div>
									</div>

									<div
										className="row"
										style={{ padding: " 30px 10px 50px 10px" }}
									>
										<div className="col">
											<label className="f-fm fm-w6-s36 color-00">
												Crop&nbsp;Photo
											</label>
										</div>
										<div className="col" style={{ paddingTop: "15px" }}>
											<label
												style={{
													height: "26px",
													width: "98px",
													backgroundColor: "#F4F4F4",
													borderRadius: "17px",
													textAlign: "center",
												}}
											>
												{" "}
												<label className="f-fm fm-w5-s12 color-AC">
													Replace&nbsp;
													<img
														loading="lazy"
														src="./images/replace.png"
														alt="star"
													></img>
													<input
														ref={fileInput}
														type="file"
														accept="image/*"
														onChange={onUploadFile}
														style={{ cursor: "pointer", display: "none" }}
													/>
												</label>
											</label>
										</div>
										<div className="col" style={{ paddingTop: "15px" }}>
											<label
												style={{
													height: "26px",
													width: "98px",
													backgroundColor: "#F4F4F4",
													borderRadius: "17px",
													textAlign: "center",
												}}
											>
												<label
													className="f-fm fm-w5-s12 color-AC"
													onClick={deletepop}
												>
													Delete&nbsp;
													<img
														loading="lazy"
														src="./images/deletecrop.png"
														alt="star"
													></img>
												</label>
											</label>
										</div>
									</div>
									<div
										className="col-8"
										style={{ paddingBottom: "20px", paddingLeft: "10px" }}
									>
										<label className="f-fm fm-w4-s16 color-7">
											Drag on the image to crop
										</label>
									</div>
									<div
										className="row"
										style={{ padding: " 0px 10px 0px 10px" }}
									>
										<div className="col">
											<div>
												{imageToCrop ? (
													<ImageCropper
														imageToCrop={imageToCrop}
														onImageCropped={(croppedImage) => {
															setCroppedImage(croppedImage);
															props.onImageChange(croppedImage);
														}}
													/>
												) : (
													<>{ConvertToImageFormat(getUpload, "")}</>
												)}
											</div>
										</div>
									</div>
									<div
										className="row"
										style={{ padding: "30px 10px 30px 10px" }}
									>
										<div>{size}</div>
										<div className="col-8" style={{ paddingTop: "20px" }}>
											<label className="f-fm fm-w4-s16 color-7">
												*Maximum image file size:10&nbsp;MB
											</label>
											{parseInt(size.replace(/\sMB/gi)) > 10 && (
												<>
													<label
														className="f-fm fm-w4-s16 "
														style={{ color: "red" }}
													>
														<img
															style={{ paddingLeft: "7px", marginTop: "-5px" }}
															src="./images/danger.png"
															alt="danger"
														></img>
														&nbsp; File size: {size}
													</label>
												</>
											)}
										</div>
										<div className="col-4" style={{ paddingLeft: "0px" }}>
											{parseInt(size.replace(/\sMB/gi)) > 10}
											<utils.aeButton
												classNames="aebutton aebuttonsmall fm-w6-s18"
												text="Crop & Add"
												enabled="false"
												disabledClass={
													parseInt(size.replace(/\sMB/gi)) > 10 || !croppedImage
														? "aebuttongrey"
														: "aebuttonblack"
												}
												onClick={temp}
											/>
										</div>
									</div>
								</div>
							</Modal.Body>
						</Modal>
					</div>
				</div>
			</div>
		</>
	);
};
export default Dragcropmodal;
