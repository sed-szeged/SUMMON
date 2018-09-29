import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";

class RequestQueryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  componentDidMount() {
    $(".modal").modal();
  }

  modal = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    return (
      <div id="modal-query" className="modal">
        <div className="modal-content">
          <h4>Modal Header</h4>
          <p>A bunch of text</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
          >
            Agree
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {},
  null,
  { withRef: true }
)(RequestQueryModal);
