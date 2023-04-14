import React, { useEffect, useState, useLayoutEffect } from "react";
import { Baseurl } from "../../common/util";
import axios from "axios";

const baseurl = Baseurl() + "onboard-user/refresh";

export default function Onboardingrefresh() {
	const query = new URLSearchParams(window.location.search);
	const accountid = query.get("accountid");
	const ID = query.get("id");
	console.log(accountid);
	const [loader, setLoader] = useState(true);

	useLayoutEffect(() => {
		axios
			.post(baseurl, {
				accountId: accountid,
				id: ID,
			})
			.then((response) => {
				console.log("response", response);
				if (response.data) {
					window.location.href = response.data;
					// window.open(response.data, "_blank", "noopener,noreferrer");
				}
			})
			.catch((err) => console.log(err.message));
	}, []);

	return (
		<div>
			{loader === true && (
				<div className={loader === true ? "parentDisable" : ""} width="100%">
					<div className="overlay-box">
						<div class="spinner-border" role="status">
							<span class="sr-only">Loading...</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
