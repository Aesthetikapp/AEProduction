import React, { useState, useEffect, useRef } from "react";
import * as utils from "../../common/util";
import { Animated } from "react-animated-css";
import { GetGlobalTreatments } from "../../services/treatments";
import TreatmentList from "./treatmentlist";
import { useLocation, useNavigate } from "react-router-dom";
import * as TreatmentService from "../../services/treatments";
import * as UserServices from "../../services/user";
import * as PatientServices from "../../services/patient";

const Treatment = () => {
	const navigate = useNavigate();
	const params = useLocation().state;
	console.log("paarams", params);
	const firstupdate = useRef(true);
	const [treatments, setTreatments] = useState([]);
	const [initialTreatments, setinitialTreatments] = useState([]);
	const [ealcategoryArray] = useState([]);
	const [ealdurationArray] = useState([]);
	const [ealassigneddoctors, setEalAssignedDoctors] = useState([]);
	const [dalcategoryArray] = useState([]);
	const [daldurationArray] = useState([]);
	const [dalassigneddoctors] = useState([]);
	const [eal, setEal] = useState({ count: 0 });
	const [dal, setDal] = useState({ count: 0 });
	const [checked, setCheck] = useState(false);
	const [sold, setSold] = useState([]);

	useEffect(() => {
		const map1 = new Map();
		PatientServices.GetAllAppointments().then(function (result) {
			result.appointment.filter((currentValue, index, arr) => {
				currentValue.treatmentid[0].split(",").forEach((ids, index) => {
					if (map1.has(ids)) {
						map1.set(
							ids,
							parseInt(map1.get(ids)) +
								parseInt(currentValue.finalsyringes.split(",")[index])
						);
					} else {
						map1.set(
							ids,
							parseInt(currentValue.finalsyringes.split(",")[index])
						);
					}
				});
				return map1;
			});
			setSold(map1);
		});

		if (firstupdate.current || checked) {
			(async function anyNameFunction() {
				var duplicate = false;
				var defaulttreatments = await GetGlobalTreatments();
				if (params.isadmin) {
					let i = 1;
					defaulttreatments.globaltreatments.forEach((treat) => {
						duplicate = false;
						treatments.forEach((t) => {
							if (t.photo1 === treat.photo1) {
								duplicate = true;
							}
						});

						if (treat.userid === params.id && !duplicate) {
							console.log(treat);
							console.log(treatments);
							treatments.push(treat);
						}
						i = i + 1;
					});
				} else {
					defaulttreatments.globaltreatments.forEach((treat) => {
						treatments.forEach((t) => {
							if (t.photo1 === treat.photo1) {
								duplicate = true;
							}
						});
						if (
							treat.assigneddoctors.length > 0 &&
							treat.assigneddoctors[0].includes(params.id) &&
							!duplicate
						) {
							console.log(treat);
							console.log(treatments);
							treatments.push(treat);
						}
					});
				}
				// console.log("tttt2", treatments);
				setinitialTreatments(treatments);
				var darr = treatments.filter(function (elem) {
					//return false for the element that matches both the name and the id
					return !(elem.active === "Enabled");
				});

				var earr = treatments.filter(function (elem) {
					//return false for the element that matches both the name and the id
					return elem.active === "Enabled";
				});

				setEal({ count: earr.length });
				setDal({ count: darr.length });
				// console.log("@catarray", categoryArray);
				var catearr = earr.forEach(function (elem) {
					if (elem.active === "Enabled") {
						if (!ealcategoryArray.includes(elem.bodyarea)) {
							ealcategoryArray.push(elem.bodyarea);
						}
					}
				});
				// console.log("@catarray", ealcategoryArray);

				var catearr = darr.forEach(function (elem) {
					if (elem.active === "Disabled") {
						if (!dalcategoryArray.includes(elem.bodyarea)) {
							dalcategoryArray.push(elem.bodyarea);
						}
					}
				});
				console.log("@dalarray", dalcategoryArray);

				var durearr = earr.forEach(function (elem) {
					if (elem.active === "Enabled") {
						if (!ealdurationArray.includes(elem.duration)) {
							ealdurationArray.push(elem.duration);
						}
					}
				});
				console.log("@ealdurationArray", ealdurationArray);

				var durearr = darr.forEach(function (elem) {
					if (elem.active === "Disabled") {
						if (!daldurationArray.includes(elem.duration)) {
							daldurationArray.push(elem.duration);
						}
					}
				});
				// console.log("@ealdurationArray", daldurationArray);
				// console.log("@ealassigneddoctors", ealassigneddoctors);

				var doctorearr = darr.forEach(function (elem) {
					if (elem.active === "Disabled") {
						if (!dalassigneddoctors.includes(elem.assigneddoctor)) {
							dalassigneddoctors.push(elem.assigneddoctor);
						}
					}
				});
				// console.log("@ealdurationArray", dalassigneddoctors);
				firstupdate.current = false;

				let clinic = params.clinicname;
				UserServices.getDoctors(clinic).then(function (result) {
					// console.log("doctors", result.data.usersByClinicName);
					// console.log("m", params);
					let tempArray = [];
					if (params.isadmin) {
						setEalAssignedDoctors(result.data.usersByClinicName);
					} else {
						var doctorearr = result.data.usersByClinicName.forEach(function (
							elem
						) {
							if (elem.email === params.email) {
								tempArray.push(elem);
							}
							console.log("temparray", tempArray);
							setEalAssignedDoctors(tempArray);
						});
					}
				});
				console.log("@ealassigneddoctors", ealassigneddoctors);
			})();
		}
	}, [checked]);
	console.log("final", sold);

	const handleSearch = (value) => {
		if (value) {
			let data = initialTreatments.filter((el) =>
				(
					el.duration +
					el.bodyarea.toLowerCase() +
					el.description.toLowerCase() +
					el.quantitysold +
					el.pricepersyring +
					el.sellingprice +
					el.treatmentname.toLowerCase()
				).includes(value.toLowerCase())
			);
			console.log("data", data);
			setTreatments(data);
		} else {
			setTreatments(initialTreatments);
		}
	};

	const clearFilter = () => {
		setTreatments(initialTreatments);
	};

	const [tempArray, setTempdArray] = useState([]);
	const [sortArray, setSortArray] = useState(null);

	const sortByFilter = (event) => {
		console.log("rhh", event);

		setTempdArray([]);
		initialTreatments.forEach((item, i) => {
			if (item.duration === event) {
				tempArray.push(item);
			}
			if (item.bodyarea === event) {
				tempArray.push(item);
			}
			if (event !== undefined && event.length === 24) {
				if (item.assigneddoctors[0].split(",").includes(event)) {
					tempArray.push(item);
				}
			}
			if (event === "Least seller") {
				let res = initialTreatments.sort((a, b) =>
					a.quantitysold > b.quantitysold ? 1 : -1
				);
				setTreatments(res);
				return;
			}
			if (event === "Top seller") {
				let res = initialTreatments.sort((a, b) =>
					a.quantitysold < b.quantitysold ? 1 : -1
				);
				setTreatments(res);
				return;
			}
			if (event === "A - Z") {
				let res = initialTreatments.sort((a, b) =>
					a.treatmentname > b.treatmentname ? 1 : -1
				);
				setTreatments(res);
				return;
			}
			if (event === "Z - A") {
				let res = initialTreatments.sort((a, b) =>
					a.treatmentname < b.treatmentname ? 1 : -1
				);
				setTreatments(res);
				return;
			}
			if (event === "First created") {
				let sortedActivities = initialTreatments.sort(
					(a, b) => new Date(a.createdate) - new Date(b.createdate)
				);
				setTreatments(sortedActivities);
				return;
			}
			if (event === "Late created") {
				let sortedActivities = initialTreatments.sort(
					(a, b) => new Date(b.createdate) - new Date(a.createdate)
				);
				setTreatments(sortedActivities);
				return;
			}
			if (event === "First updated") {
				let sortedActivities = initialTreatments.sort(
					(a, b) => new Date(a.updatedate) - new Date(b.updatedate)
				);
				setTreatments(sortedActivities);
				return;
			}
			if (event === "Late updated") {
				let sortedActivities = initialTreatments.sort(
					(a, b) => new Date(b.updatedate) - new Date(a.updatedate)
				);
				setTreatments(sortedActivities);
				return;
			}

			console.log(tempArray);
			setTreatments(tempArray);
			setSortArray(tempArray);
			if (event === undefined) {
				setTreatments(initialTreatments);
			}
		});
	};
	const navigatetopage = (path, obj) => {
		params["page"] = obj;
		console.log("navigatetopage " + path, params, "obj ", obj);

		navigate(path, { state: params });
	};
	
	const disableTreatmentHandler = (id, active) => {
		var Ids;
		TreatmentService.GetAllTreatmentIds().then((data1) => {
			console.log("data", data1);
			Ids = data1;

			if (Ids.includes(id)) {
				alert(
					"You cannot disable treatment(s) that are booked for appointment/consultation !"
				);
				return;
			}
			const data = new FormData();
			data.append("id", id);
			data.append("active", active);
			var object = {};
			data.forEach((value, key) => (object[key] = value));

			const updatestr = TreatmentService.returnUpdateVariables(object);
			console.log(updatestr);
			TreatmentService.DisableTreatment(updatestr);

			window.location.reload();
		});
	};

	const deleteTreatmentHandler = (id) => {
		const data = new FormData();
		data.append("id", id);
		TreatmentService.DeleteTreatment(id).then(function (result) {
			console.log(result);
			if (result.data.delete.id) {
				window.location.reload();
			}
		});
	};

	return (
		<>
			<Animated
				style={{
					height: "100%",
					bottom: "0px",
					left: "0px",
					display: "grid",
					alignItems: "center",
					minHeight: "100%",
					color: "#FFFFFF",
					textAlign: "center",
					verticalAlign: "middle",
				}}
				animationIn="slideInDown"
				animationOut="fadeOutDown"
				animationInDuration={1000}
				animationOutDuration={1000}
				isVisible={true}
			>
				<div
					style={{
						backgroundColor: "#F9F9FB",
						overflowX: "hidden",
						position: "relative",
						minHeight: "100%",
					}}
				>
					<utils.AeNav
						clinicname={params?.clinicname || params.mpage?.clinicname}
						userid={params?.firstName || params.mpage?.firstName}
						avatar={params?.avatar || params.mpage?.avatar}
						page="treatments"
						goto={navigatetopage}
						params={params}
					/>
					<div className="row container-fluid dashboard pl-4">
						<TreatmentList
							sold={sold}
							treatments={treatments}
							search={handleSearch}
							sort={sortByFilter}
							clearFilter={clearFilter}
							disableTreatmentHandler={disableTreatmentHandler}
							deleteTreatmentHandler={deleteTreatmentHandler}
							eal={eal}
							dal={dal}
							initial={initialTreatments}
							ealcategory={ealcategoryArray}
							ealduration={ealdurationArray}
							ealdoctor={ealassigneddoctors}
							dalcategory={dalcategoryArray}
							dalduration={daldurationArray}
							daldoctor={dalassigneddoctors}
							useremail={params?.email}
							userid={params?.id}
							clinicname={params?.clinicname}
							admin={params?.isadmin}
							change={(v) => {
								setCheck(v);
							}}
						/>
					</div>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
				</div>
			</Animated>
		</>
	);
};

export default Treatment;
