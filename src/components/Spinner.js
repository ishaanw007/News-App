import React, { Component } from "react";
import spin from "./Spin.gif";
export default class Spinner extends Component {
  render() {
    return (
      <div
        className="d-flex aligns-items-center justify-content-center"
        Style={"height = 100px"}
      >
        <img src={spin} alt="loading" height={60} />
      </div>
    );
  }
}
