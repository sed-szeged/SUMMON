import React from "react";
import { Link } from "react-router-dom";
export default props => {
  if (!props.project) {
    return <h6>No Porject Table to display</h6>;
  } else {
    return (
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Location</th>
            <th>Created</th>
            <th>Project Type</th>
            <th>Website</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{props.project.country}</td>
            <td>{props.project.location}</td>
            <td>{props.project.created}</td>
            <td>
              <Link
                className="grey-text"
                to={"/projects/" + props.project.projectType}
              >
                {props.project.projectType}
              </Link>
            </td>
            <td>
              {" "}
              <a
                className="grey-text"
                href={props.project.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
};
