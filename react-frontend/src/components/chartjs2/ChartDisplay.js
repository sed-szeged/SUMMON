import React from "react";
import { Doughnut, Line, Bar } from "react-chartjs-2";

export default props => {
  const jsonData = Object.assign({}, props.chart.jsonData);
  switch (props.chart.chartType) {
    case "bar":
      return <Bar data={jsonData} />;
    case "line":
      return <Line data={jsonData} />;
    case "doughnut":
      return <Doughnut data={jsonData} />;
    default:
      return <h5>Chart type wasn't recognized</h5>;
  }
};
