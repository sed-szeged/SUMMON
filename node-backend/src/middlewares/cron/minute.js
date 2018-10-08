const cron = require("node-cron");
const findRequestQueries = require("../requestQueries/findRequestQueries");

module.exports = minutes = cron.schedule("* * * * *", () => {
  findRequestQueries("minute");
});
