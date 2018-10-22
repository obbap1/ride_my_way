const db = require("./database");

const variables = {
  url: process.env.URL || `http://localhost:3000`,
  database: process.env.dbURL,
  jwtExpiry: 30,
  secret: process.env.SECRET
};

db(variables.database);

module.exports = variables;
