import React, { Component } from "react";
import { connect } from "react-redux";
import ReactSelect from "react-select";

import {
  getRequestQueryForSelect,
  getRequestQueryById
} from "../../redux/actions/requestQuery/requestQueryActions";

class RequestQuerySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: this.props.dataset_id || "",
      options: [],
      selected: {}
    };
  }

  componentDidMount() {
    if (this.props.dataset)
      this.props.getRequestQueryForSelect(this.state.dataset);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.requestQuery) {
      if (nextProps.requestQuery.select)
        this.setState({ options: nextProps.requestQuery.select });
    }
    if (nextProps.dataset) {
      if (nextProps.dataset !== this.state.dataset) {
        this.setState({ dataset: nextProps.dataset }, () => {
          this.props.getRequestQueryForSelect(this.state.dataset);
        });
      }
    }
  }

  onSelectChange = e => {
    this.setState({ selected: e });
    this.props.getRequestQueryById(e.value);
  };

  render() {
    return (
      <div>
        <ReactSelect
          value={this.state.selected}
          options={this.state.options}
          placeholder="Select a Request Query"
          onChange={this.onSelectChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  requestQuery: state.requestQuery,
  dataset: state.dataset.selected
});
export default connect(
  mapStateToProps,
  {
    getRequestQueryForSelect,
    getRequestQueryById
  },
  null,
  { withRef: true }
)(RequestQuerySelect);
