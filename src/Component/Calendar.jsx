import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import iCalendarPlugin from "@fullcalendar/icalendar";
import Popup from "./Popup.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.tmp = null;
    this.state = { showPopup: false };
    this.gotoDate = this.gotoDate.bind(this);
    this.datesSet = this.datesSet.bind(this);
    this.handlerClick = this.handlerClick.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.event = null;
    this.calendar = React.createRef();
    this.position = React.createRef();
  }

  gotoDate(date) {
    let calendarApi = this.calendar.current.getApi();
    this.tmp = date;
    calendarApi.gotoDate(date);
  }
  datesSet(date) {
    // console.log(date);
  }

  componentDidUpdate() {
    if (this.tmp !== this.props.goto) this.gotoDate(this.props.goto);
  }

  handlerClick(e) {
    console.log(e.el);
    // console.log(e.el.getBoundingClientRect());
    // console.log(this.position.current.getBoundingClientRect());
    let current = e.el.getBoundingClientRect();
    let parent = this.position.current.getBoundingClientRect();
    this.event = {
      ...e.event.toJSON(),
      x: current.x - parent.x,
      y: current.y - parent.y,
      height: current.height,
      width: current.width,
    };
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  togglePopup(e) {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  render() {
    // console.log("render Calendar");
    return (
      <div className="Calendar" ref={this.position}>
        {this.state.showPopup ? (
          <Popup event={this.event} closePopup={this.togglePopup} />
        ) : null}
        <FullCalendar
          eventClick={this.handlerClick}
          contentHeight="550px"
          datesSet={this.datesSet}
          ref={this.calendar}
          firstDay={0}
          businessHours={{
            // days of week. an array of zero-based day of week integers (0=Sunday)
            daysOfWeek: [1, 2, 3, 4, 5], // Monday - Thursday

            startTime: "8:30", // a start time (10am in this example)
            endTime: "19:45", // an end time (6pm in this example)
          }}
          expandRows={true}
          // slotDuration="01:00:00"
          nowIndicator={true}
          allDaySlot={false}
          slotMinTime="08:00:00"
          slotMaxTime="20:00:00"
          plugins={[timeGridPlugin, iCalendarPlugin]}
          initialView="timeGridWeek"
          themeSystem="bootstrap"
          locale="fr"
          timeZone="Europe/Paris"
          headerToolbar={{
            start: "prev today next",
            center: "title",
            end: "",
          }}
          events={this.props.events}
        />
      </div>
    );
  }
}
