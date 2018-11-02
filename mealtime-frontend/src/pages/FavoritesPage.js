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
        <div clasName="row favorite-restaurants">
          <h3 className="title">Your Favorite Spots to Eat</h3>
          <img src="" style={ { width: 80 + 'px', height: 80 + 'px', float: "left" } } alt=""></img>
					<h6>Restaurant Title Here</h6>
					<p>4.7 / 5.0 Stars</p>
					<br style={ { marginTop: 50 + 'px' } }/>
          <img src="" style={ { width: 80 + 'px', height: 80 + 'px', float: "left" } } alt=""></img>
					<h6>Restaurant Title Here</h6>
					<p>4.7 / 5.0 Stars</p>
					<br style={ { marginTop: 50 + 'px' } }/>
          <hr />
          <h3 className="title">Your Favorite Recipes</h3>
          <img src="" style={ { width: 80 + 'px', height: 80 + 'px', float: "left" } } alt=""></img>
					<h6>Recipe Title Here</h6>
					<p>Recipe description here</p>
          <br />
          <img src="" style={ { width: 80 + 'px', height: 80 + 'px', float: "left" } } alt=""></img>
					<h6>Recipe Title Here</h6>
					<p>Recipe description</p>
        </div>

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
              integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
              crossorigin="anonymous"></link>
      </div>
    );
  }
}

export default FavoritesPage;
