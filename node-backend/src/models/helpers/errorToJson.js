module.exports = errorToJson = error => {
  return {
    [error.details[0].path[0]]: error.details[0].message
  };
};
