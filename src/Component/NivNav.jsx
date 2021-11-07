import React, { Component } from "react";

export default class NivNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      m1: 1,
      m2: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (e.target.id === "m2") {
      this.setState({ m1: 0, m2: 1 });
      this.props.setNiv(2);
    }

    if (e.target.id === "m1") {
      this.setState({ m1: 1, m2: 0 });
      this.props.setNiv(1);
    }
  }

  render() {
    return (
      <div className="nivnav">
        <div
          id="m1"
          className={`niv niv1 ${this.state.m1 === 1 ? "niv_action" : ""} `}
          onClick={this.handleClick}
        >
          Master 1
        </div>
        <div
          id="m2"
          className={`niv niv2 ${this.state.m2 === 1 ? "niv_action" : ""} `}
          onClick={this.handleClick}
        >
          Master 2
        </div>
      </div>
    );
  }
}
