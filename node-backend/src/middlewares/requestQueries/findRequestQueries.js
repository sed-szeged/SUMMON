const RequestQuery = require("../../models/RequestQuery").RequestQuery;
const axiosRequestQuery = require("./axiosRequestQuery");

module.exports = async function findRequestQueries(interval) {
  const queries = await RequestQuery.find({ interval });
  if (queries.length !== 0) {
    queries.forEach(query => {
      axiosRequestQuery(query);
    });
  }
};
