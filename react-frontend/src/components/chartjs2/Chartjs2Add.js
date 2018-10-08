import React, { Component } from "react";
import { connect } from "react-redux";

import DatasetSelect from "../layout/common/DatasetSelect";
import Chartjs2Fields from "./Chartjs2Fields";

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
  {}
)(Chartjs2Add);
