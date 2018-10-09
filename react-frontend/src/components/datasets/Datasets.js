import React, { Component } from "react";
import { connect } from "react-redux";

import LeftSidePanel from "../layout/common/LeftSidePanel";
import RightSidePanel from "../layout/common/RightSidePanel";
import ContentContainer from "../layout/common/ContentContainer";
import { getProjectAndDatasetsById } from "../../redux/actions/dataset/datasetActions";
import ProjectCard from "../projects/ProjectCard";
import DatasetTable from "./DatasetsTable";

class Datasets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {},
      datasets: [],
      project_ID: ""
    };
  }

  componentDidMount() {
    this.setState({ project_ID: this.props.match.params.id }, () => {
      this.getProjectAndDatasetsById();
    });
  }

  componentDidUpdate() {
    if (this.props.match.params.id !== this.state.project_ID) {
      this.setState({ project_ID: this.props.match.params.id }, () => {
        this.getProjectAndDatasetsById();
      });
    }
  }

  getProjectAndDatasetsById = () => {
    this.props.getProjectAndDatasetsById(this.state.project_ID).then(res => {
      this.setState({ datasets: res.datasets, project: res.project });
    });
  };

  render() {
    return (
      <div className="row">
        <LeftSidePanel />
        <ContentContainer>
          <div className="row">
            <ProjectCard project={this.state.project} />
          </div>
          <div className="row">
            <hr />
          </div>
          <div className="row">
            <h5>Datasets</h5>
          </div>
          <div className="row">
            <DatasetTable datasets={this.state.datasets} />
          </div>
        </ContentContainer>
        <RightSidePanel />
      </div>
    );
  }
}
export default connect(
  null,
  { getProjectAndDatasetsById }
)(Datasets);
