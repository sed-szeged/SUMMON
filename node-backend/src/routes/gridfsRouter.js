const router = require("express").Router();
const passport = require("passport");
const Id = require("valid-objectid");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const mongoose_connection = mongoose.connection;
const Dataset = require("../models/Dataset").Dataset;
const RequestQuery = require("../models/RequestQuery").RequestQuery;

const errorMiddleware = require("../middlewares/error/errorMiddleWare");
const errorMsg = require("../config/constants/errors");
const successMsg = require("../config/constants/success");
const validateGridFS = require("../models/GridFS").validateGridFS;
const errorToJson = require("../models/helpers/errorToJson");

/* GridFS */
const GridFS = require("gridfs-stream");
const GridFsStorage = require("multer-gridfs-storage");
const BUCKET_NAME = "gridfs_uploads";
const FILE_COLLECTION = BUCKET_NAME + ".files";
const MONGO_URI = process.env.MONGO_CONNECTION;
const multer = require("multer");

const crypto = require("crypto");
const path = require("path");

/** Setting up storage / storage object using multer-gridfs-storage */
let gfs = null;
const connection = mongoose.createConnection(MONGO_URI);
connection.once("open", () => {
  console.log("GridFS connected...");
  gfs = GridFS(connection.db, mongoose.mongo);
  gfs.collection(BUCKET_NAME);
  return gfs;
});

/** Setting up storage using multer-gridfs-storage */
const storage = new GridFsStorage({
  url: MONGO_URI,
  gfs: gfs,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);
        const filename = buf.toString("hex") + path.extname(file.originalname);
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
        .collection(FILE_COLLECTION)
        .find({
          ["metadata.dataset"]: req.params.dataset
        })
        .toArray((err, gfs_files) => {
          if (err) return res.status(500).send(errorMsg.INTERNAL_SERVER_ERROR);
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
// @desc Stream files by ID to client as a file
// Public
router.get(
  "/file/:fileid",
  errorMiddleware(async (req, res) => {
    if (!Id.isValid(req.params.fileid)) {
      return res.status(400).send(errorMsg.INVALID_OBJECT_ID);
    } else {
      const mongoose_connection = mongoose.connection;
      const file = await mongoose_connection
        .collection(FILE_COLLECTION)
        .findOne({ _id: mongoose.Types.ObjectId(req.params.fileid) });

      if (file) {
        res.set("content-type", file.contentType);
        res.set("accept-ranges", "bytes");
        res.setHeader(
          "Content-disposition",
          "attachment; filename=" + file.filename
        );
        const readstream = gfs.createReadStream({ _id: file._id });
        readstream.pipe(res);

        readstream.on("error", () => {
          return res.status(500).end();
        });

        readstream.on("end", () => {
          return res.end();
        });
      } else {
        // No file for the requested id
        res.status(404).send("File" + errorMsg.NOT_FOUND);
      }
    }
  })
);

// @route GET /api/gridfs/select/id/:id
// @desc Get files for select by dataset ID
// Public
router.get(
  "/select/id/:id",
  errorMiddleware(async (req, res) => {
    if (!Id.isValid(req.params.id)) {
      return res.status(400).send(errorMsg.INVALID_OBJECT_ID);
    } else {
      mongoose_connection
        .collection(FILE_COLLECTION)
        .find({
          ["metadata.dataset"]: req.params.id
        })
        .toArray((err, gsf_files) => {
          if (err) return res.status(400).send(errorMsg.INTERNAL_SERVER_ERROR);
          if (!gsf_files || gsf_files.length === 0) {
            return res.status(404).send("GridFS" + errorMsg.NOT_FOUND);
          } else {
            getGridFSArr(gsf_files)
              .then(arr => {
                res.send(arr);
              })
              .catch(err => {
                res.status(404).send(err);
              });
          }
        });
    }

    function getGridFSArr(girdfs_arr) {
      let arr = [];
      return new Promise((resolve, reject) => {
        if (girdfs_arr.length === 0) reject("Datasets " + errorMsg.NOT_FOUND);
        girdfs_arr.map(gridfs => {
          arr.push({ value: gridfs._id, label: gridfs.metadata.name });
        });
        resolve(arr);
      });
    }
  })
);

// @route GET /api/gridfs/collection-json/:requestqueryid
// @desc Stream files by ID to client as a file
// Public
router.get(
  "/collection-json/:requestqueryid",
  errorMiddleware(async (req, res) => {
    if (!Id.isValid(req.params.requestqueryid)) {
      return res.status(400).send(errorMsg.INVALID_OBJECT_ID);
    } else {
      const requestquery = await RequestQuery.findOne({
        _id: req.params.requestqueryid
      });
      if (!requestquery) {
        return res.status(404).send("Dataset " + errorMsg.NOT_FOUND);
      } else {
        mongoose_connection.db
          .listCollections({ name: requestquery.collectionName })
          .next((err, collinfo) => {
            if (err)
              return res.status(500).send(errorMsg.INTERNAL_SERVER_ERROR);
            if (collinfo) {
              res.set("content-type", "application/json");
              res.set("accept-ranges", "bytes");
              res.setHeader(
                "Content-disposition",
                "attachment; filename=" + requestquery.collectionName + ".json"
              );
              mongoose_connection
                .collection(requestquery.collectionName)
                .find({})
                .on("data", chunk => {
                  res.write(JSON.stringify(chunk));
                })
                .on("error", () => {
                  res.end();
                })
                .on("close", () => {
                  res.end();
                });
            } else {
              return res.status(400).send("Collection" + errorMsg.NOT_FOUND);
            }
          });
      }
    }
  })
);

module.exports = router;
