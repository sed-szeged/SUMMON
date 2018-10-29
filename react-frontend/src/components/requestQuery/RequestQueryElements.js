import React, { Component } from "react";
import PropTypes from "prop-types";
import jsonQueryPackage from "json-query";
import { connect } from "react-redux";
import ReactJson from "react-json-view";
import classNames from "classnames";
import { notify } from "react-notify-toast";

import { setQueryArr } from "../../redux/actions/requestQuery/requestQueryActions";

class RequestQueryElements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryArr: this.props.queryArr || [{ queryKey: "", query: "" }],
      errorQueryArr: [""],
      jsonVal: this.props.jsonVal || {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.queryArr) this.setState({ queryArr: nextProps.queryArr });
    if (nextProps.requestQuery)
      if (nextProps.requestQuery.json)
        this.setState({ jsonVal: nextProps.requestQuery.json });
  }

  componentDidMount() {
    if (this.props.queryArr) {
      let errArr = [];

      this.props.queryArr.forEach(element => {
        errArr.push("");
      });
      this.setState({ errorQueryArr: errArr });
    }
  }

  jsonQuery = (query, data = this.state.jsonVal) => {
    return jsonQueryPackage(query, { data: data });
  };

  addNewElement = e => {
    if (this.state.queryArr.length < 10) {
      const newQueryArr = this.state.queryArr;
      newQueryArr.push({ queryKey: "", query: "" });
      const newErrorQueryArr = this.state.errorQueryArr;
      newErrorQueryArr.push("");
      this.setState({
        queryArr: newQueryArr,
        errorQueryArr: newErrorQueryArr
      });
    }
  };

  removeLastElement = e => {
    if (1 < this.state.queryArr.length) {
      this.setStatePromiseForElements().then(arr => {
        this.setState({
          queryArr: arr.newQueryArr,
          errorQueryArr: arr.newErrorQueryArr
        });
      });
    }
  };

  setStatePromiseForElements = () => {
    return new Promise(resolve => {
      const arrLength = this.state.queryArr.length;
      let newQueryArr = [];
      let newErrorQueryArr = [];
      for (let i = 0; i < arrLength - 1; i++) {
        newQueryArr.push(this.state.queryArr[i]);
        newErrorQueryArr.push(this.state.errorQueryArr[i]);
      }
      resolve({ newQueryArr: newQueryArr, newErrorQueryArr: newErrorQueryArr });
    });
  };

  queryKeyOnChange = e => {
    if (
      e.target.value.match(/^[a-z0-9]+$/i) !== null ||
      e.target.value.match("")
    ) {
      const queryArr = this.state.queryArr;
      queryArr[e.target.id].queryKey = e.target.value;
      this.setState({ queryArr });
    }
  };

  queryOnChange = e => {
    const queryArr = this.state.queryArr;
    queryArr[e.target.id].query = e.target.value;
    this.setState({ queryArr });
  };

  setJson = () => {
    this.isError().then(isError => {
      if (isError) {
        notify.show("Error found in the Query Key elements", "error");
      } else {
        this.props.setQueryArr(this.state.queryArr);
      }
    });
  };

  isError = () => {
    let isError = false;
    return new Promise(resolve => {
      this.state.errorQueryArr.map(element => {
        if (element !== "") {
          isError = true;
          return isError;
        } else return null;
      });
      resolve(isError);
    });
  };

  /* Comparing Query Keys */
  compareQueryKeys = e => {
    this.compareQueryKeysPromise(e.target.id).then(res => {
      this.setState({ errorQueryArr: res });
    });
  };

  compareQueryKeysPromise = index => {
    return new Promise(resolve => {
      const errorQueryArr = this.state.errorQueryArr;
      const queryArrLength = this.state.queryArr.length;
      for (let i = 0; i < queryArrLength; i++) {
        for (let j = 0; j < queryArrLength; j++) {
          let arrVal_i = this.state.queryArr[i].queryKey;
          let arrVal_j = this.state.queryArr[j].queryKey;
          if (arrVal_j === "") {
            errorQueryArr[j] = "Key can't be empty";
          } else {
            errorQueryArr[j] = "";
          }

          if (i !== j) {
            if (arrVal_i === arrVal_j) {
              errorQueryArr[j] = "Same query keys are not allowed";
            } else {
              errorQueryArr[j] = "";
            }
          }
        }
      }

      resolve(errorQueryArr);
    });
  };

  render() {
    const displayQueryArr = this.state.queryArr.map((element, index) => {
      let reactJsonVal = {
        Query: jsonQueryPackage(this.state.queryArr[index].query, {
          data: this.state.jsonVal
        }).value
      };
      return (
        <div key={index} className="row">
          {/*queryKey*/}
          <div>
            <div className="input-field col s4">
              <input
                value={this.state.queryArr[index].queryKey}
                onChange={this.queryKeyOnChange}
                onBlur={this.compareQueryKeys}
                name="queryKey"
                id={index}
                type="text"
                className={classNames("", {
                  invalid: this.state.errorQueryArr[index] !== ""
                })}
              />
              <label htmlFor="queryKey">Query Key - {index}</label>
              <span
                className="helper-text"
                data-error={this.state.errorQueryArr[index]}
              />
            </div>
          </div>
          {/*query*/}
          <div>
            <div className="input-field col s4">
              <input
                value={this.state.queryArr[index].query}
                onChange={this.queryOnChange}
                name="query"
                id={index}
              />
            </div>
          </div>
          {/*JSON value*/}
          <div className="row col s4">
            <ReactJson src={reactJsonVal} collapsed={true} />
            {this.state.queryArr[index].query ? "" : ""}
          </div>
        </div>
      );
    });

    return (
      <div>
        <div className="row">
          <div className="col s6 l6">
            <button
              className="waves-effect waves-light btn light-blue accent-4"
              onClick={this.addNewElement}
            >
              New Element
            </button>
          </div>
          <div className="col s6 l6">
            <button
              className="waves-effect waves-light btn light-blue accent-4"
              onClick={this.removeLastElement}
            >
              Remove Last Element
            </button>
          </div>
          <span>
            There is no validation for the queries, for more information use{" "}
            <a
              href="https://www.npmjs.com/package/json-query"
              target="_blank"
              rel="noopener noreferrer"
            >
              this
            </a>{" "}
            documentation.
          </span>
        </div>
        {displayQueryArr}
      </div>
    );
  }
}

RequestQueryElements.propTypes = {
  queryArr: PropTypes.array
};

const mapStateToProps = state => ({
  requestQuery: state.requestQuery
});

export default connect(
  mapStateToProps,
  { setQueryArr },
  null,
  { withRef: true }
)(RequestQueryElements);
