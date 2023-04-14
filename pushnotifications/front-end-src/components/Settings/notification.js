import React, { useState, useEffect } from "react";
import * as UserServices from "../../services/user";
import { ToastContainer, toast } from "react-toastify";

const Notification = (props) => {
	const [d_request, setD_request] = useState(false);
	const [d_appointment, setD_appointment] = useState(false);
	const [d_consultation, setD_consultation] = useState(false);
	const [d_newmsg, setD_newmsg] = useState(false);
	const [e_request, setE_request] = useState(false);
	const [e_appointment, setE_appointment] = useState(false);
	const [e_consultation, setE_consultation] = useState(false);
	const [e_newmsg, setE_newmsg] = useState(false);
	const [istoastn, setIstoastn] = useState(false);
	const [isDisabled, setDisabled] = useState(true);

	useEffect(() => {
		function getData() {
			(async function () {
				var c = await UserServices.GetUserSettingsById(props.params.id);
				var n = c.userSettingsByUserID.notification[0];
				setD_request(n.d_request_approval);
				setD_appointment(n.d_apt_activity);
				setD_consultation(n.d_conslt_request);
				setD_newmsg(n.d_new_message);
				setE_request(n.e_request_approval);
				setE_appointment(n.e_apt_activity);
				setE_consultation(n.e_conslt_request);
				setE_newmsg(n.e_new_message);
			})();
		}
		getData();
	}, []);

	useEffect(() => {
		if (
			(d_request === true ||
				d_appointment === true ||
				d_consultation === true ||
				d_newmsg === true) &&
			(e_request === true ||
				e_appointment === true ||
				e_consultation === true ||
				e_newmsg === true)
		) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [
		d_request,
		d_appointment,
		d_consultation,
		d_newmsg,
		e_appointment,
		e_consultation,
		e_request,
		e_newmsg,
	]);

	const updateSettings = () => {
		setIstoastn(true);
		console.log(d_request);
		console.log(d_appointment);
		console.log(d_consultation);
		console.log(d_newmsg);
		console.log(e_request);
		console.log(e_appointment);
		console.log(e_consultation);
		console.log(e_newmsg);

		(async function anyNameFunction() {
			var c = await UserServices.GetUserByEmail();
			console.log(c);
			const updateSettingsvariables = UserServices.returnUpdateSettings({
				id: props.params.id,
				notification: [
					{
						d_request_approval: d_request,
						d_apt_activity: d_appointment,
						d_conslt_request: d_consultation,
						d_new_message: d_newmsg,
						e_request_approval: e_request,
						e_apt_activity: e_appointment,
						e_conslt_request: e_consultation,
						e_new_message: e_newmsg,
						status: true,
					},
				],
			});
			console.log(updateSettingsvariables);
			UserServices.UpdateSettings(updateSettingsvariables).then((value) => {
				console.log(value);
				// window.location.reload();
				toast.success("Successfully record saved", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				window.scrollTo(0, 0);
				setTimeout(() => {
					setIstoastn(false);
					window.location.reload();
				}, 3000);
			});
		})();
	};
	return (
		<div className="container">
			{istoastn && (
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="colored"
				/>
			)}
			<div className="row">
				<div className="col-xl col-lg col-md col-xs col-sm">
					<label className="f-fm fm-w5-s20 color-7">
						Dashboard Notification
					</label>
				</div>
				<div className="row">
					<div className="col-xl col-lg col-md col-xs col-sm">
						<hr
							style={{
								color: "rgb(149 142 142)",
								backgroundColor: "#000000",
								height: 2,
							}}
						/>
					</div>
				</div>
				<div className="row">
					<div
						className="col-xl col-lg-5 col-md-4 col-xs col-sm-3"
						style={{ paddingBottom: "10px" }}
					>
						<label className="aecontainer">
							<span className="f-fm fm-w4-s16 color-00"> Request approval</span>
							<input
								type="checkbox"
								checked={d_request}
								value={d_request}
								onChange={() => setD_request(!d_request)}
							/>
							<span className="checkmark"></span>
						</label>
					</div>
				</div>
				<div className="row">
					<div
						className="col-xl col-lg col-md col-xs col-sm"
						style={{ paddingBottom: "10px" }}
					>
						<label className="aecontainer f-fm fm-w4-s16">
							<span className="f-fm fm-w4-s16 color-00">
								Appointment activity
							</span>
							<input
								type="checkbox"
								checked={d_appointment}
								value={d_appointment}
								onChange={() => setD_appointment(!d_appointment)}
							/>
							<span className="checkmark"></span>
						</label>
					</div>
				</div>
				<div className="row">
					<div
						className="col-xl col-lg col-md col-xs col-sm"
						style={{ paddingBottom: "10px" }}
					>
						<label className="aecontainer f-fm fm-w4-s16">
							<span className="f-fm fm-w4-s16 color-00">
								Consultation request
							</span>
							<input
								type="checkbox"
								checked={d_consultation}
								value={d_consultation}
								onChange={() => setD_consultation(!d_consultation)}
							/>
							<span className="checkmark"></span>
						</label>
					</div>
				</div>
				<div className="row" style={{ display: "none" }}>
					<div className="col-xl col-lg col-md col-xs col-sm">
						<label className="aecontainer f-fm fm-w4-s16">
							<span className="f-fm fm-w4-s16 color-00">New Messge</span>
							<input
								type="checkbox"
								checked={d_newmsg}
								value={d_newmsg}
								onChange={() => setD_newmsg(!d_newmsg)}
							/>
							<span className="checkmark"></span>
						</label>
					</div>
				</div>
			</div>
			<br />
			<br />
			<br />
			<div className="row pb-5">
				<div className="col-xl col-lg col-md col-xs col-sm">
					<label className="f-fm fm-w5-s20 color-7">Email Notification</label>
				</div>

				<div className="row">
					<div className="col-xl col-lg col-md col-xs col-sm">
						<hr
							style={{
								color: "rgb(149 142 142)",
								backgroundColor: "#000000",
								height: 2,
							}}
						/>
					</div>
				</div>

				<div className="row">
					<div
						className="col-xl col-lg col-md col-xs col-sm"
						style={{ paddingBottom: "10px" }}
					>
						<label className="aecontainer">
							<span className="f-fm fm-w4-s16 color-00"> Request approval</span>
							<input
								type="checkbox"
								checked={e_request}
								value={e_request}
								onChange={() => setE_request(!e_request)}
							/>
							<span className="checkmark"></span>
						</label>
					</div>
				</div>
				<div className="row">
					<div
						className="col-xl col-lg col-md col-xs col-sm"
						style={{ paddingBottom: "10px" }}
					>
						<label className="aecontainer f-fm fm-w4-s16">
							<span className="f-fm fm-w4-s16 color-00">
								Appointment activity
							</span>
							<input
								type="checkbox"
								checked={e_appointment}
								value={e_appointment}
								onChange={() => setE_appointment(!e_appointment)}
							/>
							<span className="checkmark"></span>
						</label>
					</div>
				</div>
				<div className="row">
					<div
						className="col-xl col-lg col-md col-xs col-sm"
						style={{ paddingBottom: "10px" }}
					>
						<label className="aecontainer f-fm fm-w4-s16">
							<span className="f-fm fm-w4-s16 color-00">
								Consultation request
							</span>
							<input
								type="checkbox"
								checked={e_consultation}
								value={e_consultation}
								onChange={() => setE_consultation(!e_consultation)}
							/>
							<span className="checkmark"></span>
						</label>
					</div>
				</div>
				<div className="row" style={{ display: "none" }}>
					<div className="col-xl col-lg col-md col-xs col-sm">
						<label className="aecontainer f-fm fm-w4-s16">
							<span className="f-fm fm-w4-s16 color-00">New Messge</span>
							<input
								type="checkbox"
								checked={e_newmsg}
								value={e_newmsg}
								onChange={() => setE_newmsg(!e_newmsg)}
							/>
							<span className="checkmark"></span>
						</label>
					</div>
				</div>
			</div>
			<div className=" mb-3">
				<button
					type="btn"
					style={{
						borderRadius: "40px",
						width: "201px",
						height: "60px",
						background: isDisabled ? "#777777" : "#000000",
					}}
					onClick={() => {
						updateSettings();
					}}
					disabled={isDisabled}
				>
					<label
						style={{ color: "white", cursor: "pointer" }}
						className=" f-fm fm-w6-s20"
					>
						Save
					</label>
				</button>
			</div>
		</div>
	);
};
export default Notification;
