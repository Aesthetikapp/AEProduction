import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import * as UserServices from "../../services/user";
import { ToastContainer, toast } from "react-toastify";
import GooglePlacesAutocomplete, {
	geocodeByPlaceId,
	geocodeByAddress,
	getLatLng,
} from "react-google-places-autocomplete";
import * as utils from "../../common/util";
import Modal from "react-bootstrap/Modal";
import { Baseurl } from "../../common/util";

const DropDownContainer = styled("div")``;
const DropDownHeader = styled("div")``;
const DropDownListContainer = styled("div")``;
const DropDownList = styled("ul")``;
const ListItem = styled("li")``;

// var baseurl1;
// if (process.env.REACT_APP_HOST === "local") {
// 	baseurl1 = "http://localhost:3001/";
// } else if (process.env.REACT_APP_HOST === "123") {
// 	baseurl1 = "http://123.176.43.187:3004/";
// } else {
// 	baseurl1 = window.location.origin + "/api/";
// }

const getAddressObject = (address_components) => {
	console.log(address_components);
	const ShouldBeComponent = {
		street_number: ["street_number"],
		postal_code: ["postal_code"],
		street: ["street_address", "route"],
		province: [
			"administrative_area_level_1",
			"administrative_area_level_2",
			"administrative_area_level_3",
			"administrative_area_level_4",
			"administrative_area_level_5",
		],
		city: [
			"locality",
			"sublocality",
			"sublocality_level_1",
			"sublocality_level_2",
			"sublocality_level_3",
			"sublocality_level_4",
		],
		country: ["country"],
	};

	let address = {
		street_number: "",
		postal_code: "",
		street: "",
		province: "",
		city: "",
		country: "",
	};

	address_components.forEach((component) => {
		for (var shouldBe in ShouldBeComponent) {
			if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
				if (shouldBe === "country") {
					address[shouldBe] = component.short_name;
				} else {
					address[shouldBe] = component.long_name;
				}
			}
		}
	});

	// Fix the shape to match our schema
	address.address = address.street_number + " " + address.street;
	delete address.street_number;
	delete address.street;
	if (address.country === "US") {
		address.state = address.province;
		delete address.province;
	}
	return address;
};

const Appointment = (props) => {
	useEffect(() => {
		function getData() {
			(async function () {
				var c = await UserServices.GetUserSettingsById(props.params.id);
				var u = await UserServices.GetUserById(props.params.id);
				var a = c.userSettingsByUserID.appointment[0];
				setLine1(u.userByID.business[0].location[0].line1);
				setTown(u.userByID.business[0].location[0].towncity);
				setState(u.userByID.business[0].location[0].state);
				setCountry(u.userByID.business[0].location[0].country);
				setPincode(u.userByID.business[0].location[0].postcode);
				setSliderange(a.radius);
				setDayrate(a.dayrate);
				setSelectedInterval(a.interval);
				setBookings(a.autoacceptbooking);
				setConsultation(a.autoacceptconsult);
				setFee(a.bookingfee);
			})();
		}
		getData();
	}, [props.params.id]);

	const options2 = ["20", "40", "60"];
	const [isOpen2, setIsOpen2] = useState(false);
	const [selectedInterval, setSelectedInterval] = useState(null);
	const [sliderange, setSliderange] = useState("7");
	const [dayrate, setDayrate] = useState("50");
	const [bookings, setBookings] = useState(false);
	const [fee, setFee] = useState(false);
	const [consultation, setConsultation] = useState(false);
	const [googlelocation, setGooglelocation] = useState(false);
	const [line1, setLine1] = useState();
	const [town, setTown] = useState();
	const [state, setState] = useState();
	const [country, setCountry] = useState();
	const [pincode, setPincode] = useState();
	const [istoasta, setIstoasta] = useState(false);
	const [googleApiKey, setGoogleApiKey] = useState("");
	var axios = require("axios");
	const [address, setAddress] = useState("");
	const [lat, setLat] = useState();
	const [lng, setLng] = useState();
	const [addressObj, setAddressObj] = useState();
	// const firstupdate = useRef(true);

	const showNextStep = (doctortype) => {
		setGooglelocation(false);
		// console.log("enter");
		const updateVariables = UserServices.returnUpdateVariables({
			id: props.params.id,
			business: [
				{
					location: [
						{
							line1: address.label,
							line2: lat.toString() + "," + lng.toString(),
							country: addressObj.country,
							state: addressObj.province,
							towncity: addressObj.city,
							postcode: addressObj.postal_code,
						},
					],
				},
			],
		});

		console.log(updateVariables);

		UserServices.UpdateUser(updateVariables).then((value) => {
			setIstoasta(true);
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
				setIstoasta(false);
				window.location.reload();
			}, 1000);
		});
	};

	const toggling2 = () => {
		setIsOpen2(!isOpen2);
	};
	const onOptionClicked2 = (value) => {
		setSelectedInterval(value);
		setIsOpen2(false);
	};

	const handleeditclick = () => {
		setGooglelocation(true);
	};

	const handleClose = () => {
		setGooglelocation(false);
	};

	useEffect(() => {
		axios({
			url: Baseurl() + "getGoogleApiKey",
			method: "GET",
		})
			.then((res) => {
				// console.log("google api key", res.data);
				setGoogleApiKey(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		if (address !== "") {
			const func = async () => {
				const geocodeObj =
					address &&
					address.value &&
					(await geocodeByPlaceId(address.value.place_id));

				console.log("address geocode", geocodeObj);
				const addressObject =
					geocodeObj && getAddressObject(geocodeObj[0].address_components);
				console.log("addressObject", addressObject);
				setAddressObj(addressObject);
			};
			func();
		}
	}, [address]);
	// console.log("address", address, lat, lng);

	const getButtonClass = () => {
		let rvalue = "aebuttonblack";

		let addressval =
			JSON.stringify(addressObj) === "null" ||
			JSON.stringify(addressObj) === "" ||
			!JSON.stringify(addressObj)
				? ""
				: addressObj.postal_code +
				  "|" +
				  addressObj.province +
				  "|" +
				  addressObj.city +
				  "|" +
				  addressObj.country +
				  "|" +
				  addressObj.label;

		let svalue = addressval === "" ? "@#@" : addressval;

		if (svalue.indexOf("@#@") >= 0) {
			rvalue = "aebuttongrey";
		}
		return rvalue;
	};

	const updateSettings = () => {
		setIstoasta(true);
		(async function anyNameFunction() {
			var c = await UserServices.GetUserByEmail();
			console.log(c);
			const updateSettingsvariables = UserServices.returnUpdateSettings({
				id: props.params.id,
				appointment: [
					{
						radius: sliderange,
						interval: selectedInterval,
						autoacceptbooking: bookings,
						autoacceptconsult: consultation,
						bookingfee: fee,
						dayrate: dayrate,
						status: true,
					},
				],
			});

			UserServices.UpdateSettings(updateSettingsvariables).then((value) => {
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
					setIstoasta(false);
					window.location.reload();
				}, 3000);
			});
		})();
	};
	const inter = useRef(null);

	const handlemousedown = (e) => {
		if (inter.current && isOpen2 && !inter.current.contains(e.target)) {
			setIsOpen2(false);
		}
	};
	document.addEventListener("mousedown", handlemousedown);
	return (
		<div className="container">
			{istoasta && (
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
			<div className="row  pb-2rem">
				<div className="col pt-3">
					<label className="f-fm f-fm-w5-s20" style={{ color: "#777777" }}>
						Booking (or service?) Area
					</label>
				</div>
				<div className="row">
					<div className="col">
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
					<>
						<div className="col">
							<label
								style={{ paddingBottom: "15px" }}
								className="f-fm f-fm-w4-s16"
							>
								Your location:
							</label>

							<div
								className="col f-fm f-fm-w4-s14 w100"
								style={{ width: "50%" }}
							>
								<label
									style={{ color: "#777777", textDecoration: "underline" }}
								>
									{line1}
								</label>
							</div>

							<div
								className="col f-fm f-fm-w4-s14"
								style={{ paddingBottom: "40px" }}
							>
								<label
									style={{ color: "#777777", textDecoration: "underline" }}
								>
									{pincode}
								</label>
							</div>
						</div>
						{props.params.isadmin && (
							<div className="col-xl-1 col-lg-3 col-md-3 col-xs-3 col-sm-3">
								<div
									style={{
										display: "flex",
										height: "30px",
										width: "30px",
										border: "none",
										borderRadius: "50%",
										background: "#F4F4F4",
										cursor: "pointer",
									}}
									onClick={handleeditclick}
								>
									<img alt="" loading="lazy" src="./images/Group258.png" />
								</div>
							</div>
						)}
					</>
					<Modal
						show={googlelocation}
						onHide={handleClose}
						dialogClassName="modal-sm-30px modal-md"
						position="top-right"
					>
						<Modal.Body>
							<div className="row">
								<div className="col-xl col-lg col-md col-xs col-sm">
									<img
										alt="Close"
										onClick={handleClose}
										style={{
											cursor: "pointer",
											// padding: "30px",
											float: "right",
											padding: "10px 15px 0 0",
											// paddingRight: "52px",
										}}
										src="../images/close.png"
									></img>
								</div>
							</div>
							<div className="row" style={{ padding: "20px" }}>
								<div className="col-xl col-lg col-md col-xs col-sm">
									<div className="row">
										<div className="col-xl col-lg col-md col-xs col-sm">
											<label className="f-fm fm-w7-s18 color-00">
												Edit Business Location
											</label>
										</div>
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
									<div className="gplaces">
										{googleApiKey !== "" && (
											<>
												<GooglePlacesAutocomplete
													className="gplaces1"
													classNamePrefix="aegplaces"
													apiKey={googleApiKey}
													currentLocation={true}
													selectProps={{
														isClearable: true,
														onChange: (val) => {
															console.log(val);
															if (val != null) {
																geocodeByAddress(val.label)
																	.then((results) => getLatLng(results[0]))
																	.then(({ lat, lng }) =>
																		console.log(
																			"Successfully got latitude and longitude",
																			{
																				lat,
																				lng,
																			},
																			setLat(lat),
																			setLng(lng)
																		)
																	);
																setAddress(val);
															} else {
																setAddress(val);
															}
														},
														styles: {
															input: (provided) => ({
																...provided,
																color: "blue",
																border: "solid 1 px black",
																height: 60,
															}),
														},
													}}
													name="businesslocation"
													defaultValue={line1}
													value={line1}
												/>
												<div className="row">
													<div className="col pt-4">
														<utils.aeButton
															classNames="aebutton fm-w6-s18"
															text="Update"
															enabled="false"
															disabledClass={getButtonClass()}
															onClick={() => showNextStep("Doctor")}
														/>
													</div>
												</div>
												<br />
											</>
										)}
									</div>
								</div>
							</div>
						</Modal.Body>
					</Modal>
				</div>
				<div className="row">
					<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12 f-fm f-fm-w4-s14">
						<label>Your radius preferency</label>
						<br></br>
						<div className="row">
							<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
								<input
									type="range"
									className="range1"
									min="0"
									max="15"
									value={sliderange}
									onChange={(e) => {
										setSliderange(e.target.value);
									}}
								/>
								<div className="box-minmax">
									<span className="f-fm fm-w4-s14" style={{ color: "#777777" }}>
										0 mile
									</span>
									<span className="f-fm fm-w4-s14  color-00">
										{sliderange} mile
									</span>
									<span className="f-fm fm-w4-s14" style={{ color: "#777777" }}>
										15 mile
									</span>
								</div>
							</div>
						</div>
						<br></br>
					</div>
				</div>
				{props.params.isadmin && (
					<div className="row">
						<div className="col" style={{ paddingBottom: "10px" }}>
							<label className="aecontainer">
								<span
									className="f-fm fm-w4-s16 color-00"
									style={{ color: "grey" }}
								>
									Add Booking fee
								</span>
								{/* <br /> */}

								<input
									type="checkbox"
									value={fee}
									checked={fee}
									onChange={() => setFee(!fee)}
								/>
								<span className="checkmark"></span>
								{/* <br /> */}
							</label>
							<span
								className="f-fm fm-w4-s16 color-00"
								// style={{ color: "grey" }}
							>
								If checked, 15% charge is applied to the patient
							</span>
						</div>
					</div>
				)}
				<div className="row">
					<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12 f-fm f-fm-w4-s14">
						<label>Consultation Day rate</label>
						<br></br>
						<div className="row">
							<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
								{/* <input
									type="range"
									className="range2"
									min="0"
									max="150"
									value={dayrate}
									onChange={(e) => {
										setDayrate(e.target.value);
									}}
								/> */}
								<input
									type="range"
									min="50"
									max="150"
									className="range3"
									style={{
										height: "8px",
										cursor: "pointer",
										width: "200px",
										appearance: "none",
										color: "#000",
										background: "#acacac",
									}}
									value={dayrate}
									onChange={(e) => {
										setDayrate(e.target.value);
									}}
								/>
								<div className="box-minmax">
									<span className="f-fm fm-w4-s14" style={{ color: "#777777" }}>
										0 USD
									</span>
									<span className="f-fm fm-w4-s14  color-00">
										{dayrate} USD
									</span>
									<span className="f-fm fm-w4-s14" style={{ color: "#777777" }}>
										150 USD
									</span>
								</div>
							</div>
						</div>
						<br></br>
					</div>
				</div>
			</div>

			<div className="row pb-2rem">
				<div className="col f-fm f-fm-w5-s20">
					<label style={{ color: "#777777" }}>Appointment Intervel</label>
				</div>
				<div className="row">
					<div className="col">
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
					<div className="col f-fm f-fm-w5-s16">
						<label style={{ paddingBottom: "20px" }}>
							The interval between two appointments must be atleast:
						</label>
						<div className="row">
							<div
								className="col-lg-2 col-md-3 col-sm-4"
								style={{ width: "190px" }}
							>
								<DropDownContainer className="customdropmain" ref={inter}>
									<DropDownHeader
										onClick={toggling2}
										className="form-select form-select-lg mb-1 select-round-custom-dropdown-appointments"
										style={{ backgroundColor: "#F4F4F4" }}
									>
										{selectedInterval && (
											<>
												<p className="f-fm fm-w5-s14 color-7">
													{selectedInterval + " mins"}
												</p>
											</>
										)}
										{!selectedInterval && (
											<>
												<p className="f-fm fm-w5-s14 color-7">40 Mins</p>
											</>
										)}
									</DropDownHeader>
									{isOpen2 && (
										<div
											style={{
												width: "160px",
												height: "283px",
												position: "absolute",
											}}
										>
											<DropDownListContainer className="customdropcontainer">
												<DropDownList className="customdroptwo">
													{options2.map((k) => (
														<ListItem
															className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
															onClick={() => {
																onOptionClicked2(k);
															}}
															value={k}
														>
															{k + " mins"}
														</ListItem>
													))}
												</DropDownList>
											</DropDownListContainer>
										</div>
									)}
								</DropDownContainer>
							</div>
						</div>
						<div className="col" style={{ paddingBottom: "30px" }}>
							<label style={{ color: "#8559E3" }}>(X &gt; 20min)</label>
						</div>
					</div>
				</div>
			</div>

			<div className="row">
				<div className="col f-fm f-fm-w5-s20">
					<label style={{ color: "#777777" }}>Auto-accept setting</label>
				</div>

				<div className="row">
					<div className="col">
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
					<div className="col" style={{ paddingBottom: "10px" }}>
						<label className="aecontainer">
							<span
								className="f-fm fm-w4-s16 color-00"
								style={{ color: "grey" }}
							>
								Bookings will be auto-accepted
							</span>
							<input
								type="checkbox"
								value={bookings}
								checked={bookings}
								onChange={() => setBookings(!bookings)}
							/>
							<span className="checkmark"></span>
						</label>
					</div>
				</div>

				<div className="row">
					<div className="col" style={{ paddingBottom: "10px" }}>
						<label className="aecontainer">
							<span
								className="f-fm fm-w4-s16 color-00"
								style={{ color: "grey" }}
							>
								Consultation will be auto-accepted
							</span>
							<input
								type="checkbox"
								value={consultation}
								checked={consultation}
								onChange={() => setConsultation(!consultation)}
							/>
							<span className="checkmark"></span>
						</label>
					</div>
					<div className="mt-3 mb-3">
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
	);
};
export default Appointment;
