import React, { Component } from "react";
import { connect } from "react-redux";
import ReactSelect from "react-select";

import {
  getDatasetTypesForSelect,
  removeDatasetTypeByid,
  updateDatasetTypeById
} from "../../redux/actions/datasetType/datasetTypeActions";
import { Modal, Button } from "react-materialize";
import { notify } from "react-notify-toast";

class DatasetTypeManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      selected: {},
      name: ""
    };
  }

  componentDidMount() {
    this.props.getDatasetTypesForSelect();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.datasetType) {
      if (nextProps.datasetType.datasetTypeSelect) {
        this.setState({ options: nextProps.datasetType.datasetTypeSelect });
      }
    }
  }

  onChange = e => {
    this.setState({ selected: e, name: e.label });
  };

  onRemove = e => {
    if (!this.state.selected.value) {
      notify.show("You must select a dataset", "error");
    } else {
      this.props.removeDatasetTypeByid(this.state.selected.value);
    }
  };

  onUpdate = e => {
    if (!this.state.selected.value) {
      notify.show("You must select a dataset", "error");
    } else {
      const updateDatasetType = {
        name: this.state.name
      };
      this.props.updateDatasetTypeById(
        this.state.selected.value,
        updateDatasetType
      );
    }
  };

  render() {
    return (
      <div className="row">
        <h5>Edit or Remove a Dataset Type</h5>
        <div className="col l6 s12">
          <ReactSelect
            value={this.state.selected}
            onChange={this.onChange}
            options={this.state.options}
          />
        </div>
        <div className="col l6 s12">
          <input
            value={this.state.name}
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
          />
        </div>
        <div className="row">
          <div className="col l6 s6">
            <button onClick={this.onUpdate} className="btn light-blue accent-4">
              Update
            </button>
          </div>
          <div className="col l6 s6">
            <Modal
              header="Are you sure you want to remove the dataset type selected?"
              trigger={
                <Button className="btnwaves-effect waves-light red accent-2 modal-trigger">
                  Remove
                  <i className="material-icons right">launch</i>
                </Button>
              }
            >
              <Button
                onClick={this.onRemove}
                className="btnwaves-effect waves-light red accent-2 modal-trigger"
              >
                Remove <i className="material-icons right">delete</i>
              </Button>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  datasetType: state.datasetType
});

export default connect(
  mapStateToProps,
  { getDatasetTypesForSelect, removeDatasetTypeByid, updateDatasetTypeById }
)(DatasetTypeManage);
