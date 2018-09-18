const API_BASE = "/api";
// REQUIRING ROUTES
const postAdmin = require("./admin/post.js");
const postAuth = require("./auth/post.js");
const postDatasetType = require("./datasetType/post");
const postProject = require("./project/post");

module.exports = function(app) {
  // ROUTES
  app.use(API_BASE + "/post-admin", postAdmin);
  app.use(API_BASE + "/post-auth", postAuth);
  app.use(API_BASE + "/post-datasettype", postDatasetType);
  app.use(API_BASE + "/post-project", postProject);
};
