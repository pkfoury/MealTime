import React, { Component } from 'react';
import dateFns from 'date-fns';
import {PieChart} from 'react-easy-chart';
import {LineChart} from 'react-easy-chart';
import {BarChart} from 'react-easy-chart';
import {apiGet} from '../functions/Api';
import { CardSubtitle, Card, CardDeck, CardBody, Button, CardTitle, CardText, CardImg, __esModule } from 'reactstrap';

class App extends Component {
	
		state = {
	  //currentWeek : new Date(),
		day_values: {},
		mon : {},
		tues : {},
		wed : {},
		thurs : {},
		fri : {},
		sat : {},
		sun :{},
		cal: 0,
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

		var currentWeek = new Date();
		const newDateFormat = "MM/DD/YY";
		
		
		const weekStart = dateFns.startOfWeek(currentWeek);
		var formattedDatesun = dateFns.format(weekStart, newDateFormat);
		var formattedDatemon = dateFns.format(dateFns.addDays(weekStart,1), newDateFormat);
		var formattedDatetues = dateFns.format(dateFns.addDays(weekStart, 2), newDateFormat);
		//const daywed = dateFns.format(dateFns.addDays(daytues, 1), newDateFormat)
		var formattedDatewed = dateFns.format(dateFns.addDays(weekStart,3), newDateFormat);
		//const daythur = dateFns.format(dateFns.addDays(daywed, 1), newDateFormat)
		var formattedDatethur = dateFns.format(dateFns.addDays(weekStart,4), newDateFormat);
		

		//const dayfri = dateFns.format(dateFns.addDays(daythur, 1), newDateFormat)
		var formattedDatefri = dateFns.format(dateFns.addDays(weekStart,5), newDateFormat);
		
		//const daysat = dateFns.format(dateFns.addDays(currentWeek, 1), newDateFormat)
		var formattedDatesat = dateFns.format(dateFns.addDays(weekStart,6), newDateFormat);
		console.log(formattedDatesun);
		apiGet('daily_nutrients/date?day=' + formattedDatesun) 
			.then(({data}) => {
				if (data.status === "NULL VALS"){
					this.setState({ sun: 0})
				}
				else{	
					this.setState({sun : data.data.calories})
				}
			}).catch((err) => {
				this.setState({ sun: 0})
			})
			
			apiGet('daily_nutrients/date?day=' + formattedDatemon) 
			.then(({data}) => {
				if (data.status === "NULL VALS"){
					this.setState({ mon: 0})
				}
				else{	
					this.setState({mon : data.data.calories})
				}
			}).catch((err) => {
				this.setState({ mon: 0})
			});
			
			apiGet('daily_nutrients/date?day=' + formattedDatetues) 
			.then(({data}) => {
				if (data.status === "NULL VALS"){
					this.setState({ tues: 0})
				}
				else{	
					this.setState({tues : data.data.calories})
				}
			}).catch((err) => {
				this.setState({ tues: 0})
			})
			
			apiGet('daily_nutrients/date?day=' + formattedDatewed) 
			.then(({data}) => {
				if (data.status === "NULL VALS"){
					this.setState({ wed: 0})
				}
				else{	
					this.setState({wed : data.data.calories})
				}
			}).catch((err) => {
				this.setState({ wed: 0})
			})
			
			apiGet('daily_nutrients/date?day=' + formattedDatethur) 
			.then(({data}) => {
				if (data.status === "NULL VALS"){
					this.setState({ thurs: 0})
				}
				else{	
					this.setState({thurs : data.data.calories})
				}
			}).catch((err) => {
				this.setState({ thurs: 0})
			})

			
			

			apiGet('daily_nutrients/date?day=' + formattedDatefri) 
			.then(({data}) => {
				//console.log(data.data)
				if (data.status === "NULL VALS"){
					this.setState({ fri: 0})
				}
				else{	
					this.setState({fri : data.data.calories})
				}
			}).catch((err) => {
				this.setState({ fri: 0})
			})
			
			console.log(this.state.fri);
			//console.log(this.state.sun);

			apiGet('daily_nutrients/date?day=' + formattedDatesat) 
			.then(({data}) => {
				if (data.status === "NULL VALS"){
					this.setState({ sat: 0})
				}
				else{	
					this.setState({sat : data.data.calories})
				}
			}).catch((err) => {
				this.setState({ sat: 0})
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
                  	yDomainRange={[0,2000]}
                  	data={[
                        	{ x: 'Protein', y: this.state.current_progress["protein"], color: '#33CEFF' },
                        	{ x: 'Fat', y: this.state.current_progress["fat"], color: '#33B5FF' },
                        	{ x: 'Calories',y: this.state.current_progress["calories"], color: '#339CFF' },
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
					{ x: 'Sun' , y: this.state.sun },
					{ x: 'Mon' , y: this.state.mon },
					{ x: 'Tues' , y: this.state.tues },
					{ x: 'Wed' , y: this.state.wed },
					{ x: 'Thurs' , y: this.state.thurs },
					{ x: 'Fri' , y: this.state.fri },
					{ x: 'Sat' , y: this.state.sat },
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
