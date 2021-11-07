import React, { Component } from "react";
import UIMaster from "./UIMaster";
import Master from "../Object/Master";
import Events from "../Object/Events";

export default class MasterNav extends Component {
  constructor(props) {
    super(props);
    this.task = null;
    this.data = {};
    this.state = {
      listMaster: {},
    };
    this.getInfos = this.getInfos.bind(this);
    this.update = this.update.bind(this);
    this.addMaster = this.addMaster.bind(this);
    this.addEvents = this.addEvents.bind(this);
  }

  getMaster(niv, name) {
    return this.state.listMaster[`${name}${niv}`];
  }

  getDataMaster(niv, name) {
    return this.data[`${name}${niv}`];
  }

  setDataMaster(niv, name, events) {
    this.data[`${name}${niv}`] = events;
  }

  update(niv, name) {
    let m = this.getMaster(niv, name);
    if (m === undefined || m === 0) {
      this.addMaster(niv, name);
    } else this.removeMaster(niv, name);
  }

  addEvents(newEvents, niv, name) {
    this.setDataMaster(niv, name, new Master(niv, name, newEvents));
    this.props.add(newEvents, niv, name);
    // console.log("addEvent");
  }

  addMaster(niv, name) {
    let m = this.getMaster(niv, name);
    if (m === 0) {
      this.props.add(this.getDataMaster(niv, name).getEvents(), niv, name);
    } else {
      this.props.disableCheckBox();
      new Events(name, niv).loading((newEvents) => {
        this.addEvents(newEvents, niv, name);
      });
    }
    this.setState((state, props) => {
      let res;
      res = { ...state.listMaster };
      res[`${name}${niv}`] = 1;
      return { listMaster: res };
    });
  }

  removeEvents(niv, name) {
    let keys = Object.keys(this.state.listMaster);
    let newEvents = [];
    keys.forEach((e) => {
      if (this.state.listMaster[e] === 1) {
        // console.log(e);
        newEvents = [...newEvents, ...this.data[e].getEvents()];
      }
    });
    // console.log(newEvents);
    this.props.remove(newEvents, niv, name);
  }

  removeMaster(niv, name) {
    this.setState((state, props) => {
      let res;
      res = { ...state.listMaster };
      res[`${name}${niv}`] = 0;
      // console.log(res);
      setTimeout(() => {
        this.removeEvents(niv, name);
      }, 10);
      return { listMaster: res };
    });
  }
  execTask() {
    if (
      this.props.tasks !== undefined &&
      this.props.tasks !== null &&
      this.props.tasks.length !== 0
    ) {
      let tmp = this.props.tasks.pop().split("_");
      this.task = { niv: parseInt(tmp[1]), master: tmp[0] };
      this.update(this.task.niv, this.task.master);
      // console.log(this.props.tasks);
    } else {
      this.task = null;
    }
  }
  componentDidUpdate() {
    this.execTask();
  }
  componentDidMount() {
    this.execTask();
  }

  getInfos(niv, name) {
    let data_m = this.getDataMaster(niv, name);
    let m = this.getMaster(niv, name);
    if (data_m !== undefined && m !== 0) {
      // console.log(this.data[name].getInfos());
      return data_m.getInfos();
    }
    return null;
  }

  render() {
    return (
      // <div className="masternav">
      <nav className="sidenav">
        <div className="main-buttons">
          <UIMaster
            task={this.task}
            filter={this.props.filter}
            addFilter={this.props.addFilter}
            removeFilter={this.props.removeFilter}
            disableChecking={this.props.disableChecking}
            niv={this.props.niv}
            name={`ANDROIDE`}
            update={this.update}
            infos={this.getInfos(this.props.niv, `ANDROIDE`)}
          />
          <UIMaster
            task={this.task}
            filter={this.props.filter}
            addFilter={this.props.addFilter}
            removeFilter={this.props.removeFilter}
            disableChecking={this.props.disableChecking}
            niv={this.props.niv}
            name={`BIM`}
            update={this.update}
            infos={this.getInfos(this.props.niv, `BIM`)}
          />
          <UIMaster
            task={this.task}
            filter={this.props.filter}
            addFilter={this.props.addFilter}
            removeFilter={this.props.removeFilter}
            disableChecking={this.props.disableChecking}
            niv={this.props.niv}
            name={`DAC`}
            update={this.update}
            infos={this.getInfos(this.props.niv, `DAC`)}
          />
          <UIMaster
            task={this.task}
            filter={this.props.filter}
            addFilter={this.props.addFilter}
            removeFilter={this.props.removeFilter}
            disableChecking={this.props.disableChecking}
            niv={this.props.niv}
            name={`IMA`}
            update={this.update}
            infos={this.getInfos(this.props.niv, `IMA`)}
          />
          <UIMaster
            task={this.task}
            filter={this.props.filter}
            addFilter={this.props.addFilter}
            removeFilter={this.props.removeFilter}
            disableChecking={this.props.disableChecking}
            niv={this.props.niv}
            name={`RES`}
            update={this.update}
            infos={this.getInfos(this.props.niv, `RES`)}
          />
          <UIMaster
            task={this.task}
            filter={this.props.filter}
            addFilter={this.props.addFilter}
            removeFilter={this.props.removeFilter}
            disableChecking={this.props.disableChecking}
            niv={this.props.niv}
            name={`RES-EIT-Digital`}
            update={this.update}
            infos={this.getInfos(this.props.niv, `RES-EIT-Digital`)}
          />
          <UIMaster
            task={this.task}
            filter={this.props.filter}
            addFilter={this.props.addFilter}
            removeFilter={this.props.removeFilter}
            disableChecking={this.props.disableChecking}
            niv={this.props.niv}
            name={`RES-ITESCIA`}
            update={this.update}
            infos={this.getInfos(this.props.niv, `RES-ITESCIA`)}
          />
          <UIMaster
            task={this.task}
            filter={this.props.filter}
            addFilter={this.props.addFilter}
            removeFilter={this.props.removeFilter}
            disableChecking={this.props.disableChecking}
            niv={this.props.niv}
            name={`SAR`}
            update={this.update}
            infos={this.getInfos(this.props.niv, `SAR`)}
          />
          <UIMaster
            task={this.task}
            filter={this.props.filter}
            addFilter={this.props.addFilter}
            removeFilter={this.props.removeFilter}
            disableChecking={this.props.disableChecking}
            niv={this.props.niv}
            name={`SESI`}
            update={this.update}
            infos={this.getInfos(this.props.niv, `SESI`)}
          />
          <UIMaster
            task={this.task}
            filter={this.props.filter}
            addFilter={this.props.addFilter}
            removeFilter={this.props.removeFilter}
            disableChecking={this.props.disableChecking}
            niv={this.props.niv}
            name={`SFPN`}
            update={this.update}
            infos={this.getInfos(this.props.niv, `SFPN`)}
          />
          <UIMaster
            task={this.task}
            filter={this.props.filter}
            addFilter={this.props.addFilter}
            removeFilter={this.props.removeFilter}
            disableChecking={this.props.disableChecking}
            niv={this.props.niv}
            name={`SFPN-AFTI`}
            update={this.update}
            infos={this.getInfos(this.props.niv, `SFPN-AFTI`)}
          />
          <UIMaster
            task={this.task}
            filter={this.props.filter}
            addFilter={this.props.addFilter}
            removeFilter={this.props.removeFilter}
            disableChecking={this.props.disableChecking}
            niv={this.props.niv}
            name={`STL`}
            update={this.update}
            infos={this.getInfos(this.props.niv, `STL`)}
          />
          {this.props.niv === 2 ? (
            <UIMaster
              task={this.task}
              filter={this.props.filter}
              addFilter={this.props.addFilter}
              removeFilter={this.props.removeFilter}
              disableChecking={this.props.disableChecking}
              niv={this.props.niv}
              name={`STL-INSTA`}
              update={this.update}
              infos={this.getInfos(this.props.niv, `STL-INSTA`)}
            />
          ) : (
            <></>
          )}
        </div>
      </nav>
      // </div>
    );
  }
}
