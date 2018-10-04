import React, { Component } from "react";
import { connect } from "react-redux";
import ReactSelect from "react-select";
import PropTypes from "prop-types";

import { getProjectsForSelect } from "../../../redux/actions/project/projectActions";
import {
  setSelectedDatasetId,
  datasetForSelectByProjectId
} from "../../../redux/actions/dataset/datasetActions";

class DatasetSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProject: "",
      projects: [],
      selectedDataset: "",
      datasets: []
    };
  }

  componentWillMount() {
    this.props.setSelectedDatasetId(undefined);
    this.props.setSelectedDatasetId(undefined);
  }

  componentDidMount() {
    this.props.getProjectsForSelect();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.projects) {
      if (nextProps.projects.select)
        this.setState({ projects: nextProps.projects.select });
    }

    if (nextProps.dataset) {
      if (nextProps.dataset.select)
        this.setState({ datasets: nextProps.dataset.select });
    }
  }

  projectSelectOnChange = e => {
    this.setState({ selectedProject: e });
    this.props.datasetForSelectByProjectId(e.value);
    this.props.setSelectedDatasetId(undefined);
  };

  datasetSelectOnChange = e => {
    this.setState({ selectedDataset: e });
    this.props.setSelectedDatasetId(e.value);
  };

  render() {
    return (
      <div className=" row col s12 l12">
        <ReactSelect
          id="project"
          value={this.state.selectedProject}
          options={this.state.projects}
          onChange={this.projectSelectOnChange}
          placeholder="Select a Project"
          className="col s12 l6"
        />
        {this.state.selectedProject ? (
          <ReactSelect
            id="dataset"
            value={this.selectedProject}
            options={this.state.datasets}
            onChange={this.datasetSelectOnChange}
            placeholder="Select a Dataset"
            className="col s12 l6"
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

DatasetSelect.propTypes = {
  getProjectsForSelect: PropTypes.func.isRequired,
  datasetForSelectByProjectId: PropTypes.func.isRequired,
  setSelectedDatasetId: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  projects: state.projects,
  dataset: state.dataset
});

export default connect(
  mapStateToProps,
  { getProjectsForSelect, setSelectedDatasetId, datasetForSelectByProjectId }
)(DatasetSelect);
