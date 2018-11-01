import React, {Component} from 'react';
import {BarChart} from 'react-easy-chart';
import { Link } from 'react-router-dom';
import { CardSubtitle, Card, CardDeck, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap';
import { apiDelete } from '../functions/Api';
import {browserHistory} from 'react-router'

class MainPage extends Component{

	constructor(props) {
		super(props);
		// this.logout = this.logout.bind(this);

		// TODO: Populate recommendations by getting a list of user's favorites and running them through the Yelp API to get
		// similar places.
		this.state = {
			recommendations: [],
		}
	}


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
				<a href='./progress' className="btn-primary">Nutrition</a>
			</div>
			</CardBody>
			</Card>
			<Card>
				<CardBody>
					<CardTitle>Today's Recommendations</CardTitle>
					<img src="" style={ { width: 80 + 'px', height: 80 + 'px', float: "left" } }></img>
					<h6>Restaurant Title Here</h6>
					<p>4.7 / 5.0 Stars</p>
					<hr style={ { marginTop: 50 + 'px' } }/>

					<img src="" style={ { width: 80 + 'px', height: 80 + 'px', float: "left" } }></img>
					<h6>Restaurant Title Here</h6>
					<p>4.7 / 5.0 Stars</p>
					<hr style={ { marginTop: 50 + 'px' } }/>

					<img src="" style={ { width: 80 + 'px', height: 80 + 'px', float: "left" } }></img>
					<h6>Restaurant Title Here</h6>
					<p>4.7 / 5.0 Stars</p>
					<hr style={ { marginTop: 50 + 'px' } }/>
				</CardBody>
			</Card>

		</CardDeck>
    	);
  	}
}

export default MainPage;

