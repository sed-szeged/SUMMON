import React from "react";
import { Link } from "react-router-dom";
export default props => {
  let displayDatasetTableBody = "";
  if (props.datasets.length !== 0) {
    displayDatasetTableBody = props.datasets.map((dataset, index) => {
      return (
        <tr key={index}>
          <td>
            <Link className="grey-text" to={"/dataset/" + dataset._id}>
              {dataset.name}
            </Link>
          </td>

          <td>
            {dataset.website ? (
              <a
                className="grey-text"
                href={dataset.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </a>
            ) : (
              "none"
            )}
          </td>
          <td>
            {dataset.datasetType.name ? dataset.datasetType.name : "none"}
          </td>
          <td>{dataset.created}</td>
        </tr>
      );
    });
  }

  if (!props.datasets || props.datasets.length === 0) {
    return <h5>No Datasets to Display</h5>;
  } else {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>

            <th>Website</th>
            <th>Dataset Type</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>{displayDatasetTableBody}</tbody>
      </table>
    );
  }
};
