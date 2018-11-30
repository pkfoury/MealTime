import React, {Component} from 'react';
import {BarChart} from 'react-easy-chart';
import { CardSubtitle, Card, CardDeck, CardBody, Button, CardTitle, CardText, CardImg, Progress, Row, Col } from 'reactstrap';
import { apiGet, apiPost } from '../functions/Api';

class MainPage extends Component{

	constructor(props) {
		super(props);
		this.doSearch("restaurants");

		// TODO: Populate recommendations by getting a list of user's favorites and running them through the Yelp API to get
		// similar places.
		this.state = {
			goals: {},
			user: {},
			current_progress: {},
			budget: 40 ,
			restaurants: [],
      restaurantCount: 0,
    	reviewRestaurant: null,
  		reviewsToShow: []
		}
	}

	componentWillMount() {
		apiGet('user_goals')
			.then ( ({data}) => {
				console.log(data);
				this.setState({
					user: data.data,
					goals: data.goals_data
				})
				console.log(data.goals_data);
			})

		apiGet('daily_nutrients')
			.then (({data}) => {
				console.log(data.data)
				this.setState({
					current_progress: data.data
				})
			})
	};

	favoriteRestaurant(restaurant) {
		console.log(restaurant);
    let data = {
      yelp_id: restaurant.id,
      name: restaurant.name,
      phone: restaurant.displayPhone,
      price: restaurant.price,
      rating: restaurant.rating
    }
    
    apiPost('restaurant_preference', data).
      then(({data}) => {
        // TODO: Handle request
      }
    );
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
			var underWarning = {
				color: 'red'
			}
			let warning

			if (this.state.goals.protein > this.state.current_progress.protein ||
					this.state.goals.carbs > this.state.current_progress.carbs ||
					this.state.goals.fat > this.state.current_progress.carbs) {
						warning = <div align="center" style={underWarning}>You have not met all of today's goals</div>
			}
			else {
				warning = <CardText ><div>You have met today's goals</div></CardText>
			}

    	return(
		<div>
		<div>
			<h5>Budget usage</h5>	
			
			<div className="text-center">used {this.state.current_progress["budget"]} of {this.state.goals["money"]}</div>
			<Progress animated color="success" value={this.state.current_progress["budget"]} max={this.state.goals["money"]} />
			</div>
		<CardDeck>
			<Card>
			<CardTitle>Welcome {this.state.user['user_name']}</CardTitle>
			<CardBody>
			<CardText> Hope you're having a great day</CardText>
			</CardBody>
			<Button>
				<a href='./profile' class="btn btn-primary">Profile</a>
			</Button>
			</Card>
			<Card>
			<CardBody>
			<CardTitle>Nutrition-at-a-glance</CardTitle>
			<CardSubtitle>Heres a look at your nutritional budget for the day</CardSubtitle>
			{warning}
			<BarChart
					axes
					grid
					height={400}
					barWidth={350}
					yDomainRange={[0,400]}
					margin={{top: 10, left: 30, bottom: 30, right: 50}}
					data={[
							{ x: 'Protein Goal', y: this.state.goals["protein"], color: '#cc00ff' },
							{ x: 'Protein', y: this.state.current_progress["protein"], color: '#cc00ff'},
							{ x: 'Fat Goal', y: this.state.goals["fat"], color: '#00e58d' },
							{ x: 'Fat', y: this.state.current_progress["fat"], color: '#00e58d'},
							{ x: 'Carbs Goal', y: this.state.goals["carbs"], color: '#00428d' },
							{ x: 'Carbs', y: this.state.current_progress["carbs"], color: '#00428d'}
					]}
					clickHandler={(d) => this.setState({dataDisplay: `The value of ${d.x} is ${d.y} grams`})}
				/>
				<div style={{display: 'inline-block', verticalAlign: 'top', paddingLeft: '20px'}}>
      		{this.state.dataDisplay ? this.state.dataDisplay : 'Click on a bar to show the value'}
    		</div>
				
			</CardBody>
			<Button>
				<a href='./progress' class="btn btn-primary">Daily Nutrients</a>
			</Button>
			</Card>
			<Card>
				<CardBody>
					<CardTitle>Today's Recommendations</CardTitle>

					{this.state.restaurants.map((restaurant, index) => (
						<div>
							<img src={restaurant.image_url} style={ { width: 80 + 'px', height: 80 + 'px', float: "left" } }></img>
							<h6>{restaurant.name}</h6>
							<p>{ restaurant.rating } / 5.0 Stars</p>
							<Button onClick={() => this.favoriteRestaurant(restaurant)}>Insta-Favorite</Button>
							<hr style={ { marginTop: 50 + 'px' } }/>
						</div>
					))}

				</CardBody>
			</Card>
		</CardDeck>
		
	
		</div>
			);
  	}
}
export default MainPage;
