import React, { Component } from "react";

class Login extends Component {
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
              <input id="email" type="email" className="validate" />
              <label htmlFor="email">Email</label>
              <span
                className="helper-text"
                data-error="wrong"
                data-success="right"
              />
            </div>
          </div>
        </div>

        <div className="row ">
          <div className="row ">
            <div className="input-field col s10 offset-s1 l6 offset-l3">
              <input id="password" type="password" className="validate " />
              <label htmlFor="password">Password</label>
              <span
                className="helper-text"
                data-error="wrong"
                data-success="right"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
