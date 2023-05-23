const AppnotificationModel = require("../models/appnotification");
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

const AppnotificationType = new GraphQLObjectType({
	name: "Appnotification",
	fields: {
		id: { type: GraphQLID },
		appointmentid: { type: GraphQLString },
		patientid: { type: GraphQLString },
		doctorid: { type: GraphQLString },
		date: { type: GraphQLString },
		time: { type: GraphQLString },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		deeplink: { type: GraphQLString },
		kind: { type: GraphQLString },
		isopened: { type: GraphQLBoolean },
	},
});

const rootquery = new GraphQLObjectType({
	name: "Query",
	fields: {
		// Query 1

		// name of the query, people
		appnotification: {
			// the type of response this query will return, here AppnotificationType
			type: new GraphQLList(AppnotificationType),
			// resolver is required
			resolve: (root, args, context, info) => {
				// we are returning all persons available in the table in mongodb
				return AppnotificationModel.find().exec();
			},
		},
		// Query 2
		appnotificationByID: {
			// name of the query is people by id
			type: AppnotificationType,
			args: {
				// strong validation for graphqlid, which is mendatory for running this query
				id: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve: (root, args, context, info) => {
				return AppnotificationModel.findById(args.id).exec();
			},
		},
		// Query 3
		appnotificationByPatientid: {
			type: new GraphQLList(AppnotificationType),
			args: {
				patientid: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				return AppnotificationModel.find({ patientid: args.patientid }).exec();
			},
		},

		appnotificationByDoctorid: {
			type: new GraphQLList(AppnotificationType),
			args: {
				doctorid: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				return AppnotificationModel.find({ doctorid: args.doctorid }).exec();
			},
		},

		appnotificationByAppointmentid: {
			type: new GraphQLList(AppnotificationType),
			args: {
				appointmentid: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				return AppnotificationModel.find({
					appointmentid: args.appointmentid,
				}).exec();
			},
		},
		// notificationByKindandStatus: {
		// 	type: new GraphQLList(AppnotificationType),
		// 	args: {
		// 		kind: { type: GraphQLString },
		// 		status: { type: GraphQLString },
		// 		adminid: { type: GraphQLString },
		// 	},
		// 	resolve: (root, args, context, info) => {
		// 		return AppnotificationModel.find({
		// 			kind: args.kind,
		// 			status: args.status,
		// 			adminid: args.adminid,
		// 		}).exec();
		// 	},
		// },
	},
});

const mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		notification: {
			type: AppnotificationType,
			args: {
				appointmentid: { type: GraphQLString },
				patientid: { type: GraphQLString },
				doctorid: { type: GraphQLString },
				date: { type: GraphQLString },
				time: { type: GraphQLString },
				title: { type: GraphQLString },
				description: { type: GraphQLString },
				deeplink: { type: GraphQLString },
				kind: { type: GraphQLString },
				isopened: { type: GraphQLBoolean },
			},
			resolve: (root, args, context, info) => {
				var people = new AppnotificationModel(args);
				return people.save();
			},
		},
		update: {
			type: AppnotificationType,
			args: {
				id: { type: GraphQLID },
				obj: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				var u = AppnotificationModel.findById(
					args.id,
					function (err, notification) {
						const obj = JSON.parse(args.obj);
						notification = utils.getNotification(notification, obj);

						notification.save();
						return notification;
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
