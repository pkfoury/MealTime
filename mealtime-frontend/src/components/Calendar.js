import React, { Component } from 'react';
import dateFns from 'date-fns';
import './Calendar.css';
import {apiGet} from '../functions/Api';

class Calendar extends Component {
  state = {
    currentWeek: new Date(),
    selectedDate: new Date(),
    calories: 1,
    budget: 0,
    user_id: null,
    flag: 0,
  };


  renderHeader() {
    const dateFormat = " MMMM DD YYYY";
    if(this.state.flag === 0){
      apiGet('users').then(({data}) => {
      console.log(data);
      console.log(data.data.id);
      this.setState({ user_id: data.data.id, flag: 1});

    });}
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
            <span className="dailyCal">Calories: </span>
            <span className="dailyBud">Budget: </span>
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
      selectedDate: day,
      calories: 0
    });
    const newDateFormat = "YYYY-MM-DD";
    var formattedDate = dateFns.format(day, newDateFormat);
    apiGet('meals/'+this.state.user_id+'/'+formattedDate).then(({data}) => {
      console.log(data);
      this.setState({ calories : data.data.total_calories })
    });
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
      <div>
        <div className="calendar">
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
        </div>
        <div className="page">
          <div className="col-25">
            <h5>Daily Calories: {this.state.calories} calories</h5>
            <h5>Daily Budget: ${this.state.budget}</h5>
          </div>
          <div className="col-25">
            <h5>Meals: </h5>
          </div>
          <div className="col-25">
            <h5>Macro Information: </h5>
          </div>
          <div className="col-25">
            <h5>Planned Recipes: </h5>
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
