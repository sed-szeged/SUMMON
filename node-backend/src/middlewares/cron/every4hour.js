const cron = require("node-cron");
const findRequestQueries = require("../requestQueries/findRequestQueries");

module.exports = every4hour = cron.schedule("15 */4 * * *", () => {
  findRequestQueries("every4hour");
});
