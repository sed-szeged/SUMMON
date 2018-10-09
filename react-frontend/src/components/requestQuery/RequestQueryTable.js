import React from "react";
import RequestQueryDownloadButton from "./RequestQueryDownloadButton";

export default props => {
  if (!props.requestQuery || props.requestQuery.length === 0) {
    return <h4>No Request Query to Display</h4>;
  } else {
    let displayRequestQueryTable = props.requestQuery.map((rq, index) => {
      return (
        <tr key={"rq-" + index}>
          <td>{rq.name}</td>
          <td>{rq.interval}</td>
          <td>
            {" "}
            <a
              className="grey-text"
              href={rq.queryURI}
              target="_blank"
              rel="noopener noreferrer"
            >
              API
            </a>
          </td>
          <td>{rq.created}</td>
          <td>
            <RequestQueryDownloadButton id={rq._id} />
          </td>
        </tr>
      );
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Interval</th>
            <th>REST API</th>
            <th>Created</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>{displayRequestQueryTable}</tbody>
      </table>
    );
  }
};
