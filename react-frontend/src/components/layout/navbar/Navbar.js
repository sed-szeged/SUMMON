import React, { Component } from "react";

class Navbar extends Component {
  render() {
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
              <li>
                <a href="badges.html">Components</a>
              </li>
              <li>
                <a href="collapsible.html">Javascript</a>
              </li>
              <li>
                <a href="mobile.html">Mobile</a>
              </li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-sidebar">
          <li>
            <a href="sass.html">Sass</a>
          </li>
          <li>
            <a href="badges.html">Components</a>
          </li>
          <li>
            <a href="collapsible.html">Javascript</a>
          </li>
          <li>
            <a href="mobile.html">Mobile</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
