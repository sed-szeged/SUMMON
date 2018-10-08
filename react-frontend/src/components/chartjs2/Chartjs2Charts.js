import React, { Component } from "react";
import { Doughnut, Line, Bar } from "react-chartjs-2";

import {
  doughnutData,
  lineData,
  barData
} from "../../utils/constants/chartjs2DefaultData";
import isEmpty from "../../utils/isEmpty";

class Chartjs2Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: null,
      jsonViewData: {}
    };
  }

  displayCharts = chartType => {
    switch (chartType) {
      case "line":
        if (isEmpty(this.props.jsonData)) {
          return <Line data={lineData} />;
        } else {
          return <Line data={this.props.jsonData} />;
        }
      case "bar":
        if (isEmpty(this.props.jsonData)) {
          return <Bar data={barData} />;
        } else {
          return <Bar data={this.props.jsonData} />;
        }
      case "doughnut":
        if (isEmpty(this.props.jsonData)) {
          return <Doughnut data={doughnutData} />;
        } else {
          return <Doughnut data={this.props.jsonData} />;
        }
      default:
        return <p>Select a valid Chart Type</p>;
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col s12 l12">
          {this.displayCharts(this.props.chartType)}
        </div>
      </div>
    );
  }
}
export default Chartjs2Charts;
