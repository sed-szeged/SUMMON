import React from "react";

import indexCSS from "../../../index.css";

export default () => {
  return (
    <footer className={"page-footer grey darken-3 footer " + indexCSS.footer}>
      <div className="container">
        <div className="row">
          <div className="col s12 l12">
            <h5>Contact us</h5>
            <p>
              <a href="mailto:iolt@sed.hu" target="_top">
                Internet of Living Things project
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="footer-copyright grey darken-3">
        <div className="container center-align">
          &copy; Software Engineering Department, University of Szeged
        </div>
      </div>
    </footer>
  );
};
