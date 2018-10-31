import React, { Component } from 'react';
import './general.css'

class FirstTimeUserPage extends Component {
  constructor(props) {
    super(props)
    this.state = { showMacroGoals: false };
    this.toggleShowMacroGoals = this.toggleShowMacroGoals.bind(this);
    this.renderMacroOptions = this.renderMacroOptions.bind(this);
  }

  toggleShowMacroGoals() {
    this.setState({ showMacroGoals: !this.state.showMacroGoals });
  }
  
  renderMacroOptions() {
    if (!this.state.showMacroGoals) return;

    return (
      <div class="macroNutrientGoals">
        <label for="caloric-limit">Protein (Grams per day)</label>
        <input type="number" className="form-control col-lg-2 left-42" id="protein" placeholder="0" />
        <label for="caloric-limit">Fats (Grams per day)</label>
        <input type="number" className="form-control col-lg-2 left-42" id="fats" placeholder="0" />
        <label for="caloric-limit">Carbs (Grams per day)</label>
        <input type="number" className="form-control col-lg-2 left-42" id="carbs" placeholder="0" />
      </div>
    );
  }

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
                <input type="number" className="form-control col-lg-2 left-42" id="weight" placeholder="0" />
                <br />
                <label htmlFor="caloric-limit">How many calories would you like to limit yourself to per day?</label>
                <input type="number" className="form-control col-lg-2 left-42" id="caloric-limit" placeholder="0" />
                <br />
                <label htmlFor="budget">How much money would you like to spend per week on food?</label>
                <input type="number" className="form-control col-lg-2 left-42" id="budget-limit" placeholder="0" />
                <input type="checkbox" id="showMacrosBox" onClick={this.toggleShowMacroGoals}></input>
                <label for="showMacrosBox">Track macronutrients as well? (Optional)</label>
                { this.renderMacroOptions() }
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
