import React, { Component } from "react";
import { connect } from "react-redux";

import ReactSelect from "react-select";

import intervals from "../../utils/constants/Intervals";
import { setInterval } from "../../redux/actions/requestQuery/requestQueryActions";

class RequestQueryIntervalSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.interval) {
      this.setState({ interval: nextProps.interval });
    }
    if (nextProps.intervalVal) {
      this.getInterval(nextProps.intervalVal);
    }
  }

  getInterval = (intervalValue = "daily") => {
    if (this.props.intervalVal) {
      this.setState({
        interval:
          intervals[
            intervals.findIndex(interval => interval.value === intervalValue)
          ]
      });
      this.props.setInterval(intervalValue);
    }
  };

  selectOnChange = e => {
    this.setState({ interval: e });
    this.props.setInterval(e.value);
  };

  componentWillUnmount() {
    this.props.setInterval(undefined);
  }

  render() {
    return (
      <ReactSelect
        onChange={this.selectOnChange}
        value={this.state.interval}
        placeholder="Select an interval"
        options={intervals}
      />
    );
  }
}

const mapStateToProps = state => ({
  interval: state.requestQuery.interval
});

export default connect(
  mapStateToProps,
  { setInterval }
)(RequestQueryIntervalSelect);
