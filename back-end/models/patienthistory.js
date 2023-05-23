const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patienthistoryschema = new Schema({
	patientid: String,
	sign1: String,
	sign2: String,
	answers: String,
	updateddate: String,
	createdddate: String,
});

module.exports = mongoose.model("patienthistory", patienthistoryschema);
