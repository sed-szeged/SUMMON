import React, { Component } from "react";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      param: ""
    };
  }

  render() {
    return <div>{this.props.match.params.projectType}</div>;
  }
}

export default Projects;
