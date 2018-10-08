const cron = require("node-cron");
const findRequestQueries = require("../requestQueries/findRequestQueries");

module.exports = every6hour = cron.schedule("30 */6 * * *", () => {
  findRequestQueries("every6hour");
});
