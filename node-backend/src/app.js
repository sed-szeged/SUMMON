const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
// docker: mongodb://mongodb/oscd"
// dev: mongodb://localhost:27017/oscd
mongoose.connect("mongodb://localhost:27017/oscd", { useNewUrlParser: true })
  .then(() => {
    console.log("Mongodb connected...")
  })
  .catch(err => {
    console.log("Mongodb error... ", err.stack)
    process.exit(1)
  })

//const todoListRoutes = require("./routes/todoListRoutes")
//app.use("/todo", todoListRoutes);

app.use(express.static("public"))
console.log("it works 0")
console.log("it works 1")
console.log("it works 1")

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ ok: "ok" })
})

module.exports = app;
