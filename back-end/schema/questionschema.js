const QuestionModel = require("../models/question");
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
	GraphQLInt,
	GraphQLInputObjectType,
} = require("graphql");

const QuestionType = new GraphQLObjectType({
	name: "questions",
	fields: {
		id: { type: GraphQLID },
		question: { type: GraphQLString },
		kind: { type: GraphQLString },
		order: { type: GraphQLInt },
		childquestionid: { type: GraphQLString },
		isrequired: { type: GraphQLBoolean },
		answer: { type: GraphQLString },
	},
});

const rootquery = new GraphQLObjectType({
	name: "Query",
	fields: {
		questions: {
			// the type of response this query will return, here PersonType
			type: new GraphQLList(QuestionType),
			// resolver is required
			resolve: (root, args, context, info) => {
				// we are returning all persons available in the table in mongodb
				return QuestionModel.find().exec();
			},
		},
		questionsByID: {
			// name of the query is people by id
			type: QuestionType,
			args: {
				// strong validation for graphqlid, which is mendatory for running this query
				id: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve: (root, args, context, info) => {
				return QuestionModel.findById(args.id);
			},
		},
	},
});

const mutationType = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		questions: {
			type: QuestionType,
			args: {
				id: { type: GraphQLID },
				question: { type: GraphQLString },
				order: { type: GraphQLInt },
				kind: { type: GraphQLString },
				childquestionid: { type: GraphQLString },
				isrequired: { type: GraphQLBoolean },
				answer: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				var questions = new QuestionModel(args);
				return questions.save();
			},
		},
		update: {
			type: QuestionType,
			args: {
				id: { type: GraphQLID },
				obj: { type: GraphQLString },
			},
			resolve: (root, args, context, info) => {
				const obj = JSON.parse(args.obj);
				// console.log(obj);
				//user = utils.getUser(user, obj);
				const m = QuestionModel.findOneAndUpdate({ _id: args.id }, obj);
				console.log("obj", obj);
				// const m = QuestionModel.insert(obj);
				return m;
			},
		},
		delete: {
			type: QuestionType,
			args: {
				id: { type: GraphQLID },
			},
			resolve(parent, args) {
				// console.log("3", args.id);
				return QuestionModel.findByIdAndDelete(args.id);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: rootquery,
	mutation: mutationType,
});
