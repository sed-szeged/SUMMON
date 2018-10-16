const makeRQPropertySelect = queryArr => {
  const arr = [];
  return new Promise(resolve => {
    if (queryArr.length !== 0) {
      queryArr.map((item, index) => {
        arr.push({ value: item.queryKey, label: item.queryKey });
      });
    }
    resolve(arr);
  });
};

export default makeRQPropertySelect;
