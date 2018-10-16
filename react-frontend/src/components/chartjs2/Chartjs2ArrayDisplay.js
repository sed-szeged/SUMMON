import React from "react";
import ChartDisplay from "./ChartDisplay";
import classNames from "classnames";

export default props => {
  const displayCharts = props.chartjs2.map((chart, index) => {
    return (
      <div className="row" key={"chart-" + index}>
        <div
          className={classNames("col l4 s12", {
            "push-l6 left-align": (index + 1) % 2 === 0
          })}
        >
          <h5>{chart.name}</h5>
          <p>{chart.description}</p>
        </div>
        <div
          className={classNames("col l8 s12", {
            "pull-l6": (index + 1) % 2 === 0
          })}
        >
          <ChartDisplay chart={chart} />
        </div>
        <hr />
      </div>
    );
  });

  if (!props.chartjs2 || props.chartjs2.length === 0) {
    return "";
  } else {
    return <div>{displayCharts}</div>;
  }
};
