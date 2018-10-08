const cron = require("node-cron");
const findRequestQueries = require("../requestQueries/findRequestQueries");

module.exports = hourly = cron.schedule("55 * * * *", () => {
  findRequestQueries("hour");
});
