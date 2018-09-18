import React from "react";

export default props => {
  return (
    <div id="contentContainer" className="col s10 m6 l6">
      {props.children}
    </div>
  );
};
