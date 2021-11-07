import axios from "axios";
import ical2json from "ical2json";

var URL = "https://cal.ufr-info-p6.jussieu.fr/caldav.php/";
var username = "student.master";
var password = "guest";

export default class Events {
  constructor(master = "DAC", niv = 1) {
    this.master = master;
    this.niv = niv;
    this.events = null;
  }

  async loading(callback) {
    let m = this.master;
    if (m === "RES-EIT-Digital" || m === "RES-ITESCIA") m = "RES";
    if (m === "SFPN-AFTI") m = "SFPN";
    if (m === "STL-INSTA") m = "STL";
    // console.log(`${URL}${m}/M${this.niv}_${this.master}`);
    await axios
      .get(`${URL}${m}/M${this.niv}_${this.master}`, {
        auth: {
          username,
          password,
        },
      })
      .then((response) => {
        // console.log(response.data);
        this.events = this.extractData(response.data);
        callback(this.events);
      })
      .catch(() => {
        // console.log(response.data);
        callback([]);
      });
  }

  getEvents() {
    return this.events;
  }

  extractData(ical) {
    let res = ical2json.convert(ical).VCALENDAR[0].VEVENT;
    let output = [];
    // console.log(ical);
    // console.log(res);
    // console.log(res[0]);
    res.forEach((e) => {
      if (
        e["DTEND;TZID=Europe/Paris"] !== undefined &&
        (e["SUMMARY"] !== undefined ||
          e["SUMMARY;LANGUAGE=fr-FR"] !== undefined)
      )
        output.push({
          //add LOCATION
          location: e["LOCATION"] ? e["LOCATION"] : "Not Available",
          title: e["SUMMARY"] !== undefined ?
            e["SUMMARY"] :
            e["SUMMARY;LANGUAGE=fr-FR"],
          start: e["DTSTART;TZID=Europe/Paris"],
          end: e["DTEND;TZID=Europe/Paris"],
          classNames: `${this.master}${this.niv} events`,
        });
      // else console.log(e);
    });

    return output;
  }
}