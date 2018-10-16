import React from "react";
import GridfsSingleTable from "./GridfsSingleTable";

export default props => {
  let displayGridfsCard = null;
  if (props.gridfs.length !== 0) {
    displayGridfsCard = props.gridfs.map((gridfs, index) => {
      const metadata = Object.assign({}, gridfs.metadata);
      return (
        <div className="card" key={"gridfs-" + index}>
          <div className="card-content">
            <span className="card-title">{metadata.name}</span>
            <p>{metadata.description}</p>
            <div className="row">
              <GridfsSingleTable gridfs={gridfs} />
            </div>
          </div>
        </div>
      );
    });
  }

  if (!props.gridfs || props.gridfs.length === 0) {
    return "";
  } else {
    return (
      <div>
        <hr />
        <h4>Files to download</h4>
        {displayGridfsCard}
      </div>
    );
  }
};
