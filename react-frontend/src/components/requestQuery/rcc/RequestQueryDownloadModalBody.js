import React, { Component } from "react";
import { connect } from "react-redux";

import RequestQueryDownloadButton from "../RequestQueryDownloadButton";
import { downloadRequestQueryByIdStartEnd } from "../../../redux/actions/requestQuery/requestQueryActions";

class RequestQueryDownloadModalBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      created: this.props.created.split("T")[0],
      startDate: this.props.created.split("T")[0],
      endDate: this.props.created.split("T")[0]
    };
  }

  startDateOnChange = e => {
    const minDate = new Date(this.state.created);
    const t = new Date().toISOString().split("T", 1)[0];
    const today = new Date(t);
    const endDate = new Date(this.state.endDate);
    const selectedDate = new Date(e.target.value);
    if (minDate <= selectedDate && selectedDate < today) {
      this.setState({ startDate: e.target.value });
      if (endDate < selectedDate) {
        this.setState({ endDate: e.target.value });
      }
    }
  };
  endDateOnChange = e => {
    const minDate = new Date(this.state.created);
    const t = new Date().toISOString().split("T", 1)[0];
    const today = new Date(t);
    const startDate = new Date(this.state.startDate);
    const selectedDate = new Date(e.target.value);
    if (
      minDate < selectedDate &&
      selectedDate <= today &&
      startDate <= selectedDate
    ) {
      this.setState({ endDate: e.target.value });
    }
  };

  onDownload = e => {
    this.props.downloadRequestQueryByIdStartEnd(
      this.state.id,
      this.state.startDate,
      this.state.endDate
    );
  };

  render() {
    return (
      <div>
        <div className="row col l12">
          <p>Created at: {this.state.created}</p>
          <p>Download the whole dataset: </p>
          <RequestQueryDownloadButton id={this.state.id} />
        </div>
        <div className="row col l12">
          <div className="col l6">
            <input
              value={this.state.startDate}
              onChange={this.startDateOnChange}
              type="date"
              id="startDate"
            />
          </div>{" "}
          <div className="col l6">
            <input
              value={this.state.endDate}
              onChange={this.endDateOnChange}
              type="date"
              id="endDate"
            />
          </div>
          <div className="col l12">
            <button
              onClick={this.onDownload}
              className="btn light-blue accent-4"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  null,
  { downloadRequestQueryByIdStartEnd }
)(RequestQueryDownloadModalBody);
