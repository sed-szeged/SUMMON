import React, { Component } from "react";
import { connect } from "react-redux";
import ReactSelect from "react-select";

import chartjs2Types from "../../utils/constants/chartjs2Types";
import { setChartType } from "../../redux/actions/chartjs2/chartjs2Actions";

class Chartjs2TypeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {}
    };
  }

  onChange = e => {
    this.setState({ selected: e });
    if (this.state.selected.value !== undefined) {
      if (e.value !== this.state.selected.value) {
        this.props.setChartType(e.value);
      }
    } else {
      this.props.setChartType(e.value);
    }
  };

  componentWillUnmount() {
    this.props.setChartType(undefined);
  }

  render() {
    return (
      <ReactSelect
        value={this.state.selected}
        onChange={this.onChange}
        options={chartjs2Types}
      />
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { setChartType }
)(Chartjs2TypeSelect);
