import React, { Component } from 'react';
import './general.css'

class FirstTimeUserPage extends Component {
  render() {
    return (
      <div>
        <div className="title col-lg-12 text-center">
          <h2>Welcome to MealTime! We're glad you're here.</h2>
          <h4>Let's get some information from you.</h4>
        </div>
        <form>
            <div className="form-control">
                <label className="col-lg-4" for="weight">Your Weight (Pounds)</label>
                <input type="number" className="form-control col-lg-2" id="weight" placeholder="0" />
                <br />
                <label for="caloric-limit">How many calories would you like to limit yourself to per day?</label>
                <input type="number" className="form-control col-lg-2" id="caloric-limit" placeholder="0" />
                <br />
                <label for="budget">How much money would you like to spend per week on food?</label>
                <input type="number" className="form-control col-lg-2" id="budget-limit" placeholder="0" />
                <br />
                <button className="btn btn-large btn-success">Let's do this thing!</button>
            </div>
        </form>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
              integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
              crossorigin="anonymous"></link>
      </div>
    );
  }
}

export default FirstTimeUserPage;
