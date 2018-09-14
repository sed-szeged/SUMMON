// REQUIRING ROUTES
const API_BASE = "/api";
const postAdmin = require("./admin/post.js");
const postAuth = require("./auth/post.js");

module.exports = function(app) {
  // ROUTES
  app.use(API_BASE + "/post-admin", postAdmin);

  app.use(API_BASE + "/post-auth", postAuth);
};
