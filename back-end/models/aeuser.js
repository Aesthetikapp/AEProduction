const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
	line1: String,
	line2: String,
	towncity: String,
	postcode: String,
	state: String,
	country: String,
});
const businessSchema = new Schema({
	btype: String,
	name: String,
	bio: String,
	location: [locationSchema],
	website: String,
	bavatar: String,
	noofemployees: String,
});
const verificationSchema = new Schema({
	idv: Array,
	ml: Array,
	od: Array,
	mi: Array,
	ev: Array,
});
const aeUserSchema = new Schema({
	email: String,
	firstName: String,
	lastName: String,
	sumsubstatus: String,
	primaryTelephone: String,
	countryCode: String,
	clinicname: String,
	business: [businessSchema],
	gender: String,
	avatar: String,
	notifyme: Boolean,
	dob: Date,
	bio1: String,
	channelid: String,
	verification: [verificationSchema],
	stripeaccount: String,
	plan: String,
	source: String,
	isadmin: Boolean,
	complete: String,
	loginthrough: String,
	currentstep: String,
	entered: String,
	createdate: Date,
	updatedate: Date,
	stripestatus: String,
	updateuser: String,
	password: String,
});

module.exports = mongoose.model("Aesthetik_user", aeUserSchema);
