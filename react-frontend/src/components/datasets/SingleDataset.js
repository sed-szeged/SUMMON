import React, { Component } from "react";
import { connect } from "react-redux";

import LeftSidePanel from "../layout/common/LeftSidePanel";
import RightSidePanel from "../layout/common/RightSidePanel";
import ContentContainer from "../layout/common/ContentContainer";
import DatasetCard from "./DatasetCard";
import Chartjs2ArrayDisplay from "../chartjs2/Chartjs2ArrayDisplay";
import Gridfs from "../gridfs/Gridfs";
import RequestQueryTable from "../requestQuery/RequestQueryTable";

import { getDatasetAndItsDataById } from "../../redux/actions/dataset/datasetActions";

class SingleDataset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset_ID: "",
      dataset: {},
      chartjs2: [],
      gridfs: [],
      requestQueries: []
    };
  }

  componentDidMount() {
    this.setState({ dataset_ID: this.props.match.params.id }, () => {
      this.getDatasetAndItsDataById(this.props.match.params.id);
    });
  }

  componentDidUpdate() {
    if (this.state.dataset_ID !== this.props.match.params.id) {
      this.setState({ dataset_ID: this.props.match.params.id }, () => {
        this.props.getDatasetAndItsDataById();
      });
    }
  }

  getDatasetAndItsDataById = (id = this.state.dataset_ID) => {
    this.props.getDatasetAndItsDataById(id).then(res => {
      if (res.dataset) {
        this.setState({ dataset: res.dataset });
      }
      if (res.chartjs2) {
        this.setState({ chartjs2: res.chartjs2 });
      }
      if (res.gridfs) {
        this.setState({ gridfs: res.gridfs });
      }
      if (res.requestQueries) {
        this.setState({ requestQueries: res.requestQueries });
      }
    });
  };

  render() {
    if (this.state.dataset) {
      return (
        <div className="row">
          <LeftSidePanel />
          <ContentContainer>
            <div className="row">
              <DatasetCard dataset={this.state.dataset} />
            </div>
            <div className="row">
              <Chartjs2ArrayDisplay chartjs2={this.state.chartjs2} />
            </div>
            <div className="row">
              <Gridfs gridfs={this.state.gridfs} />
            </div>
            <div className="row">
              <hr />
              <h4>Request Query</h4>
              <RequestQueryTable requestQuery={this.state.requestQueries} />
            </div>
          </ContentContainer>
          <RightSidePanel />
        </div>
      );
    } else {
      return (
        <div className="row">
          <LeftSidePanel />
          <ContentContainer>
            <h4>No dataset for the provided ID</h4>
          </ContentContainer>
          <RightSidePanel />
        </div>
      );
    }
  }
}
export default connect(
  null,
  { getDatasetAndItsDataById }
)(SingleDataset);
