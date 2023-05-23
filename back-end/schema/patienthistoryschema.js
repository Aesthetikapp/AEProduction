const PatienthistoryModel = require("../models/patienthistory");
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

const PatienthistoryType = new GraphQLObjectType({
	name: "patienthistory",
	fields: {
		id: { type: GraphQLID },
		patientid: { type: GraphQLString },
		sign1: { type: GraphQLString },
		sign2: { type: GraphQLString },
		answers: { type: GraphQLString },
		updateddate: { type: GraphQLString },
		createdddate: { type: GraphQLString },
	},
});

const rootquery = new GraphQLObjectType({
	name: "Query",
	fields: {
		patienthistory: {
			// the type of response this query will return, here PersonType
			type: new GraphQLList(PatienthistoryType),
			// resolver is required
			resolve: (root, args, context, info) => {
				// we are returning all persons available in the table in mongodb
				return PatienthistoryModel.find().exec();
			},
		},
		patienthistoryByID: {
			// name of the query is people by id
			type: PatienthistoryType,
			args: {
				// strong validation for graphqlid, which is mendatory for running this query
				id: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve: (root, args, context, info) => {
				return PatienthistoryModel.findById(args.id);
			},
		},
		patienthistorybypatientid: {
			type: new GraphQLList(PatienthistoryType),
			args: {
				patientid: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				return PatienthistoryModel.find({ patientid: args.patientid }).exec();
			},
		},
	},
});

const mutationType = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		patienthistory: {
			type: PatienthistoryType,
			args: {
				id: { type: GraphQLID },
				patientid: { type: GraphQLString },
				sign1: { type: GraphQLString },
				sign2: { type: GraphQLString },
				answers: { type: GraphQLString },
				updateddate: { type: GraphQLString },
				createdddate: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				var patienthistory = new PatienthistoryModel(args);
				return patienthistory.save();
			},
		},
		update: {
			type: PatienthistoryType,
			args: {
				id: { type: GraphQLID },
				obj: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				const obj = JSON.parse(args.obj);
				// console.log(obj);
				//user = utils.getUser(user, obj);
				const m = PatienthistoryModel.findOneAndUpdate({ _id: args.id }, obj);
				return m;
			},
		},
		deletepatienthistory: {
			type: PatienthistoryType,
			args: {
				id: { type: GraphQLID },
			},
			resolve(parent, args) {
				// console.log("3", args.id);
				return PatienthistoryModel.findByIdAndDelete(args.id);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: rootquery,
	mutation: mutationType,
});
