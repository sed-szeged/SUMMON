import React, { Component } from "react";

import LeftSidePanel from "../layout/common/LeftSidePanel";
import ContentContainer from "../layout/common/ContentContainer";
import RightSidePanel from "../layout/common/RightSidePanel";
import RequestQueryAdd from "./RequestQueryAdd";

class RequestQueryAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bool: true
    };
  }
  render() {
    return (
      <div className="row">
        <div className="row" />
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
          </div>
          {this.state.bool ? <RequestQueryAdd /> : "manage"}
        </ContentContainer>
        <RightSidePanel />
      </div>
    );
  }
}

export default RequestQueryAdmin;
