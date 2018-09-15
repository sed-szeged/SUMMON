import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutAdmin } from "../../../redux/actions/auth/authActions";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutAdmin();
  };

  render() {
    const { isAuthenticated, admin } = this.props.auth;

    const authLinks = (
      <ul className="right hide-on-med-and-down">
        <li>
          <a onClick={this.onLogoutClick}>Logout</a>
        </li>
      </ul>
    );

    return (
      <div>
        <nav>
          <div className="nav-wrapper  blue darken-4">
            <a href="#!" className="brand-logo">
              IoT Datasets
            </a>
            <a
              href="#!"
              data-target="mobile-sidebar"
              className="sidenav-trigger"
            >
              <i className="material-icons">menu</i>
            </a>
            <ul className="left hide-on-med-and-down">
              <li>
                <a href="sass.html">Sass</a>
              </li>
            </ul>
            {isAuthenticated ? authLinks : null}
          </div>
        </nav>

        <ul className="sidenav" id="mobile-sidebar">
          <li>
            <a href="sass.html">Sass</a>
          </li>
        </ul>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutAdmin }
)(Navbar);
