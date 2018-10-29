import React, { Component } from "react";
import { connect } from "react-redux";
import { notify } from "react-notify-toast";

import DatasetSelect from "../../components/layout/common/DatasetSelect";
import GridFSSelect from "./GridFSSelect";
import { Modal, Button } from "react-materialize";

import {
  removeFile,
  setGridfsNull
} from "../../redux/actions/gridfs/gridfsActions";

class GridFSManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: "",
      gridfs: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataset) {
      if (nextProps.dataset.selected) {
        this.setState({ dataset: nextProps.dataset.selected });
      }
    }
    if (nextProps.gridfs) {
      if (nextProps.gridfs.selected) {
        this.setState({ gridfs: nextProps.gridfs.selected });
      }
    }
  }

  componentWillUnmount() {
    this.props.setGridfsNull();
  }

  onRemove = e => {
    if (this.state.gridfs === "") {
      notify.show("You must select a file", "error");
    } else {
      this.props.removeFile(this.state.gridfs);
    }
  };

  render() {
    return (
      <div>
        <div>
          <DatasetSelect />
          {this.state.dataset ? (
            <div>
              <GridFSSelect
                className="row col l12 s12"
                selectedDataset={this.state.dataset}
              />

              <br />
              {this.state.gridfs ? (
                <div className="row col l12 s12 center offset-s5 ">
                  <hr />
                  <Modal
                    id="modal"
                    header="Are you sure you want to remove the file and its data from the database?"
                    trigger={
                      <Button className="btnwaves-effect waves-light red accent-2 modal-trigger">
                        Remove
                        <i className="material-icons right">launch</i>
                      </Button>
                    }
                  >
                    <Button
                      onClick={this.onRemove}
                      href="#modal"
                      className="btnwaves-effect waves-light red accent-2 modal-trigger"
                    >
                      Remove <i className="material-icons right">delete</i>
                    </Button>
                  </Modal>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dataset: state.dataset,
  gridfs: state.gridfs
});

export default connect(
  mapStateToProps,
  { removeFile, setGridfsNull },
  null,
  { withRef: true }
)(GridFSManage);
