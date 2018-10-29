import React, { Component } from "react";
import { connect } from "react-redux";
import { notify } from "react-notify-toast";

import DatasetSelect from "../layout/common/DatasetSelect";
import {
  uploadFile,
  setGridfsNull
} from "../../redux/actions/gridfs/gridfsActions";

class GridFSAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      dataset: "",
      file: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataset) {
      if (nextProps.dataset.selected)
        this.setState({ dataset: nextProps.dataset.selected });
    }
  }
  onSubmit = () => {
    if (this.state.dataset === "") {
      notify.show("You must select a dataset", "error");
    } else {
      if (this.state.file) {
        const data = {
          name: this.state.name || "",
          description: this.state.description || "",
          dataset: this.state.dataset
        };
        this.props.uploadFile(this.state.file, data);
      } else {
        notify.show("You must select a file", "error");
      }
    }
  };

  componentWillUnmount() {
    this.props.setGridfsNull();
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  fileOnChange = e => {
    this.setState({ file: e.target.files[0] });
  };

  render() {
    return (
      <div>
        <h5>Add a File (GridFs Store)</h5>
        <DatasetSelect />
        <div className="row">
          <div>
            <div className="input-field col s12 l6">
              <input
                value={this.state.name}
                onChange={this.onChange}
                id="name"
                type="text"
              />
              <label className="active" htmlFor="name">
                Name
              </label>
            </div>
          </div>

          <div className="col s12 l6">
            <div className="input-field">
              <textarea
                value={this.state.description}
                onChange={this.onChange}
                id="description"
                className="materialize-textarea"
              />
              <label htmlFor="description">Description</label>
            </div>
          </div>
        </div>
        <div className="row ">
          <form className="col s12 l12">
            <div className="file-field input-field">
              <div className="btn">
                <span>File</span>
                <input name="file" type="file" onChange={this.fileOnChange} />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
          </form>
        </div>
        <div className="row col s12 l12">
          {" "}
          <a
            className="waves-effect waves-light btn light-blue accent-4"
            onClick={this.onSubmit}
          >
            Submit
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dataset: state.dataset
});

export default connect(
  mapStateToProps,
  { uploadFile, setGridfsNull },
  null,
  { withRef: true }
)(GridFSAdd);
