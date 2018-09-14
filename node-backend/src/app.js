const express = require("express");
const mongoose = require("mongoose");

const app = express();

// docker: mongodb://mongodb/oscd"
// dev: mongodb://localhost:27017/oscd
mongoose
  .connect(
    "mongodb://mongodb/oscd",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Mongodb connected...");
  })
  .catch(err => {
    console.log("Mongodb error... ", err.stack);
    process.exit(1);
  });

// Calls all the middlewares
require("./middlewares/startup/index")(app);

// Calls all the routes
require("./routes/index")(app);

module.exports = app;
