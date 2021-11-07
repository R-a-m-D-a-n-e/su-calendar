import React, { Component } from "react";

export default class UE extends Component {
  constructor(props) {
    super(props);
    this.name = props.name;
  }

  render() {
    return <div>{this.name}</div>;
  }
}
