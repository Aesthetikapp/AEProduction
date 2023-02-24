const PatientpaymentdetailsModel = require("../models/patientpaymentdetails");
const utils = require("../common/utils");

const {
	GraphQLID,
	GraphQLString,
	GraphQLBoolean,
	GraphQLList,
	GraphQLType,
	GraphQLSchema,
	GraphQLNonNull,
	GraphQLObjectType,
} = require("graphql");

const PatientpaymentdetailsType = new GraphQLObjectType({
	name: "Patientpaymentdetails",
	fields: {
		id: { type: GraphQLID },
		patientid: { type: GraphQLString },
		number: { type: GraphQLString },
		expiry: { type: GraphQLString },
		cardtype: { type: GraphQLString },
		billingzipcode: { type: GraphQLString },
		name: { type: GraphQLString },
		isdefault: { type: GraphQLBoolean },
		isactive: { type: GraphQLBoolean },
	},
});

const rootquery = new GraphQLObjectType({
	name: "Query",
	fields: {
		// Query 1

		// name of the query, people
		patientpaymentdetails: {
			// the type of response this query will return, here PatientpaymentType
			type: new GraphQLList(PatientpaymentdetailsType),
			// resolver is required
			resolve: (root, args, context, info) => {
				// we are returning all persons available in the table in mongodb
				return PatientpaymentdetailsModel.find().exec();
			},
		},
		// Query 2
		patientpaymentdetailsByID: {
			// name of the query is people by id
			type: PatientpaymentdetailsType,
			args: {
				// strong validation for graphqlid, which is mendatory for running this query
				id: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve: (root, args, context, info) => {
				return PatientpaymentdetailsModel.find({
					id: args.id,
					isactive: true,
				}).exec();
			},
		},
		// Query 3
		patientpaymentdetailsByPatientID: {
			type: new GraphQLList(PatientpaymentdetailsType),
			args: {
				patientid: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				return PatientpaymentdetailsModel.find({
					patientid: args.patientid,
					isactive: true,
				}).exec();
			},
		},
	},
});

const mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		patientpaymentdetails: {
			type: PatientpaymentdetailsType,
			args: {
				id: { type: GraphQLID },
				patientid: { type: GraphQLString },
				number: { type: GraphQLString },
				expiry: { type: GraphQLString },
				cardtype: { type: GraphQLString },
				billingzipcode: { type: GraphQLString },
				name: { type: GraphQLString },
				isdefault: { type: GraphQLBoolean },
				isactive: { type: GraphQLBoolean },
			},
			resolve: (root, args, context, info) => {
				var people = new PatientpaymentdetailsModel(args);
				return people.save();
			},
		},
		update: {
			type: PatientpaymentdetailsType,
			args: {
				id: { type: GraphQLID },
				obj: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				var u = PatientpaymentdetailsModel.findById(
					args.id,
					function (err, patientpaymentdetails) {
						const obj = JSON.parse(args.obj);
						patientpaymentdetails = utils.getPatientPaymentDetails(
							patientpaymentdetails,
							obj
						);

						patientpaymentdetails.save();
						return patientpaymentdetails;
					}
				);
			},
		},
		updateByPatientid: {
			type: PatientpaymentdetailsType,
			args: {
				patientid: { type: GraphQLString },
				obj: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				var u = PatientpaymentdetailsModel.find(
					{
						patientid: args.patientid,
					},
					function (err, patientpaymentdetails) {
						const obj = JSON.parse(args.obj);
						// console.log("obj", u);
						patientpaymentdetails = utils.getPatientPaymentDetails(
							patientpaymentdetails,
							obj
						);

						patientpaymentdetails.save();
						return patientpaymentdetails;
					}
				);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: rootquery,
	mutation: mutation,
});
