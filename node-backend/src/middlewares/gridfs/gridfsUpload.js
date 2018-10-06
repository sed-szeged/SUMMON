const crypto = require("crypto");
const path = require("path");

const mongoose = require("mongoose");

const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

const BUCKET_NAME = "gridfs_uploads";
const MONGO_URI = process.env.MONGO_CONNECTION;

const upload = null;

module.exports = {
  upload
};
