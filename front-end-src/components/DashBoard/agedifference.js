import React from "react";
import * as Utils from "../../common/util";
const AgeDifference = (props) => {
	// console.log("agedifference", props);

	const agearray = [
		[
			"18-30",
			((props.firstagerange / props.total) * 100).toFixed(2).replace(".00", ""),
		],
		[
			"31-35",
			((props.secondagerange / props.total) * 100)
				.toFixed(2)
				.replace(".00", ""),
		],
		[
			"36-40",
			((props.thirdagerange / props.total) * 100).toFixed(2).replace(".00", ""),
		],
		[
			"41-45",
			((props.fouragerange / props.total) * 100).toFixed(2).replace(".00", ""),
		],
		[
			"46-50",
			((props.fiveagerange / props.total) * 100).toFixed(2).replace(".00", ""),
		],
		[
			"50+",
			((props.sixagerange / props.total) * 100).toFixed(2).replace(".00", ""),
		],
	];

	return (
		<>
			{agearray.map(function (k, i) {
				return (
					<div
						key={i}
						style={{
							padding: "10px",
							paddingBottom: "6px",
						}}
					>
						<Utils.AeProgressAgeBar
							k={k}
							total={props.total}
						></Utils.AeProgressAgeBar>
					</div>
				);
			})}
		</>
	);
};

export default AgeDifference;
