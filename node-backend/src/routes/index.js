const API_BASE = "/api";
// REQUIRING ROUTES
const postAdmin = require("./admin/post.js");
const postAuth = require("./auth/post.js");
const postDatasetType = require("./datasetType/post");
const getDatasetType = require("./datasetType/get");
const postProject = require("./project/post");
const getProject = require("./project/get");
const putProject = require("./project/put");
const postDataset = require("./dataset/post");
const getDataset = require("./dataset/get");
const putDataset = require("./dataset/put");

module.exports = function(app) {
  // ROUTES
  app.use(API_BASE + "/post-admin", postAdmin);
  app.use(API_BASE + "/post-auth", postAuth);
  app.use(API_BASE + "/post-datasettype", postDatasetType);
  app.use(API_BASE + "/get-datasettype", getDatasetType);
  app.use(API_BASE + "/post-project", postProject);
  app.use(API_BASE + "/get-project", getProject);
  app.use(API_BASE + "/put-project", putProject);
  app.use(API_BASE + "/post-dataset", postDataset);
  app.use(API_BASE + "/get-dataset", getDataset);
  app.use(API_BASE + "/put-dataset", putDataset);
};
