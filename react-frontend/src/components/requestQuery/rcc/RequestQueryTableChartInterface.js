import React, { Component } from "react";
import ReactSelect from "react-select";
import { connect } from "react-redux";

import Chartjs2Charts from "../../chartjs2/Chartjs2Charts";
import makeRQPropertySelect from "./helpers/makeRQPropertySelect";
import makeChartData from "./helpers/makeChartData";
import RequestQueryChartTableHead from "../rfc/RequestQueryChartTableHead";
import checkForValidKey from "../rcc/helpers/checkForValidkey";
import { getDataForRequestQueryChart } from "../../../redux/actions/requestQuery/requestQueryActions";

class RequestQueryTableChartInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      created: this.props.created,
      chartType: "",
      chartData: {},
      jsonData: {},
      requestQuery: this.props.requestQuery,
      minDate: "",
      selectedDate: "",
      quantity: 10,
      reactSelectOptions: [],
      propertyArr: []
    };
  }
  componentDidMount() {
    if (this.props.requestQuery) {
      if (this.props.requestQuery.created) {
        this.setState({
          minDate: this.props.requestQuery.created.split("T", 1)[0],
          selectedDate: this.props.requestQuery.created.split("T", 1)[0]
        });
      }
      if (this.props.requestQuery.queryArr) {
        makeRQPropertySelect(this.props.requestQuery.queryArr).then(res => {
          this.setState({ reactSelectOptions: res });
        });
      }
    }
  }

  dateOnChange = e => {
    const minDate = new Date(this.state.minDate);
    const t = new Date().toISOString().split("T", 1)[0];
    const today = new Date(t);
    const selectedDate = new Date(e.target.value);
    if (minDate <= selectedDate && selectedDate <= today) {
      this.setState({ selectedDate: e.target.value });
    }
  };

  quantityOnChange = e => {
    const quantity = e.target.value;
    if (0 < quantity && quantity <= 500) {
      this.setState({ quantity: quantity });
    }
  };

  tableContent = (item, index) => {
    return (
      <tr key={"table-" + index}>
        <td>{item.propertyKey ? item.propertyKey : "none"}</td>
        <td>
          {item.validData ? (
            <i className="green-text small material-icons">check</i>
          ) : (
            <i className="red-text  small material-icons">close</i>
          )}
        </td>
        <td>
          <input
            id={index}
            value={this.state.propertyArr[index].color}
            onChange={this.onColorChange}
            type="color"
          />
        </td>
        <td>
          <i
            id={index}
            onClick={this.removeElement}
            className="red-text  small material-icons"
          >
            cancel
          </i>
        </td>
      </tr>
    );
  };

  onColorChange = e => {
    let newArr = this.state.propertyArr;
    newArr[e.target.id].color = e.target.value;
    this.setState({ propertyArr: newArr });
  };

  removeElement = e => {
    const index = e.target.id;
    const newArr = this.state.propertyArr
      .slice(0, index)
      .concat(this.state.propertyArr.slice(index + 1));
    this.setState({ propertyArr: newArr });
  };

  onSelectChange = e => {
    this.setState(
      {
        propertyArr: [
          ...this.state.propertyArr,
          { propertyKey: e.value, validData: null, color: "#1de9b6" }
        ]
      },
      () => {
        checkForValidKey(this.state.propertyArr, this.state.jsonData).then(
          ress => {
            this.setState({ propertyArr: ress });
          }
        );
      }
    );
  };

  loadData = e => {
    this.props
      .getDataForRequestQueryChart(
        this.state.id,
        this.state.selectedDate,
        this.state.quantity
      )
      .then(res => {
        this.setState({ jsonData: res.data });
        checkForValidKey(this.state.propertyArr, res).then(ress => {
          this.setState({ propertyArr: ress });
        });
      });
  };

  render() {
    return (
      <div>
        {/******************* BUTTONS *******************/}
        <div className="row">
          <br />
          <div className="col l6">
            <a
              onClick={() => {
                this.setState({ chartType: "line" });
              }}
              className="grey lighten-3 waves-effect waves-teal btn-flat"
            >
              Line Chart
            </a>
          </div>
          <div className="col l6">
            <a
              onClick={() => {
                this.setState({ chartType: "bar" });
              }}
              className="grey lighten-3 waves-effect waves-teal btn-flat"
            >
              Bar Chart
            </a>
          </div>
        </div>
        {/******************* CONTROLS *******************/}
        <div className="row">
          <div className="col l3">
            <ReactSelect
              value={null}
              options={this.state.reactSelectOptions}
              onChange={this.onSelectChange}
              placeholder="Add property"
            />
          </div>
          <div className="col l3">
            <input
              value={this.state.selectedDate}
              onChange={this.dateOnChange}
              type="date"
              id="date"
            />
            <span className="helper-text">Starting Date</span>
          </div>
          <div className="input-field col l3">
            <input
              value={this.state.quantity}
              onChange={this.quantityOnChange}
              type="number"
              name="quantity"
              id="quantity"
            />
            <span className="helper-text">Number of data</span>
          </div>
          <div className="col l3">
            <a
              onClick={this.loadData}
              className="teal white-text lighten-2 waves-effect waves-teal btn-flat"
            >
              Load Data
            </a>
          </div>
        </div>
        <div className="col l12 continer">
          <RequestQueryChartTableHead>
            {this.state.propertyArr.map((item, index) => {
              return this.tableContent(item, index);
            })}
          </RequestQueryChartTableHead>
        </div>
        <div className="row">
          <Chartjs2Charts
            jsonData={makeChartData(
              this.state.chartType,
              this.state.jsonData,
              this.state.propertyArr
            )}
            chartType={this.state.chartType}
            noXAxis={true}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { getDataForRequestQueryChart }
)(RequestQueryTableChartInterface);
