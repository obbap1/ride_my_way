const express = require("express");
const { ApolloServer, gql } = require("apollo-server");
const router = express.Router();

const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Config = require("../../config/index");
const User = require("../models/user");

const app = express();

const ComparePasswords = (saved_password, entered_password) => {
  return bcrypt.compareSync(entered_password, saved_password);
};

const HashPassword = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

const generateJWTToken = user => {
  const payload = {
    _id: user._id,
    email: user.email,
    imageURL: user.imageURL
  };

  const token = jwt.sign(payload, Config.variables.secret, {
    expiresIn: Config.variables.jwtExpiry * 60 * 60
  });

  return {
    profile: payload,
    token: token
  };
};

const typeDefs = gql`
  input signUpInput {
    email: String
    password: String
  }

  type User {
    email: String
    password: String
  }
  type Query {
    signUp(input: signUpInput): User
  }
`;

class User {
  constructor({ input }) {
    this.email = input.email;
    this.password = input.password;
  }
}

const resolvers = {
  signUp: ({ input }) => {
    const email = req.body.email;
    const password = req.body.password;

    req
      .checkBody("email", "Invalid Email")
      .notEmpty()
      .isEmail();
    req
      .checkBody(
        "password",
        `It must be at least 6 characters and it 
            must include a character and a number`
      )
      .notEmpty()
      .isLength({
        min: 6
      })
      .matches(
        /(\w+)(([-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]+\d+)|(\d+[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]+))/
      );

    const errors = req.validationErrors();

    if (errors) return res.status(401).json(errors);

    const user = new User({
      email: email,
      accessKey: HashPassword(password)
    });

    user.save((err, data) => {
      if (err) return res.status(501).send("Time out");
    });
  },

  hello: () => {
    return "hello world";
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app, path: "/signup" });

console.log("server path", server.graphqlPath);

module.exports = router;
