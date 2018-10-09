import React, { Component } from "react";
import { connect } from "react-redux";

import LeftSidePanel from "../layout/common/LeftSidePanel";
import RightSidePanel from "../layout/common/RightSidePanel";
import ContentContainer from "../layout/common/ContentContainer";
import DatasetsTable from "./DatasetsTable";

import { getDatasetsByDatasetTypeId } from "../../redux/actions/dataset/datasetActions";

class DatasetByType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datasetTypeId: "",
      datasets: []
    };
  }

  componentDidMount() {
    this.setState({ datasetTypeId: this.props.match.params.id }, () => {
      this.getDatasetsByDatasetTypeId();
    });
  }

  componentDidUpdate() {
    if (this.props.match.params.id !== this.state.datasetTypeId) {
      this.setState({ datasetTypeId: this.props.match.params.id }, () => {
        this.getDatasetsByDatasetTypeId();
      });
    }
  }

  getDatasetsByDatasetTypeId = () => {
    this.props
      .getDatasetsByDatasetTypeId(this.state.datasetTypeId)
      .then(res => {
        this.setState({ datasets: res });
      });
  };

  render() {
    return (
      <div className="row">
        <LeftSidePanel />
        <ContentContainer>
          <DatasetsTable datasets={this.state.datasets} />
        </ContentContainer>
        <RightSidePanel />
      </div>
    );
  }
}

export default connect(
  null,
  { getDatasetsByDatasetTypeId }
)(DatasetByType);
