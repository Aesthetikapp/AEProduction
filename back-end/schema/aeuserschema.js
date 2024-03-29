const UserModel = require("../models/aeuser");
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

const businesslocation = new GraphQLObjectType({
	name: "businesslocation",
	fields: {
		id: { type: GraphQLID },
		line1: { type: GraphQLString },
		line2: { type: GraphQLString },
		towncity: { type: GraphQLString },
		postcode: { type: GraphQLString },
		state: { type: GraphQLString },
		country: { type: GraphQLString },
	},
});

const inputbusinesslocation = new GraphQLInputObjectType({
	name: "inputbusinesslocation",
	fields: {
		line1: { type: GraphQLString },
		line2: { type: GraphQLString },
		towncity: { type: GraphQLString },
		postcode: { type: GraphQLString },
		state: { type: GraphQLString },
		country: { type: GraphQLString },
	},
});

const business = new GraphQLObjectType({
	name: "bussiness",
	fields: {
		id: { type: GraphQLID },
		btype: { type: GraphQLString },
		name: { type: GraphQLString },
		bio: { type: GraphQLString },
		location: { type: new GraphQLList(businesslocation) },
		website: { type: GraphQLString },
		bavatar: { type: GraphQLString },
		noofemployees: { type: GraphQLString },
	},
});

const inputbusiness = new GraphQLInputObjectType({
	name: "inputbusiness",
	fields: {
		btype: { type: GraphQLString },
		name: { type: GraphQLString },
		bio: { type: GraphQLString },
		location: { type: new GraphQLList(inputbusinesslocation) },
		website: { type: GraphQLString },
		bavatar: { type: GraphQLString },
		noofemployees: { type: GraphQLString },
	},
});

const verification = new GraphQLObjectType({
	name: "verification",
	fields: {
		id: { type: GraphQLID },
		idv: { type: new GraphQLList(GraphQLString) },
		ml: { type: new GraphQLList(GraphQLString) },
		od: { type: new GraphQLList(GraphQLString) },
		mi: { type: new GraphQLList(GraphQLString) },
		ev: { type: new GraphQLList(GraphQLString) },
	},
});

const inputverification = new GraphQLInputObjectType({
	name: "inputverification",
	fields: {
		idv: { type: new GraphQLList(GraphQLString) },
		ml: { type: new GraphQLList(GraphQLString) },
		od: { type: new GraphQLList(GraphQLString) },
		mi: { type: new GraphQLList(GraphQLString) },
		ev: { type: new GraphQLList(GraphQLString) },
	},
});

const UserType = new GraphQLObjectType({
	name: "aeuser",
	fields: {
		id: { type: GraphQLID },
		email: { type: GraphQLString },
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		sumsubstatus: { type: GraphQLString },
		primaryTelephone: { type: GraphQLString },
		countryCode: { type: GraphQLString },
		clinicname: { type: GraphQLString },
		business: { type: new GraphQLList(business) },
		gender: { type: GraphQLString },
		avatar: { type: GraphQLString },
		notifyme: { type: GraphQLBoolean },
		dob: { type: GraphQLDate },
		bio1: { type: GraphQLString },
		channelid: { type: GraphQLString },
		verification: { type: new GraphQLList(verification) },
		stripeaccount: { type: GraphQLString },
		plan: { type: GraphQLString },
		source: { type: GraphQLString },
		isadmin: { type: GraphQLBoolean },
		complete: { type: GraphQLString },
		loginthrough: { type: GraphQLString },
		currentstep: { type: GraphQLString },
		entered: { type: GraphQLString },
		createdate: { type: GraphQLDate },
		updatedate: { type: GraphQLDate },
		stripestatus: { type: GraphQLString },
		updateuser: { type: GraphQLString },
		password: { type: GraphQLString },
	},
});

const rootquery = new GraphQLObjectType({
	name: "Query",
	fields: {
		// Query 1

		// name of the query, people
		user: {
			// the type of response this query will return, here PersonType
			type: new GraphQLList(UserType),
			// resolver is required
			resolve: (root, args, context, info) => {
				// we are returning all persons available in the table in mongodb
				return UserModel.find().exec();
			},
		},
		// Query 2
		userByID: {
			// name of the query is people by id
			type: UserType,
			args: {
				// strong validation for graphqlid, which is mendatory for running this query
				id: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve: (root, args, context, info) => {
				return UserModel.findById(args.id);
			},
		},
		// Query 2
		userByAdmin: {
			// name of the query is people by id
			type: new GraphQLList(UserType),
			args: {
				// strong validation for graphqlid, which is mendatory for running this query
				isadmin: { type: GraphQLBoolean },
			},
			resolve: (root, args, context, info) => {
				// console.log(args.isadmin);
				return UserModel.find({
					isadmin: args.isadmin,
					complete: "complete",
				}).exec();
			},
		},
		// Query 3
		userByName: {
			type: new GraphQLList(UserType),
			args: {
				firstName: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				return UserModel.find({ firstName: args.firstName }).exec();
			},
		},
		usersByClinicName: {
			type: new GraphQLList(UserType),
			args: {
				clinicname: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				return UserModel.find({
					clinicname: args.clinicname,
					complete: "complete",
				}).exec();
			},
		},
		userByEmail: {
			type: new GraphQLList(UserType),
			args: {
				email: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				return UserModel.find({
					email: { $regex: "^" + args.email, $options: "i" },
				}).exec();
			},
		},
		userByPhone: {
			type: new GraphQLList(UserType),
			args: {
				phone: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				return UserModel.find({
					primaryTelephone: args.phone,
				}).exec();
			},
		},
		deleteUser: {
			type: UserType,
			args: {
				id: { type: GraphQLID },
			},
			resolve(parent, args) {
				// console.log("3", args.id);
				return UserModel.findByIdAndDelete(args.id);
			},
		},
		comparePassword: {
			type: new GraphQLList(UserType),
			args: {
				pwd: { type: GraphQLString },
				hashpwd: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				let rs = utils.comparePassword(args.pwd, args.hashpwd);
				var user = new UserModel();
				user.password = rs.toString();
				return [user];
			},
		},
		// name of the query, people
		assignedusers: {
			// the type of response this query will return, here PersonType
			type: new GraphQLList(UserType),
			args: {
				doctors: { type: GraphQLString },
			},
			// resolver is required
			resolve: (root, args, context, info) => {
				// we are returning all persons available in the table in mongodb
				return UserModel.find({ _id: args.doctors }).exec();
			},
		},
		usersBySearchName: {
			// name of the query is people by id
			type: new GraphQLList(UserType),
			args: {
				// strong validation for graphqlid, which is mendatory for running this query
				search: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				// console.log(args.search);
				return UserModel.find({
					$or: [
						{ firstName: { $regex: "^" + args.search, $options: "i" } },
						{ lastName: { $regex: "^" + args.search, $options: "i" } },
						// { clinicname: { $regex: "^" + args.search, $options: "i" } },
						// { userName: { $regex: args.search, $options: "i" } },
					],
					// $group: [
					// 	{
					// 		$group: {
					// 			_id: { treatmentname: "$treatmentname" },
					// 		},
					// 	},
					// ],
				}).exec();
			},
		},
		usersBySearchClinicName: {
			// name of the query is people by id
			type: new GraphQLList(UserType),
			args: {
				// strong validation for graphqlid, which is mendatory for running this query
				search: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				// console.log(args.search);
				return UserModel.find({
					$or: [
						// { firstName: { $regex: "^" + args.search, $options: "i" } },
						// { lastName: { $regex: "^" + args.search, $options: "i" } },
						{ clinicname: { $regex: "^" + args.search, $options: "i" } },
						// { userName: { $regex: args.search, $options: "i" } },
					],
					$and: [
						{
							isadmin: true,
							complete: "complete",
						},
					],
					// $group: [
					// 	{
					// 		$group: {
					// 			_id: { treatmentname: "$treatmentname" },
					// 		},
					// 	},
					// ],
				}).exec();
			},
		},
		usersBySearchLocation: {
			// name of the query is people by id
			type: new GraphQLList(UserType),
			args: {
				// strong validation for graphqlid, which is mendatory for running this query
				search: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				// console.log(args.search);
				return UserModel.find({
					$or: [
						// { firstName: { $regex: "^" + args.search, $options: "i" } },
						// { lastName: { $regex: "^" + args.search, $options: "i" } },
						{
							"business.location.towncity": {
								$regex: "^" + args.search,
								$options: "i",
							},
						},
						// { userName: { $regex: args.search, $options: "i" } },
					],
					$and: [
						{
							// isadmin: true,
							complete: "complete",
						},
					],
					// $group: [
					// 	{
					// 		$group: {
					// 			_id: { treatmentname: "$treatmentname" },
					// 		},
					// 	},
					// ],
				}).exec();
			},
		},
	},
});

const mutationType = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		user: {
			type: UserType,
			args: {
				email: { type: GraphQLString },
				firstName: { type: GraphQLString },
				lastName: { type: GraphQLString },
				sumsubstatus: { type: GraphQLString },
				primaryTelephone: { type: GraphQLString },
				countryCode: { type: GraphQLString },
				clinicname: { type: GraphQLString },
				business: { type: inputbusiness },
				gender: { type: GraphQLString },
				avatar: { type: GraphQLString },
				notifyme: { type: GraphQLBoolean },
				dob: { type: GraphQLDate },
				bio1: { type: GraphQLString },
				channelid: { type: GraphQLString },
				verification: { type: inputverification },
				stripeaccount: { type: GraphQLString },
				plan: { type: GraphQLString },
				source: { type: GraphQLString },
				isadmin: { type: GraphQLBoolean },
				complete: { type: GraphQLString },
				loginthrough: { type: GraphQLString },
				currentstep: { type: GraphQLString },
				entered: { type: GraphQLString },
				createdate: { type: GraphQLDate },
				updatedate: { type: GraphQLDate },
				stripestatus: { type: GraphQLString },
				updateuser: { type: GraphQLString },
				password: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				args.password = utils.getHashData(args.password);
				var user = new UserModel(args);
				return user.save();
			},
		},
		update: {
			type: UserType,
			args: {
				id: { type: GraphQLID },
				obj: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				UserModel.findById(args.id, function (err, user) {
					const obj = JSON.parse(args.obj);
					if (obj["password"]) {
						obj["password"] = utils.getHashData(obj["password"]);
					}
					user = utils.getUser(user, obj);
					// console.log(user);
					if (utils.keyExists("business", obj)) {
						user.markModified("business");
						user.markModified("location");
					}
					if (utils.keyExists("verification", obj)) {
						user.markModified("verification");
						user.markModified("idv");
						user.markModified("ml");
						user.markModified("od");
						user.markModified("mi");
						user.markModified("ev");
					}
					user.save();
					return user;
				});
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: rootquery,
	mutation: mutationType,
});
