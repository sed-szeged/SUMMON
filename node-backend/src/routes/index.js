const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//const obj = require("./path/to/route")

// REQUIRING ROUTES
const API_BASE = "/api";
const postAdmin = require("./admin/post.js");

module.exports = function(app) {
  app.use(cors());
  app.use(express.static("public"));
  // Body Parser Middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  //Body Parser
  app.use(bodyParser.json());
  app.use(express.json());

  // ROUTES
  app.use(API_BASE + "/post-admin", postAdmin);
};
