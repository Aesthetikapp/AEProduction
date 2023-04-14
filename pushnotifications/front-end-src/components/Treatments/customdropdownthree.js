import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const DropDownContainer = styled("div")``;
const DropDownHeader = styled("div")``;
const DropDownListContainer = styled("div")``;
const DropDownList = styled("ul")``;
const ListItem = styled("li")``;

const Customdropdownthree = (props) => {
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
		setIsOpen(false);
		setSelectedOption(value);
		props.treatmentname("treatmentname", value);
	};
	useEffect(() => {
		if (props.options.length === 0) {
			setSelectedOption(null);
		}
	}, [props]);
	return (
		<div ref={catmenu}>
			<DropDownContainer className="customdropmain">
				<DropDownHeader
					onClick={toggling}
					className={`form-select form-select-lg  ${props.border1.red9}`}
					style={{
						borderRadius: "10px",
						height: "50px",
						backgroundColor: props.ttype === "edit" ? "#ebebeb7a" : "",
					}}
				>
					{selectedOption && (
						<p className="f-fm fm-w6-s14 color-7" style={{ paddingTop: "5px" }}>
							{selectedOption}{" "}
						</p>
					)}
					{!selectedOption && (
						<p className="f-fm fm-w4-s16 color-7" style={{ paddingTop: "5px" }}>
							{props.ttype === "edit" ? props.ttypetext : "Select A Treatment"}
						</p>
					)}
				</DropDownHeader>
				{isOpen && (
					<div style={{ position: "relative" }}>
						<DropDownListContainer className="customdropcontainer">
							<DropDownList className="customdropthree">
								{options.map((k) => (
									<ListItem
										key={k}
										className="f-fm fm-w6-s14 color-7 customdroplistitemthree"
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
								<b>Note</b>:If you can't find required treatment name{" "}
								<span
									onClick={props.onClickChangethree}
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
export default Customdropdownthree;
