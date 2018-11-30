import React, { Component } from 'react';
import './general.css'
import { apiGet } from '../functions/Api';
import axios from 'axios';

class FavoritesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favoriteRestaurants: [],
      favoriteRecipes: []
    }

    const YELP = require('yelp-fusion');
    const API_KEY = 'n384b999Qr0b_KGmop_D5U8T6wBTPCnPAxRjQzTcPunh_WXf1vtF9GeK8H5KNA4L8qt_ijdUzQfYyLKuiID6bnYQ1MtgCpxCZlS3cQnOrp8qvlnR71unVMExB46tW3Yx';
    const YELP_CLIENT = YELP.client(API_KEY);
    apiGet('get_restaurant_preferences').then(({data}) => {
      data.data.forEach(restaurant => {
        const options = {
          method: 'GET',
          dataType: 'json',
          headers: {
            'Authorization': 'Bearer n384b999Qr0b_KGmop_D5U8T6wBTPCnPAxRjQzTcPunh_WXf1vtF9GeK8H5KNA4L8qt_ijdUzQfYyLKuiID6bnYQ1MtgCpxCZlS3cQnOrp8qvlnR71unVMExB46tW3Yx'
          }
        }
        axios.get('https://api.yelp.com/v3/businesses/' + restaurant.yelp_id, options).then((data) => {
          let usersFavoriteRestaurants = this.state.favoriteRestaurants;
          usersFavoriteRestaurants.push(data.data);
          console.log(data.data);
          this.setState({ favoriteRestaurants: usersFavoriteRestaurants });
        });
      });
    });

    apiGet('get_recipe_preferences').then(({data}) => {
      let preferenceData = data.data;
      let validRecipes = [];
      preferenceData.forEach((value) => { // For anybody reading this insanity, as of 11/29/2018 at 8:57 PM there is
        if (value !== null) {             // some null data in our database that will crash this page, so this filters
          validRecipes.push(value);       // those out. Until we remove those entries this needs to stay.
        }
      });
      this.setState({ favoriteRecipes: validRecipes });
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 favorite-card" style={{borderRight: "solid 1px black" }}>
            <h3>Favorite Restaurants</h3>
            {this.state.favoriteRestaurants.map((restaurant, index) => (
              <div key={index}>
                <img className="restaurant-image-sm" src={restaurant.image_url} />
                <div className="favoritesText">
                  <h5><a href={restaurant.url}>{restaurant.name}</a></h5>
                  <p>{restaurant.rating} / 5</p>
                  <p>{restaurant.display_phone}</p>
                </div>
                <hr/>
              </div>
            ))}
          </div>
          <div className="col-md-6 favorite-card">
            <h3>Favorite recipes</h3> 
            {this.state.favoriteRecipes.map((recipe, index) => (
              <div key={index} className="favoriteItem">
                <h5>{recipe.recipe_name}</h5>
                <p><i className="fas fa-clock"></i> {recipe.cook_time}</p>
                <p>Instructions: {recipe.instructions}</p>
                <hr />
              </div>
            ))}
          </div>
        </div>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
              integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
              crossorigin="anonymous"></link>
      </div>
    );
  }
}

export default FavoritesPage;
