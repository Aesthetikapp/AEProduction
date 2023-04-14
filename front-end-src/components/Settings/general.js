import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import * as UserServices from "../../services/user";
import { ToastContainer, toast } from "react-toastify";
import TimezoneSelect from "react-timezone-select";

const ct = require("countries-and-timezones");

const DropDownContainer = styled("div")``;
const DropDownHeader = styled("div")``;
const DropDownListContainer = styled("div")``;
const DropDownList = styled("ul")``;
const ListItem = styled("li")``;

const General = (props) => {
	const [selectedLanguage, setSelectedLanguage] = useState();
	const [selectedtimeZoneValue, setSelectedtimeZoneValue] = useState();
	const [selectedcountry, setSelectedcountry] = useState();
	const [selectedDateFormats, setSelectedDateFormats] = useState();
	const [selectedtimeFormat, setSelectedtimeFormat] = useState();
	const [istoastg, setIstoastg] = useState(false);
	const [selectedTimezone, setSelectedTimezone] = useState({});
	const [selectedTimezone1, setSelectedTimezone1] = useState({});

	useEffect(() => {
		function getData() {
			(async function () {
				var c = await UserServices.GetUserSettingsById(props.params.id);
				setSelectedLanguage(c.userSettingsByUserID.general[0].language);
				setSelectedcountry(c.userSettingsByUserID.general[0].country);
				setSelectedDateFormats({
					type: c.userSettingsByUserID.general[0].dateformat,
					value: format(
						new Date(),
						c.userSettingsByUserID.general[0].dateformat
					),
				});
				setSelectedtimeFormat({
					type: c.userSettingsByUserID.general[0].timeformat,
					value: format(
						new Date(),
						c.userSettingsByUserID.general[0].timeformat
					),
				});
				// setSelectedTimezone(c.userSettingsByUserID.general[0].timezone);
				setSelectedTimezone1(
					c.userSettingsByUserID.general[0].timezone.split("|")[0]
				);
				setSelectedtimeZoneValue(c.userSettingsByUserID.general[0].timezone);
				console.log("df", c.userSettingsByUserID.general[0].timezone);
			})();
		}
		getData();
	}, [props.params.id]);

	const Languages = [
		"Arabic",
		"Chinese",
		"Danish",
		"Dutch",
		"English",
		"French",
		"German",
		"Greek",
		"Hungarian",
		"Italian",
		"Japanese",
		"Korean",
		"Lithuanian",
		"Persian",
		"Polish",
		"Portuguese",
		"Russian",
		"Spanish",
		"Swedish",
		"Turkish",
		"Vietnamese",
	];

	const dateFormats = {
		"dd/MM/yyyy": {
			type: "dd/MM/yyyy",
			value: format(new Date(), "dd/MM/yyyy"),
		},
		"dd-MM-yyyy": {
			type: "dd-MM-yyyy",
			value: format(new Date(), "dd-MM-yyyy"),
		},
		"yyyy/MM/dd": {
			type: "yyyy/MM/dd",
			value: format(new Date(), "yyyy/MM/dd"),
		},
		"yyyy-MM-dd": {
			type: "yyyy-MM-dd",
			value: format(new Date(), "yyyy-MM-dd"),
		},
		"EEE, MMM d": {
			type: "EEE, MMM d",
			value: format(new Date(), "EEE, MMM d"),
		},
		"yyyy, EEE, MMM d": {
			type: "yyyy, EEE, MMM d",
			value: format(new Date(), "yyyy, EEE, MMM d"),
		},
		"EEE, d MMM yyyy": {
			type: "EEE, d MMM yyyy",
			value: format(new Date(), "EEE, d MMM yyyy"),
		},
	};

	const timeFormats = {
		"hh:mm a": {
			type: "hh:mm a",
			value: "(12 Hr format) " + format(new Date(), "hh:mm a"),
		},
		"hh:mm:ss a": {
			type: "hh:mm:ss a",
			value: "(12 Hr format) " + format(new Date(), "hh:mm:ss a"),
		},
		"H:mm": {
			type: "H:mm",
			value: "(24 Hr format) " + format(new Date(), "H:mm"),
		},
		"hh:mm:ss": {
			type: "hh:mm:ss",
			value: "(24 Hr format) " + format(new Date(), "HH:mm:ss"),
		},
	};

	// const timeZones = ct.getAllTimezones();
	// console.log("timeZones", timeZones);

	const [isOpen, setIsOpen] = useState(false);
	const toggling = () => {
		setIsOpen(!isOpen);
	};
	const onLanguageClicked = (value) => {
		setSelectedLanguage(value);
		setIsOpen(false);
	};

	const [isOpen2, setIsOpen2] = useState(false);
	const toggling2 = () => {
		setIsOpen2(!isOpen2);
	};
	const onOptionClicked2 = (value) => {
		setSelectedcountry(value);
		setIsOpen2(false);
	};

	const [isOpen3, setIsOpen3] = useState(false);
	const toggling3 = () => {
		setIsOpen3(!isOpen3);
	};
	const onOptionClicked3 = (value) => {
		setSelectedDateFormats(value);
		setIsOpen3(false);
	};

	const [isOpen4, setIsOpen4] = useState(false);
	const toggling4 = () => {
		setIsOpen4(!isOpen4);
	};
	const onOptionClicked4 = (value) => {
		setSelectedtimeFormat(value);
		setIsOpen4(false);
		console.log(value);
	};

	const [isOpen5, setIsOpen5] = useState(false);
	// const toggling5 = () => {
	// 	setIsOpen5(!isOpen5);
	// };
	// const onOptionClicked5 = (value, val) => {
	// 	setSelectedtimeZone("(GMT " + value + ") " + val);
	// 	setIsOpen5(false);
	// };

	const countries = ct.getAllCountries();

	useEffect(() => {
		// console.log("timezone", selectedTimezone);
		var zone = "";
		Object.values(selectedTimezone).forEach((x) => {
			console.log(x);
			zone = zone + x + "|";
		});
		setSelectedtimeZoneValue(zone);
		setSelectedTimezone1(zone.split("|")[0]);
	}, [selectedTimezone]);
	// console.log("selected", selectedtimeZoneValue);

	const updateSettings = () => {
		setIstoastg(true);
		console.log(selectedLanguage);
		console.log(props);
		console.log(selectedcountry);
		console.log(selectedDateFormats);
		console.log(selectedtimeFormat);
		// console.log(selectedtimeZone);
		(async function anyNameFunction() {
			var c = await UserServices.GetUserByEmail();
			console.log(c);
			const updateSettingsvariables = UserServices.returnUpdateSettings({
				id: props.params.id,
				general: [
					{
						language: selectedLanguage,
						country: selectedcountry,
						dateformat: selectedDateFormats.type,
						timeformat: selectedtimeFormat.type,
						timezone: selectedtimeZoneValue,
						status: true,
					},
				],
			});
			console.log(updateSettingsvariables);
			UserServices.UpdateSettings(updateSettingsvariables).then((value) => {
				console.log(value);
				toast.success("Successfully record saved", {
					toastId: "calender",
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
					setIstoastg(false);
					window.location.reload();
				}, 3000);
			});
		})();
	};

	const lang = useRef(null);
	const coun = useRef(null);
	const dat = useRef(null);
	const tim = useRef(null);
	const zon = useRef(null);
	const handlemousedown = (e) => {
		if (lang.current && isOpen && !lang.current.contains(e.target)) {
			setIsOpen(false);
		}
		if (coun.current && isOpen2 && !coun.current.contains(e.target)) {
			setIsOpen2(false);
		}
		if (dat.current && isOpen3 && !dat.current.contains(e.target)) {
			setIsOpen3(false);
		}
		if (tim.current && isOpen4 && !tim.current.contains(e.target)) {
			setIsOpen4(false);
		}
		if (zon.current && isOpen5 && !zon.current.contains(e.target)) {
			setIsOpen5(false);
		}
	};
	document.addEventListener("mousedown", handlemousedown);
	return (
		<>
			<div>
				<div className="row">
					<div className="col-xl-8">
						<div style={{ width: "100%" }}>
							<div class="card-body">
								<div className="col-xl-12 col-lg-6 col-md-6 col-xs-6 col-sm-6">
									<div className="row">
										<div
											style={{
												paddingLeft: "2vh",
												paddingBottom: "3vh",
												paddingTop: "2vh",
											}}
											className="col-xl-9  col-lg-6 col-md-6 col-xs-6 col-sm-6"
										>
											Language and Region
										</div>
									</div>
									<hr></hr>
									<div className="row pt-3">
										<div className="col-xl-6  col-lg-6 col-md-12 col-xs-12 col-sm-12">
											<DropDownContainer className="customdropmain" ref={lang}>
												<DropDownHeader
													onClick={toggling}
													id="lang"
													className="form-select form-select-lg mb-1 select-round-custom-dropdown-general"
													style={{
														paddingTop: "10px",
														backgroundColor: "#F4F4F4",
													}}
												>
													{selectedLanguage && (
														<>
															<p
																className="f-fm fm-w6-s12"
																style={{ color: "#777777" }}
															>
																Language
															</p>
															<p className="f-fm fm-w4-s14 color-7">
																{selectedLanguage}
															</p>
														</>
													)}
													{!selectedLanguage && (
														<>
															<p
																className="f-fm fm-w6-s12"
																style={{ color: "#777777" }}
															>
																Language
															</p>
															<p className="f-fm fm-w5-s14 color-7">
																English (UK)
															</p>
														</>
													)}
												</DropDownHeader>
												{isOpen && (
													<div
														className="customwidth"
														style={{
															width: "345px",
															height: "283px",
															position: "absolute",
														}}
													>
														<DropDownListContainer className="customdropcontainer">
															<DropDownList
																className="customdroptwo"
																searchable
															>
																{Languages.map((k) => (
																	<ListItem
																		key={k}
																		className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
																		onClick={() => {
																			onLanguageClicked(k);
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
									</div>
									<br></br>
									<div className="row">
										<div className="col-xl-6  col-lg-6 col-md-12 col-xs-12 col-sm-12">
											<DropDownContainer className="customdropmain" ref={coun}>
												<DropDownHeader
													onClick={toggling2}
													className="form-select form-select-lg mb-1 select-round-custom-dropdown-general"
													style={{
														paddingTop: "10px",
														backgroundColor: "#F4F4F4",
													}}
												>
													{selectedcountry && (
														<>
															<p
																className="f-fm fm-w6-s12"
																style={{ color: "#777777" }}
															>
																Country
															</p>
															<p className="f-fm fm-w4-s14 color-7">
																{selectedcountry}
															</p>
														</>
													)}
													{!selectedcountry && (
														<>
															<p
																className="f-fm fm-w6-s12"
																style={{ color: "#777777" }}
															>
																Country
															</p>
															<p className="f-fm fm-w5-s14 color-7">
																United states
															</p>
														</>
													)}
												</DropDownHeader>
												{isOpen2 && (
													<div
														className="customwidth"
														style={{
															width: "345px",
															height: "283px",
															position: "absolute",
														}}
													>
														<DropDownListContainer className="customdropcontainer">
															<DropDownList className="customdroptwo">
																{Object.values(countries)
																	.sort((a, b) => (a.name > b.name ? 1 : -1))
																	.map((k) => (
																		<ListItem
																			key={k.name}
																			className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
																			onClick={() => {
																				onOptionClicked2(k.name);
																			}}
																			value={k.name}
																		>
																			{k.name}
																		</ListItem>
																	))}
															</DropDownList>
														</DropDownListContainer>
													</div>
												)}
											</DropDownContainer>
										</div>
									</div>
									<br></br>

									<div className="row">
										<div className="col-xl-6  col-lg-6 col-md-12 col-xs-12 col-sm-12">
											<DropDownContainer className="customdropmain" ref={dat}>
												<DropDownHeader
													onClick={toggling3}
													className="form-select form-select-lg mb-1 select-round-custom-dropdown-general"
													style={{
														paddingTop: "10px",
														backgroundColor: "#F4F4F4",
													}}
												>
													{selectedDateFormats && (
														<>
															<p
																className="f-fm fm-w6-s12"
																style={{ color: "#777777" }}
															>
																Date format
															</p>
															<p className="f-fm fm-w4-s14 color-7">
																{selectedDateFormats.value}
															</p>
														</>
													)}
													{!selectedDateFormats && (
														<>
															<p
																className="f-fm fm-w6-s12"
																style={{ color: "#777777" }}
															>
																Date format
															</p>
															<p className="f-fm fm-w5-s14 color-7">
																{format(new Date(), "dd/MM/yyyy")}
															</p>
														</>
													)}
												</DropDownHeader>
												{isOpen3 && (
													<div
														className="customwidth"
														style={{
															width: "345px",
															height: "283px",
															position: "absolute",
														}}
													>
														<DropDownListContainer className="customdropcontainer">
															<DropDownList className="customdroptwo">
																{Object.values(dateFormats).map((k) => (
																	<ListItem
																		key={k.value}
																		className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
																		onClick={() => {
																			onOptionClicked3(k);
																		}}
																		value={k.value}
																	>
																		{k.value}
																	</ListItem>
																))}
															</DropDownList>
														</DropDownListContainer>
													</div>
												)}
											</DropDownContainer>
										</div>
									</div>
									<br></br>
									<div className="row">
										<div className="col-xl-6  col-lg-6 col-md-12 col-xs-12 col-sm-12">
											<DropDownContainer className="customdropmain" ref={tim}>
												<DropDownHeader
													onClick={toggling4}
													className="form-select form-select-lg mb-1 select-round-custom-dropdown-general"
													style={{
														paddingTop: "10px",
														backgroundColor: "#F4F4F4",
													}}
												>
													{selectedtimeFormat && (
														<>
															<p
																className="f-fm fm-w6-s12"
																style={{ color: "#777777" }}
															>
																Time format
															</p>
															<p className="f-fm fm-w4-s14 color-7">
																{selectedtimeFormat.value}
															</p>
														</>
													)}
													{!selectedtimeFormat && (
														<>
															<p
																className="f-fm fm-w6-s12"
																style={{ color: "#777777" }}
															>
																Time format
															</p>
															<p className="f-fm fm-w5-s14 color-7">7:00 PM</p>
														</>
													)}
												</DropDownHeader>
												{isOpen4 && (
													<div
														className="customwidth"
														style={{
															width: "345px",
															height: "283px",
															position: "absolute",
														}}
													>
														<DropDownListContainer className="customdropcontainer">
															<DropDownList className="customdroptwo">
																{Object.values(timeFormats).map((k) => (
																	<ListItem
																		key={k.value}
																		className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
																		onClick={() => {
																			onOptionClicked4(k);
																		}}
																		value={k.value}
																	>
																		{k.value}
																	</ListItem>
																))}
															</DropDownList>
														</DropDownListContainer>
													</div>
												)}
											</DropDownContainer>
										</div>
									</div>
									<br></br>
									<br></br>

									<div className="row">
										<div className="col-xl-6  col-lg-6 col-md-12 col-xs-12 col-sm-12">
											<p>TimeZone</p>
										</div>
									</div>
									<hr></hr>
									<div className="row pt-3 pb-5">
										<div className="col-xl-6  col-lg-6 col-md-12 col-xs-12 col-sm-12 customtimezone">
											{selectedTimezone && (
												<TimezoneSelect
													classNamePrefix="react-select"
													value={selectedTimezone1}
													onChange={setSelectedTimezone}
												/>
											)}
											{/* {JSON.stringify(selectedTimezone, null, 2)} */}

											{/* {JSON.stringify(selectedTimezone, null, 2)} */}
											{/* <DropDownContainer className="customdropmain" ref={zon}>
												<DropDownHeader
													onClick={toggling5}
													className="form-select form-select-lg mb-1 select-round-custom-dropdown-general"
													style={{
														paddingTop: "10px",
														backgroundColor: "#F4F4F4",
													}}
												>
													{selectedtimeZone && (
														<>
															<p
																className="f-fm fm-w6-s12"
																style={{ color: "#777777" }}
															>
																Time zone
															</p>
															<p className="f-fm fm-w4-s14 color-7">
																{selectedtimeZone}
															</p>
														</>
													)}
													{!selectedtimeZone && (
														<>
															<p
																className="f-fm fm-w6-s12"
																style={{ color: "#777777" }}
															>
																Time zone
															</p>
															<p className="f-fm fm-w5-s14 color-7">
																(GMT-4) Eastern Time - New York
															</p>
														</>
													)}
												</DropDownHeader>
												{isOpen5 && (
													<div
														className="customwidth"
														style={{
															width: "345px",
															height: "283px",
															position: "absolute",
														}}
													>
														<DropDownListContainer className="customdropcontainer">
															<DropDownList className="customdroptwo">
																{Object.values(timeZones)
																	.sort((a, b) => (a.name > b.name ? 1 : -1))
																	.map((k) => (
																		<ListItem
																			key={k.name}
																			className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
																			onClick={() => {
																				onOptionClicked5(
																					k.dstOffsetStr
																						.split(":")[0]
																						.replace("0", ""),
																					k.name
																				);
																			}}
																			value={
																				"(GMT" +
																				k.dstOffsetStr
																					.split(":")[0]
																					.replace("0", "") +
																				")" +
																				k.name
																			}
																		>
																			(GMT{" "}
																			{k.dstOffsetStr
																				.split(":")[0]
																				.replace("0", "")}
																			) {k.name}
																		</ListItem>
																	))}
															</DropDownList>
														</DropDownListContainer>
													</div>
												)}
											</DropDownContainer> */}
										</div>
									</div>
								</div>
								<div>
									<button
										type="btn"
										style={{
											borderRadius: "40px",
											width: "201px",
											height: "60px",
											background: "#000000",
										}}
										onClick={() => {
											updateSettings();
										}}
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
						</div>
					</div>
				</div>
			</div>
			{istoastg && (
				<ToastContainer
					toastId="general"
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
		</>
	);
};

export default General;
