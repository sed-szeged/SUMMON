import React, { Component } from "react";
import { connect } from "react-redux";
import ReactSelect from "react-select";

import chartjs2Types from "../../utils/constants/chartjs2Types";

class Chartjs2TypeSelect extends Component {
  render() {
    return (
      <div>
        <ReactSelect options={chartjs2Types} />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(Chartjs2TypeSelect);
