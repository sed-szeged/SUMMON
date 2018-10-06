const crypto = require("crypto");
const path = require("path");

const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

const BUCKET_NAME = "gridfs_uploads";
const MONGO_URI = process.env.MONGO_CONNECTION;

// Storage engine | object
const storage = new GridFsStorage({
  url: MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);
        console.log(file);
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const dataset = file.dataset;
        console.log(dataset);
        const fileInfo = {
          filename: filename,
          bucketName: BUCKET_NAME,
          dataset: dataset
        };
        resolve(fileInfo);
      });
    });
  }
});

module.exports = {
  upload: multer({ storage })
};
