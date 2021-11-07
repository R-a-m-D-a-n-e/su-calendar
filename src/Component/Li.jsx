import React, { Component } from "react";

export default class Li extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: this.props.check,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let oldVal = this.state.check;
    this.setState({ check: 1 - this.state.check });
    setTimeout(() => {
      if (oldVal === 1) this.props.add(this.props.name);
      else this.props.remove(this.props.name);
    }, 10);
  }

  render() {
    // console.log(this.props.name);
    return (
      <li>
        <input
          type="checkbox"
          id={this.props.name}
          value={this.props.name}
          onClick={this.handleClick}
        />
        <label
          className={
            this.state.check === 1
              ? `checkInfo labelCheck ${this.props.className}_infos `
              : `labelUnCheck ${this.props.className}_infosCheck `
          }
          htmlFor={this.props.name}
        >
          {this.props.name}
        </label>
      </li>
    );
  }
}
