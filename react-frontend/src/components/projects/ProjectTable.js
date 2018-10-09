import React from "react";
import { Link } from "react-router-dom";

export default props => {
  const displayProjectsBody = props.projects.map((project, index) => {
    return (
      <tr key={index}>
        <td>{project.name}</td>
        <td>
          {" "}
          <a
            className="grey-text"
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            Website
          </a>
        </td>
        <td>
          <Link className="grey-text" to={"/datasets/" + project._id}>
            Dataset
          </Link>
        </td>
        <td>{project.location}</td>
        <td>{project.country}</td>
      </tr>
    );
  });

  if (props.projects.length === 0) {
    return <h2>No Projects</h2>;
  } else {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Website</th>
            <th>Datasets</th>
            <th>Location</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>{displayProjectsBody}</tbody>
      </table>
    );
  }
};
