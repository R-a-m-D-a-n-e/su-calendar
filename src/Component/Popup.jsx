import React from "react";

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.handlerClick = this.handlerClick.bind(this);
  }

  handlerClick(e) {
    e.stopPropagation();
  }
  render() {
    console.log(this.props.event);
    let start = new Date(this.props.event.start).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    let end = new Date(this.props.event.end).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    let classNames = this.props.event.classNames;
    return (
      <div className="popup" onClick={this.props.closePopup}>
        <div
          className={`popup_inner`}
          style={{
            left: this.props.event.x,
            top: this.props.event.y,
            height: this.props.event.height,
            width: this.props.event.width,
          }}
          onClick={this.handlerClick}
        >
          <ul>
            <li className={`${classNames[0]} ${classNames[1]}`}>
              {this.props.event.title}
            </li>
            <li className={`${classNames[0]} ${classNames[1]}`}>
              {this.props.event.extendedProps.location}
            </li>
            <li className={`${classNames[0]} ${classNames[1]}`}>
              {start}
              <br />
              &#10225;
              <br />
              {end}
            </li>
            {/* <li className={`${classNames[0]} ${classNames[1]}`}>{end}</li> */}
          </ul>
        </div>
      </div>
    );
  }
}

export default Popup;
