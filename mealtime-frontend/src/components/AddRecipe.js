import React, { Component } from 'react';
import axios from 'axios';
import './AddRecipe.css';

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
      recipeName: '',
      instructions: '',
      time: 0,
      difficulty: 1,
      tempAmount: 0,
      tempUom: null
    }
    this.updateRecipeName = this.updateRecipeName.bind(this);
    this.updateInstructions = this.updateInstructions.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.updateDifficulty = this.updateDifficulty.bind(this);
    this.updateAmount = this.updateAmount.bind(this);
    this.updateUom = this.updateUom.bind(this);
  }

  updateRecipeName (e) {
    this.setState({ recipeName: e.target.value });
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
      arrayTerms.push(this.state.specific);
      this.setState({ dropdownItems: [], selectedItem: null, specifics: arrayTerms, specific: null});
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
          name: jsonData.report.foods[0],
          amount: this.state.tempAmount,
          uom: this.state.tempUom
        }
        var arrayIngredients = this.state.ingredients.slice();
        arrayIngredients.push(item);
        this.setState({ items: arrayItems, ingredients: arrayIngredients, dropdownItems: [], selectedItem: null, specifics: arrayTerms, specific: null });
        this.refs.foodSearch.value = '';
      }.bind(this));
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    const recipeInfo = {
      recipe_name: this.state.recipeName,
      instructions: this.state.instructions,
      cook_time: this.state.time,
      ingredients: this.state.ingredients
    };

    axios.post('http://127.0.0.1:3000/api/v1/recipes', recipeInfo)
      .then(({data}) => {
        console.log(data);
        this.setState({
          user: data
        });
      })

      .then((res) => {
        console.log('second request is okay');
      })

      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="AddRecipe">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-25">
              <label>Recipe Name</label>
            </div>
            <div className="col-75">
              <input type="text" id="rName" name="recipeName" placeholder="Your recipe name..." onChange={this.updateRecipeName} />
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
              <input type="number" id="time" name="timeToCook" placeholder="0" step="1" min="0" onChange={this.updateTime} />
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
            <input type="submit" value="Submit"/>
          </div>
        </form>
      </div>
    )
  }
}

export default AddRecipe;
