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
        <h3>404</h3>
        <h2>
          <strong> Page not found</strong>
        </h2>
        <Link className="grey-text" to="/">
          Home
        </Link>
      </ContentContainer>
      <RightSidePanel />
    </div>
  );
};
