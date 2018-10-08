const cron = require("node-cron");
const findRequestQueries = require("../requestQueries/findRequestQueries");

module.exports = every12hour = cron.schedule("45 */12 * * *", () => {
  findRequestQueries("every12hour");
});
