import React, { Component } from 'react';
import { apiPost } from '../functions/Api';

class RestaurantsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      filteredRestaurants: [],
      restaurantCount: 0,
      reviewRestaurant: null,
      reviewsToShow: [],
      pricePreference: '',
      searchTerm: ''
    };

    this.changePriceOption = this.changePriceOption.bind(this);
  }

  doSearch(searchTerm) {
    this.setState({ searchTerm: searchTerm });
    const YELP = require('yelp-fusion');
    const API_KEY = 'n384b999Qr0b_KGmop_D5U8T6wBTPCnPAxRjQzTcPunh_WXf1vtF9GeK8H5KNA4L8qt_ijdUzQfYyLKuiID6bnYQ1MtgCpxCZlS3cQnOrp8qvlnR71unVMExB46tW3Yx';
    const SEARCH_REQUEST = { 
      term: searchTerm,
      location: 'west lafayette, in',
    };
    const YELP_CLIENT = YELP.client(API_KEY);

    YELP_CLIENT.search(SEARCH_REQUEST).then(
      response => {
        const results = response.jsonBody.businesses;
        results.forEach(business => {
          business.reviews = [];
        });
        this.setState({ restaurants: results, restaurantCount: results.length });
        this.filterRestaurants();
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

  likeRestaurant(restaurant) {
    console.log(restaurant);
    let data = {
      id: restaurant.id,
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

  changePriceOption(event) {
    this.setState({ pricePreference: event.target.value });
    this.doSearch(this.state.searchTerm);
  }

  filterRestaurants() {
    if (this.state.pricePreference === '') {
      this.setState({ filteredRestaurants: this.state.restaurants });
      return;
    }

    var filteredRestaurants = [];
    this.state.restaurants.forEach(business => {
      if (business.price === this.state.pricePreference) {
        filteredRestaurants.push(business);
      }
    });

    this.setState({ filteredRestaurants, filteredRestaurants });
  }

  renderNoResultsMessage() {
    if (this.state.filteredRestaurants.length > 0 || this.state.searchTerm == '') return ( <span></span>);

    return (
      <h3>No results found.</h3>
    );
  }

  render() {
    return(
      <div>
          <h1 className="title">Restaurants Near You</h1>
          <div className="row">
            <div className="col-lg-4"> </div>
              <div className="input-group col-lg-4 mb-3">
                <input type="text" onChange={event => this.doSearch(event.target.value)} className="form-control" placeholder="Search for restaurants near you" id="restaurantSearch"/>
                <div className="input-group-append">
                  <button className="btn btn-secondary" onClick={() => this.doSearch(this.state.searchTerm)}>Search</button>
                </div>
                <div className="input-group-append" style={{ marginLeft: 10 + 'px' }}>
                  <select onChange={this.changePriceOption}>
                    <option value="any">Any Price</option>
                    <option value="$">$   (Cheap)</option>
                    <option value="$$">$$  (Mid-range)</option>
                    <option value="$$$">$$$ (Pricey)</option>
                  </select>
                </div>
            </div>
            <div className="col-lg-4"></div>
          </div>
          <br />
          {this.state.reviewsToShow.length > 0 && (<div className="reviews col-lg-7 col-centered">
            <h5>Reviews for {this.state.reviewRestaurant}</h5>
            {this.state.reviewsToShow.map((review, index) => (
              <p>{ review }</p>
            ))}
          </div>)}
          <div className="results">
          {this.state.filteredRestaurants.map((restaurant, index) => (
            <div className="restaurant">
              <img className="restaurant-image" src={ restaurant.image_url } alt="..."></img>
              <div className="restaurant-text">
                <h3><a href={ restaurant.url }>{ restaurant.name }</a> <span className="restaurant-address">{ restaurant.location.address1 }</span></h3>
                <h5>Rating: { restaurant.rating } / 5.0</h5>
                <h5>Phone #: { restaurant.phone }</h5>
                <h5>Price: <b>{ restaurant.price }</b></h5>
                <div className="btn-group restaurant-buttons">
                  <button className="btn btn-secondary" onClick={() => this.likeRestaurant(restaurant)}>Like this recipe <i className="far fa-thumbs-up"></i></button>
                  <button className="btn btn-secondary">Dislike this recipe <i className="far fa-thumbs-down"></i></button>
                  <button className="btn btn-secondary" onClick={() => this.showReviews(restaurant.id, restaurant)}>Show Reviews</button>
                </div>
              </div>
            </div>
          ))}
          { this.renderNoResultsMessage() }
          </div>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
              integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
              crossOrigin="anonymous"></link>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css" integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns" crossOrigin="anonymous"></link>
      </div>
    );
  }
}

export default RestaurantsPage;
