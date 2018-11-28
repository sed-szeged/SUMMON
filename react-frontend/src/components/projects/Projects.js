import React, { Component } from "react";
import { connect } from "react-redux";

import LeftSidePanel from "../layout/common/LeftSidePanel";
import RightSidePanel from "../layout/common/RightSidePanel";
import ContentContainer from "../layout/common/ContentContainer";
import ProjectTable from "./ProjectTable";

import { getProjectByType } from "../../redux/actions/project/projectActions";

import projectTypes from "../../utils/constants/projectTypes.json";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectType: "",
      projects: []
    };
  }

  componentDidMount() {
    this.setState({ projectType: this.props.match.params.projectType }, () => {
      this.getProject();
    });
  }

  componentDidUpdate() {
    if (this.state.projectType !== this.props.match.params.projectType) {
      this.setState({ projectType: this.props.match.params.projectType });
      this.getProject();
    }
  }

  getProject = () => {
    this.props
      .getProjectByType(projectTypes[this.props.match.params.projectType])
      .then(res => {
        this.setState({ projects: res });
      });
  };

  render() {
    return (
      <div className="row">
        <LeftSidePanel />
        <ContentContainer>
          <div className="row">
            <h4>Projects by {this.props.match.params.projectType}</h4>
          </div>
          <ProjectTable projects={this.state.projects} />
        </ContentContainer>
        <RightSidePanel />
      </div>
    );
  }
}

export default connect(
  null,
  { getProjectByType }
)(Projects);
