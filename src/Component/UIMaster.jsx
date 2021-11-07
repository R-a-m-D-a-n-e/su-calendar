import React, { Component } from "react";
import CheckBox from "./CheckBox";
import Infos from "./Infos";

export default class Master extends Component {
  constructor(props) {
    super(props);
    this.UIinfos1 = null;
    this.UIinfos2 = null;
    this.handleCheckBox = this.handleCheckBox.bind(this);
  }

  handleCheckBox() {
    this.props.update(this.props.niv, this.props.name);
  }

  render() {
    // console.log(this.UIinfos, this.props.infos);
    if (this.props.infos !== null) {
      if (this.props.niv === 1) {
        if (this.UIinfos1 === null) {
          this.UIinfos1 = (
            <Infos
              filter={this.props.filter}
              infos={this.props.infos}
              addFilter={this.props.addFilter}
              removeFilter={this.props.removeFilter}
              className={`M${this.props.niv}_${this.props.name}`}
            />
          );
        }
      } else {
        if (this.UIinfos2 === null) {
          this.UIinfos2 = (
            <Infos
              filter={this.props.filter}
              infos={this.props.infos}
              addFilter={this.props.addFilter}
              removeFilter={this.props.removeFilter}
              className={`M${this.props.niv}_${this.props.name}`}
            />
          );
        }
      }
    }
    return (
      <div className="master">
        <CheckBox
          disableChecking={this.props.disableChecking}
          niv={this.props.niv}
          name={`M${this.props.niv}_${this.props.name}`}
          onCheck={this.handleCheckBox}
          check={
            this.props.task ? this.props.task.master === this.props.name : null
          }
        />
        <div className="hidden">
          {this.props.niv === 1 ? this.UIinfos1 : this.UIinfos2}
        </div>
      </div>
    );
  }
}
