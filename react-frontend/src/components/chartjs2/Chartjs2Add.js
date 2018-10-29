import React, { Component } from "react";
import { connect } from "react-redux";

import DatasetSelect from "../layout/common/DatasetSelect";
import Chartjs2Fields from "./Chartjs2Fields";
import { setChartjs2Null } from "../../redux/actions/chartjs2/chartjs2Actions";

class Chartjs2Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataset) {
      if (nextProps.dataset.selected) {
        if (this.state.dataset !== nextProps.dataset.selected)
          this.setState({ dataset: nextProps.dataset.selected });
      }
    }
  }

  componentWillUnmount() {
    this.props.setChartjs2Null();
  }

  render() {
    return (
      <div>
        <h5>Add a Chart</h5>
        <div className="row">
          <DatasetSelect />
        </div>
        {this.state.dataset ? <Chartjs2Fields /> : ""}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dataset: state.dataset
});

export default connect(
  mapStateToProps,
  { setChartjs2Null }
)(Chartjs2Add);
