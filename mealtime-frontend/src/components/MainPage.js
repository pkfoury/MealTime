import React, {Component} from 'react';
import {BarChart} from 'react-easy-chart';
import { Link } from 'react-router-dom';

class MainPage extends Component{
  render () {
    return(
	
        <div className = 'Barchart'>
                <h2>Nutrition-at-a-glance</h2>
		<h3>Heres a look at your nutrional budget this week</h3>
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
                <div>
                        <a href='/progress' class="btn btn-primary">Nutrition</a>
                </div>
        </div>
    );
  }
}

export default MainPage;

