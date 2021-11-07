import ICalendar from "./Calendar";
import SideBar from "./SideBar";
import { Component } from "react";
import Options from "./Options";
import "../Style/style.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    let filter = localStorage.getItem("filter");
    let masterCheck = localStorage.getItem("masterCheck");
    if (filter) filter = filter.split(",");
    if (masterCheck) masterCheck = masterCheck.split(",");
    // console.log(filter);
    // console.log(masterCheck);
    this.tasks = masterCheck ? masterCheck : [];
    this.masterCheck = [];
    this.data = [];
    this.state = {
      goto: new Date(),
      events: [],
      disableCheckBox: false,
      filter: filter ? filter : [],
      hiddenMenu: false,
    };
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.onClickDayMinCal = this.onClickDayMinCal.bind(this);
    this.disableCheckBox = this.disableCheckBox.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.setHiddenMenu = this.setHiddenMenu.bind(this);
  }

  setHiddenMenu(val) {
    this.setState({ hiddenMenu: val });
  }

  add(newEvents, niv, name) {
    // console.log(niv, name);
    this.masterCheck.push(`${name}_${niv}`);
    // console.log(this.masterCheck);
    this.setState((state) => {
      let res = newEvents;
      if (state.filter.length > 0)
        res = res.filter((e) => {
          let val = state.filter.find((f) => {
            // console.log(f, e);
            return f === e["title"];
          });
          // console.log(state.filter, val);
          return val === undefined;
        });
      return {
        events: [...state.events, ...res],
        disableCheckBox: false,
      };
    });
  }

  remove(newEvents, niv, name) {
    // console.log(niv, name);
    this.masterCheck = this.masterCheck.filter((e) => e !== `${name}_${niv}`);
    // console.log(this.masterCheck);
    this.setState({ events: newEvents });
  }

  addFilter(newf) {
    // console.log(newf);
    // console.log(this.data);
    let res = this.state.events.filter((e) => {
      let res = newf !== e["title"];
      if (!res) this.data.push(e);
      return res;
    });

    this.setState((state) => {
      return { events: res, filter: [...state.filter, newf] };
    });

    // console.log(this.data);
  }

  removeFilter(oldf) {
    // console.log(oldf);
    let res = [];
    this.data = this.data.filter((e) => {
      let bool = oldf !== e["title"];
      if (!bool) res.push(e);
      return bool;
    });
    // console.log(this.data, res);
    this.setState((state) => {
      return {
        events: [...state.events, ...res],
        filter: state.filter.filter((f) => f !== oldf),
      };
    });
    // console.log(this.data);
  }

  onClickDayMinCal(date) {
    this.setState({ goto: date });
  }

  disableCheckBox() {
    this.setState({ disableCheckBox: true });
  }

  componentDidMount() {
    // console.log(localStorage.getItem("masterCheck") ? 1 : 0);
    // console.log(localStorage.getItem("filter") ? 1 : 0);
  }

  render() {
    // console.log("render App");
    return (
      <div className="App">
        <SideBar
          addFilter={this.addFilter}
          removeFilter={this.removeFilter}
          disableCheckBox={this.disableCheckBox}
          disableChecking={this.state.disableCheckBox}
          onClickDayMinCal={this.onClickDayMinCal}
          add={this.add}
          remove={this.remove}
          filter={this.state.filter}
          setHiddenMenu={this.setHiddenMenu}
          hiddenMenu={this.state.hiddenMenu}
          tasks={this.tasks}
        />
        <div
          className={`containerShow ${
            this.state.hiddenMenu ? "containerShowHidden" : "containerShowShow"
          }`}
        >
          <Options filter={this.state.filter} masterCheck={this.masterCheck} />
          <ICalendar events={this.state.events} goto={this.state.goto} />
        </div>
      </div>
    );
  }
}
