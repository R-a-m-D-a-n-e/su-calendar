import React, { Component } from "react";
import Calendar from "react-calendar";

export default class MinCalendar extends Component {
  constructor(props) {
    super(props);
    this.nextLabel = "";
    this.next2Label = "";
    this.prevLabel = "";
    this.prev2Label = "";
    this.navigationLabel = ({ date, label, locale, view }) =>
      `${date.toLocaleDateString(locale, {
        year: "numeric",
        month: "short",
        day: undefined,
      })}`;
    this.formatMonth = (locale, date) =>
      date.toLocaleDateString(locale, {
        year: undefined,
        month: "short",
        day: undefined,
      });
    this.onClickDay = (value, event) => {
      let tmp = new Date(value);
      tmp.setDate(value.getDate() + 1);
      this.props.onClickDayMinCal(tmp);
    };
    this.onClickDay = this.onClickDay.bind(this);
  }
  render() {
    return (
      <div>
        <Calendar
          // value={this.state.value}
          // activeStartDate={null}
          formatMonth={this.formatMonth}
          nextLabel=""
          next2Label=""
          prevLabel=""
          prev2Label=""
          minDetail="decade"
          navigationLabel={this.navigationLabel}
          onClickDay={this.onClickDay}
        />
      </div>
    );
  }
}
