import React, { Component } from 'react';

class RestaurantsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      restaurantCount: 0
    };
  }

  doSearch(searchTerm) {
    const YELP = require('yelp-fusion');
    const API_KEY = 'n384b999Qr0b_KGmop_D5U8T6wBTPCnPAxRjQzTcPunh_WXf1vtF9GeK8H5KNA4L8qt_ijdUzQfYyLKuiID6bnYQ1MtgCpxCZlS3cQnOrp8qvlnR71unVMExB46tW3Yx';
    const SEARCH_REQUEST = { 
      term: searchTerm,
      location: 'west lafayette, in'
     };
    const YELP_CLIENT = YELP.client(API_KEY);

    YELP_CLIENT.search(SEARCH_REQUEST).then(
      response => {
        const results = response.jsonBody.businesses;
        this.setState({ restaurants: results, restaurantCount: results.length })
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return(
      <div>
          <h1 className="title left-hover">Restaurants</h1>
          <div className="searchbar input-group col-lg-4 left-hover">
            <input type="text" onChange={event => this.doSearch(event.target.value)} className="form-control" placeholder="Search for restaurants near you" id="restaurantSearch"/>
            <div className="input-group-btn">
              <button className="btn btn-primary" onClick={() => this.doSearch('McDonalds')}>Search</button>
            </div>
          </div>
          <div className="results">
          {this.state.restaurants.map((restaurant, index) => (
            <div class="restaurant">
              <img className="restaurant-image" src={ restaurant.image_url }></img>
              <div class="restaurant-text">
                <h3><a href={ restaurant.url }>{ restaurant.name }</a> <span class="restaurant-address">{ restaurant.location.address1 }</span></h3>
                <h5>Rating: { restaurant.rating } / 5.0</h5>
                <h5>Phone #: { restaurant.phone }</h5>
                <h5>Price: <b>{ restaurant.price }</b></h5>
              </div>
            </div>
          ))}
          </div>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
              integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
              crossOrigin="anonymous"></link>
      </div>
    );
  }
}

export default RestaurantsPage;