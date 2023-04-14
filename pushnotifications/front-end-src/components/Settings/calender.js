import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import * as UserServices from "../../services/user";
import { ToastContainer, toast } from "react-toastify";

const DropDownContainer = styled("div")``;
const DropDownHeader = styled("div")``;
const DropDownListContainer = styled("div")``;
const DropDownList = styled("ul")``;
const ListItem = styled("li")``;

const Calender = (props) => {
	const [toggle, setToggle] = useState(true);
	const [weekends, setWeekends] = useState(false);
	const [declined, setDeclined] = useState(false);
	const [shorterAppointment, setShorterAppointment] = useState(false);
	const [addlatefee, setAddlatefee] = useState(false);
	const [addlatefeemon, setAddlatefeemon] = useState(false);
	const [addlatefeesun, setAddlatefeesun] = useState(false);
	const [addlatefeetue, setAddlatefeetue] = useState(false);
	const [addlatefeewed, setAddlatefeewed] = useState(false);
	const [addlatefeethu, setAddlatefeethu] = useState(false);
	const [addlatefeefri, setAddlatefeefri] = useState(false);
	const [addlatefeesat, setAddlatefeesat] = useState(false);
	const [mondayStart, setMondayStart] = useState("09:00");
	const [sundayStart, setSundayStart] = useState("09:00");
	const [satdayStart, setSatdayStart] = useState("09:00");
	const [tuesdayStart, setTuesdayStart] = useState("09:00");
	const [wednesdayStart, setWednesdayStart] = useState("09:00");
	const [thursdayStart, setThursdayStart] = useState("09:00");
	const [fridayStart, setFridayStart] = useState("09:00");
	const [allStart, setAllStart] = useState("09:00");
	const [mondayEnd, setMondayEnd] = useState("17:00");
	const [tuesdayEnd, setTuesdayEnd] = useState("17:00");
	const [wednesdayEnd, setWednesdayEnd] = useState("17:00");
	const [thursdayEnd, setThursdayEnd] = useState("17:00");
	const [fridayEnd, setFridayEnd] = useState("17:00");
	const [sundayEnd, setSundayEnd] = useState("17:00");
	const [satdayEnd, setSatdayEnd] = useState("17:00");
	const [allEnd, setAllEnd] = useState("17:00");
	const [istoastc, setIstoastc] = useState(false);
	const [black, setBlack] = useState(false);
	const [blackSun, setBlackSun] = useState(false);
	const [blackSat, setBlackSat] = useState(false);
	const [black1, setBlack1] = useState(false);
	const [black2, setBlack2] = useState(false);
	const [black3, setBlack3] = useState(false);
	const [black4, setBlack4] = useState(false);
	const [workingDaysArray, setWorkingDaysArray] = useState([]);
	console.log(workingDaysArray);

	const handleChange = (e) => {
		let isChecked = e.target.checked;
		setToggle(isChecked);
	};

	const handleChange1 = (e) => {
		console.log(e.target.checked);
		let isChecked = e.target.checked;
		setWeekends(isChecked);
		if (e.target.checked === false) {
			setAddlatefeesun(false);
			setAddlatefeesat(false);
		} else {
			setBlackSun(true);
			setBlackSat(true);
		}
	};

	const options = ["$20", "$40", "$60", "$80", "$100"];
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenSun, setIsOpenSun] = useState(false);
	const [isOpenMon, setIsOpenMon] = useState(false);
	const [isOpenTue, setIsOpenTue] = useState(false);
	const [isOpenWed, setIsOpenWed] = useState(false);
	const [isOpenThu, setIsOpenThu] = useState(false);
	const [isOpenFri, setIsOpenFri] = useState(false);
	const [isOpenSat, setIsOpenSat] = useState(false);
	const [selectedlatefee, setSelectedlatefee] = useState("$20");
	const [selectedlatefeesun, setSelectedlatefeesun] = useState("$20");
	const [selectedlatefeemon, setSelectedlatefeemon] = useState("$20");
	const [selectedlatefeetue, setSelectedlatefeetue] = useState("$20");
	const [selectedlatefeewed, setSelectedlatefeewed] = useState("$20");
	const [selectedlatefeethu, setSelectedlatefeethu] = useState("$20");
	const [selectedlatefeefri, setSelectedlatefeefri] = useState("$20");
	const [selectedlatefeesat, setSelectedlatefeesat] = useState("$20");

	const toggling = () => {
		setIsOpen(!isOpen);
	};
	const togglingSun = () => {
		setIsOpenSun(!isOpenSun);
	};
	const togglingMon = () => {
		setIsOpenMon(!isOpenMon);
	};
	const togglingTue = () => {
		setIsOpenTue(!isOpenTue);
	};
	const togglingWed = () => {
		setIsOpenWed(!isOpenWed);
	};
	const togglingThu = () => {
		setIsOpenThu(!isOpenThu);
	};
	const togglingFri = () => {
		setIsOpenFri(!isOpenFri);
	};
	const togglingSat = () => {
		setIsOpenSat(!isOpenSat);
	};
	const onOptionClicked = (value) => {
		setSelectedlatefee(value);
		setIsOpen(false);
	};
	const onOptionClickedSun = (value) => {
		setSelectedlatefeesun(value);
		setIsOpenSun(false);
	};
	const onOptionClickedMon = (value) => {
		setSelectedlatefeemon(value);
		setIsOpenMon(false);
	};
	const onOptionClickedTue = (value) => {
		setSelectedlatefeetue(value);
		setIsOpenTue(false);
	};
	const onOptionClickedWed = (value) => {
		setSelectedlatefeewed(value);
		setIsOpenWed(false);
	};
	const onOptionClickedThu = (value) => {
		setSelectedlatefeethu(value);
		setIsOpenThu(false);
	};
	const onOptionClickedFri = (value) => {
		setSelectedlatefeefri(value);
		setIsOpenFri(false);
	};
	const onOptionClickedSat = (value) => {
		setSelectedlatefeesat(value);
		setIsOpenSat(false);
	};
	const options2 = ["16:00", "17:00", "18:00"];
	const [isOpen2, setIsOpen2] = useState(false);
	const [isOpen2Sun, setIsOpen2Sun] = useState(false);
	const [isOpen2Mon, setIsOpen2Mon] = useState(false);
	const [isOpen2Tue, setIsOpen2Tue] = useState(false);
	const [isOpen2Wed, setIsOpen2Wed] = useState(false);
	const [isOpen2Thu, setIsOpen2Thu] = useState(false);
	const [isOpen2Fri, setIsOpen2Fri] = useState(false);
	const [isOpen2Sat, setIsOpen2Sat] = useState(false);
	const [selectedfrom, setSelectedfrom] = useState(null);
	const [selectedfromsun, setSelectedfromsun] = useState(null);
	const [selectedfrommon, setSelectedfrommon] = useState(null);
	const [selectedfromtue, setSelectedfromtue] = useState(null);
	const [selectedfromwed, setSelectedfromwed] = useState(null);
	const [selectedfromthu, setSelectedfromthu] = useState(null);
	const [selectedfromfri, setSelectedfromfri] = useState(null);
	const [selectedfromsat, setSelectedfromsat] = useState(null);
	const toggling2 = () => {
		setIsOpen2(!isOpen2);
	};
	const toggling2Sun = () => {
		setIsOpen2Sun(!isOpen2Sun);
	};
	const toggling2Mon = () => {
		setIsOpen2Mon(!isOpen2Mon);
	};
	const toggling2Tue = () => {
		setIsOpen2Tue(!isOpen2Tue);
	};
	const toggling2Wed = () => {
		setIsOpen2Wed(!isOpen2Wed);
	};
	const toggling2Thu = () => {
		setIsOpen2Thu(!isOpen2Thu);
	};
	const toggling2Fri = () => {
		setIsOpen2Fri(!isOpen2Fri);
	};
	const toggling2Sat = () => {
		setIsOpen2Sat(!isOpen2Sat);
	};
	const onOptionClicked2 = (value) => {
		setSelectedfrom(value);
		setIsOpen2(false);
	};

	const onOptionClickedSun2 = (value) => {
		setSelectedfromsun(value);
		setIsOpen2Sun(false);
	};
	const onOptionClickedMon2 = (value) => {
		setSelectedfrommon(value);
		setIsOpen2Mon(false);
	};
	const onOptionClickedTue2 = (value) => {
		setSelectedfromtue(value);
		setIsOpen2Tue(false);
	};
	const onOptionClickedWed2 = (value) => {
		setSelectedfromwed(value);
		setIsOpen2Wed(false);
	};
	const onOptionClickedThu2 = (value) => {
		setSelectedfromthu(value);
		setIsOpen2Thu(false);
	};
	const onOptionClickedFri2 = (value) => {
		setSelectedfromfri(value);
		setIsOpen2Fri(false);
	};
	const onOptionClickedSat2 = (value) => {
		setSelectedfromsat(value);
		setIsOpen2Sat(false);
	};

	useEffect(() => {
		// function getData() {
		(async function () {
			var c = await UserServices.GetUserSettingsById(props.params.id);
			var a = c.userSettingsByUserID.calendar[0];
			console.log("settings", a);
			var v = a.days.split("|");
			var w = a.latefeesamount.split("|");
			w.forEach((e) => {
				var b = e.split("-");
				if (c.userSettingsByUserID.calendar[0].sameeveryday === true) {
					if (b[0] === "Sun") {
						setAddlatefee(true);
						setSelectedlatefee(b[1]);
					}
					if (b[0] === "Mon") {
						setAddlatefee(true);
						setSelectedlatefee(b[1]);
					}
					if (b[0] === "Tue") {
						setAddlatefee(true);
						setSelectedlatefee(b[1]);
					}
					if (b[0] === "Wed") {
						setAddlatefee(true);
						setSelectedlatefee(b[1]);
					}
					if (b[0] === "Thu") {
						setAddlatefee(true);
						setSelectedlatefee(b[1]);
					}
					if (b[0] === "Fri") {
						setAddlatefee(true);
						setSelectedlatefee(b[1]);
					}
					if (b[0] === "Sat") {
						setAddlatefee(true);
						setSelectedlatefee(b[1]);
					}
				} else {
					if (b[0] === "Sun") {
						setAddlatefeesun(true);
						setSelectedlatefeesun(b[1]);
					}
					if (b[0] === "Mon") {
						setAddlatefeemon(true);
						setSelectedlatefeemon(b[1]);
					}
					if (b[0] === "Tue") {
						setAddlatefeetue(true);
						setSelectedlatefeetue(b[1]);
					}
					if (b[0] === "Wed") {
						setAddlatefeewed(true);
						setSelectedlatefeewed(b[1]);
					}
					if (b[0] === "Thu") {
						setAddlatefeethu(true);
						setSelectedlatefeethu(b[1]);
					}
					if (b[0] === "Fri") {
						setAddlatefeefri(true);
						setSelectedlatefeefri(b[1]);
					}
					if (b[0] === "Sat") {
						setAddlatefeesat(true);
						setSelectedlatefeesat(b[1]);
					}
				}
			});
			v.forEach((ele) => {
				var a = ele.split("-");
				if (!workingDaysArray.includes(a[0])) {
					if (a[0] === "Sun") {
						setBlackSun(true);
						workingDaysArray.push(a[0]);
						if (c.userSettingsByUserID.calendar[0].sameeveryday === true) {
							setAllStart(a[1].split("to")[0]);
							setAllEnd(a[1].split("to")[1]);
						} else {
							setSundayStart(a[1].split("to")[0]);
							setSundayEnd(a[1].split("to")[1]);
						}
					}
					if (a[0] === "Sat") {
						setBlackSat(true);
						workingDaysArray.push(a[0]);
						if (c.userSettingsByUserID.calendar[0].sameeveryday === true) {
							setAllStart(a[1].split("to")[0]);
							setAllEnd(a[1].split("to")[1]);
						} else {
							setSatdayStart(a[1].split("to")[0]);
							setSatdayEnd(a[1].split("to")[1]);
						}
					}
					if (a[0] === "Mon") {
						setBlack(true);
						workingDaysArray.push(a[0]);
						if (c.userSettingsByUserID.calendar[0].sameeveryday === true) {
							setAllStart(a[1].split("to")[0]);
							setAllEnd(a[1].split("to")[1]);
						} else {
							setMondayStart(a[1].split("to")[0]);
							setSatdayEnd(a[1].split("to")[1]);
						}
					}
					if (a[0] === "Tue") {
						setBlack1(true);
						workingDaysArray.push(a[0]);
						if (c.userSettingsByUserID.calendar[0].sameeveryday === true) {
							setAllStart(a[1].split("to")[0]);
							setAllEnd(a[1].split("to")[1]);
						} else {
							setTuesdayStart(a[1].split("to")[0]);
							setTuesdayEnd(a[1].split("to")[1]);
						}
					}
					if (a[0] === "Wed") {
						setBlack2(true);
						workingDaysArray.push(a[0]);
						if (c.userSettingsByUserID.calendar[0].sameeveryday === true) {
							setAllStart(a[1].split("to")[0]);
							setAllEnd(a[1].split("to")[1]);
						} else {
							setWednesdayStart(a[1].split("to")[0]);
							setWednesdayEnd(a[1].split("to")[1]);
						}
					}
					if (a[0] === "Thu") {
						setBlack3(true);
						workingDaysArray.push(a[0]);
						if (c.userSettingsByUserID.calendar[0].sameeveryday === true) {
							setAllStart(a[1].split("to")[0]);
							setAllEnd(a[1].split("to")[1]);
						} else {
							setThursdayStart(a[1].split("to")[0]);
							setThursdayEnd(a[1].split("to")[1]);
						}
					}
					if (a[0] === "Fri") {
						setBlack4(true);
						workingDaysArray.push(a[0]);
						if (c.userSettingsByUserID.calendar[0].sameeveryday === true) {
							setAllStart(a[1].split("to")[0]);
							setAllEnd(a[1].split("to")[1]);
						} else {
							setFridayStart(a[1].split("to")[0]);
							setFridayEnd(a[1].split("to")[1]);
						}
					}
				}
			});
			console.log("ele", workingDaysArray);
			console.log("v", v);
			setToggle(a.sameeveryday);

			setWeekends(a.weekends);
			setDeclined(a.declinedappoinments);
			setShorterAppointment(a.shorterappoinments);
			if (a.startsweek === "Mon") {
				setSelectedstartfrom("Monday");
			}
			if (a.startsweek === "Sun") {
				setSelectedstartfrom("Sunday");
			}
			if (a.startsweek === "Tue") {
				setSelectedstartfrom("Tuesday");
			}
			if (a.startsweek === "Wed") {
				setSelectedstartfrom("Wednesday");
			}
			if (a.startsweek === "Thu") {
				setSelectedstartfrom("Thursday");
			}
			if (a.startsweek === "Fri") {
				setSelectedstartfrom("Friday");
			}
			if (a.startsweek === "Sat") {
				setSelectedstartfrom("Saturday");
			}
			//   if (c.userSettingsByUserID.calendar[0].sameeveryday === true) {
			// setAddlatefee(a.addlatefee);
			// setSelectedlatefee(a.latefeesamount);
			// setSelectedfrom(a.latefeesfrom);
			// var sp = a.days.split("to");
			// console.log("sp", sp);
			// setAllStart(sp[0]);
			// setAllEnd(sp[1]);
			//   }
			//   else {
			//     var d = a.days.split("|");
			//     var da = d[0].split("-");
			//     var start = da[1].split("to");
			//     setMondayStart(start[0]);
			//     setMondayEnd(start[1]);
			//     da = d[1].split("-");
			//     start = da[1].split("to");
			//     setTuesdayStart(start[0]);
			//     setTuesdayEnd(start[1]);
			//     da = d[2].split("-");
			//     start = da[1].split("to");
			//     setWednesdayStart(start[0]);
			//     setWednesdayEnd(start[1]);
			//     da = d[3].split("-");
			//     start = da[1].split("to");
			//     setThursdayStart(start[0]);
			//     setThursdayEnd(start[1]);
			//     da = d[4].split("-");
			//     start = da[1].split("to");
			//     setFridayStart(start[0]);
			//     setFridayEnd(start[1]);
			//   }
		})();
		// }
		// getData();
	}, []);

	const options3 = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const [isOpen3, setIsOpen3] = useState(false);
	const [selectedstartfrom, setSelectedstartfrom] = useState(null);
	const toggling3 = () => {
		setIsOpen3(!isOpen3);
	};
	const onOptionClicked3 = (value) => {
		setSelectedstartfrom(value);
		setIsOpen3(false);
	};

	const onChangeWorkingDays = (value) => {
		if (workingDaysArray.includes(value)) {
			var index = workingDaysArray.indexOf(value);
			workingDaysArray.splice(index, 1);
		} else {
			workingDaysArray.push(value);
		}
	};

	const updateSettings = () => {
		setIstoastc(true);
		console.log(istoastc);
		console.log(toggle);
		console.log(addlatefee);
		console.log(selectedlatefee);
		console.log(selectedfrom);
		console.log(weekends);
		console.log(declined);
		console.log(shorterAppointment);
		console.log(selectedstartfrom);
		var selectedDays = "";
		var totallatefeesamount = "";
		if (toggle === true) {
			if (workingDaysArray.includes("Sun") === true) {
				selectedDays = selectedDays + "Sun-" + allStart + "to" + allEnd + "|";

				if (addlatefee === true) {
					totallatefeesamount = totallatefeesamount =
						totallatefeesamount + "Sun-" + selectedlatefee + "|";
				}
			}
			if (workingDaysArray.includes("Mon") === true) {
				selectedDays = selectedDays + "Mon-" + allStart + "to" + allEnd + "|";
				if (addlatefee === true) {
					totallatefeesamount =
						totallatefeesamount + "Mon-" + selectedlatefee + "|";
				}
			}
			if (workingDaysArray.includes("Tue") === true) {
				selectedDays = selectedDays + "Tue-" + allStart + "to" + allEnd + "|";
				if (addlatefee === true) {
					totallatefeesamount =
						totallatefeesamount + "Tue-" + selectedlatefee + "|";
				}
			}
			if (workingDaysArray.includes("Wed") === true) {
				selectedDays = selectedDays + "Wed-" + allStart + "to" + allEnd + "|";
				if (addlatefee === true) {
					totallatefeesamount =
						totallatefeesamount + "Wed-" + selectedlatefee + "|";
				}
			}
			if (workingDaysArray.includes("Thu") === true) {
				selectedDays = selectedDays + "Thu-" + allStart + "to" + allEnd + "|";
				if (addlatefee === true) {
					totallatefeesamount =
						totallatefeesamount + "Thu-" + selectedlatefee + "|";
				}
			}
			if (workingDaysArray.includes("Fri") === true) {
				selectedDays = selectedDays + "Fri-" + allStart + "to" + allEnd + "|";
				if (addlatefee === true) {
					totallatefeesamount =
						totallatefeesamount + "Fri-" + selectedlatefee + "|";
				}
			}
			if (workingDaysArray.includes("Sat") === true) {
				selectedDays = selectedDays + "Sat-" + allStart + "to" + allEnd + "|";
				if (addlatefee === true) {
					totallatefeesamount =
						totallatefeesamount + "Sat-" + selectedlatefee + "|";
				}
			}
			console.log("selected days", selectedDays);
			console.log("selected amounts", totallatefeesamount);
		} else {
			if (workingDaysArray.includes("Sun") === true) {
				selectedDays =
					selectedDays + "Sun-" + sundayStart + "to" + sundayEnd + "|";
				if (addlatefeesun === true) {
					totallatefeesamount =
						totallatefeesamount + "Sun-" + selectedlatefeesun + "|";
				}
			}
			if (workingDaysArray.includes("Mon") === true) {
				selectedDays =
					selectedDays + "Mon-" + mondayStart + "to" + mondayEnd + "|";
				if (addlatefeemon === true) {
					totallatefeesamount =
						totallatefeesamount + "Mon-" + selectedlatefeemon + "|";
				}
			}
			if (workingDaysArray.includes("Tue") === true) {
				selectedDays =
					selectedDays + "Tue-" + tuesdayStart + "to" + tuesdayEnd + "|";
				if (addlatefeetue === true) {
					totallatefeesamount =
						totallatefeesamount + "Tue-" + selectedlatefeetue + "|";
				}
			}
			if (workingDaysArray.includes("Wed") === true) {
				selectedDays =
					selectedDays + "Wed-" + wednesdayStart + "to" + wednesdayEnd + "|";
				if (addlatefeewed === true) {
					totallatefeesamount =
						totallatefeesamount + "Wed-" + selectedlatefeewed + "|";
				}
			}
			if (workingDaysArray.includes("Thu") === true) {
				selectedDays =
					selectedDays + "Thu-" + thursdayStart + "to" + thursdayEnd + "|";
				if (addlatefeethu === true) {
					totallatefeesamount =
						totallatefeesamount + "Thu-" + selectedlatefeethu + "|";
				}
			}
			if (workingDaysArray.includes("Fri") === true) {
				selectedDays =
					selectedDays + "Fri-" + fridayStart + "to" + fridayEnd + "|";
				if (addlatefeefri === true) {
					totallatefeesamount =
						totallatefeesamount + "Fri-" + selectedlatefeefri + "|";
				}
			}
			if (workingDaysArray.includes("Sat") === true) {
				selectedDays =
					selectedDays + "Sat-" + satdayStart + "to" + satdayEnd + "|";
				if (addlatefeesat === true) {
					totallatefeesamount =
						totallatefeesamount + "Sat-" + selectedlatefeesat + "|";
				}
			}
			console.log("selected days", selectedDays);
			console.log("selected amounts", totallatefeesamount);
			//   selectedDays =
			//     "Mon-" +
			//     mondayStart +
			//     "to" +
			//     mondayEnd +
			//     "|" +
			//     "Tue-" +
			//     tuesdayStart +
			//     "to" +
			//     tuesdayEnd +
			//     "|" +
			//     "Wed-" +
			//     wednesdayStart +
			//     "to" +
			//     wednesdayEnd +
			//     "|" +
			//     "Thu-" +
			//     thursdayStart +
			//     "to" +
			//     thursdayEnd +
			//     "|" +
			//     "Fri-" +
			//     fridayStart +
			//     "to" +
			//     fridayEnd;
		}
		(async function anyNameFunction() {
			var c = await UserServices.GetUserByEmail();
			console.log(c);
			selectedDays = selectedDays.slice(0, -1);
			totallatefeesamount = totallatefeesamount.slice(0, -1);
			const updateSettingsvariables = UserServices.returnUpdateSettings({
				id: props.params.id,
				calendar: [
					{
						sameeveryday: toggle,
						days: selectedDays,
						addlatefee: addlatefee,
						latefeesamount: totallatefeesamount,
						latefeesfrom: selectedfrom,
						weekends: weekends,
						declinedappoinments: declined,
						shorterappoinments: shorterAppointment,
						startsweek: selectedstartfrom.substring(0, 3),
						status: true,
					},
				],
			});
			console.log(updateSettingsvariables);
			UserServices.UpdateSettings(updateSettingsvariables).then((value) => {
				console.log(value);
				// window.location.reload();
				toast.success("Successfully record saved", {
					toastId: "calender",
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				window.scrollTo(0, 0);
			});
			setTimeout(() => {
				setIstoastc(false);
				window.location.reload();
			}, 3000);
		})();
	};

	const late = useRef(null);
	const fro = useRef(null);
	const start = useRef(null);
	const handlemousedown = (e) => {
		if (late.current && isOpen && !late.current.contains(e.target)) {
			setIsOpen(false);
		}
		// if (late.current && isOpenSun && !late.current.contains(e.target)) {
		// 	setIsOpenSun(false);
		// }
		// if (late.current && isOpenMon && !late.current.contains(e.target)) {
		// 	setIsOpenMon(false);
		// }
		// if (fro.current && isOpen2Mon && !fro.current.contains(e.target)) {
		//   setIsOpen2Mon(false);
		// }
		// if (fro.current && isOpen2Sun && !fro.current.contains(e.target)) {
		//   setIsOpen2Sun(false);
		// }
		if (fro.current && isOpen2 && !fro.current.contains(e.target)) {
			setIsOpen2(false);
		}
		if (start.current && isOpen3 && !start.current.contains(e.target)) {
			setIsOpen3(false);
		}
	};
	document.addEventListener("mousedown", handlemousedown);
	return (
		<div className="container">
			<div className="row">
				<div className="col-xl col-lg col-md col-xs col-sm">
					<label className="" style={{ paddingTop: "40px" }}>
						Working Times
					</label>
				</div>
				<div className="row">
					<div className="col-xl col-lg col-md col-xs col-sm">
						<hr
							style={{
								color: "rgb(149 142 142)",
								backgroundColor: "#000000",
								height: 2,
							}}
						/>
					</div>
				</div>
				<div className="row">
					<div
						className="col-xl col-lg col-md col-xs col-sm"
						style={{ paddingBottom: "10px" }}
					>
						<p className="fm-w4-s16" style={{ color: "#000000" }}>
							Enable working times to let patients know when you're available
							for appointments. Patients will not book your appointment outside
							of these times.
						</p>
					</div>
				</div>
				<div className="row">
					<div
						className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2 fm-w4-s14 color-7"
						style={{ paddingBottom: "10px", width: "130px" }}
					>
						Same Every Day
					</div>
					<div
						className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2 toggle"
						style={{ marginTop: "-25px" }}
					>
						<input
							type="checkbox"
							id="switch"
							checked={toggle}
							name="sameeveryday"
							key="sameeveryday"
							onChange={(e) => handleChange(e)}
						/>
						<label id="h" key="h" htmlFor="switch">
							Toggle
						</label>
					</div>
					<div
						className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2 fm-w4-s14 color-7"
						style={{ paddingBottom: "10px", width: "135px" }}
					>
						Show Weekends
					</div>
					<div
						className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3 toggle"
						style={{ marginTop: "-25px" }}
					>
						<input
							type="checkbox"
							key="weekends"
							id="weekswitch"
							checked={weekends}
							name="weekends"
							onChange={(e) => handleChange1(e)}
						/>
						<label id="h1" key="h1" htmlFor="weekswitch">
							Toggle1
						</label>
					</div>
					<div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
						{/* <label
              className="aecontainer f-fm fm-w4-s18"
              style={{ color: "#000000" }}
            >
              Show weekends
              <input
                type="checkbox"
                name="weekends"
                checked={weekends}
                onChange={() => {
                  setWeekends(!weekends);
                }}
              />
              <span className="checkmark"></span>
            </label> */}
					</div>
				</div>

				{toggle === false && (
					<div style={{ paddingTop: "20px" }}>
						<>
							<div
								className="row"
								style={{ display: "flex", alignItems: "center" }}
							>
								<div
									className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2 w100"
									style={{ paddingBottom: "10px", width: "50px" }}
								>
									<div
										style={{
											display: "flex",
											height: "40px",
											width: "40px",
											border: "1px solid #777777",
											borderRadius: "50%",
											backgroundColor: weekends ? (blackSun ? "#000" : "") : "",
										}}
										onClick={() => {
											if (weekends === true) {
												setBlackSun(!blackSun);
												onChangeWorkingDays("Sun");
											}
										}}
									>
										<p
											style={{
												fontFamily: "Mulish",
												margin: "auto",
												color: weekends ? (blackSun ? "#fff" : "#000") : "",
												cursor: "pointer",
											}}
											className="fm-w6-s12"
										>
											SUN
										</p>
									</div>
								</div>
								<div
									className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3 p-10 line"
									style={{
										// paddingBottom: "10px",
										marginBottom: "-10px",
										width: "200px",
										paddingLeft: "30px",
									}}
								>
									<div
										style={{
											display: "flex",
											height: "45px",
											width: "143px",
											background: "#F4F4F4",
											borderRadius: "22.5px",
										}}
									>
										<p
											style={{
												fontFamily: "Mulish",
												margin: "auto",
												color: "#777777",
											}}
											className="fm-w6-s12"
										>
											{blackSun && (
												<input
													name="sundaystart"
													style={{
														height: "45px",
														width: "143px",
														background: "#F4F4F4",
														border: "#F4F4F4",
														borderRadius: "22.5px",
														textAlign: "center",
													}}
													disabled={weekends ? (blackSun ? false : true) : true}
													type="time"
													value={blackSun ? sundayStart : ""}
													onChange={(e) => setSundayStart(e.target.value)}
												/>
											)}
										</p>
									</div>
								</div>
								<div
									className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3"
									style={{ paddingBottom: "10px" }}
								>
									<div
										style={{
											display: "flex",
											height: "45px",
											width: "143px",
											background: "#F4F4F4",
											borderRadius: "22.5px",
										}}
									>
										<p
											style={{
												fontFamily: "Mulish",
												margin: "auto",
												color: "#777777",
											}}
											className="fm-w6-s12"
										>
											{blackSun && (
												<input
													name="sundayend"
													style={{
														height: "45px",
														width: "143px",
														background: "#F4F4F4",
														border: "#F4F4F4",
														borderRadius: "22.5px",
														textAlign: "center",
													}}
													disabled={weekends ? (blackSun ? false : true) : true}
													type="time"
													value={blackSun ? sundayEnd : ""}
													onChange={(e) => setSundayEnd(e.target.value)}
												/>
											)}
										</p>
									</div>
								</div>
								{blackSun && weekends && (
									<>
										<div
											className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2 w100"
											style={{
												paddingBottom: "10px",
												width: "157px",
												display: "flex",
												alignItems: "center",
												// paddingLeft: "50px",
											}}
										>
											<label className="aecontainer f-fm fm-w4-s16">
												Add late fees
												<input
													type="checkbox"
													name="addlateFeesun"
													checked={addlatefeesun}
													onChange={() => {
														setAddlatefeesun(!addlatefeesun);
													}}
												/>
												<span className="checkmark"></span>
											</label>
										</div>
										<div
											className="col-xl-2 col-lg-3 col-md-3 col-xs-3 col-sm-3 p-10 marginbottom"
											style={{
												// paddingBottom: "10px",
												// marginBottom: "20px",
												width: "200px",
												paddingLeft: "30px",
											}}
										>
											<div
												className="row"
												style={{
													display: addlatefeesun ? "flex" : "none",
													height: "45px",
												}}
											>
												<div className="col-xl-11 col-lg-12 col-md-12 col-xs-12 col-sm-12">
													<DropDownContainer
														className="customdropmain"
														ref={late}
													>
														<DropDownHeader
															onClick={togglingSun}
															className="form-select form-select-lg mb-1 select-round-custom-dropdown-general"
															style={{
																// paddingTop: "10px",
																backgroundColor: "#F4F4F4",
															}}
														>
															{selectedlatefeesun && (
																<>
																	<p
																		className="f-fm fm-w6-s12"
																		style={{ color: "#777777" }}
																	>
																		Amount
																	</p>
																	<p className="f-fm fm-w4-s14 color-7">
																		{selectedlatefeesun}
																	</p>
																</>
															)}
															{!selectedlatefeesun && (
																<>
																	<p
																		className="f-fm fm-w6-s12"
																		style={{ color: "#777777" }}
																	>
																		Amount
																	</p>
																	<p className="f-fm fm-w5-s14 color-7">$20</p>
																</>
															)}
														</DropDownHeader>
														{isOpenSun && (
															<div
																className="customwidth"
																style={{
																	width: "345px",
																	height: "283px",
																	position: "absolute",
																}}
															>
																<DropDownListContainer className="customdropcontainer">
																	<DropDownList className="customdroptwo">
																		{options.map((k) => (
																			<ListItem
																				className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
																				onClick={() => {
																					onOptionClickedSun(k);
																				}}
																				value={k}
																			>
																				{k}
																			</ListItem>
																		))}
																	</DropDownList>
																</DropDownListContainer>
															</div>
														)}
													</DropDownContainer>
												</div>
											</div>
										</div>
									</>
								)}
							</div>
						</>

						<div
							className="row"
							style={{ display: "flex", alignItems: "center" }}
						>
							<div
								className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2 w100"
								style={{ paddingBottom: "10px", width: "50px" }}
							>
								<div
									style={{
										display: "flex",
										height: "40px",
										width: "40px",
										border: "1px solid #777777",
										borderRadius: "50%",
										backgroundColor: black ? "#000000" : "",
									}}
									onClick={() => {
										setBlack(!black);
										onChangeWorkingDays("Mon");
									}}
								>
									<p
										style={{
											fontFamily: "Mulish",
											margin: "auto",
											color: black ? "#fff" : "#000",
											cursor: "pointer",
										}}
										className="fm-w6-s12"
									>
										MON
									</p>
								</div>
							</div>
							<div
								className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3 p-10 line"
								style={{
									// paddingBottom: "10px",
									marginBottom: "-10px",
									width: "200px",
									paddingLeft: "30px",
								}}
							>
								<div
									style={{
										display: "flex",
										height: "45px",
										width: "143px",
										background: "#F4F4F4",
										borderRadius: "22.5px",
									}}
								>
									<p
										style={{
											fontFamily: "Mulish",
											margin: "auto",
											color: "#777777",
										}}
										className="fm-w6-s12"
									>
										{black && (
											<input
												name="mondaystart"
												style={{
													height: "45px",
													width: "143px",
													background: "#F4F4F4",
													border: "#F4F4F4",
													borderRadius: "22.5px",
													textAlign: "center",
												}}
												disabled={black ? false : true}
												type="time"
												value={black ? mondayStart : ""}
												onChange={(e) => setMondayStart(e.target.value)}
											/>
										)}
									</p>
								</div>
							</div>
							<div
								className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3"
								style={{ paddingBottom: "10px" }}
							>
								<div
									style={{
										display: "flex",
										height: "45px",
										width: "143px",
										background: "#F4F4F4",
										borderRadius: "22.5px",
									}}
								>
									<p
										style={{
											fontFamily: "Mulish",
											margin: "auto",
											color: "#777777",
										}}
										className="fm-w6-s12"
									>
										{black && (
											<input
												name="mondayend"
												style={{
													height: "45px",
													width: "143px",
													background: "#F4F4F4",
													border: "#F4F4F4",
													borderRadius: "22.5px",
													textAlign: "center",
												}}
												disabled={black ? false : true}
												type="time"
												value={black ? mondayEnd : ""}
												onChange={(e) => setMondayEnd(e.target.value)}
											/>
										)}
									</p>
								</div>
							</div>
							{black && (
								<>
									<div
										className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2 w100"
										style={{
											paddingBottom: "10px",
											width: "157px",
											display: "flex",
											alignItems: "center",
											//   paddingLeft: "50px",
										}}
									>
										<label className="aecontainer f-fm fm-w4-s16">
											Add late fees
											<input
												type="checkbox"
												name="addlateFeemon"
												checked={addlatefeemon}
												onChange={() => {
													setAddlatefeemon(!addlatefeemon);
												}}
											/>
											<span className="checkmark"></span>
										</label>
									</div>
									<div
										className="col-xl-2 col-lg-3 col-md-3 col-xs-3 col-sm-3 p-10 marginbottom"
										style={{
											//   paddingBottom: "10px",
											// marginBottom: "20px",
											width: "200px",
											paddingLeft: "30px",
										}}
									>
										<div
											className="row"
											style={{
												display: addlatefeemon ? "flex" : "none",
												height: "45px",
											}}
										>
											<div className="col-xl-11 col-lg-12 col-md-12 col-xs-12 col-sm-12">
												<DropDownContainer
													className="customdropmain"
													ref={late}
												>
													<DropDownHeader
														onClick={togglingMon}
														className="form-select form-select-lg mb-1 select-round-custom-dropdown-general"
														style={{
															paddingTop: "10px",
															backgroundColor: "#F4F4F4",
														}}
													>
														{selectedlatefeemon && (
															<>
																<p
																	className="f-fm fm-w6-s12"
																	style={{ color: "#777777" }}
																>
																	Amount
																</p>
																<p className="f-fm fm-w4-s14 color-7">
																	{selectedlatefeemon}
																</p>
															</>
														)}
														{!selectedlatefeemon && (
															<>
																<p
																	className="f-fm fm-w6-s12"
																	style={{ color: "#777777" }}
																>
																	Amount
																</p>
																<p className="f-fm fm-w5-s14 color-7">$20</p>
															</>
														)}
													</DropDownHeader>
													{isOpenMon && (
														<div
															className="customwidth"
															style={{
																width: "345px",
																height: "283px",
																position: "absolute",
															}}
														>
															<DropDownListContainer className="customdropcontainer">
																<DropDownList className="customdroptwo">
																	{options.map((k) => (
																		<ListItem
																			className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
																			onClick={() => {
																				onOptionClickedMon(k);
																			}}
																			value={k}
																		>
																			{k}
																		</ListItem>
																	))}
																</DropDownList>
															</DropDownListContainer>
														</div>
													)}
												</DropDownContainer>
											</div>
										</div>
									</div>
								</>
							)}
						</div>

						<div
							className="row"
							style={{ display: "flex", alignItems: "center" }}
						>
							<div
								className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2 w100"
								style={{ paddingBottom: "10px", width: "50px" }}
							>
								<div
									style={{
										display: "flex",
										height: "40px",
										width: "40px",
										border: "1px solid #777777",
										borderRadius: "50%",
										backgroundColor: black1 ? "#000000" : "",
									}}
									onClick={() => {
										setBlack1(!black1);
										onChangeWorkingDays("Tue");
									}}
								>
									<p
										style={{
											fontFamily: "Mulish",
											margin: "auto",
											color: black1 ? "#fff" : "#000",
											cursor: "pointer",
										}}
										className="fm-w6-s12"
									>
										TUE
									</p>
								</div>
							</div>
							<div
								className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3 p-10 line"
								style={{
									// paddingBottom: "10px",
									marginBottom: "-10px",
									width: "200px",
									paddingLeft: "30px",
								}}
							>
								<div
									style={{
										display: "flex",
										height: "45px",
										width: "143px",
										background: "#F4F4F4",
										borderRadius: "22.5px",
									}}
								>
									<p
										style={{
											fontFamily: "Mulish",
											margin: "auto",
											color: "#777777",
										}}
										className="fm-w6-s12"
									>
										{black1 && (
											<input
												name="tuesdaystart"
												style={{
													height: "45px",
													width: "143px",
													background: "#F4F4F4",
													border: "#F4F4F4",
													borderRadius: "22.5px",
													textAlign: "center",
												}}
												disabled={black1 ? false : true}
												type="time"
												value={black1 ? tuesdayStart : ""}
												onChange={(e) => setTuesdayStart(e.target.value)}
											/>
										)}
									</p>
								</div>
							</div>
							<div
								className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3"
								style={{ paddingBottom: "10px" }}
							>
								<div
									style={{
										display: "flex",
										height: "45px",
										width: "143px",
										background: "#F4F4F4",
										borderRadius: "22.5px",
									}}
								>
									<p
										style={{
											fontFamily: "Mulish",
											margin: "auto",
											color: "#777777",
										}}
										className="fm-w6-s12"
									>
										{black1 && (
											<input
												name="tuesdayend"
												style={{
													height: "45px",
													width: "143px",
													background: "#F4F4F4",
													border: "#F4F4F4",
													borderRadius: "22.5px",
													textAlign: "center",
												}}
												disabled={black1 ? false : true}
												type="time"
												value={black1 ? tuesdayEnd : ""}
												onChange={(e) => setTuesdayEnd(e.target.value)}
											/>
										)}
									</p>
								</div>
							</div>
							{black1 && (
								<>
									<div
										className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2 w100"
										style={{
											paddingBottom: "10px",
											width: "157px",
											display: "flex",
											alignItems: "center",
											//   paddingLeft: "50px",
										}}
									>
										<label className="aecontainer f-fm fm-w4-s16">
											Add late fees
											<input
												type="checkbox"
												name="addlateFeetue"
												checked={addlatefeetue}
												onChange={() => {
													setAddlatefeetue(!addlatefeetue);
												}}
											/>
											<span className="checkmark"></span>
										</label>
									</div>
									<div
										className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3 p-10 marginbottom"
										style={{
											//   paddingBottom: "10px",
											// marginBottom: "-10px",
											// marginBottom: "20px",
											width: "200px",
											paddingLeft: "30px",
										}}
									>
										<div
											className="row"
											style={{
												display: addlatefeetue ? "flex" : "none",
												height: "45px",
											}}
										>
											<div className="col-xl-11 col-lg-12 col-md-12 col-xs-12 col-sm-12">
												<DropDownContainer
													className="customdropmain"
													ref={late}
												>
													<DropDownHeader
														onClick={togglingTue}
														className="form-select form-select-lg mb-1 select-round-custom-dropdown-general"
														style={{
															paddingTop: "10px",
															backgroundColor: "#F4F4F4",
														}}
													>
														{selectedlatefeetue && (
															<>
																<p
																	className="f-fm fm-w6-s12"
																	style={{ color: "#777777" }}
																>
																	Amount
																</p>
																<p className="f-fm fm-w4-s14 color-7">
																	{selectedlatefeetue}
																</p>
															</>
														)}
														{!selectedlatefeetue && (
															<>
																<p
																	className="f-fm fm-w6-s12"
																	style={{ color: "#777777" }}
																>
																	Amount
																</p>
																<p className="f-fm fm-w5-s14 color-7">$20</p>
															</>
														)}
													</DropDownHeader>
													{isOpenTue && (
														<div
															className="customwidth"
															style={{
																width: "345px",
																height: "283px",
																position: "absolute",
															}}
														>
															<DropDownListContainer className="customdropcontainer">
																<DropDownList className="customdroptwo">
																	{options.map((k) => (
																		<ListItem
																			className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
																			onClick={() => {
																				onOptionClickedTue(k);
																			}}
																			value={k}
																		>
																			{k}
																		</ListItem>
																	))}
																</DropDownList>
															</DropDownListContainer>
														</div>
													)}
												</DropDownContainer>
											</div>
										</div>
									</div>
								</>
							)}
						</div>

						<div
							className="row"
							style={{ display: "flex", alignItems: "center" }}
						>
							<div
								className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2 w100"
								style={{ paddingBottom: "10px", width: "50px" }}
							>
								<div
									style={{
										display: "flex",
										height: "40px",
										width: "40px",
										border: "1px solid #777777",
										borderRadius: "50%",
										backgroundColor: black2 ? "#000000" : "",
									}}
									onClick={() => {
										setBlack2(!black2);
										onChangeWorkingDays("Wed");
									}}
								>
									<p
										style={{
											fontFamily: "Mulish",
											margin: "auto",
											color: black2 ? "#fff" : "#000",
											cursor: "pointer",
										}}
										className="fm-w6-s12"
									>
										WED
									</p>
								</div>
							</div>
							<div
								className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3 p-10 line"
								style={{
									// paddingBottom: "10px",
									marginBottom: "-10px",
									width: "200px",
									paddingLeft: "30px",
								}}
							>
								<div
									style={{
										display: "flex",
										height: "45px",
										width: "143px",
										background: "#F4F4F4",
										borderRadius: "22.5px",
									}}
								>
									<p
										style={{
											fontFamily: "Mulish",
											margin: "auto",
											color: "#777777",
										}}
										className="fm-w6-s12"
									>
										{black2 && (
											<input
												name="wednesdaystart"
												style={{
													height: "45px",
													width: "143px",
													background: "#F4F4F4",
													border: "#F4F4F4",
													borderRadius: "22.5px",
													textAlign: "center",
												}}
												disabled={black2 ? false : true}
												type="time"
												value={black2 ? wednesdayStart : ""}
												onChange={(e) => setWednesdayStart(e.target.value)}
											/>
										)}
									</p>
								</div>
							</div>
							<div
								className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3"
								style={{ paddingBottom: "10px" }}
							>
								<div
									style={{
										display: "flex",
										height: "45px",
										width: "143px",
										background: "#F4F4F4",
										borderRadius: "22.5px",
									}}
								>
									<p
										style={{
											fontFamily: "Mulish",
											margin: "auto",
											color: "#777777",
										}}
										className="fm-w6-s12"
									>
										{black2 && (
											<input
												name="wednesdayend"
												style={{
													height: "45px",
													width: "143px",
													background: "#F4F4F4",
													border: "#F4F4F4",
													borderRadius: "22.5px",
													textAlign: "center",
												}}
												disabled={black2 ? false : true}
												type="time"
												value={black2 ? wednesdayEnd : ""}
												onChange={(e) => setWednesdayEnd(e.target.value)}
											/>
										)}
									</p>
								</div>
							</div>
							{black2 && (
								<>
									{" "}
									<div
										className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2 w100"
										style={{
											paddingBottom: "10px",
											width: "157px",
											display: "flex",
											alignItems: "center",
											//   paddingLeft: "50px",
										}}
									>
										<label className="aecontainer f-fm fm-w4-s16">
											Add late fees
											<input
												type="checkbox"
												name="addlateFeewed"
												checked={addlatefeewed}
												onChange={() => {
													setAddlatefeewed(!addlatefeewed);
												}}
											/>
											<span className="checkmark"></span>
										</label>
									</div>
									<div
										className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3 p-10 marginbottom"
										style={{
											//   paddingBottom: "10px",
											// marginBottom: "20px",
											width: "200px",
											paddingLeft: "30px",
										}}
									>
										<div
											className="row"
											style={{
												display: addlatefeewed ? "flex" : "none",
												height: "45px",
											}}
										>
											<div className="col-xl-11 col-lg-12 col-md-12 col-xs-12 col-sm-12">
												<DropDownContainer
													className="customdropmain"
													ref={late}
												>
													<DropDownHeader
														onClick={togglingWed}
														className="form-select form-select-lg mb-1 select-round-custom-dropdown-general"
														style={{
															paddingTop: "10px",
															backgroundColor: "#F4F4F4",
														}}
													>
														{selectedlatefeewed && (
															<>
																<p
																	className="f-fm fm-w6-s12"
																	style={{ color: "#777777" }}
																>
																	Amount
																</p>
																<p className="f-fm fm-w4-s14 color-7">
																	{selectedlatefeewed}
																</p>
															</>
														)}
														{!selectedlatefeewed && (
															<>
																<p
																	className="f-fm fm-w6-s12"
																	style={{ color: "#777777" }}
																>
																	Amount
																</p>
																<p className="f-fm fm-w5-s14 color-7">$20</p>
															</>
														)}
													</DropDownHeader>
													{isOpenWed && (
														<div
															className="customwidth"
															style={{
																width: "345px",
																height: "283px",
																position: "absolute",
															}}
														>
															<DropDownListContainer className="customdropcontainer">
																<DropDownList className="customdroptwo">
																	{options.map((k) => (
																		<ListItem
																			className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
																			onClick={() => {
																				onOptionClickedWed(k);
																			}}
																			value={k}
																		>
																			{k}
																		</ListItem>
																	))}
																</DropDownList>
															</DropDownListContainer>
														</div>
													)}
												</DropDownContainer>
											</div>
										</div>
									</div>
								</>
							)}
						</div>

						<div
							className="row"
							style={{ display: "flex", alignItems: "center" }}
						>
							<div
								className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2 w100"
								style={{ paddingBottom: "10px", width: "50px" }}
							>
								<div
									style={{
										display: "flex",
										height: "40px",
										width: "40px",
										border: "1px solid #777777",
										borderRadius: "50%",
										backgroundColor: black3 ? "#000000" : "",
									}}
									onClick={() => {
										setBlack3(!black3);
										onChangeWorkingDays("Thu");
									}}
								>
									<p
										style={{
											fontFamily: "Mulish",
											margin: "auto",
											color: black3 ? "#fff" : "#000",
											cursor: "pointer",
										}}
										className="fm-w6-s12"
									>
										THU
									</p>
								</div>
							</div>
							<div
								className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3 p-10 line"
								style={{
									marginBottom: "-10px",
									// paddingBottom: "10px",
									width: "200px",
									paddingLeft: "30px",
								}}
							>
								<div
									style={{
										display: "flex",
										height: "45px",
										width: "143px",
										background: "#F4F4F4",
										borderRadius: "22.5px",
									}}
								>
									<p
										style={{
											fontFamily: "Mulish",
											margin: "auto",
											color: "#777777",
										}}
										className="fm-w6-s12"
									>
										{black3 && (
											<input
												name="thurdaystart"
												style={{
													height: "45px",
													width: "143px",
													background: "#F4F4F4",
													border: "#F4F4F4",
													borderRadius: "22.5px",
													textAlign: "center",
												}}
												disabled={black3 ? false : true}
												type="time"
												value={black3 ? thursdayStart : ""}
												onChange={(e) => setThursdayStart(e.target.value)}
											/>
										)}
									</p>
								</div>
							</div>
							<div
								className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3"
								style={{ paddingBottom: "10px" }}
							>
								<div
									style={{
										display: "flex",
										height: "45px",
										width: "143px",
										background: "#F4F4F4",
										borderRadius: "22.5px",
									}}
								>
									<p
										style={{
											fontFamily: "Mulish",
											margin: "auto",
											color: "#777777",
										}}
										className="fm-w6-s12"
									>
										{black3 && (
											<input
												name="thursdayend"
												style={{
													height: "45px",
													width: "143px",
													background: "#F4F4F4",
													border: "#F4F4F4",
													borderRadius: "22.5px",
													textAlign: "center",
												}}
												disabled={black3 ? false : true}
												type="time"
												value={black3 ? thursdayEnd : ""}
												onChange={(e) => setThursdayEnd(e.target.value)}
											/>
										)}
									</p>
								</div>
							</div>
							{black3 && (
								<>
									<div
										className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2 w100"
										style={{
											paddingBottom: "10px",
											width: "157px",
											display: "flex",
											alignItems: "center",
											//   paddingLeft: "50px",
										}}
									>
										<label className="aecontainer f-fm fm-w4-s16">
											Add late fees
											<input
												type="checkbox"
												name="addlateFeethu"
												checked={addlatefeethu}
												onChange={() => {
													setAddlatefeethu(!addlatefeethu);
												}}
											/>
											<span className="checkmark"></span>
										</label>
									</div>
									<div
										className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3 p-10 marginbottom"
										style={{
											//   paddingBottom: "10px",
											// marginBottom: "20px",
											width: "200px",
											paddingLeft: "30px",
										}}
									>
										<div
											className="row "
											style={{
												display: addlatefeethu ? "flex" : "none",
												height: "45px",
											}}
										>
											<div className="col-xl-11 col-lg-12 col-md-12 col-xs-12 col-sm-12">
												<DropDownContainer
													className="customdropmain"
													ref={late}
												>
													<DropDownHeader
														onClick={togglingThu}
														className="form-select form-select-lg mb-1 select-round-custom-dropdown-general"
														style={{
															paddingTop: "10px",
															backgroundColor: "#F4F4F4",
														}}
													>
														{selectedlatefeethu && (
															<>
																<p
																	className="f-fm fm-w6-s12"
																	style={{ color: "#777777" }}
																>
																	Amount
																</p>
																<p className="f-fm fm-w4-s14 color-7">
																	{selectedlatefeethu}
																</p>
															</>
														)}
														{!selectedlatefeethu && (
															<>
																<p
																	className="f-fm fm-w6-s12"
																	style={{ color: "#777777" }}
																>
																	Amount
																</p>
																<p className="f-fm fm-w5-s14 color-7">$20</p>
															</>
														)}
													</DropDownHeader>
													{isOpenThu && (
														<div
															className="customwidth"
															style={{
																width: "345px",
																height: "283px",
																position: "absolute",
															}}
														>
															<DropDownListContainer className="customdropcontainer">
																<DropDownList className="customdroptwo">
																	{options.map((k) => (
																		<ListItem
																			className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
																			onClick={() => {
																				onOptionClickedThu(k);
																			}}
																			value={k}
																		>
																			{k}
																		</ListItem>
																	))}
																</DropDownList>
															</DropDownListContainer>
														</div>
													)}
												</DropDownContainer>
											</div>
										</div>
									</div>
								</>
							)}
						</div>

						<div
							className="row"
							style={{ display: "flex", alignItems: "center" }}
						>
							<div
								className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2 w100"
								style={{ paddingBottom: "10px", width: "50px" }}
							>
								<div
									style={{
										display: "flex",
										height: "40px",
										width: "40px",
										border: "1px solid #777777",
										borderRadius: "50%",
										backgroundColor: black4 ? "#000000" : "",
									}}
									onClick={() => {
										setBlack4(!black4);
										onChangeWorkingDays("Fri");
									}}
								>
									<p
										style={{
											fontFamily: "Mulish",
											margin: "auto",
											color: black4 ? "#fff" : "#000",
											cursor: "pointer",
										}}
										className="fm-w6-s12"
									>
										FRI
									</p>
								</div>
							</div>
							<div
								className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3 p-10 line"
								style={{
									// paddingBottom: "10px",
									marginBottom: "-10px",
									width: "200px",
									paddingLeft: "30px",
								}}
							>
								<div
									style={{
										display: "flex",
										height: "45px",
										width: "143px",
										background: "#F4F4F4",
										borderRadius: "22.5px",
									}}
								>
									<p
										style={{
											fontFamily: "Mulish",
											margin: "auto",
											color: "#777777",
										}}
										className="fm-w6-s12"
									>
										{black4 && (
											<input
												name="fridaystart"
												style={{
													height: "45px",
													width: "143px",
													background: "#F4F4F4",
													border: "#F4F4F4",
													borderRadius: "22.5px",
													textAlign: "center",
												}}
												disabled={black4 ? false : true}
												type="time"
												value={black4 ? fridayStart : ""}
												onChange={(e) => setFridayStart(e.target.value)}
											/>
										)}
									</p>
								</div>
							</div>
							<div
								className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3"
								style={{ paddingBottom: "10px" }}
							>
								<div
									style={{
										display: "flex",
										height: "45px",
										width: "143px",
										background: "#F4F4F4",
										borderRadius: "22.5px",
									}}
								>
									<p
										style={{
											fontFamily: "Mulish",
											margin: "auto",
											color: "#777777",
										}}
										className="fm-w6-s12"
									>
										{black4 && (
											<input
												name="fridayend"
												style={{
													height: "45px",
													width: "143px",
													background: "#F4F4F4",
													border: "#F4F4F4",
													borderRadius: "22.5px",
													textAlign: "center",
												}}
												disabled={black4 ? false : true}
												type="time"
												value={black4 ? fridayEnd : ""}
												onChange={(e) => setFridayEnd(e.target.value)}
											/>
										)}
									</p>
								</div>
							</div>
							{black4 && (
								<>
									<div
										className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2 w100"
										style={{
											paddingBottom: "10px",
											width: "157px",
											display: "flex",
											alignItems: "center",
											//   paddingLeft: "50px",
										}}
									>
										<label className="aecontainer f-fm fm-w4-s16">
											Add late fees
											<input
												type="checkbox"
												name="addlateFeefri"
												checked={addlatefeefri}
												onChange={() => {
													setAddlatefeefri(!addlatefeefri);
												}}
											/>
											<span className="checkmark"></span>
										</label>
									</div>
									<div
										className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3 p-10 marginbottom"
										style={{
											//   paddingBottom: "10px",
											width: "200px",
											paddingLeft: "30px",
											// marginBottom: "20px",
										}}
									>
										<div
											className="row "
											style={{
												display: addlatefeefri ? "flex" : "none",
												height: "45px",
											}}
										>
											<div className="col-xl-11 col-lg-12 col-md-12 col-xs-12 col-sm-12">
												<DropDownContainer
													className="customdropmain"
													ref={late}
												>
													<DropDownHeader
														onClick={togglingFri}
														className="form-select form-select-lg mb-1 select-round-custom-dropdown-general"
														style={{
															paddingTop: "10px",
															backgroundColor: "#F4F4F4",
														}}
													>
														{selectedlatefeefri && (
															<>
																<p
																	className="f-fm fm-w6-s12"
																	style={{ color: "#777777" }}
																>
																	Amount
																</p>
																<p className="f-fm fm-w4-s14 color-7">
																	{selectedlatefeefri}
																</p>
															</>
														)}
														{!selectedlatefeefri && (
															<>
																<p
																	className="f-fm fm-w6-s12"
																	style={{ color: "#777777" }}
																>
																	Amount
																</p>
																<p className="f-fm fm-w5-s14 color-7">$20</p>
															</>
														)}
													</DropDownHeader>
													{isOpenFri && (
														<div
															className="customwidth"
															style={{
																width: "345px",
																height: "283px",
																position: "absolute",
															}}
														>
															<DropDownListContainer className="customdropcontainer">
																<DropDownList className="customdroptwo">
																	{options.map((k) => (
																		<ListItem
																			className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
																			onClick={() => {
																				onOptionClickedFri(k);
																			}}
																			value={k}
																		>
																			{k}
																		</ListItem>
																	))}
																</DropDownList>
															</DropDownListContainer>
														</div>
													)}
												</DropDownContainer>
											</div>
										</div>
									</div>
								</>
							)}
						</div>

						<>
							<div
								className="row"
								style={{ display: "flex", alignItems: "center" }}
							>
								<div
									className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2 w100"
									style={{ paddingBottom: "10px", width: "50px" }}
								>
									<div
										style={{
											display: "flex",
											height: "40px",
											width: "40px",
											border: "1px solid #777777",
											borderRadius: "50%",
											backgroundColor: weekends ? (blackSat ? "#000" : "") : "",
										}}
										onClick={() => {
											if (weekends === true) {
												setBlackSat(!blackSat);
												onChangeWorkingDays("Sat");
											}
										}}
									>
										<p
											style={{
												fontFamily: "Mulish",
												margin: "auto",
												cursor: "pointer",
												color: weekends ? (blackSat ? "#fff" : "#000") : "",
											}}
											className="fm-w6-s12"
										>
											SAT
										</p>
									</div>
								</div>
								<div
									className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3 p-10 line"
									style={{
										// paddingBottom: "10px",
										marginBottom: "-10px",
										width: "200px",
										paddingLeft: "30px",
									}}
								>
									<div
										style={{
											display: "flex",
											height: "45px",
											width: "143px",
											background: "#F4F4F4",
											borderRadius: "22.5px",
										}}
									>
										<p
											style={{
												fontFamily: "Mulish",
												margin: "auto",
												color: "#777777",
											}}
											className="fm-w6-s12"
										>
											{blackSat && (
												<input
													name="satdayend"
													style={{
														height: "45px",
														width: "143px",
														background: "#F4F4F4",
														border: "#F4F4F4",
														borderRadius: "22.5px",
														textAlign: "center",
													}}
													disabled={weekends ? (blackSat ? false : true) : true}
													type="time"
													value={blackSat ? satdayStart : ""}
													onChange={(e) => setSatdayStart(e.target.value)}
												/>
											)}
										</p>
									</div>
								</div>
								<div
									className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3"
									style={{ paddingBottom: "10px" }}
								>
									<div
										style={{
											display: "flex",
											height: "45px",
											width: "143px",
											background: "#F4F4F4",
											borderRadius: "22.5px",
										}}
									>
										<p
											style={{
												fontFamily: "Mulish",
												margin: "auto",
												color: "#777777",
											}}
											className="fm-w6-s12"
										>
											{blackSat && (
												<input
													name="satdayend"
													style={{
														height: "45px",
														width: "143px",
														background: "#F4F4F4",
														border: "#F4F4F4",
														borderRadius: "22.5px",
														textAlign: "center",
													}}
													disabled={weekends ? (blackSat ? false : true) : true}
													type="time"
													value={blackSat ? satdayEnd : ""}
													onChange={(e) => setSatdayEnd(e.target.value)}
												/>
											)}
										</p>
									</div>
								</div>
								{blackSat && weekends && (
									<>
										<div
											className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2 w100"
											style={{
												paddingBottom: "10px",
												width: "157px",
												display: "flex",
												alignItems: "center",
												// paddingLeft: "50px",
											}}
										>
											<label className="aecontainer f-fm fm-w4-s16">
												Add late fees
												<input
													type="checkbox"
													name="addlateFeesat"
													checked={addlatefeesat}
													onChange={() => {
														setAddlatefeesat(!addlatefeesat);
													}}
												/>
												<span className="checkmark"></span>
											</label>
										</div>
										<div
											className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3 p-10 marginbottom"
											style={{
												// paddingBottom: "10px",
												// marginBottom: "20px",
												width: "200px",
												paddingLeft: "30px",
											}}
										>
											<div
												className="row "
												style={{
													display: addlatefeesat ? "flex" : "none",
													height: "45px",
												}}
											>
												<div className="col-xl-11 col-lg-12 col-md-12 col-xs-12 col-sm-12">
													<DropDownContainer
														className="customdropmain"
														ref={late}
													>
														<DropDownHeader
															onClick={togglingSat}
															className="form-select form-select-lg mb-1 select-round-custom-dropdown-general"
															style={{
																paddingTop: "10px",
																backgroundColor: "#F4F4F4",
															}}
														>
															{selectedlatefeesat && (
																<>
																	<p
																		className="f-fm fm-w6-s12"
																		style={{ color: "#777777" }}
																	>
																		Amount
																	</p>
																	<p className="f-fm fm-w4-s14 color-7">
																		{selectedlatefeesat}
																	</p>
																</>
															)}
															{!selectedlatefeesat && (
																<>
																	<p
																		className="f-fm fm-w6-s12"
																		style={{ color: "#777777" }}
																	>
																		Amount
																	</p>
																	<p className="f-fm fm-w5-s14 color-7">$20</p>
																</>
															)}
														</DropDownHeader>
														{isOpenSat && (
															<div
																className="customwidth"
																style={{
																	width: "345px",
																	height: "283px",
																	position: "absolute",
																}}
															>
																<DropDownListContainer className="customdropcontainer">
																	<DropDownList className="customdroptwo">
																		{options.map((k) => (
																			<ListItem
																				className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
																				onClick={() => {
																					onOptionClickedSat(k);
																				}}
																				value={k}
																			>
																				{k}
																			</ListItem>
																		))}
																	</DropDownList>
																</DropDownListContainer>
															</div>
														)}
													</DropDownContainer>
												</div>
											</div>
										</div>
									</>
								)}
							</div>
						</>
					</div>
				)}
				{toggle === true && (
					<div className="row" style={{ paddingTop: "20px" }}>
						<>
							<div
								className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1"
								style={{ paddingBottom: "10px", width: "50px" }}
							>
								<div
									style={{
										display: "flex",
										height: "40px",
										width: "40px",
										border: "1px solid #777777",
										borderRadius: "50%",
										backgroundColor: weekends ? (blackSun ? "#000" : "") : "",
									}}
									onClick={() => {
										if (weekends === true) {
											setBlackSun(!blackSun);
											onChangeWorkingDays("Sun");
										}
									}}
								>
									<p
										style={{
											fontFamily: "Mulish",
											margin: "auto",
											color: weekends ? (blackSun ? "#fff" : "#000") : "",
											cursor: "pointer",
										}}
										className="fm-w6-s12"
									>
										SUN
									</p>
								</div>
							</div>
						</>

						<div
							className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1"
							style={{ paddingBottom: "10px", width: "50px" }}
						>
							<div
								style={{
									display: "flex",
									height: "40px",
									width: "40px",
									border: "1px solid #777777",
									borderRadius: "50%",
									backgroundColor: black ? "#000000" : "",
								}}
								onClick={() => {
									setBlack(!black);
									onChangeWorkingDays("Mon");
								}}
							>
								<p
									style={{
										fontFamily: "Mulish",
										margin: "auto",
										color: black ? "#fff" : "#000",
										cursor: "pointer",
									}}
									className="fm-w6-s12"
								>
									MON
								</p>
							</div>
						</div>
						<div
							className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1"
							style={{ paddingBottom: "10px", width: "50px" }}
						>
							<div
								style={{
									display: "flex",
									height: "40px",
									width: "40px",
									border: "1px solid #777777",
									borderRadius: "50%",
									backgroundColor: black1 ? "#000000" : "",
								}}
								onClick={() => {
									setBlack1(!black1);
									onChangeWorkingDays("Tue");
								}}
							>
								<p
									style={{
										fontFamily: "Mulish",
										margin: "auto",
										color: black1 ? "#fff" : "#000",
										cursor: "pointer",
									}}
									className="fm-w6-s12"
								>
									TUE
								</p>
							</div>
						</div>
						<div
							className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1"
							style={{ paddingBottom: "10px", width: "50px" }}
						>
							<div
								style={{
									display: "flex",
									height: "40px",
									width: "40px",
									border: "1px solid #777777",
									borderRadius: "50%",
									backgroundColor: black2 ? "#000000" : "",
								}}
								onClick={() => {
									setBlack2(!black2);
									onChangeWorkingDays("Wed");
								}}
							>
								<p
									style={{
										fontFamily: "Mulish",
										margin: "auto",
										color: black2 ? "#fff" : "#000",
										cursor: "pointer",
									}}
									className="fm-w6-s12"
								>
									WED
								</p>
							</div>
						</div>
						<div
							className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1"
							style={{ paddingBottom: "10px", width: "50px" }}
						>
							<div
								style={{
									display: "flex",
									height: "40px",
									width: "40px",
									border: "1px solid #777777",
									borderRadius: "50%",
									backgroundColor: black3 ? "#000000" : "",
								}}
								onClick={() => {
									setBlack3(!black3);
									onChangeWorkingDays("Thu");
								}}
							>
								<p
									style={{
										fontFamily: "Mulish",
										margin: "auto",
										color: black3 ? "#fff" : "#000",
										cursor: "pointer",
									}}
									className="fm-w6-s12"
								>
									THU
								</p>
							</div>
						</div>
						<div
							className="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1"
							style={{ paddingBottom: "10px", width: "50px" }}
						>
							<div
								style={{
									display: "flex",
									height: "40px",
									width: "40px",
									border: "1px solid #777777",
									borderRadius: "50%",
									backgroundColor: black4 ? "#000000" : "",
								}}
								onClick={() => {
									setBlack4(!black4);
									onChangeWorkingDays("Fri");
								}}
							>
								<p
									style={{
										fontFamily: "Mulish",
										margin: "auto",
										color: black4 ? "#fff" : "#000",
										cursor: "pointer",
									}}
									className="fm-w6-s12"
								>
									FRI
								</p>
							</div>
						</div>

						<>
							{" "}
							<div
								className="col-xl-2 col-lg-2 col-md-2 col-xs-2 col-sm-2"
								style={{ paddingBottom: "10px", width: "50px" }}
							>
								<div
									style={{
										display: "flex",
										height: "40px",
										width: "40px",
										border: "1px solid #777777",
										borderRadius: "50%",
										backgroundColor: weekends ? (blackSat ? "#000" : "") : "",
									}}
									onClick={() => {
										if (weekends === true) {
											setBlackSat(!blackSat);
											onChangeWorkingDays("Sat");
										}
									}}
								>
									<p
										style={{
											fontFamily: "Mulish",
											margin: "auto",
											cursor: "pointer",
											color: weekends ? (blackSat ? "#fff" : "#000") : "",
										}}
										className="fm-w6-s12"
									>
										SAT
									</p>
								</div>
							</div>
						</>

						<div className="row" style={{ paddingTop: "20px" }}>
							<div
								className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3 line1"
								style={{
									paddingBottom: "10px",
									width: "200px",
									// marginBottom: "-10px",
								}}
							>
								<div
									style={{
										display: "flex",
										height: "45px",
										width: "143px",
										background: "#F4F4F4",
										borderRadius: "22.5px",
									}}
								>
									<p
										style={{
											fontFamily: "Mulish",
											margin: "auto",
											color: "#777777",
										}}
										className="fm-w6-s12"
									>
										<input
											name="allstart"
											style={{
												height: "45px",
												width: "143px",
												background: "#F4F4F4",
												border: "#F4F4F4",
												borderRadius: "22.5px",
												textAlign: "center",
											}}
											type="time"
											value={allStart}
											onChange={(e) => setAllStart(e.target.value)}
										/>
									</p>
								</div>
							</div>

							<div
								className="col-xl-3 col-lg-3 col-md-3 col-xs-3 col-sm-3"
								style={{ paddingBottom: "10px" }}
							>
								<div
									style={{
										display: "flex",
										height: "45px",
										width: "143px",
										background: "#F4F4F4",
										borderRadius: "22.5px",
									}}
								>
									<p
										style={{
											fontFamily: "Mulish",
											margin: "auto",
											color: "#777777",
										}}
										className="fm-w6-s12"
									>
										<input
											name="allend"
											style={{
												height: "45px",
												width: "143px",
												background: "#F4F4F4",
												border: "#F4F4F4",
												borderRadius: "22.5px",
												textAlign: "center",
											}}
											type="time"
											value={allEnd}
											onChange={(e) => setAllEnd(e.target.value)}
										/>
									</p>
								</div>
							</div>
						</div>
					</div>
				)}

				{toggle === true && (
					<>
						<div className="row">
							<div
								className="col-xl col-lg col-md col-xs col-sm"
								style={{ paddingBottom: "10px", paddingTop: "50px" }}
							>
								<label className="aecontainer f-fm fm-w4-s16">
									Add late fees
									<input
										type="checkbox"
										name="addlateFee"
										checked={addlatefee}
										onChange={() => {
											setAddlatefee(!addlatefee);
										}}
									/>
									<span className="checkmark"></span>
								</label>
							</div>
						</div>

						<>
							<p
								className="fm-w4-s16"
								style={{
									width: "600px",
									paddingTop: "10px",
									paddingBottom: "20px",
								}}
							>
								If the user chooses to book treatment during this time period,
								they will be asked to pay these additional amounts.
							</p>
							{/* {addlatefee && <div style={{ pointerEvents:"none" }}> <>  } */}
							<div
								className="row pt-3"
								style={{ pointerEvents: addlatefee ? "all" : "none" }}
							>
								<div className="col-xl-6  col-lg-6 col-md-12 col-xs-12 col-sm-12">
									<DropDownContainer className="customdropmain" ref={late}>
										<DropDownHeader
											onClick={toggling}
											className="form-select form-select-lg mb-1 select-round-custom-dropdown-general"
											style={{ paddingTop: "10px", backgroundColor: "#F4F4F4" }}
										>
											{selectedlatefee && (
												<>
													<p
														className="f-fm fm-w6-s12"
														style={{ color: "#777777" }}
													>
														Late fees amount
													</p>
													<p className="f-fm fm-w4-s14 color-7">
														{selectedlatefee}
													</p>
												</>
											)}
											{!selectedlatefee && (
												<>
													<p
														className="f-fm fm-w6-s12"
														style={{ color: "#777777" }}
													>
														Late fees amount
													</p>
													<p className="f-fm fm-w5-s14 color-7">$20</p>
												</>
											)}
										</DropDownHeader>
										{isOpen && (
											<div
												className="customwidth"
												style={{
													width: "345px",
													height: "283px",
													position: "absolute",
												}}
											>
												<DropDownListContainer className="customdropcontainer">
													<DropDownList className="customdroptwo">
														{options.map((k) => (
															<ListItem
																className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
																onClick={() => {
																	onOptionClicked(k);
																}}
																value={k}
															>
																{k}
															</ListItem>
														))}
													</DropDownList>
												</DropDownListContainer>
											</div>
										)}
									</DropDownContainer>
								</div>
							</div>
							<br></br>
							<div
								className="row pt-3"
								style={{
									pointerEvents: addlatefee ? "all" : "none",
									display: "none",
								}}
							>
								<div
									className="col-xl-6  col-lg-6 col-md-12 col-xs-12 col-sm-12"
									// style={{ width: "190px" }}
								>
									<DropDownContainer className="customdropmain" ref={fro}>
										<DropDownHeader
											onClick={toggling2}
											className="form-select form-select-lg mb-1 select-round-custom-dropdown-calender"
											style={{ backgroundColor: "#F4F4F4" }}
										>
											{selectedfrom && (
												<>
													<p
														className="f-fm fm-w6-s12"
														style={{ color: "#777777" }}
													>
														From
													</p>
													<p className="f-fm fm-w5-s14 color-7">
														{selectedfrom}
													</p>
												</>
											)}
											{!selectedfrom && (
												<>
													<p
														className="f-fm fm-w6-s12"
														style={{ color: "#777777" }}
													>
														From
													</p>
													<p className="f-fm fm-w5-s14 color-7">4:00 PM</p>
												</>
											)}
										</DropDownHeader>
										{isOpen2 && (
											<div
												className="customwidth"
												style={{
													width: "345px",
													height: "283px",
													position: "absolute",
												}}
											>
												<DropDownListContainer className="customdropcontainer">
													<DropDownList className="customdroptwo">
														{options2.map((k) => (
															<ListItem
																className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
																onClick={() => {
																	onOptionClicked2(k);
																}}
																value={k}
															>
																{k}
															</ListItem>
														))}
													</DropDownList>
												</DropDownListContainer>
											</div>
										)}
									</DropDownContainer>
								</div>
							</div>
							{/* {addlatefee && </div>} */}
							<br></br>
						</>
					</>
				)}
				{/* )} */}
			</div>

			<div className="row pt-5">
				<div className="col-xl col-lg col-md col-xs col-sm">
					<label className="">View Options</label>
				</div>

				<div className="row">
					<div className="col-xl col-lg col-md col-xs col-sm">
						<hr
							style={{
								color: "rgb(149 142 142)",
								backgroundColor: "#000000",
								height: 2,
							}}
						/>
					</div>
				</div>
				<div className="row" style={{ display: "none" }}>
					<div
						className="col-xl col-lg col-md col-xs col-sm"
						style={{ paddingBottom: "10px", paddingTop: "10px" }}
					>
						<label
							className="aecontainer f-fm fm-w4-s16"
							style={{ color: "#000000" }}
						>
							Show declined appointment
							<input
								type="checkbox"
								name="declined"
								checked={declined}
								onChange={() => {
									setDeclined(!declined);
								}}
							/>
							<span className="checkmark"></span>
						</label>
					</div>
				</div>
				<div className="row" style={{ display: "none" }}>
					<div
						className="col-xl col-lg col-md col-xs col-sm"
						style={{ paddingBottom: "10px", paddingTop: "10px" }}
					>
						<label
							className="aecontainer f-fm fm-w4-s16"
							style={{ color: "#000000" }}
						>
							Display shorter appointment/ consultation the same size as 15
							minute height of card
							<input
								type="checkbox"
								name="shorterappointment"
								checked={shorterAppointment}
								onChange={() => {
									setShorterAppointment(!shorterAppointment);
								}}
							/>
							<span className="checkmark"></span>
						</label>
					</div>
				</div>
				<div className="row pt-3 pb-5">
					<div className="col-xl-6  col-lg-6 col-md-12 col-xs-12 col-sm-12">
						<DropDownContainer className="customdropmain" ref={start}>
							<DropDownHeader
								onClick={toggling3}
								className="form-select form-select-lg mb-1 select-round-custom-dropdown-general"
								style={{ paddingTop: "10px", backgroundColor: "#F4F4F4" }}
							>
								{selectedstartfrom && (
									<>
										<p className="f-fm fm-w6-s12" style={{ color: "#777777" }}>
											Starts week on
										</p>
										<p className="f-fm fm-w4-s14 color-7">
											{selectedstartfrom}
										</p>
									</>
								)}
								{!selectedstartfrom && (
									<>
										<p className="f-fm fm-w6-s12" style={{ color: "#777777" }}>
											Starts week on
										</p>
										<p className="f-fm fm-w5-s14 color-7">Sunday</p>
									</>
								)}
							</DropDownHeader>
							{isOpen3 && (
								<div
									className="customwidth"
									style={{
										width: "345px",
										height: "283px",
										position: "absolute",
									}}
								>
									<DropDownListContainer className="customdropcontainer">
										<DropDownList className="customdroptwo">
											{options3.map((k) => (
												<ListItem
													className="f-fm fm-w5-s14 color-7 customdroplistitemtwo"
													onClick={() => {
														onOptionClicked3(k);
													}}
													value={k}
												>
													{k}
												</ListItem>
											))}
										</DropDownList>
									</DropDownListContainer>
								</div>
							)}
						</DropDownContainer>
					</div>
					<div className="mt-5">
						<button
							type="btn"
							style={{
								borderRadius: "40px",
								width: "201px",
								height: "60px",
								background: "#000000",
							}}
							onClick={() => {
								updateSettings();
							}}
						>
							<label
								style={{ color: "white", cursor: "pointer" }}
								className=" f-fm fm-w6-s20"
							>
								Save
							</label>
						</button>
					</div>
				</div>
			</div>
			{istoastc && (
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="colored"
				/>
			)}
		</div>
	);
};
export default Calender;
