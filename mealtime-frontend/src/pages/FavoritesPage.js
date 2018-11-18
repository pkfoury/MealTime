import React, { Component } from 'react';
import './general.css'

class FavoritesPage extends Component {
  constructor(props) {
    super(props);

    // TODO: Figure out a way to fetch this information
    this.state = {
      favoriteRestaurants: [],
      favoriteRecipes: []
    }
  }

  render() {
    return (
      <div>
        <div className="row favorite-restaurants col-md-11 col-centered">
          <div className="col-md-4" style={{borderRight: "solid 1px black" }}>
            <h3>Favorite Restaurants</h3>
            {this.state.favoriteRestaurants.map((restaurant, index) => (
              <div>
                <h5><a href="">{restaurant.name}</a></h5>
                <p>{restaurant.rating} / 5</p>
              </div>
            ))}
          </div>
          <div className="col-md-4">
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
