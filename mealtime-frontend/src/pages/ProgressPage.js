import React, { Component } from 'react';
import dateFns from 'date-fns';
import {PieChart} from 'react-easy-chart';
import {LineChart} from 'react-easy-chart';
import {BarChart} from 'react-easy-chart';
import {apiGet} from '../functions/Api';
import { CardSubtitle, Card, CardDeck, CardBody, Button, CardTitle, CardText, CardImg, __esModule } from 'reactstrap';

class App extends Component {
	
	state = {
		currentWeek: new Date(),
		day_values: {},
		mon : 0,
		tues : 0,
		wed : 0,
		thurs : 0,
		fri : 0,
		sat : 0,
		sun :0,
		cal: 0,
		totalCalorieCount: 0,
		flag: 0,
		current_progress: {},
		total_progress: {},
		goals: {},
	};

	renderDays(){
		const dateFormat = "dddd";
		let startDate = dateFns.startOfWeek(this.state.currentWeek);

	}

	componentWillMount(){
		apiGet('daily_nutrients')
			.then (({data}) => {
				console.log(data.data)
				this.setState({
					current_progress: data.data
				})
			})

		const newDateFormat = "MM/DD/YY";
		const weekStart = dateFns.startOfWeek(this.state.currentWeek);
		var formattedDatesun = dateFns.format(weekStart, newDateFormat);
		const daymon = dateFns.format(dateFns.addDays(weekStart, 1), newDateFormat)
		var formattedDatemon = dateFns.format(daymon, newDateFormat);
		const daytues = dateFns.format(dateFns.addDays(daymon, 1), newDateFormat)
		var formattedDatetues = dateFns.format(daytues, newDateFormat);
		const daywed = dateFns.format(dateFns.addDays(daytues, 1), newDateFormat)
		var formattedDatewed = dateFns.format(daywed, newDateFormat);
		const daythur = dateFns.format(dateFns.addDays(daywed, 1), newDateFormat)
		var formattedDatethur = dateFns.format(daythur, newDateFormat);
		const dayfri = dateFns.format(dateFns.addDays(daythur, 1), newDateFormat)
		var formattedDatefri = dateFns.format(dayfri, newDateFormat);
		const daysat = dateFns.format(dateFns.addDays(dayfri, 1), newDateFormat)
		var formattedDatesat = dateFns.format(daysat, newDateFormat);
	
		apiGet('daily_nutrients/date?day=' + formattedDatesun) 
			.then(({data}) => {
				this.setState({sun : data.data})
			})

			apiGet('daily_nutrients/date?day=' + formattedDatemon) 
			.then(({data}) => {
				this.setState({mon : data.data})
			})

			apiGet('daily_nutrients/date?day=' + formattedDatetues) 
			.then(({data}) => {
				this.setState({tues: data.data})
			})

			apiGet('daily_nutrients/date?day=' + formattedDatewed) 
			.then(({data}) => {
				this.setState({wed : data.data})
			})

			apiGet('daily_nutrients/date?day=' + formattedDatethur) 
			.then(({data}) => {
				this.setState({thurs : data.data})
			})




			apiGet('user_goals')
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
	};

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
				{ key: 'Calories Used' , value: 100},
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
					{ x: 'mon' , y:2000 },
					{ x: 'Tues' , y: 1800 },
					{ x: 'Wed' , y: 2200 },
					{ x: this.state.currentWeek , y: 2300 },
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
