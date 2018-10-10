#!/usr/bin/env node

const insertAdmin = require("./insertAdmin");
const validateAdmin = require("../../models/Admin").validateAdmin;
const errorToJson = require("../../models/helpers/errorToJson");

// Grab args
const [, , ...args] = process.argv;

if (args.length < 3) {
  console.log(
    new Error(
      "You must provide a name, an email address and a password 'npm run createAdmin <name> <email> <password>' "
    )
  );
} else {
  const { error } = validateAdmin({
    name: args[0],
    email: args[1],
    password: args[2],
    confirmPassword: args[2],
    isSuperUser: true
  });
  if (error) {
    console.log(errorToJson(error));
    console.log(
      new Error(
        "Invalid parameters 'npm run createAdmin <name> <email> <password>'"
      )
    );
  } else {
    insertAdmin({
      name: args[0],
      email: args[1],
      password: args[2],
      confirmPassword: args[2],
      isSuperUser: true
    });
  }
}
