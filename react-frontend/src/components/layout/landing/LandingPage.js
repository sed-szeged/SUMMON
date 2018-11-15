import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Parallax } from "react-materialize";

import indexCSS from "../../../index.css";
import measure from "../../../images/measure.jpeg";
import skyscraper from "../../../images/skyscraper.jpeg";
import dom2 from "../../../images/dom2.jpg";
import unsplash from "../../../images/particle.png";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <header className={indexCSS.header}>
          <div className="row valign-wrapper">
            <div className="col l1" />
            <div className="col l10">
              <h3 className="white-text">
                Smart city Usage data Management and MONitoring
              </h3>
            </div>
            <div className="col l1" />
          </div>
        </header>
        <section className="container section">
          {/* Section img - 1 */}
          <div className="row">
            <div className="col s12 l4">
              <img
                src={measure}
                alt="Szeged Cathedral"
                className="responsive-img"
              />
            </div>
            <div className="col s12 l6 offset-l1 left-align">
              <h2 className="">IoT Dataset</h2>
              <p>
                The idea of this IoT sensor trace archive was born in the frame
                of the project called Internet of Living Things supported by the
                Hungarian Government and the European Regional Development Fund
                under the grant number GINOP-2.3.2-15-2016-00037. The goal of
                this website to collect and share datasets monitored or measured
                by public IoT services or applications.
              </p>
            </div>
          </div>
          {/* Section img - 2 */}
          <div className="row">
            <div className="col s12 l4 offset-l1 push-l7">
              <img
                src={skyscraper}
                alt="Szeged Cathedral"
                className="responsive-img"
              />
            </div>
            <div className="col s12 l6  pull-l5 left-align ">
              <h2 className="">Projects</h2>
              <p>
                In this site we group the datasets by their projects of origin,
                which are categorized by{" "}
                <Link to="/projects/smartcity">Smart Cities</Link>
                {", "}
                <Link to="/projects/organization">Organizations</Link>
                {" and "}
                <Link to="/projects/university">Universities</Link>. Here we
                note that we do not own the data; we refer to the project sites,
                which we used to analyze their publicly published open data.
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
              <h2 className="">Who we are</h2>
              <p>
                We are a group of researchers at the{" "}
                <a
                  href="http://www.sed.inf.u-szeged.hu/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Software Engineering Department
                </a>{" "}
                of the University of Szeged. Feel free to contact us for
                questions or suggestions to improve this site or extend our
                datasets. If you use one of these datasets please cite one of
                our related publications:
              </p>
              <p>
                - A. Kertesz, T. Pﬂanzner, T. Gyimothy:{" "}
                <a
                  href="https://doi.org/10.1007/s10723-018-9468-9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  A Mobile IoT Device Simulator for IoT-Fog-Cloud Systems.
                  Journal of Grid Computing. 2018.
                </a>{" "}
              </p>
              <p>
                - T. Pflanzner, K. Zs. Leszko and A. Kertesz, SUMMON: Gathering
                Smart City Data to Support IoT-Fog-Cloud Simulations. In proc.
                of the Third International Conference on Fog and Mobile Edge
                Computing (FMEC), IEEE, 2018.
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
