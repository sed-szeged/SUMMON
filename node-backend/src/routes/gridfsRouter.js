const router = require("express").Router();
const passport = require("passport");
const Id = require("valid-objectid");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const Dataset = require("../models/Dataset").Dataset;

const errorMiddleware = require("../middlewares/error/errorMiddleWare");
const errorMsg = require("../config/constants/errors");
const successMsg = require("../config/constants/success");
const validateGridFS = require("../models/GridFS").validateGridFS;
const errorToJson = require("../models/helpers/errorToJson");

/* GridFS */
const GridFsStorage = require("multer-gridfs-storage");
const BUCKET_NAME = "gridfs_uploads";
const MONGO_URI = process.env.MONGO_CONNECTION;
const multer = require("multer");

const crypto = require("crypto");
const path = require("path");

/** Setting up storage / storage object using multer-gridfs-storage */

const gridFSRouter = function(gfs) {
  /** Setting up storage using multer-gridfs-storage */
  const storage = new GridFsStorage({
    url: MONGO_URI,
    gfs: gfs,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) return reject(err);
          const filename =
            buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: BUCKET_NAME,
            metadata: {
              name: req.query.name || "",
              dataset: req.params.dataset,
              description: req.query.description || "",
              createdBy: req.user._id
            }
          };
          resolve(fileInfo);
        });
      });
    }
  });

  /* multer storage for single upload */
  const upload = multer({ storage: storage }).single("file");

  // @route POST /api/gridfs/:dataset
  // @desc upload a file
  // Private
  router.post(
    "/:dataset",
    passport.authenticate("jwt", { session: false }),
    errorMiddleware(async (req, res) => {
      const { error } = validateGridFS(req.query);
      if (error) return res.status(400).send(errorToJson(error));
      if (!Id.isValid(req.params.dataset)) {
        return res.status(400).send(errorMsg.INVALID_OBJECT_ID);
      } else {
        const dataset = await Dataset.findById(req.params.dataset);
        if (dataset) {
          /** multer upload */
          upload(req, res, err => {
            if (err) {
              return res.status(500).send(errorMsg.INTERNAL_SERVER_ERROR);
            } else {
              return res.send("The file was saved.");
            }
          });
        } else {
          return res.status(404).send("Dataset" + errorMsg.NOT_FOUND);
        }
      }
    })
  );

  // @route GET /api/gridfs/:dataset
  // @desc get file informations
  // Public
  router.get(
    "/:dataset",
    errorMiddleware(async (req, res) => {
      if (!Id.isValid(req.params.dataset)) {
        return res.status(400).send(errorMsg.INVALID_OBJECT_ID);
      } else {
        const mongoose_connection = mongoose.connection;

        mongoose_connection
          .collection(BUCKET_NAME + ".files")
          .find({
            ["metadata.dataset"]: req.params.dataset
          })
          .toArray((err, gfs_files) => {
            if (err)
              return res.status(500).send(errorMsg.INTERNAL_SERVER_ERROR);
            if (!gfs_files || gfs_files.length === 0) {
              return res.status(404).send("Files" + errorMsg.NOT_FOUND);
            } else {
              return res.send(gfs_files);
            }
          });
      }
    })
  );

  // @route GET /api/gridfs/file/:file
  // @desc download as file
  // Public
  router.get(
    "/file/:fileid",
    errorMiddleware(async (req, res) => {
      if (!Id.isValid(req.params.fileid)) {
        return res.status(400).send(errorMsg.INVALID_OBJECT_ID);
      } else {
        const mongoose_connection = mongoose.connection;
        const file = await mongoose_connection
          .collection(BUCKET_NAME + ".files")
          .findOne({ _id: mongoose.Types.ObjectId(req.params.fileid) });

        if (file) {
          mongodb.MongoClient.connect(
            process.env.MONGO_CONNECTION,
            (error, client) => {
              const db = client.db(process.env.DB_NAME);

              const bucket = new mongodb.GridFSBucket(db, {
                chunkSizeBytes: 1024,
                bucketName: BUCKET_NAME
              });

              console.log(file.filename);

              bucket
                .openDownloadStream(file._id)
                .on("error", error => {
                  console.log(error);
                  res.end();
                })
                .on("finish", () => {
                  console.log("done");
                  process.exit(0);
                });
            }
          );
        } else {
          // No file for the requested id
          res.status(404).send("File" + errorMsg.NOT_FOUND);
        }
      }
    })
  );

  return router;
};

module.exports = { gridFSRouter };
