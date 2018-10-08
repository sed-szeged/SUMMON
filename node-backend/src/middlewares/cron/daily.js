const cron = require("node-cron");
const findRequestQueries = require("../requestQueries/findRequestQueries");

module.exports = daily = cron.schedule("5 12 * * *", () => {
  findRequestQueries("daily");
});
