import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import * as utils from "../../common/util";
import { validEmailExp } from "../../common/validations";
import * as UserServices from "../../services/user";
import * as NotificationServices from "../../services/notifications";
import { sendInvitationEmailNotification } from "../../services/notificationservices";

const Addmumberpop = (props) => {
	// console.log("add meme props", props);
	// console.log("props", props.business.website);
	const [show, setShow] = useState(false);
	const [errMsg, setErrMsg] = useState("");
	const [allusers, setAllUsers] = useState([]);

	useEffect(() => {
		(async function anyNameFunction() {
			const existUser = await UserServices.GetUserEmail();
			if (allusers.length === 0) {
				allusers.push(existUser);
			}
		})();
	}, []);

	const handleClose = () => {
		setShow(false);
		SetTextlist([
			{ email: "", name: "" },
			{ email: "", name: "" },
		]);
		setErrMsg("");
	};
	const handleShow = () => setShow(true);
	const [textlist, SetTextlist] = useState([
		{ email: "", name: "" },
		{ email: "", name: "" },
	]);

	const handleTextadd = () => {
		SetTextlist([
			...textlist,
			{ email: "", name: "" },
			{ email: "", name: "" },
		]);
	};
	const handlertextremove = (index) => {
		const list = [...textlist];
		list.splice(index, 1);
		SetTextlist(list);
	};
	const handlertextrchange = (e, index) => {
		const { name, value } = e.target;
		const list = [...textlist];
		list[index][name] = value;
		SetTextlist(list);
	};
	const handlersend = () => {
		setErrMsg("");
		// console.log(textlist);
		let users = [];
		Object.values(textlist).forEach(function (val) {
			if (allusers[0].user.filter((e) => e.email === val.email).length > 0) {
				users.push(val.email);
			} else {
				(async function anyNameFunction() {
					const variables = UserServices.returnCreateVariables({
						firstname: val.name,
						email: val.email,
						clinicname: props.clinicname,
						isadmin: false,
						source: "web",
						step: "",
						prevstep: "",
					});

					setErrMsg("");

					const tmpUser = await UserServices.CreateUser(variables);
					if (tmpUser.user !== null) {
						const updateVariables = UserServices.returnUpdateVariables({
							id: tmpUser.user.id,
							business: [
								{
									btype: "doctor",
									website: props.business.website,
									bavatar: props.business.bavatar,
									name: props.business.name,
									bio: props.business.bio,
									noofemployees: props.business.noofemployees,
									location: [
										{
											line1: props.business.location[0].line1,
											line2: props.business.location[0].line2,
											country: props.business.location[0].country,
											state: props.business.location[0].state,
											towncity: props.business.location[0].towncity,
											postcode: props.business.location[0].postcode,
										},
									],
								},
							],
						});
						UserServices.UpdateUser(updateVariables).then((value) => {
							sendInvitationEmailNotification(
								tmpUser.user.id,
								props.name,
								val.email,
								window.location.origin + "/inviteaccept/",
								props.business.name,
								props.name,
								val.name
							);

							handleClose();
						});
					} else {
					}
				})();
			}
		});
		if (users.length === 0) {
			handleClose();
		} else {
			setErrMsg(
				"User with " + users + " already exists, please remove and try again"
			);
		}
	};
	const finalvalue = "Send Invitation(" + textlist.length + ")";
	const getButtonClass = () => {
		let str = [];
		let rvalue = "aebuttongrey";
		textlist.forEach((list) => {
			if (
				list.email !== "" &&
				list.name !== "" &&
				validEmailExp.test(list.email)
			) {
				str.push("full");
			} else {
				str.push("notfull");
			}
		});

		let mstr = "," + str.join() + ",";
		if (mstr.indexOf(",notfull,") >= 0) {
			rvalue = "aebuttongrey";
		} else {
			rvalue = "aebuttonblack";
		}
		return rvalue;
	};
	return (
		<>
			<div>
				<button
					style={{
						border: "1px solid #000000",
						borderRadius: "40px",
						width: "172px",
						height: "42px",
						backgroundColor: "#ffffff",
						cursor: "pointer",
					}}
					onClick={handleShow}
				>
					<label
						className="f-fm fm-w6-s18 color-00"
						style={{
							display: "flex",
							justifyContent: "center",
							cursor: "pointer",
						}}
					>
						Add Member
					</label>
				</button>
			</div>
			<Modal
				fullscreen="md-down"
				show={show}
				onHide={handleClose}
				size="lg"
				backdropClassName="childmodal"
				backdrop="static"
				centered
			>
				<Modal.Body>
					<div style={{ paddingLeft: "30px" }}>
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
						<div
							className="row"
							style={{ paddingBottom: "50px", paddingTop: "20px" }}
						>
							<div className="col">
								<label className="f-fm fm-w7-s40 color-00">
									Invite Members to<br></br> your business
								</label>
							</div>
						</div>
						{errMsg === "" ? (
							<label
								style={{
									marginLeft: "0px",
									marginTop: "-6px",
									fontStyle: "normal",
									fontWeight: "400",
									fontSize: "12px",
									color: "white",
								}}
							>
								Not valid email
							</label>
						) : (
							<label
								style={{
									marginLeft: "0px",
									marginTop: "-6px",
									marginBottom: "10px",
									fontStyle: "normal",
									fontWeight: "400",
									fontSize: "16px",
									color: "red",
								}}
							>
								{errMsg}
							</label>
						)}
						<div className="row">
							<div className="col-5" style={{ paddingBottom: "10px" }}>
								<label className="f-fm fm-w6-s14 color-AC">EMAIL ADDRESS</label>
							</div>
							<div className="col-5" style={{ paddingBottom: "10px" }}>
								<label className="f-fm fm-w6-s14 color-AC">NAME</label>
							</div>
						</div>
						<div
							style={{
								height: "200px",
								overflowY: "auto",
								overflowX: "hidden",
							}}
						>
							{textlist.map((singletext, index) => (
								<div key={index}>
									<div className="row">
										<div className="col-5" style={{ paddingBottom: "10px" }}>
											<input
												name="email"
												className="form-control form-control-lg"
												placeholder="Input email address here"
												style={{
													border: "1px solid #ACACAC",
													borderRadius: "10px",
												}}
												value={singletext.email}
												onChange={(e) => handlertextrchange(e, index)}
											></input>
										</div>
										<div className="col-5" style={{ paddingBottom: "10px" }}>
											<input
												name="name"
												className="form-control form-control-lg"
												placeholder="Input name here"
												style={{
													border: "1px solid #ACACAC",
													borderRadius: "10px",
												}}
												value={singletext.name}
												onChange={(e) => handlertextrchange(e, index)}
											></input>
										</div>
										<div className="col-2" style={{ paddingTop: "10px" }}>
											{textlist.length > 1 && (
												<img
													alt="icon"
													style={{ cursor: "pointer" }}
													onClick={() => handlertextremove(index)}
													src="./images/CloseOne.png"
												></img>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
						<div
							className="row"
							style={{ paddingTop: "20px", paddingBottom: "30px" }}
						>
							<div className="col">
								<div>
									<div>
										{textlist.length >= 1 && textlist.length < 10 && (
											<span
												onClick={handleTextadd}
												style={{ cursor: "pointer" }}
											>
												<img
													alt="icon"
													style={{
														width: "18px",
														height: "18px",
														background: "#AF805E",
														borderRadius: "20px",
													}}
													src="./images/Icon.png"
												></img>
												&nbsp;
												<span
													className="f-fm fm-w6-s16"
													style={{ color: "#AF805E", verticalAlign: "middle" }}
												>
													Add&nbsp;New
												</span>
											</span>
										)}
										<br />
										<span
											// onClick={handleTextadd}
											style={{
												display:
													getButtonClass() === "aebuttonblack"
														? "none"
														: "block",
											}}
											// disabledClass={getButtonClass()}
										>
											<span
												className="f-fm fm-w6-s16"
												style={{ color: "red", verticalAlign: "middle" }}
											>
												Note: Please enter valid email to enable button
											</span>
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-4"></div>
							<div className="col-3"></div>
							<div className="col">
								<utils.aeButton
									classNames="aebutton ae-w6-s18"
									text={finalvalue}
									enabled="false"
									disabledClass={getButtonClass()}
									onClick={handlersend}
								/>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};
export default Addmumberpop;
