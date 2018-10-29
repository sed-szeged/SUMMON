import React, { Component } from "react";
import ReactSelect from "react-select";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getDatasetTypesForSelect } from "../../redux/actions/datasetType/datasetTypeActions";
import { setErrorToInitialState } from "../../redux/actions/error/errorActions";
import { getProjectsForSelect } from "../../redux/actions/project/projectActions";
import {
  datasetAdd,
  setDatasetNull
} from "../../redux/actions/dataset/datasetActions";

class DatasetAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datasetTypes: [],
      selectedDatasetType: {},
      projects: [],
      selectedProject: {},
      name: "",
      website: "",
      description: "",
      errors: {
        name: "",
        website: "",
        description: ""
      }
    };

    this.props.setErrorToInitialState();
  }

  componentWillMount() {
    this.props.getDatasetTypesForSelect();
    this.props.getProjectsForSelect();
  }

  componentWillUnMount() {
    this.props.setDatasetNull();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.datasetType) {
      if (nextProps.datasetType.datasetTypeSelect)
        this.setState({
          datasetTypes: nextProps.datasetType.datasetTypeSelect
        });
    }

    if (nextProps.projects) {
      if (nextProps.projects.select)
        this.setState({ projects: nextProps.projects.select });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    const newDataset = {
      name: this.state.name,
      website: this.state.website,
      description: this.state.description,
      project: this.state.selectedProject.value,
      datasetType: this.state.selectedDatasetType.value
    };

    this.props.datasetAdd(newDataset);
  };

  render() {
    return (
      <div>
        <h5>Add a new Dataset</h5>
        {/* datasetType */}
        <div className="row col s12 l8 offset-l2">
          <ReactSelect
            placeholder="Select a Project"
            value={this.state.selectedProject}
            options={this.state.projects}
            onChange={e => {
              this.setState({ selectedProject: e });
            }}
          />
        </div>

        {/*name*/}
        <div className="row col s12 l6">
          <div className="row">
            <div className="input-field col s12">
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
          </div>
        </div>

        {/*website*/}
        <div className="row col s12 l6">
          <div className="row">
            <div className="input-field col s12">
              <input
                value={this.state.website}
                onChange={this.onChange}
                id="website"
                type="text"
                className="validate"
              />
              <label htmlFor="website">Website</label>
              <span className="helper-text" data-error="wrong" />
            </div>
          </div>
        </div>

        {/*description*/}
        <div className="row col s12 l6">
          <div className="row">
            <div className="input-field col s12">
              <textarea
                value={this.state.description}
                onChange={this.onChange}
                id="description"
                type="text"
                className="validate"
              />
              <label htmlFor="description">Description</label>
              <span className="helper-text" data-error="wrong" />
            </div>
          </div>
        </div>

        {/* datasetType */}
        <div className="row col s12 l6">
          <ReactSelect
            placeholder="Select a dataset type"
            value={this.state.selectedDatasetType}
            options={this.state.datasetTypes}
            onChange={e => {
              this.setState({ selectedDatasetType: e });
            }}
          />
        </div>
        <div className="row col l12 s12">
          <a
            className="waves-effect waves-light btn light-blue accent-4"
            onClick={this.onSubmit}
          >
            Add
          </a>
        </div>
      </div>
    );
  }
}

DatasetAdd.propTypes = {
  getDatasetTypesForSelect: PropTypes.func.isRequired,
  setErrorToInitialState: PropTypes.func.isRequired,
  getProjectsForSelect: PropTypes.func.isRequired,
  datasetAdd: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  datasetType: state.datasetType,
  projects: state.projects
});

export default connect(
  mapStateToProps,
  {
    getDatasetTypesForSelect,
    setErrorToInitialState,
    getProjectsForSelect,
    datasetAdd,
    setDatasetNull
  }
)(DatasetAdd);
