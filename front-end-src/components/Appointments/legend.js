import React from "react";

const Legend = (props) => {
	return (
		<>
			<div className="row pt-3">
				<div className="video" style={{ cursor: "auto" }}>
					Consultation Accepted
				</div>

				<div
					className="col-1"
					style={{
						width: "50px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<i class="fa fa-solid fa-arrow-right"></i>
				</div>
				<div className="videocompleted" style={{ cursor: "auto" }}>
					Consultation Completed
				</div>
				<div
					className="col-1"
					style={{
						width: "50px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<i class="fa fa-solid fa-arrow-right"></i>
				</div>
				<div className="treatmentparked" style={{ cursor: "auto" }}>
					Treatment Parked
				</div>
				<div
					className="col-1"
					style={{
						width: "50px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<i class="fa fa-solid fa-arrow-right"></i>
				</div>
				<div className="treatment" style={{ cursor: "auto" }}>
					Treatment Started
				</div>
				<div
					className="col-1"
					style={{
						width: "50px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<i class="fa fa-solid fa-arrow-right"></i>
				</div>
				<div className="treatmentcompleted" style={{ cursor: "auto" }}>
					Treatment Completed
				</div>
			</div>
		</>
	);
};

export default Legend;
