import React, { Component } from 'react';
import './AddRecipe.css';

class AddRecipe extends Component {
  render() {
    return (
      <div className="AddRecipe">
        <form>
          <div className="row">
            <div className="col-25">
              <label>Recipe Name</label>
            </div>
            <div className="col-75">
              <input type="text" id="rName" name="recipeName" placeholder="Your recipe name..."/>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Ingredients</label>
            </div>
            <div className="col-75">
              <input type="text" id="ingred" name="ingredients" placeholder="Ingredients required..."/>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Instructions</label>
            </div>
            <div className="col-75">
              <input type="text" id="instruct" name="instructions" placeholder="Instructions to cook..."/>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Time to Cook</label>
            </div>
            <div className="col-75">
              <input type="number" id="time" name="timeToCook" placeholder="0" step="1" min="0"/>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Difficulty</label>
            </div>
            <div className="col-75">
              <select id="difficult" name="difficulty">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div className="row">
            <input type="submit" value="Submit"/>
          </div>
        </form>
      </div>
    )
  }
}

export default AddRecipe
