import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { datasetTypeAdd } from "../../redux/actions/datasetType/datasetTypeActions";

class DatasetTypeAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      errors: { name: "" }
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    const newDatasetType = {
      name: this.state.name
    };
    this.props.datasetTypeAdd(newDatasetType);
  };

  render() {
    return (
      <div className="row">
        <h5 className="row">Add a Dataset Type</h5>
        <div className="row">
          <div className="col s1 l1" />
          <div className="input-field col s12 l5">
            <input
              value={this.state.name}
              onChange={this.onChange}
              type="text"
              id="name"
              className={classNames("validate ", {
                invalid: this.state.errors.name
              })}
            />
            <label htmlFor="name">Name</label>
            <span className="helper-text" data-error={this.state.errors.name} />
          </div>
          <button onClick={this.onSubmit} className="btn light-blue accent-4">
            Add
          </button>
        </div>
      </div>
    );
  }
}

DatasetTypeAdd.propTypes = {
  datasetTypeAdd: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  datasetType: state.datasetType,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { datasetTypeAdd }
)(DatasetTypeAdd);
