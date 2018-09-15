import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginAdmin } from "../../redux/actions/auth/authActions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {
        email: "",
        password: ""
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    const admin = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginAdmin(admin);
  };

  render() {
    return (
      <div className="container">
        <p className="card-panel row s12 l6">
          DO NOT try to login without permission of
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.sed.inf.u-szeged.hu/"
          >
            {" "}
            Department of Software Engineering
          </a>
          {", "}
          University of Szeged
        </p>
        <div className="row">
          <div className="row">
            <div className="input-field col s10 offset-s1 l6 offset-l3">
              <input
                value={this.state.email}
                onChange={this.onChange}
                id="email"
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

        <div className="row ">
          <div className="row ">
            <div className="input-field col s10 offset-s1 l6 offset-l3">
              <input
                value={this.state.password}
                onChange={this.onChange}
                id="password"
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

Login.propTypes = {
  loginAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginAdmin }
)(Login);
