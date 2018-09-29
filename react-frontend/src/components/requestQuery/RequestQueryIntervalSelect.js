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

  componentDidMount() {
    this.getInterval(this.props.interval);
  }

  getInterval = intervalValue => {
    if (this.props.interval) {
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

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { setInterval }
)(RequestQueryIntervalSelect);
