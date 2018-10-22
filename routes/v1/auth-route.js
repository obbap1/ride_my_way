var express = require("express");

const app = express();

const signupSchema = require("../../graphql/index").userSchema;
const graphqlHTTP = require("express-graphql");

/* GET home page. */

app.use(
  "/signup",
  graphqlHTTP({
    schema: signupSchema,
    graphiql: true
  })
);

module.exports = app;
