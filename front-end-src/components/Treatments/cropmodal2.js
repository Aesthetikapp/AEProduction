import React, { useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import * as utils from "../../common/util";

export default function VideoInput(props) {
	const videoEl = useRef(null);
	const { width, height } = props;
	const [show, setShow] = useState(false);
	const handleClose = () => {
		setSource(false);
		setShow(false);
	};
	const Deletevideo = () => {
		setSource(false);
		setShow(false);
	};
	const temp = () => {
		setShow(false);
	};
	const [size, setSize] = useState("");

	// const inputRef = useRef();

	const [source, setSource] = useState();
	const [videofile, setVideofile] = useState();
	// const fileInput = React.createRef();

	const handleFileChange = (event) => {
		let sizeInBytes = event.target.files[0].size;
		var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
		setSize(sizeInMB + "MB");
		const file = event.target.files[0];
		console.log("video", file);
		setVideofile(file);
		// props.onVideoChange(file);
		const url = URL.createObjectURL(file);
		setSource(url);
		setShow(true);
	};
	const [duration, setDuration] = useState("");
	const handleLoadedMetadata = () => {
		const video = videoEl.current;
		if (!video) return;
		console.log(`The video is ${video.duration} seconds long.`);
		setDuration(video.duration);
		props.onVideoChange(videofile);
	};

	return (
		<div className="VideoInput">
			{!source && (
				<label
					style={{
						border: "1px solid #ACACAC",
						borderRadius: "10px",
						width: "100px",
						height: "100px",
						backgroundColor: "#ffffff",
						backgroundImage: "url(./images/plusone.png)",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
						cursor: "pointer",
					}}
				>
					<input
						name="file"
						type="file"
						onChange={handleFileChange}
						style={{ cursor: "pointer", display: "none" }}
					/>
				</label>
			)}
			{source && (
				<>
					<label>
						<video
							style={{
								border: "1px solid #ACACAC",
								borderRadius: "10px",
								width: "100px",
								height: "100px",
								backgroundColor: "#ffffff",
								backgroundRepeat: "no-repeat",
								backgroundPosition: "center",
								cursor: "pointer",
							}}
							poster={source}
							src={source}
							className="VideoInput_video"
							ref={videoEl}
							onLoadedMetadata={handleLoadedMetadata}
							autoPlay
						></video>
						<input
							name="file"
							type="file"
							onChange={handleFileChange}
							style={{ cursor: "pointer", display: "none" }}
						/>
					</label>
				</>
			)}
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
									alt="Close"
									onClick={handleClose}
									style={{ cursor: "pointer", float: "right" }}
									src="../images/closeone.png"
								></img>
							</div>
						</div>
						<div className="row" style={{ padding: " 30px 10px 50px 10px" }}>
							<div className="col">
								<label className="f-fm fm-w6-s36 color-00">
									Add&nbsp;Video
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
										<img src="./images/replace.png" alt="star"></img>
										<input
											name="file"
											type="file"
											onChange={handleFileChange}
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
										onClick={Deletevideo}
									>
										Delete&nbsp;
										<img
											style={{ marginTop: "-5px" }}
											src="./images/deletecrop.png"
											alt="star"
										></img>
									</label>
								</label>
							</div>
						</div>
						<div>
							<video
								className="VideoInput_video"
								width="100%"
								height={height}
								controls
								src={source}
							/>
						</div>
						<div className="row" style={{ padding: "30px 10px 30px 10px" }}>
							<div className="col-8">
								<label className="f-fm fm-w4-s16 color-7">
									*Maximum video file size:50&nbsp;MB
								</label>
								<label className="f-fm fm-w4-s16 color-7 pb-4">
									*Maximum video duration:1&nbsp;min
								</label>
								{parseInt(size.replace(/\sMB/gi)) > 50 && (
									<>
										<label className="f-fm fm-w4-s16 " style={{ color: "red" }}>
											<img
												style={{ paddingLeft: "7px", marginTop: "-5px" }}
												src="./images/danger.png"
												alt="danger"
											></img>
											&nbsp; File size: {size}
										</label>
									</>
								)}
								{duration > 60 && (
									<>
										<label className="f-fm fm-w4-s16 " style={{ color: "red" }}>
											<img
												style={{ paddingLeft: "7px", marginTop: "-5px" }}
												src="./images/danger.png"
												alt="danger"
											></img>
											&nbsp; video duration: {duration} sec
										</label>
									</>
								)}
							</div>
							<div className="col-4" style={{ paddingLeft: "0px" }}>
								{parseInt(size.replace(/\sMB/gi)) > 50}
								<utils.aeButton
									classNames="aebutton  fm-w6-s18"
									style={{ width: "50px" }}
									text="Add"
									enabled="false"
									disabledClass={
										parseInt(size.replace(/\sMB/gi)) > 50 || duration > 60
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
	);
}
