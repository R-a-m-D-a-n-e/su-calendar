import React, { Component } from "react";

export default class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      save:
        localStorage.getItem("filter") || localStorage.getItem("masterCheck")
          ? 1
          : 0,
    };
    this.handlerClick = this.handlerClick.bind(this);
  }
  handlerClick() {
    if (this.state.save === 0) {
      if (this.props.filter !== null || this.props.filter.length === 0)
        localStorage.setItem("filter", this.props.filter);
      else localStorage.removeItem("filter");
      if (
        this.props.masterCheck !== null ||
        this.props.masterCheck.length === 0
      )
        localStorage.setItem("masterCheck", this.props.masterCheck);
      else localStorage.removeItem("masterCheck");
    } else {
      localStorage.clear();
    }

    this.setState({ save: 1 - this.state.save });
  }

  render() {
    return (
      <div className="optionsBar">
        <div className="text">
          <p>Souris &#128578; demain c'est pire &#129315;</p>
        </div>
        <div
          className={`save ${
            this.state.save === 1 ? "saveCheck" : "saveUnCheck"
          }`}
          onClick={this.handlerClick}
        />
      </div>
    );
  }
}
