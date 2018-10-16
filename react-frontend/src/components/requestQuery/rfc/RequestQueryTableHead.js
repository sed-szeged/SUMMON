import React from "react";

const RequestQueryTableHead = props => {
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
      <tbody>{props.children}</tbody>
    </table>
  );
};
export default RequestQueryTableHead;
