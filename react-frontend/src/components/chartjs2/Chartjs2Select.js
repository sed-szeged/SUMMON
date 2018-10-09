import React, { Component } from "react";
import { connect } from "react-redux";
import ReactSelect from "react-select";

import {
  getChartsForSelect,
  setSelectedChartjs
} from "../../redux/actions/chartjs2/chartjs2Actions";

class Chartjs2Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: "",
      selected: {},
      options: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataset) {
      if (nextProps.dataset.selected) {
        if (nextProps.dataset.selected !== this.state.dataset) {
          this.setState({ dataset: nextProps.dataset.selected });
          this.props.getChartsForSelect(nextProps.dataset.selected);
        }
      }
    }
    if (nextProps.chartjs2) {
      if (nextProps.chartjs2.select) {
        this.setState({ options: nextProps.chartjs2.select });
      }
    }
  }

  onChange = e => {
    if (e !== this.state.selected) {
      this.setState({ selected: e });
      this.props.setSelectedChartjs(e.value);
    }
  };

  componentWillMount() {
    this.props.setSelectedChartjs(undefined);
  }

  render() {
    return (
      <ReactSelect
        value={this.state.selected}
        onChange={this.onChange}
        options={this.state.options}
      />
    );
  }
}
const mapStateToProps = state => ({
  dataset: state.dataset,
  chartjs2: state.chartjs2
});

export default connect(
  mapStateToProps,
  { getChartsForSelect, setSelectedChartjs }
)(Chartjs2Select);
