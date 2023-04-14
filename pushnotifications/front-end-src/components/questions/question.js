import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import * as QuestionService from "../../services/questions";

const Questions = (props) => {
	const [textarea, setTextarea] = useState("");
	const [advancesetting, setAdvancedsetting] = useState("textarea");
	const [parentanswer, setParentAnswer] = useState("");
	const [isrequired, setIsRequired] = useState(true);
	const [allquestions, setAllQuestions] = useState([]);
	const [allquestionsp, setAllQuestionsP] = useState([]);
	const [allquestionsc, setAllQuestionsc] = useState([]);
	const [updated, setUpdated] = useState("1");
	const [child, setChild] = useState("");
	const [noquestionid, setNoQuestionId] = useState("");
	const [yesquestionid, setYesQuestionId] = useState("");
	const [noanswer, setNoAnswer] = useState("");
	const [yesanswer, setYesAnswer] = useState("");
	const [mqid, setMQId] = useState("");
	const [dragId, setDragId] = useState();
	const [dragId1, setDragId1] = useState();
	const [rcp, setRCP] = useState({});
	var childIds = [];
	var q = [];
	async function fetchTodos() {
		try {
			const response = await QuestionService.GetQuestion();
			let qarray = response.questions.map(function (ele) {
				return { ...ele, parentid: "" };
			});
			let qarray1 = qarray;
			qarray1.map(function (ele) {
				if (ele.childquestionid != "") {
					// console.log("all eleid", ele.childquestionid + " " + ele.id);
					ele.childquestionid.split("|").map((h) => {
						qarray.map(function (ele1) {
							// console.log("all x " + h, ele1.id);
							if (h == ele1.id) {
								return (ele1.parentid = ele.id);
							}
						});
					});
				}
				//  return ele.Active='false';
			});
			setAllQuestions(qarray.sort((a, b) => a.order - b.order));
			setAllQuestionsP(
				qarray
					.filter((question) => question.parentid === "")
					.sort((a, b) => a.order - b.order)
			);
			setAllQuestionsc(
				qarray
					.filter((question) => question.parentid !== "")
					.sort((a, b) => a.order - b.order)
			);
			console.log(
				"all",
				"all ques ",
				allquestions,
				"qarray ",
				qarray,
				"qarray1 ",
				qarray1,
				"parentq ",
				qarray.filter((question) => question.parentid === ""),
				"childq ",
				qarray.filter((question) => question.parentid !== "")
			);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		if (updated === "1") {
			setUpdated("");
			fetchTodos();
		}
	}, [updated]);

	const handleDrag1 = (ev) => {
		setDragId1(ev.currentTarget.id);
	};

	const handleDrop1 = (ev) => {
		console.log("handledrop1....");
		ev.stopPropagation();
		var updatearray = [];
		var obj1 = {};
		var obj2 = {};
		const dragBox = allquestions.find((cques) => cques.id === dragId1);
		const dropBox = allquestions.find(
			(cques) => cques.id === ev.currentTarget.id
		);

		const dragBoxOrder = dragBox.order;
		const dropBoxOrder = dropBox.order;
		const newBoxState = allquestions.map((question) => {
			if (question.id === dragId1) {
				question.order = dropBoxOrder;
				obj1.id = question.id;
				obj1.order = question.order;
				updatearray.push(obj1);
			}
			if (question.id === ev.currentTarget.id) {
				question.order = dragBoxOrder;
				obj2.id = question.id;
				obj2.order = question.order;
				updatearray.push(obj2);
			}
			return question;
		});
		setAllQuestions(newBoxState.sort((a, b) => a.order - b.order));

		setAllQuestionsc(
			newBoxState
				.sort((a, b) => a.order - b.order)
				.filter((question) => question.parentid !== "")
				.sort((a, b) => a.order - b.order)
		);
		var c = QuestionService.returnMultiUpdateVariables(updatearray);
		QuestionService.UpdateMultiQuestion(c);
		setUpdated("1");
		console.log(newBoxState.sort((a, b) => a.order - b.order));
	};

	const handleDrag = (ev) => {
		setDragId(ev.currentTarget.id);
	};

	const handleDrop = (ev) => {
		console.log("handledrop....");
		var updatearray = [];
		var obj1 = {};
		var obj2 = {};
		const dragBox = allquestions.find((mques) => mques.id === dragId);
		const dropBox = allquestions.find(
			(mques) => mques.id === ev.currentTarget.id
		);

		const dragBoxOrder = dragBox.order;
		const dropBoxOrder = dropBox.order;
		const newBoxState = allquestions.map((question) => {
			if (question.id === dragId) {
				question.order = dropBoxOrder;
				obj1.id = question.id;
				obj1.order = question.order;
				updatearray.push(obj1);
			}
			if (question.id === ev.currentTarget.id) {
				question.order = dragBoxOrder;
				obj2.id = question.id;
				obj2.order = question.order;
				updatearray.push(obj2);
			}

			return question;
		});

		setAllQuestions(newBoxState.sort((a, b) => a.order - b.order));
		setAllQuestionsP(
			newBoxState
				.sort((a, b) => a.order - b.order)
				.filter((question) => question.parentid === "")
				.sort((a, b) => a.order - b.order)
		);
		var c = QuestionService.returnMultiUpdateVariables(updatearray);
		QuestionService.UpdateMultiQuestion(c);
		setUpdated("1");
		console.log(JSON.stringify(newBoxState.sort((a, b) => a.order - b.order)));
	};

	const setadvance = (e) => {
		console.log(e.target.value);
		setAdvancedsetting(e.target.value);
	};
	const setqvalue = (e, qid) => {
		console.log("mqid", e.target.checked, qid);
		if (e.target.checked === true) {
			if (mqid === "") {
				setMQId(qid);
			} else {
				setMQId(mqid + "|" + qid);
			}
		} else {
			setMQId(
				mqid
					.replace("|" + qid, "")
					.replace(qid + "|", "")
					.replace(qid, "")
			);
		}
	};
	//console.log("mqid", mqid);
	const submit = () => {
		var qid = noquestionid + "|" + yesquestionid;
		var qans = noanswer + "|" + yesanswer;
		qans = qans.replace(/\|/gi, "") === "" ? "" : qans;
		qid = qid.replace(/\|/gi, "") === "" ? "" : qid;
		qid = qid !== "" ? qid.replace(/(^\|)/gi, "").replace(/(\|$)/gi, "") : qid;
		qans =
			qans !== "" ? qans.replace(/(^\|)/gi, "").replace(/(\|$)/gi, "") : qans;

		if (mqid !== "") {
			qid = mqid;
			qans = "";
		}
		var qobj = {
			question: textarea,
			kind: advancesetting,
			childquestionid: qid,
			answer: qans,
			isrequired: isrequired,
			order: allquestions[allquestions.length - 1].order + 1,
		};

		var qvariables = QuestionService.returnCreateVariables(qobj);
		console.log(qvariables);
		QuestionService.CreateQuestion(qvariables);
		setUpdated("1");
		window.location.reload();
	};
	const radioChangeP = (e) => {
		console.log("i....", e.currentTarget.value, e.currentTarget.name);
		setRCP({
			...rcp,
			["" + e.target.name]: e.currentTarget.value,
		});
		console.log(rcp);
	};

	const renderChilds1 = (h, i, classn) => {
		return (
			<div
				style={{
					padding: "5px",
				}}
			>
				<div
					className={classn}
					draggable={true}
					onDragOver={(ev) => ev.preventDefault()}
					onDragStart={handleDrag1}
					onDrop={handleDrop1}
					key={"childq" + h.id}
					id={h.id}
				>
					<div
						style={{
							width: "100%",
						}}
					>
						<div>
							{h.order.toString().padStart(2, "0")}
							.)&nbsp; {h.question}
						</div>

						<span>
							{h.kind === "yes/no" && (
								<div>
									{returnRadio(h.answer === "yes" ? "true" : "false", h, "yes")}
									<span
										style={{
											paddingRight: "20px",
											paddingLeft: "4px",
										}}
									>
										Yes
									</span>
									{returnRadio(h.answer === "no" ? "true" : "false", h, "no")}
									<span
										style={{
											paddingRight: "20px",
											paddingLeft: "4px",
										}}
									>
										No
									</span>
								</div>
							)}
						</span>
						{h.kind === "textarea" && (
							<>
								<textarea></textarea>
							</>
						)}
					</div>
				</div>
			</div>
		);
	};

	const renderChilds = (h, i, classn) => {
		return (
			<div
				style={{
					padding: "5px",
				}}
			>
				<div
					className={classn}
					draggable={true}
					onDragOver={(ev) => ev.preventDefault()}
					onDragStart={handleDrag1}
					onDrop={handleDrop1}
					key={"childq" + h.id}
					id={h.id}
				>
					<div
						style={{
							width: "100%",
						}}
					>
						<div>
							{h.order.toString().padStart(2, "0")}
							.)&nbsp; {h.question}
						</div>

						<span>
							{h.kind === "yes/no" && (
								<div>
									{returnRadio(h.answer === "yes" ? "true" : "false", h, "yes")}
									<span
										style={{
											paddingRight: "20px",
											paddingLeft: "4px",
										}}
									>
										Yes
									</span>
									{returnRadio(h.answer === "no" ? "true" : "false", h, "no")}
									<span
										style={{
											paddingRight: "20px",
											paddingLeft: "4px",
										}}
									>
										No
									</span>
								</div>
							)}
						</span>
						{h.kind === "textarea" && (
							<>
								<textarea></textarea>
							</>
						)}
					</div>
					{
						<span>
							{allquestionsc
								.filter((question) => question.parentid === h.id)
								.map((h1) => renderChilds1(h1, h, "childq2 "))}
						</span>
					}
					<div style={{ height: "5px" }}></div>
				</div>
			</div>
		);
	};

	const returnRadio = (checked, i, value) => {
		return checked === "true" ? (
			<div className="custom-disabled">
				<input type="radio" name={i.id} id="l" value={value} checked disabled />
			</div>
		) : checked === "false" ? (
			<div className="custom-disabled1">
				<input type="radio" name={i.id} id="l" value={value} disabled />
			</div>
		) : (
			""
		);
	};
	return (
		<>
			<div className="row" style={{ backgroundColor: "white" }}>
				<div className="col-5">
					<h3>Questionaire</h3>
				</div>
				<div className="col-7">
					<h3>New Question</h3>
				</div>
			</div>
			<div className="row" style={{ backgroundColor: "white" }}>
				<div
					className="col-5"
					style={{
						backgroundColor: "#ffffff",
						// height: "660px",
						overflowY: "auto",
					}}
				>
					<div
						className="f-fm"
						style={{ paddingLeft: "10px", paddingBottom: "18px" }}
					></div>
					{allquestionsp.length > 0 &&
						allquestionsp.map(function (i, id) {
							return (
								<div
									className="f-fm"
									style={{ paddingLeft: "10px", paddingBottom: "5px" }}
								>
									{i.childquestionid !== "" && i.answer !== "" && (
										<div
											style={{
												paddingTop: "5px",
												paddingBottom: "5px",
												paddingLeft: "10px",
												paddingRight: "5px",
												display: "inline-block",
											}}
											className="f-fm mainq"
											draggable={true}
											onDragOver={(ev) => ev.preventDefault()}
											onDragStart={handleDrag}
											onDrop={handleDrop}
											key={"mainq" + i.id}
											id={i.id}
										>
											{i.order.toString().padStart(2, "0")}.)&nbsp;
											{i.question}
											<div>
												{i.kind === "yes/no" && (
													<div>
														{returnRadio(
															i.answer === "yes" ? "true" : "false",
															i,
															"yes"
														)}

														<span
															style={{
																paddingRight: "20px",
																paddingLeft: "4px",
															}}
														>
															Yes
														</span>
														{returnRadio(
															i.answer === "no" ? "true" : "false",
															i,
															"no"
														)}
														<span
															style={{
																paddingRight: "20px",
																paddingLeft: "4px",
															}}
														>
															No
														</span>
													</div>
												)}
											</div>
											{
												<span>
													{allquestionsc
														.filter((question) => question.parentid === i.id)
														.map((h) => renderChilds(h, i, "childq "))}
												</span>
											}
											<div style={{ height: "5px" }}></div>
										</div>
									)}
									{i.childquestionid !== "" && i.answer === "" && (
										<div
											style={{
												paddingTop: "5px",
												paddingBottom: "5px",
												paddingLeft: "10px",
												paddingRight: "5px",
												display: "inline-block",
											}}
											className="f-fm mainq"
											draggable={true}
											onDragOver={(ev) => ev.preventDefault()}
											onDragStart={handleDrag}
											onDrop={handleDrop}
											key={"mainq" + i.id}
											id={i.id}
										>
											{i.order.toString().padStart(2, "0")}.)&nbsp;
											{i.question}
											<span>
												{allquestionsc
													.filter((question) => question.parentid === i.id)
													.map((h) => renderChilds(h, i, "childq1 "))}
											</span>
											<div style={{ height: "5px" }}></div>
										</div>
									)}
									{i.childquestionid === "" &&
										i.parentid === "" &&
										i.answer === "" && (
											<>
												<div
													style={{
														paddingTop: "5px",
														paddingBottom: "5px",
														paddingLeft: "10px",
														paddingRight: "5px",
														display: "inline-block",
													}}
													className="f-fm mainqnochild"
													draggable={true}
													onDragOver={(ev) => ev.preventDefault()}
													onDragStart={handleDrag}
													onDrop={handleDrop}
													key={"mainq" + i.id}
													id={i.id}
												>
													<div>
														{i.order.toString().padStart(2, "0")}.)&nbsp;
														{i.question}
													</div>
													{i.kind === "yes/no" && (
														<div
															className="row"
															style={{ paddingLeft: "30px" }}
														>
															<div
																className="col-2"
																style={{
																	paddingRight: "20px",
																	paddingLeft: "4px",
																}}
															>
																{returnRadio(
																	i.answer === "yes" ? "true" : "false",
																	i,
																	"yes"
																)}
																Yes
															</div>

															<div
																className="col-2"
																style={{
																	paddingRight: "20px",
																	paddingLeft: "4px",
																}}
															>
																{returnRadio(
																	i.answer === "no" ? "true" : "false",
																	i,
																	"no"
																)}
																No
															</div>
														</div>
													)}
													{i.kind === "textarea" && (
														<>
															<textarea></textarea>
														</>
													)}
												</div>
											</>
										)}
									<div style={{ height: "5px" }}></div>
								</div>
							);
						})}
				</div>
				<div className="col-7">
					<div
						className="f-fm"
						style={{ paddingLeft: "10px", paddingBottom: "18px" }}
					></div>
					<div className="Col-8  cq">
						<div className="row">
							<div className="col-3">Question Text</div>
							<div className="col-8">
								<textarea
									className={`form-control form-control-lg `}
									style={{
										borderRadius: "10px",
									}}
									onChange={(e) => setTextarea(e.target.value)}
								></textarea>
							</div>
						</div>
						<div className="row" style={{ height: "15px" }}></div>
						<div className="row">
							<div className="col-3">question Type</div>
							<div className="col-8">
								{allquestions.length >= 1 && (
									<select onChange={setadvance} style={{ width: "100px" }}>
										<option value="yes/no">yes/no</option>
										<option value="textarea">textarea</option>
									</select>
								)}
								{allquestions.length <= 0 && (
									<select onChange={setadvance} style={{ width: "100px" }}>
										<option value="textarea">textarea</option>
									</select>
								)}
							</div>
						</div>
						{allquestions.length >= 1 && advancesetting === "yes/no" && (
							<>
								<div className="row" style={{ height: "15px" }}></div>
								<div className="row">
									<div className="col-3">
										<input
											type="radio"
											name="g1"
											onChange={(e) => {
												setChild(e.target.value);
											}}
											value="c"
										></input>
										&nbsp;Has child<br></br>
										<input
											type="radio"
											name="g1"
											onChange={(e) => {
												setChild(e.target.value);
											}}
											value="mc"
										></input>
										&nbsp;Has multi child
									</div>
									<div className="col-8">
										{child === "mc" && (
											<>
												<div
													className="row"
													style={{
														backgroundColor: "#ffffff",
														height: "200px",
														overflowY: "auto",
													}}
												>
													<div className="row">
														Select child questions from below
													</div>
													{allquestions.length >= 1 &&
														allquestions.map(function (i, id) {
															console.log("loop ", i, id);
															return (
																<div className="row">
																	<div className="col-1">
																		<input
																			key={"i" + id}
																			type="checkbox"
																			onChange={(e) => {
																				setqvalue(e, i.id);
																			}}
																		></input>
																	</div>
																	<div className="col">{i.question} </div>
																</div>
															);
														})}
												</div>
											</>
										)}
										{child === "c" && (
											<>
												<div className="row">
													Assign child question
													<select
														style={{ width: "220px" }}
														onChange={(e) => {
															setYesQuestionId(e.target.value);
															setYesAnswer(e.target.value !== "" ? "yes" : "");
														}}
													>
														<option value="">
															-- Select child question --
														</option>
														{allquestions.length >= 1 &&
															allquestions.map(function (i, id) {
																console.log("loop ", i, id);
																return (
																	<option key={"i" + id} value={i.id}>
																		{i.question}{" "}
																	</option>
																);
															})}
													</select>{" "}
													when answer is yes
												</div>
												<div className="row" style={{ height: "15px" }}></div>
												<div className="row">
													Assign child question
													<select
														style={{ width: "220px" }}
														onChange={(e) => {
															setNoQuestionId(e.target.value);
															setNoAnswer(e.target.value !== "" ? "no" : "");
														}}
													>
														<option value="">
															-- Select child question --
														</option>
														{allquestions.length >= 1 &&
															allquestions.map(function (i, id) {
																console.log("loop ", i, id);
																return (
																	<option key={"i" + id} value={i.id}>
																		{i.question}{" "}
																	</option>
																);
															})}
													</select>{" "}
													when answer is no
												</div>
											</>
										)}
									</div>
								</div>
							</>
						)}
						<div className="row" style={{ height: "15px" }}></div>
						<div className="row">
							<div className="col-5">
								<input type="checkbox" checked disabled></input>
								&nbsp;Required
							</div>
							<div className="col-6"></div>
						</div>
						<div className="row" style={{ height: "15px" }}></div>
						<div className="row">
							<div className="col-5">
								<button onClick={(e) => submit()}>Create Question</button>
							</div>
							<div className="col-6"></div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Questions;
