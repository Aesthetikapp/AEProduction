import React, {
	useState,
	useLayoutEffect,
	useEffect,
	useRef,
	createRef,
} from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { validEmailExp, validPasswordExp } from "../../common/validations";
import PhoneInput from "react-phone-number-input";
import Internationalphone from "../../common/internationalphone";
import * as utils from "../../common/util";
import * as UserServices from "../../services/user";

const ref = createRef();

const Inviteaccept = () => {
	const params = {
		params: useParams(),
	};
	console.log("params", params.params.userid);

	const [phonealreadyexist, setPhonealreadyexist] = useState(false);
	const [state, setState] = useState({
		id: params.params.userid,
		password: "",
		phone: "",
		email: "",
		validpassword: false,
		pcolor: "#FFFFFF",
		ecolor: "#FFFFFF",
		ptype: "password",
		source: "web",
		step: "",
		prevstep: "",
		business: "",
		clinicname: "",
		isadmin: false,
		params: {},
	});

	useEffect(() => {
		(async function anyNameFunction() {
			const existUser = await UserServices.GetUserById(params.params.userid);
			console.log("user", existUser.userByID);
			setState({ ...state, params: existUser.userByID });
		})();
	}, []);

	const getclassname = () => {
		let vtext =
			(state.password === "" ? "@#@" : state.password) +
			(state.phone === "" ? "@#@" : state.phone);
		let validf = state.validpassword ? "true" : "@#@";
		vtext = vtext + validf;
		let rvalue = "aebuttongrey";

		if (vtext.indexOf("@#@") >= 0) {
			rvalue = "aebuttongrey";
		} else {
			rvalue = "aebuttonblack";
		}
		return rvalue;
	};

	const togglePassword = (event) => {
		let ptype = "password";
		ptype = state.ptype === "password" ? "text" : "password";
		setState((prevState) => ({
			id: prevState.id,
			firstname: prevState.firstname,
			lastname: prevState.lastname,
			password: prevState.password,
			email: prevState.email,
			phone: prevState.phone,
			validpassword: prevState.validpassword,
			validemail: prevState.validemail,
			pcolor: prevState.pcolor,
			ecolor: prevState.ecolor,
			ptype: ptype,
			source: prevState.source,
			step: prevState.step,
			prevstep: prevState.step,
			business: prevState.business,
			clinicname: prevState.clinicname,
			isadmin: false,
			params: prevState.params,
		}));
	};

	const handleChange = (event) => {
		if (typeof event != "undefined") {
			if (typeof event === "string") {
				state.phone = event;
			} else {
				let vp = validPasswordExp.test(event.target.value);
				let pcolor = "#FFFFFF";
				let ecolor = "#FFFFFF";

				setState({ ...state, [event.target.name]: event.target.value });
				if (event.target.name === "password") {
					if (!vp) {
						pcolor = "#777777";
					} else if (state.validpassword && state.password !== "") {
						pcolor = "#FFFFFF";
					} else {
						pcolor = "#FFFFFF";
					}
					setState((prevState) => ({
						id: prevState.id,
						firstname: prevState.firstname,
						lastname: prevState.lastname,
						password: prevState.password,
						email: prevState.email,
						phone: prevState.phone,
						validpassword: vp,
						validemail: prevState.validemail,
						pcolor: pcolor,
						ecolor: prevState.ecolor,
						ptype: prevState.ptype,
						source: prevState.source,
						step: prevState.step,
						prevstep: prevState.step,
						business: prevState.business,
						isadmin: false,
						clinicname: prevState.clinicname,
						params: prevState.params,
					}));
				}
				if (event.target.name === "email") {
					let validemail = validEmailExp.test(event.target.value);
					if (validemail) {
						ecolor = "#FFFFFF";
					} else {
						ecolor = "#E10000";
					}
					setState((prevState) => ({
						id: prevState.id,
						firstname: prevState.firstname,
						lastname: prevState.lastname,
						password: prevState.password,
						email: prevState.email,
						phone: prevState.phone,
						validpassword: prevState.validpassword,
						validemail: validemail,
						pcolor: prevState.pcolor,
						ecolor: ecolor,
						ptype: prevState.ptype,
						source: prevState.source,
						step: prevState.step,
						prevstep: prevState.step,
						business: prevState.business,
						isadmin: false,
						clinicname: prevState.clinicname,
						params: prevState.params,
					}));
				}
			}
		}
	};

	const navigate = useNavigate();
	const firstupdate = useRef(true);

	console.log(state);
	useLayoutEffect(() => {
		if (firstupdate.current) {
			return;
		}
	}, [state]);

	const showNextStep = (doctortype, type) => {
		(async function anyNameFunction() {
			const existUserphone = await UserServices.GetUserByPhone(state.phone);
			if (existUserphone.userByPhone.length === 0) {
				setPhonealreadyexist(false);
			} else {
				setPhonealreadyexist(true);
			}
		})();
		const updateVariables = UserServices.returnUpdateVariables({
			id: params.params.userid,
			currentstep: "4",
			isadmin: "false",
			password: state.password,
			primaryTelephone: state.phone,
			prevstep: "entered",
		});
		console.log(state);
		state.params.currentstep = "4";
		state.params.isadmin = false;
		state.primaryTelephone = state.phone;
		setState({ ...state, params: state.params });
		console.log(state.params);

		console.log(updateVariables);
		UserServices.UpdateUser(updateVariables).then((value) => {
			navigate("../personalprofile", { state: state.params });
		});
	};
	return (
		<>
			{utils.aeProgressBar({ width: "12.5%" })}

			<div className="slider">
				<div style={{ backgroundColor: "#FFFFFF", overflow: "hidden" }}>
					<div className="row pt-3" style={{ backgroundColor: "#FFFFFF" }}>
						<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12">
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
									<label className="f-rl fm-w7-s36">
										Please enter following information to proceed
									</label>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-2rem"></div>
							</div>

							<div className="row">
								<div className="col-8 pl-12">
									<div className="form-outline">
										<label
											className="form-label form f-fm fm-w6-s12"
											htmlFor="form3Example8"
											style={{ marginLeft: "0px" }}
										>
											Phone Number
										</label>
										<PhoneInput
											id="txtPhone"
											name="phone"
											international
											countryCallingCodeEditable={false}
											defaultCountry="GB"
											inputComponent={Internationalphone}
											ref={ref}
											onChange={handleChange}
											value={state.phone}
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
										{phonealreadyexist && (
											<label
												style={{
													marginLeft: "0px",
													marginTop: "-6px",
													fontStyle: "normal",
													fontWeight: "400",
													fontSize: "12px",
													color: "red",
												}}
											>
												Sorry this mobile number is already registered
											</label>
										)}
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-3rem"></div>
							</div>

							<div className="row">
								<div className="col-8 pl-12">
									<div className="form-outline">
										<label
											className="form-label form f-fm fm-w6-s12"
											htmlFor="form3Example8"
											style={{ marginLeft: "0px" }}
										>
											Create Your Password
										</label>
										<div
											className="input-group mb-3"
											style={{ cursor: "pointer" }}
										>
											<input
												type={state.ptype}
												id="txtPassword"
												name="password"
												className="input form-control form-control-lg"
												value={state.password}
												onChange={handleChange}
											/>
											<div className="input-group-append">
												<span
													className="input-group-text"
													onClick={togglePassword}
												>
													{state.ptype === "password" && (
														<i className="fa fa-eye-slash" id="show_eye"></i>
													)}
													{state.ptype === "text" && (
														<i className="fa fa-eye" id="show_eye"></i>
													)}
												</span>
											</div>
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
								</div>
							</div>

							<div className="row">
								<div className="col-8 pl-12">
									<div className="form-outline">
										<label
											id="lblMessage"
											style={{
												marginLeft: "0px",
												marginTop: "-6px",
												fontStyle: "normal",
												fontWeight: "400",
												fontSize: "12px",
												color: state.pcolor,
											}}
										>
											Password must be at least 8 characters long with at least
											1 Upper Case, 1 lower case and 1 special character except
											(.).
										</label>
										<div className="form-notch">
											<div
												className="form-notch-leading"
												style={{ width: "9px" }}
											></div>
											<div
												className="form-notch-middle"
												style={{ width: "56px" }}
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
										disabledClass={getclassname()}
										onClick={() => showNextStep("Doctor", "business")}
									/>
								</div>
							</div>
							<div className="row">
								<div className="col pl-2 pt-4rem"></div>
							</div>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 col-sm-12 imgalign">
							<img
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
export default Inviteaccept;
