const errorMsg = require("../../config/constants/errors");
module.exports = function(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (e) {
      res.status(500).send(errorMsg.INTERNAL_SERVER_ERROR);
      return next(e);
    }
  };
};
