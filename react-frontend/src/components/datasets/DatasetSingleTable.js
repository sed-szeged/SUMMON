import React from "react";
import { Link } from "react-router-dom";

export default props => {
  if (!props.dataset) {
    return <h4>No Dataset Table to display</h4>;
  } else {
    const datasetType = Object.assign({}, props.dataset.datasetType);
    return (
      <table>
        <thead>
          <tr>
            <th>Website</th>
            <th>Dataset Type</th>
            <th>Project</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {props.dataset.website ? (
                <a
                  className="grey-text"
                  href={props.dataset.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website Link
                </a>
              ) : (
                "none"
              )}
            </td>
            <td>
              <Link
                className="grey-text"
                to={"/datasettype/" + datasetType._id}
              >
                {datasetType.name}
              </Link>
            </td>
            <td>
              <Link
                className="grey-text"
                to={"/datasets/" + props.dataset.project}
              >
                Project Link
              </Link>
            </td>
            <td>{props.dataset.created}</td>
          </tr>
        </tbody>
      </table>
    );
  }
};
