import React, { Component } from "react";

export default class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.loading = false;
    this.check = {
      1: 0,
      2: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (!this.props.disableChecking) {
      this.loading = true;
      if (this.props.niv === 1)
        this.check = {
          1: 1 - this.check[1],
          2: this.check[2],
        };
      else
        this.check = {
          1: this.check[1],
          2: 1 - this.check[2],
        };
      this.props.onCheck();
    }
  }

  render() {
    // console.log(this.props.check);
    if (!this.props.disableChecking) this.loading = false;
    if (this.props.check) {
      this.check[this.props.niv] = 1;
      this.loading = true;
    }
    return (
      <div className="box">
        <input
          id={"one" + this.props.name}
          type="checkbox"
          onClick={this.handleClick}
        />
        <span
          className={`check ${this.props.name}_label ${
            this.check[this.props.niv] === 1 ? `${this.props.name}_action` : ""
          } ${this.loading ? "check_loading" : ""}`}
        ></span>
        <label htmlFor={"one" + this.props.name}>{this.props.name}</label>
      </div>
    );
  }
}
