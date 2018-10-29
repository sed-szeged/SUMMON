import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-materialize";
import { removeChartById } from "../../redux/actions/chartjs2/chartjs2Actions";
import { notify } from "react-notify-toast";

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

  onRemove = e => {
    if (this.state.chart._id === "") {
      notify.show("Select a chart", "error");
    } else {
      this.props.removeChartById(this.state.chart._id);
    }
  };

  render() {
    return (
      <div className="row">
        <Modal
          id="modal"
          header="Are you sure you want to remove the file and its records from the database?"
          trigger={
            <Button className="btnwaves-effect waves-light red accent-2 modal-trigger">
              Remove
              <i className="material-icons right">launch</i>
            </Button>
          }
        >
          <Button
            href="#modal"
            onClick={this.onRemove}
            className="btnwaves-effect waves-light red accent-2"
          >
            Remove <i className="material-icons right">delete</i>
          </Button>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chartjs2: state.chartjs2
});

export default connect(
  mapStateToProps,
  { removeChartById }
)(Chartjs2ManageFields);
