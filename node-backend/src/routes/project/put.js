const router = require("express").Router();
const passport = require("passport");
const mongoose = require("mongoose");
const Id = require("valid-objectid");

const errorMiddleware = require("../../middlewares/error/errorMiddleWare");
const errorToJson = require("../../models/helpers/errorToJson");
const Project = require("../../models/Project").Project;
const validateProject = require("../../models/Project").validateProject;

const errorMsg = require("../../config/constants/errors");
const successMsg = require("../../config/constants/success");

// @route PUT /api/put-project/id/:id
// @desc Updating a project by ID
// Private
router.put(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  errorMiddleware(async (req, res) => {
    const id = req.params.id;

    if (!Id.isValid(id)) {
      return res.status(400).send(errorMsg.INVALID_OBJECT_ID);
    } else {
      const project = await Project.findById(id);

      if (project) {
        const projectOwnerID = mongoose.Types.ObjectId(project.createdBy);
        const adminID = mongoose.Types.ObjectId(req.user.id);
        if (req.user.isSuperUser || projectOwnerID.equals(adminID)) {
          const { error } = validateProject(req.body);
          if (error) return res.status(400).send(errorToJson(error));

          const updateProject = {
            name: req.body.name,
            country: req.body.country,
            website: req.body.website,
            location: req.body.location,
            description: req.body.description,
            projectType: req.body.projectType
          };
          const updated = await Project.findOneAndUpdate(
            { _id: id },
            updateProject
          );
          return res.send(updated.name + successMsg.WAS_UPDATED);
        } else {
          return res.status(403).send(errorMsg.FORBIDDEN);
        }
      } else {
        return res.status(404).send("Project " + errorMsg.NOT_FOUND);
      }
    }
  })
);

module.exports = router;
