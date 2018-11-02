import React, { Component } from 'react';

import {PieChart} from 'react-easy-chart';
import {LineChart} from 'react-easy-chart';
import {BarChart} from 'react-easy-chart';
import {apiGet} from '../functions/Api';
import { CardSubtitle, Card, CardDeck, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap';





class App extends Component {
	state = {
		calories: 0,
		protein: 0,
		total_fat: 0,
		flag: 0
	};
	get() {
		if(this.state.flag === 0){
			apiGet('ingredients').then(({data}) => {
				console.log(data);
				this.setState({ calories: data.data.calories, protein: data.data.protein, total_fat: data.data.total_fat, flag: 1 })
			});
		}
	}
  render() {
    return (
	<CardDeck>
		{this.get()}
	  <Card>
	    <CardTitle>Calorie Usage</CardTitle>
	    <CardBody>
		<PieChart
			labels
			data={[
				{ key: 'Calories Used' , value: this.state.calories },
				{ key: 'Calories Left' , value: 2000 }
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
                  	height={400}
                  	barWidth={350}
                  	yDomainRange={[0,100]}
										
										

										data={[
                        	{ x: 'Protein', y: this.state.protein, color: '#33CEFF' },
                        	{ x: 'Total Fat', y: this.state.total_fat, color: '#33B5FF' },
                        	{ x: 'Fiber', y: 20, color: '#339CFF' },
                        	{ x: 'Sugar', y: 40, color: '#3377FF' }
                  	]}
		/>
	    </CardBody>
	  </Card>
	  <Card>
	    <CardTitle>Weekly Calories</CardTitle>
	    <CardBody>	
		<LineChart
			xType={'text'}
			axes
			width={350}
			height={250}
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
