import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { notify } from "react-notify-toast";
import ReactSelect from "react-select";
import projectTypes from "../../utils/constants/ProjectTypes";

import { projectAdd } from "../../redux/actions/project/projectActions";
import { setErrorToInitialState } from "../../redux/actions/error/errorActions";

class ProjectsAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      country: "",
      location: "",
      website: "",
      description: "",
      selectedProjectType: "",
      errors: {
        name: "",
        country: "",
        location: "",
        website: "",
        description: "",
        projectType: ""
      }
    };
    this.props.setErrorToInitialState();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      if (nextProps.errors.description)
        notify.show(nextProps.errors.description, "error");
      if (nextProps.errors.projectType)
        notify.show(nextProps.errors.projectType, "error");
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSelectOnChange = e => {
    this.setState({ selectedProjectType: e });
  };

  onSubmit = e => {
    const newProject = {
      name: this.state.name,
      location: this.state.location,
      country: this.state.country,
      website: this.state.website,
      description: this.state.description,
      projectType: this.state.projectType
    };

    this.props.projectAdd(newProject);
  };

  render() {
    return (
      <div className="">
        <h5>Add a New Project</h5>
        {/*name*/}
        <div className="input-field col s12 l6">
          <input
            id="name"
            type="text"
            value={this.state.name}
            onChange={this.onChange}
            className={classNames("validate ", {
              invalid: this.state.errors.name
            })}
          />
          <label htmlFor="name">Name</label>
          <span className="helper-text" data-error={this.state.errors.name} />
        </div>

        {/*website*/}
        <div className="input-field col s12 l6">
          <input
            id="website"
            type="text"
            value={this.state.website}
            onChange={this.onChange}
            className={classNames("validate ", {
              invalid: this.state.errors.website
            })}
          />
          <label htmlFor="website">Website</label>
          <span
            className="helper-text"
            data-error={this.state.errors.website}
          />
        </div>

        {/*country*/}
        <div className="input-field col s12 l6">
          <input
            id="country"
            type="text"
            value={this.state.country}
            onChange={this.onChange}
            className={classNames("validate ", {
              invalid: this.state.errors.country
            })}
          />
          <label htmlFor="country">Country</label>
          <span
            className="helper-text"
            data-error={this.state.errors.country}
          />
        </div>

        {/*location*/}
        <div className="input-field col s12 l6">
          <input
            id="location"
            type="text"
            value={this.state.location}
            onChange={this.onChange}
            className={classNames("validate ", {
              invalid: this.state.errors.location
            })}
          />
          <label htmlFor="location">Location</label>
          <span
            className="helper-text"
            data-error={this.state.errors.location}
          />
        </div>

        {/*description*/}
        <div className="input-field col s12 l6">
          <textarea
            id="description"
            type="text"
            value={this.state.description}
            onChange={this.onChange}
            className={classNames("validate ", {
              invalid: this.state.errors.description
            })}
          />
          <label htmlFor="description">Description</label>
          <span
            className="helper-text"
            data-error={this.state.errors.description}
          />
        </div>

        {/*projectType*/}
        <div className="input-field col s12 l6">
          <ReactSelect
            value={this.state.selectedProjectType}
            options={projectTypes}
            onChange={this.handleSelectOnChange}
            className={classNames("validate ", {
              invalid: this.state.errors.projectType
            })}
          />
          <span
            className="helper-text"
            htmlFor="projectType"
            data-error={this.state.errors.projectType}
          />
        </div>
        <a
          className="waves-effect waves-light btn light-blue accent-4"
          onClick={this.onSubmit}
        >
          Submit
        </a>
      </div>
    );
  }
}

ProjectsAdd.propTypes = {
  projectAdd: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { projectAdd, setErrorToInitialState }
)(ProjectsAdd);
