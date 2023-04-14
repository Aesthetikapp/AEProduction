import React, { useState } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const Revenue = (props) => {
	const [labels, setLabels] = useState(props.labels);

	ChartJS.register(
		CategoryScale,
		LinearScale,
		BarElement,
		Title,
		Tooltip,
		Legend
	);

	const options = {
		maintainAspectRatio: false,
		height: 100,
		responsive: true,
		scales: {
			x: {
				grid: {
					display: false,
					drawBorder: false,
					drawOnChartArea: false,
				},
				ticks: {
					font: {
						family: "mulish", // Your font family
						size: 14,
						weight: 400,
					},
					color: "#ACACAC",
				},
			},
			y: {
				grid: {
					display: false,
					drawBorder: false,
					drawOnChartArea: false,
				},
				ticks: {
					padding: 10,
					font: {
						family: "mulish", // Your font family
						size: 14,
						weight: 400,
					},
					color: "#ACACAC",
					beginAtZero: true,
					stepSize: 1000,
					callback: function (value, i) {
						if (value >= 3) {
							//var x = value = value-(1+i+1)
						}
						return "$" + value / 1000 + "k";
					},
				},
			},
		},
		plugins: {
			tooltip: {
				borderColor: "#E5E4E2",
				borderWidth: 2,
				backgroundColor: "#FFFFFF",
				titleFontColor: "#702963",
				callbacks: {
					labelTextColor: function (tooltipItem, chart) {
						return "#000000";
					},
					title: function (tooltipItem) {
						//console.log("maheshk", tooltipItem[0].label);
						//let title = tooltipItem[0].label;
						return tooltipItem[0].label;
					},
					label: function (context) {
						// console.log("mahesss", context);
						let label = context.dataset.label || "";

						if (label) {
							label += ": ";
						}
						if (context.parsed.y !== null) {
							label += new Intl.NumberFormat("en-US", {
								style: "currency",
								currency: "USD",
							}).format(context.parsed.y);
						}
						return " Revenue: " + label;
					},
				},
			},
			legend: { display: false },
			title: {
				align: "start",
				display: true,
				text: "",
			},
		},
	};

	const data = {
		labels,
		datasets: [
			{
				label: " ",
				// data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
				data: props.amount,
				backgroundColor: props.color,
				borderWidth: 0,
				borderRadius: 20,
				borderSkipped: false,
				barThickness: 11,
				maxBarThickness: 11,
			},
		],
	};

	return (
		<>
			{props.amount.every((item) => item === 0) && (
				<div style={{ position: "absolute", top: "25%", left: "40%" }}>
					No data found
				</div>
			)}
			<Bar options={options} data={data} />
		</>
	);
};

export default Revenue;
