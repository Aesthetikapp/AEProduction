const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionhistory = new Schema({
	paymentstatus: String,
	doctorid: String,
	planid: String,
	amount: String,
	planname: String,
	startdate: String,
	enddate: String,
	transactionid: String,
});

module.exports = mongoose.model("Subscriptionhistory", subscriptionhistory);
