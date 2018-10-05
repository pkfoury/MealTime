import React, { Component } from 'react';
import dateFns from 'date-fns';
import './Calendar.css';

class Calendar extends Component {
  state = {
    currentWeek: new Date(),
    selectedDate: new Date()
  };

  renderHeader() {
    const dateFormat = " MMMM DD YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevWeek}>
            Previous Week
          </div>
        </div>
        <div className="col col-center">
          <h8>Week of
          <span>{dateFns.format(dateFns.startOfWeek(this.state.currentWeek), dateFormat)}</span>
          </h8>
        </div>
        <div className="col col-end" onClick={this.nextWeek}>
          <div className="icon">Next Week</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentWeek);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentWeek, selectedDate } = this.state;
    const weekStart = dateFns.startOfWeek(currentWeek);
    const weekEnd = dateFns.endOfWeek(weekStart);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = weekStart;
    let formattedDate = "";

    while (day <= weekEnd) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameWeek(day, weekStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextWeek = () => {
    this.setState({
      currentWeek: dateFns.addWeeks(this.state.currentWeek, 1)
    });
  };

  prevWeek = () => {
    this.setState({
      currentWeek: dateFns.subWeeks(this.state.currentWeek, 1)
    });
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default Calendar;
