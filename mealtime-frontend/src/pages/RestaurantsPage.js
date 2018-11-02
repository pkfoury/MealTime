import React, { Component } from 'react';

class RestaurantsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      restaurantCount: 0,
      reviewRestaurant: null,
      reviewsToShow: []
    };
  }

  doSearch(searchTerm) {
    const YELP = require('yelp-fusion');
    const API_KEY = 'n384b999Qr0b_KGmop_D5U8T6wBTPCnPAxRjQzTcPunh_WXf1vtF9GeK8H5KNA4L8qt_ijdUzQfYyLKuiID6bnYQ1MtgCpxCZlS3cQnOrp8qvlnR71unVMExB46tW3Yx';
    const SEARCH_REQUEST = { 
      term: "restaurants",
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
    // TODO implement, make call to backend to like a restaurant
  }

  render() {
    return(
      <div>
          <h1 className="title">Restaurants</h1>
          <div class="row">
            <div className="col-lg-4"> </div>
            <div className="searchbar input-group col-lg-4">
              <input type="text" onChange={event => this.doSearch(event.target.value)} className="form-control" placeholder="Search for restaurants near you" id="restaurantSearch"/>
              <div className="input-group-btn">
                <button className="btn btn-primary">Search</button>
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
          {this.state.restaurants.map((restaurant, index) => (
            <div className="restaurant">
              <img className="restaurant-image" src={ restaurant.image_url } alt="..."></img>
              <div className="restaurant-text">
                <h3><a href={ restaurant.url }>{ restaurant.name }</a> <span className="restaurant-address">{ restaurant.location.address1 }</span></h3>
                <h5>Rating: { restaurant.rating } / 5.0</h5>
                <h5>Phone #: { restaurant.phone }</h5>
                <h5>Price: <b>{ restaurant.price }</b></h5>
                <div className="btn-group restaurant-buttons">
                  <button className="btn btn-primary" onClikc={() => this.likeRestaurant(restaurant)}>Like this recipe <i class="far fa-thumbs-up"></i></button>
                  <button className="btn btn-danger">Dislike this recipe <i class="far fa-thumbs-down"></i></button>
                  <button className="btn btn-success" onClick={() => this.showReviews(restaurant.id, restaurant)}>Show Reviews</button>
                </div>
              </div>
            </div>
          ))}
          </div>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
              integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
              crossOrigin="anonymous"></link>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css" integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns" crossorigin="anonymous"></link>
      </div>
    );
  }
}

export default RestaurantsPage;