import React, { Component } from "react";
import Li from "./Li.jsx";

export default class Infos extends Component {
  constructor(props) {
    super(props);

    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  add(info) {
    // console.log("add filter : ", info);
    this.props.addFilter(info);
  }

  remove(info) {
    // console.log("add filter : ", info);
    this.props.removeFilter(info);
  }

  render() {
    let infos = [];
    // console.log(this.props.filter);
    if (this.props.infos !== null)
      this.props.infos.forEach((e) => {
        let bool = 1;

        if (this.props.filter !== undefined) {
          bool = this.props.filter.find((f) => e === f) ? 0 : 1;
        }
        infos.push(
          <Li
            key={e}
            name={e}
            add={this.add}
            remove={this.remove}
            check={bool}
            className={this.props.className}
          />
        );
      });
    return (
      // <div class="container">
      <ul className="ks-cboxtags">{infos}</ul>
      // </div>
    );
  }
}
