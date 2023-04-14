import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
// import { Animated } from "react-animated-css";
import { useNavigate, useLocation } from "react-router-dom";
import * as utils from "../../common/util";
import * as UserServices from "../../services/user";
import GooglePlacesAutocomplete, {
	geocodeByPlaceId,
	geocodeByAddress,
	getLatLng,
} from "react-google-places-autocomplete";
import Cropmodal from "./cropmodal";
import { Baseurl } from "../../common/util";

// import { Input } from "@material-ui/core";
const axios = require("axios").default;
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
const CreateBusiness = () => {
	var axios = require("axios");
	const navigate = useNavigate();
	const params = useLocation().state;
	const firstupdate = useRef(true);
	const [address, setAddress] = useState("");
	const [googleApiKey, setGoogleApiKey] = useState("");
	const [addressObj, setAddressObj] = useState();
	const [file, setFile] = useState();
	const [lat, setLat] = useState();
	const [lng, setLng] = useState();

	const [state, setState] = useState({
		params,
	});
	console.log(state);

	const userName = state.params.email.replace(/[^a-zA-Z0-9]/g, "") + "/";

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
	console.log("address", address, lat, lng);

	useEffect(() => {
		axios({
			url: Baseurl() + "getGoogleApiKey",
			method: "GET",
		})
			.then((res) => {
				console.log("google api key", res.data);
				setGoogleApiKey(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	useLayoutEffect(() => {
		console.log(firstupdate.current);
		if (firstupdate.current) {
			return;
		}
		console.log("Updated State", state);

		const updateVariables = UserServices.returnUpdateVariables({
			id: state.params.id,
			currentstep: "4",
			step: state.params.step.toString(),
			prevstep: state.params.prevstep.toString(),
			business: [
				{
					website: state.params.business[0].website,
					bio: state.params.business[0].bio,
					bavatar: process.env.REACT_APP_AWS_S3 + userName + file.name,
					name: state.params.business[0].name,
					noofemployees: state.params.business[0].noofemployees,
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

		(async function anyNameFunction() {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("user", userName);
			UserServices.Uploadandupdate(formData, updateVariables).then((result) => {
				console.log(result);
				navigate("../personalprofile", { state: state.params });
			});
		})();
	});

	const onImageChange = (image) => {
		// image.name = "Profile.png";
		image = new File([image], "Business.png", { type: "image/png" });
		console.log(image);
		state.params.business[0].bavatar = image;
		setState({ ...state, params: state.params });
		setFile(image);
	};

	const showNextStep = (doctortype) => {
		let sindex = state.params.currentstep;
		sindex++;
		state.params.currentstep = sindex.toString();
		firstupdate.current = false;
		setState({ ...state, params: state.params });
	};
	const handleChange = (event) => {
		if (event.target.name === "businessname") {
			state.params.business[0].name = event.target.value;
		}
		if (event.target.name === "businesslocation") {
			state.params.business[0].location[0].line1 = event.target.value;
		}
		if (event.target.name === "businesswebsite") {
			state.params.business[0].website = event.target.value;
		}
		if (event.target.name === "bio") {
			state.params.business[0].bio = event.target.value;
		}

		setState({ ...state, params: state.params });
		console.log(state);
	};
	const handleSelectChange = (event) => {
		state.params.business[0].noofemployees = event.target.value;
		setState({ ...state, params: state.params });
		console.log(state);
	};
	const rvalue = (val) => {
		console.log(val);
	};
	const handleimageclick = (event) => {
		const reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		setFile(event.target.files[0]);
		reader.onload = (e) => {
			const image = new Image();
			image.src = e.target.result;
			image.onload = (e) => {
				var c = false;
				const height = e.target.height;
				const width = e.target.width;
				if (height == 100 && width == 100) {
					state.params.business[0].bavatar = URL.createObjectURL(
						event.target.files[0]
					);
					setState({ ...state, params: state.params });
					console.log(state);
				} else {
					return false;
				}
			};
		};
	};
	const handleDelete = () => {
		state.params.business[0].bavatar = "";
		setState({ ...state, params: state.params });
		console.log(state);
	};

	const getButtonClass = () => {
		console.log(state);
		let rvalue = "aebuttonblack";
		let urlregex =
			/(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/;
		let validbussinesswebsite = urlregex.test(state.params.business[0].website);
		let _blogo = state.params.business[0].bavatar;
		//console.log(JSON.stringify(addressObj));
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
		let svalue =
			(addressval === "" ? "@#@" : addressval) +
			(state.params.business[0].name === ""
				? "@#@"
				: state.params.business[0].name) +
			(state.params.business[0].website === ""
				? "@#@"
				: state.params.business[0].website) +
			(state.params.business[0].noofemployees === ""
				? "@#@"
				: state.params.business[0].noofemployees) +
			(!validbussinesswebsite ? "@#@" : validbussinesswebsite) +
			(!_blogo || _blogo === "path" ? "@#@" : _blogo);
		console.log(svalue);
		console.log(validbussinesswebsite);

		if (svalue.indexOf("@#@") >= 0) {
			rvalue = "aebuttongrey";
		}
		return rvalue;
	};
	return (
		<>
			{utils.aeProgressBar({ width: "25.5%" })}
			<div className="slider1">
				<div style={{ backgroundColor: "#FFFFFF", overflow: "hidden" }}>
					<div className="row pt-3" style={{ backgroundColor: "#FFFFFF" }}>
						<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12">
							<utils.aeLogo fcolor="color-00" />
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-2rem"></div>
							</div>
							<div className="row">
								<div className="col-8 pl-12">
									<label className="f-rl fm-w7-s36 col-8">
										What’s the name of your clinic / Institution?
									</label>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-2rem"></div>
							</div>
							<div className="row">
								<div className="col-sm-6 col-xs-6 col-md-6 col-8 pl-12">
									<div className="form-outline">
										<label
											className="form-label form f-fm fm-w6-s12"
											htmlFor="form3Example8"
											style={{ marginLeft: "0px" }}
										>
											Clinic / Institution Name
										</label>

										<div className="form-notch">
											<div
												className="form-notch-leading"
												style={{ width: "9px" }}
											></div>
											<div
												className="form-notch-middle"
												style={{ width: "55.2px" }}
											></div>
											<div className="form-notch-trailing"></div>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-3rem"></div>
							</div>
							<div className="row">
								<div className="col pl-12">
									<utils.aeButton
										classNames="aebutton fm-w6-s18"
										text="Next"
										enabled="false"
										disabledClass={
											state.params.clinicname === ""
												? "aebuttongrey"
												: "aebuttonblack"
										}
										onClick={() => showNextStep("Doctor", "business")}
									/>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12 imgalign">
							<img
								style={{ width: "100%" }}
								loading="lazy"
								className="body-bg-clinic-s3"
								alt="clinic"
							></img>
						</div>
					</div>
				</div>
			</div>
			<div className="slider">
				<div style={{ backgroundColor: "#FFFFFF", overflow: "hidden" }}>
					<div className="row pt-3" style={{ backgroundColor: "#FFFFFF" }}>
						<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12">
							<utils.aeLogo fcolor="color-00" />
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
							<div className="row">
								<div className="col-8 pl-12">
									<label className="f-rl fm-w7-s36 col-lg-12 col-xl-12 col-6">
										Create an account for your business
									</label>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-2rem"></div>
							</div>
							<div className="row">
								<div className="col-sm-8 col-xs-8 col-md-8 col-xl-6 col-lg-6 col-8 pl-12">
									<div className="form-outline">
										<label
											className="form-label form f-fm fm-w6-s12"
											htmlFor="form3Example8"
										>
											Business Logo
										</label>
										<br></br>
										<Cropmodal onImageChange={onImageChange}></Cropmodal>
										<br></br>
										<div className="form-notch">
											<div
												className="form-notch-leading"
												style={{ width: "9px" }}
											></div>
											<div
												className="form-notch-middle"
												style={{ width: "55.2px" }}
											></div>
											<div className="form-notch-trailing"></div>
										</div>
									</div>
									<div className="form-outline">
										<label
											className="form-label form  f-fm fm-w6-s12"
											htmlFor="form3Example8"
											style={{ marginLeft: "0px" }}
										>
											Business Name
										</label>
										<input
											type="text"
											id="txtbusinessname"
											style={{ height: "60px" }}
											name="businessname"
											defaultValue={state.params.business[0].name}
											className="form-control form-control-lg"
											value={state.email}
											onChange={handleChange}
										/>
										<div className="form-notch">
											<div
												className="form-notch-leading"
												style={{ width: "9px" }}
											></div>
											<div
												className="form-notch-middle"
												style={{ width: "55.2px" }}
											></div>
											<div className="form-notch-trailing"></div>
										</div>
									</div>
									<div className="form-outline  pt-4">
										<label
											className="form-label form  f-fm fm-w6-s12"
											htmlFor="form3Example8"
											style={{ marginLeft: "0px" }}
										>
											Business Location
										</label>
										<div className="gplaces">
											{googleApiKey !== "" && (
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
													}}
													name="businesslocation"
													defaultValue={
														state.params.business[0].location[0].line1
													}
													value={state.params.business[0].location[0].line1}
												/>
											)}
										</div>
										<div className="form-notch">
											<div
												className="form-notch-leading"
												style={{ width: "9px" }}
											></div>
											<div
												className="form-notch-middle"
												style={{ width: "55.2px" }}
											></div>
											<div className="form-notch-trailing"></div>
										</div>
									</div>
									<div className="form-outline pt-4">
										<label
											className="form-label form  f-fm fm-w6-s12"
											htmlFor="form3Example8"
											style={{ marginLeft: "0px" }}
										>
											Business Website
										</label>
										<input
											type="text"
											id="txtbusinesswebsite"
											style={{ height: "60px" }}
											name="businesswebsite"
											defaultValue={state.params.business[0].website}
											className="form-control form-control-lg"
											value={state.email}
											onChange={handleChange}
										/>
										<div className="form-notch">
											<div
												className="form-notch-leading"
												style={{ width: "9px" }}
											></div>
											<div
												className="form-notch-middle"
												style={{ width: "55.2px" }}
											></div>
											<div className="form-notch-trailing"></div>
										</div>
									</div>
									<div className="form-outline pt-4">
										<label
											className="form-label form  f-fm fm-w6-s12"
											htmlFor="form3Example8"
											style={{ marginLeft: "0px" }}
										>
											Number Of Employees
										</label>
										<select
											className="form-select form-select-lg mb-3"
											name="noofemployees"
											defaultValue={state.params.business[0].noofemployees}
											aria-label=".form-select-lg example"
											onChange={handleSelectChange}
										>
											<option value=""></option>
											<option value="1-10">1-10</option>
											<option value="11-50">11-50</option>
											<option value="51-200">51-200</option>
											<option value="201-500">201-500</option>
											<option value="501-1000">501-1000</option>
											<option value="1001-5000">1001-5000</option>
											<option value=">5000">&gt;5000</option>
										</select>
										<div className="form-notch">
											<div
												className="form-notch-middle"
												style={{ width: "55.2px" }}
											></div>
											<div className="form-notch-trailing"></div>
										</div>
									</div>
									<div className="form-outline pt-3">
										<label
											className="form-label form f-fm fm-w6-s12"
											htmlFor="form3Example8"
											style={{ marginLeft: "0px" }}
										>
											BIO
										</label>
										<textarea
											className="form-control"
											id="exampleFormControlTextarea1"
											rows="3"
											name="bio"
											defaultValue={state.params.business[0].bio}
											onChange={handleChange}
										></textarea>
										<div className="form-notch">
											<div
												className="form-notch-leading"
												style={{ width: "9px" }}
											></div>
											<div
												className="form-notch-middle"
												style={{ width: "55.2px" }}
											></div>
											<div className="form-notch-trailing"></div>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-3rem"></div>
							</div>
							<div className="row">
								<div className="col pl-12">
									<utils.aeButton
										classNames="aebutton fm-w6-s18"
										text="Create"
										enabled="false"
										disabledClass={getButtonClass()}
										onClick={() => showNextStep("Doctor")}
									/>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12 imgalign">
							<img
								style={{ width: "100%" }}
								loading="lazy"
								className="body-bg-clinic-s3"
								alt="clinic"
							></img>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default CreateBusiness;
