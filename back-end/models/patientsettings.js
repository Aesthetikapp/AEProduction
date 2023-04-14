const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const consultationSchema = new Schema({
	receiveNew: Boolean,
	receiveCancel: Boolean,
	receiveNotification: Boolean,
	status: Boolean,
});

const treatmentSchema = new Schema({
	receiveNew: Boolean,
	receiveCancel: Boolean,
	receiveNotification1hr: Boolean,
	receiveNotification24hr: Boolean,
	status: Boolean,
});

const messageSchema = new Schema({
	receiveNew: Boolean,
	status: Boolean,
});

const PatientSettingsSchema = new Schema({
	patientid: String,
	consultation: [consultationSchema],
	treatment: [treatmentSchema],
	message: [messageSchema],
});

module.exports = mongoose.model("Patient_settings", PatientSettingsSchema);
