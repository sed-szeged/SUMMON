import React, { Component } from "react";
import { connect } from "react-redux";
import { notify } from "react-notify-toast";

import DatasetSelect from "../layout/common/DatasetSelect";
import RequestQuerySwitches from "./RequestQuerySwitches";
import RequestQueryIntervalSelect from "./RequestQueryIntervalSelect";
import RequestQueryElements from "./RequestQueryElements";
import ReactJson from "react-json-view";
import { Modal, Button } from "react-materialize";
import {
  getQueryUriData,
  postNewRequestQuery
} from "../../redux/actions/requestQuery/requestQueryActions";

class RequestQueryAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      queryURI: "",
      json: {},
      execute: false,
      downloadable: false,
      interval: "",
      queryArr: [],
      dataset: ""
    };
    this.RequestQueryElement = React.createRef();
  }

  onSubmit = e => {
    const newRequestQuery = {
      dataset: this.state.dataset || "",
      name: this.state.name || "",
      queryURI: this.state.queryURI || "",
      execute: this.state.execute,
      downloadable: this.state.downloadable,
      interval: this.state.interval || "",
      queryArr: this.state.queryArr || []
    };
    this.props.postNewRequestQuery(newRequestQuery);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.requestQuery) {
      if (nextProps.requestQuery.json)
        this.setState({ json: nextProps.requestQuery.json });
      if (nextProps.requestQuery.execute)
        this.setState({ execute: nextProps.requestQuery.execute });
      if (nextProps.requestQuery.downloadable)
        this.setState({ downloadable: nextProps.requestQuery.downloadable });
      if (nextProps.requestQuery.interval)
        this.setState({ interval: nextProps.requestQuery.interval });
      if (nextProps.requestQuery.queryArr) {
        this.setState({ queryArr: nextProps.requestQuery.queryArr }, () => {
          this.onSubmit();
        });
      }
    }
    if (nextProps.dataset) {
      if (nextProps.dataset.selected)
        this.setState({ dataset: nextProps.dataset.selected });
    }
  }

  getQueryUriData = e => {
    if (this.state.querURI !== "")
      this.props.getQueryUriData({ queryURI: this.state.queryURI });
    else notify.show("Provide a valid API", "error");
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <div>
        <DatasetSelect />
        <div className="row">
          <div className="input-field col s12 l7">
            <input
              value={this.state.queryURI}
              onChange={this.onChange}
              id="queryURI"
              type="text"
              className="validate"
            />
            <label htmlFor="requestURI">Request URI</label>
            <span className="helper-text" data-error="wrong" />
          </div>
          <button
            className="btn waves-effect waves-light col s12 l2 light-blue accent-4"
            name="action"
            onClick={this.getQueryUriData}
          >
            Test API
            <i className="material-icons right">send</i>
          </button>
          <Modal
            header="Modal Header"
            trigger={
              <Button className="btn waves-effect waves-light offset-l1 col s12 l2 light-blue accent-4 modal-trigger">
                Toggle
                <i className="material-icons right">launch</i>
              </Button>
            }
          >
            <ReactJson src={this.state.json} />
          </Modal>
        </div>

        <div className="row">
          <div className="input-field col s12 l7">
            <input
              value={this.state.name}
              onChange={this.onChange}
              id="name"
              type="text"
              className="validate"
            />
            <label htmlFor="name">Name</label>
            <span className="helper-text" data-error="wrong" />
          </div>
          <div className="col s12 l5">
            <RequestQueryIntervalSelect />
          </div>
        </div>
        <RequestQuerySwitches />
        <RequestQueryElements ref={this.RequestQueryElement} />
        <div className="row">
          <button
            className="waves-effect waves-light btn light-blue accent-4"
            onClick={() => {
              this.RequestQueryElement.current.getWrappedInstance().setJson();
            }}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  requestQuery: state.requestQuery,
  dataset: state.dataset
});

export default connect(
  mapStateToProps,
  { getQueryUriData, postNewRequestQuery },
  null,
  { withRef: true }
)(RequestQueryAdd);
