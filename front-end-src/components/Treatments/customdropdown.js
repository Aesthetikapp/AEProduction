import React, { useState, useRef } from "react";
import styled from "styled-components";

const DropDownContainer = styled("div")``;
const DropDownHeader = styled("div")``;
const DropDownListContainer = styled("div")``;
const DropDownList = styled("ul")``;
const ListItem = styled("li")``;

const Customdropdown = (props) => {
	const options = props.options;
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);

	const toggling = () => setIsOpen(!isOpen);
	const catmenu = useRef(null);
	const handlemousedown = (e) => {
		if (catmenu.current && isOpen && !catmenu.current.contains(e.target)) {
			setIsOpen(false);
		}
	};
	document.addEventListener("mousedown", handlemousedown);

	const onOptionClicked = (value) => () => {
		setSelectedOption(value);
		props.treatmentype("treatmenttype", value);
		setIsOpen(false);
	};
	const reset = () => {
		setSelectedOption(null);
		props.treatmentype("treatmenttype", "");
		props.treatmentype("bodyarea", "");
		props.treatmentype("treatmentname", "");
	};

	return (
		<div ref={catmenu}>
			<DropDownContainer className="customdropmain">
				<DropDownHeader
					onClick={toggling}
					className={`treatmenttype form-select form-select-lg mb-3  ${props.border1.red1}`}
					style={{
						borderRadius: "10px",
						height: "50px",
						backgroundColor: props.ttype === "edit" ? "#ebebeb7a" : "",
					}}
				>
					{selectedOption && (
						<p className="treatmenttype f-fm fm-w6-s14 color-7 customdropdownheaderselected">
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
							className="treatmenttype f-fm fm-w4-s16 color-7 "
							style={{ paddingTop: "5px" }}
						>
							{props.ttype === "edit" ? props.ttypetext : "Select A Type"}
						</p>
					)}
				</DropDownHeader>
				{isOpen && (
					<div style={{ position: "relative" }}>
						<DropDownListContainer className="treatmenttype customdropcontainer">
							<DropDownList className="treatmenttype customdrop">
								{options.map((k) => (
									<ListItem
										key={k}
										className="f-fm fm-w6-s14 color-7 customdroplistitem"
										style={{ cursor: "pointer" }}
										onClick={onOptionClicked(k)}
										value={k}
									>
										{k}
									</ListItem>
								))}
							</DropDownList>
							<label
								className=" f-fm fm-w4-s16 color-7 "
								style={{ paddingLeft: "40px" }}
							>
								<b>Note</b>:If you can't find required treatment type{" "}
								<span
									onClick={props.onClickChange}
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
	);
};
export default Customdropdown;
