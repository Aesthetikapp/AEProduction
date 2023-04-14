import React, { useState, useLayoutEffect, useRef } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tabs";
import MyModal from "../ModalComponent/mymodal";
import { useLocation, useNavigate } from "react-router-dom";
import * as TreatmentService from "../../services/treatments";
import styled from "styled-components";
import * as UserServices from "../../services/user";

const DropDownContainer = styled("div")``;
const DropDownHeader = styled("div")``;
const DropDownListContainer = styled("div")``;
const DropDownList = styled("ul")``;
const ListItem = styled("li")``;

const TreatmentList = (props) => {
	console.log("paarams ", props);
	const params = useLocation().state;

	const [isNewTreatment, setisNewTreatment] = useState(false);
	const [isEditTreatment, setisEditTreatment] = useState(false);
	const [editTreatmentId, setEditTreatmentId] = useState("");
	const [disableallChecked, setDisableAllChecked] = useState(false);
	const [enableallChecked, setEnableAllChecked] = useState(false);
	const [disablecheckeditems, setDisableCheckeditems] = useState([]);
	const [enablecheckeditems, setEnableCheckeditems] = useState([]);
	const [qtysold, setQtysold] = useState([]);
	const [search, setSearch] = useState("");

	const closeClick = () => {
		setisNewTreatment(false);
	};
	const handleNewClick = () => {
		setisNewTreatment(true);
	};

	const handleEditClick = (id) => {
		setisEditTreatment(true);
		setEditTreatmentId(id);
	};

	const handleEditCloseClick = () => {
		setisEditTreatment(false);
	};

	const catmenu = useRef(null);
	const handlemousedown = (e) => {
		if (catmenu.current && isOpen && !catmenu.current.contains(e.target)) {
			setIsOpen(false);
		}
	};
	document.addEventListener("mousedown", handlemousedown);

	const [enabled, setEnabled] = useState("Enabled");

	const options = {
		"Updated Time": ["Late updated", "First updated"],
		"Created Time": ["Late created", "First created"],
		"Treatment Name": ["A - Z", "Z - A"],
		Category:
			(enabled === "Enabled" && props.ealcategory) ||
			(enabled === "Disabled" && props.dalcategory),
		Qty: ["Top seller", "Least seller"],
		"Treatment duration":
			(enabled === "Enabled" && props.ealduration) ||
			(enabled === "Disabled" && props.dalduration),
		"Assigned doctor":
			(enabled === "Enabled" && props.ealdoctor) ||
			(enabled === "Disabled" && props.ealdoctor),
	};

	const [isOpen, setIsOpen] = useState(false);
	const [filterList, setFilterList] = useState([]);
	const [selectedOption, setSelectedOption] = useState(null);
	const toggling = () => {
		setIsOpen(!isOpen);
		setIsOpen2(false);
		setCategory(false);
	};

	const [category, setCategory] = useState(false);
	const [img, setImg] = useState(false);
	const [doctorFirstName, setDoctorFirstName] = useState("");

	const getUserName = (id) => {
		setImg(true);
		(async function anyNameFunction() {
			var c = await UserServices.GetUserById(id);
			console.log("name", c.userByID);
			if (c.userByID.lastName === "") {
				setDoctorFirstName(c.userByID.firstName.substring(0, 2).toUpperCase());
			} else {
				setDoctorFirstName(
					c.userByID.firstName.substring(0, 1).toUpperCase() +
						c.userByID.lastName.substring(0, 1).toUpperCase()
				);
			}
		})();
	};

	useLayoutEffect(() => {
		setQtysold(props.sold);
		console.log("options[value]", props.category);
		console.log("filterList[0]", filterList[0]);
		if (doc) {
			setSelectedOption2(filterList[0].firstName);
			props.sort(filterList[0].id);
		} else {
			setSelectedOption2(filterList[0]);
			props.sort(filterList[0]);
		}
	}, [filterList, props.sold]);

	const [appointmentStatus, setAppointmentStatus] = useState();
	const [generalStatus, setGeneralStatus] = useState();
	const [calendarStatus, setCalendarStatus] = useState();
	const [notificationStatus, setNotificationStatus] = useState();
	useLayoutEffect(() => {
		UserServices.GetUserSettingsById(params.id).then((existUser) => {
			console.log("tlist", existUser.userSettingsByUserID.appointment[0]);
			setAppointmentStatus(
				existUser.userSettingsByUserID.appointment[0].status
			);
			setGeneralStatus(existUser.userSettingsByUserID.general[0].status);
			setCalendarStatus(existUser.userSettingsByUserID.calendar[0].status);
			setNotificationStatus(
				existUser.userSettingsByUserID.notification[0].status
			);
		});
	}, []);

	const clearFilterTest = () => {
		setFilterList([]);
		setDoc(false);
	};

	const [doc, setDoc] = useState(false);
	const onOptionClicked = (value) => {
		setSelectedOption(value);
		setIsOpen(false);

		if (value === "Category") {
			setCategory(true);
		}

		if (value === "Assigned doctor") {
			setDoc(true);
		} else {
			setDoc(false);
		}

		setFilterList(options[value]);
	};

	const [isOpen2, setIsOpen2] = useState(false);
	const [selectedOption2, setSelectedOption2] = useState(null);
	const toggling2 = () => setIsOpen2(!isOpen2);
	const onOptionClicked2 = (value) => {
		setSelectedOption2(value);
		setIsOpen2(false);
	};

	const temp = () => {
		setEnabled("Enabled");
	};

	const temp2 = () => {
		setEnabled("Disabled");
	};
	const handleDisableCheckbox = (event) => {
		const { checked, value } = event.currentTarget;

		setDisableCheckeditems(
			(prev) =>
				checked ? [...prev, value] : prev.filter((val) => val !== value),
			setDisableAllChecked(false)
		);
	};

	const handleAllDisableCheckbox = (event) => {
		const { checked } = event.currentTarget;
		setDisableAllChecked(checked);
		if (checked) {
			props.treatments.forEach((item) => {
				if (
					!disablecheckeditems.includes(item.id) &&
					item.active === "Enabled"
				) {
					setDisableCheckeditems((prev) => [...prev, item.id]);
				}
			});
		} else {
			disablecheckeditems.length = 0;
		}
	};

	const TreatmentHandler = (active) => {
		var checkeditems =
			active === "Disabled" ? disablecheckeditems : enablecheckeditems;

		var Ids;
		var x = "";
		TreatmentService.GetAllTreatmentIds().then((data) => {
			console.log("data", data);
			Ids = data;

			checkeditems.forEach((item) => {
				if (Ids.includes(item)) {
					x =
						"You cannot disable treatment(s) that are booked for appointment/consultation !";
				}
				// else {
				// 	const data = new FormData();
				// 	data.append("id", item);
				// 	data.append("active", active);
				// 	var object = {};
				// 	data.forEach((value, key) => (object[key] = value));

				// 	const updatestr = TreatmentService.returnUpdateVariables(object);
				// 	console.log(updatestr);
				// 	TreatmentService.DisableTreatment(updatestr);
				// }
			});
			if (x !== "") {
				alert(x);
			}
			window.location.reload();
		});
	};

	const handleEnableCheckbox = (event) => {
		const { checked, value } = event.currentTarget;

		setEnableCheckeditems(
			(prev) =>
				checked ? [...prev, value] : prev.filter((val) => val !== value),
			setEnableAllChecked(false)
		);
	};
	const handleAllEnableCheckbox = (event) => {
		const { checked } = event.currentTarget;
		setEnableAllChecked(checked);
		if (checked) {
			props.treatments.forEach((item) => {
				if (
					!enablecheckeditems.includes(item.id) &&
					item.active === "Disabled"
				) {
					setEnableCheckeditems((prev) => [...prev, item.id]);
				}
			});
		} else {
			enablecheckeditems.length = 0;
		}
	};

	const getqtysold = (id) => {
		var v = "";
		props.sold.forEach((value, key) => {
			if (key === id) {
				v = value;
			}
		});
		return v;
	};

	return (
		<>
			{isEditTreatment ? (
				<MyModal
					show={isEditTreatment}
					type="edit"
					save={(x) => {
						setisNewTreatment(x);
					}}
					cancel={handleEditCloseClick}
					useremail={props.useremail}
					userid={props.userid}
					clinicname={props.clinicname}
					change={props.change}
					id={editTreatmentId}
					dialogClassName="modal-square"
					size="lg"
				/>
			) : (
				<MyModal
					show={isNewTreatment}
					type="treatment"
					save={(x) => {
						setisNewTreatment(x);
					}}
					cancel={closeClick}
					useremail={props.useremail}
					userid={props.userid}
					clinicname={props.clinicname}
					change={props.change}
					dialogClassName="modal-square"
					size="lg"
				/>
			)}

			<div className="row">
				<br></br>
				<br></br>
				<br></br>
			</div>
			<div className="row">
				<div className="aecol6p1">&nbsp;</div>
				<div className="col-xl-10 col-lg-10 col-md-10 col-xs-10 col-sm-10">
					<Tabs
						defaultActiveKey="activetreatment"
						id="profiletab"
						className="list-tab"
					>
						<Tab
							eventKey="profile"
							title={"Treatment List (" + props.initial.length + ")"}
							disabled
						></Tab>
						<Tab
							eventKey="activetreatment"
							title={"Active Treatment (" + props.eal.count + ")"}
							onClick={temp}
						>
							<>
								<div className="row">
									<div className="col-xl-8 col-lg-8 col-md-8 col-xs-8 col-sm-8">
										<div className="row">
											<div className="col-lg-auto col-md-auto col-sm-auto">
												<input
													type="text"
													value={search}
													className="search f-fm fm-w4-s16 input form-control form-control-lg"
													placeholder="Search"
													onChange={(event) => {
														props.search(event.target.value);
														setSearch(event.target.value);
													}}
												></input>
											</div>
											<div
												className="col-lg-2 col-md-3 col-sm-4"
												style={{ width: "190px" }}
											>
												<DropDownContainer className="customdropmain">
													<DropDownHeader
														onClick={toggling}
														className="form-select form-select-lg mb-1 select-round-custom-dropdown"
														style={{ paddingTop: "10px" }}
													>
														{selectedOption && (
															<p className="f-fm fm-w4-s14 color-7">
																{selectedOption}
															</p>
														)}
														{!selectedOption && (
															<p className="f-fm fm-w4-s16 color-7">Sort By</p>
														)}
													</DropDownHeader>
													{isOpen && (
														<div
															style={{
																width: "223px",
																height: "283px",
																position: "absolute",
															}}
														>
															<DropDownListContainer className="customdropcontainer">
																<DropDownList className="customdroptwo">
																	{Object.keys(options).map((k) => (
																		<ListItem
																			key={k}
																			className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
																			onClick={() => {
																				onOptionClicked(k);
																			}}
																			value={k}
																		>
																			{k}
																		</ListItem>
																	))}
																</DropDownList>
															</DropDownListContainer>
														</div>
													)}
												</DropDownContainer>
											</div>
											<div className="col-2" style={{ width: "160px" }}>
												<>
													<DropDownContainer
														className="customdropmain"
														style={{
															display:
																filterList.length === 0 ? "none" : "block",
														}}
													>
														<DropDownHeader
															onClick={toggling2}
															className="form-select form-select-lg mb-1 select-round-custom-dropdown-small"
															style={{ paddingTop: "10px" }}
														>
															{selectedOption2 && (
																<p className="f-fm fm-w4-s14 color-7">
																	{selectedOption2}
																</p>
															)}
															{!selectedOption2 && (
																<p className="f-fm fm-w4-s16 color-7">
																	Sort By
																</p>
															)}
														</DropDownHeader>

														{filterList.map((k) =>
															doc
																? isOpen2 && (
																		<div
																			style={{
																				width: "223px",
																				height: "103px",
																				position: "absolute",
																			}}
																		>
																			<DropDownListContainer className="customdropcontainer">
																				<DropDownList className="customdroptwo-new">
																					{filterList.map((k) => (
																						<ListItem
																							key={k.id}
																							className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
																							onClick={() => {
																								onOptionClicked2(k.firstName);
																								props.sort(k.id);
																							}}
																							value={k.id}
																						>
																							<span
																								style={{
																									backgroundColor: category
																										? "#EDE3DC"
																										: "#fff",

																									textAlign: category
																										? "left"
																										: "",
																									borderRadius: category
																										? "10px"
																										: "",
																									paddingLeft: "10px",
																									paddingRight: "10px",
																									paddingTop: "1px",
																									paddingBottom: "4px",
																								}}
																							>
																								{k.firstName}
																							</span>
																						</ListItem>
																					))}
																				</DropDownList>
																			</DropDownListContainer>
																		</div>
																  )
																: isOpen2 && (
																		<div
																			style={{
																				width: "223px",
																				height: "103px",
																				position: "absolute",
																			}}
																		>
																			<DropDownListContainer className="customdropcontainer">
																				<DropDownList className="customdroptwo-new">
																					{Object.values(filterList).map(
																						(k) => (
																							<ListItem
																								className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
																								onClick={() => {
																									onOptionClicked2(k);
																									props.sort(k);
																								}}
																								value={k}
																							>
																								<span
																									style={{
																										backgroundColor: category
																											? "#EDE3DC"
																											: "#fff",

																										textAlign: category
																											? "left"
																											: "",
																										borderRadius: category
																											? "10px"
																											: "",
																										paddingLeft: "10px",
																										paddingRight: "10px",
																										paddingTop: "1px",
																										paddingBottom: "4px",
																									}}
																								>
																									{k}
																								</span>
																							</ListItem>
																						)
																					)}
																				</DropDownList>
																			</DropDownListContainer>
																		</div>
																  )
														)}
													</DropDownContainer>
												</>
											</div>
											<div className="col-1" style={{ paddingTop: "10px" }}>
												{filterList.length >= 1 && (
													<label
														style={{
															background: "#D6D6D6",
															borderRadius: "11px",
															color: "white",
															width: "23px",
															height: "23px",
															textAlign: "center",
															marginLeft: "15px",
															cursor: "pointer",
														}}
														onClick={() => {
															clearFilterTest();
															props.clearFilter();
														}}
													>
														X
													</label>
												)}
											</div>
										</div>
									</div>
									{props.admin &&
										appointmentStatus &&
										calendarStatus &&
										generalStatus &&
										notificationStatus && (
											<div className="col-xl-4 col-lg-4 col-md-4 col-xs-4 col-sm-4">
												<div className="rightremove">
													<button
														className="btn-round btn-small"
														onClick={() => handleNewClick()}
													>
														<img
															loading="lazy"
															className="img-wbplus"
															style={{ marginLeft: "-6px" }}
															alt="plus"
														></img>
														&nbsp;&nbsp;
														<span style={{ color: "#fff" }}>New Treatment</span>
													</button>
												</div>
											</div>
										)}
								</div>
								<div className="row pt-4 table-responsive">
									<table className="col-xl-10 col-lg-10 col-md-10 col-xs-10 col-sm-10 table table-borderless aetable">
										<thead className="f-rl fm-w6-s14 color-AC">
											<tr>
												<th scope="col">
													<div
														style={{
															display: "flex",
															flexDirection: "row",
															alignContent: "center",
															// justifyContent: "space-evenly",
															alignItems: "center",
															paddingLeft: "25px",
														}}
													>
														{props.admin ? (
															<label
																className="aecontainer"
																style={{ color: "#ACACAC" }}
															>
																Treatment Details
																<input
																	type="checkbox"
																	checked={disableallChecked}
																	onChange={handleAllDisableCheckbox}
																/>
																<span className="checkmark"></span>
															</label>
														) : (
															<label
																className="aecontainer"
																style={{ color: "#ACACAC" }}
															>
																Treatment Details
															</label>
														)}
														&nbsp;
														{disablecheckeditems.length > 0 && (
															<label style={{ paddingLeft: "20px" }}>
																<button
																	style={{ width: "210px", height: "45px" }}
																	className="btn-round"
																	onClick={() => TreatmentHandler("Disabled")}
																>
																	<span style={{ color: "#fff" }}>
																		Disable Treatment
																	</span>
																	&nbsp;
																	<label style={{ color: "#fff" }}>
																		({disablecheckeditems.length})
																	</label>
																</button>
															</label>
														)}
													</div>
												</th>

												<th scope="col" style={{ color: "#ACACAC" }}>
													Category
												</th>
												<th scope="col" style={{ color: "#ACACAC" }}>
													Qty (Sold{props.admin && "/ Available"})
												</th>
												<th scope="col" style={{ color: "#ACACAC" }}>
													price (Unit / Selling)
												</th>
												<th scope="col" style={{ color: "#ACACAC" }}>
													Treatment Duration
												</th>
												<th scope="col" style={{ color: "#ACACAC" }}>
													Syringes Setting
												</th>
												<th scope="col" style={{ color: "#ACACAC" }}>
													Assigned Doctor
												</th>
											</tr>
										</thead>
										<tbody>
											{props.treatments.length <= 0 && (
												<tr
													style={{
														textAlign: "center",
														color: "#000000",
														backgroundColor: "#fff",
														fontSize: "25px",
													}}
												>
													<td></td>
													<td></td>
													<td></td>
													<td> No Treatments</td>
													<td></td>
													<td></td>
													<td></td>
												</tr>
											)}
											{props.treatments.length > 0 &&
												props.treatments.map(function (i, id) {
													return (
														<>
															{i.active === "Enabled" && (
																<tr
																	key={i}
																	id={"tr" + i}
																	style={{ backgroundColor: "#FFFFFF" }}
																>
																	<td colSpan="1">
																		<div
																			style={{
																				display: "flex",
																				flexDirection: "row",
																				alignContent: "center",
																				//   justifyContent: "space-evenly",
																				alignItems: "center",
																				paddingLeft: "30px",
																			}}
																		>
																			{props.admin && (
																				<label
																					className="aecontainer"
																					style={{ width: "10px" }}
																				>
																					<input
																						type="checkbox"
																						value={i.id}
																						checked={disablecheckeditems.some(
																							(val) => val === i.id
																						)}
																						onChange={handleDisableCheckbox}
																					/>
																					<span className="checkmark"></span>
																				</label>
																			)}

																			<img
																				onError={(e) => {
																					e.target.src =
																						"../images/tdetails.png";
																				}}
																				loading="lazy"
																				alt="Treatment logo"
																				src={
																					i.photo1 === ""
																						? "./images/tdetails.png"
																						: i.photo1
																				}
																				style={{
																					width: "76px",
																					height: "76px",
																					borderRadius: "7px",
																				}}
																			></img>

																			<div
																				style={{
																					display: "flex",
																					flexDirection: "column",
																					alignContent: "center",
																					justifyContent: "space-evenly",
																					alignItems: "flex-start",
																					paddingLeft: "20px",
																				}}
																			>
																				<label
																					className="f-fm fm-w6-s18"
																					style={{
																						textTransform: "uppercase",
																					}}
																				>
																					{i.treatmentname}
																				</label>
																				<label className="f-fm fm-w4-s14">
																					{i.description.length > 130
																						? i.description.substring(0, 130) +
																						  "..."
																						: i.description}
																				</label>
																			</div>
																		</div>
																	</td>
																	<td style={{ verticalAlign: "middle" }}>
																		<label
																			className="f-fm fm-w6-s14"
																			style={{
																				background: "#EDE3DC",
																				borderRadius: "10px",
																				paddingLeft: "10px",
																				paddingRight: "10px",
																				verticalAlign: "middle",
																				textAlign: "center",
																				color: "#777777",
																				paddingTop: "1px",
																				paddingBottom: "1px",
																			}}
																		>
																			{i.bodyarea}
																		</label>
																	</td>
																	<td style={{ verticalAlign: "middle" }}>
																		<label
																			style={{ color: "#00C4A0" }}
																			className="f-fm fm-w6-s24p02"
																		>
																			{getqtysold(i.id) === ""
																				? "00"
																				: getqtysold(i.id)}
																		</label>
																		{props.admin && (
																			<>
																				&nbsp;
																				<label style={{ color: "#000000" }}>
																					/
																				</label>
																				<label
																					className="f-fm fm-w4-s14"
																					style={{ color: "#000000" }}
																				>
																					{i.quantityavailable}
																				</label>
																			</>
																		)}
																	</td>
																	<td style={{ verticalAlign: "middle" }}>
																		<label style={{ color: "#777777" }}>
																			$
																		</label>
																		<label
																			style={{ color: "#777777" }}
																			className="f-fm fm-w4-s16"
																		>
																			{i.pricepersyring}
																		</label>
																		&nbsp;
																		<label style={{ color: "#777777" }}>
																			/
																		</label>
																		&nbsp;
																		<label style={{ color: "#000000" }}>
																			$
																		</label>
																		<label
																			className="f-fm fm-w4-s16"
																			style={{ color: "#000000" }}
																		>
																			{i.sellingprice}
																		</label>
																	</td>
																	<td
																		className="f-fm"
																		style={{ verticalAlign: "middle" }}
																	>
																		{i.duration}&nbsp;
																		<label style={{ color: "#000000" }}>
																			mins
																		</label>
																	</td>
																	<td
																		className="f-fm fm-w4-s14"
																		style={{ verticalAlign: "middle" }}
																	>
																		<span>
																			<img
																				loading="lazy"
																				alt=""
																				src="./images/injection.png"
																			></img>
																		</span>
																		&nbsp;&nbsp;&nbsp;&nbsp;&gt;&nbsp;&nbsp;
																		{i.advancedsetting}
																		<br />
																		<label
																			style={{
																				width: "86px",
																				color: "#777777",
																				paddingTop: "5px",
																			}}
																		>
																			Consultation Required
																		</label>
																	</td>

																	<td style={{ verticalAlign: "middle" }}>
																		<div
																			style={{
																				display: "flex",
																				alignItems: "center",
																				// paddingTop: "25px",
																				justifyContent: "right",
																			}}
																		>
																			<div style={{ display: "flex" }}>
																				<>
																					{img ? (
																						<div
																							style={{
																								display: "flex",
																								height: "40px",
																								width: "40px",

																								borderRadius: "50%",
																								background: "#446BF6",
																							}}
																						>
																							<p
																								style={{
																									fontFamily: "Mulish",
																									margin: "auto",
																									color: "#fff",
																								}}
																								className="fm-w6-s12"
																							>
																								{doctorFirstName}
																							</p>
																						</div>
																					) : (
																						<img
																							onError={(e) => {
																								// setImg(true);
																								getUserName(
																									i.assigneddoctors[0].split(
																										","
																									)[0]
																								);
																							}}
																							loading="lazy"
																							src={
																								i.assigneddoctors[0].split(
																									","
																								)[1]
																							}
																							// src="ghy"
																							alt="avatar"
																							style={{
																								width: "40px",
																								height: "40px",
																								borderRadius: "50%",
																							}}
																						></img>
																					)}
																					{i.assigneddoctors[0].split(",")
																						.length /
																						2 -
																						1 >
																						1 && (
																						<div
																							style={{
																								display: "flex",
																								height: "40px",
																								width: "40px",

																								borderRadius: "50%",
																								background: "#446BF6",
																							}}
																						>
																							<p
																								style={{
																									fontFamily: "Mulish",
																									margin: "auto",
																									color: "#fff",
																								}}
																								className="fm-w6-s12"
																							>
																								+{" "}
																								{i.assigneddoctors[0].split(",")
																									.length /
																									2 -
																									1}
																							</p>
																						</div>
																					)}
																				</>
																			</div>
																			&nbsp;&nbsp;&nbsp;&nbsp;
																			{props.admin && (
																				<OverlayTrigger
																					trigger="click"
																					rootClose
																					placement="left-start"
																					overlay={
																						<Popover
																							id="popover-basic"
																							style={{
																								height: "97px",
																								width: "200px",
																								backgroundColor:
																									"rgba(0, 0, 0, 0.8)",
																								borderRadius: "10px",
																								zIndex: "auto",
																							}}
																						>
																							<Popover.Body
																								style={{ padding: "0px 0px" }}
																							>
																								<div
																									style={{
																										color:
																											"rgba(255, 255, 255, 0.8)",
																										paddingTop: "20px",
																										paddingLeft: "20px",
																										cursor: "pointer",
																									}}
																									onClick={() => {
																										props.disableTreatmentHandler(
																											i.id,
																											"Disabled"
																										);
																									}}
																									className="f-fm fm-w4-s14"
																								>
																									Disable treatment
																								</div>
																								<div
																									style={{
																										color:
																											"rgba(255, 255, 255, 0.8)",
																										paddingTop: "20px",
																										paddingLeft: "20px",
																										cursor: "pointer",
																									}}
																									onClick={() => {
																										// props.disableTreatmentHandler(
																										//   i.id,
																										//   "Disabled"
																										// );
																										handleEditClick(i.id);
																									}}
																									// onClick={() => handleEditClick(i.id)}
																									className="f-fm fm-w4-s14"
																								>
																									Edit
																								</div>
																							</Popover.Body>
																						</Popover>
																					}
																					style={{ alignItems: "end" }}
																				>
																					<img
																						loading="lazy"
																						src="./images/Group210.png"
																						alt="avatar"
																						style={{ cursor: "pointer" }}
																					></img>
																				</OverlayTrigger>
																			)}
																		</div>
																	</td>
																</tr>
															)}
														</>
													);
												})}
										</tbody>
									</table>
								</div>
							</>
						</Tab>
						<Tab
							eventKey="Disabledtreatment"
							title={"Disabled Treatment (" + props.dal.count + ")"}
							onClick={temp2}
						>
							<>
								<div className="row">
									<div className="col-xl-8 col-lg-8 col-md-8 col-xs-8 col-sm-8">
										<div className="row">
											<div className="col-lg-auto col-md-auto col-sm-auto">
												<input
													type="text"
													value={search}
													className="search f-fm fm-w4-s16 input form-control form-control-lg"
													placeholder="Search"
													onChange={(event) => {
														props.search(event.target.value);
														setSearch(event.target.value);
													}}
												></input>
											</div>
											<div
												className="col-lg-2 col-md-3 col-sm-4"
												style={{ width: "190px" }}
											>
												<DropDownContainer className="customdropmain">
													<DropDownHeader
														onClick={toggling}
														className="form-select form-select-lg mb-1 select-round-custom-dropdown"
													>
														{selectedOption && (
															<p className="f-fm fm-w4-s14 color-7">
																{selectedOption}
															</p>
														)}
														{!selectedOption && (
															<p className="f-fm fm-w4-s16 color-7">Sort By</p>
														)}
													</DropDownHeader>
													{isOpen && (
														<div
															style={{
																width: "223px",
																height: "283px",
																position: "absolute",
															}}
														>
															<DropDownListContainer className="customdropcontainer">
																<DropDownList className="customdroptwo">
																	{Object.keys(options).map((k) => (
																		<ListItem
																			key={k}
																			className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
																			onClick={() => {
																				onOptionClicked(k);
																			}}
																			value={k}
																		>
																			{k}
																		</ListItem>
																	))}
																</DropDownList>
															</DropDownListContainer>
														</div>
													)}
												</DropDownContainer>
											</div>
											<div className="col-2" style={{ width: "160px" }}>
												<>
													<DropDownContainer
														className="customdropmain"
														style={{
															display:
																filterList.length === 0 ? "none" : "block",
														}}
													>
														<DropDownHeader
															onClick={toggling2}
															className="form-select form-select-lg mb-1 select-round-custom-dropdown-small"
														>
															{selectedOption2 && (
																<p className="f-fm fm-w4-s14 color-7">
																	{selectedOption2}
																</p>
															)}
															{!selectedOption2 && (
																<p className="f-fm fm-w4-s16 color-7">
																	Sort By
																</p>
															)}
														</DropDownHeader>
														{filterList.map((k) =>
															doc
																? isOpen2 && (
																		<div
																			style={{
																				width: "223px",
																				height: "103px",
																				position: "absolute",
																			}}
																		>
																			<DropDownListContainer className="customdropcontainer">
																				<DropDownList className="customdroptwo-new">
																					{filterList.map((k) => (
																						<ListItem
																							key={k.id}
																							className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
																							onClick={() => {
																								onOptionClicked2(k.firstName);
																								props.sort(k.id);
																							}}
																							value={k.id}
																						>
																							<span
																								style={{
																									backgroundColor: category
																										? "#EDE3DC"
																										: "#fff",

																									textAlign: category
																										? "left"
																										: "",
																									borderRadius: category
																										? "10px"
																										: "",
																									paddingLeft: "10px",
																									paddingRight: "10px",
																									paddingTop: "1px",
																									paddingBottom: "4px",
																								}}
																							>
																								{k.firstName}
																							</span>
																						</ListItem>
																					))}
																				</DropDownList>
																			</DropDownListContainer>
																		</div>
																  )
																: isOpen2 && (
																		<div
																			style={{
																				width: "223px",
																				height: "103px",
																				position: "absolute",
																			}}
																		>
																			<DropDownListContainer className="customdropcontainer">
																				<DropDownList className="customdroptwo-new">
																					{Object.values(filterList).map(
																						(k) => (
																							<ListItem
																								className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
																								onClick={() => {
																									onOptionClicked2(k);
																									props.sort(k);
																								}}
																								value={k}
																							>
																								<span
																									style={{
																										backgroundColor: category
																											? "#EDE3DC"
																											: "#fff",

																										textAlign: category
																											? "left"
																											: "",
																										borderRadius: category
																											? "10px"
																											: "",
																										paddingLeft: "10px",
																										paddingRight: "10px",
																										paddingTop: "1px",
																										paddingBottom: "4px",
																									}}
																								>
																									{k}
																								</span>
																							</ListItem>
																						)
																					)}
																				</DropDownList>
																			</DropDownListContainer>
																		</div>
																  )
														)}
													</DropDownContainer>
												</>
											</div>
											<div className="col-1" style={{ paddingTop: "10px" }}>
												{filterList.length > 1 && (
													<label
														style={{
															background: "#D6D6D6",
															borderRadius: "11px",
															color: "white",
															width: "23px",
															height: "23px",
															textAlign: "center",
															marginLeft: "15px",
															cursor: "pointer",
														}}
														onClick={() => {
															clearFilterTest();
															props.clearFilter();
														}}
													>
														X
													</label>
												)}
											</div>
										</div>
									</div>
								</div>
								<div className="row pt-4 table-responsive">
									<table className="col-auto table table-borderless aetable">
										<thead className="f-rl fm-w6-s14 color-AC">
											<tr>
												<th scope="col">
													<div
														style={{
															display: "flex",
															flexDirection: "row",
															alignContent: "center",
															alignItems: "center",
															paddingLeft: "30px",
														}}
													>
														<label
															className="aecontainer"
															style={{ color: "#ACACAC" }}
														>
															Treatment Details
															<input
																type="checkbox"
																checked={enableallChecked}
																onChange={handleAllEnableCheckbox}
															/>
															<span className="checkmark"></span>
														</label>
														&nbsp;
														{enablecheckeditems.length > 0 && (
															<label style={{ paddingLeft: "20px" }}>
																<button
																	style={{
																		width: "210px",
																		height: "45px",
																	}}
																	className="btn-round"
																	onClick={() => TreatmentHandler("Enabled")}
																>
																	<span style={{ color: "#fff" }}>
																		Enable Treatment
																	</span>
																	&nbsp;
																	<label style={{ color: "#fff" }}>
																		({enablecheckeditems.length})
																	</label>
																</button>
															</label>
														)}
													</div>
												</th>

												<th scope="col" style={{ color: "#ACACAC" }}>
													Category
												</th>
												<th scope="col" style={{ color: "#ACACAC" }}>
													Qty (Sold{props.admin && "/ Available"})
												</th>
												<th scope="col" style={{ color: "#ACACAC" }}>
													price (Unit / Selling)
												</th>
												<th scope="col" style={{ color: "#ACACAC" }}>
													Treatment Duration
												</th>
												<th scope="col" style={{ color: "#ACACAC" }}>
													Syringes Setting
												</th>
												<th scope="col" style={{ color: "#ACACAC" }}>
													Assigned Doctor
												</th>
											</tr>
										</thead>
										<tbody>
											{props.treatments.length <= 0 && (
												<tr
													style={{
														textAlign: "center",
														color: "#000000",
														backgroundColor: "#fff",
														fontSize: "25px",
													}}
												>
													<td></td>
													<td></td>
													<td></td>
													<td> No Treatments</td>
													<td></td>
													<td></td>
													<td></td>
												</tr>
											)}
											{props.treatments.length > 0 &&
												props.treatments.map(function (i, id) {
													return (
														<>
															{i.active === "Disabled" && (
																<tr
																	key={i}
																	id={"tr" + i}
																	style={{ backgroundColor: "#F4F4F4" }}
																>
																	<td colSpan="1">
																		<div
																			style={{
																				display: "flex",
																				flexDirection: "row",
																				alignContent: "center",
																				alignItems: "center",
																				paddingLeft: "30px",
																			}}
																		>
																			<label
																				className="aecontainer"
																				style={{ width: "10px" }}
																			>
																				<input
																					type="checkbox"
																					value={i.id}
																					checked={enablecheckeditems.some(
																						(val) => val === i.id
																					)}
																					onChange={handleEnableCheckbox}
																				/>
																				<span className="checkmark"></span>
																			</label>

																			<img
																				onError={(e) => {
																					e.target.src =
																						"../images/tdetails.png";
																				}}
																				loading="lazy"
																				alt="Treatment logo"
																				src={
																					i.photo1 === ""
																						? "./images/tdetails.png"
																						: i.photo1
																				}
																				style={{
																					width: "75.64px",
																					height: "76px",
																					borderRadius: "7px",
																				}}
																			></img>
																			<div
																				style={{
																					display: "flex",
																					flexDirection: "column",
																					alignContent: "center",
																					justifyContent: "space-evenly",
																					alignItems: "flex-start",
																					paddingLeft: "20px",
																				}}
																			>
																				<label className="f-fm fm-w6-s18">
																					{i.treatmentname}
																				</label>
																				<label className="f-fm fm-w4-s14">
																					{i.description.length > 130
																						? i.description.substring(0, 130) +
																						  "..."
																						: i.description}
																				</label>
																			</div>
																		</div>
																	</td>
																	<td style={{ verticalAlign: "middle" }}>
																		<label
																			className="f-fm fm-w6-s14"
																			style={{
																				background: "#EDE3DC",
																				borderRadius: "10px",
																				paddingLeft: "10px",
																				paddingRight: "10px",
																				verticalAlign: "middle",
																				textAlign: "center",
																				color: "#777777",
																				paddingTop: "1px",
																				paddingBottom: "1px",
																			}}
																		>
																			{i.bodyarea}
																		</label>
																	</td>
																	<td style={{ verticalAlign: "middle" }}>
																		<label
																			style={{ color: "#00C4A0" }}
																			className="f-fm fm-w6-s24p02"
																		>
																			<span style={{ color: "#00C4A0" }}>
																				{getqtysold(i.id) === ""
																					? "00"
																					: getqtysold(i.id)}
																			</span>
																		</label>
																		{props.admin && (
																			<>
																				&nbsp;
																				<label style={{ color: "#000000" }}>
																					/
																				</label>
																				<label
																					className="f-fm fm-w4-s14"
																					style={{ color: "#000000" }}
																				>
																					{i.quantityavailable}
																				</label>
																			</>
																		)}
																	</td>
																	<td style={{ verticalAlign: "middle" }}>
																		<label style={{ color: "#777777" }}>
																			$
																		</label>
																		<label
																			style={{ color: "#777777" }}
																			className="f-fm fm-w4-s16"
																		>
																			{i.pricepersyring}
																		</label>
																		&nbsp;
																		<label style={{ color: "#777777" }}>
																			/
																		</label>
																		&nbsp;
																		<label style={{ color: "#000000" }}>
																			$
																		</label>
																		<label
																			className="f-fm fm-w4-s16"
																			style={{ color: "#000000" }}
																		>
																			{i.sellingprice}
																		</label>
																	</td>
																	<td
																		className="f-fm"
																		style={{ verticalAlign: "middle" }}
																	>
																		{i.duration}&nbsp;
																		<label style={{ color: "#000000" }}>
																			mins
																		</label>
																	</td>
																	<td
																		className="f-fm fm-w4-s14"
																		style={{ verticalAlign: "middle" }}
																	>
																		<span>
																			<img
																				loading="lazy"
																				alt=""
																				src="./images/injection.png"
																			></img>
																		</span>
																		&nbsp;&nbsp;&nbsp;&nbsp;&gt;&nbsp;&nbsp;
																		{i.advancedsetting}
																		<br />
																		<label
																			style={{
																				width: "86px",
																				color: "#777777",
																				paddingTop: "5px",
																			}}
																		>
																			Consultation Required
																		</label>
																	</td>

																	<td style={{ verticalAlign: "middle" }}>
																		<div
																			style={{
																				display: "flex",
																				alignItems: "center",
																				// paddingTop: "25px",
																				justifyContent: "right",
																			}}
																		>
																			{" "}
																			<div style={{ display: "flex" }}>
																				<>
																					{img ? (
																						<div
																							style={{
																								display: "flex",
																								height: "40px",
																								width: "40px",

																								borderRadius: "50%",
																								background: "#446BF6",
																							}}
																						>
																							<p
																								style={{
																									fontFamily: "Mulish",
																									margin: "auto",
																									color: "#fff",
																								}}
																								className="fm-w6-s12"
																							>
																								{doctorFirstName}
																							</p>
																						</div>
																					) : (
																						<img
																							onError={(e) => {
																								// setImg(true);
																								getUserName(
																									i.assigneddoctors[0].split(
																										","
																									)[0]
																								);
																							}}
																							loading="lazy"
																							src={
																								i.assigneddoctors[0].split(
																									","
																								)[1]
																							}
																							// src="ghy"
																							alt="avatar"
																							style={{
																								width: "40px",
																								height: "40px",
																								borderRadius: "50%",
																							}}
																						></img>
																					)}
																					{i.assigneddoctors[0].split(",")
																						.length /
																						2 -
																						1 >
																						1 && (
																						<div
																							style={{
																								display: "flex",
																								height: "40px",
																								width: "40px",

																								borderRadius: "50%",
																								background: "#446BF6",
																							}}
																						>
																							<p
																								style={{
																									fontFamily: "Mulish",
																									margin: "auto",
																									color: "#fff",
																								}}
																								className="fm-w6-s12"
																							>
																								+{" "}
																								{i.assigneddoctors[0].split(",")
																									.length /
																									2 -
																									1}
																							</p>
																						</div>
																					)}
																				</>
																			</div>
																			&nbsp;&nbsp;&nbsp;&nbsp;
																			{props.admin && (
																				<OverlayTrigger
																					trigger="click"
																					rootClose
																					placement="left-start"
																					overlay={
																						<Popover
																							id="popover-basic"
																							style={{
																								height: "106px",
																								width: "200px",
																								backgroundColor:
																									"rgba(0, 0, 0, 0.8)",
																								borderRadius: "10px",
																							}}
																						>
																							<Popover.Body
																								style={{ padding: "0px 0px" }}
																							>
																								<div
																									style={{
																										color:
																											"rgba(255, 255, 255, 0.8)",
																										paddingTop: "20px",
																										paddingLeft: "20px",
																										cursor: "pointer",
																									}}
																									className="f-fm fm-w4-s14"
																									onClick={() => {
																										props.deleteTreatmentHandler(
																											i.id
																										);
																									}}
																								>
																									Delete treatment
																								</div>
																								<div
																									style={{
																										color:
																											"rgba(255, 255, 255, 0.8)",
																										paddingTop: "20px",
																										paddingLeft: "20px",
																										cursor: "pointer",
																									}}
																									onClick={() => {
																										props.disableTreatmentHandler(
																											i.id,
																											"Enabled"
																										);
																									}}
																								>
																									Enable treatment
																								</div>
																							</Popover.Body>
																						</Popover>
																					}
																					style={{ alignItems: "end" }}
																				>
																					<img
																						loading="lazy"
																						src="./images/Group210.png"
																						alt="avatar"
																						style={{ cursor: "pointer" }}
																					></img>
																				</OverlayTrigger>
																			)}
																		</div>
																	</td>
																</tr>
															)}
														</>
													);
												})}
										</tbody>
									</table>
								</div>
							</>
						</Tab>
					</Tabs>
				</div>
			</div>
		</>
	);
};
export default TreatmentList;
