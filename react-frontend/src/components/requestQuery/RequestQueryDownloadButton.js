import React, { Component } from "react";
import { connect } from "react-redux";

import { downloadRequestQueryCollection } from "../../redux/actions/requestQuery/requestQueryActions";

class RequestQueryDownloadButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ""
    };
  }

  componentDidMount() {
    this.setState({ id: this.props.id });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.id !== nextProps.id) {
      this.setState({ id: nextProps.id });
    }
  }

  onClick = e => {
    this.props.downloadRequestQueryCollection(this.state.id);
  };

  render() {
    return (
      <button onClick={this.onClick} className="btn light-blue accent-4">
        Download All
      </button>
    );
  }
}
export default connect(
  null,
  { downloadRequestQueryCollection }
)(RequestQueryDownloadButton);
