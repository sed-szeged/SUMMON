import React, { Component } from "react";
import { connect } from "react-redux";
import { notify } from "react-notify-toast";

import Chartjs2TypeSelect from "./Chartjs2TypeSelect";
import Chartjs2Charts from "./Chartjs2Charts";
import Chartjs2DisplayJSONExample from "./Chartjs2DisplayJSONExmaple";
import { postChartJs } from "../../redux/actions/chartjs2/chartjs2Actions";

class Chartjs2Fields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: "",
      chartType: "",
      name: "",
      description: "",
      jsonData: null,
      editJsonData: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataset) {
      if (nextProps.dataset.selected) {
        if (nextProps.dataset.selected !== this.state.dataset) {
          this.setState({ dataset: nextProps.dataset.selected });
        }
      }
    }
    if (nextProps.chartjs2) {
      if (nextProps.chartjs2.selectedType) {
        if (this.state.chartType !== "") {
          if (this.state.chartType !== nextProps.chartjs2.selectedType) {
            this.setState({
              chartType: nextProps.chartjs2.selectedType,
              jsonData: null
            });
          }
        } else {
          this.setState({
            chartType: nextProps.chartjs2.selectedType,
            jsonData: null
          });
        }
      }
    }
  }

  isJson = str => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  setJson = e => {
    e.preventDefault();
    if (this.isJson(this.state.editJsonData)) {
      this.setState({ jsonData: JSON.parse(this.state.editJsonData) });
    } else {
      notify.show("You must provide a valid JSON string", "error");
    }
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = () => {
    if (this.state.jsonData === null) {
      notify.show("You must provide a valid JSON string", "error");
    } else {
      const newChart = {
        name: this.state.name || "",
        description: this.state.description || "",
        chartType: this.state.chartType || "",
        dataset: this.state.dataset || "",
        jsonData: this.state.jsonData || ""
      };
      this.props.postChartJs(newChart);
    }
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 l6">
            <div className="input-field col s12">
              <input
                value={this.state.name}
                onChange={this.onChange}
                id="name"
              />
              <label htmlFor="name">Name</label>
            </div>
          </div>
          <div className="col s12 l6">
            {" "}
            <div className="input-field col s12">
              <textarea
                value={this.state.description}
                onChange={this.onChange}
                id="description"
                className="materialize-textarea"
              />
              <label htmlFor="description">Description</label>
            </div>
          </div>
          <div className="col s12 l6">
            <Chartjs2TypeSelect />
          </div>
        </div>
        {/* Chartjs 2 */}
        {this.state.chartType ? (
          <Chartjs2Charts
            chartType={this.state.chartType}
            jsonData={this.state.jsonData}
          />
        ) : (
          ""
        )}
        {/* Json Editor */}
        <div className="row">
          <div className="col s12 l6 pull-l1">
            <Chartjs2DisplayJSONExample chartType={this.state.chartType} />
          </div>
          {this.state.chartType ? (
            <form onSubmit={this.setJson}>
              <div className="col s12 l6 push-l1">
                <p>
                  Add quotation mark to your JSON string: {'{"key":"value"}'}
                </p>
                <div className="input-field">
                  <textarea
                    value={this.state.editJsonData}
                    onChange={e => {
                      this.setState({ editJsonData: e.target.value });
                    }}
                    id="editJsonData"
                    className="materialize-textarea"
                  />
                  <label htmlFor="json">Add your JSON string</label>
                </div>
                <button className="btn light-blue accent-4" type="submit">
                  Check
                </button>
              </div>
            </form>
          ) : (
            <div className="col s12 l6" />
          )}
        </div>
        <div className="row">
          <div className="col l12 s12">
            <a className="btn light-blue accent-4" onClick={this.onSubmit}>
              Add Chart
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dataset: state.dataset,
  chartjs2: state.chartjs2
});

export default connect(
  mapStateToProps,
  { postChartJs }
)(Chartjs2Fields);
