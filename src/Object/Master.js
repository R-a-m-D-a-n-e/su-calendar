import moment from "moment";

export default class Master {
  constructor(niv, name, events, filter = []) {
    this.niv = niv;
    this.name = name;
    this.events = events;
    this.infos = this.searchInfos();
    this.filter = filter;
  }

  getEvents() {
    let res = this.events.filter((e) => {
      return !this.inFilter(e["title"]);
    });

    // console.log(this.filter, res);
    return res;
  }

  getInfos() {
    return this.infos;
  }

  getFilter() {
    return this.filter;
  }

  addFilter(e) {
    this.filter.push(e);
  }

  removeFilter(e) {
    this.filter.filter((f) => f === e);
  }

  inFilter(e) {
    return this.filter.find((f) => e === f);
  }

  searchInfos() {
    let now = new Date().getUTCFullYear();
    let res = new Set();
    this.events.forEach((e) => {
      let tmp = e["title"].match(/.*Cours.*|.*Examen.*|.*TME.*|.*TD.*/gi);
      let year = moment(e["start"]).year();
      // console.log(tmp);
      // console.log(year, now);
      if (tmp && year >= now) res.add(e["title"]);
    });
    // console.log(res);
    return [...res].sort().reverse();
  }
}