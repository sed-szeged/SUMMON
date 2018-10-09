import React from "react";

import SingleProjectTable from "./SingleProjectTable";

export default props => {
  if (!props.project) {
    return <h4>Invalid project ID</h4>;
  } else {
    return (
      <div className="card">
        <span className="card-title">{props.project.name}</span>
        <p>{props.project.description}</p>
        <SingleProjectTable project={props.project} />
      </div>
    );
  }
};
