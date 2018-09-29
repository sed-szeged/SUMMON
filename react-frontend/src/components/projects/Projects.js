import React, { Component } from "react";
import DatasetSelect from "../layout/common/DatasetSelect";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      param: ""
    };
  }

  render() {
    return (
      <div>
        {this.props.match.params.projectType}
        <DatasetSelect />
      </div>
    );
  }
}

export default Projects;
