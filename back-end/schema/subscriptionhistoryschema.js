const SubscriptionhistoryModel = require("../models/subscriptionhistory");
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

const SubscriptionhistoryType = new GraphQLObjectType({
	name: "subscriptionhistory",
	fields: {
		id: { type: GraphQLID },
		paymentstatus: { type: GraphQLString },
		doctorid: { type: GraphQLString },
		enddate: { type: GraphQLString },
		startdate: { type: GraphQLString },
		amount: { type: GraphQLString },
		planname: { type: GraphQLString },
		planid: { type: GraphQLString },
		transactionid: { type: GraphQLString },
	},
});

const rootquery = new GraphQLObjectType({
	name: "Query",
	fields: {
		// Query 1

		// name of the query, people
		subscriptionhistory: {
			// the type of response this query will return, here SubscriptionhistoryType
			type: new GraphQLList(SubscriptionhistoryType),
			// resolver is required
			resolve: (root, args, context, info) => {
				// we are returning all persons available in the table in mongodb
				return SubscriptionhistoryModel.find().exec();
			},
		},
		// Query 2
		subscriptionhistoryByID: {
			// name of the query is people by id
			type: SubscriptionhistoryType,
			args: {
				// strong validation for graphqlid, which is mendatory for running this query
				id: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve: (root, args, context, info) => {
				return SubscriptionhistoryModel.findById(args.id).exec();
			},
		},

		subscriptionhistoryByDoctorid: {
			type: new GraphQLList(SubscriptionhistoryType),
			args: {
				doctorid: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				return SubscriptionhistoryModel.find({
					doctorid: args.doctorid,
				}).exec();
			},
		},

		subscriptionhistoryByDoctoridSuccess: {
			type: new GraphQLList(SubscriptionhistoryType),
			args: {
				doctorid: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				return SubscriptionhistoryModel.find({
					doctorid: args.doctorid,
					paymentstatus: "success",
				}).exec();
			},
		},
	},
});

const mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		subscriptionhistory: {
			type: SubscriptionhistoryType,
			args: {
				id: { type: GraphQLID },
				paymentstatus: { type: GraphQLString },
				doctorid: { type: GraphQLString },
				enddate: { type: GraphQLString },
				amount: { type: GraphQLString },
				startdate: { type: GraphQLString },
				planname: { type: GraphQLString },
				planid: { type: GraphQLString },
				transactionid: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				var people = new SubscriptionhistoryModel(args);
				return people.save();
			},
		},
		update: {
			type: SubscriptionhistoryType,
			args: {
				id: { type: GraphQLID },
				obj: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				var u = SubscriptionhistoryModel.findById(
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
		updateByTransactionid: {
			type: SubscriptionhistoryType,
			args: {
				id: { type: GraphQLID },
				obj: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				const obj = JSON.parse(args.obj);
				const m = SubscriptionhistoryModel.findOneAndUpdate(
					{ transactionid: args.id },
					obj
				);
				console.log("obj", obj);

				return m;
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: rootquery,
	mutation: mutation,
});
