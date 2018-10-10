const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const Admin = require("../../models/Admin").Admin;

module.exports = insertAdmin = admin => {
  if (admin.password !== admin.confirmPassword) {
    console.log("password didnt match");
  } else {
    const conn = mongoose
      .connect(
        process.env.MONGO_CONNECTION,
        { useNewUrlParser: true }
      )
      .then(err => {
        if (err) {
          console.log("Error connecting to db");
        } else {
          bcrypt.hash(admin.password, salt, (err, hash) => {
            mongoose.connection("admins").insertOne({
              name: admin.name,
              email: admin.email,
              password: hash,
              isSuperUser: true
            });
            const newAdmin = new Admin({
              name: admin.name,
              email: admin.email,
              password: hash,
              isSuperUser: true
            });
            newAdmin.save().then(savedAdmin => {
              console.log(
                "New admin " +
                  savedAdmin.name +
                  " " +
                  savedAdmin.email +
                  " was saved."
              );
            });
          });
        }
      });
  }
};
