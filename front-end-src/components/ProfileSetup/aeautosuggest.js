// import { lang } from "moment";
import React, { useState } from "react";
import AutoSuggest from "react-autosuggest";

const AeAutoSuggest = (props) => {
	console.log(props);
	let x = props;
	console.log(x);
	//x.map(y=>{console.log(y)});
	const companies = [
		{
			Company: "company1",
			Add: "Add1",
		},
		{
			Company: "company2",
			Add: "Add2",
		},
		{
			Company: "company3",
			Add: "Add3",
		},
		{
			Company: "company4",
			Add: "Add4",
		},
	];
	console.log(companies);
	console.log(props.props);
	//const lowerCasedCompanies = companies.map(language => language.toLowerCase());
	const [value, setValue] = useState("");
	const [suggestions, setSuggestions] = useState([]);

	const getSuggestions = (value) => {
		return props.props.filter((x) =>
			x.clinicname.trim().toLowerCase().startsWith(value.trim().toLowerCase())
		);
	};
	const renderSuggestions = (suggestion) => {
		let name =
			suggestion.clinicname === "Can't find your business ?"
				? "empty"
				: "notempty";
		console.log(name);
		if (name === "empty") {
			return (
				<span
					className="autonobusiness"
					onClick={() => {
						props.showNewClinic(true);
					}}
				>
					{suggestion.clinicname}
				</span>
			);
		} else {
			let path =
				suggestion.business[0].bavatar === "path"
					? process.env.REACT_APP_AWS_S3 + "business.png"
					: suggestion.business[0].bavatar;
			return (
				<span>
					<img
						loading="lazy"
						src={path}
						alt=".."
						style={{ borderRadius: "50%", height: "50px", width: "50px" }}
					></img>{" "}
					<span className="autoclinicname">
						{suggestion.clinicname}
						<br></br>
						<span className="autoaddress">
							{suggestion.business[0].location[0].line1}
						</span>
					</span>
				</span>
			);
		}
	};
	return (
		<div>
			<AutoSuggest
				suggestions={suggestions}
				onSuggestionsClearRequested={() => setSuggestions([])}
				onSuggestionsFetchRequested={({ value }) => {
					setValue(value);
					//console.log(getSuggestions(value));
					let c = getSuggestions(value);
					var obj = {};
					obj.clinicname = "Can't find your business ?";
					c.push(obj);
					console.log(c);
					setSuggestions(c);
				}}
				onSuggestionSelected={(_, { suggestionValue }) =>
					props.getvalue(suggestionValue)
				}
				getSuggestionValue={(suggestion) => suggestion.clinicname}
				renderSuggestion={(suggestion) => renderSuggestions(suggestion)}
				inputProps={{
					placeholder: "Type clinic name",
					value: value,
					onChange: (_, { newValue, method }) => {
						//console.log(newValue);
						setValue(newValue);
						props.getvalue(newValue);
					},
				}}
				highlightFirstSuggestion={true}
			/>
		</div>
	);
};
export default AeAutoSuggest;
