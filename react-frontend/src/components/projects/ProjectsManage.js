import React, { Component } from "react";
import ReactSelect from "react-select";
import classNames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { notify } from "react-notify-toast";
import { Modal, Button } from "react-materialize";
import {
  updateProject,
  getProject,
  getProjectsForSelect,
  removeProjectById,
  setProjectUndefined
} from "../../redux/actions/project/projectActions";
import { setErrorToInitialState } from "../../redux/actions/error/errorActions";
import projectTypes from "../../utils/constants/ProjectTypes";
import isEmpty from "../../utils/isEmpty";

class ProjectsManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      country: "",
      location: "",
      website: "",
      description: "",
      projects: [],
      selectedProject: "",
      errors: {
        name: "",
        country: "",
        location: "",
        website: "",
        description: "",
        projectType: ""
      },
      projectTypes,
      selectedProjectType: {},
      project: {
        _id: "",
        name: "",
        country: "",
        location: "",
        website: "",
        description: ""
      },
      err: false
    };
    this.props.setErrorToInitialState();
  }
  onRemove = e => {
    if (this.state.selectedProject) {
      this.props.removeProjectById(this.state.selectedProject.value);
    } else {
      notify.show("You must select a project", "error");
    }
  };

  setProjectType = (projectTypeParam = "smartcity") => {
    this.setState({
      selectedProjectType: this.state.projectTypes[
        this.state.projectTypes.findIndex(
          projectType => projectType.value === projectTypeParam
        )
      ]
    });
  };

  componentDidMount() {
    this.props.getProjectsForSelect();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.projects) {
      if (nextProps.projects.select)
        this.setState({ projects: nextProps.projects.select });
      if (nextProps.projects.project) {
        this.setState({ project: nextProps.projects.project });
        this.setProjectType(nextProps.projects.project.projectType);
      }
    }
    if (nextProps.errors) {
      if (this.state.err) {
        let msg = nextProps.errors[Object.keys(nextProps.errors)[0]];
        if (msg) notify.show(msg, "error");
      }
      this.setState({ errors: nextProps.errors, err: true });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    const updateProject = {
      projectType: this.state.selectedProjectType.value,
      name: this.state.name || this.state.project.name,
      website: this.state.website || this.state.project.website,
      country: this.state.country || this.state.project.country,
      location: this.state.location || this.state.project.location,
      description: this.state.description || this.state.project.description
    };
    if (isEmpty(this.state.selectedProject)) {
      notify.show("You need to select a project to update.", "error");
    } else {
      this.props.updateProject(this.state.project._id, updateProject);
    }
  };

  componentWillUnmount() {
    this.props.setProjectUndefined();
  }

  handleSelectOnChangeProject = e => {
    this.props.getProject(e.value);
    this.setState({ selectedProject: e });
  };

  render() {
    return (
      <div className="">
        <div className="col s12 l12">
          <div className="container">
            <h5 className="col s12 l6">Select a Project</h5>
            <div className="input-field col  s12 l12">
              <ReactSelect
                value={this.state.selectedProject}
                options={this.state.projects}
                onChange={this.handleSelectOnChangeProject}
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
          </div>
          {/*name*/}
          <div className="input-field col s12 l6">
            <input
              id="name"
              type="text"
              value={this.state.name}
              onChange={this.onChange}
              className={classNames("validate ", {
                invalid: this.state.errors.name !== undefined
              })}
            />
            <label htmlFor="name">Name</label>
            <span className="helper-text" data-error={this.state.errors.name}>
              {this.state.project.name}
            </span>
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
            >
              {" "}
              {this.state.project.website}
            </span>
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
            >
              {" "}
              {this.state.project.country}
            </span>
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
            >
              {" "}
              {this.state.project.location}
            </span>
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
            >
              {" "}
              {this.state.project.description}
            </span>
          </div>

          {/*projectType*/}
          <div className="input-field col s12 l6">
            <ReactSelect
              value={this.state.selectedProjectType}
              options={this.state.projectTypes}
              onChange={e => this.setState({ selectedProjectType: e })}
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
        </div>
        <div className="row">
          <div className="col l6 s6">
            <a
              className="waves-effect waves-light btn light-blue accent-4"
              onClick={this.onSubmit}
            >
              Update
            </a>
          </div>
          <div className="col l6 s6">
            <Modal
              header="Are you sure you want to remove the selected project?"
              trigger={
                <Button className="btnwaves-effect waves-light red accent-2 modal-trigger">
                  Remove
                  <i className="material-icons right">launch</i>
                </Button>
              }
            >
              <Button
                onClick={this.onRemove}
                className="btnwaves-effect waves-light red accent-2 modal-trigger"
              >
                Remove <i className="material-icons right">delete</i>
              </Button>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

ProjectsManage.propTypes = {
  updateProject: PropTypes.func.isRequired,
  getProject: PropTypes.func.isRequired,
  getProjectsForSelect: PropTypes.func.isRequired
  // errors: PropTypes.Object,
  //project: PropTypes.Object
};

const mapStateToProps = state => ({
  errors: state.errors,
  projects: state.projects
});

export default connect(
  mapStateToProps,
  {
    updateProject,
    getProject,
    getProjectsForSelect,
    setErrorToInitialState,
    removeProjectById,
    setProjectUndefined
  }
)(ProjectsManage);
