import React from "react";
import { Link } from "react-router-dom";

import LeftSidePanel from "./LeftSidePanel";
import RightSidePanel from "./RightSidePanel";
import ContentContainer from "./ContentContainer";

export default () => {
  return (
    <div className="row">
      <LeftSidePanel />
      <ContentContainer>
        <h2>
          <strong>404 Page not found</strong>
        </h2>
        <Link to="/">Home</Link>
      </ContentContainer>
      <RightSidePanel />
    </div>
  );
};
