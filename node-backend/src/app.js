const express = require("express");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

const app = express();

// Calls all the middlewares
require("./middlewares/startup/index")(app);

const BUCKET_NAME = "gridfs_uploads";

// docker: mongodb://mongodb/oscd"
mongoose
  .connect(
    process.env.MONGO_CONNECTION,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Mongodb connected...");
    // Connecting with GridFS
    let gfs;
    const connection = mongoose.createConnection(process.env.MONGO_CONNECTION);
    connection.once("open", () => {
      // Init stream
      gfs = Grid(connection.db, mongoose.mongo).collection(BUCKET_NAME);
      require("./middlewares/startup/gridfs.js")(app, gfs);
      console.log("Mongodb GridFS connected...");
    });
  })
  .catch(err => {
    console.log("Mongodb error... ", err.stack);
    process.exit(1);
  });

// Calls all the routes
require("./routes/index")(app);

module.exports = app;
