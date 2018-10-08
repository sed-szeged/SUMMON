import React from "react";

import indexCSS from "../../../index.css";

export default () => {
  return (
    <footer className={"page-footer grey darken-3 footer " + indexCSS.footer}>
      <div className="container">
        <div className="row">
          <div className="col s12 l6">
            <h5>IoT Datasets</h5>
            <p>This is a website.....</p>
          </div>
          <div className="col s12 l4 offset-l2">
            <h5>Contact us</h5>
            <ul>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://www.u-szeged.hu/english"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  University of Szeged
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright grey darken-3">
        <div className="container center-align">&copy; SZTE</div>
      </div>
    </footer>
  );
};
