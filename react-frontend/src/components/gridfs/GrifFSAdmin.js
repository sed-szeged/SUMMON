import React, { Component } from "react";

import LeftSidePanel from "../layout/common/LeftSidePanel";
import RightSidePanel from "../layout/common/RightSidePanel";
import ContentContainer from "../layout/common/ContentContainer";

import GridFSAdd from "./GridFSAdd";

class GrifFSAdmin extends Component {
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
          </div>
          <div className="col s12 l12">
            {this.state.bool ? <GridFSAdd /> : <div>manage</div>}
          </div>
        </ContentContainer>
        <RightSidePanel />
      </div>
    );
  }
}
const mapStateToProps = state => ({});

export default GrifFSAdmin;
