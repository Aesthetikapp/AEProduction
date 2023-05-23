const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appnotificationSchema = new Schema({
	appointmentid: String,
	patientid: String,
	doctorid: String,
	date: String,
	time: String,
	title: String,
	description: String,
	kind: String,
	deeplink: String,
	isopened: Boolean,
});

module.exports = mongoose.model("Appnotification", appnotificationSchema);
