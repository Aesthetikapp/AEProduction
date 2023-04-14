import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import Customdropdown from "./customdropdown";
import Customdropdowntwo from "./customdropdowntwo";
import Customdropdownthree from "./customdropdownthree";
import Customdropdownfour from "./customdropdownfour";
import Adjustduration from "./adjustduration";
import Disclosurepopup from "./disclosurepopup";
import Reopendisclosure from "./reopendisclosure";
import Dragcropmodal from "./dragcropmodal";
import Cropmodal2 from "./cropmodal2";
import { ToastContainer, toast } from "react-toastify";
import * as TreatmentService from "../../services/treatments";
import "react-toastify/dist/ReactToastify.css";
import PdfDisclosure from "./pdfdisclosure";
import * as UserServices from "../../services/user";

const NewTreatment = (props) => {
	const firstupdate = useRef(true);
	const [treatments] = useState([]);
	const [team, setTeam] = useState([]);
	const [def_treatmenttype] = useState([]);
	const [def_treatmentname] = useState([]);
	const [def_bodyarea] = useState([]);
	const [selecteddoctors, setSelecteddoctors] = useState([]);

	useLayoutEffect(() => {
		if (firstupdate.current) {
			let clinic = props.clinicname;

			UserServices.getDoctors(clinic).then(function (result) {
				console.log("doctors", result.data.usersByClinicName);
				setTeam(result.data.usersByClinicName);
			});
		}
	}, []);
	const closure = ["...select...", "Use Templete", "Add my own disclosure"];
	const syringes = ["1", "2", "3", "4", "5"];

	const handleEntered = () => {
		setShowModal(false);
	};
	const handleDisclosureChange = (event) => {
		setShowModal(false);
		if (event === "Add my own disclosure") {
			setShowModal(true);
			setDisclosure("My disclosure added");
			setPdf(false);
		}
		if (event === "Use Templete") {
			setDisclosure("Templete Added");
			setPdf(true);
		}
		if (event === "...select...") {
			setShowModal(false);
			setDisclosure("");
			setPdf(false);
		}
	};

	const ggg = () => {
		setShowModal(true);
	};
	const [showmadal, setShowModal] = useState(false);
	const [pdf, setPdf] = useState("");

	const [textarea = 0, setTextarea = 300] = useState("");
	const [unitprice, setUnitprice] = useState("");
	const [duration, setDuration] = useState("");
	const [sellingprice, setSellingprice] = useState("");
	const [advancesetting, setAdvancedsetting] = useState("");
	const [disclosure, setDisclosure] = useState("");
	const [treatmentType, setTreatmentType] = useState("");
	const [bodyArea, setBodyArea] = useState("");
	const [treatmentName, setTreamentName] = useState("");
	const [assignDoctor, setAssignDoctor] = useState([]);
	const [qtyavAvailable, setQtyAvailable] = useState("");
	const [unlimited, setUnlimited] = useState("");
	const [disableqtyavailable, setDisableQtyAvailable] = useState(false);
	const [owndisclosure, setOwnDisclosure] = useState();
	const [addduration, setAddDuration] = useState("");
	const [click, setClick] = useState(true);
	const [ttype, setTtype] = useState(true);
	const [clicktwo, setClicktwo] = useState(true);
	const [barea, setBarea] = useState(true);
	const [clickthree, setClickthree] = useState(true);
	const [tname, setTname] = useState(true);
	const [defaultpop, setDefaultpop] = useState(true);
	const [photo1, setphoto1] = useState("");
	const [photo2, setphoto2] = useState("");
	const [video, setVideo] = useState();
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const userName = props.useremail.replace(/[^a-zA-Z0-9]/g, "") + "/";

	useEffect(() => {
		(async function anyNameFunction() {
			const existTreatments = await TreatmentService.GetGlobalTreatments();

			Object.values(existTreatments.globaltreatments).forEach(function (treat) {
				if (
					treat.assigneddoctors.length === 0 ||
					treat.userid === props.userid
				) {
					if (!def_treatmenttype.includes(treat.treatmenttype)) {
						def_treatmenttype.push(treat.treatmenttype);
					}
				}
				if (treatmentType === treat.treatmenttype) {
					if (!def_bodyarea.includes(treat.bodyarea)) {
						def_bodyarea.push(treat.bodyarea);
					}
				}
				console.log("treatmentType", treatmentType);

				if (bodyArea === treat.bodyarea) {
					if (!def_treatmentname.includes(treat.treatmentname)) {
						def_treatmentname.push(treat.treatmentname);
					}
				}
				if (treat.userid === props.userid) {
					if (
						!treatments.includes(
							treat.treatmenttype + treat.bodyarea + treat.treatmentname
						)
					) {
						treatments.push(
							treat.treatmenttype + treat.bodyarea + treat.treatmentname
						);
					}
				}
			});
			console.log("Treatments", existTreatments);
		})();
	}, [treatmentType, bodyArea, def_bodyarea]);

	const onCheckClicked = (event) => {
		console.log(event.target.checked);
		if (event.target.checked === true) {
			setDisableQtyAvailable(true);
			setUnlimited("unlimited");
		} else {
			setDisableQtyAvailable(false);
			setUnlimited("");
		}
	};
	const getValue = (key, value) => {
		if (key === "treatmenttype") {
			if (value.length === 0) {
				def_bodyarea.length = 0;
				def_treatmentname.length = 0;
			}
			setTreatmentType(value);
		}
		if (key === "bodyarea") {
			setBodyArea(value);
			if (value.length === 0) {
				def_treatmentname.length = 0;
			}
		}
		if (key === "treatmentname") {
			setTreamentName(value);
		}
		if (key === "asigndoctor") {
			setAssignDoctor(value);
		}
	};
	const pdfdisclosure = (value) => {
		console.log("disclosureadded", value);
		let l = value.Body.replaceAll(/n/g, "\\n");
		console.log("rep", l);
		setTitle(value.Disclosuretitle);
		setBody(l);
	};
	const onDisclosureChange = (value) => {
		console.log(value);
		let l = value.Body.replaceAll(/n/g, "\\n");
		console.log("rep", l);
		setTitle(value.Disclosuretitle);
		setBody(l);
	};
	const onDurationChange = (value) => {
		console.log("1", value);
		setAddDuration(value.Adjustduration);
	};
	const onDefaultChange = (value) => {
		console.log(value);
		setDefaultpop(value);
	};
	const onClickChange = () => {
		setClick(false);
	};
	const onClickChanger = () => {
		setClick(true);
	};
	const onClickChangetwo = () => {
		setClicktwo(false);
	};
	const onClickChangertwo = () => {
		setClicktwo(true);
	};
	const onClickChangethree = () => {
		setClickthree(false);
	};
	const onClickChangerthree = () => {
		setClickthree(true);
	};

	const [valid, setValid] = useState({
		red1: "",
		red2: "",
		red3: "",
		red4: "",
		red5: "",
		red6: "",
		red7: "",
		red8: "",
		red9: "",
	});
	const [req, setReq] = useState({
		req1: "",
		req2: "",
		req3: "",
		req4: "",
		req5: "",
		req6: "",
		req7: "",
		req8: "",
		req9: "",
	});

	const setPrevstatevalues = () => {
		setValid((prevState) => ({
			red1: prevState.red1,
			red2: prevState.red2,
			red3: prevState.red3,
			red4: prevState.red4,
			red5: prevState.red5,
			red6: prevState.red6,
			red7: prevState.red7,
			red8: prevState.red8,
			red9: prevState.red9,
		}));
		setReq((prevState) => ({
			req1: prevState.req1,
			req2: prevState.req2,
			req3: prevState.req3,
			req4: prevState.req4,
			req5: prevState.req5,
			req6: prevState.req6,
			req7: prevState.req7,
			req8: prevState.req8,
			req9: prevState.req9,
		}));
	};

	const confirm = (value) => {
		if (treatmentType === "" || ttype === "") {
			valid.red1 = "notvalid";
			req.req1 = "noactive";
		} else {
			valid.red1 = "";
			req.req1 = "";
		}
		if (bodyArea === "" || barea === "") {
			valid.red2 = "notvalid";
			req.req2 = "noactive";
		} else {
			valid.red2 = "";
			req.req2 = "";
		}
		if (textarea.length < 50) {
			valid.red3 = "notvalid";
			req.req3 = "noactivetextarea";
		} else {
			valid.red3 = "";
			req.req3 = "";
		}
		if (qtyavAvailable === "" && unlimited === "") {
			valid.red4 = "notvalid";
			req.req4 = "noactive";
		} else {
			valid.red4 = "";
			req.req4 = "";
		}

		if (unitprice === "") {
			valid.red5 = "notvalid";
			req.req5 = "noactive";
		} else {
			valid.red5 = "";
			req.req5 = "";
		}
		if (sellingprice === "") {
			valid.red6 = "notvalid";
			req.req6 = "noactive";
		} else {
			valid.red6 = "";
			req.req6 = "";
		}
		if (assignDoctor.length === 0) {
			valid.red7 = "notvalid";
			req.req7 = "noactive";
		} else {
			valid.red7 = "";
			req.req7 = "";
		}
		console.log("photo1", photo1);
		if (photo1 === "") {
			valid.red8 = "notvalid";
			req.req8 = "noactivephoto";
		} else {
			valid.red8 = "";
			req.req8 = "";
		}
		if (treatmentName === "" || tname === "") {
			valid.red9 = "notvalid";
			req.req9 = "noactive";
		} else {
			valid.red9 = "";
			req.req9 = "";
		}
		setPrevstatevalues();

		if (treatments.includes(treatmentType + bodyArea + treatmentName)) {
			alert("No duplicate treatments allowed");
			return false;
		}

		if (
			(treatmentType !== "" || ttype !== "") &&
			(treatmentName !== "" || tname !== "") &&
			(bodyArea !== "" || barea !== "") &&
			textarea !== "" &&
			(qtyavAvailable !== "" || unlimited !== "") &&
			unitprice !== "" &&
			sellingprice !== "" &&
			assignDoctor !== "" &&
			photo1 !== "" &&
			!treatments.includes(treatmentType + bodyArea + treatmentName)
		) {
			console.log("enter");
			const data = new FormData();

			data.append(
				"treatmentName",
				treatmentName !== "" ? treatmentName : tname
			);
			data.append(
				"treatmentType",
				treatmentType !== "" ? treatmentType : ttype
			);
			data.append("bodyArea", bodyArea !== "" ? bodyArea : barea);
			data.append("description", textarea);
			data.append(
				"quantityavailable",
				unlimited !== "" ? unlimited : qtyavAvailable
			);
			data.append("pricepersyring", unitprice);
			data.append("sellingprice", sellingprice);
			data.append("duration", addduration !== "" ? addduration : "5");
			data.append(
				"advancedsetting",
				advancesetting !== "" ? advancesetting : "1"
			);
			console.log("advancesetting", advancesetting);
			data.append("userid", props.userid);

			console.log("assignDoctor", assignDoctor);
			let arrobj = [];
			assignDoctor.forEach((entity) => {
				arrobj.push([entity.id, entity.avatar]);
			});
			console.log("selected doctors", arrobj);
			data.append("assigneddoctors", arrobj);

			data.append(
				"defaultdisclosure",
				(disclosure === "" && "") ||
					(disclosure === "Templete Added" && defaultpop.defaulttemplete) ||
					(disclosure === "My disclosure added" && title + "|" + body)
			);

			data.append("active", value);
			console.log("data", data);
			data.append(
				"photo1",
				photo1 !== ""
					? process.env.REACT_APP_AWS_S3 +
							userName +
							"#treatmenttype#_#bodyarea#_#treatmentname#_" +
							"photo1.png"
					: ""
			);
			data.append(
				"photo2",
				photo2 !== ""
					? process.env.REACT_APP_AWS_S3 +
							userName +
							"#treatmenttype#_#bodyarea#_#treatmentname#_" +
							"photo2.png"
					: ""
			);
			data.append(
				"video",
				video !== undefined
					? process.env.REACT_APP_AWS_S3 +
							userName +
							"#treatmenttype#_#bodyarea#_#treatmentname#_" +
							"video.mp4"
					: ""
			);
			var object = {};
			data.forEach((value, key) => {
				if (value !== "") {
					object[key] = value;
					if (key === "photo1" || key === "photo2" || key === "video") {
						object[key] = object[key]
							.replace(
								"#treatmenttype#",
								object["treatmentType"].replace(/[^A-Za-z0-9:._-]/gi, "")
							)
							.replace(
								"#bodyarea#",
								object["bodyArea"].replace(/[^A-Za-z0-9:._-]/gi, "")
							)
							.replace(
								"#treatmentname#",
								object["treatmentName"].replace(/[^A-Za-z0-9:._-]/gi, "")
							)
							.replace(/[^A-Za-z0-9:/._-]/gi, "");
					}
				}
			});

			const data1 = new FormData();
			console.log("user", userName);
			console.log(photo1);
			console.log(photo2);

			console.log(object);

			data1.append(
				"file1",
				new File(
					[photo1],
					object["treatmentType"].replace(/[^A-Za-z0-9:._-]/gi, "") +
						"_" +
						object["bodyArea"].replace(/[^A-Za-z0-9:._-]/gi, "") +
						"_" +
						object["treatmentName"].replace(/[^A-Za-z0-9:._-]/gi, "") +
						"_" +
						"photo1.png",
					{ type: "image/png" }
				)
			);
			data1.append(
				"file2",
				new File(
					[photo2],
					object["treatmentType"].replace(/[^A-Za-z0-9:._-]/gi, "") +
						"_" +
						object["bodyArea"].replace(/[^A-Za-z0-9:._-]/gi, "") +
						"_" +
						object["treatmentName"].replace(/[^A-Za-z0-9:._-]/gi, "") +
						"_" +
						"photo2.png",
					{ type: "image/png" }
				)
			);
			const videoName =
				object["treatmentType"].replace(/[^A-Za-z0-9:._-]/gi, "") +
				"_" +
				object["bodyArea"].replace(/[^A-Za-z0-9:._-]/gi, "") +
				"_" +
				object["treatmentName"].replace(/[^A-Za-z0-9:._-]/gi, "") +
				"_" +
				"video.mp4";

			data1.append("video", video);
			data1.append("username", userName);
			data1.append("videoname", videoName);

			TreatmentService.Uploadandcreate(data1).then((result) => {
				console.log(result);
			});

			const updatestr = TreatmentService.returnCreateVariables(object);
			console.log(updatestr);
			TreatmentService.CreateTreatment(updatestr);

			toast.success("Successfully record saved", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			if (value === "Disabled") {
				props.save(false);
				props.change(true);
			} else {
				setTimeout(() => {
					window.location.reload();
				}, 2000);
			}
		} else {
			window.scrollTo(0, 0);
		}
	};
	const onImageChange = (image) => {
		console.log("1", image);
		setphoto1(image);
	};
	const onImageChange2 = (image) => {
		console.log("2", image);
		setphoto2(image);
	};
	const onVideoChange = (video) => {
		console.log("video", video);
		setVideo(video);
		console.log("video", video.name);
	};
	return (
		<>
			{showmadal && (
				<Disclosurepopup
					onDisclosureChange={onDisclosureChange}
					handleEntered={handleEntered}
				></Disclosurepopup>
			)}
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
			<div>
				<div className="row">
					<div className="col-xl col-lg col-md col-xs col-sm">
						<img
							alt="Close"
							onClick={props.cancel}
							style={{
								cursor: "pointer",
								padding: "30px",
								float: "right",
								paddingRight: "52px",
							}}
							src="../images/close.png"
						></img>
					</div>
				</div>

				<div className="row" style={{ padding: "20px" }}>
					<div className="col-xl col-lg col-md col-xs col-sm">
						<label
							className="f-fm fm-w6-s31"
							style={{
								justifyContent: "center",
								display: "flex",
								color: "#AF805E",
							}}
						>
							Add a Treatment
						</label>
					</div>
				</div>
				<div className="row" style={{ padding: "20px" }}>
					<div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1">
						<img alt="report" src="./images/report.png" />
					</div>
					<div className="col-xl col-lg col-md col-xs col-sm">
						<div className="row">
							<div className="col-xl col-lg col-md col-xs col-sm">
								<label className="f-fm fm-w7-s18 color-00">
									TREATMENT INFO
								</label>
							</div>
						</div>
						<div className="row">
							<div className="col-xl col-lg col-md col-xs col-sm">
								<label
									className="f-fm fm-w5-s14 color-00"
									style={{ marginTop: "-5px" }}
								>
									{" "}
									please select the category &amp;name of the treatment,describe
									the treatment correctly
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

						<div className="row  pt-3 pb-4">
							<div
								className="col-xl-4 col-lg-4 col-md-4 col-xs-4 col-sm-4 "
								style={{ paddingTop: "20px" }}
							>
								<label className={`f-fm fm-w5-s16 color-40  ${req.req1}`}>
									Treatment Type
								</label>
							</div>

							<div className="col-xl col-lg col-md col-xs col-sm ">
								<>
									{click ? (
										<>
											<Customdropdown
												name="type"
												onClickChange={onClickChange}
												treatmentype={getValue}
												border1={valid}
												options={def_treatmenttype}
											></Customdropdown>
										</>
									) : (
										<>
											<input
												className="form-control form-control-lg"
												style={{
													borderRadius: "11px",
													height: "50px",
													marginBottom: "16px",
												}}
												placeholder="Enter your treatment type"
												onChange={(e) => setTtype(e.target.value)}
											></input>
											<label className=" f-fm fm-w4-s16 color-7 ">
												<b>Note</b>:If you want go back to existing treatment
												type{" "}
												<span
													onClick={onClickChanger}
													style={{
														textDecoration: "underline",
														cursor: "pointer",
													}}
												>
													Click Here
												</span>
											</label>
										</>
									)}
								</>
							</div>
						</div>
						<div className="row  pt-3 pb-4">
							<div
								className="col-xl-4 col-lg-4 col-md-4 col-xs-4 col-sm-4 "
								style={{ paddingTop: "20px" }}
							>
								<label className={`f-fm fm-w5-s16 color-40  ${req.req2}`}>
									Body Area
								</label>
							</div>
							<div className="col-xl col-lg col-md col-xs col-sm">
								<>
									{clicktwo ? (
										<>
											<Customdropdowntwo
												name="type"
												onClickChangetwo={onClickChangetwo}
												bodyarea={getValue}
												border1={valid}
												options={def_bodyarea}
											></Customdropdowntwo>
										</>
									) : (
										<>
											<input
												className="form-control form-control-lg"
												style={{
													borderRadius: "11px",
													height: "50px",
													marginBottom: "16px",
												}}
												placeholder="Enter your body type"
												onChange={(e) => setBarea(e.target.value)}
											></input>
											<label className=" f-fm fm-w4-s16 color-7 ">
												<b>Note</b>:If you want go back to existing body type{" "}
												<span
													onClick={onClickChangertwo}
													style={{
														textDecoration: "underline",
														cursor: "pointer",
													}}
												>
													Click Here
												</span>
											</label>
										</>
									)}
								</>
								<label>Select Treatment Type to select body Area</label>
							</div>
						</div>
						<div className="row  pt-3 pb-4">
							<div
								className="col-xl-4 col-lg-4 col-md-4 col-xs-4 col-sm-4 "
								style={{ paddingTop: "20px" }}
							>
								<label className={`f-fm fm-w5-s16 color-40  ${req.req9}`}>
									Treatrment Name
								</label>
							</div>
							<div className="col-xl col-lg col-md col-xs col-sm ">
								<>
									{clickthree ? (
										<>
											<Customdropdownthree
												name="type"
												onClickChangethree={onClickChangethree}
												treatmentname={getValue}
												border1={valid}
												options={def_treatmentname}
											></Customdropdownthree>
										</>
									) : (
										<>
											<input
												className="form-control form-control-lg"
												style={{
													borderRadius: "11px",
													height: "50px",
													marginBottom: "16px",
												}}
												placeholder="Enter your treatment name"
												onChange={(e) => setTname(e.target.value)}
											></input>
											<label className=" f-fm fm-w4-s16 color-7 ">
												<b>Note</b>:If you want go back to existing treatment
												type{" "}
												<span
													onClick={onClickChangerthree}
													style={{
														textDecoration: "underline",
														cursor: "pointer",
													}}
												>
													Click Here
												</span>
											</label>
										</>
									)}
								</>
								<label>Select Body Area to select Treatment Name</label>
							</div>
						</div>
						<div className="row  pt-3 pb-4">
							<div
								className="col-xl-4 col-lg-4 col-md-4 col-xs-4 col-sm-4 align-items-center d-flex"
								style={{ paddingButtom: "20px" }}
							>
								<label className="f-fm fm-w5-s16 color-40 ">Description</label>
							</div>
							<div
								className="col-xl col-lg col-md col-xs col-sm"
								style={{ paddingLeft: "0px" }}
							>
								<textarea
									className={`form-control form-control-lg  ${valid.red3}`}
									maxLength="300"
									style={{
										borderRadius: "10px",
									}}
									onChange={(e) => setTextarea(e.target.value)}
								></textarea>

								<label
									style={{ color: "#E10000", paddingLeft: "10px" }}
									className={`f-fm fm-w5-s14 color-7  ${req.req3}`}
								></label>

								<label
									className="f-fm fm-w5-s14 color-7"
									style={{ float: "right", paddingTop: "5px" }}
								>
									{textarea.length || 0}
									<span>/300</span>
								</label>
							</div>
						</div>
					</div>
				</div>

				<div className="row" style={{ padding: "20px" }}>
					<div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1">
						<img alt="syringe" src="./images/syringe.png" />
					</div>
					<div className="col-xl col-lg col-md col-xs col-sm">
						<div className="row">
							<div className="col-xl col-lg col-md col-xs col-sm">
								<label className="f-fm fm-w7-s18 color-00">SYRINGES</label>
							</div>
						</div>
						<div className="row">
							<div className="col-xl col-lg col-md col-xs col-sm">
								<label
									className="f-fm fm-w5-s14 color-00"
									style={{ marginTop: "-5px", paddingTop: "10px" }}
								>
									Patients will schedule their appointments depending on the
									information on the syringe. Please double-check your info to
									ensure that the patient reaceives a safer and more customized
									treatment
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
						<div className="row  pt-3 pb-4">
							<div
								className="col-xl-4 col-lg-4 col-md-4 col-xs-4 col-sm-4 align-items-center d-flex "
								style={{ paddingTop: "20px" }}
							>
								<label className={`f-fm fm-w5-s16 color-40  ${req.req4}`}>
									Qty Available
								</label>
							</div>

							<div
								className="col-xl col-lg col-md col-xs col-sm "
								style={{ paddingLeft: "0px" }}
							>
								<input
									type="number"
									min="0"
									className={`form-control form-control-lg  ${valid.red4}`}
									disabled={disableqtyavailable}
									style={{
										borderRadius: "11px",
										marginBottom: "10px",
										height: "50px",
										// border: red4 ? "1px solid red" : "",
									}}
									pattern="[0-9]*"
									placeholder="Type quantity"
									onChange={(e) => setQtyAvailable(e.target.value)}
								></input>

								<label className="aecontainer f-fm fm-w6-s16 color-7">
									Unlimited
									<input type="checkbox" onClick={onCheckClicked} />
									<span className="checkmark"></span>
								</label>
							</div>
						</div>
						<div className="row  pt-3 pb-4">
							<div
								className={`col-xl-4 col-lg-4 col-md-4 col-xs-4 col-sm-4  align-items-center d-flex   ${req.req5}`}
								style={{ paddingTop: "20px" }}
							>
								<label className="f-fm fm-w5-s16 color-40 ">Price</label> &nbsp;
								<label className="f-fm fm-w5-s12 color-7">/ per syringe</label>
							</div>

							<div
								className="col-xl col-lg col-md col-xs col-sm "
								style={{ paddingLeft: "0px" }}
							>
								<div className="row pt-3 pb-4">
									<div className="col-xl col-lg col-md col-xs col-sm ">
										<input
											type="number"
											min="0"
											className={`form-control form-control-lg  ${valid.red5}`}
											style={{
												borderRadius: "11px",
												height: "50px",
												// border: red5 ? "1px solid red" : "",
											}}
											placeholder="Unitprice"
											onChange={(e) => setUnitprice(e.target.value)}
										></input>
									</div>
									<div className="col-xl col-lg col-md col-xs col-sm ">
										<input
											type="number"
											min="0"
											className={`form-control form-control-lg  ${valid.red6}`}
											style={{
												borderRadius: "11px",
												height: "50px",
												// border: red6 ? "1px solid red" : "",
											}}
											placeholder="Selling price"
											onChange={(e) => setSellingprice(e.target.value)}
										></input>
									</div>
								</div>
							</div>
							<div className="row  pt-3 pb-4">
								<div className="col-xl-4 col-lg-4 col-md-4 col-xs-4 col-sm-4 align-items-center d-flex">
									<label className="f-fm fm-w5-s16 color-40 ">Duration</label>{" "}
									&nbsp;
									<label className="f-fm fm-w5-s12 color-7 ">
										{" "}
										/ per treatment
									</label>
								</div>
								<div
									className="col-xl-4 col-lg-4 col-md-4 col-xs-4 col-sm-4"
									style={{ paddingLeft: "0px" }}
								>
									<input
										className="form-control form-control-lg"
										style={{
											borderRadius: "11px",
											border: "hidden",
											height: "50px",
										}}
										disabled
										placeholder="Duration"
										onChange={(e) => setDuration(e.target.value)}
										value={addduration}
									></input>
								</div>
								<div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1">
									<Adjustduration
										onDurationChange={onDurationChange}
									></Adjustduration>
								</div>
							</div>
							<div className="row  pt-3 pb-4">
								<div className="col-xl-4 col-lg-4 col-md-4 col-xs-4 col-sm-4 align-items-center d-flex">
									<label className="f-fm fm-w5-s16 color-40 ">
										Advanced setting
									</label>
								</div>
								<div
									className="col-xl col-lg col-md col-xs col-sm "
									style={{ paddingLeft: "0px" }}
								>
									<label
										className="f-fm fm-w5-s16 color-40"
										style={{ paddingBottom: "10px" }}
									>
										Consulation needed if the patient select more than
									</label>
									<div className="row">
										<div className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3">
											<select
												className="f-fm fm-w5-s16 color-7 form-select form-select-lg mb-3"
												style={{ borderRadius: "10px", height: "50px" }}
												onChange={(e) => setAdvancedsetting(e.target.value)}
											>
												{syringes.map((k) => (
													<option key={k} value={k}>
														{k}
													</option>
												))}
											</select>
										</div>
										<div className="col-xl col-lg col-md col-xs col-sm">
											<label
												className="f-fm fm-w5-s16 color-7"
												style={{ paddingTop: "10px" }}
											>
												Syringes
											</label>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="row" style={{ padding: "20px" }}>
					<div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1">
						<img alt="disclosure" src="./images/disclosure.png" />
					</div>
					<div className="col-xl col-lg col-md col-xs col-sm">
						<div className="row">
							<div className="col-xl col-lg col-md col-xs col-sm ">
								<label className="f-fm fm-w7-s18 color-00">DISCLOSURE</label>
							</div>
						</div>
						<div className="row">
							<div className="col-xl col-lg col-md col-xs col-sm">
								<label
									className="f-fm fm-w5-s14 color-00"
									style={{ marginTop: "-5px", paddingTop: "10px" }}
								>
									The patient need to read and agreed to disclosure-Important
									safety information &amp; approved uses of your treatment
									before checkout.
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
						<div className="row  pt-3 pb-4">
							<div className="col-xl-4 col-lg-4 col-md-4 col-xs-4 col-sm-4  align-items-center d-flex">
								<label className="f-fm fm-w5-s16 color-40 ">Disclosure</label>
							</div>
							<div
								className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3"
								style={{ width: "200px", paddingLeft: "0px" }}
							>
								<select
									className="form-select form-select-lg mb-3 f-fm fm-w5-s14 color-7"
									style={{ borderRadius: "10px", height: "50px" }}
									onChange={(e) => handleDisclosureChange(e.target.value)}
								>
									{closure.map((k) => (
										<option key={k} value={k}>
											{k}
										</option>
									))}
								</select>
							</div>
							<div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1">
								{disclosure === "Templete Added" && (
									<Reopendisclosure
										onDefaultChange={onDefaultChange}
									></Reopendisclosure>
								)}
								{disclosure === "My disclosure added" && (
									<PdfDisclosure pdfdisclosure={pdfdisclosure}></PdfDisclosure>
								)}
							</div>
							<div
								className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3"
								style={{ paddingTop: "10px" }}
							>
								{(disclosure === "Templete Added" ||
									disclosure === "My disclosure added") && (
									<label
										style={{
											height: "26px",
											backgroundColor: "#F4F4F4",
											borderRadius: "10px",
											textAlign: "center",
											paddingLeft: "10px",
											paddingRight: "10px",
										}}
									>
										{disclosure && (
											<label className="f-fm fm-w5-s12 color-AC">
												{disclosure}
											</label>
										)}
										{!disclosure && (
											<label className="f-fm fm-w5-s12 color-AC">
												Add&nbsp;your&nbsp;diclosure
											</label>
										)}
									</label>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="row" style={{ padding: "20px" }}>
					<div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1 ">
						<img alt="galary" src="./images/galary.png" />
					</div>
					<div className="col-xl col-lg col-md col-xs col-sm">
						<div className="row">
							<div className="col-xl col-lg col-md col-xs col-sm ">
								<label className="f-fm fm-w7-s18 color-00">MEDIA</label>
							</div>
						</div>
						<div className="row">
							<div className="col-xl col-lg col-md col-xs col-sm ">
								<label
									className="f-fm fm-w5-s14 color-00"
									style={{ marginTop: "-5px", paddingTop: "10px" }}
								>
									{" "}
									Your treatment should reflected in the photo and photos you
									upload.You can enhance the attraction of the media by
									bueatifying them,but do not make them bogus or exaggerated.
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
						<div className="row  pt-3 pb-4">
							<div className="col-xl-4 col-lg-4 col-md-4 col-xs-4 col-sm-4 align-items-center d-flex">
								<label
									className="f-fm fm-w5-s18 color-40 "
									style={{ marginBottom: "-80px" }}
								>
									Photos
								</label>
							</div>
							<div className="row">
								<div className="col-xl-4 col-lg-4 col-md-4 col-xs-4 col-sm-4">
									<label
										className={`f-fm fm-w5-s12 color-7  ${req.req8}`}
										style={{ paddingTop: "50px" }}
									>
										At least 2 Photos
										<br />
									</label>
								</div>

								<div
									className="col-xl-8 col-lg-8 col-md-8 col-xs-8 col-sm-8 "
									style={{ paddingLeft: "0px" }}
								>
									<Dragcropmodal
										onImageChange={onImageChange}
										onImageChange2={onImageChange2}
										border1={valid}
									></Dragcropmodal>
								</div>
							</div>
						</div>
						<div className="row  pt-3 pb-4">
							<div className="col-xl-4 col-lg-4 col-md-4 col-xs-4 col-sm-4 align-items-center d-flex">
								<label
									className="f-fm fm-w5-s18 color-40 "
									style={{ marginBottom: "-60px" }}
								>
									Videos
								</label>
							</div>

							<div className="row">
								<div
									className="col-xl-4 col-lg-4 col-md-4 col-xs-4 col-sm-4 "
									style={{ paddingTop: "40px" }}
								>
									<label className="f-fm fm-w5-s12 color-7 ">(optional)</label>
									<br></br>
									<label className="f-fm fm-w5-s12 color-7 ">
										No more than 20sec
									</label>
								</div>
								<div
									className="col-xl-4 col-lg-4 col-md-4 col-xs-4 col-sm-4 "
									style={{ paddingLeft: "0px" }}
								>
									<Cropmodal2 onVideoChange={onVideoChange}></Cropmodal2>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="row" style={{ padding: "20px" }}>
					<div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1 ">
						<img alt="doctorlogo" src="./images/doctorlogo.png" />
					</div>
					<div className="col-xl col-lg col-md col-xs col-sm">
						<div className="row">
							<div className="col-xl col-lg col-md col-xs col-sm">
								<label className="f-fm fm-w7-s18 color-00">DOCTOR</label>
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
						<div className="row  pt-3 pb-4">
							<div
								className="col-xl-4 col-lg-4 col-md-4 col-xs-4 col-sm-4  "
								style={{ paddingTop: "20px" }}
							>
								<label className={`f-fm fm-w5-s16 color-40  ${req.req7}`}>
									Asign to
								</label>
							</div>
							<div
								className="col-xl col-lg col-md col-xs col-sm"
								style={{ paddingLeft: "0px" }}
							>
								<>
									<Customdropdownfour
										name="type"
										asigndoctor={getValue}
										border1={valid}
										doctors={team}
									></Customdropdownfour>
								</>
							</div>
						</div>
					</div>
				</div>
				<div className="row" style={{ padding: "20px" }}>
					<div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1"></div>
					<div className="col-xl col-lg col-md col-xs col-sm">
						<div className="row">
							<div className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2">
								<button
									style={{
										border: "1px solid #000000",
										borderRadius: "31.5px",
										width: "200px",
										height: "60px",
										backgroundColor: "#ffffff",
									}}
									onClick={() => {
										confirm("Disabled");
									}}
								>
									<label
										className="f-fm fm-w6-s18 color-00"
										style={{
											display: "flex",
											justifyContent: "center",
											cursor: "pointer",
										}}
									>
										Save and Exit
									</label>
								</button>
							</div>

							<div className="col-xl col-lg col-md col-xs col-sm">
								<button
									className="btnresponsive"
									style={{
										border: "1px solid #000000",
										borderRadius: "31.5px",
										width: "200px",
										height: "60px",
										float: "right",
										background: "#000000",
									}}
									onClick={() => {
										confirm("Enabled");
									}}
								>
									{" "}
									<label
										className="f-fm fm-w6-s18 color-FF"
										style={{
											display: "flex",
											justifyContent: "center",
											cursor: "pointer",
										}}
									>
										Confirm
									</label>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default NewTreatment;
