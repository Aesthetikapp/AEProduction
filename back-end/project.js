const Express = require("express");
const mongoose = require("mongoose");
const ExpressGraphQL = require("express-graphql").graphqlHTTP;
const personschema = require("./schema/personschema");
const userschema = require("./schema/aeuserschema");
const UserModel = require("./models/aeuser");
const patienthistorymodel = require("./models/patienthistory");
const subscriptionhistorymodel = require("./models/subscriptionhistory");
const settings = require("./models/settings");
const appointmentschema = require("./schema/appointmentschema");
const patientschema = require("./schema/patientschema");
const questionschema = require("./schema/questionschema");
const patienthistoryschema = require("./schema/patienthistoryschema");
const settingsschema = require("./schema/settingsschema");
const patientsettingsschema = require("./schema/patientsettingsschema");
const subscriptionschema = require("./schema/subscriptionschema");
const allergiesschema = require("./schema/allergiesschema");
const notificationschema = require("./schema/notificationschema");
const appnotificationschema = require("./schema/appnotificationschema");
const patientpaymentschema = require("./schema/patientpaymentschema");
const patientpaymentdetailsschema = require("./schema/patientpaymentdetailsschema");
const bodymasterschema = require("./schema/bodymasterschema");
const globaltreatmentsschema = require("./schema/globaltreatmentsschema");
const treatmenttypeschema = require("./schema/treatmenttypeschema");
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");
const axios = require("axios");
const dotenv = require("dotenv");
const AWS = require("aws-sdk");
const moment = require("moment");
const appointment = require("./models/appointment");
const patient = require("./models/patient");
const TreatmentsModel = require("./models/treatments");
const patientsettings = require("./models/patientsettings");
const appnotification = require("./models/appnotification");
const patientpayment = require("./models/patientpayment");
const subscriptionhistory = require("./models/subscriptionhistory");
const email = require("./email");
const crypto = require("crypto");
const FormData = require("form-data");
const {
	RtcTokenBuilder,
	RtcRole,
	RtmTokenBuilder,
	RtmRole,
	AccessToken,
} = require("agora-access-token"); // By Naresh
const { ServiceChat, AccessToken2 } = require("./agorachat/AccessToken2.js");
var base64 = require("base-64");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const session = require("express-session");
var app = Express();
var cors = require("cors");

app.use(cors());
app.use(Express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());
const { resolve } = require("path");
const subscriptionhistoryschema = require("./schema/subscriptionhistoryschema");

const APP_ID = process.env.APP_ID;
const APP_CERTIFICATE = process.env.APP_CERTIFICATE;

const nocache = (_, resp, next) => {
	resp.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
	resp.header("Expires", "-1");
	resp.header("Pragma", "no-cache");
	next();
};

const ping = (req, resp) => {
	resp.send({ message: "pong" });
};

const generateRTCToken = (req, resp) => {
	// set response header
	resp.header("Access-Control-Allow-Origin", "*");
	// get channel name
	const channelName = req.params.channel;
	if (!channelName) {
		return resp.status(500).json({ error: "channel is required" });
	}
	// get uid
	let uid = req.params.uid;
	if (!uid || uid === "") {
		return resp.status(500).json({ error: "uid is required" });
	}
	// get role
	let role;
	if (req.params.role === "publisher") {
		role = RtcRole.PUBLISHER;
	} else if (req.params.role === "audience") {
		role = RtcRole.SUBSCRIBER;
	} else {
		return resp.status(500).json({ error: "role is incorrect" });
	}
	// get the expire time
	let expireTime = req.query.expiry;
	if (!expireTime || expireTime === "") {
		expireTime = 3600;
	} else {
		expireTime = parseInt(expireTime, 10);
	}
	// calculate privilege expire time
	const currentTime = Math.floor(Date.now() / 1000);
	const privilegeExpireTime = currentTime + expireTime;
	// build the token
	let token;
	if (req.params.tokentype === "userAccount") {
		token = RtcTokenBuilder.buildTokenWithAccount(
			APP_ID,
			APP_CERTIFICATE,
			channelName,
			uid,
			role,
			privilegeExpireTime
		);
	} else if (req.params.tokentype === "uid") {
		token = RtcTokenBuilder.buildTokenWithUid(
			APP_ID,
			APP_CERTIFICATE,
			channelName,
			uid,
			role,
			privilegeExpireTime
		);
	} else {
		return resp.status(500).json({ error: "token type is invalid" });
	}
	// return the token
	return resp.json({ rtcToken: token });
};

app.options("*", cors());
app.get("/ping", nocache, ping);
app.get("/rtc/:channel/:role/:tokentype/:uid", nocache, generateRTCToken);

AWS.config.update({
	accessKeyId: process.env.ACCESS_KEY,
	secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
	params: { Bucket: process.env.S3_BUCKET },
	region: process.env.REGION,
});

mongoose
	.connect(process.env.MONGO_URL, {
		auth: {
			username: process.env.MONGO_USERNAME,
			password: process.env.MONGO_PASSWORD,
		},
	})
	.then(() => console.log("Connected to database..."))
	.catch((err) => console.error(err));

app.use("/person", ExpressGraphQL({ schema: personschema, graphiql: true }));

app.use("/aeuser", ExpressGraphQL({ schema: userschema, graphiql: true }));

app.use("/patient", ExpressGraphQL({ schema: patientschema, graphiql: true }));

app.use(
	"/patienthistory",
	ExpressGraphQL({ schema: patienthistoryschema, graphiql: true })
);

app.use(
	"/question",
	ExpressGraphQL({ schema: questionschema, graphiql: true })
);

app.use(
	"/patientpayment",
	ExpressGraphQL({ schema: patientpaymentschema, graphiql: true })
);

app.use(
	"/subscriptionhistory",
	ExpressGraphQL({ schema: subscriptionhistoryschema, graphiql: true })
);

app.use(
	"/patientpaymentdetails",
	ExpressGraphQL({ schema: patientpaymentdetailsschema, graphiql: true })
);

app.use(
	"/notification",
	ExpressGraphQL({ schema: notificationschema, graphiql: true })
);

app.use(
	"/appnotification",
	ExpressGraphQL({ schema: appnotificationschema, graphiql: true })
);

app.use(
	"/appointment",
	ExpressGraphQL({ schema: appointmentschema, graphiql: true })
);

app.use(
	"/usersettings",
	ExpressGraphQL({ schema: settingsschema, graphiql: true })
);

app.use(
	"/patientsettings",
	ExpressGraphQL({ schema: patientsettingsschema, graphiql: true })
);

app.use(
	"/subscription",
	ExpressGraphQL({ schema: subscriptionschema, graphiql: true })
);

app.use(
	"/allergies",
	ExpressGraphQL({ schema: allergiesschema, graphiql: true })
);

// app.use(
// 	"/notification",
// 	ExpressGraphQL({ schema: notificationschema, graphiql: true })
// );

app.use(
	"/bodymaster",
	ExpressGraphQL({ schema: bodymasterschema, graphiql: true })
);

app.use(
	"/treatments",
	ExpressGraphQL({ schema: globaltreatmentsschema, graphiql: true })
);

app.use(
	"/treatmenttype",
	ExpressGraphQL({ schema: treatmenttypeschema, graphiql: true })
);

app.use(
	session({
		secret: "jhsdfkjhhdsjkusdfuyehcbgaqoap",
		resave: false,
		saveUninitialized: true,
	})
);

// app.get("/", (req, res) => {
// 	const path = resolve(`${req.headers.origin}/payment`);
// 	res.sendFile(path);
// });

app.post("/onboard-user", async (req, res) => {
	// console.log("req", req.body.state);
	console.log("req session", req.session);
	try {
		const account = await stripe.accounts.create({
			type: "standard",
		});
		// Store the ID of the new Standard connected account.
		req.session.accountID = account.id;

		UserModel.updateOne(
			{ _id: req.body.state.id },
			{ $set: { stripeaccount: account.id, stripestatus: "pending" } },
			function (err, result) {
				if (err) {
					console.log(err);
				} else {
					// console.log(result);
				}
			}
		);
		const origin = `${req.headers.origin}`;
		const accountLink = await stripe.accountLinks.create({
			type: "account_onboarding",
			account: account.id,
			refresh_url: `${origin}/onboard-user/refresh?accountid=${account.id}&id=${req.body.state.id}`,
			return_url: `${origin}/stripeaccountdone?id=${req.body.state.id}`,
		});
		// console.log("account", account);
		// console.log("accountLink.url", accountLink.url);
		res.send(accountLink.url);
		// res.redirect(303, accountLink.url);
	} catch (err) {
		res.status(500).send({
			error: err.message,
		});
	}
});

app.post("/onboard-user/refresh", async (req, res) => {
	console.log("body", req.body);
	console.log("req session refresh", req.session);
	if (!req.body.accountId) {
		// res.redirect("/payment");
		res.send("/payment");
		return;
	}
	try {
		// const { accountID } = req.body.accountId;
		// const origin = `${req.secure ? "https://" : "http://"}${req.headers.host}`;
		const origin = `${req.headers.origin}`;
		console.log("origin", origin);

		const accountLink = await stripe.accountLinks.create({
			type: "account_onboarding",
			account: req.body.accountId,
			refresh_url: `${origin}/onboard-user/refresh?accountid=${req.body.accountId}&id=${req.body.id}`,
			return_url: `${origin}/stripeaccountdone?id=${req.body.id}`,
		});

		console.log("accountLink.url", accountLink);
		res.send(accountLink.url);
		// res.redirect(303, accountLink.url);
	} catch (err) {
		res.status(500).send({
			error: err.message,
		});
	}
});

app.post("/startRecording", (req, res) => {
	const appId = process.env.APP_ID;
	const resId = req.body.resId;
	const token = req.body.token;
	const uid = req.body.uid;
	const doctorId = req.body.doctorId;
	const appointmentId = req.body.appointmentId;
	const cname = req.body.cname;

	var data = JSON.stringify({
		uid: "" + uid,
		cname: "" + cname,
		clientRequest: {
			token: "" + token,
			recordingConfig: {
				maxIdleTime: 30,
				streamTypes: 2,
				//"streamMode": "standard",
				audioProfile: 1,
				channelType: 0,
				videoStreamType: 0,
				transcodingConfig: {
					height: 640,
					width: 360,
					bitrate: 500,
					fps: 15,
					mixedVideoLayout: 1,
					backgroundColor: "#FF0000",
				},
				//"subscribeVideoUids": [uidPatient,uid],
				//"subscribeAudioUids": ["#allstream#"],
				subscribeUidGroup: 0,
			},
			recordingFileConfig: {
				avFileType: ["hls", "mp4"],
			},
			storageConfig: {
				accessKey: process.env.ACCESS_KEY,
				region: 0,
				bucket: process.env.S3_BUCKET,
				secretKey: process.env.SECRET_ACCESS_KEY,
				vendor: 1,
				fileNamePrefix: ["" + doctorId, "" + appointmentId, "video"],
			},
		},
	});

	var config = {
		method: "post",
		url:
			process.env.AGORA_URL +
			appId +
			"/cloud_recording/resourceid/" +
			resId +
			"/mode/mix/start",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Basic " + process.env.AGORA_AUTHORIZATION,
		},
		data: data,
	};

	axios(config)
		.then(function (response) {
			// console.log(JSON.stringify(response.data));
			return res.send(JSON.stringify(response.data));
		})
		.catch(function (error) {
			console.log(error);
		});
});

app.post("/endRecording", (req, res) => {
	const appId = process.env.APP_ID;
	const resId = req.body.resId;
	const sid = req.body.sid;
	const uid = req.body.uid;
	const cname = req.body.cname;

	// console.log(req.body.resId);
	var data = JSON.stringify({
		cname: "" + cname,
		uid: "" + uid,
		clientRequest: {},
	});

	var config = {
		method: "post",
		url:
			"http://api.agora.io/v1/apps/" +
			appId +
			"/cloud_recording/resourceid/" +
			resId +
			"/sid/" +
			sid +
			"/mode/mix/stop",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Basic " + process.env.AGORA_AUTHORIZATION,
		},
		data: data,
	};

	axios(config)
		.then(function (response) {
			// console.log(JSON.stringify(response.data));
			return res.send(JSON.stringify(response.data));
		})
		.catch(function (error) {
			console.log(error);
		});
});

app.get("/getAgoraAppToken", (req, res) => {
	//Agora chat token generator.
	let at = new AccessToken2(
		APP_ID,
		APP_CERTIFICATE,
		new Date().getTime() / 1000,
		6000
	);
	let sc = new ServiceChat();
	sc.add_privilege(ServiceChat.kPrivilegeApp, 6000);
	at.add_service(sc);
	const appToken = at.build();
	// console.log("-appToken: " + appToken);
	res.send(appToken);
});

app.get("/getAllTreatmentids", (req, res) => {
	var tempArray = [];
	appointment.find({}, function (error, data) {
		// return res.send(data);
		data.forEach((treatment) => {
			var tempArray1 = treatment.treatmentid[0].split(",");
			// console.log("tempArray1", tempArray1);
			for (var i = 0; i < tempArray1.length; i++) {
				if (!tempArray.includes(tempArray1[i])) {
					tempArray.push(tempArray1[i]);
				}
			}
		});
		return res.send(tempArray);
		// console.log(tempArray);
		// console.log(res.json(tempArray));

		//handle error case also
	});
});

app.post("/stripeevents", (req, res) => {
	console.log("stripe", req.body);
	if (req.body.type === "charge.succeeded") {
		patienthistorymodel.updateOne(
			{ paymentintent: req.body.data.object.payment_intent },
			{ $set: { paymentstatus: "success" } },
			function (err, result) {
				if (err) {
					console.log("err", err);
				} else {
					// console.log("result update", result);
				}
			}
		);
	}
	if (
		req.body.type === "checkout.session.completed" &&
		req.body.data.object.payment_status === "paid"
	) {
		console.log("enter");
		subscriptionhistorymodel.updateOne(
			{ paymentintent: req.body.data.object.id },
			{ $set: { paymentstatus: "success" } },
			function (err, result) {
				if (err) {
					console.log("err", err);
				} else {
					// console.log("result update", result);
				}
			}
		);
	}
});

app.post("/stripeeventsconnect", (req, res) => {
	console.log("stripe connect", req.body);
	if (req.body.type === "account.updated") {
		// console.log("enter account");
		if (
			req.body.data.object.payouts_enabled === true &&
			req.body.data.object.charges_enabled === true
		) {
			// console.log("enter account condition");

			UserModel.updateOne(
				{ stripeaccount: req.body.account },
				{ $set: { stripestatus: "completed" } },
				function (err, result) {
					if (err) {
						console.log("err", err);
					} else {
						// console.log("result update", result);
					}
				}
			);
		}
	}
});

app.post("/sumsubstatuspost", (req, res) => {
	console.log("req post sumsub", req.body);

	if (req.body.levelName === "Patient-Level") {
		if (
			req.body.reviewStatus === "completed" &&
			req.body.reviewResult.reviewAnswer === "GREEN"
		) {
			patient.updateOne(
				{ _id: req.body.externalUserId },
				{ $set: { sumsubstatus: "Approved" } },
				function (err, result) {
					if (err) {
						console.log(err);
					} else {
						// console.log(result);
					}
				}
			);
			patient.findOne({ _id: req.body.externalUserId }, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					// console.log(result);
					if (result !== null) {
						email.sendEmail({ type: "accepted", user: result });
						let patientData = returnNotificationData(
							result.channelid.split("|"),
							"ID verification",
							"All checks complete and approved",
							"patient",
							"KYC"
						);
						SendNotification(patientData);
					}
				}
			});
		}
		if (
			req.body.reviewStatus === "completed" &&
			req.body.reviewResult.reviewAnswer === "RED"
		) {
			patient.updateOne(
				{ _id: req.body.externalUserId },
				{ $set: { sumsubstatus: "error" } },
				function (err, result) {
					if (err) {
						console.log(err);
					} else {
						// console.log(result);
					}
				}
			);
			patient.findOne({ _id: req.body.externalUserId }, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					// console.log(result);
					if (result !== null) {
						email.sendEmail({ type: "error", user: result });
						let patientData = returnNotificationData(
							result.channelid.split("|"),
							"ID verification",
							"Something is not right, please try again ",
							"patient",
							"KYC"
						);
						SendNotification(patientData);
					}
				}
			});
		}
	} else {
		if (
			req.body.reviewStatus === "completed" &&
			req.body.reviewResult.reviewAnswer === "GREEN"
		) {
			UserModel.updateOne(
				{ _id: req.body.externalUserId },
				{ $set: { sumsubstatus: "accepted" } },
				function (err, result) {
					if (err) {
						console.log(err);
					} else {
						// console.log(result);
					}
				}
			);
			UserModel.findOne(
				{ _id: req.body.externalUserId },
				function (err, result) {
					if (err) {
						console.log(err);
					} else {
						// console.log(result);
						if (result !== null) {
							email.sendEmail({ type: "accepted", user: result });
							if (result.channelid !== "") {
								let data = returnNotificationData(
									result.channelid.split("|"),
									"ID verification",
									"All checks complete and approved",
									"doctor",
									"KYC"
								);
								SendNotification(data);
							}
						}
					}
				}
			);
		}
		if (
			req.body.reviewStatus === "completed" &&
			req.body.reviewResult.reviewAnswer === "RED"
		) {
			UserModel.updateOne(
				{ _id: req.body.externalUserId },
				{ $set: { sumsubstatus: "error" } },
				function (err, result) {
					if (err) {
						console.log(err);
					} else {
						// console.log(result);
					}
				}
			);
			UserModel.findOne(
				{ _id: req.body.externalUserId },
				function (err, result) {
					if (err) {
						console.log(err);
					} else {
						// console.log(result);
						if (result !== null) {
							email.sendEmail({ type: "error", user: result });
							if (result.channelid !== "") {
								let data = returnNotificationData(
									result.channelid.split("|"),
									"ID verification",
									"Something is not right, please try again ",
									"doctor",
									"KYC"
								);
								SendNotification(data);
							}
						}
					}
				}
			);
		}
	}
});

app.post("/pushNotificationsUpdate", (req, res) => {
	// console.log("Airship channel update", req.body);

	var updatedChannelid = "";
	if (req.body.role === "patient") {
		patient.findOne({ _id: req.body.id }, function (err, result) {
			if (err) {
				console.log(err);
			} else {
				if (result.channelid.includes(req.body.oldChannelId)) {
					updatedChannelid = result.channelid.replace(
						req.body.oldChannelId,
						req.body.channelId
					);
				} else {
					updatedChannelid =
						result.channelid +
						(result.channelid === "" ? "" : "|") +
						req.body.channelId;
				}
				// console.log("updatedChannelid", updatedChannelid);
				// email.sendEmail({ type: "accepted", user: result });
				patient.updateOne(
					{ _id: req.body.id },
					{ $set: { channelid: updatedChannelid } },
					function (err, result) {
						if (err) {
							console.log(err);
						} else {
							res.send(result);
							// console.log(result);
						}
					}
				);
			}
		});
	} else {
		UserModel.findOne({ _id: req.body.id }, function (err, result) {
			if (err) {
				console.log(err);
			} else {
				// console.log("result", result.channelid);

				if (result.channelid.includes(req.body.oldChannelId)) {
					updatedChannelid = result.channelid.replace(
						req.body.oldChannelId,
						req.body.channelId
					);
				} else {
					updatedChannelid =
						result.channelid +
						(result.channelid === "" ? "" : "|") +
						req.body.channelId;
				}
				// console.log("updatedChannelid", updatedChannelid);
				// email.sendEmail({ type: "accepted", user: result });
				UserModel.updateOne(
					{ _id: req.body.id },
					{ $set: { channelid: updatedChannelid } },
					function (err, result) {
						if (err) {
							console.log(err);
						} else {
							res.send(result);
							// console.log(result);
						}
					}
				);
			}
		});
	}
});

const returnNotificationData = (
	channelid,
	alertvalue,
	titlevalue,
	rolevalue,
	viewscreen
) => {
	// let patientdata = {
	// 	senddata: {
	// 		audience: {
	// 			OR: [
	// 				{
	// 					android_channel:
	// 						props.reschedule.patient_details[0].channelid.split("|"),
	// 				},
	// 				{
	// 					ios_channel:
	// 						props.reschedule.patient_details[0].channelid.split("|"),
	// 				},
	// 			],
	// 		},
	// 		notification: {
	// 			alert:
	// 				"The " +
	// 				props.reschedule.doctor_details[0].firstName +
	// 				" confirms the new appoint date and time.",
	// 		},
	// 		device_types: ["android", "ios"],
	// 	},
	// 	role: "patient",
	// };
	// console.log("channel", channelid);
	// console.log("alert", alertvalue);
	// console.log("title", titlevalue);
	// console.log("role", rolevalue);

	const deeplinkContent = {
		screen: "AppointmentScreen",
		appointmentId: viewscreen,
		navigateTo: "AppointmentDetails",
	};

	var returnstring = {
		senddata: {
			audience: {
				OR: [
					{
						android_channel: channelid,
					},
					{
						ios_channel: channelid,
					},
				],
				// android_channel: channelid,
			},
			notification: {
				alert: alertvalue,
				android: {
					title: titlevalue,
				},
				ios: {
					title: titlevalue,
				},
				actions: {
					open: {
						type: "deep_link",
						content: JSON.stringify(deeplinkContent),
						fallback_url:
							rolevalue === "doctor"
								? `doctorapp://aesthetik.app/appointment_screen/${viewscreen}`
								: `patientapp://aesthetik.app/appointment_screen/${viewscreen}`,
					},
				},
			},
			device_types: ["android", "ios"],
		},
		role: rolevalue,
	};

	return returnstring;
};

function Airshippushnotifications() {
	// var currentTime = moment().format("HH:mm");

	var currentdate = moment().format("YYYY-MM-DD") + "T00:00:00.000+00:00";
	var nextdate =
		moment().add(1, "days").format("YYYY-MM-DD") + "T00:00:00.000+00:00";
	// console.log("currentdate", currentdate, nextdate);
	// var currentdate = "2023-03-13";

	var currentTime = moment();
	// console.log("currentTime", moment().format("HH:mm"));
	// var endTime = moment("12:40", "HH:mm");

	// endTime.diff(startTime, "hours");
	// console.log(
	// 	'endTime.diff(startTime, "hours");',
	// 	endTime.diff(startTime, "minutes")
	// );

	appointment.aggregate(
		[
			{
				$match: {
					$or: [
						{ appointmentdate: new Date(currentdate) },
						{ appointmentdate: new Date(nextdate) },
						{ consultationdate: new Date(currentdate) },
					],
					// isnotificationenable: true,
				},
			},
			{
				$lookup: {
					from: "user_settings",
					localField: "doctorid",
					foreignField: "userid",
					as: "settings",
				},
			},
			{ $addFields: { doctorid: { $toObjectId: "$doctorid" } } },
			{
				$lookup: {
					from: "aesthetik_users", // collection to join
					localField: "doctorid", //field from the input documents
					foreignField: "_id", //field from the documents of the "from" collection
					as: "doctor_details", // output array field
				},
			},
			{ $addFields: { patientid: { $toObjectId: "$patientid" } } },
			{
				$lookup: {
					from: "patient_users",
					localField: "patientid",
					foreignField: "_id",
					as: "patient_details",
				},
			},
		],
		function (err, result) {
			// console.log(
			// 	"result of appt",
			// 	values.settings[0].notification[0].e_apt_activity,
			// 	values.settings[0].notification[0].e_conslt_request
			// );
			// console.log("result", result.length);
			if (result !== undefined && result.length !== 0) {
				result.forEach((values) => {
					// console.log(
					// 	"enter",
					// 	values.patient_details[0].channelid.replaceAll("|", ",")
					// );
					// console.log("result of appt", values.id);
					var appointmenttime = moment(values.starttime, "HH:mm");
					var consultationtime = moment(values.cstarttime, "HH:mm");
					// console.log("appointmenttime", appointmenttime);
					// console.log(
					// 	"time",
					// 	appointmenttime.diff(currentTime, "minutes"),
					// 	consultationtime.diff(currentTime, "minutes")
					// 	// moment.duration((values.starttime).diff(currentTime))
					// );
					// console.log("result of appt", values.appointmentdate);
					// console.log(
					// 	moment(values.appointmentdate).format("YYYY-MM-DD") +
					// 		"T00:00:00.000+00:00" ===
					// 		currentdate
					// );
					var Notifications = [
						{
							expression:
								moment(values.appointmentdate).format("YYYY-MM-DD") +
									"T00:00:00.000+00:00" ===
									nextdate &&
								appointmenttime.diff(currentTime, "minutes") === 0,
							patienttitle: "Appointment Reminder",
							patientvalue:
								"Hey " +
								values.patient_details[0].firstName +
								" your appointment with " +
								values.doctor_details[0].firstName +
								" is happening soon in 24 hours",
							doctortitle: "Appointment Reminder",
							doctorvalue:
								"Hey " +
								values.doctor_details[0].firstName +
								" your appointment with " +
								values.patient_details[0].firstName +
								" is happening soon in 24 hours",
							time: "receiveNotification24hr",
							kind: "treatment",
						},
						{
							expression:
								moment(values.appointmentdate).format("YYYY-MM-DD") +
									"T00:00:00.000+00:00" ===
									currentdate &&
								appointmenttime.diff(currentTime, "minutes") === 120,
							patienttitle: "Appointment Reminder",
							patientvalue:
								"Hey " +
								values.patient_details[0].firstName +
								" your appointment with " +
								values.doctor_details[0].firstName +
								" is happening soon in 2 hours",
							doctortitle: "Appointment Reminder",
							doctorvalue:
								"Hey " +
								values.doctor_details[0].firstName +
								" your appointment with " +
								values.patient_details[0].firstName +
								" is happening soon in 2 hours",
							time: "receiveNotification2hr",
							kind: "treatment",
						},
						{
							expression:
								moment(values.appointmentdate).format("YYYY-MM-DD") +
									"T00:00:00.000+00:00" ===
									currentdate &&
								appointmenttime.diff(currentTime, "minutes") === 60,
							patienttitle: "Appointment Reminder",
							patientvalue:
								"Hey " +
								values.patient_details[0].firstName +
								" your appointment with " +
								values.doctor_details[0].firstName +
								" is happening soon in 1 hour",
							doctortitle: "Appointment Reminder",
							doctorvalue:
								"Hey " +
								values.doctor_details[0].firstName +
								" your appointment with " +
								values.patient_details[0].firstName +
								" is happening soon in 1 hour",
							time: "receiveNotification1hr",
							kind: "treatment",
						},
						{
							expression:
								moment(values.appointmentdate).format("YYYY-MM-DD") +
									"T00:00:00.000+00:00" ===
									currentdate &&
								appointmenttime.diff(currentTime, "minutes") === 15,
							patienttitle: "Appointment Reminder",
							patientvalue:
								"Hey " +
								values.patient_details[0].firstName +
								" your appointment with " +
								values.doctor_details[0].firstName +
								" is happening soon in 15 mins",
							doctortitle: "Appointment Reminder",
							doctorvalue:
								"Hey " +
								values.doctor_details[0].firstName +
								" your appointment with " +
								values.patient_details[0].firstName +
								" is happening soon in 15 mins",
							time: "receiveNotification2hr",
							kind: "treatment",
						},
						{
							expression:
								moment(values.consultationdate).format("YYYY-MM-DD") +
									"T00:00:00.000+00:00" ===
									nextdate &&
								consultationtime.diff(currentTime, "minutes") === 0,
							patienttitle: "Consultation Reminder",
							patientvalue:
								"Hey " +
								values.patient_details[0].firstName +
								" your consultation with " +
								values.doctor_details[0].firstName +
								" is happening in 24 hours",
							doctortitle: "Consultation Reminder",
							doctorvalue:
								"Hey " +
								values.doctor_details[0].firstName +
								" your consultation with " +
								values.patient_details[0].firstName +
								" is happening in 24 hours",
							time: "receiveNotification24hr",
							kind: "consultation",
						},
						{
							expression:
								moment(values.consultationdate).format("YYYY-MM-DD") +
									"T00:00:00.000+00:00" ===
									currentdate &&
								consultationtime.diff(currentTime, "minutes") === 120,
							patienttitle: "Consultation Reminder",
							patientvalue:
								"Hey " +
								values.patient_details[0].firstName +
								" your consultation with " +
								values.doctor_details[0].firstName +
								" starts in 2 hours",
							doctortitle: "Consultation Reminder",
							doctorvalue:
								"Hey " +
								values.doctor_details[0].firstName +
								" your consultation with " +
								values.patient_details[0].firstName +
								" starts in 2 hours",
							time: "receiveNotification2hr",
							kind: "consultation",
						},
						{
							expression:
								moment(values.consultationdate).format("YYYY-MM-DD") +
									"T00:00:00.000+00:00" ===
									currentdate &&
								consultationtime.diff(currentTime, "minutes") === 60,
							patienttitle: "Consultation Reminder",
							patientvalue:
								"Hey " +
								values.patient_details[0].firstName +
								" your consultation with " +
								values.doctor_details[0].firstName +
								" starts in 1 hr",
							doctortitle: "Consultation Reminder",
							doctorvalue:
								"Hey " +
								values.doctor_details[0].firstName +
								" your consultation with " +
								values.patient_details[0].firstName +
								" starts in 1 hour",
							time: "receiveNotification1hr",
							kind: "consultation",
						},
						{
							expression:
								moment(values.consultationdate).format("YYYY-MM-DD") +
									"T00:00:00.000+00:00" ===
									currentdate &&
								consultationtime.diff(currentTime, "minutes") === 15,
							patienttitle: "Consultation Reminder",
							patientvalue:
								"Hey " +
								values.patient_details[0].firstName +
								" your consultation with " +
								values.doctor_details[0].firstName +
								" starts in 15 mins",
							doctortitle: "Consultation Reminder",
							doctorvalue:
								"Hey " +
								values.doctor_details[0].firstName +
								" your consultation with " +
								values.patient_details[0].firstName +
								" starts in 15 mins",
							time: "receiveNotification15min",
							kind: "consultation",
						},
					];

					Object.values(Notifications).forEach((noti) => {
						if (noti.expression === true) {
							// console.log(noti);
							// var kind = noti.kind;
							if (values.isnotificationenable === true) {
								patientsettings.find(
									{
										patientid: values.patientid,
										[noti.kind]: {
											$elemMatch: {
												[noti.time]: true,
											},
										},
									},
									function (error, res) {
										let patientData = returnNotificationData(
											values.patient_details[0].channelid.split("|"),
											noti.patientvalue,
											noti.patienttitle,
											"patient",
											values._id.toString()
										);
										// appnotification.insertOne(
										// 	{
										// 		appointmentid: values.id,
										// 		patientid: patient.patientid,
										// 		date: currentdate,
										// 		time: currentTime,
										// 		title: noti.patienttitle,
										// 		description: noti.patientvalue,
										// 		isopened: false,
										// 	},
										// 	function (err, result) {
										// 		if (err) {
										// 			console.log(err);
										// 		} else {
										// 			console.log(result);
										// 		}
										// 	}
										// );
										const deeplinkContent = {
											screen: "AppointmentScreen",
											appointmentId: values._id.toString(),
											navigateTo: "AppointmentDetails",
										};
										let newdata = new appnotification({
											// appointmentid: "",
											// patientid: data.patientid,
											// date: moment().format("YYYY-MM-DD"),
											// time: moment().format("HH:mm"),
											// title: data.senddata.notification.android.title,
											// description: data.senddata.notification.alert,
											// kind: "reschedule",
											// isopened: false,
											// deeplink: "",
											appointmentid: values._id.toString(),
											patientid: values.patientid,
											date: moment().format("YYYY-MM-DD"),
											time: moment().format("HH:mm"),
											title: noti.patienttitle,
											description: noti.patientvalue,
											kind: noti.kind,
											isopened: false,
											deeplink: JSON.stringify(deeplinkContent),
										});
										newdata.save();
										SendNotification(patientData);
									}
								);
								var doctorcheck =
									noti.kind === "consultation"
										? values.settings[0].notification[0].e_conslt_request
										: values.settings[0].notification[0].e_apt_activity;

								if (
									doctorcheck === true &&
									values.doctor_details[0].channelid !== ""
								) {
									let doctorData = returnNotificationData(
										values.doctor_details[0].channelid.split("|"),
										noti.doctorvalue,
										noti.doctortitle,
										"doctor",
										values._id.toString()
									);
									SendNotification(doctorData);
								}

								var doctorcheck1 =
									noti.kind === "consultation"
										? values.settings[0].appointment[0].autoacceptconsult
										: values.settings[0].appointment[0].autoacceptbooking;

								if (doctorcheck1 === true) {
									const deeplinkContent = {
										screen: "AppointmentScreen",
										appointmentId: values._id.toString(),
										navigateTo: "AppointmentDetails",
									};
									let newdata = new appnotification({
										// appointmentid: "",
										// patientid: data.patientid,
										// date: moment().format("YYYY-MM-DD"),
										// time: moment().format("HH:mm"),
										// title: data.senddata.notification.android.title,
										// description: data.senddata.notification.alert,
										// kind: "reschedule",
										// isopened: false,
										// deeplink: "",
										appointmentid: values._id.toString(),
										doctorid: values.doctorid,
										date: moment().format("YYYY-MM-DD"),
										time: moment().format("HH:mm"),
										title: noti.doctortitle,
										description: noti.doctorvalue,
										kind: noti.kind,
										isopened: false,
										deeplink: JSON.stringify(deeplinkContent),
									});
									newdata.save();
								}
							}
							// result.forEach((patient) => {

							// });
						}
					});

					if (
						moment(values.consultationdate).format("YYYY-MM-DD") +
							"T00:00:00.000+00:00" ===
							currentdate &&
						currentTime.diff(consultationtime, "minutes") === 15
					) {
						// result.forEach((patient) => {
						if (
							values.ispatientjoined === false &&
							values.isdoctorjoined === true
						) {
							if (values.isnotificationenable === true) {
								patientsettings.find(
									{
										patientid: values.patientid,
										consultation: {
											$elemMatch: {
												receiveNotification: true,
											},
										},
									},
									function (error, res) {
										let patientData = returnNotificationData(
											values.patient_details[0].channelid.split("|"),
											"Hey " +
												values.patient_details[0].firstName +
												" your missed the consultation with " +
												values.doctor_details[0].firstName,
											"Consultation Missed",
											"patient",
											values._id.toString()
										);
										const deeplinkContent = {
											screen: "AppointmentScreen",
											appointmentId: values._id.toString(),
											navigateTo: "AppointmentDetails",
										};
										let newdata = new appnotification({
											appointmentid: values._id.toString(),
											patientid: values.patientid,
											date: moment().format("YYYY-MM-DD"),
											time: moment().format("HH:mm"),
											title:
												"Hey " +
												values.patient_details[0].firstName +
												" your missed the consultation with " +
												values.doctor_details[0].firstName,
											description: "Consultation Missed",
											kind: "consultation",
											isopened: false,
											deeplink: JSON.stringify(deeplinkContent),
										});
										newdata.save();
										SendNotification(patientData);
									}
								);
							}
							if (
								values.settings[0].notification[0].e_conslt_request === true &&
								values.doctor_details[0].channelid !== ""
							) {
								let doctorData = returnNotificationData(
									values.doctor_details[0].channelid.split("|"),
									"Hey " +
										values.doctor_details[0].firstName +
										", " +
										values.patient_details[0].firstName +
										"missed the consultation",
									"Doctor missed consultation",
									"doctor",
									values._id.toString()
								);
								SendNotification(doctorData);
							}
						} else if (
							values.ispatientjoined === true &&
							values.isdoctorjoined === false
						) {
							if (values.isnotificationenable === true) {
								patientsettings.find(
									{
										patientid: values.patientid,
										consultation: {
											$elemMatch: {
												receiveNotification: true,
											},
										},
									},
									function (error, res) {
										let patientData = returnNotificationData(
											values.patient_details[0].channelid.split("|"),
											"Hey " +
												values.patient_details[0].firstName +
												", " +
												values.doctor_details[0].firstName +
												" missed the consultation",
											"Doctor missed consultation",
											"patient",
											values._id.toString()
										);
										const deeplinkContent = {
											screen: "AppointmentScreen",
											appointmentId: values._id.toString(),
											navigateTo: "AppointmentDetails",
										};
										let newdata = new appnotification({
											appointmentid: values._id.toString(),
											patientid: values.patientid,
											date: moment().format("YYYY-MM-DD"),
											time: moment().format("HH:mm"),
											title:
												"Hey " +
												values.patient_details[0].firstName +
												", " +
												values.doctor_details[0].firstName,
											description: "Doctor missed consultation",
											kind: "consultation",
											isopened: false,
											deeplink: JSON.stringify(deeplinkContent),
										});
										newdata.save();
										SendNotification(patientData);
									}
								);
							}
							if (
								values.settings[0].notification[0].e_conslt_request === true &&
								values.doctor_details[0].channelid !== ""
							) {
								let doctorData = returnNotificationData(
									values.doctor_details[0].channelid.split("|"),
									"Hey " +
										values.doctor_details[0].firstName +
										" you missed the consultation with " +
										values.patient_details[0].firstName,
									"Consultation Missed",
									"doctor",
									values._id.toString()
								);
								SendNotification(doctorData);
							}
						} else if (
							values.ispatientjoined === false &&
							values.isdoctorjoined === false
						) {
							if (values.isnotificationenable === true) {
								patientsettings.find(
									{
										patientid: values.patientid,
										consultation: {
											$elemMatch: {
												receiveNotification: true,
											},
										},
									},
									function (error, res) {
										let patientData = returnNotificationData(
											values.patient_details[0].channelid.split("|"),
											"Hey " +
												values.patient_details[0].firstName +
												" your missed the consultation with " +
												values.doctor_details[0].firstName,
											"Consultation Missed",
											"patient",
											values._id.toString()
										);
										const deeplinkContent = {
											screen: "AppointmentScreen",
											appointmentId: values._id.toString(),
											navigateTo: "AppointmentDetails",
										};
										let newdata = new appnotification({
											appointmentid: values._id.toString(),
											patientid: values.patientid,
											date: moment().format("YYYY-MM-DD"),
											time: moment().format("HH:mm"),
											title:
												"Hey " +
												values.patient_details[0].firstName +
												" your missed the consultation with " +
												values.doctor_details[0].firstName,
											description: "Consultation Missed",
											isopened: false,
											kind: "consultation",
											deeplink: JSON.stringify(deeplinkContent),
										});
										newdata.save();
										SendNotification(patientData);
									}
								);
							}
							if (
								values.settings[0].notification[0].e_conslt_request === true &&
								values.doctor_details[0].channelid !== ""
							) {
								let doctorData = returnNotificationData(
									values.doctor_details[0].channelid.split("|"),
									"Hey " +
										values.doctor_details[0].firstName +
										" your missed the consultation with " +
										values.patient_details[0].firstName,
									"Consultation Missed",
									"doctor",
									values._id.toString()
								);
								SendNotification(doctorData);
							}
						}
						// });
					}
				});
			}
		}
	);
}

setInterval(Airshippushnotifications, 60000);

app.post("/pushNotificationsSend", (req, res) => {
	// console.log("req", req.body);
	SendNotification(req.body).then((result) => {
		res.send(result);
	});
	// SendNotification(returnstring).then((result) => {
	// 	res.send(result);
	// });
});

app.post("/create-refund", async (req, res) => {
	const refund = await stripe.refunds.create(
		{
			amount: req.body.amount * 100,
			payment_intent: req.body.paymentintent,
		},
		{
			stripeAccount: req.body.stripeaccount,
		}
	);
	console.log("refund", refund);
	patientpayment.updateOne(
		{ paymentintent: req.body.paymentintent },
		{ $set: { refund: req.body.amount } },
		function (err, result) {
			if (err) {
				console.log(err);
			} else {
				// console.log(result);
			}
		}
	);
	res.send(refund);
});

app.post("/pay_subscription", async (req, res) => {
	const origin = `${req.headers.origin}`;
	// console.log("origin", origin);
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				price_data: {
					currency: "usd",
					product_data: {
						name: "Standard Plan",
						// images:
						//   'https://aeglobalbucket.s3.amazonaws.com/lokeshpatimeedagmailcom/Profile.png',
					},
					unit_amount: (19.99 * 100).toFixed(0),
				},
				quantity: 1,
			},
		],

		payment_method_types: ["card"],
		mode: "payment",
		success_url: `${origin}/subscriptiondone?id=${req.body.id}`,
		cancel_url: `${origin}/subscriptiondone?id=${req.body.id}`,
	});

	let newdata = new subscriptionhistory({
		transactionid: session.id,
		paymentstatus: "pending",
		doctorid: req.body.id,
		planid: req.body.planid,
		planname: req.body.planname,
		amount: req.body.amount,
		subscriptionstartdate: moment(),
		subscriptionenddate: moment().add(1, "M"),
	});
	newdata.save();
	console.log("session", session);
	res.send({ url: session.url });
});

app.post("/payment_sheet", async (req, res) => {
	console.log("req", req.body);
	// Use an existing Customer ID if this is a returning customer.
	// const customer = await stripe.customers.create();
	// const ephemeralKey = await stripe.ephemeralKeys.create(
	//   {customer: customer.id},
	//   {apiVersion: '2022-08-01'}
	// );

	const paymentIntent = await stripe.paymentIntents.create({
		amount: req.body.amount * 100,
		currency: "USD",
		// customer: customer.id,
		// payment_method_data: {
		// 	type: "card",
		// 	card: {
		// 		number: "4242424242424242", //# Replace with the actual card number.
		// 		exp_month: 12, //# Replace with the actual expiration month.
		// 		exp_year: 2023, //# Replace with the actual expiration year.
		// 		cvc: "123", //# Replace with the actual CVC.
		// 	},
		// },
		automatic_payment_methods: {
			enabled: true,
		},
		transfer_data: {
			destination: req.body.connectedaccount,
		},
		application_fee_amount: req.body.applicationfee * 100,
	});
	console.log("paymentIntent", paymentIntent.client_secret);

	let newdata = new patientpayment({
		paymentintent: paymentIntent.id,
		paymentstatus: "pending",
		appointmentid: req.body.appointmentid,
		date: moment().format("YYYY-MM-DD"),
		amount: req.body.amount,
		stipeaccount: req.body.connectedaccount,
		kind: "payment",
		tax: req.body.applicationfee,
		refund: "0",
	});
	newdata.save();
	res.send({
		paymentIntent: paymentIntent.client_secret,
		// ephemeralKey: ephemeralKey.secret,
		// customer: customer.id,
		// publishableKey:
		//   'pk_test_51LkQC3B02aVPUqomMG8YDacpleaklU2UTYYCj0IAX4v4jWpCAC19bFTu4fLuTKNzpMGKdOqHN94KNeXD8ryoQtpo00VxgBEbJv',
	});
});

const SendNotification = (data) => {
	// console.log("data", JSON.stringify(data));
	const appKey =
		data.role === "patient"
			? process.env.AIRSHIP_APIKEY_PATIENT
			: process.env.AIRSHIP_APIKEY_DOCTOR;
	const masterSecret =
		data.role === "patient"
			? process.env.AIRSHIP_MASTERSECRET_PATIENT
			: process.env.AIRSHIP_MASTERSECRET_DOCTOR;
	// console.log("masterSecret", data.role, masterSecret);
	const basicToken = base64.encode(appKey + ":" + masterSecret);
	return axios({
		url: process.env.AIRSHIP_URL,
		method: "POST",
		data: JSON.stringify(data.senddata),
		headers: {
			"Content-Type": "application/json",
			Accept: "application/vnd.urbanairship+json; version=3",
			Authorization: "Basic " + basicToken,
		},
	})
		.then((result) => {
			// console.log("result...", result);
			// console.log("sent data", JSON.stringify(data.senddata));
			// console.log("patient APP KEY", process.env.AIRSHIP_APIKEY_PATIENT);
			// console.log(
			// 	"patient master secret",
			// 	process.env.AIRSHIP_MASTERSECRET_PATIENT
			// );
			// console.log("basicToken(appkey + master secret key)", basicToken);
			// console.log("URL", process.env.AIRSHIP_URL);

			// if (
			// 	data.role === "patient" &&
			// 	(data.senddata.notification.android.title ===
			// 		"Reschedule appointment" ||
			// 		data.senddata.notification.android.title ===
			// 			"Reschedule consultation")
			// ) {
			// 	let newdata = new appnotification({
			// 		appointmentid: JSON.parse(
			// 			data.senddata.notification.actions.open.content
			// 		).appointmentId,
			// 		patientid: data.patientid,
			// 		date: moment().format("YYYY-MM-DD"),
			// 		time: moment().format("HH:mm"),
			// 		title: data.senddata.notification.android.title,
			// 		description: data.senddata.notification.alert,
			// 		kind:
			// 			data.senddata.notification.android.title ===
			// 			"Consultation Confirmed"
			// 				? "consultation"
			// 				: "treatment",
			// 		isopened: false,
			// 		deeplink: data.senddata.notification.actions.open.content,
			// 	});
			// 	newdata.save();
			// }

			// if (
			// 	data.role === "patient" &&
			// 	(data.senddata.notification.android.title ===
			// 		"Consultation Confirmed" ||
			// 		data.senddata.notification.android.title === "Appointment Confirmed")
			// ) {
			// 	let newdata = new appnotification({
			// 		appointmentid: JSON.parse(
			// 			data.senddata.notification.actions.open.content
			// 		).appointmentId,
			// 		patientid: data.patientid,
			// 		date: moment().format("YYYY-MM-DD"),
			// 		time: moment().format("HH:mm"),
			// 		title: data.senddata.notification.android.title,
			// 		description: data.senddata.notification.alert,
			// 		kind:
			// 			data.senddata.notification.android.title ===
			// 			"Consultation Confirmed"
			// 				? "consultation"
			// 				: "treatment",
			// 		isopened: false,
			// 		deeplink: data.senddata.notification.actions.open.content,
			// 	});
			// 	newdata.save();
			// }

			// if (
			// 	data.role === "doctor" &&
			// 	(data.senddata.notification.android.title ===
			// 		"Consultation Confirmed" ||
			// 		data.senddata.notification.android.title === "Appointment Confirmed")
			// ) {
			// 	let newdata = new appnotification({
			// 		appointmentid: JSON.parse(
			// 			data.senddata.notification.actions.open.content
			// 		).appointmentId,
			// 		doctorid: data.doctorid,
			// 		date: moment().format("YYYY-MM-DD"),
			// 		time: moment().format("HH:mm"),
			// 		title: data.senddata.notification.android.title,
			// 		description: data.senddata.notification.alert,
			// 		kind:
			// 			data.senddata.notification.android.title ===
			// 			"Consultation Confirmed"
			// 				? "consultation"
			// 				: "treatment",
			// 		isopened: false,
			// 		deeplink: data.senddata.notification.actions.open.content,
			// 	});
			// 	newdata.save();
			// }

			// if (
			// 	data.role === "doctor" &&
			// 	(data.senddata.notification.android.title ===
			// 		"Reschedule appointment" ||
			// 		data.senddata.notification.android.title ===
			// 			"Reschedule consultation")
			// ) {
			// 	let newdata = new appnotification({
			// 		appointmentid: JSON.parse(
			// 			data.senddata.notification.actions.open.content
			// 		).appointmentId,
			// 		doctorid: data.doctorid,
			// 		date: moment().format("YYYY-MM-DD"),
			// 		time: moment().format("HH:mm"),
			// 		title: data.senddata.notification.android.title,
			// 		description: data.senddata.notification.alert,
			// 		kind:
			// 			data.senddata.notification.android.title ===
			// 			"Consultation Confirmed"
			// 				? "consultation"
			// 				: "treatment",
			// 		isopened: false,
			// 		deeplink: data.senddata.notification.actions.open.content,
			// 	});
			// 	newdata.save();
			// }

			if (data.role === "doctor") {
				let newdata = new appnotification({
					appointmentid: JSON.parse(
						data.senddata.notification.actions.open.content
					).appointmentId,
					doctorid: data.doctorid,
					date: moment().format("YYYY-MM-DD"),
					time: moment().format("HH:mm"),
					title: data.senddata.notification.android.title,
					description: data.senddata.notification.alert,
					kind:
						data.senddata.notification.android.title ===
						"Consultation Confirmed"
							? "consultation"
							: "treatment",
					isopened: false,
					deeplink: data.senddata.notification.actions.open.content,
				});
				newdata.save();
			}
			if (data.role === "patient") {
				let newdata = new appnotification({
					appointmentid: JSON.parse(
						data.senddata.notification.actions.open.content
					).appointmentId,
					patientid: data.patientid,
					date: moment().format("YYYY-MM-DD"),
					time: moment().format("HH:mm"),
					title: data.senddata.notification.android.title,
					description: data.senddata.notification.alert,
					kind:
						data.senddata.notification.android.title ===
						"Consultation Confirmed"
							? "consultation"
							: "treatment",
					isopened: false,
					deeplink: data.senddata.notification.actions.open.content,
				});
				newdata.save();
			}

			return result.data;
		})
		.catch(function (error) {
			console.log("Error...", error);
		});
};

app.get("/sumsubdoctor", (req, res) => {
	res.send(process.env.DOCTORLEVELNAME);
});

app.get("/mobilevariables", (req, res) => {
	const variables = {
		GoogleMapsKey: process.env.GOOGLEAPIKEY,
		AgoraAppKey: process.env.AGORA_APPKEY,
		AgoraAppId: process.env.APP_ID,
	};

	res.send(variables);
});

function chatAppToken() {
	let at = new AccessToken2(
		APP_ID,
		APP_CERTIFICATE,
		new Date().getTime() / 1000,
		6000
	);
	let sc = new ServiceChat();
	sc.add_privilege(ServiceChat.kPrivilegeApp, 6000);
	at.add_service(sc);
	const appToken = at.build();
	return appToken;
}

app.post("/agoraRegisterUser", (req, res) => {
	const appId = process.env.APP_ID;
	const appName = process.env.AGORA_APPNAME;
	const orgName = process.env.AGORA_ORGNAME;
	const appKey = process.env.AGORA_APPKEY;

	var data = JSON.stringify({
		username: "" + req.body.username,
		password: "" + req.body.password,
		nickname: "" + req.body.nickname,
	});

	var config = {
		method: "post",
		url: process.env.AGORA_CHAT_URL + orgName + "/" + appName + "/users",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + chatAppToken(),
		},
		data: data,
	};

	axios(config)
		.then(function (response) {
			// console.log(JSON.stringify(response.data));
			return res.send(JSON.stringify(response.data));
		})
		.catch(function (error) {
			console.log(error);
		});
});

app.post("/CreateToken", (req, res) => {
	const SUMSUB_APP_TOKEN = process.env.SUMSUB_APPTOKEN;
	const SUMSUB_SECRET_KEY = process.env.SUMSUB_SECRET_KEY;
	const SUMSUB_BASE_URL = process.env.SUMSUB_URL;

	// console.log("req.body.id", req.body.params.id);

	var config = {};
	config.baseURL = SUMSUB_BASE_URL;

	function createSignature(config) {
		var ts = Math.floor(Date.now() / 1000);
		const signature = crypto.createHmac("sha256", SUMSUB_SECRET_KEY);
		signature.update(ts + config.method.toUpperCase() + config.url);

		if (config.data instanceof FormData) {
			signature.update(config.data.getBuffer());
		} else if (config.data) {
			signature.update(config.data);
		}

		config.headers["X-App-Access-Ts"] = ts;
		config.headers["X-App-Access-Sig"] = signature.digest("hex");

		return config;
	}

	function createApplicant(externalUserId, levelName) {
		var method = "post";
		var url = "/resources/applicants?levelName=" + levelName;

		var body = {
			externalUserId: externalUserId,
			email: req.body.params.email,
			// phone: externalUserId.phone,
		};

		var headers = {
			Accept: "application/json",
			"Content-Type": "application/json",
			"X-App-Token": SUMSUB_APP_TOKEN,
		};

		config.method = method;
		config.url = url;
		config.headers = headers;
		config.data = JSON.stringify(body);

		return config;
	}

	function createAccessToken(externalUserId, levelName, ttlInSecs = 600) {
		var method = "post";
		var url;
		if (req.body.params.isadmin === "patient") {
			url = `/resources/accessTokens?userId=${externalUserId}&ttlInSecs=${ttlInSecs}&levelName=${process.env.PATIENTLEVELNAME}`;
		}
		if (req.body.params.isadmin === true) {
			url = `/resources/accessTokens?userId=${externalUserId}&ttlInSecs=${ttlInSecs}&levelName=${process.env.ADMINLEVELNAME}`;
		}
		if (req.body.params.isadmin === false) {
			url = `/resources/accessTokens?userId=${externalUserId}&ttlInSecs=${ttlInSecs}&levelName=${process.env.DOCTORLEVELNAME}`;
		}

		var headers = {
			Accept: "application/json",
			"X-App-Token": SUMSUB_APP_TOKEN,
		};

		config.method = method;
		config.url = url;
		config.headers = headers;
		config.data = null;

		return config;
	}
	// change here to change whole external id
	// var externalUserId = req.body.params.id;
	var externalUserId = req.body.params.id;

	async function main(body, doc) {
		axios.interceptors.request.use(createSignature, function (error) {
			return Promise.reject(error);
		});

		var externalUserId = body;
		var levelName;
		if (req.body.params.isadmin === "patient") {
			levelName = process.env.PATIENTLEVELNAME;
		}
		if (req.body.params.isadmin === true) {
			levelName = process.env.ADMINLEVELNAME;
		}
		if (req.body.params.isadmin === false) {
			levelName = process.env.DOCTORLEVELNAME;
		}

		await axios(createApplicant(body, levelName))
			.then(function (response) {
				// console.log("Response:\n", response.data);
				return response;
			})
			.catch(function (error) {
				// console.log("Error:\n", error.response.data);
			});

		await axios(createAccessToken(externalUserId, levelName, 1200))
			.then(function (response) {
				// console.log("Response:\n", response.data);
				return res.send(response.data);
				// return response.data;
			})
			.catch(function (error) {
				// console.log("Error:\n", error.response.data);
			});
		return;
	}

	main(externalUserId, req.files);
});

app.post("/GetSumsubDocuments", (req, res) => {
	const SUMSUB_APP_TOKEN = process.env.SUMSUB_APPTOKEN;
	const SUMSUB_SECRET_KEY = process.env.SUMSUB_SECRET_KEY;
	const SUMSUB_BASE_URL = process.env.SUMSUB_URL;
	// console.log("req.body.userid", req.body.userid);
	var config = {};
	config.baseURL = SUMSUB_BASE_URL;

	function createSignature(config) {
		// console.log("Creating a signature for the request...");

		var ts = Math.floor(Date.now() / 1000);
		const signature = crypto.createHmac("sha256", SUMSUB_SECRET_KEY);
		signature.update(ts + config.method.toUpperCase() + config.url);

		if (config.data instanceof FormData) {
			signature.update(config.data.getBuffer());
		} else if (config.data) {
			signature.update(config.data);
		}

		config.headers["X-App-Access-Ts"] = ts;
		config.headers["X-App-Access-Sig"] = signature.digest("hex");

		return config;
	}

	function getApplicantStatus(applicantId) {
		// console.log("Getting the applicant status...");

		var method = "get";
		// var url = `/resources/applicants/${applicantId}/status`;
		// var url = `/resources/moderationStates/-;applicantId=${applicantId}`;
		// var url = `/resources/applicants/${applicantId}/requiredIdDocsStatus`;
		// var url = `/resources/applicants/${applicantId}/info`;
		// var url = `/resources/applicants/${applicantId}/one`;
		// requiredIdDocsStatus gets all the documents status
		// var url = `/resources/applicants/${applicantId}/requiredIdDocsStatus`;
		var url = `/resources/applicants/-;externalUserId=${applicantId}/one`;

		var headers = {
			Accept: "application/json",
			"X-App-Token": SUMSUB_APP_TOKEN,
		};

		config.method = method;
		config.url = url;
		config.headers = headers;
		config.data = null;

		return config;
	}

	async function main() {
		axios.interceptors.request.use(createSignature, function (error) {
			return Promise.reject(error);
		});

		await axios(getApplicantStatus(req.body.userid))
			.then(function (response) {
				// console.log("Response:\n", JSON.stringify(response.data));
				res.send(JSON.stringify(response.data.requiredIdDocs));
				return response;
			})
			.catch(function (error) {
				console.log("Error:\n", error.response.data);
			});
		return;
	}

	main();
});

setInterval(() => {
	const SUMSUB_APP_TOKEN = process.env.SUMSUB_APPTOKEN;
	const SUMSUB_SECRET_KEY = process.env.SUMSUB_SECRET_KEY;
	const SUMSUB_BASE_URL = process.env.SUMSUB_URL;
	// console.log("req.body.userid", req.body.userid);
	var config = {};
	config.baseURL = SUMSUB_BASE_URL;

	function createSignature(config) {
		// console.log("Creating a signature for the request...");

		var ts = Math.floor(Date.now() / 1000);
		const signature = crypto.createHmac("sha256", SUMSUB_SECRET_KEY);
		signature.update(ts + config.method.toUpperCase() + config.url);

		if (config.data instanceof FormData) {
			signature.update(config.data.getBuffer());
		} else if (config.data) {
			signature.update(config.data);
		}

		config.headers["X-App-Access-Ts"] = ts;
		config.headers["X-App-Access-Sig"] = signature.digest("hex");

		return config;
	}

	function getApplicantStatus(applicantId) {
		// console.log("Getting the applicant status...");

		var method = "get";
		var url = `/resources/applicants/-;externalUserId=${applicantId}/one`;

		var headers = {
			Accept: "application/json",
			"X-App-Token": SUMSUB_APP_TOKEN,
		};

		config.method = method;
		config.url = url;
		config.headers = headers;
		config.data = null;

		return config;
	}

	UserModel.find(
		{
			$or: [{ sumsubstatus: "" }, { sumsubstatus: "error" }],
			currentstep: "6",
		},
		function (error, data) {
			// console.log("data", data);
			data.forEach((doc) => {
				async function main() {
					axios.interceptors.request.use(createSignature, function (error) {
						return Promise.reject(error);
					});

					// console.log("doc._id.toString()", doc._id.toString());

					await axios(getApplicantStatus(doc._id.toString()))
						.then(function (response) {
							// console.log("Response:\n", JSON.stringify(response.data));
							// res.send(JSON.stringify(response.data.requiredIdDocs));
							// return response;

							if (
								response.data.review.reviewStatus === "completed" &&
								response.data.review.reviewResult.reviewAnswer === "GREEN"
							) {
								UserModel.updateOne(
									{ _id: response.data.externalUserId },
									{ $set: { sumsubstatus: "accepted" } },
									function (err, result) {
										if (err) {
											console.log(err);
										} else {
											// console.log(result);
										}
									}
								);
								UserModel.findOne(
									{ _id: response.data.externalUserId },
									function (err, result) {
										if (err) {
											console.log(err);
										} else {
											// console.log(result);
											if (result !== null) {
												email.sendEmail({ type: "accepted", user: result });
												if (result.channelid !== "") {
													let data = returnNotificationData(
														result.channelid.split("|"),
														"ID verification",
														"All checks complete and approved",
														"doctor",
														"KYC"
													);
													SendNotification(data);
												}
											}
										}
									}
								);
							}
							if (
								response.data.review.reviewStatus === "completed" &&
								response.data.review.reviewResult.reviewAnswer === "RED"
							) {
								UserModel.updateOne(
									{ _id: response.data.externalUserId },
									{ $set: { sumsubstatus: "error" } },
									function (err, result) {
										if (err) {
											console.log(err);
										} else {
											// console.log(result);
										}
									}
								);
								UserModel.findOne(
									{ _id: response.data.externalUserId },
									function (err, result) {
										if (err) {
											console.log(err);
										} else {
											// console.log(result);
											if (result !== null) {
												email.sendEmail({ type: "error", user: result });
												if (result.channelid !== "") {
													let data = returnNotificationData(
														result.channelid.split("|"),
														"ID verification",
														"Something is not right, please try again ",
														"doctor",
														"KYC"
													);
													SendNotification(data);
												}
											}
										}
									}
								);
							}
						})
						.catch(function (error) {
							console.log("Error:\n", error.response);
						});
					return;
				}

				main();
			});
		}
	);

	patient.find(
		{
			$or: [{ sumsubstatus: "Pending" }, { sumsubstatus: "Error" }],
		},
		function (error, data) {
			// console.log("data", data);
			data.forEach((doc) => {
				async function main() {
					axios.interceptors.request.use(createSignature, function (error) {
						return Promise.reject(error);
					});

					// console.log("doc._id.toString()", doc._id.toString());

					await axios(getApplicantStatus(doc._id.toString()))
						.then(function (response) {
							// console.log("Response:\n", JSON.stringify(response.data));
							// res.send(JSON.stringify(response.data.requiredIdDocs));
							// return response;

							if (
								response.data.review.reviewStatus === "completed" &&
								response.data.review.reviewResult.reviewAnswer === "GREEN"
							) {
								patient.updateOne(
									{ _id: response.data.externalUserId },
									{ $set: { sumsubstatus: "Approved" } },
									function (err, result) {
										if (err) {
											console.log(err);
										} else {
											// console.log(result);
										}
									}
								);
								patient.findOne(
									{ _id: response.data.externalUserId },
									function (err, result) {
										if (err) {
											console.log(err);
										} else {
											// console.log(result);
											if (result !== null) {
												email.sendEmail({
													type: "accepted",
													user: result,
													role: "patient",
												});
												if (result.channelid !== "") {
													let data = returnNotificationData(
														result.channelid.split("|"),
														"ID verification",
														"All checks complete and approved",
														"patient",
														"KYC"
													);
													SendNotification(data);
												}
											}
										}
									}
								);
							}
							if (
								response.data.review.reviewStatus === "completed" &&
								response.data.review.reviewResult.reviewAnswer === "RED"
							) {
								patient.updateOne(
									{ _id: response.data.externalUserId },
									{ $set: { sumsubstatus: "Error" } },
									function (err, result) {
										if (err) {
											console.log(err);
										} else {
											// console.log(result);
										}
									}
								);
								patient.findOne(
									{ _id: response.data.externalUserId },
									function (err, result) {
										if (err) {
											console.log(err);
										} else {
											// console.log(result);
											if (result !== null) {
												email.sendEmail({
													type: "error",
													user: result,
													role: "patient",
												});
												if (result.channelid !== "") {
													let data = returnNotificationData(
														result.channelid.split("|"),
														"ID verification",
														"Something is not right, please try again ",
														"patient",
														"KYC"
													);
													SendNotification(data);
												}
											}
										}
									}
								);
							}
						})
						.catch(function (error) {
							console.log("Error:\n", error.response);
						});
					return;
				}
				main();
			});
		}
	);
	// 24 hrs - 86400000
	// 12 hrs - 43200000
	// 3 hrs  - 10800000
	// 1 hr   - 3600000
	// 30 min - 1800000
	// 1 min - 60
}, 60000);

app.get("/popular", (req, res) => {
	// appointment.find({}, function (error, data) {
	// 	data.forEach((app) => {
	// 		console.log("app.id", app._id);
	// 	});
	// });
	appointment.aggregate(
		[
			// {
			// 	$lookup: {
			// 		from: "user_settings",
			// 		localField: "doctorid",
			// 		foreignField: "userid",
			// 		as: "settings",
			// 	},
			// },
			{ $addFields: { doctorid: { $toObjectId: "$doctorid" } } },
			{
				$lookup: {
					from: "aesthetik_users", // collection to join
					localField: "doctorid", //field from the input documents
					foreignField: "_id", //field from the documents of the "from" collection
					as: "doctor_details", // output array field
				},
			},
			// { $addFields: { patientid: { $toObjectId: "$patientid" } } },
			// {
			// 	$lookup: {
			// 		from: "patient_users",
			// 		localField: "patientid",
			// 		foreignField: "_id",
			// 		as: "patient_details",
			// 	},
			// },
		],
		function (error, data) {
			const doctorids = new Set();
			const clinicname = new Set();
			const treatments = new Set();
			data.forEach((ele) => {
				if (doctorids.has(ele._id.toString())) {
					ele.idpopular = ele.popular + 1;
				} else {
					doctorids.add(ele._id.toString());
					ele.idpopular = 1;
				}
				if (clinicname.has(ele.doctor_details[0].clinicname)) {
					ele.clinicpopular = ele.popular + 1;
				} else {
					clinicname.add(ele.doctor_details[0].clinicname);
					ele.clinicpopular = 1;
				}
				ele.treatmentid.forEach((tid) => {
					if (treatments.has(tid)) {
						ele.treatmentpopular = ele.popular + 1;
					} else {
						treatments.add(ele._id.toString());
						ele.treatmentpopular = 1;
					}
				});
			});
			console.log("doctorids", doctorids);
			console.log("data", data);
			return res.send(data);
			//console.log(res.json(data));
			//handle error case also
		}
	);
});

app.post("/doctorlocations", (req, res) => {
	TreatmentsModel.findOne(
		{ _id: req.body.treatmentid },
		function (err, result) {
			if (err) {
				console.log("err", err);
			}
			if (result) {
				// console.log("result", result);
				let doctorids = result.assigneddoctors[0].split(",");
				for (var i = 0; i < doctorids.length; i++) {
					doctorids.splice(i + 1, 1);
				}
				// console.log("doctorids", doctorids);
				var doctors = [];
				doctorids.forEach((doctor) => {
					UserModel.findOne({ _id: doctor }, function (err, result) {
						if (err) {
							console.log(err);
						} else {
							console.log("result", result.business[0].location[0]);
							if (result.business[0] !== null) {
								let obj = {
									id: doctor,
									location: result.business[0].location[0].line2,
									image: result.avatar,
									firstname: result.firstName,
									lastname: result.lastName,
								};
								doctors.push(obj);
							}
						}
						if (doctor === doctorids[doctorids.length - 1]) {
							// console.log("doctors", doctors);
							res.send(doctors);
						}
					});
				});
			}
		}
	);
});

app.get("/message", (req, res) => {
	axios({
		url: `${process.env.AGORA_CHAT_URL}${process.env.AGORA_ORGNAME}/${process.env.AGORA_APPNAME}/user/6349030a9e53470a0b87df60/user_channels`,

		method: "get",
		headers: {
			Authorization: "Bearer " + chatAppToken(),
		},
	})
		.then((result) => {
			// console.log("res", JSON.stringify(result.data.data.channel_infos));
			res.send(JSON.stringify(result.data.data.channel_infos));
			// return res.data.data;
		})
		.catch((e) => {
			console.log("error", e);
		});
});

app.post("/upload", (req, res) => {
	const totalfile = req.files.file;
	const folder = req.body.user;
	// console.log("req.body", req.body);

	const params = {
		Body: totalfile.data,
		Bucket: process.env.S3_BUCKET,
		Key: folder + totalfile.name,
		ContentType: totalfile.mimetype,
		ACL: "public-read",
	};
	try {
		myBucket
			.putObject(params)
			.on("httpUploadProgress", (evt) => {
				// console.log(Math.round((evt.loaded / evt.total) * 100));
				res.status(200).send({ success: "Upload successful", code: 200 });
			})
			.promise();
	} catch (err) {
		res.status(400).send({ error: err, code: 400 });
	}
});

app.post("/uploadmulti", (req, res) => {
	// const totalfile = req.files.file;
	const folder = req.body.user;
	// console.log("req.body", req.body);

	Object.values(req.files).forEach((file) => {
		const params = {
			Body: file.data,
			Bucket: process.env.S3_BUCKET,
			Key: folder + file.name,
			ContentType: file.mimetype,
			ACL: "public-read",
		};
		try {
			myBucket
				.putObject(params)
				.on("httpUploadProgress", (evt) => {
					// console.log(Math.round((evt.loaded / evt.total) * 100));
					// res.status(200).send({ success: "Upload successful", code: 200 });
				})
				.promise();
		} catch (err) {
			res.status(400).send({ error: err, code: 400 });
		}
	});
});

app.post("/multi", (req, res) => {
	const totalfile1 = req.files.file1;
	const totalfile2 = req.files.file2;
	const totalvideo = req.files.video;
	const folder = req.body.username;
	const videoName = req.body.videoname;
	// console.log("req.body", req.body);

	const params1 = {
		Body: totalfile1.data,
		Bucket: process.env.S3_BUCKET,
		Key: folder + totalfile1.name,
		ContentType: totalfile1.mimetype,
		ACL: "public-read",
	};

	try {
		myBucket
			.putObject(params1)
			.on("httpUploadProgress", (evt) => {
				// console.log(Math.round((evt.loaded / evt.total) * 100));
				// res.status(200).send({ success: "Upload successful", code: 200 });
			})
			.promise();
	} catch (err) {
		res.status(400).send({ error: err, code: 400 });
	}
	if (totalfile2.size > 0) {
		const params2 = {
			Body: totalfile2.data,
			Bucket: process.env.S3_BUCKET,
			Key: folder + totalfile2.name,
			ContentType: totalfile2.mimetype,
			ACL: "public-read",
		};

		try {
			myBucket
				.putObject(params2)
				.on("httpUploadProgress", (evt) => {
					// console.log(Math.round((evt.loaded / evt.total) * 100));
					// res.status(200).send({ success: "Upload successful", code: 200 });
				})
				.promise();
		} catch (err) {
			res.status(400).send({ error: err, code: 400 });
		}
	}
	if (totalvideo !== undefined) {
		const params3 = {
			Body: totalvideo.data,
			Bucket: process.env.S3_BUCKET,
			Key: folder + videoName,
			ContentType: totalvideo.mimetype,
			ACL: "public-read",
		};
		try {
			myBucket
				.putObject(params3)
				.on("httpUploadProgress", (evt) => {
					// console.log(Math.round((evt.loaded / evt.total) * 100));
					// res.status(200).send({ success: "Upload successful", code: 200 });
				})
				.promise();
		} catch (err) {
			res.status(400).send({ error: err, code: 400 });
		}
	}
});

app.get("/getAgoraResourceid/:uid/:cname", (req, res) => {
	var data = JSON.stringify({
		cname: "" + req.params.cname,
		uid: "" + req.params.uid,
		clientRequest: {
			resourceExpiredHour: 24,
			scene: 0,
		},
	});

	var config = {
		method: "post",
		url: `${process.env.AGORA_URL}${process.env.APP_ID}/cloud_recording/acquire`,
		headers: {
			"Content-Type": "application/json",
			Authorization: "Basic " + process.env.AGORA_AUTHORIZATION,
		},
		data: data,
	};

	axios(config)
		.then(function (response) {
			// console.log(JSON.stringify(response.data));
			return res.send(JSON.stringify(response.data));
		})
		.catch(function (error) {
			console.log(error);
		});
});

app.post("/patientfiles", (req, res) => {
	const folder = req.body.name;
	// console.log("req.files", req.files);

	Object.values(req.files).forEach((file) => {
		const params = {
			Body: file.data,
			Bucket: process.env.S3_BUCKET,
			Key: folder + file.name,
			ContentType: file.mimetype,
			ACL: "public-read",
		};
		try {
			myBucket
				.putObject(params)
				.on("httpUploadProgress", (evt) => {
					// console.log(Math.round((evt.loaded / evt.total) * 100));
					// res.status(200).send({ success: "Upload successful", code: 200 });
				})
				.promise();
		} catch (err) {
			res.status(400).send({ error: err, code: 400 });
		}
	});
});

app.get("/getOne/:pid/:did", (req, res) => {
	const currentTime = moment().valueOf();
	const videoDateTime3hr = (appointment) => {
		return appointment.videodatetime
			? moment(appointment.videodatetime, "YYYY-MM-DD HH:mm:ss")
					.add(3, "hours")
					.valueOf()
			: 0;
	};
	const treatmentDateTime = (appointment) => {
		return moment(
			JSON.stringify(appointment.appointmentdate).split("T")[0] +
				" " +
				appointment.starttime,
			"YYYY-MM-DD HH:mm"
		).valueOf();
	};
	appointment.aggregate(
		[
			{
				$match: {
					doctorid: req.params.did,
					patientid: req.params.pid,
				},
			},
			{
				$lookup: {
					from: "user_settings",
					localField: "doctorid",
					foreignField: "userid",
					as: "settings",
				},
			},
			{ $addFields: { doctorid: { $toObjectId: "$doctorid" } } },
			{
				$lookup: {
					from: "aesthetik_users", // collection to join
					localField: "doctorid", //field from the input documents
					foreignField: "_id", //field from the documents of the "from" collection
					as: "doctor_details", // output array field
				},
			},
			{ $addFields: { patientid: { $toObjectId: "$patientid" } } },
			{
				$lookup: {
					from: "patient_users",
					localField: "patientid",
					foreignField: "_id",
					as: "patient_details",
				},
			},
		],
		function (error, data) {
			var entered = false;

			data.forEach((app) => {
				if (
					entered === false &&
					app.iscompleted !== "true" &&
					((app.complete !== "true" && app.ispaymentdone === false) ||
						(app.complete === "true" && currentTime < videoDateTime3hr(app))) &&
					currentTime < treatmentDateTime(app)
				) {
					// sample.push(app);
					// console.log("app", app);
					entered = true;
					return res.send(app);
				}
			});

			//console.log(res.json(data));
			//handle error case also
		}
	);
});

app.get("/getAll/:pid/:did", (req, res) => {
	if (req.params.pid !== "undefined" && req.params.did !== "undefined") {
		appointment.aggregate(
			[
				{
					$match: {
						doctorid: req.params.did,
						patientid: req.params.pid,
					},
				},
				{
					$lookup: {
						from: "user_settings",
						localField: "doctorid",
						foreignField: "userid",
						as: "settings",
					},
				},
				{ $addFields: { doctorid: { $toObjectId: "$doctorid" } } },
				{
					$lookup: {
						from: "aesthetik_users", // collection to join
						localField: "doctorid", //field from the input documents
						foreignField: "_id", //field from the documents of the "from" collection
						as: "doctor_details", // output array field
					},
				},
				{ $addFields: { patientid: { $toObjectId: "$patientid" } } },
				{
					$lookup: {
						from: "patient_users",
						localField: "patientid",
						foreignField: "_id",
						as: "patient_details",
					},
				},
			],
			function (error, data) {
				return res.send(data);
				//console.log(res.json(data));
				//handle error case also
			}
		);
	} else if (req.params.pid !== "undefined") {
		appointment.aggregate(
			[
				{
					$match: {
						patientid: req.params.pid,
					},
				},
				{ $addFields: { doctorid: { $toObjectId: "$doctorid" } } },
				{
					$lookup: {
						from: "aesthetik_users", // collection to join
						localField: "doctorid", //field from the input documents
						foreignField: "_id", //field from the documents of the "from" collection
						as: "doctor_details", // output array field
					},
				},
				{ $addFields: { patientid: { $toObjectId: "$patientid" } } },
				{
					$lookup: {
						from: "patient_users",
						localField: "patientid",
						foreignField: "_id",
						as: "patient_details",
					},
				},
				{ $addFields: { appointmentid: { $toObjectId: "$appointmentid" } } },
				{
					$lookup: {
						from: "patientpayments",
						localField: "_id",
						foreignField: "appointmentid",
						as: "patient_payments",
					},
				},
			],
			function (error, data) {
				//console.log(res.json(data));
				//handle error case also
				return res.send(data);
			}
		);
	} else if (req.params.did !== "undefined") {
		appointment.aggregate(
			[
				{
					$match: {
						doctorid: req.params.did,
					},
				},
				{
					$lookup: {
						from: "user_settings",
						localField: "doctorid",
						foreignField: "userid",
						as: "settings",
					},
				},
				{ $addFields: { doctorid: { $toObjectId: "$doctorid" } } },
				{
					$lookup: {
						from: "aesthetik_users", // collection to join
						localField: "doctorid", //field from the input documents
						foreignField: "_id", //field from the documents of the "from" collection
						as: "doctor_details", // output array field
					},
				},
				{ $addFields: { patientid: { $toObjectId: "$patientid" } } },
				{
					$lookup: {
						from: "patient_users",
						localField: "patientid",
						foreignField: "_id",
						as: "patient_details",
					},
				},
			],
			function (error, data) {
				return res.send(data);
				//console.log(res.json(data));
				//handle error case also
			}
		);
	}
});

app.post("/getDoctorsWithLocation", (req, res) => {
	console.log("req", req.body.location);
	// UserModel.find({
	// 	business: [{ location: [{ towncity: "Los Angeles" }] }],
	// }).then((result) => {
	// 	console.log("result", result);
	// 	res.send(result);
	// });
	UserModel.aggregate(
		[
			{
				$match: {
					"business.location.towncity": req.body.location,
				},
			},
		],
		function (error, data) {
			data.forEach((e) => {
				console.log("id", e._id.toString());
				appointment.aggregate(
					[
						{
							$match: {
								doctorid: e._id.toString(),
							},
						},
					],
					function (err, result) {
						console.log("result", result.length);
						e.popular = result.length;
						if (e._id === data[data.length - 1]._id) {
							// console.log("data", data);
							return res.send(data);
						}
					}
				);
			});

			//console.log(res.json(data));
			//handle error case also
		}
	);

	// UserModel.aggregate([{
	// 	"business.location.towncity": "Los Angeles",
	// ]}).then((result) => {
	// 	const doctorids = new Set();
	// 	result.forEach((ele) => {
	// 		if (doctorids.has(ele._id.toString())) {
	// 			ele.popular = ele.popular + 1;
	// 		} else {
	// 			doctorids.add(ele._id.toString());
	// 			ele.popular = 1;
	// 		}
	// 	});
	// 	console.log("result", result);
	// 	res.send(result);
	// });
});

app.post("/getClinicsWithLocation", (req, res) => {
	// console.log("req", req.body.location);

	UserModel.aggregate(
		[
			{
				$match: {
					isadmin: true,
					"business.location.towncity": req.body.location,
				},
			},
		],
		function (error, data) {
			data.forEach((e) => {
				console.log("id", e._id.toString());
				var x = 0;
				UserModel.aggregate(
					[
						{
							$match: {
								clinicname: e.clinicname,
							},
						},
					],
					function (err, el) {
						el.forEach((ele) => {
							appointment.aggregate(
								[
									{
										$match: {
											doctorid: ele._id.toString(),
										},
									},
								],
								function (err, result) {
									console.log("result", result);
									x = x + result.length;
									// console.log("x", x);
									// console.log("result", result.length);
									if (
										e._id === data[data.length - 1]._id &&
										ele._id === el[el.length - 1]._id
									) {
										e.popular = x;
										// console.log("final", x);
										// console.log("data", data);
										return res.send(data);
									}
								}
							);
						});
					}
				);
			});

			//console.log(res.json(data));
			//handle error case also
		}
	);

	// UserModel.find({
	// 	isadmin: true,
	// 	"business.location.towncity": req.body.location,
	// }).then((data) => {
	// 	data.forEach((e) => {
	// 		console.log("id", e._id.toString());
	// 		var x = 0;
	// 		UserModel.find({
	// 			clinicname: e.clinicname,
	// 		}).then((el) => {
	// 			el.forEach((ele) => {
	// 				appointment.aggregate(
	// 					[
	// 						{
	// 							$match: {
	// 								doctorid: ele._id.toString(),
	// 							},
	// 						},
	// 					],
	// 					function (err, result) {
	// 						console.log("result", result);
	// 						x = x + result.length;
	// 						console.log("x", x);
	// 						console.log("result", result.length);
	// 						if (
	// 							e._id === data[data.length - 1]._id &&
	// 							ele._id === el[el.length - 1]
	// 						) {
	// 							e.popular = x;
	// 							console.log("x", x);
	// 							// console.log("data", data);
	// 							return res.send(data);
	// 						}
	// 					}
	// 				);
	// 			});
	// 		});
	// 	});
	// console.log("result", result);
	// res.send(result);
	// });
});

app.post("/getTreatmentsWithLocation", (req, res) => {
	// console.log("req", req.body.location);
	appointment.find({}, function (error, data) {
		// console.log("data", data);
		UserModel.aggregate(
			[
				{
					$match: {
						"business.location.towncity": req.body.location,
					},
				},
			],
			function (error, result) {
				// console.log("result", result);
				TreatmentsModel.aggregate(
					[
						{
							$match: { photo1: { $nin: [""] } },
						},
					],
					function (err, re) {
						// console.log("res", re);
						var final = [];

						result.forEach((ele) => {
							var count = 1;

							re.forEach((el) => {
								if (el.assigneddoctors[0].includes(ele._id.toString())) {
									// data.forEach((result1) => {
									// 	if (
									// 		el.treatmentid[0].includes(ele._id.toString()) &&
									// 		ele.assigneddoctors[0].includes(result1._id.toString())
									// 	) {
									data.forEach((da) => {
										if (da.treatmentid[0].includes(el._id.toString())) {
											count++;
											// console.log("count", el._id.toString());
											el.popular = count;
											final.push(el);
										}
									});
									// count++;
									// 	}
									// });
								}
							});
						});
						// re.forEach((ele) => {
						// 	data.forEach((el) => {
						// 		result.forEach((result1) => {
						// 			if (
						// 				el.treatmentid[0].includes(ele._id.toString()) &&
						// 				ele.assigneddoctors[0].includes(result1._id.toString())
						// 			) {
						// 				// data.forEach((da) => {
						// 				// 	if (da.treatmentid[0].includes(ele._id.toString())) {
						// 				// 		count++;
						// 				// 	}
						// 				// });
						// 				count++;
						// 			}
						// 		});
						// 	});
						// 	ele.popular = count;
						// 	final.push(ele);
						// });
						// console.log("final", final);
						var k = [...new Set(final)];
						// console.log("k", k);
						res.send(k);
					}
				);
				// res.send(result);
			}
		);
	});
});

app.get("/getAppointmentWithDetails/:aid", (req, res) => {
	if (req.params.aid !== "undefined") {
		appointment.aggregate(
			[
				{
					$match: {
						_id: mongoose.Types.ObjectId(req.params.aid),
					},
				},
				{ $addFields: { doctorid: { $toObjectId: "$doctorid" } } },
				{
					$lookup: {
						from: "aesthetik_users", // collection to join
						localField: "doctorid", //field from the input documents
						foreignField: "_id", //field from the documents of the "from" collection
						as: "doctor_details", // output array field
					},
				},
				{ $addFields: { patientid: { $toObjectId: "$patientid" } } },
				{
					$lookup: {
						from: "patient_users",
						localField: "patientid",
						foreignField: "_id",
						as: "patient_details",
					},
				},
			],
			function (error, data) {
				return res.send(data);
				//console.log(res.json(data));
				//handle error case also
			}
		);
	}
});

app.get("/getGoogleApiKey", (req, res) => {
	res.send(process.env.GOOGLEAPIKEY);
});

app.get("/getLastPatientRecord", (req, res) => {
	patient
		.find()
		.limit(1)
		.sort({ $natural: -1 })
		.then((result) => {
			res.send(result);
		});
});

app.get("/getAssigneddoctors/:id", (req, res) => {
	var doctors = req.params.id.split(",");
	let alldoctors = [];
	var count = 0;
	doctors.forEach(function (id) {
		UserModel.find({ _id: id }, function (error, data) {
			alldoctors.push(data[0]);
		});

		count++;
		if (alldoctors.length === count) {
			return res.json(alldoctors);
		}
	});
});

app.get("/getAssigneddoctorsWithSettings/:id", (req, res) => {
	var doctors = req.params.id.split(",");
	let alldoctors = [];
	var count = 0;
	doctors.forEach(function (id) {
		settings.aggregate(
			[
				{
					$match: {
						userid: id,
					},
				},
				{ $addFields: { userid: { $toObjectId: "$userid" } } },
				{
					$lookup: {
						from: "aesthetik_users", // collection to join
						localField: "userid", //field from the input documents
						foreignField: "_id", //field from the documents of the "from" collection
						as: "doctor_details", // output array field
					},
				},
			],
			function (error, data) {
				alldoctors.push(data);
				count++;
				if (doctors.length === count) {
					return res.json(alldoctors);
				}
			}
		);
	});
});

var whitelist = [
	"http://localhost:3000",
	"http://localhost:8080",
	"http://123.176.43.187:3333",
]; //white list consumers
var corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(null, false);
		}
	},
	methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
	allowedHeaders: [
		"Content-Type",
		"Authorization",
		"X-Requested-With",
		"device-remember-token",
		"Access-Control-Allow-Origin",
		"Origin",
		"Accept",
	],
};
app.use(cors(corsOptions));
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.json({ message: "alive" });
});

app.post("/api/email/signup-confirmation", async (req, res, next) => {
	try {
		res.json(await email.signUpConfirmation(req.body));
	} catch (err) {
		next(err);
	}
});

app.post("/api/email/sendemail", async (req, res, next) => {
	try {
		res.json(await email.sendEmail(req.body));
	} catch (err) {
		next(err);
	}
});

// app.get("/api/email/testemail", async (req, res, next) => {
// 	try {
// 		// console.log("enter");
// 		res.json(await email.sendEmail({ type: "test" }));
// 	} catch (err) {
// 		next(err);
// 	}
// });

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	console.error(err.message, err.stack);
	res.status(statusCode).json({ message: err.message });

	return;
});

app.listen(process.env.PORT, () => {
	console.log("server running at " + process.env.PORT);
});
