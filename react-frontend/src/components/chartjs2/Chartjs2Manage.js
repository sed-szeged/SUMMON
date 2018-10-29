import React, { Component } from "react";
import { connect } from "react-redux";

import DatasetSelect from "../layout/common/DatasetSelect";
import Chartjs2Select from "./Chartjs2Select";
import { getChartJsById } from "../../redux/actions/chartjs2/chartjs2Actions";
import Chartjs2ManageFields from "./Chartjs2ManageFields";
import { setChartjs2Null } from "../../redux/actions/chartjs2/chartjs2Actions";

class Chartjs2Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: "",
      selectedChart: "",
      name: "",
      description: "",
      jsonData: null
    };
  }

  componentWillUnmount() {
    this.props.setChartjs2Null();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataset) {
      if (nextProps.dataset.selected) {
        if (nextProps.dataset.selected !== this.state.dataset) {
          this.setState({ dataset: nextProps.dataset.selected });
        }
      }
    }
    if (nextProps.chartjs2) {
      if (nextProps.chartjs2.selected) {
        if (nextProps.chartjs2.selected !== this.state.selectedChart) {
          this.setState({ selectedChart: nextProps.chartjs2.selected });
          this.props.getChartJsById(nextProps.chartjs2.selected);
        }
      }
    }
  }

  render() {
    return (
      <div>
        <h5>Select and Manage a Chart</h5>
        <div className="row">
          <DatasetSelect />
        </div>
        {this.state.dataset ? (
          <div className="row">
            <Chartjs2Select />
          </div>
        ) : (
          ""
        )}
        {this.state.selectedChart ? <Chartjs2ManageFields /> : ""}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  dataset: state.dataset,
  chartjs2: state.chartjs2
});

export default connect(
  mapStateToProps,
  { getChartJsById, setChartjs2Null }
)(Chartjs2Manage);
