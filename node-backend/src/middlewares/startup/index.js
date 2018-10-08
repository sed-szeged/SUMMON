const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const cron = require("../cron/index");

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
  app.use(bodyParser.json({ limit: "1024mb" }));
  app.use(express.json());
};
