import React, { useState, useEffect, useRef } from "react";

const CalendarSetting = (props) => {
	return (
		<div>
			<div className="row">
				<div className="col-xl-2 col-l-5">
					<input
						type="date"
						defaultValue={props.tdate}
						onChange={(e) => {
							props.onChangeDate(e);
						}}
						className="form-select-lg mb-1 select-round-custom-dropdown f-fm fm-w5-s16"
						style={{ paddingTop: "10px" }}
					></input>
				</div>
				<div className="col-lg-4 col-md-auto col-sm-auto">
					<input
						type="text"
						className="search f-fm fm-w4-s16 input form-control form-control-lg"
						placeholder="Search"
						value={props.svalue}
						onChange={(event) => props.search(event.target.value)}
					></input>
					{props.fdata.length > 0 && props.onclicksvalue && (
						<div
							className="col-lg-2 col-md-auto col-sm-auto card"
							style={{
								position: "absolute",
								height: "120px",
								overflowY: "auto",
								width: "250px",
								borderRadius: "10px 10px",
								marginTop: "4px",
								marginLeft: "0px",
								padding: "5px 10px",
							}}
						>
							{props.fdata.map((e) => {
								return (
									<div
										onClick={() => props.searchFilter(e)}
										style={{ cursor: "pointer", fontFamily: "mulish" }}
									>
										{/* {e.patient_details[0].memberid} */}
										{e}
									</div>
								);
							})}
						</div>
					)}
				</div>
				<div className="col-xl-2 col-l-1" style={{ paddingBottom: "10px" }}>
					<div
						style={{
							display: "flex",
							height: "45px",
							width: "190px",
							background: "#fff",
							borderRadius: "22.5px",
							cursor: "pointer",
						}}
						onClick={() => props.requestApp(true)}
					>
						<p
							style={{
								fontFamily: "Mulish",
								margin: "auto",
								color: "#777777",
							}}
							className="fm-w6-s12"
						>
							Request Approval
						</p>
						{props.noti > 0 && (
							<span className="request" style={{ marginTop: "-10px" }}>
								{props.noti}
							</span>
						)}
					</div>
				</div>
				<div
					className="col-xl-1"
					// style={{ paddingBottom: "10px" }}
				>
					{/* <div
						style={{
							// display: "none",
							height: "45px",
							width: "95px",
							background: "#fff",
							borderRadius: "22.5px",
						}}
					>
						<p
							style={{
								fontFamily: "Mulish",
								margin: "auto",
								color: "#777777",
							}}
							className="fm-w6-s12"
						>
							Filter
						</p>
					</div> */}
				</div>
				<div
					className="col-xl-2"
					style={{ paddingBottom: "10px", paddingRight: "0px" }}
				>
					<div
						style={{
							display: "flex",
							height: "45px",
							width: "190px",
							cursor: "pointer",
							background: "#F4F4F4",
							borderRadius: "22.5px",
							border: "1px solid #ACACAC",
						}}
						onClick={() => props.handleClick("settings")}
					>
						<p
							style={{
								fontFamily: "Mulish",
								margin: "auto",
								color: "#777777",
							}}
							className="fm-w6-s12"
						>
							Calendar Setting
							<i
								className="fa fa-regular fa-gear"
								style={{ paddingLeft: "20px" }}
							></i>
						</p>
						{!props.calendarStatus && (
							<div className="divsys">
								<span className="requestcalendar"></span>
							</div>
						)}
					</div>
				</div>
			</div>
			{/* <div className="row" style={{ dispaly: "flex" }}>
				<div>1</div>
				<div>2</div>
				<div>3</div>
				<div>4</div>
			</div> */}
		</div>
	);
};
export default CalendarSetting;
