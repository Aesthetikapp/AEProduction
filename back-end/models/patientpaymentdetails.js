const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientpaymentdetailsSchema = new Schema({
	patientid: String,
	number: String,
	expiry: String,
	name: String,
	billingzipcode: String,
	cardtype: String,
	isdefault: Boolean,
	isactive: Boolean,
});

module.exports = mongoose.model(
	"Patientpaymentdetails",
	patientpaymentdetailsSchema
);
