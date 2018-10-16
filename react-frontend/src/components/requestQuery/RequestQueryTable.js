import React from "react";
import RequestQueryDownloadButton from "./RequestQueryDownloadButton";
import RequestQueryTableHead from "./rfc/RequestQueryTableHead";
import RequestQueryTableChartInterface from "./rcc/RequestQueryTableChartInterface";

export default props => {
  if (!props.requestQuery || props.requestQuery.length === 0) {
    return "";
  } else {
    let displayRequestQueryTable = props.requestQuery.map((rq, index) => {
      return (
        <div key={"rq-" + index}>
          <RequestQueryTableHead>
            <tr key={"rq-data-" + index}>
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
          </RequestQueryTableHead>

          <RequestQueryTableChartInterface
            requestQuery={rq}
            id={rq._id}
            created={rq.created}
          />
          <hr />
        </div>
      );
    });
    return <div>{displayRequestQueryTable}</div>;
  }
};
