import React from "react";
import DatasetSingleTable from "./DatasetSingleTable";

export default props => {
  if (props.dataset) {
    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">{props.dataset.name}</span>
          <p>{props.dataset.description}</p>
          <div className="row">
            <DatasetSingleTable dataset={props.dataset} />
          </div>
        </div>
      </div>
    );
  } else {
    return <h4>No dataset</h4>;
  }
};
