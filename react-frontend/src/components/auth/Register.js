import React, { Component } from "react";
import { connect } from "react-redux";
import { registerAdmin } from "../../redux/actions/auth/authActions";
import PropTypes from "prop-types";
import classNames from "classnames";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSuperUser: false,
      name: "",
      password: "",
      confirmPassword: "",
      email: "",
      errors: {
        name: "",
        password: "",
        confirmPassword: "",
        email: ""
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      if (typeof nextProps.errors === "object") {
        this.setState({ errors: nextProps.errors });
      }
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    const newAdmin = {
      isSuperUser: this.state.isSuperUser,
      name: this.state.name,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      email: this.state.email
    };

    this.props.registerAdmin(newAdmin);
  };

  render() {
    return (
      <div className="container ">
        <h5 className="card-panel col s10 offset-s1 l6 offset-l3">
          Register an administrator to manage the website.
        </h5>
        {/*name*/}
        <div className="row">
          <div className="row">
            <div className="input-field col s10 offset-s1 l6 offset-l3">
              <input
                id="name"
                value={this.state.name}
                onChange={this.onChange}
                type="text"
                className={classNames("validate ", {
                  invalid: this.state.errors.name
                })}
              />
              <label htmlFor="name">Name</label>
              <span
                className="helper-text"
                data-error={this.state.errors.name}
              />
            </div>
          </div>
        </div>
        {/*email*/}
        <div className="row">
          <div className="row">
            <div className="input-field col s10 offset-s1 l6 offset-l3">
              <input
                id="email"
                value={this.state.email}
                onChange={this.onChange}
                type="email"
                className={classNames("validate ", {
                  invalid: this.state.errors.email
                })}
              />
              <label htmlFor="email">Email</label>
              <span
                className="helper-text"
                data-error={this.state.errors.email}
              />
            </div>
          </div>
        </div>
        {/*password*/}
        <div className="row">
          <div className="row">
            <div className="input-field col s10 offset-s1 l6 offset-l3">
              <input
                id="password"
                value={this.state.password}
                onChange={this.onChange}
                type="password"
                className={classNames("validate ", {
                  invalid: this.state.errors.password
                })}
              />
              <label htmlFor="password">Password</label>
              <span
                className="helper-text"
                data-error={this.state.errors.password}
              />
            </div>
          </div>
        </div>
        {/*confirmPassword*/}
        <div className="row">
          <div className="row">
            <div className="input-field col s10 offset-s1 l6 offset-l3">
              <input
                id="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.onChange}
                type="password"
                className={classNames("validate ", {
                  invalid: this.state.errors.confirmPassword
                })}
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <span
                className="helper-text"
                data-error={this.state.errors.confirmPassword}
              />
            </div>
          </div>
        </div>
        {/*isSuperUser*/}
        <div className="row">
          <div className="switch">
            <label>
              Admin
              <input
                type="checkbox"
                value={this.state.isSuperUser}
                name="isSuperUser"
                onClick={e => {
                  this.setState({ [e.target.name]: !this.state.isSuperUser });
                }}
              />
              <span className="lever" />
              SuperUser
            </label>
          </div>
          <p className="row col s10 offset-s1 l6 offset-l3">
            Admins have restricted controls, SuperUsers have full control over
            the website.
          </p>
        </div>
        <button
          className="btn waves-effect waves-light light-blue accent-4"
          onClick={this.onSubmit}
        >
          Submit
          <i className="material-icons right">send</i>
        </button>
      </div>
    );
  }
}

Register.propTypes = {
  registerAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerAdmin }
)(Register);
