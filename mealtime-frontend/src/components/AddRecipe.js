import React, { Component } from 'react';
import './AddRecipe.css';
import dateFns from 'date-fns';
import { apiPost } from '../functions/Api';
import axios from 'axios';
import { apiGet } from '../functions/Api';

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownItems: [],
      items: [],
      ingredients: [
        {
          name: '',
          amount: null,
          uom: null
        }
      ],
      selectedItem: null,
      specific: null,
      specifics: [],
      recipe_name: '',
      instructions: '',
      time: "",
      difficulty: 1,
      tempAmount: 0,
      tempUom: null,
      user_id: null
    };
    this.updaterecipe_name = this.updaterecipe_name.bind(this);
    this.updateInstructions = this.updateInstructions.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.updateDifficulty = this.updateDifficulty.bind(this);
    this.updateAmount = this.updateAmount.bind(this);
    this.updateUom = this.updateUom.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    apiGet('users').then(({data}) => {
      console.log(data);
      console.log(data.data.id);
      this.setState({ user_id: data.data.id});
    });
  }

  updaterecipe_name (e) {
    this.setState({ recipe_name: e.target.value });
    //console.log(this.state.recipe_name);
  }

  updateInstructions (e) {
    this.setState({ instructions: e.target.value });
  }

  updateTime (e) {
    this.setState({ time: e.target.value });
  }

  updateDifficulty (e) {
    this.setState({ difficulty: e.target.value });
  }

  updateAmount (e) {
    this.setState({ tempAmount: e.target.value });
  }

  updateUom (e) {
    this.setState({ tempUom: e.target.value });
  }

  doSearch(term) {
    var link = 'https://api.nal.usda.gov/ndb/search/?format=json&q=' + term + '&sort=n&max=25&offset=0&api_key=WzLOlbq03SgcdDo2zPXUp5YgebYGwbcLcDnQJv8H';
    fetch(link).then(function(response) {
      return response.json();
    }).then(function(jsonData) {
      console.log(jsonData);
      if (jsonData.list == null) {
        this.setState({ specific: term});
        return;
      }
      const items = jsonData.list.item;
      this.setState({dropdownItems: items});
      if (items.length == 1) {
        this.setState({ selectedItem: items[0] });
      }
      else {
        this.setState({ specific: term});
      }
    }.bind(this));
  }

  addItemToSpecificIngredientsList() {
    var arrayTerms = this.state.specifics.slice();
    if (this.state.selectedItem == null) {
      this.refs.foodSearch.value = '';
    }
    else {
      var link='https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=WzLOlbq03SgcdDo2zPXUp5YgebYGwbcLcDnQJv8H&ndbno=' + this.state.selectedItem.ndbno + '&nutrients=208';
      fetch(link).then(function(response) {
        return response.json();
      }).then(function(jsonData) {
        console.log(jsonData);
        var arrayItems = this.state.items.slice();
        arrayItems.push(jsonData.report.foods[0]);
        arrayTerms.push(jsonData.report.foods[0].name);
        const item = {
          name: jsonData.report.foods[0].name,
          amount: this.state.tempAmount,
          uom: this.state.tempUom
        };
        var arrayIngredients = this.state.ingredients.slice();
        arrayIngredients.push(item);
        this.setState({ items: arrayItems, ingredients: arrayIngredients, dropdownItems: [], selectedItem: null, specifics: arrayTerms, specific: null });
        this.refs.foodSearch.value = '';
      }.bind(this));
      console.log(this.state.ingredients);
    }
  }

  handleSubmit(event) {

    event.preventDefault();
    const recipeInfo = {
      'recipe_name': this.state.recipe_name,
      'instructions': this.state.instructions,
      'cook_time': this.state.time,
      'ingredients': this.state.ingredients,
      'instructions': this.state.instructions,
      'user_id': this.state.user_id
    };
    axios.post('http://127.0.0.1:3000/api/v1/add_recipes', recipeInfo)
    //apiPost('add_recipes', recipeInfo)
      .then(({data})=> {
        console.log(data);
        if (data.status === "SUCCESS") {
          this.props.history.push('/mainpage')
        }
      })

      .catch((err) => {
        alert('Failed to add recipe');
        console.log(err);
      })
  }

  render() {
    return (
      <div className="AddRecipe">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="row">
              <div className="col-25">
                <label>Recipe Name</label>
              </div>
              <div className="col-75">
                <input type="text" id="recipe_name" name="recipe_name" ref="recipeName" placeholder="Your recipe name..." onChange={this.updaterecipe_name} />
              </div>
            </div>
          <div className="row">
            <div className="col-25">
              <label>Ingredient</label>
            </div>
            <div className="col-40">
              <input type="text"
                onChange={event => this.doSearch(event.target.value)}
                className="form-control"
                placeholder="Ingredient..."
                id="foodSearch"
                list="items"
                ref="foodSearch"
                />
              <datalist id="items">
                {this.state.dropdownItems.map((dropdownItem, index) => (
                  <option key={index} value={dropdownItem.name}/>
                ))}
              </datalist>
            </div>
            <div className="col-15">
              <input type="number" id="count" name="ingredientCount" placeholder="1" step="1" min="1" onChange={this.updateAmount} />
            </div>
            <div className="col-20">
              <input type="text" id="unit" name="unitType" placeholder="Unit Type (Tablespoons, teaspoons, etc.)"/>
            </div>
          </div>
          <div>
            <button type="button" className="btn-success btn" onClick={() => this.addItemToSpecificIngredientsList()}>Add Specific Ingredient</button>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Ingredients</label>
            </div>
            <div className="col-75">
              {this.state.specifics.map((item, index) => (
                <div key={item} className="selected-item-row row">
                  <div className="col-lg-5">{item}</div>
                </div>
              ))}
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
                integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
                crossOrigin="anonymous"></link>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Instructions</label>
            </div>
            <div className="col-75">
              <input type="text" id="instruct" name="instructions" placeholder="Instructions to cook..." onChange={this.updateInstructions} />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Time to Cook in Minutes</label>
            </div>
            <div className="col-75">
              <input type="string" id="time" name="timeToCook" placeholder="00:00"  onChange={this.updateTime} />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Difficulty</label>
            </div>
            <div className="col-75">
              <select id="difficult" name="difficulty" onChange={this.updateDifficulty} >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div className="row">
            <input className="btn btn-primary btn-lg" type="submit" value="Submit"/>
          </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddRecipe;
