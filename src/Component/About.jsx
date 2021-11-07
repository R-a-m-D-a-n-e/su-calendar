import React, { Component } from "react";
import logoS from "../img/logoS.svg";
import logoG from "../img/logoG.png";

export default class About extends Component {
  render() {
    return (
      <div className="containerIcon">
        <a className="logo" href="https://www.sorbonne-universite.fr/">
          <img className="logoS" src={logoS} alt="" />
        </a>
        <a className="logo" href="https://github.com/su-calendar/show">
          <img className="logoG" src={logoG} alt="" />
        </a>
      </div>
    );
  }
}
