import React, { Component } from 'react';
import { BarChart } from 'react-easy-chart';
import { CardSubtitle, Card, CardDeck, CardBody, Button, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';
import { browserHistory } from 'react-router'
import './Home.css';

class Home extends Component {

	constructor(props) {
		super(props);
		// this.logout = this.logout.bind(this);
	}


	render() {
		return (
			<div className="home">
				<CardDeck className="home-deck">
					<Card>
						<CardTitle>Welcome User</CardTitle>
						<CardBody>
							<CardText> Hope you're having a great day</CardText>
						</CardBody>
						<Button href="profile">Profile</Button>
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
								yDomainRange={[0, 100]}
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
					</Card>

				</CardDeck>
			</div>
		);
	}
}

export default Home;

