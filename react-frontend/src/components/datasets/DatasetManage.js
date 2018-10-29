import React, { Component } from "react";
import ReactSelect from "react-select";
import { connect } from "react-redux";

import isEmpty from "../../utils/isEmpty";

import { getProjectsForSelect } from "../../redux/actions/project/projectActions";
import {
  datasetForSelectByProjectId,
  getDatasetById,
  updateDatasetById,
  removeDatasetById,
  setDatasetNull
} from "../../redux/actions/dataset/datasetActions";
import { Modal, Button } from "react-materialize";
import { notify } from "react-notify-toast";

class DatasetManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProject: {},
      projectSelect: [],
      selectedDataset: {},
      datasetSelect: [],
      selectedDatasetType: {},
      datasetTypeSelect: [],
      name: "",
      website: "",
      description: "",
      errors: {
        name: "",
        website: "",
        description: ""
      },
      dataset: {
        name: "",
        website: "",
        description: "",
        datasetType: ""
      }
    };
  }

  componentDidMount() {
    if (this.props.projects) {
      if (this.props.projects.select)
        this.setState({ projectSelect: this.props.projects.select });
    }
    if (this.props.datasetType) {
      if (this.props.datasetType.datasetTypeSelect)
        this.setState({
          datasetTypeSelect: this.props.datasetType.datasetTypeSelect
        });
    }
  }

  componentWillUnMount() {
    this.props.setDatasetNull();
  }

  projectSelectOnChange = e => {
    this.setState({
      selectedProject: e,
      datasetSelect: [],
      selectedDataset: {},
      dataset: {
        name: "",
        website: "",
        description: "",
        datasetType: ""
      }
    });
    this.props.datasetForSelectByProjectId(e.value);
  };

  datasetSelectOnChange = e => {
    this.setState({ selectedDataset: e });
    this.props.getDatasetById(e.value);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataset) {
      if (nextProps.dataset.select)
        this.setState({ datasetSelect: nextProps.dataset.select });
      if (nextProps.dataset.dataset) {
        this.setState({ dataset: nextProps.dataset.dataset });
        this.setDatasetType(nextProps.dataset.dataset.datasetType);
      }
    }
  }

  setDatasetType = id => {
    this.setState({
      selectedDatasetType: this.state.datasetTypeSelect[
        this.state.datasetTypeSelect.findIndex(
          datasetType => id === datasetType.value
        )
      ]
    });
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  setProjectType = (projectTypeParam = "smartcity") => {
    this.setState({
      selectedProjectType: this.state.projectTypes[
        this.state.projectTypes.findIndex(
          projectType => projectType.value === projectTypeParam
        )
      ]
    });
  };

  onSubmit = e => {
    const updateDataset = {
      name: this.state.name || this.state.dataset.name,
      website: this.state.website || this.state.dataset.website,
      description: this.state.description || this.state.dataset.description,
      datasetType: this.state.selectedDatasetType.value
    };
    this.props.updateDatasetById(
      this.state.selectedDataset.value,
      updateDataset
    );
  };

  onRemove = e => {
    if (this.state.selectedDataset) {
      this.props.removeDatasetById(this.state.selectedDataset.value);
    } else {
      notify.show("You must select a dataset", "error");
    }
  };

  render() {
    return (
      <div className="row">
        <div className="row">
          <ReactSelect
            options={this.state.projectSelect}
            onChange={this.projectSelectOnChange}
            className="col s12 l6"
            placeholder="Select a project"
          />

          {!isEmpty(this.state.selectedProject) ? (
            <ReactSelect
              options={this.state.datasetSelect}
              onChange={this.datasetSelectOnChange}
              className="col s12 l6"
              placeholder="Select a dataset"
            />
          ) : null}
        </div>

        {/*name*/}
        <div className="row col s12 l6">
          <div className="row">
            <div className="input-field col s12">
              <input
                onChange={this.onChange}
                id="name"
                type="text"
                className="validate"
              />
              <label htmlFor="name">Name</label>
              <span className="helper-text" data-error="wrong">
                {this.state.dataset.name}
              </span>
            </div>
          </div>
        </div>

        {/*website*/}
        <div className="row col s12 l6">
          <div className="row">
            <div className="input-field col s12">
              <input
                onChange={this.onChange}
                id="website"
                type="text"
                className="validate"
              />
              <label htmlFor="website">Website</label>
              <span className="helper-text" data-error="wrong">
                {this.state.dataset.website}
              </span>
            </div>
          </div>
        </div>

        {/*description*/}
        <div className="row col s12 l6">
          <div className="row">
            <div className="input-field col s12">
              <textarea
                onChange={this.onChange}
                id="description"
                type="text"
                className="validate"
              />
              <label htmlFor="description">Description</label>
              <span className="helper-text" data-error="wrong">
                {this.state.dataset.description}
              </span>
            </div>
          </div>
        </div>

        {/*datasetType*/}
        <div>
          <ReactSelect
            value={this.state.selectedDatasetType}
            className="col s12 l6"
            options={this.state.datasetTypeSelect}
            placeholder="Select a dataset type"
          />
        </div>
        <div className="row col l12 s12">
          <div className="row">
            <div children="col l12">
              <a
                className="waves-effect waves-light btn light-blue accent-4"
                onClick={this.onSubmit}
              >
                Update
              </a>
            </div>
            <div className="col l12">
              <hr />
              <Modal
                header="Are you sure you want to remove the selected dataset?"
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects,
  datasetType: state.datasetType,
  dataset: state.dataset
});

export default connect(
  mapStateToProps,
  {
    getProjectsForSelect,
    datasetForSelectByProjectId,
    getDatasetById,
    updateDatasetById,
    removeDatasetById,
    setDatasetNull
  }
)(DatasetManage);
