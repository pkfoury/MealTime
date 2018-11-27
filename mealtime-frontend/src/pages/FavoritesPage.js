import React, { Component } from 'react';
import './general.css'
import { apiGet } from '../functions/Api';
import axios from 'axios';

class FavoritesPage extends Component {
  constructor(props) {
    super(props);

    // TODO: Figure out a way to fetch this information
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
  }

  render() {
    return (
      <div>
        <div className="row favorite-restaurants col-md-11 col-centered">
          <div className="col-md-5" style={{borderRight: "solid 1px black" }}>
            <h3>Favorite Restaurants</h3>
            {this.state.favoriteRestaurants.map((restaurant, index) => (
              <div key={index}>
                <img className="restaurant-image-sm" src={restaurant.image_url} />
                <h5><a href={restaurant.url}>{restaurant.name}</a></h5>
                <p>{restaurant.rating} / 5</p>
                <p>{restaurant.display_phone}</p>
                <hr/>
              </div>
            ))}
          </div>
          <div className="col-md-5">
            <h3>Favorite recipes</h3> 
            {this.state.favoriteRecipes.map((recipe, index) => (
              <div>
                <h5><a href="">{recipe.name}</a></h5>
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
