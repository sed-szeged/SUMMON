const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Calls all the middlewares
require("./middlewares/startup/index")(app);

// docker: mongodb://mongodb/oscd"
mongoose
  .connect(
    process.env.MONGO_CONNECTION,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Mongodb connected...");
  })
  .catch(err => {
    console.log("Mongodb error... ", err.stack);
    process.exit(1);
  });

// Calls all the routes
require("./routes/index")(app);

module.exports = app;
