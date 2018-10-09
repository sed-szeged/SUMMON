const router = require("express").Router();
const passport = require("passport");

const errorMiddleware = require("../../middlewares/error/errorMiddleWare");
const errorToJson = require("../../models/helpers/errorToJson");
const Project = require("../../models/Project").Project;
const validateProject = require("../../models/Project").validateProject;

const errorMsg = require("../../config/constants/errors");
const successMsg = require("../../config/constants/success");

// @route POST /api/post-project/
// @desc Inserting new project into mongo
// Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  errorMiddleware(async (req, res) => {
    const { error } = validateProject(req.body);
    if (error) return res.status(400).send(errorToJson(error));

    const project = await Project.findOne({ name: req.body.name });
    if (project) return res.status(400).send(errorMsg.PROJECT_ALREADY_EXISTS);

    const newProject = new Project({
      name: req.body.name,
      country: req.body.country,
      location: req.body.location,
      website: req.body.website,
      description: req.body.description,
      createdBy: req.user._id,
      projectType: req.body.projectType
    });

    const savedProject = await newProject.save();
    if (savedProject) return res.send(savedProject.name + successMsg.WAS_SAVED);
  })
);

module.exports = router;
