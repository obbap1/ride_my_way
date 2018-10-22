const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID
} = require("graphql");

const userType = new GraphQLObjectType({
  name: "user",
  fields: () => {
    return {
      email: {
        type: new GraphQLNonNull(GraphQLString)
      },
      password: {
        type: new GraphQLNonNull(GraphQLString)
      }
    };
  }
});

module.exports = {
  userType
};
