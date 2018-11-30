import React, { Component } from 'react';

import {PieChart} from 'react-easy-chart';
import {LineChart} from 'react-easy-chart';
import {BarChart} from 'react-easy-chart';
import {apiGet} from '../functions/Api';
import { CardSubtitle, Card, CardDeck, CardBody, Button, CardTitle, CardText, CardImg, __esModule } from 'reactstrap';

class App extends Component {

	state = {
		totalCalorieCount: 0,
		flag: 0,
		current_progress: {},
		total_progress: {},
		goals: {},
		caloriesLeft: 0
	};

	componentWillMount(){
		apiGet('daily_nutrients')
			.then (({data}) => {
				console.log(data.data)
				this.setState({
					current_progress: data.data
				}, this.getGoals)
			})

			/*apiGet('user_goals')
			.then ( ({data}) => {
				console.log(data)
				this.setState({
					user: data.data,
					goals: data.goals_data
				})
			})

		apiGet('meals')
			.then (({data}) => {
				console.log(data.data)
				this.setState({
					total_calories: data.data
				})
			})
		console.log(this.state.goals);
		console.log(this.state.current_progress);
		var tempLimit = this.state.goals["calories"];
		var tempCaloriesToday = this.state.current_progress["calories"];
		var tempCalories = tempLimit - tempCaloriesToday;
		this.setState({ caloriesLeft: tempCalories });
		console.log(this.state.caloriesLeft);*/
	};
	getGoals(){
		apiGet('user_goals').then(({data}) => {
			console.log(data)
			this.setState({
				goals: data.goals_data
			}, this.getMeals)
		});
	}

	getMeals(){
		apiGet('meals').then(({data}) => {
			console.log(data.data)
			this.setState({
				total_calories: data.data
			}, this.setCaloriesLeft)
		});
	}
	setCaloriesLeft(){
		console.log(this.state.goals);
		console.log(this.state.current_progress);
		var calories = this.state.goals["calories"];
		if (this.state.current_progress["cheat_day_flag"]) {
			calories = this.state.goals["cheat_day_calories"];
		}
		console.log(calories);
		this.setState({ caloriesLeft: calories - this.state.current_progress["calories"]});
	}
  render() {
    return (
	<CardDeck>
	  <Card>
	    <CardTitle>Calorie Usage</CardTitle>
	    <CardBody>
		<PieChart
			labels
			size={375}
			data={[
				{ key: 'Calories Used' , value: this.state.current_progress["calories"]},
				{ key: 'Calories Left' , value: this.state.goals["calories"] }
			]}

			styles={{
				'.chart_text': {
					fontSize: '1em',

				}
			}}
		/>
	    </CardBody>
	  </Card>
	  <Card>
	    <CardTitle>Daily Values</CardTitle>
	    <CardBody>

	 	<BarChart
                  	axes
                  	grid
                  	height={450}
										width={390}
										margin={{top: 10, right: 50, bottom: 30, left: 30}}
                  	yDomainRange={[0,400]}
                  	data={[
                        	{ x: 'Protein', y: this.state.current_progress["protein"], color: '#33CEFF' },
                        	{ x: 'Fat', y: this.state.current_progress["fat"], color: '#33B5FF' },
                        	{ x: 'Fiber',y: this.state.current_progress["fiber"], color: '#339CFF' },
                        	{ x: 'Carbs',y: this.state.current_progress["carbs"], color: '#3377FF' }
										]}
										clickHandler={(d) => this.setState({dataDisplay: `The value of ${d.x} is ${d.y} grams`})}

		/>
			 	<div style={{display: 'inline-block', verticalAlign: 'top', paddingLeft: '20px'}}>
      		{this.state.dataDisplay ? this.state.dataDisplay : 'Click on a bar to show the value'}
    		</div>
	    </CardBody>
	  </Card>
	  <Card>
	    <CardTitle>Weekly Calories</CardTitle>
	    <CardBody>
		<LineChart
			xType={'text'}
			axes
			width={350}
			height={450}
			interpolate={'cardinal'}
			data = {[
				[
					{ x: 'Mon' , y:2000 },
					{ x: 'Tues' , y: 1800 },
					{ x: 'Wed' , y: 2200 },
					{ x: 'Thurs' , y: 2300 },
					{ x: 'Fri' , y: 2100 },
					{ x: 'Sat' , y: 2200 },
					{ x: 'Sun' , y: 1900 }
				]
				]}

		/>
	    </CardBody>
	  </Card>
	</CardDeck>
    );
  }
}

export default App;
