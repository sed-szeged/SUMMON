const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const errorMiddleware = require("../../middlewares/error/errorMiddleWare");
const jwtSecretKey = require("../../config/keys/keys").jwtSecretKey;
const errorToJson = require("../../models/helpers/errorToJson");
const errorMsg = require("../../config/constants/errors");
const successMsg = require("../../config/constants/success");

const Admin = require("../../models/Admin").Admin;
const validateLogin = require("../../models/Admin").validateLogin;

// @route POST /api/post-auth/
// @desc Loging in and returning jwt token
// Public - Public
router.post(
  "/",
  errorMiddleware(async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).send(errorToJson(error));
    } else {
      const { email } = req.body;
      const { password } = req.body;
      const admin = await Admin.findOne({ email: email });
      if (admin) {
        const isMatch = await bcrypt.compare(password, admin.password);
        if (isMatch) {
          // Admin creditentials are correct
          const payload = {
            id: admin._id,
            email: admin.email,
            isSuperUser: admin.isSuperUser
          };
          jwt.sign(payload, jwtSecretKey, { expiresIn: 3600 }, (err, token) => {
            res.json({ success: true, token: "Bearer " + token });
          });
        } else {
          return res.status(400).send(errorMsg.INVALID_CREDENTIALS);
        }
      } else {
        return res.status(400).send(errorMsg.INVALID_CREDENTIALS);
      }
    }
  })
);

module.exports = router;
