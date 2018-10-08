import React, { Component } from "react";
import Id from "valid-objectid";
import PropTypes from "prop-types";
import ReactSelect from "react-select";
import { connect } from "react-redux";

import {
  getGridFSForSelect,
  setSelectedGridFS
} from "../../redux/actions/gridfs/gridfsActions";

class GridFSSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: this.props.selectedDataset || "",
      options: [],
      selected: {}
    };
  }
  componentDidMount() {
    this.invokeGridFSSelect(this.props.selectedDataset);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedDataset) {
      this.setState({ dataset: nextProps.selectedDataset });
      if (this.state.dataset !== nextProps.selectedDataset) {
        this.invokeGridFSSelect(nextProps.selectedDataset);
      }
    }
    if (nextProps.gridfs) {
      if (nextProps.gridfs.select)
        this.setState({ options: nextProps.gridfs.select });
    }
  }

  invokeGridFSSelect = id => {
    if (Id.isValid(id)) {
      if (this.state.dataset !== id) {
        this.props.getGridFSForSelect(id);
      }
    }
  };

  onChange = e => {
    this.setState({ selected: e });
    this.props.setSelectedGridFS(e.value);
  };

  componentWillUnmount() {
    this.props.setSelectedGridFS(undefined);
  }

  render() {
    return (
      <div className="col s12 l12">
        <ReactSelect
          value={this.state.selected}
          onChange={this.onChange}
          options={this.state.options}
          placeholder="Select file to remove"
        />
      </div>
    );
  }
}

GridFSSelect.propTypes = {
  selectedDataset: PropTypes.string
};

const mapStateToProps = state => ({
  gridfs: state.gridfs
});

export default connect(
  mapStateToProps,
  { getGridFSForSelect, setSelectedGridFS }
)(GridFSSelect);
