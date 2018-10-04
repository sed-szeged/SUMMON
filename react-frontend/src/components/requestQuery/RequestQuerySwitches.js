import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  setExecute,
  setDownloadable
} from "../../redux/actions/requestQuery/requestQueryActions";

class RequestQuerySwitches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      execute: this.props.execute || false,
      downloadable: this.props.downloadable || false
    };
    this.props.setExecute(this.props.execute || false);
    this.props.setDownloadable(this.props.downloadable || false);
  }

  componentDidUpdate() {
    console.log(this.state.execute);
    console.log(this.state.downloadable);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.execute) this.setState({ execute: nextProps.execute });
    if (nextProps.downloadable)
      this.setState({ downloadable: nextProps.downloadable });
  }

  executeOnChange = e => {
    this.setState({ execute: !this.state.execute }, () => {
      this.props.setExecute(this.state.execute);
    });
  };
  downloadableOnChange = e => {
    this.setState({ downloadable: !this.state.downloadable }, () => {
      this.props.setDownloadable(this.state.downloadable);
    });
  };

  componentWillUnmount() {
    this.props.setDownloadable(undefined);
    this.props.setExecute(undefined);
  }

  render() {
    return (
      <div>
        <div className="row">
          Enable switch to run the query and save it to the database at the
          selected interval
          <div id="execute" className="switch">
            <label>
              Off
              <input
                value={this.state.execute}
                onChange={this.executeOnChange}
                type="checkbox"
                checked={this.state.execute}
              />
              <span className="lever" />
              On
            </label>
          </div>
          Enable switch so the saved queries will be downloadable
          <div id="downloadable" className="switch">
            <label>
              Off
              <input
                value={this.state.downloadable}
                onChange={this.downloadableOnChange}
                type="checkbox"
                checked={this.state.downloadable}
              />
              <span className="lever" />
              On
            </label>
          </div>
        </div>
      </div>
    );
  }
}

RequestQuerySwitches.propTypes = {
  setExecute: PropTypes.func.isRequired,
  setDownloadable: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});
export default connect(
  mapStateToProps,
  { setExecute, setDownloadable }
)(RequestQuerySwitches);
