const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLList
} = require("graphql");
const User = require("../../app/models/user");
const userType = require("../types/user").userType;

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => {
    return {
      signup: {
        type: new GraphQLList(GraphQLString),
        resolve: () => {
          const users = User.find().exec();
          if (!users) throw new Error("Error");
          return users;
        }
      }
    };
  }
});

module.exports = {
  queryType
};
