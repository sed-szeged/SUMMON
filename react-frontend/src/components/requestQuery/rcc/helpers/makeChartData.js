const makeChartData = (type, jsonData, propertyArr) => {
  switch (type) {
    case "line":
      return {
        labels: getXCordLabels(jsonData),
        datasets: lineChartDatasets(propertyArr)
      };
    case "bar":
      return {
        labels: getXCordLabels(jsonData),
        datasets: barChartDatasets(propertyArr)
      };
    default:
      return null;
  }
};

const barChartDatasets = propertyArr => {
  let arr = [];
  if (propertyArr) {
    if (Array.isArray(propertyArr)) {
      propertyArr.map((item, index) => {
        if (item.validData) {
          arr.push({
            data: item.dataArr,
            label: item.propertyKey,
            backgroundColor: item.color,
            fill: true
          });
        }
      });
      return arr;
    }
  }
};

const lineChartDatasets = propertyArr => {
  let arr = [];
  if (propertyArr) {
    if (Array.isArray(propertyArr)) {
      propertyArr.map((item, index) => {
        if (item.validData) {
          arr.push({
            data: item.dataArr,
            label: item.propertyKey,
            borderColor: item.color,
            fill: false,
            options: {
              scaleLabel: {
                display: false
              }
            }
          });
        }
      });
      return arr;
    }
  }
};

const getXCordLabels = jsonData => {
  let arr = [];
  if (jsonData) {
    if (Array.isArray(jsonData)) {
      jsonData.map((item, index) => {
        arr.push(new Date(item.date));
      });
      return arr;
    }
  }
};

export default makeChartData;
