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
		this.doSearch("restaurants");
		  
		// TODO: Populate recommendations by getting a list of user's favorites and running them through the Yelp API to get
		// similar places.
		this.state = {
			//recommendations: [],
			restaurants: [],
      		restaurantCount: 0,
      		reviewRestaurant: null,
      		reviewsToShow: []
		}
	}

	doSearch(searchTerm) {
		const YELP = require('yelp-fusion');
		const API_KEY = 'n384b999Qr0b_KGmop_D5U8T6wBTPCnPAxRjQzTcPunh_WXf1vtF9GeK8H5KNA4L8qt_ijdUzQfYyLKuiID6bnYQ1MtgCpxCZlS3cQnOrp8qvlnR71unVMExB46tW3Yx';
		const SEARCH_REQUEST = { 
		  term: searchTerm,
		  location: 'west lafayette, in',
		  sort_by: "rating",
		  offset:(Math.floor(Math.random() * (100 - 0 + 1)) + 0),
		  limit:3,
		};
		const YELP_CLIENT = YELP.client(API_KEY);
	
		YELP_CLIENT.search(SEARCH_REQUEST).then(
		  response => {
			const results = response.jsonBody.businesses;
			results.forEach(business => {
			  business.reviews = [];
			});
			this.setState({ restaurants: results, restaurantCount: results.length });
		}).catch((error) => {
		  console.log(error);
		});
	  }
	
	  showReviews(restaurantId, restaurant) {
		const YELP = require('yelp-fusion');
		const API_KEY = 'n384b999Qr0b_KGmop_D5U8T6wBTPCnPAxRjQzTcPunh_WXf1vtF9GeK8H5KNA4L8qt_ijdUzQfYyLKuiID6bnYQ1MtgCpxCZlS3cQnOrp8qvlnR71unVMExB46tW3Yx';
		const YELP_CLIENT = YELP.client(API_KEY);
	
		YELP_CLIENT.reviews(restaurantId).then(response => {
		  const reviews = response.jsonBody.reviews;
		  var reviewsToShow = this.state.reviewsToShow;
		  reviewsToShow = [];
		  reviews.forEach(review => {
			var nextReview = review.rating + ' / 5, ' + '"' + review.text + '" - ' + review.user.name;
			reviewsToShow.push(nextReview);
		  });
		  this.setState({ reviewsToShow: reviewsToShow, reviewRestaurant: restaurant.name });
		}).catch((error) => {
		  console.log(error);
		});
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

					{this.state.restaurants.map((restaurant, index) => (
						<div>
							<img src={restaurant.image_url} style={ { width: 80 + 'px', height: 80 + 'px', float: "left" } }></img>
							<h6>{restaurant.name}</h6>
							<p>{ restaurant.rating } / 5.0 Stars</p>
							<Button>Insta-Favorite</Button>
							<hr style={ { marginTop: 50 + 'px' } }/>
						</div>
					))}

				</CardBody>
			</Card>

		</CardDeck>
    	);
  	}
}
export default MainPage;

