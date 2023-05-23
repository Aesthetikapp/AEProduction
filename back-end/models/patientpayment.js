const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientpaymentSchema = new Schema({
	paymentintent: String,
	paymentstatus: String,
	appointmentid: String,
	date: String,
	stipeaccount: String,
	amount: String,
	kind: String,
	tax: String,
	refund: String,
});

module.exports = mongoose.model("Patientpayment", patientpaymentSchema);
