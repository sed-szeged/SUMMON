const axios = require("axios");
const jsonQuery = require("./jsonQuery");
module.exports = async function axiosRequestQuery(requestQueryObj) {
  if (requestQueryObj.execute) {
    axios
      .get(requestQueryObj.queryURI)
      .then(res => {
        jsonQuery(requestQueryObj, res.data);
      })
      .catch(err => {});
  }
};
