import React, {Component} from 'react';
import {BarChart} from 'react-easy-chart';
import { Link } from 'react-router-dom';
import { CardSubtitle, Card, CardDeck, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap';


class MainPage extends Component{
  	render () {
    	return(
		
		<CardDeck>
			<Card>
			<CardTitle>Welcome User</CardTitle>
			<CardBody>
			<CardText> Hope you're having a great day</CardText>
			</CardBody>
				<Button>Profile</Button>
			</Card>
			<Card>
			<CardTitle>Nutrition-at-a-glance</CardTitle>
			<CardSubtitle>Heres a look at your nutritional budget for the week</CardSubtitle>	
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
			<div>
				<a href='./progress' class="btn-primary">Nutrition</a>
			</div>
			</CardBody>
			</Card>
			<Card>
					


			</Card>

		</CardDeck>
    	);
  	}
}

export default MainPage;

