const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

module.exports = function(app) {
  app.use(cors());
  // Passport
  app.use(passport.initialize());
  // Passport Strategy
  require("../passport/passportMiddleware")(passport);
  app.use(express.static("public"));
  // Body Parser Middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  //Body Parser
  app.use(bodyParser.json());
  app.use(express.json());
};
