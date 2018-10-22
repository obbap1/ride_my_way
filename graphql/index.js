const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLSchema,
  GraphQLID
} = require("graphql");

const queryType = require("./queries/user").queryType;
const mutation = require("./mutation/index").signUp;

const userSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutation
});

module.exports = {
  userSchema
};
