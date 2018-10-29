import React from "react";
import RequestQueryTableHead from "./rfc/RequestQueryTableHead";
import RequestQueryTableChartInterface from "./rcc/RequestQueryTableChartInterface";
import { Modal, Button } from "react-materialize";
import RequestQueryDownloadModalBody from "./rcc/RequestQueryDownloadModalBody";

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
                <Modal
                  className="col l12"
                  id={"rq-modal-" + index}
                  header={"Download data from " + rq.name}
                  trigger={
                    <Button
                      href={"rq-modal-" + index}
                      className="btn waves-effect waves-light light-blue accent-4"
                    >
                      Download
                      <i className="material-icons right">launch</i>
                    </Button>
                  }
                >
                  <RequestQueryDownloadModalBody
                    id={rq._id}
                    created={rq.created}
                  />
                </Modal>
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
