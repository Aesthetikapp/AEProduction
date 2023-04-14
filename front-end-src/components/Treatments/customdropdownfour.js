import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const DropDownContainer = styled("div")``;
const DropDownHeader = styled("div")``;
const DropDownListContainer = styled("div")``;
const DropDownList = styled("ul")``;
const ListItem = styled("li")``;

const Customdropdownfour = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState([]);
	const [options, setOptions] = useState([]);
	const [temparray, setTemparay] = useState([]);
	const [rightmark, setRightmark] = useState("none");

	useEffect(() => {
		Object.values(props.doctors).forEach((doc) => {
			if (!temparray.includes(doc.id)) {
				temparray.push(doc.id);
				if (doc.complete === "complete") {
					setOptions((prev) => [...prev, doc]);
				}
			}
		});
	}, [props.doctors]);

	const toggling = () => setIsOpen(!isOpen);
	const catmenu = useRef(null);
	const handlemousedown = (e) => {
		if (catmenu.current && isOpen && !catmenu.current.contains(e.target)) {
			setIsOpen(false);
		}
	};
	document.addEventListener("mousedown", handlemousedown);
	const onOptionClicked = (value) => () => {
		setSelectedOption((prev) => [...prev, value]);
		setIsOpen(false);
		setOptions((current) =>
			current.filter((k) => {
				return k.id !== value.id;
			})
		);
	};

	const reset = (value) => {
		setOptions((prev) => [...prev, value]);
		setSelectedOption((current) =>
			current.filter((k) => {
				return k.id !== value.id;
			})
		);
		setRightmark("none");
		props.asigndoctor("asigndoctor", selectedOption);
	};

	const right = (value) => {
		if (rightmark === "none") {
			setRightmark("block");
			Object.values(options).forEach((e) => {
				setSelectedOption((prev) => [...prev, e]);
				setIsOpen(false);
				setOptions((current) =>
					current.filter((k) => {
						return k.id !== e.id;
					})
				);
			});
		} else {
			setRightmark("none");
			Object.values(selectedOption).forEach((e) => {
				setOptions((prev) => [...prev, e]);
				setSelectedOption((current) =>
					current.filter((k) => {
						return k.id !== e.id;
					})
				);
			});
		}

		props.asigndoctor("asigndoctor", selectedOption);
	};
	useEffect(() => {
		props.asigndoctor("asigndoctor", selectedOption);
	}, [selectedOption, props]);

	const defaultsrc = (ev) => {
		ev.target.src = "../images/avatar.png";
	};
	return (
		<div ref={catmenu}>
			<DropDownContainer className="customdropmain">
				<DropDownHeader
					onClick={toggling}
					className={`form-select form-select-lg mb-3  ${props.border1.red7}`}
					style={{ borderRadius: "10px", height: "50px",backgroundColor: props.ttype === "edit" ? "#ebebeb7a" : "", }}
				>
					{selectedOption.length > 0 && (
						<div>
							{/* {Object.values(selectedOption).map((k) => (
								<p
									key={k.id}
									className="f-fm fm-w6-s16 color-00 customdropdownheaderselected"
									style={{ paddingTop: "5px", color: "#777777" }}
								>
									{k.firstName}&nbsp;&nbsp;&nbsp;
									<label
										onClick={() => {
											reset(k);
										}}
										style={{
											color: "#ACACAC",
											cursor: "pointer",
											paddingLeft: "3px",
										}}
									>
										X
									</label>
								</p>
							))} */}
							{Object.values(selectedOption)
								.slice(0, 2)
								.map((k) => (
									<p
										key={k.id}
										className="f-fm fm-w6-s16 color-00 customdropdownheaderselectedthree"
										style={{ paddingTop: "5px", color: "#777777" }}
									>
										<img
											onError={(e) => {
												e.target.src = "../images/avatar.png";
											}}
											alt="avatar"
											src={k.avatar}
											style={{
												height: "20px",
												width: "20px",
												borderRadius: "50%",
												marginTop: "-3px",
											}}
										></img>
										&nbsp;&nbsp;&nbsp;{k.firstName}&nbsp;&nbsp;&nbsp;
										<label
											onClick={() => {
												reset(k);
											}}
											style={{
												color: "#ACACAC",
												cursor: "pointer",
												paddingLeft: "3px",
											}}
										>
											X
										</label>
									</p>
								))}
							&nbsp;
							{selectedOption.length > 2 && (
								<label
									style={{
										// display: "flex",
										height: "26px",
										width: "26px",
										border: "1px solid #777777",
										borderRadius: "50%",
										verticalAlign: "middle",
									}}
								>
									<p
										style={{
											fontFamily: "Mulish",
											margin: "auto",
											verticalAlign: "middle",
											paddingTop: "2px",
										}}
										className="fm-w6-s12"
									>
										+ {selectedOption.length - 2}
									</p>
								</label>
							)}
						</div>
					)}
					{selectedOption.length === 0 && (
						<p
							className="f-fm fm-w4-s16 color-7 "
							style={{ paddingTop: "5px" }}
						>
							Select A Doctor
						</p>
					)}
				</DropDownHeader>
				{isOpen && (
					<div style={{ position: "relative" }}>
						<DropDownListContainer className="customdropcontainerfour">
							<div
								style={{
									backgroundColor: "#F4F4F4",
									height: "50px",
									display: "flex",
									alignItems: "center",
									color: "#777777",
									paddingLeft: "35px",
									cursor: "pointer",
								}}
								className="f-fm fm-w6-s16"
								onClick={right}
							>
								{rightmark === "block" ? "Assigned" : "Assign"} to all
								doctors&nbsp;({temparray.length})
								<label style={{ paddingLeft: "50%", display: rightmark }}>
									<img src="./images/Vector 14.png" alt="" />
								</label>
							</div>
							<div style={{ paddingTop: "20px", paddingLeft: "25px" }}>
								{Object.values(selectedOption)
									.slice(2, selectedOption.length)
									.map((k) => (
										<>
											<p
												key={k.id}
												className="f-fm fm-w6-s16 color-00 customdropdownheaderselectedthree"
												style={{ paddingTop: "5px", color: "#777777" }}
											>
												<img
													alt="avatar"
													src={k.avatar}
													style={{
														height: "20px",
														width: "20px",
														borderRadius: "50%",
														marginTop: "-3px",
													}}
												></img>
												&nbsp;&nbsp;&nbsp;{k.firstName}&nbsp;&nbsp;&nbsp;
												<label
													onClick={() => {
														reset(k);
													}}
													style={{
														color: "#ACACAC",
														cursor: "pointer",
														paddingLeft: "3px",
													}}
												>
													X
												</label>
											</p>
											<div style={{ paddingTop: "10px" }}></div>
										</>
									))}
							</div>
							<div className="row">
								<div className="col">
									<hr
										style={{
											color: "rgb(149 142 142)",
											backgroundColor: "#000000",
											height: 2,
										}}
									/>
								</div>
							</div>
							<DropDownList className="customdropfour">
								{Object.values(options).map((k) => (
									<ListItem
										key={k.id}
										className="f-fm fm-w6-s16 color-00 customdroplistitemtwo"
										style={{ cursor: "pointer", color: "#777777" }}
										onClick={onOptionClicked(k)}
										value={k}
									>
										<img
											alt="avatar"
											src={k.avatar}
											style={{
												height: "30px",
												width: "30px",
												borderRadius: "50%",
											}}
										></img>
										<label style={{ paddingLeft: "25px", cursor: "pointer" }}>
											{k.firstName}
										</label>
									</ListItem>
								))}
							</DropDownList>
						</DropDownListContainer>
					</div>
				)}
			</DropDownContainer>
		</div>
	);
};

export default Customdropdownfour;
