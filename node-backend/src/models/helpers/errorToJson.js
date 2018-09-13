module.exports = errorToJson = error => {
  console.log(error.details[0].path[0]);
  console.log(error.details[0].message);
  return {
    [error.details[0].path[0]]: error.details[0].message
  };
};
