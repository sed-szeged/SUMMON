import React, { Component } from "react";
import { connect } from "react-redux";

import { downloadGridFsFile } from "../../redux/actions/gridfs/gridfsActions";

class GridFSDownload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.id) {
      this.setState({ id: nextProps.id });
    }
  }

  onClick = e => {
    this.props.downloadGridFsFile(this.state.id);
  };

  render() {
    return (
      <button onClick={this.onClick} className="btn light-blue accent-4">
        Download
      </button>
    );
  }
}
export default connect(
  null,
  { downloadGridFsFile }
)(GridFSDownload);
