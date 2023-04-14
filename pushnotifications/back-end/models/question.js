const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Questionschema = new Schema({
	question: String,
	kind: String,
	order: Number,
	childquestionid: String,
	isrequired: Boolean,
	answer: String,
});

module.exports = mongoose.model("question", Questionschema);
