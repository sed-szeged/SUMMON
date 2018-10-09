import React, { Component } from "react";
import { connect } from "react-redux";

class Chartjs2ManageFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      jsonData: {},
      editJsonData: {},
      chart: {
        _id: ""
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.chartjs2) {
      if (nextProps.chartjs2.chart) {
        if (this.state.chart._id !== nextProps.chartjs2.chart._id) {
          this.setState({
            chart: nextProps.chartjs2.chart,
            name: nextProps.chartjs2.chart.name,
            description: nextProps.chartjs2.chart.description,
            jsonData: nextProps.chartjs2.chart.jsonData
          });
        }
      }
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="input-field col s12 l6">
            <input
              value={this.state.name}
              onChange={this.onChange}
              id="name"
              type="text"
            />
            <label className="active" htmlFor="name">
              Name
            </label>
          </div>
          <div className="input-field col s12 l6">
            <textarea
              value={this.state.description}
              onChange={this.onChange}
              id="description"
              className="materialize-textarea"
            />
            <label htmlFor="description">Description</label>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chartjs2: state.chartjs2
});

export default connect(
  mapStateToProps,
  {}
)(Chartjs2ManageFields);
