import React from "react";
import { useNavigate } from "react-router-dom";
// import { Animated } from "react-animated-css";
// import * as utils from "../../common/util";
import * as UserServices from "../../services/user";
// import { Baseurl } from "../../common/util";
// import axios from "axios";

export default function Paymentdone() {
	const navigate = useNavigate();
	const query = new URLSearchParams(window.location.search);
	// console.log("query", query);
	const token = query.get("id");
	// console.log("token", token);
	// useEffect(() => {
	if (token !== null) {
		UserServices.GetUserById(token).then((value) => {
			console.log("req", value.userByID);
			if (value.userByID.payment.split("|")[1] === "pending") {
				// alert("Connecting account not completed");

				navigate("../payment", { state: value.userByID });
				return;
			} else {
				const updateVariables = UserServices.returnUpdateVariables({
					id: value.userByID.id,
					currentstep: "8",
					step: value.userByID.toString(),
					prevstep: value.userByID.toString(),
					// payment: "no payment",
				});
				console.log(updateVariables);
				UserServices.UpdateUser(updateVariables).then((val) => {
					console.log(val);
					navigate("../subscribe", { state: value.userByID });
					// axios
					// 	.post(baseurl, {
					// 		state: dstate.params,
					// 	})
					// 	.then((response) => {
					// 		console.log("response", response);
					// 		if (response.data) {
					// 			window.location.href = response.data;
					// 			// window.open(response.data, "_blank", "noopener,noreferrer");
					// 		}
					// 	})
					// 	.catch((err) => console.log(err.message));
				});
			}
			// setParams1({ ...params1, userByID: value.userByID });
		});
		// alert(token);
	}
	// }, [token]);
	return <div></div>;
}
