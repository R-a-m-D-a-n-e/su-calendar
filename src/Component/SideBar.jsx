import React, { Component } from "react";
import MinCalendar from "./MinCalendar";
import NivNav from "./NivNav";
import MasterNav from "./MasterNav";
import About from "./About";

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      niv: 1,
    };

    this.setNiv = this.setNiv.bind(this);
    this.handlerClickMenus = this.handlerClickMenus.bind(this);
  }

  setNiv(niv) {
    this.setState({ niv });
  }

  handlerClickMenus() {
    console.log(this.props.hiddenMenu);
    if (this.props.hiddenMenu) this.props.setHiddenMenu(false);
    else this.props.setHiddenMenu(true);
  }

  render() {
    // console.log("rander SideBar");
    return (
      <div
        className={`sidebar ${
          this.props.hiddenMenu ? "hiddenMenu" : "showMenu"
        }`}
      >
        <div id="menus">
          <div id="inner" onClick={this.handlerClickMenus} />
        </div>
        <div className="containerMinCalendar">
          <MinCalendar onClickDayMinCal={this.props.onClickDayMinCal} />
        </div>
        <div className="containerMasterNav">
          <NivNav setNiv={this.setNiv} />
          <MasterNav
            addFilter={this.props.addFilter}
            removeFilter={this.props.removeFilter}
            disableCheckBox={this.props.disableCheckBox}
            disableChecking={this.props.disableChecking}
            add={this.props.add}
            remove={this.props.remove}
            niv={this.state.niv}
            filter={this.props.filter}
            tasks={this.props.tasks}
          />
        </div>
        <div className="containerAbout">
          <About />
        </div>
      </div>
    );
  }
}
