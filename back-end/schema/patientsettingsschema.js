const patientSettingsModel = require("../models/patientsettings");
const utils = require("../common/utils");
const {
	GraphQLDate,
	GraphQLTime,
	GraphQLDateTime,
} = require("graphql-iso-date");
const {
	GraphQLID,
	GraphQLString,
	GraphQLBoolean,
	GraphQLList,
	GraphQLSchema,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLInputObjectType,
} = require("graphql");

const consultation = new GraphQLObjectType({
	name: "consultation",
	fields: {
		receiveNew: { type: GraphQLBoolean },
		receiveCancel: { type: GraphQLBoolean },
		receiveNotification: { type: GraphQLBoolean },
		status: { type: GraphQLBoolean },
	},
});

const inputconsultation = new GraphQLInputObjectType({
	name: "inputconsultation",
	fields: {
		receiveNew: { type: GraphQLBoolean },
		receiveCancel: { type: GraphQLBoolean },
		receiveNotification: { type: GraphQLBoolean },
		status: { type: GraphQLBoolean },
	},
});

const treatment = new GraphQLObjectType({
	name: "treatment",
	fields: {
		receiveNew: { type: GraphQLBoolean },
		receiveCancel: { type: GraphQLBoolean },
		receiveNotification1hr: { type: GraphQLBoolean },
		receiveNotification24hr: { type: GraphQLBoolean },
		status: { type: GraphQLBoolean },
	},
});

const inputtreatment = new GraphQLInputObjectType({
	name: "inputtreatment",
	fields: {
		receiveNew: { type: GraphQLBoolean },
		receiveCancel: { type: GraphQLBoolean },
		receiveNotification1hr: { type: GraphQLBoolean },
		receiveNotification24hr: { type: GraphQLBoolean },
		status: { type: GraphQLBoolean },
	},
});

const message = new GraphQLObjectType({
	name: "message",
	fields: {
		receiveNew: { type: GraphQLBoolean },
		status: { type: GraphQLBoolean },
	},
});

const inputmessage = new GraphQLInputObjectType({
	name: "inputmessage",
	fields: {
		receiveNew: { type: GraphQLBoolean },
		status: { type: GraphQLBoolean },
	},
});

const PatientSettings = new GraphQLObjectType({
	name: "settings",
	fields: {
		id: { type: GraphQLID },
		patientid: { type: GraphQLString },
		consultation: { type: new GraphQLList(consultation) },
		treatment: { type: new GraphQLList(treatment) },
		message: { type: new GraphQLList(message) },
	},
});

const rootquery = new GraphQLObjectType({
	name: "Query",
	fields: {
		patientSettings: {
			// name of the query is people by id
			type: new GraphQLList(PatientSettings),
			resolve: (root, args, context, info) => {
				return patientSettingsModel.find().exec();
			},
		},
		patientSettingsByPatientID: {
			// name of the query is people by id
			type: PatientSettings,
			args: {
				// strong validation for graphqlid, which is mendatory for running this query
				patientid: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				// console.log(args);
				return patientSettingsModel
					.findOne({
						patientid: args.patientid,
					})
					.exec();
			},
		},
	},
});

const mutationType = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		patientsetting: {
			type: PatientSettings,
			args: {
				consultation: { type: inputconsultation },
				treatment: { type: inputtreatment },
				message: { type: inputmessage },
				patientid: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				var usm = new patientSettingsModel(args);
				return usm.save();
			},
		},
		update: {
			type: PatientSettings,
			args: {
				patientid: { type: GraphQLString },
				obj: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				var u = patientSettingsModel
					.findOne({ patientid: args.patientid })
					.then((doc) => {
						if (args.obj.includes("consultation")) {
							doc["consultation"][0]["receiveNew"] = JSON.parse(args.obj)[
								"consultation"
							][0]["receiveNew"];
							doc["consultation"][0]["receiveCancel"] = JSON.parse(args.obj)[
								"consultation"
							][0]["receiveCancel"];
							doc["consultation"][0]["receiveNotification"] = JSON.parse(
								args.obj
							)["consultation"][0]["receiveNotification"];
							doc["consultation"][0]["status"] = JSON.parse(args.obj)[
								"consultation"
							][0]["status"];
							return doc;
						} else if (args.obj.includes("treatment")) {
							doc["treatment"][0]["receiveNew"] = JSON.parse(args.obj)[
								"treatment"
							][0]["receiveNew"];
							doc["treatment"][0]["receiveCancel"] = JSON.parse(args.obj)[
								"treatment"
							][0]["receiveCancel"];
							doc["treatment"][0]["receiveNotification1hr"] = JSON.parse(
								args.obj
							)["treatment"][0]["receiveNotification1hr"];
							doc["treatment"][0]["receiveNotification24hr"] = JSON.parse(
								args.obj
							)["treatment"][0]["receiveNotification24hr"];
							doc["treatment"][0]["status"] = JSON.parse(args.obj)[
								"treatment"
							][0]["status"];
							return doc;
						} else if (args.obj.includes("message")) {
							doc["message"][0]["receiveNew"] = JSON.parse(args.obj)[
								"message"
							][0]["receiveNew"];
							doc["message"][0]["status"] = JSON.parse(args.obj)["message"][0][
								"status"
							];
							return doc;
						}
					});
				u.then((value) => {
					value.save();
				});
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: rootquery,
	mutation: mutationType,
});
