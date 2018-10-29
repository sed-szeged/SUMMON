import React, { Component } from "react";

import ContentContainer from "../layout/common/ContentContainer";
import LeftSidePanel from "../layout/common/LeftSidePanel";
import RightSidePanel from "../layout/common/RightSidePanel";

import DatasetAdd from "./DatasetAdd";
import DatasetManage from "./DatasetManage";

class DatasetAdmin extends Component {
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
          <div className="row container">
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
            <div className="row">
              {this.state.bool ? <DatasetAdd /> : <DatasetManage />}
            </div>
          </div>
        </ContentContainer>
        <RightSidePanel />
      </div>
    );
  }
}

export default DatasetAdmin;
