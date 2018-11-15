import React, { Component } from 'react';

import {PieChart} from 'react-easy-chart';
import {LineChart} from 'react-easy-chart';
import {BarChart} from 'react-easy-chart';
import { CardSubtitle, Card, CardDeck, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap';
class App extends Component {

  render() {
    return (
	<CardDeck>
	  <Card>
	    <CardTitle>Calorie Usage</CardTitle>
	    <CardBody>
		<PieChart
			labels
			data={[
				{ key: 'Calories Used' , value: 100 },
				{ key: 'Calories Left' , value: 50 }
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
                        	{ x: 'Protein', y: 30, color: '#33CEFF' },
                        	{ x: 'Fat', y: 40, color: '#33B5FF' },
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
