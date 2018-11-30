import React, { Component } from 'react';
import './general.css'
import { apiPatch, apiGet, apiPost } from '../functions/Api';

class FirstTimeUserPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMacroGoals: false,
      weight: 0,
      calories: 0,
      money: 0,
      protein: 0,
      fats: 0,
      carbs: 0,
      cheat_day_calories: 0
    };

    this.updateMoney = this.updateMoney.bind(this);
    this.updateWeight = this.updateWeight.bind(this);
    this.updateCalories = this.updateCalories.bind(this);

    this.toggleShowMacroGoals = this.toggleShowMacroGoals.bind(this);
    this.updateProtein = this.updateProtein.bind(this);
    this.updateCarbs = this.updateCarbs.bind(this);
    this.updateFats = this.updateFats.bind(this);
    this.updateCheatDayCalories = this.updateCheatDayCalories.bind(this);

    this.renderMacroOptions = this.renderMacroOptions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateCarbs(e) {
    this.setState({ carbs: e.target.value });
  }

  updateFats(e) {
    this.setState({ fats: e.target.value });
  }

  updateProtein(e) {
    this.setState({ protein: e.target.value });
  }

  updateMoney (e) {
    this.setState({ money: e.target.value });
  }

  updateWeight (e) {
    this.setState({ weight: e.target.value });
  }

  updateCalories (e) {
    this.setState({ calories: e.target.value });
  }

  updateCheatDayCalories (e) {
    this.setState({ cheat_day_calories: e.target.value });
  }

  toggleShowMacroGoals() {
    this.setState({ showMacroGoals: !this.state.showMacroGoals });
  }

  renderMacroOptions() {
    if (!this.state.showMacroGoals) return;

    return (
      <div className="macroNutrientGoals">
        <label for="caloric-limit">Protein (Grams per day)</label>
        <input type="number" className="form-control col-lg-2 left-42" id="protein" placeholder="0" onChange={this.updateProtein}/>
        <label for="caloric-limit">Fats (Grams per day)</label>
        <input type="number" className="form-control col-lg-2 left-42" id="fats" placeholder="0" onChange={this.updateFats}/>
        <label for="caloric-limit">Carbs (Grams per day)</label>
        <input type="number" className="form-control col-lg-2 left-42" id="carbs" placeholder="0" onChange={this.updateCarbs}/>
      </div>
    );
  }

  handleSubmit (event) {
    event.preventDefault();
    const nutritionalInfo = {
      'weight': this.state.weight,
      'calories': this.state.calories,
      'money': this.state.money,
      'protein': this.state.protein,
      'fat': this.state.fats,
      'carbs': this.state.carbs,
      'track_macros': this.state.showMacroGoals,
      'cheat_day_calories': this.state.cheat_day_calories
    }

    apiPost('user_goals', nutritionalInfo)
    .then(({data}) => {
      if (data.status === "SUCCESS") {
        this.props.history.push('/home');
      }
    })

    apiPost('daily_nutrients')
		.then (({data}) => {
			console.log(data.data)
		})
  }

  render() {
    return (
      <div>
        <div className="title col-lg-12 text-center">
          <h2>Welcome to MealTime! We're glad you're here.</h2>
          <h4>Let's get some information from you.</h4>
        </div>
        <form onSubmit = {this.handleSubmit}>
            <div className="form-control">
                <label className="col-lg-4" for="weight">Your Weight (Pounds)</label>
                <input type="number" className="form-control col-lg-2 left-42" id="weight" placeholder="0" onChange={this.updateWeight}/>
                <br />
                <label htmlFor="caloric-limit">How many calories would you like to limit yourself to per day?</label>
                <input type="number" className="form-control col-lg-2 left-42" id="caloric-limit" placeholder="0" onChange={this.updateCalories}/>
                <br />
                <label htmlFor="caloric-limit">How many calories would you like to limit yourself to on cheat days?</label>
                <input type="number" className="form-control col-lg-2 left-42" id="cheat-day-caloric-limit" placeholder="0" onChange={this.updateCheatDayCalories}/>
                <br />
                <label htmlFor="budget">How much money would you like to spend per week on food?</label>
                <input type="number" className="form-control col-lg-2 left-42" id="budget-limit" placeholder="0" onChange={this.updateMoney}/>
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
