import React, { Component } from "react";

import LeftSidePanel from "../layout/common/LeftSidePanel";
import RightSidePanel from "../layout/common/RightSidePanel";
import ContentContainer from "../layout/common/ContentContainer";
import Chartjs2Add from "./Chartjs2Add";
import Chartjs2Manage from "./Chartjs2Manage";

class Chartjs2Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bool: true
    };
  }
  render() {
    return (
      <div className="row">
        <LeftSidePanel />
        <ContentContainer>
          {" "}
          <div className="row">
            <div className="col s6 l6">
              <a
                className="waves-effect waves-teal btn-flat"
                onClick={() => {
                  this.setState({ bool: true });
                }}
              >
                Add
              </a>
            </div>
            <div className="col s6 l6">
              <a
                className="waves-effect waves-teal btn-flat"
                onClick={() => {
                  this.setState({ bool: false });
                }}
              >
                Manage
              </a>
            </div>
            {this.state.bool ? <Chartjs2Add /> : <Chartjs2Manage />}
          </div>
        </ContentContainer>
        <RightSidePanel />
      </div>
    );
  }
}
export default Chartjs2Admin;
