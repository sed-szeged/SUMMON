const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const errorMiddleware = require("../../middlewares/error/errorMiddleWare");
const errorToJson = require("../../models/helpers/errorToJson");
const errorMsg = require("../../config/constants/errors");
const successMsg = require("../../config/constants/success");

// MODELS
const Admin = require("../../models/Admin").Admin;

// FUNCTIONS
const validateAdmin = require("../../models/Admin").validateAdmin;

// @route POST /api/post-admin/
// @desc Inserting new admin into the database
// Private - SuperUser
router.post(
  "/",
  errorMiddleware(async (req, res) => {
    const { error } = validateAdmin(req.body);
    if (error) {
      return res.status(400).send(errorToJson(error));
    } else {
      const admin = await Admin.findOne({ email: req.body.email });
      if (admin) {
        return res.status(400).send(errorMsg.ADMIN_ALREADY_EXISTS_ERROR);
      } else {
        if (req.body.password !== req.body.confirmPassword) {
          return res
            .status(400)
            .send({ password: errorMsg.PASSWORD_CONFIRM_ERROR });
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashed = await bcrypt.hash(req.body.password, salt);
          const newAdmin = new Admin({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isSuperUser: req.body.isSuperUser
          });
          newAdmin.password = hashed;
          const savedAdmin = await newAdmin.save();
          return res.send(
            savedAdmin.name + " " + savedAdmin.email + successMsg.WAS_SAVED
          );
        }
      }
    }
  })
);

module.exports = router;
