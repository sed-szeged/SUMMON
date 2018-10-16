const checkForValidkey = (propertyArr, jsonData) => {
  return new Promise((resolve, reject) => {
    let propArr = propertyArr;
    propertyArr.map((item, index) => {
      checkAndMakeArray(item, jsonData.data, index).then(res => {
        propArr[index] = res;
      });
    });
    resolve(propArr);
  });
};

const checkAndMakeArray = (propItem, jsonData, propArrIndex) => {
  let pItem = propItem;
  let arr = [];
  return new Promise((resolve, reject) => {
    if (jsonData) {
      if (jsonData.length !== 0) {
        jsonData.map((item, index) => {
          arr.push(item.data[propItem.propertyKey]);
        });
        pItem.dataArr = arr;
        pItem.validData = arr.every(isValidNum);
        resolve(pItem);
      }
    }
  });
};

function isValidNum(currentValue) {
  let cv = currentValue;
  try {
    cv = parseFloat(cv);
  } catch (e) {}
  try {
    cv = parseInt(cv);
  } catch (e) {}
  return typeof cv === "number" || cv === undefined || cv === null;
}

export default checkForValidkey;
