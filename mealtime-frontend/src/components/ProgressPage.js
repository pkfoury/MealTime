import React, { Component } from 'react';
import logo from '../logo.svg';
import './ProgressPage.css';
import {PieChart} from 'react-easy-chart';
import {LineChart} from 'react-easy-chart';
import {BarChart} from 'react-easy-chart';

class App extends Component {
  render() {
    return (
      <div className="App">
	<div className="Pie">
	  <h1>Daily Progress</h1>
	  <h1>Daily Values</h1>
	  <h1>Weekly Progress</h1>
	</div>
	<div className="Pie">
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
	</div>
      </div>
    );
  }
}

export default App;
