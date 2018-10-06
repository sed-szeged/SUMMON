module.exports = function(app, gfs) {
  const gridFSRouter = require("../../routes/gridfsRouter").gridFSRouter(
    gfs
    //,require("../gridfs/gridfsUpload").upload(gfs)
  );
  app.use("/api/gridfs", gridFSRouter);
};
