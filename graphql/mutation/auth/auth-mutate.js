const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLList
} = require("graphql");
const userType = require("../../types/user");
const User = require("../../../app/models/user");
const validator = require("validator");

const mutation = new GraphQLObjectType({
  name:"Mutation",
  fields: () =>{
    return {
      signup: {
        type:  new GraphQLList(GraphQLString),
        args: {
          email: {
            name:"email",
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            name:"password",
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
          let errors = [];
      
          let regex = /(\w+)(([-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]+\d+)|(\d+[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]+))/;

          if (!validator.isEmail(params.email))
            errors.push({ key: "email", message: "Invalid Email" });
          else if (!validator.isLength(params.password, { min: 6 }))
            errors.push({
              key: "password",
              message: "Password must be at least 6 characters"
            });
          else if (!validator.isLength(params.password, { min: 6 }))
            errors.push({
              key: "password",
              message: "Password must be at least 6 characters"
            });
          /*else if (!regex.test(params.password))
            errors.push({
              key: "password",
              message: "password must contain a special character and a number"
            });*/
      
          if (errors.length > 0) {
            console.log('errors',errors);
            return errors;
          }
      
          const newUser = new User(params);
          console.log("new user!", newUser, "params", params, "root", root);
      
          newUser.save((err, user) => {
            if (err) throw new Error("Network Timeout");
            console.log('user',user,typeof user);
            return JSON.stringify(user);
          });
        }
      }
    };
  }
    
});

module.exports = {
  mutation
};
  