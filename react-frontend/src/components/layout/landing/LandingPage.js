import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Parallax } from "react-materialize";

import indexCSS from "../../../index.css";
import dom from "../../../images/dom.jpg";
import dom1 from "../../../images/dom1.jpg";
import dom2 from "../../../images/dom2.jpg";
import unsplash from "../../../images/particle.png";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <header className={indexCSS.header} />
        <section className="container section">
          {/* Section img - 1 */}
          <div className="row">
            <div className="col s12 l4">
              <img
                src={dom}
                alt="Szeged Cathedral"
                className="responsive-img"
              />
            </div>
            <div className="col s12 l6 offset-l1 left-align">
              <h2 className="">IoT Dataset</h2>
              <p>This website was created to share and collect IoT datasets.</p>
            </div>
          </div>
          {/* Section img - 2 */}
          <div className="row">
            <div className="col s12 l4 offset-l1 push-l7">
              <img
                src={dom1}
                alt="Szeged Cathedral"
                className="responsive-img"
              />
            </div>
            <div className="col s12 l6  pull-l5 left-align ">
              <h2 className="">Projects</h2>
              <p>
                Discover the 3 different types of projects,{" "}
                <Link to="/projects/smartcity">Smart Cities</Link>
                {", "}
                <Link to="/projects/organization">Organizations</Link>
                {", "}
                <Link to="/projects/university">Universities</Link>
              </p>
            </div>
          </div>
          {/* Section img - 3 */}
          <div className="row">
            <div className="col s12 l4">
              <img
                src={dom2}
                alt="Szeged Cathedral"
                className="responsive-img"
              />
            </div>
            <div className="col s12 l6 offset-l1 left-align">
              <h2 className="">University of Szeged</h2>
              <p>
                Visit{" "}
                <a
                  href="https://www.u-szeged.hu/english"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  University of Szeged
                </a>{" "}
                and the{" "}
                <a
                  href="http://www.sed.inf.u-szeged.hu/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Department of Software Engeenering
                </a>
              </p>
            </div>
          </div>
        </section>
        <div className="parallax-container">
          <div className="parallax">
            <Parallax
              className="responsive-img"
              imageSrc={unsplash}
              alt="material"
            />
          </div>
        </div>
      </div>
    );
  }
}
export default LandingPage;
