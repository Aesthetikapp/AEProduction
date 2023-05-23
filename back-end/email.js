const sendGridMail = require("@sendgrid/mail");
sendGridMail.setApiKey(process.env.SENDGRIND_APIKEY);
const handlebars = require("handlebars");
const fs = require("fs");
const e = require("express");

const nameandemail = {
	email: process.env.SENDGRIND_EMAIL,
	name: process.env.SENDGRIND_NAME,
};

function getMessage(emailParams) {
	// return {
	// 	to: emailParams.toEmail,
	// 	from: nameandemail,
	// 	templateId: process.env.SENDGRIND_GETMESSAGE,
	// 	dynamic_template_data: {
	// 		name: emailParams.name,
	// 		redirecturl: emailParams.redirecturl + "/welcome/" + emailParams.userid,
	// 		imgpath: emailParams.redirecturl + "/images/",
	// 	},
	// };
	const filePath = "./emailtemplates/WelcomeOnboard.html";
	const source = fs.readFileSync(filePath, "utf-8").toString();

	const template = handlebars.compile(source);
	const replacements = {
		name: emailParams.name,
		redirecturl: emailParams.redirecturl + "/welcome/" + emailParams.userid,
	};
	const htmlToSend = template(replacements);

	return {
		to: emailParams.toEmail,
		from: nameandemail,
		subject: "Verify your email address and continue",
		// html:
		// 	'<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px" align="center"><tbody><td role="modules-container" style="padding:0;color:#000;text-align:left" bgcolor="#FFFFFF" width="100%" align="left"><table class="m_-1932699574541633412preheader" role="module" border="0" cellpadding="0" cellspacing="0" width="100%" style="display:none!important;opacity:0;color:transparent;height:0;width:0"><tbody><tr><td role="module-content"><p></p></td></tr></tbody></table><table role="module" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed"><tbody><tr><td height="100%" valign="top" role="module-content"><u></u><div bgcolor="#F1F1F1"><div style="width:811px;margin:auto" class="m_-1932699574541633412email-container"><table role="presentation" cellspacing="0" cellpadding="0" border="1" align="center" width="100%" class="m_-1932699574541633412email-container m_-1932699574541633412f-fm"><tbody><tr><td bgcolor="#000000"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tbody><tr><td style="padding:20px 40px 30px 40px;padding-bottom:0!important">&nbsp;&nbsp;&nbsp; <img id="m_-1932699574541633412image0_281_2797" src="https://ci3.googleusercontent.com/proxy/VTSbVFA3vBzbDxlvV1N5bjoJdxHjCLTU3Irhn01bRRX4giqdkUNPCA_ze4MM0fPPma_SM_NftVAw-de9E0bXDCXz=s0-d-e1-ft#http://123.176.43.187:3333/images/Aes2ALPHA.png" style="width:32.82px;height:36.25px" class="CToWUd" data-bit="iit">&nbsp;&nbsp;&nbsp;&nbsp;<div id="m_-1932699574541633412image0_281_2798" style="vertical-align:middle;display:inline-block;font-style:normal;font-weight:700;font-size:23px;color:#fff;padding-bottom:35px;padding-top:8px">Aesthetik</div></td></tr></tbody></table></td></tr><tr><td bgcolor="#FFFFFF" valign="top" style="background-position:center center!important;background-size:cover!important"><div style="padding-left:10px"><table style="margin:0!important;margin-left:47px!important"><tbody><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Raleway,sans-serif;font-style:normal;font-weight:400;font-size:30px;line-height:35px">Hi ' +
		// 	emailParams.name +
		// 	',</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Mulish,sans-serif;font-style:normal;font-weight:400;font-size:18px">Thank you for signing up with Aesthetik.<br>Please verify your email address and then click the continue button.</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="width:44%"><a href="' +
		// 	process.env.URL +
		// 	"/welcome/" +
		// 	emailParams.userid +
		// 	'" style="text-decoration:none;display:inline-block" target="_blank" ><div class="m_-1932699574541633412f-fm" style="background-color:#fff;border:1px solid #000;border-radius:31.5px;font-style:normal;font-weight:600;font-size:18px;color:#000;vertical-align:middle;text-decoration:none;padding-left:65px;padding-top:20px;padding-bottom:20px;padding-right:65px">Continue</div></a></td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Mulish,sans-serif;font-style:normal;font-weight:400;font-size:18px">Yours sincerely,<br>Aesthetik Team</td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr></tbody></table></div></td></tr></tbody></table></div></div></td></tr></tbody></table></td></tr></tbody></table>',
		html: htmlToSend,
	};
}

function getRequestMessage(emailParams) {
	// return {
	// 	to: emailParams.toEmail,
	// 	from: nameandemail,
	// 	templateId: process.env.SENDGRIND_GETREQUESTMESSAGE,
	// 	dynamic_template_data: {
	// 		businessname: emailParams.bname,
	// 		redirecturlvr: emailParams.redirecturlvr + emailParams.userid,
	// 		redirecturlaccept:
	// 			emailParams.redirecturlaccept +
	// 			emailParams.ruserid +
	// 			"/" +
	// 			emailParams.userid,
	// 		name: emailParams.name,
	// 		firstname: emailParams.firstname,
	// 		imgpath: emailParams.redirecturl + "/images/",
	// 	},
	// };
	const filePath = "./emailtemplates/RequestUsertoAdmin.html";
	const source = fs.readFileSync(filePath, "utf-8").toString();

	const template = handlebars.compile(source);
	const replacements = {
		name: emailParams.name,
		firstname: emailParams.firstname,
		businessname: emailParams.bname,
		redirecturlvr: emailParams.redirecturlvr + emailParams.userid,
		redirecturlaccept:
			emailParams.redirecturlaccept +
			emailParams.ruserid +
			"/" +
			emailParams.userid,
	};
	const htmlToSend = template(replacements);

	return {
		to: emailParams.toEmail,
		from: nameandemail,
		subject:
			"A request from " +
			emailParams.firstname +
			" to join the " +
			emailParams.bname,
		html: htmlToSend,
		// '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px" align="center"><tbody><td role="modules-container" style="padding:0;color:#000;text-align:left" bgcolor="#FFFFFF" width="100%" align="left"><table class="m_-1932699574541633412preheader" role="module" border="0" cellpadding="0" cellspacing="0" width="100%" style="display:none!important;opacity:0;color:transparent;height:0;width:0"><tbody><tr><td role="module-content"><p></p></td></tr></tbody></table><table role="module" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed"><tbody><tr><td height="100%" valign="top" role="module-content"><u></u><div bgcolor="#F1F1F1"><div style="width:811px;margin:auto" class="m_-1932699574541633412email-container"><table role="presentation" cellspacing="0" cellpadding="0" border="1" align="center" width="100%" class="m_-1932699574541633412email-container m_-1932699574541633412f-fm"><tbody><tr><td bgcolor="#000000"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tbody><tr><td style="padding:20px 40px 30px 40px;padding-bottom:0!important">&nbsp;&nbsp;&nbsp; <img id="m_-1932699574541633412image0_281_2797" src="https://ci3.googleusercontent.com/proxy/VTSbVFA3vBzbDxlvV1N5bjoJdxHjCLTU3Irhn01bRRX4giqdkUNPCA_ze4MM0fPPma_SM_NftVAw-de9E0bXDCXz=s0-d-e1-ft#http://123.176.43.187:3333/images/Aes2ALPHA.png" style="width:32.82px;height:36.25px" class="CToWUd" data-bit="iit">&nbsp;&nbsp;&nbsp;&nbsp;<div id="m_-1932699574541633412image0_281_2798" style="vertical-align:middle;display:inline-block;font-style:normal;font-weight:700;font-size:23px;color:#fff;padding-bottom:35px;padding-top:8px">Aesthetik</div></td></tr></tbody></table></td></tr><tr><td bgcolor="#FFFFFF" valign="top" style="background-position:center center!important;background-size:cover!important"><div style="padding-left:10px"><table style="margin:0!important;margin-left:47px!important"><tbody><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Raleway,sans-serif;font-style:normal;font-weight:400;font-size:30px;line-height:35px">Hi ' +
		// emailParams.name +
		// ',</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Mulish,sans-serif;font-style:normal;font-weight:400;font-size:18px">Looks like {{firstname}} sent you a request to join the ' +
		// emailParams.bname +
		// ' on Aesthetik.</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="width:44%"><a href="' +
		// process.env.URL +
		// 'login" style="text-decoration:none;display:inline-block" target="_blank" ><div class="m_-1932699574541633412f-fm" style="background-color:#fff;border:1px solid #000;border-radius:31.5px;font-style:normal;font-weight:600;font-size:18px;color:#000;vertical-align:middle;text-decoration:none;padding-left:65px;padding-top:20px;padding-bottom:20px;padding-right:65px">Login</div></a></td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Mulish,sans-serif;font-style:normal;font-weight:400;font-size:18px">Yours sincerely,<br>Aesthetik Team</td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr></tbody></table></div></td></tr></tbody></table></div></div></td></tr></tbody></table></td></tr></tbody></table>',
	};
}

function getDenyMessage(emailParams) {
	// console.log("emailParams", emailParams);
	const filePath = "./emailtemplates/DeniedRequest.html";
	const source = fs.readFileSync(filePath, "utf-8").toString();

	const template = handlebars.compile(source);
	const replacements = {
		businessname: emailParams.businessname,
		redirecturl: emailParams.redirecturl + "/welcome/" + emailParams.userid,
		name: emailParams.name,
	};
	const htmlToSend = template(replacements);

	return {
		to: emailParams.toEmail,
		from: nameandemail,
		subject: "Your request is denied by " + emailParams.businessname,
		html: htmlToSend,
		// templateId: process.env.SENDGRIND_GETDENYMESSAGE,
		// dynamic_template_data: {
		// 	businessname: emailParams.bname,
		// 	redirecturl: emailParams.redirecturl + "/welcome/" + emailParams.userid,
		// 	name: emailParams.name,
		// 	imgpath: emailParams.redirecturl + "/images/",
		// },
	};
}

function getApprovedMessage(emailParams) {
	const filePath = "./emailtemplates/ApprovedRequest.html";
	const source = fs.readFileSync(filePath, "utf-8").toString();

	const template = handlebars.compile(source);
	const replacements = {
		businessname: emailParams.businessname,
		redirecturl: emailParams.redirecturl + emailParams.userid,
		name: emailParams.name,
	};
	const htmlToSend = template(replacements);

	return {
		to: emailParams.toEmail,
		from: nameandemail,
		subject: "Your request approved by " + emailParams.businessname,
		html: htmlToSend,
		// templateId: process.env.SENDGRIND_GETDENYMESSAGE,
		// dynamic_template_data: {
		// 	businessname: emailParams.bname,
		// 	redirecturl: emailParams.redirecturl + "/welcome/" + emailParams.userid,
		// 	name: emailParams.name,
		// 	imgpath: emailParams.redirecturl + "/images/",
		// },
	};
	// return {
	// 	to: emailParams.toEmail,
	// 	from: nameandemail,
	// 	templateId: process.env.SENDGRIND_GETAPPROVEDMESSAGE,
	// 	dynamic_template_data: {
	// 		businessname: emailParams.businessname,
	// 		redirecturl: emailParams.redirecturl + emailParams.userid,
	// 		name: emailParams.name,
	// 		imgpath: emailParams.redirecturl + "/images/",
	// 	},
	// };
}

function getInvitationMessage(emailParams) {
	const filePath = "./emailtemplates/InvitationFromDoctorToAdmin.html";
	const source = fs.readFileSync(filePath, "utf-8").toString();

	const template = handlebars.compile(source);
	const replacements = {
		businessname: emailParams.businessname,
		redirecturl: emailParams.redirecturl + emailParams.userid,
		name: emailParams.name,
		username: emailParams.username,
		firstname: emailParams.firstname,
	};
	const htmlToSend = template(replacements);

	return {
		to: emailParams.toEmail,
		from: nameandemail,
		subject: emailParams.name + " sent you an invitation",
		html: htmlToSend,
		// templateId: process.env.SENDGRIND_GETDENYMESSAGE,
		// dynamic_template_data: {
		// 	businessname: emailParams.bname,
		// 	redirecturl: emailParams.redirecturl + "/welcome/" + emailParams.userid,
		// 	name: emailParams.name,
		// 	imgpath: emailParams.redirecturl + "/images/",
		// },
	};
	// return {
	// 	to: emailParams.toEmail,
	// 	from: nameandemail,
	// 	templateId: process.env.SENDGRIND_GETINVITATIONMESSAGE,
	// 	dynamic_template_data: {
	// 		businessname: emailParams.businessname,
	// 		redirecturl: emailParams.redirecturl + emailParams.userid,
	// 		name: emailParams.name,
	// 		username: emailParams.username,
	// 		firstname: emailParams.firstname,
	// 		imgpath: emailParams.redirecturl + "/images/",
	// 	},
	// };
}

async function signUpConfirmation(emailParams) {
	try {
		await sendGridMail.send(getMessage(emailParams));
		return {
			message: `Order confirmation email sent successfully for orderNr: ${emailParams.name}`,
		};
	} catch (error) {
		const message = `Error sending order confirmation email or orderNr: ${emailParams.name}`;
		console.error(message);
		console.error(error);
		if (error.response) {
			return error.response;
		}
		return { message };
	}
}

async function sendEmail(emailParams) {
	// console.log(emailParams.type);
	let message = "";
	if (emailParams.type === "deny") {
		message = getDenyMessage(emailParams);
	}
	if (emailParams.type === "accept") {
		message = getApprovedMessage(emailParams);
	}
	if (emailParams.type === "request") {
		message = getRequestMessage(emailParams);
	}
	if (emailParams.type === "invite") {
		message = getInvitationMessage(emailParams);
	}
	if (emailParams.type === "accepted") {
		await sendGridMail
			.send(emailAccept(emailParams))
			.then((response) => {
				// console.log(response[0].statusCode);
				// console.log(response[0].headers);
			})
			.catch((error) => {
				console.error(error);
			});
		return;
	}
	if (emailParams.type === "reset") {
		await sendGridMail
			.send(resetEmail(emailParams))
			.then((response) => {
				// console.log(response[0].statusCode);
				// console.log(response[0].headers);
			})
			.catch((error) => {
				console.error(error);
			});
		return;
	}
	if (emailParams.type === "patientreset") {
		await sendGridMail
			.send(patientresetEmail(emailParams))
			.then((response) => {
				// console.log(response[0].statusCode);
				// console.log(response[0].headers);
			})
			.catch((error) => {
				console.error(error);
			});
		return;
	}
	if (emailParams.type === "reschedule") {
		await sendGridMail
			.send(Reschedule(emailParams))
			.then((response) => {
				// console.log(response[0].statusCode);
				// console.log(response[0].headers);
			})
			.catch((error) => {
				console.error(error);
			});
		return;
	}
	if (emailParams.type === "error") {
		await sendGridMail
			.send(emailerror(emailParams))
			.then((response) => {
				// console.log(response[0].statusCode);
				// console.log(response[0].headers);
			})
			.catch((error) => {
				console.error(error);
			});
		return;
	}

	try {
		await sendGridMail.send(message);
		return {
			message: `Order confirmation email sent successfully for orderNr: ${emailParams.name}`,
		};
	} catch (error) {
		const message = `Error sending order confirmation email or orderNr: ${emailParams.name}`;
		console.error(message);
		console.error(error);
		if (error.response) {
			return error.response;
		}
		return { message };
	}
}

function emailAccept(emailParams) {
	// console.log("emailParams", emailParams);

	if (emailParams.role !== undefined && emailParams.role === "patient") {
		return {
			to: emailParams.user.email,
			from: nameandemail,
			subject: "Aesthetik Ltd - KYC Verification",
			html:
				'<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px" align="center"><tbody><td role="modules-container" style="padding:0;color:#000;text-align:left" bgcolor="#FFFFFF" width="100%" align="left"><table class="m_-1932699574541633412preheader" role="module" border="0" cellpadding="0" cellspacing="0" width="100%" style="display:none!important;opacity:0;color:transparent;height:0;width:0"><tbody><tr><td role="module-content"><p></p></td></tr></tbody></table><table role="module" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed"><tbody><tr><td height="100%" valign="top" role="module-content"><u></u><div bgcolor="#F1F1F1"><div style="width:811px;margin:auto" class="m_-1932699574541633412email-container"><table role="presentation" cellspacing="0" cellpadding="0" border="1" align="center" width="100%" class="m_-1932699574541633412email-container m_-1932699574541633412f-fm"><tbody><tr><td bgcolor="#000000"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tbody><tr><td style="padding:20px 40px 30px 40px;padding-bottom:0!important">&nbsp;&nbsp;&nbsp; <img id="m_-1932699574541633412image0_281_2797" src="https://ci3.googleusercontent.com/proxy/VTSbVFA3vBzbDxlvV1N5bjoJdxHjCLTU3Irhn01bRRX4giqdkUNPCA_ze4MM0fPPma_SM_NftVAw-de9E0bXDCXz=s0-d-e1-ft#http://123.176.43.187:3333/images/Aes2ALPHA.png" style="width:32.82px;height:36.25px" class="CToWUd" data-bit="iit">&nbsp;&nbsp;&nbsp;&nbsp;<div id="m_-1932699574541633412image0_281_2798" style="vertical-align:middle;display:inline-block;font-style:normal;font-weight:700;font-size:23px;color:#fff;padding-bottom:35px;padding-top:8px">Aesthetik</div></td></tr></tbody></table></td></tr><tr><td bgcolor="#FFFFFF" valign="top" style="background-position:center center!important;background-size:cover!important"><div style="padding-left:10px"><table style="margin:0!important;margin-left:47px!important"><tbody><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Raleway,sans-serif;font-style:normal;font-weight:400;font-size:30px;line-height:35px">Hi ' +
				emailParams.user.firstName +
				',</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Mulish,sans-serif;font-style:normal;font-weight:400;font-size:18px">Thank you for uploading your personal identification.<br><br>All is approved, please login into the app and book your appointment.</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Mulish,sans-serif;font-style:normal;font-weight:400;font-size:18px">Yours sincerely,<br>Aesthetik Team</td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr></tbody></table></div></td></tr></tbody></table></div></div></td></tr></tbody></table></td></tr></tbody></table>',
		};
	} else {
		return {
			to: emailParams.user.email,
			from: nameandemail,
			subject: "Aesthetik Ltd - KYC Verification",
			html:
				'<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px" align="center"><tbody><td role="modules-container" style="padding:0;color:#000;text-align:left" bgcolor="#FFFFFF" width="100%" align="left"><table class="m_-1932699574541633412preheader" role="module" border="0" cellpadding="0" cellspacing="0" width="100%" style="display:none!important;opacity:0;color:transparent;height:0;width:0"><tbody><tr><td role="module-content"><p></p></td></tr></tbody></table><table role="module" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed"><tbody><tr><td height="100%" valign="top" role="module-content"><u></u><div bgcolor="#F1F1F1"><div style="width:811px;margin:auto" class="m_-1932699574541633412email-container"><table role="presentation" cellspacing="0" cellpadding="0" border="1" align="center" width="100%" class="m_-1932699574541633412email-container m_-1932699574541633412f-fm"><tbody><tr><td bgcolor="#000000"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tbody><tr><td style="padding:20px 40px 30px 40px;padding-bottom:0!important">&nbsp;&nbsp;&nbsp; <img id="m_-1932699574541633412image0_281_2797" src="https://ci3.googleusercontent.com/proxy/VTSbVFA3vBzbDxlvV1N5bjoJdxHjCLTU3Irhn01bRRX4giqdkUNPCA_ze4MM0fPPma_SM_NftVAw-de9E0bXDCXz=s0-d-e1-ft#http://123.176.43.187:3333/images/Aes2ALPHA.png" style="width:32.82px;height:36.25px" class="CToWUd" data-bit="iit">&nbsp;&nbsp;&nbsp;&nbsp;<div id="m_-1932699574541633412image0_281_2798" style="vertical-align:middle;display:inline-block;font-style:normal;font-weight:700;font-size:23px;color:#fff;padding-bottom:35px;padding-top:8px">Aesthetik</div></td></tr></tbody></table></td></tr><tr><td bgcolor="#FFFFFF" valign="top" style="background-position:center center!important;background-size:cover!important"><div style="padding-left:10px"><table style="margin:0!important;margin-left:47px!important"><tbody><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Raleway,sans-serif;font-style:normal;font-weight:400;font-size:30px;line-height:35px">Hi ' +
				emailParams.user.firstName +
				',</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Mulish,sans-serif;font-style:normal;font-weight:400;font-size:18px">Thank you for uploading your personal identification and medical documentation.<br><br>All is approved, please click the button below to log into the dashboard and complete the registration.</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="width:44%"><a href="' +
				process.env.URL +
				'login" style="text-decoration:none;display:inline-block" target="_blank" ><div class="m_-1932699574541633412f-fm" style="background-color:#fff;border:1px solid #000;border-radius:31.5px;font-style:normal;font-weight:600;font-size:18px;color:#000;vertical-align:middle;text-decoration:none;padding-left:65px;padding-top:20px;padding-bottom:20px;padding-right:65px">Login</div></a></td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Mulish,sans-serif;font-style:normal;font-weight:400;font-size:18px">Yours sincerely,<br>Aesthetik Team</td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr></tbody></table></div></td></tr></tbody></table></div></div></td></tr></tbody></table></td></tr></tbody></table>',
		};
	}
}

function resetEmail(emailParams) {
	// console.log("emailParams", emailParams);
	return {
		to: emailParams.toEmail,
		from: nameandemail,
		subject: "Aesthetik Ltd - RESET PASSWORD",
		html:
			'<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px" align="center"><tbody><td role="modules-container" style="padding:0;color:#000;text-align:left" bgcolor="#FFFFFF" width="100%" align="left"><table class="m_-1932699574541633412preheader" role="module" border="0" cellpadding="0" cellspacing="0" width="100%" style="display:none!important;opacity:0;color:transparent;height:0;width:0"><tbody><tr><td role="module-content"><p></p></td></tr></tbody></table><table role="module" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed"><tbody><tr><td height="100%" valign="top" role="module-content"><u></u><div bgcolor="#F1F1F1"><div style="width:811px;margin:auto" class="m_-1932699574541633412email-container"><table role="presentation" cellspacing="0" cellpadding="0" border="1" align="center" width="100%" class="m_-1932699574541633412email-container m_-1932699574541633412f-fm"><tbody><tr><td bgcolor="#000000"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tbody><tr><td style="padding:20px 40px 30px 40px;padding-bottom:0!important">&nbsp;&nbsp;&nbsp; <img id="m_-1932699574541633412image0_281_2797" src="https://ci3.googleusercontent.com/proxy/VTSbVFA3vBzbDxlvV1N5bjoJdxHjCLTU3Irhn01bRRX4giqdkUNPCA_ze4MM0fPPma_SM_NftVAw-de9E0bXDCXz=s0-d-e1-ft#http://123.176.43.187:3333/images/Aes2ALPHA.png" style="width:32.82px;height:36.25px" class="CToWUd" data-bit="iit">&nbsp;&nbsp;&nbsp;&nbsp;<div id="m_-1932699574541633412image0_281_2798" style="vertical-align:middle;display:inline-block;font-style:normal;font-weight:700;font-size:23px;color:#fff;padding-bottom:35px;padding-top:8px">Aesthetik</div></td></tr></tbody></table></td></tr><tr><td bgcolor="#FFFFFF" valign="top" style="background-position:center center!important;background-size:cover!important"><div style="padding-left:10px"><table style="margin:0!important;margin-left:47px!important"><tbody><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Raleway,sans-serif;font-style:normal;font-weight:400;font-size:30px;line-height:35px">Hi ' +
			emailParams.name +
			',</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Mulish,sans-serif;font-style:normal;font-weight:400;font-size:18px">We have received a request to reset your password for your Aesthetik account.<br><br>Click on the below button to reset your password.</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="width:44%"><a href="' +
			emailParams.redirecturl +
			"/resetpassword/" +
			emailParams.userid +
			'" style="text-decoration:none;display:inline-block" target="_blank" ><div class="m_-1932699574541633412f-fm" style="background-color:#000;border:1px solid #000;border-radius:31.5px;font-style:normal;font-weight:600;font-size:18px;color:#fff;vertical-align:middle;text-decoration:none;padding-left:65px;padding-top:20px;padding-bottom:20px;padding-right:65px">Reset your password</div></a></td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Mulish,sans-serif;font-style:normal;font-weight:400;font-size:18px">Yours sincerely,<br>Aesthetik Team</td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr></tbody></table></div></td></tr></tbody></table></div></div></td></tr></tbody></table></td></tr></tbody></table>',
	};
}

function patientresetEmail(emailParams) {
	// console.log("emailParams", emailParams);
	return {
		to: emailParams.toEmail,
		from: nameandemail,
		subject: "Aesthetik Ltd - RESET PASSWORD",
		html:
			'<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px" align="center"><tbody><td role="modules-container" style="padding:0;color:#000;text-align:left" bgcolor="#FFFFFF" width="100%" align="left"><table class="m_-1932699574541633412preheader" role="module" border="0" cellpadding="0" cellspacing="0" width="100%" style="display:none!important;opacity:0;color:transparent;height:0;width:0"><tbody><tr><td role="module-content"><p></p></td></tr></tbody></table><table role="module" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed"><tbody><tr><td height="100%" valign="top" role="module-content"><u></u><div bgcolor="#F1F1F1"><div style="width:811px;margin:auto" class="m_-1932699574541633412email-container"><table role="presentation" cellspacing="0" cellpadding="0" border="1" align="center" width="100%" class="m_-1932699574541633412email-container m_-1932699574541633412f-fm"><tbody><tr><td bgcolor="#000000"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tbody><tr><td style="padding:20px 40px 30px 40px;padding-bottom:0!important">&nbsp;&nbsp;&nbsp; <img id="m_-1932699574541633412image0_281_2797" src="https://ci3.googleusercontent.com/proxy/VTSbVFA3vBzbDxlvV1N5bjoJdxHjCLTU3Irhn01bRRX4giqdkUNPCA_ze4MM0fPPma_SM_NftVAw-de9E0bXDCXz=s0-d-e1-ft#http://123.176.43.187:3333/images/Aes2ALPHA.png" style="width:32.82px;height:36.25px" class="CToWUd" data-bit="iit">&nbsp;&nbsp;&nbsp;&nbsp;<div id="m_-1932699574541633412image0_281_2798" style="vertical-align:middle;display:inline-block;font-style:normal;font-weight:700;font-size:23px;color:#fff;padding-bottom:35px;padding-top:8px">Aesthetik</div></td></tr></tbody></table></td></tr><tr><td bgcolor="#FFFFFF" valign="top" style="background-position:center center!important;background-size:cover!important"><div style="padding-left:10px"><table style="margin:0!important;margin-left:47px!important"><tbody><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Raleway,sans-serif;font-style:normal;font-weight:400;font-size:30px;line-height:35px">Hi ' +
			emailParams.name +
			',</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Mulish,sans-serif;font-style:normal;font-weight:400;font-size:18px">We have received a request to reset your password for your Aesthetik account.<br><br>Click on the below button to reset your password.</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="width:44%"><a href="' +
			emailParams.redirecturl +
			"/patientresetpassword/" +
			emailParams.userid +
			'" style="text-decoration:none;display:inline-block" target="_blank" ><div class="m_-1932699574541633412f-fm" style="background-color:#000;border:1px solid #000;border-radius:31.5px;font-style:normal;font-weight:600;font-size:18px;color:#fff;vertical-align:middle;text-decoration:none;padding-left:65px;padding-top:20px;padding-bottom:20px;padding-right:65px">Reset your password</div></a></td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Mulish,sans-serif;font-style:normal;font-weight:400;font-size:18px">Yours sincerely,<br>Aesthetik Team</td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr></tbody></table></div></td></tr></tbody></table></div></div></td></tr></tbody></table></td></tr></tbody></table>',
	};
}

function Reschedule(emailParams) {
	// console.log("emailParams", emailParams);
	var content;
	if (emailParams.content === undefined) {
		content = "appointment";
	} else {
		content = "consultation";
	}
	return {
		to: emailParams.toEmail,
		from: nameandemail,
		subject: "Aesthetik Ltd - APPOINTMENT RESCHEDULE",
		html:
			'<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px" align="center"><tbody><td role="modules-container" style="padding:0;color:#000;text-align:left" bgcolor="#FFFFFF" width="100%" align="left"><table class="m_-1932699574541633412preheader" role="module" border="0" cellpadding="0" cellspacing="0" width="100%" style="display:none!important;opacity:0;color:transparent;height:0;width:0"><tbody><tr><td role="module-content"><p></p></td></tr></tbody></table><table role="module" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed"><tbody><tr><td height="100%" valign="top" role="module-content"><u></u><div bgcolor="#F1F1F1"><div style="width:811px;margin:auto" class="m_-1932699574541633412email-container"><table role="presentation" cellspacing="0" cellpadding="0" border="1" align="center" width="100%" class="m_-1932699574541633412email-container m_-1932699574541633412f-fm"><tbody><tr><td bgcolor="#000000"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tbody><tr><td style="padding:20px 40px 30px 40px;padding-bottom:0!important">&nbsp;&nbsp;&nbsp; <img id="m_-1932699574541633412image0_281_2797" src="https://ci3.googleusercontent.com/proxy/VTSbVFA3vBzbDxlvV1N5bjoJdxHjCLTU3Irhn01bRRX4giqdkUNPCA_ze4MM0fPPma_SM_NftVAw-de9E0bXDCXz=s0-d-e1-ft#http://123.176.43.187:3333/images/Aes2ALPHA.png" style="width:32.82px;height:36.25px" class="CToWUd" data-bit="iit">&nbsp;&nbsp;&nbsp;&nbsp;<div id="m_-1932699574541633412image0_281_2798" style="vertical-align:middle;display:inline-block;font-style:normal;font-weight:700;font-size:23px;color:#fff;padding-bottom:35px;padding-top:8px">Aesthetik</div></td></tr></tbody></table></td></tr><tr><td bgcolor="#FFFFFF" valign="top" style="background-position:center center!important;background-size:cover!important"><div style="padding-left:10px"><table style="margin:0!important;margin-left:47px!important"><tbody><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Raleway,sans-serif;font-style:normal;font-weight:400;font-size:30px;line-height:35px">Hi ' +
			emailParams.name +
			',</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Mulish,sans-serif;font-style:normal;font-weight:400;font-size:18px">Dr. ' +
			emailParams.doctorname +
			" has rescheduled your " +
			content +
			" from " +
			emailParams.from +
			" to " +
			emailParams.dateandtime +
			'.</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Mulish,sans-serif;font-style:normal;font-weight:400;font-size:18px">Yours sincerely,<br>Aesthetik Team</td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr></tbody></table></div></td></tr></tbody></table></div></div></td></tr></tbody></table></td></tr></tbody></table>',
	};
}

function emailerror(emailParams) {
	if (emailParams.role !== undefined && emailParams.role === "patient") {
		return {
			to: emailParams.user.email,
			from: nameandemail,
			subject: "Aesthetik Ltd - KYC Verification",
			html:
				'<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px" align="center"><tbody><tr><td role="modules-container" style="padding:0;color:#000;text-align:left" bgcolor="#FFFFFF" width="100%" align="left"><table class="m_-1932699574541633412preheader" role="module" border="0" cellpadding="0" cellspacing="0" width="100%" style="display:none!important;opacity:0;color:transparent;height:0;width:0"><tbody><tr><td role="module-content"><p></p></td></tr></tbody></table><table role="module" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed"><tbody><tr><td height="100%" valign="top" role="module-content"><u></u><div bgcolor="#F1F1F1"><div style="width:811px;margin:auto" class="m_-1932699574541633412email-container"><table role="presentation" cellspacing="0" cellpadding="0" border="1" align="center" width="100%" class="m_-1932699574541633412email-container m_-1932699574541633412f-fm"><tbody><tr><td bgcolor="#000000"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tbody><tr><td style="padding:20px 40px 30px 40px;padding-bottom:0!important">&nbsp;&nbsp;&nbsp; <img id="m_-1932699574541633412image0_281_2797" src="https://ci3.googleusercontent.com/proxy/VTSbVFA3vBzbDxlvV1N5bjoJdxHjCLTU3Irhn01bRRX4giqdkUNPCA_ze4MM0fPPma_SM_NftVAw-de9E0bXDCXz=s0-d-e1-ft#http://123.176.43.187:3333/images/Aes2ALPHA.png" style="width:32.82px;height:36.25px" class="CToWUd" data-bit="iit">&nbsp;&nbsp;&nbsp;&nbsp;<div id="m_-1932699574541633412image0_281_2798" style="vertical-align:middle;display:inline-block;font-style:normal;font-weight:700;font-size:23px;color:#fff;padding-bottom:35px;padding-top:8px">Aesthetik</div></td></tr></tbody></table></td></tr><tr><td bgcolor="#FFFFFF" valign="top" style="background-position:center center!important;background-size:cover!important"><div style="padding-left:10px"><table style="margin:0!important;margin-left:47px!important"><tbody><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Raleway,sans-serif;font-style:normal;font-weight:400;font-size:30px;line-height:35px">Hi ' +
				emailParams.user.firstName +
				',</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Mulish,sans-serif;font-style:normal;font-weight:400;font-size:18px">Thank you for uploading your personal identification.<br><br>However something went wrong and your personal identification was not approved, <br> please try uploading again by logging into the app or contact suppot@aesthetik.app immediately.</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Mulish,sans-serif;font-style:normal;font-weight:400;font-size:18px">Yours sincerely,<br>Aesthetik Team</td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr></tbody></table></div></td></tr></tbody></table></div></div></td></tr></tbody></table></td></tr></tbody></table>',
		};
	} else {
		return {
			to: emailParams.user.email,
			from: nameandemail,
			subject: "Aesthetik Ltd - KYC Verification",
			html:
				'<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px" align="center"><tbody><tr><td role="modules-container" style="padding:0;color:#000;text-align:left" bgcolor="#FFFFFF" width="100%" align="left"><table class="m_-1932699574541633412preheader" role="module" border="0" cellpadding="0" cellspacing="0" width="100%" style="display:none!important;opacity:0;color:transparent;height:0;width:0"><tbody><tr><td role="module-content"><p></p></td></tr></tbody></table><table role="module" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed"><tbody><tr><td height="100%" valign="top" role="module-content"><u></u><div bgcolor="#F1F1F1"><div style="width:811px;margin:auto" class="m_-1932699574541633412email-container"><table role="presentation" cellspacing="0" cellpadding="0" border="1" align="center" width="100%" class="m_-1932699574541633412email-container m_-1932699574541633412f-fm"><tbody><tr><td bgcolor="#000000"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tbody><tr><td style="padding:20px 40px 30px 40px;padding-bottom:0!important">&nbsp;&nbsp;&nbsp; <img id="m_-1932699574541633412image0_281_2797" src="https://ci3.googleusercontent.com/proxy/VTSbVFA3vBzbDxlvV1N5bjoJdxHjCLTU3Irhn01bRRX4giqdkUNPCA_ze4MM0fPPma_SM_NftVAw-de9E0bXDCXz=s0-d-e1-ft#http://123.176.43.187:3333/images/Aes2ALPHA.png" style="width:32.82px;height:36.25px" class="CToWUd" data-bit="iit">&nbsp;&nbsp;&nbsp;&nbsp;<div id="m_-1932699574541633412image0_281_2798" style="vertical-align:middle;display:inline-block;font-style:normal;font-weight:700;font-size:23px;color:#fff;padding-bottom:35px;padding-top:8px">Aesthetik</div></td></tr></tbody></table></td></tr><tr><td bgcolor="#FFFFFF" valign="top" style="background-position:center center!important;background-size:cover!important"><div style="padding-left:10px"><table style="margin:0!important;margin-left:47px!important"><tbody><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Raleway,sans-serif;font-style:normal;font-weight:400;font-size:30px;line-height:35px">Hi ' +
				emailParams.user.firstName +
				',</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Mulish,sans-serif;font-style:normal;font-weight:400;font-size:18px">Thank you for uploading your personal identification and medical documentation.<br><br>However something went wrong and your documentation was not approved, please try again by clicking the button below or contact suppot@aesthetik.app immediately.</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="width:44%"><a href="' +
				process.env.URL +
				'login" style="text-decoration:none;display:inline-block" target="_blank"><div class="m_-1932699574541633412f-fm" style="background-color:#fff;border:1px solid #000;border-radius:31.5px;font-style:normal;font-weight:600;font-size:18px;color:#000;vertical-align:middle;text-decoration:none;padding-left:65px;padding-top:20px;padding-bottom:20px;padding-right:65px">Login</div></a></td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr><td style="font-family:Mulish,sans-serif;font-style:normal;font-weight:400;font-size:18px">Yours sincerely,<br>Aesthetik Team</td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr></tbody></table></div></td></tr></tbody></table></div></div></td></tr></tbody></table></td></tr></tbody></table>',
		};
	}
}

module.exports = {
	signUpConfirmation,
	sendEmail,
};
