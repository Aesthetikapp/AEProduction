import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Deletealertpopup from "./deletealertpopup";

const Reopendisclosure = (props) => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [enable, setEnable] = useState(true);
	const [def, setDef] = useState(
		`IMPORTANT SAFETY INFORMATION & APPROVED USES
BOTOX® Cosmetic may cause serious side effects that can be life threatening. Get medical help right away if you have any of these problems any time (hours to weeks) after injection of BOTOX® Cosmetic:
Problems swallowing, speaking, or breathing, due to weakening of associated muscles, can be severe and result in loss of life. You are at the highest risk if these problems are pre-existing before injection. Swallowing problems may last for several months.
Spread of toxin effects. The effect of botulinum toxin may affect areas away from the injection site and cause serious symptoms including: loss of strength and all-over muscle weakness, double vision, blurred vision and drooping eyelids, hoarseness or change or loss of voice, trouble saying words clearly, loss of bladder control, trouble breathing, and trouble swallowing.

BOTOX® Cosmetic dosing units are not the same as, or comparable to, any other botulinum toxin product.

There has not been a confirmed serious case of spread of toxin effect when BOTOX® Cosmetic has been used at the recommended dose to treat frown lines, crow’s feet lines, and/or forehead lines.

BOTOX® Cosmetic may cause loss of strength or general muscle weakness, vision problems, or dizziness within hours to weeks of taking BOTOX® Cosmetic. If this happens, do not drive a car, operate machinery, or do other dangerous activities.

Serious and/or immediate allergic reactions have been reported. They include: itching, rash, red itchy welts, wheezing, asthma symptoms, or dizziness or feeling faint. Get medical help right away if you are wheezing or have asthma symptoms, or if you become dizzy or faint

Do not receive BOTOX® Cosmetic if you : are allergic to any of the ingredients in BOTOX® Cosmetic (see Medication Guide for ingredients); had an allergic reaction to any other botulinum toxin product such as Myobloc® (rimabotulinumtoxinB), Dysport® (abobotulinumtoxinA), or Xeomin® (incobotulinumtoxinA); have a skin infection at the planned injection site.

Tell your doctor about all your muscle or nerve conditions, such as ALS or Lou Gehrig’s disease, myasthenia gravis, or Lambert-Eaton syndrome, as you may be at increased risk of serious side effects including difficulty swallowing and difficulty breathing from typical doses of BOTOX® Cosmetic.

Tell your doctor about all your medical conditions, including: plans to have surgery; had surgery on your face; have trouble raising your eyebrows; drooping eyelids; any other abnormal facial change; are pregnant or plan to become pregnant (it is not known if BOTOX® Cosmetic can harm your unborn baby); are breast-feeding or plan to (it is not known if BOTOX® Cosmetic passes into breast milk).

Tell your doctor about all the medicines you take, including prescription and over-the-counter medicines, vitamins, and herbal supplements. Using BOTOX® Cosmetic with certain other medicines may cause serious side effects. Do not start any new medicines until you have told your doctor that you have received BOTOX® Cosmetic in the past.

Tell your doctor if you have received any other botulinum toxin product in the last 4 months; have received injections of botulinum toxin such as Myobloc®, Dysport®, or Xeomin® in the past (tell your doctor exactly which product you received); have recently received an antibiotic by injection; take muscle relaxants; take an allergy or cold medicine; take a sleep medicine; take aspirin-like products or blood thinners.

Other side effects of BOTOX® Cosmetic include : dry mouth; discomfort or pain at the injection site; tiredness; headache; neck pain; and eye problems: double vision, blurred vision, decreased eyesight, drooping eyelids and eyebrows, swelling of your eyelids and dry eyes.

APPROVED USES
BOTOX® Cosmetic is a prescription medicine that is injected into muscles and used to temporarily improve the look of moderate to severe forehead lines, crow’s feet lines, and frown lines between the eyebrows in adults.

For more information refer to the Medication Guide or talk with your doctor.

To report a side effect, please call Allergan at 1-800-678-1605.

Please see BOTOX® Cosmetic full Product Information including Boxed Warning and Medication Guide.`
	);
	const [constantdef] = useState(
		`IMPORTANT SAFETY INFORMATION & APPROVED USES
BOTOX® Cosmetic may cause serious side effects that can be life threatening. Get medical help right away if you have any of these problems any time (hours to weeks) after injection of BOTOX® Cosmetic:
Problems swallowing, speaking, or breathing, due to weakening of associated muscles, can be severe and result in loss of life. You are at the highest risk if these problems are pre-existing before injection. Swallowing problems may last for several months.
Spread of toxin effects. The effect of botulinum toxin may affect areas away from the injection site and cause serious symptoms including: loss of strength and all-over muscle weakness, double vision, blurred vision and drooping eyelids, hoarseness or change or loss of voice, trouble saying words clearly, loss of bladder control, trouble breathing, and trouble swallowing.

BOTOX® Cosmetic dosing units are not the same as, or comparable to, any other botulinum toxin product.

There has not been a confirmed serious case of spread of toxin effect when BOTOX® Cosmetic has been used at the recommended dose to treat frown lines, crow’s feet lines, and/or forehead lines.

BOTOX® Cosmetic may cause loss of strength or general muscle weakness, vision problems, or dizziness within hours to weeks of taking BOTOX® Cosmetic. If this happens, do not drive a car, operate machinery, or do other dangerous activities.

Serious and/or immediate allergic reactions have been reported. They include: itching, rash, red itchy welts, wheezing, asthma symptoms, or dizziness or feeling faint. Get medical help right away if you are wheezing or have asthma symptoms, or if you become dizzy or faint

Do not receive BOTOX® Cosmetic if you : are allergic to any of the ingredients in BOTOX® Cosmetic (see Medication Guide for ingredients); had an allergic reaction to any other botulinum toxin product such as Myobloc® (rimabotulinumtoxinB), Dysport® (abobotulinumtoxinA), or Xeomin® (incobotulinumtoxinA); have a skin infection at the planned injection site.

Tell your doctor about all your muscle or nerve conditions, such as ALS or Lou Gehrig’s disease, myasthenia gravis, or Lambert-Eaton syndrome, as you may be at increased risk of serious side effects including difficulty swallowing and difficulty breathing from typical doses of BOTOX® Cosmetic.

Tell your doctor about all your medical conditions, including: plans to have surgery; had surgery on your face; have trouble raising your eyebrows; drooping eyelids; any other abnormal facial change; are pregnant or plan to become pregnant (it is not known if BOTOX® Cosmetic can harm your unborn baby); are breast-feeding or plan to (it is not known if BOTOX® Cosmetic passes into breast milk).

Tell your doctor about all the medicines you take, including prescription and over-the-counter medicines, vitamins, and herbal supplements. Using BOTOX® Cosmetic with certain other medicines may cause serious side effects. Do not start any new medicines until you have told your doctor that you have received BOTOX® Cosmetic in the past.

Tell your doctor if you have received any other botulinum toxin product in the last 4 months; have received injections of botulinum toxin such as Myobloc®, Dysport®, or Xeomin® in the past (tell your doctor exactly which product you received); have recently received an antibiotic by injection; take muscle relaxants; take an allergy or cold medicine; take a sleep medicine; take aspirin-like products or blood thinners.

Other side effects of BOTOX® Cosmetic include : dry mouth; discomfort or pain at the injection site; tiredness; headache; neck pain; and eye problems: double vision, blurred vision, decreased eyesight, drooping eyelids and eyebrows, swelling of your eyelids and dry eyes.

APPROVED USES
BOTOX® Cosmetic is a prescription medicine that is injected into muscles and used to temporarily improve the look of moderate to severe forehead lines, crow’s feet lines, and frown lines between the eyebrows in adults.

For more information refer to the Medication Guide or talk with your doctor.

To report a side effect, please call Allergan at 1-800-678-1605.

Please see BOTOX® Cosmetic full Product Information including Boxed Warning and Medication Guide.`
	);

	const [mixed, setMixed] = useState(false);
	const handle = () => {
		setEnable(true);
		setShow(false);
	};
	const handleEntered = () => {
		setShowModal(false);
	};
	const handleDisclosureChange = (event) => {
		setGoback(event);
		setShowModal(false);
		setEnable(true);
		if (event === "Delete") {
			setShowModal(true);
		}
		if (event === "Edit") {
			setEnable(false);
		}
	};
	const [showmadal, setShowModal] = useState(false);
	const [goback, setGoback] = useState("");
	const handleChange = (event) => {
		setGoback(event);
		props.onDefaultChange({ defaulttemplete: def });
		setShow(false);
		setEnable(true);
	};
	const Clear = () => {
		setDef(constantdef);
		setShow(false);
	};
	const Optionchange = (event) => {
		setGoback(event);
	};
	return (
		<>
			{showmadal && (
				<Deletealertpopup
					Clear={Clear}
					handleEntered={handleEntered}
					Optionchange={Optionchange}
				></Deletealertpopup>
			)}
			<div
				className="col-xl col-lg col-md col-xs col-sm"
				style={{ float: "right", paddingTop: "4px", cursor: "pointer" }}
				onClick={handleShow}
			>
				<img src="./images/pdfdisclosure.png" alt="pdf"></img>
			</div>
			<Modal
				show={show}
				onHide={handleClose}
				dialogClassName="modal-sm-30px"
				size="md"
				backdropClassName="childmodal"
				backdrop="static"
				centered
			>
				<Modal.Body>
					<div style={{}}>
						<div className="row" style={{ padding: "10px 10px 0px 0px" }}>
							<div className="col-xl col-lg col-md col-xs col-sm">
								<img
									alt="Close"
									loading="lazy"
									onClick={handleClose}
									style={{ cursor: "pointer", float: "right" }}
									src="../images/closeone.png"
								></img>
							</div>
						</div>
						<div className="row" style={{ padding: "20px 50px 30px 20px" }}>
							<div className="col-xl-5 col-lg-5 col-md-5 col-xs-5 col-sm-5">
								<select
									className="form-select form-select-lg mb-3 f-fm fm-w5-s14 color-7"
									style={{ borderRadius: "10px" }}
									value={goback}
									onChange={(e) => handleDisclosureChange(e.target.value)}
								>
									<option className="f-fm fm-w5-s16 color-7">
										More Options
									</option>
									<option className="f-fm fm-w5-s14 color-7">Edit</option>
									<option className="f-fm fm-w5-s14 color-7">Delete</option>
								</select>
							</div>
						</div>
						<div className="row">
							<>
								<div
									className="col-xl col-lg col-md col-xs col-sm"
									style={{ padding: "0px 30px 30px 20px" }}
								>
									<textarea
										className="form-control form-control-lg f-fm fm-w4-s12 color-00"
										name="templete"
										disabled={enable}
										value={def}
										style={{ borderRadius: "10px" }}
										onChange={(e) => setDef(e.target.value)}
									></textarea>
								</div>

								<div className="row">
									<div className="col-xl col-lg col-md col-xs col-sm">
										{enable === true ? (
											<button
												style={{
													border: "1px solid #ACACAC",
													borderRadius: "31.5px",
													width: "200px",
													height: "60px",
													float: "right",
													background: "#ACACAC",
												}}
											>
												{" "}
												<label
													className="f-fm fm-w6-s18 color-FF"
													style={{ display: "flex", justifyContent: "center" }}
												>
													Add
												</label>
											</button>
										) : (
											<button
												style={{
													border: "1px solid #000000",
													borderRadius: "31.5px",
													width: "200px",
													height: "60px",
													float: "right",
													background: "#000000",
												}}
											>
												{" "}
												<label
													className="f-fm fm-w6-s18 color-FF"
													style={{ display: "flex", justifyContent: "center" }}
													onClick={handleChange}
												>
													Add
												</label>
											</button>
										)}
									</div>
								</div>
							</>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};
export default Reopendisclosure;
