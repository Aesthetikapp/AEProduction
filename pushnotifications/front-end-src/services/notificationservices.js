import { Baseurl } from "../common/util";
const axios = require("axios").default;

// var baseurl1;
// if (process.env.REACT_APP_HOST === "local") {
// 	baseurl1 = "http://localhost:3001/";
// } else if (process.env.REACT_APP_HOST === "123") {
// 	baseurl1 = "http://123.176.43.187:3004/";
// } else {
// 	baseurl1 = window.location.origin + "/api/";
// }

export async function sendResetEmailNotification(
	userid,
	name,
	toEmail,
	redirecturl
) {
	try {
		console.log(name, redirecturl, toEmail);

		let params = {
			userid: userid,
			name: name,
			redirecturl: redirecturl,
			toEmail: toEmail,
			type: "reset",
		};
		console.log(params);
		console.log(JSON.stringify(params));
		const response = await fetch(
			Baseurl() + process.env.REACT_APP_SENDCOMMONEMAILNOTIFICATION,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(params),
			}
		);
		console.log(response.data);
		return await response.data;
	} catch (error) {
		return [""];
	}
}

export async function sendRescheduleEmailNotification(
	name,
	toEmail,
	doctorname,
	from,
	dateandtime,
	content
) {
	try {
		console.log(name, toEmail);

		let params = {
			name: name,
			toEmail: toEmail,
			doctorname: doctorname,
			dateandtime: dateandtime,
			content: content,
			from: from,
			type: "reschedule",
		};
		console.log(params);
		console.log(JSON.stringify(params));
		const response = await fetch(
			Baseurl() + process.env.REACT_APP_SENDCOMMONEMAILNOTIFICATION,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(params),
			}
		);
		console.log(response.data);
		return await response.data;
	} catch (error) {
		return [""];
	}
}

export async function sendPatientResetEmailNotification(
	userid,
	name,
	toEmail,
	redirecturl
) {
	try {
		console.log(name, redirecturl, toEmail);

		let params = {
			userid: userid,
			name: name,
			redirecturl: redirecturl,
			toEmail: toEmail,
			type: "patientreset",
		};
		console.log(params);
		console.log(JSON.stringify(params));
		const response = await fetch(
			Baseurl() + process.env.REACT_APP_SENDCOMMONEMAILNOTIFICATION,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(params),
			}
		);
		console.log(response.data);
		return await response.data;
	} catch (error) {
		return [""];
	}
}

export async function sendWelcomeEmailNotification(
	userid,
	name,
	toEmail,
	redirecturl
) {
	try {
		console.log(name, redirecturl, toEmail);
		let params = {
			userid: userid,
			name: name,
			redirecturl: redirecturl,
			toEmail: toEmail,
		};
		console.log(params);
		console.log(JSON.stringify(params));
		//const response = await fetch('http://123.176.43.187:3002/api/email/signup-confirmation', {
		const response = await fetch(
			Baseurl() + process.env.REACT_APP_SENDWELCOMEEMAILNOTIFICATION,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(params),
			}
		);
		return await response.data;
	} catch (error) {
		return [""];
	}
}

export async function sendBusinessRequestEmailNotification(
	userid,
	ruserid,
	name,
	toEmail,
	firstname,
	bname,
	redirecturl,
	redirecturlaccept,
	redirecturlvr,
	notiid
) {
	try {
		console.log(name, redirecturl, toEmail);
		let params = {
			userid: userid + "/" + notiid,
			name: name,
			redirecturl: redirecturl,
			toEmail: toEmail,
			firstname: firstname,
			bname: bname,
			redirecturlaccept: redirecturlaccept,
			redirecturlvr: redirecturlvr,
			type: "request",
			ruserid: ruserid,
		};
		console.log(params);
		console.log(JSON.stringify(params));
		//const response = await fetch('http://123.176.43.187:3002/api/email/signup-confirmation', {
		const response = await fetch(
			Baseurl() + process.env.REACT_APP_SENDCOMMONEMAILNOTIFICATION,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(params),
			}
		);
		return await response.data;
	} catch (error) {
		return [""];
	}
}

export async function sendAcceptRequestEmailNotification(
	userid,
	name,
	toEmail,
	redirecturl,
	bname
) {
	try {
		console.log(name, redirecturl, toEmail);

		let params = {
			businessname: bname,
			userid: userid,
			name: name,
			redirecturl: redirecturl,
			toEmail: toEmail,
			type: "accept",
		};
		console.log(params);
		console.log(JSON.stringify(params));
		const response = await fetch(
			Baseurl() + process.env.REACT_APP_SENDCOMMONEMAILNOTIFICATION,
			{
				//     //const response = await fetch('http://localhost:3002/api/email/signup-confirmation', {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(params),
			}
		);
		console.log(response.data);
		return await response.data;
	} catch (error) {
		return [""];
	}
}

export async function sendDenyRequestEmailNotification(
	userid,
	name,
	toEmail,
	redirecturl,
	bname
) {
	try {
		console.log(name, redirecturl, toEmail);
		// businessname: emailParams.bname,
		//     redirecturl: emailParams.redirecturl + emailParams.userid,
		//         name: emailParams.name,
		let params = {
			businessname: bname,
			userid: userid,
			name: name,
			redirecturl: redirecturl,
			toEmail: toEmail,
			type: "deny",
		};
		console.log(params);
		console.log(JSON.stringify(params));
		const response = await fetch(
			Baseurl() + process.env.REACT_APP_SENDCOMMONEMAILNOTIFICATION,
			{
				//     //const response = await fetch('http://localhost:3002/api/email/signup-confirmation', {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(params),
			}
		);
		console.log(response.data);
		return await response.data;
	} catch (error) {
		return [""];
	}
}

export async function sendInvitationEmailNotification(
	userid,
	name,
	toEmail,
	redirecturl,
	bname,
	firstname,
	username
) {
	try {
		console.log(name, redirecturl, toEmail);

		let params = {
			businessname: bname,
			userid: userid,
			firstname: firstname,
			username: username,
			name: name,
			redirecturl: redirecturl,
			toEmail: toEmail,
			type: "invite",
		};
		console.log(params);
		console.log(JSON.stringify(params));
		const response = await fetch(
			Baseurl() + process.env.REACT_APP_SENDCOMMONEMAILNOTIFICATION,
			{
				//     //const response = await fetch('http://localhost:3002/api/email/signup-confirmation', {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(params),
			}
		);
		console.log(response.data);
		return await response.data;
	} catch (error) {
		return [""];
	}
}
export const SendTestNotification = (data) => {
	return axios({
		url: "https://lilmahesh.info/api/" + "pushNotificationsSend",
		method: "POST",
		data: data,
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});
};
