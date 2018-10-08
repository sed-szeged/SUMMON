const jsonQuery = require("json-query");
const insertQueryData = require("./insertQueryData");

function getData(queryArr, json) {
  let dataArr = [];
  return new Promise((resolve, reject) => {
    queryArr.forEach(singleQuery => {
      try {
        const queryValue = jsonQuery(singleQuery.query, { data: json });
        dataArr.push({ [singleQuery.queryKey]: queryValue.value });
      } catch (e) {}
    });
    resolve(dataArr);
  });
}

module.exports = function jsonQuery(requestQueryObj, json) {
  getData(requestQueryObj.queryArr, json)
    .then(res => {
      insertQueryData(requestQueryObj.collectionName, res);
    })
    .catch(err => {});
};
