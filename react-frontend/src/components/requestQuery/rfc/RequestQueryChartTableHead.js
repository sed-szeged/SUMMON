import React from "react";

const RequestQueryChartTableHead = props => {
  return (
    <table>
      <thead>
        <tr>
          <th>Property Key</th>
          <th>Valid Data</th>
          <th>Color</th>
          <th>Remove</th>
        </tr>
      </thead>

      <tbody>{props.children}</tbody>
    </table>
  );
};

export default RequestQueryChartTableHead;
