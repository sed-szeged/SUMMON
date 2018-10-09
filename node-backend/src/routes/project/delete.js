const router = require("express").Router();
const passport = require("passport");
const Id = require("valid-objectid");
const mongoose = require("mongoose");

const errorMiddleware = require("../../middlewares/error/errorMiddleWare");
const errorToJson = require("../../models/helpers/errorToJson");
const Project = require("../../models/Project").Project;
const Dataset = require("../../models/Dataset").Dataset;
const validateProject = require("../../models/Project").validateProject;

const errorMsg = require("../../config/constants/errors");
const successMsg = require("../../config/constants/success");

// @route POST /api/delete-project/:id
// @desc Remove project by ID
// Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  errorMiddleware(async (req, res) => {
    if (!Id.isValid(req.params.id)) {
      return res.status(400).send(errorMsg.INVALID_OBJECT_ID);
    } else {
      const project = await Project.findOne({ _id: req.params.id });
      if (!project) {
        return res.status(404).send(errorMsg.INVALID_OBJECT_ID);
      } else {
        const dataset = await Dataset.findOne({ project: req.params.id });
        const adminID = mongoose.Types.ObjectId(req.user._id);
        const projectCreatedBy = mongoose.Types.ObjectId(project.createdBy);
        if (!req.user.isSuperUser && !adminID.equals(projectCreatedBy)) {
          return res.status(403).send(errorMsg.FORBIDDEN);
        } else if (dataset) {
          return res
            .status(400)
            .send("You must remove all Datasets to remove this project");
        } else {
          Project.deleteOne({ _id: req.params.id }, err => {
            if (err) {
              return res.status(500).send(errorMsg.INTERNAL_SERVER_ERROR);
            } else {
              return res.send("Project" + successMsg.WAS_REMOVED);
            }
          });
        }
      }
    }
  })
);

module.exports = router;
