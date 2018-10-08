const mongoose = require("mongoose");
const db = mongoose.connection;

module.exports = function insertQueryData(collectionName, data) {
  try {
    db.collection(collectionName).insertOne(
      { date: Date.now(), data: data },
      (err, response) => {
        return;
      }
    );
  } catch (e) {}
};
