const router = require("express").Router();
const _ = require("lodash");
const Id = require("valid-objectid");

const errorMiddleware = require("../../middlewares/error/errorMiddleWare");
const Project = require("../../models/Project").Project;

const errorMsg = require("../../config/constants/errors");

// @route GET /api/get-project/select
// @desc GET all projects in "{ value: <val>, label: <lab> }"" format
// Public
router.get(
  "/select",
  errorMiddleware(async (req, res) => {
    let selectProjects = [];
    const projects = await Project.find({});
    if (projects) {
      _.forEach(projects, project => {
        return selectProjects.push({ value: project._id, label: project.name });
      });
      return res.send(selectProjects);
    } else {
      return res.status(404).send("Projects" + errorMsg.NOT_FOUND);
    }
  })
);

// @route GET /api/get-project/id/:id
// @desc GET a single Project by ID
// Public
router.get(
  "/id/:id",
  errorMiddleware(async (req, res) => {
    const id = req.params.id;
    if (!Id.isValid(id)) {
      return res.status(400).send(errorMsg.INVALID_OBJECT_ID);
    } else {
      const project = await Project.findById(id);
      if (project) {
        return res.send(project);
      } else {
        return res.status(404).send("Project" + errorMsg.NOT_FOUND);
      }
    }
  })
);

module.exports = router;
