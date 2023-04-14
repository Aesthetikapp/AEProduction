import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const DropDownContainer = styled("div")``;
const DropDownHeader = styled("div")``;
const DropDownListContainer = styled("div")``;
const DropDownList = styled("ul")``;
const ListItem = styled("li")``;

const Customdropdowntwo = (props) => {
	const options = props.options;
	const [tempOptions, setTempOptions] = useState(options);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);
	const toggling = () => setIsOpen(!isOpen);

	useEffect(() => {
		if (props.options.length === 0) {
			setSelectedOption(null);
			setTempOptions([]);
		}
		setTempOptions(props.options);
	}, [props]);
	const catmenu = useRef(null);
	const handlemousedown = (e) => {
		if (catmenu.current && isOpen && !catmenu.current.contains(e.target)) {
			setIsOpen(false);
		}
	};
	document.addEventListener("mousedown", handlemousedown);
	const onOptionClicked = (value) => () => {
		setSelectedOption(value);
		props.bodyarea("bodyarea", value);
		setIsOpen(false);
	};
	const reset = () => {
		setSelectedOption(false);
		props.bodyarea("bodyarea", "");
		props.bodyarea("treatmentname", "");
	};

	const handleSearch = (value) => {
		console.log(value);
		if (value) {
			let data = tempOptions.filter((el) => el.includes(value));
			console.log("data", data);
			setTempOptions(data);
		} else {
			setTempOptions(options);
		}
	};

	return (
		<>
			<div ref={catmenu}>
				<DropDownContainer className="customdropmain">
					<DropDownHeader
						onClick={toggling}
						className={`form-select form-select-lg mb-3  ${props.border1.red2}`}
						style={{
							borderRadius: "10px",
							height: "50px",
							backgroundColor: props.ttype === "edit" ? "#ebebeb7a" : "",
						}}
					>
						{selectedOption && (
							<p className="f-fm fm-w6-s14 color-7 customdropdownheaderselectedtwo">
								{selectedOption}&nbsp;&nbsp;&nbsp;
								<label
									onClick={reset}
									style={{ color: "white", cursor: "pointer" }}
								>
									X
								</label>{" "}
							</p>
						)}
						{!selectedOption && (
							<p
								className="f-fm fm-w4-s16 color-7"
								style={{ paddingTop: "5px" }}
							>
								{props.ttype === "edit"
									? props.ttypetext
									: "Select A Body Type"}
							</p>
						)}
					</DropDownHeader>
					{isOpen && (
						<div style={{ position: "relative" }}>
							<DropDownListContainer className="customdropcontainer">
								<input
									onChange={(event) => handleSearch(event.target.value)}
									style={{
										width: "251px",
										height: "35px",
										border: "1px solid #D6D6D6",
										borderRadius: "22.5px",
										paddingLeft: "10px",
										marginLeft: "40px",
									}}
									type="text"
								/>

								<DropDownList className="customdroptwonew">
									{tempOptions.map((k) => (
										<ListItem
											key={k}
											className="f-fm fm-w6-s14 color-7 customdroplistitemtwo"
											onClick={onOptionClicked(k)}
											value={k}
										>
											{k}
										</ListItem>
									))}
								</DropDownList>
								<label
									className=" f-fm fm-w4-s16 color-7 "
									style={{ paddingLeft: "30px" }}
								>
									<b>Note</b>:If you can't find required body type{" "}
									<span
										onClick={props.onClickChangetwo}
										style={{ textDecoration: "underline", cursor: "pointer" }}
									>
										Click Here
									</span>
								</label>
								<br />
								<br />
							</DropDownListContainer>
						</div>
					)}
				</DropDownContainer>
			</div>
		</>
	);
};
export default Customdropdowntwo;
