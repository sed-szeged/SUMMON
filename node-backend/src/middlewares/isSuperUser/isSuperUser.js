module.exports = function(req, res, next) {
  //i7 it should be called after authorization then req.user is set 403 forbidden [auth, ]
  if (!req.admin.isSuperUser) return res.status(403).send("Access denied");
  next();
};
