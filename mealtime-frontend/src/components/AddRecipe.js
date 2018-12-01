import React, { Component } from 'react';
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
          uom: null,
          calories: 0,
          total_fat: 0,
          trans_fat: 0,
          cholesterol: 0,
          sodium: 0,
          total_carbs: 0,
          protein: 0,
          serving_size: 0.0,
          allergen: null,
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
      total_calories: 0,
      total_carbs: 0,
      total_fat: 0,
      total_trans_fat: 0,
      total_protein: 0,
      total_sodium: 0,
      total_cholesterol: 0,
      tempAllergen: "None"
    };
    this.updaterecipe_name = this.updaterecipe_name.bind(this);
    this.updateInstructions = this.updateInstructions.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.updateDifficulty = this.updateDifficulty.bind(this);
    this.updateAmount = this.updateAmount.bind(this);
    this.updateUom = this.updateUom.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateAllergen = this.updateAllergen.bind(this);
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

  updateAllergen (e) {
    this.setState({ tempAllergen: e.target.value });
    console.log(this.state.tempAllergen);
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
      var link='https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=WzLOlbq03SgcdDo2zPXUp5YgebYGwbcLcDnQJv8H&ndbno=' + this.state.selectedItem.ndbno + '&nutrients=203&nutrients=204&nutrients=205&nutrients=208&nutrients=307&nutrients=601&nutrients=605';
      fetch(link).then(function(response) {
        return response.json();
      }).then(function(jsonData) {
        console.log(jsonData);
        var arrayItems = this.state.items.slice();
        arrayItems.push(jsonData.report.foods[0]);
        arrayTerms.push(jsonData.report.foods[0].name);
        const item = {
          name: jsonData.report.foods[0].name,
          amount: +this.state.tempAmount,
          uom: jsonData.report.foods[0].measure.substring(jsonData.report.foods[0].measure.indexOf(" ")+1),
          allergen: this.state.tempAllergen,
          calories: +jsonData.report.foods[0].nutrients[4].value,
          protein: +jsonData.report.foods[0].nutrients[0].value,
          total_fat: +jsonData.report.foods[0].nutrients[1].value,
          trans_fat: +jsonData.report.foods[0].nutrients[6].value,
          total_carbs: +jsonData.report.foods[0].nutrients[2].value,
          cholesterol: +jsonData.report.foods[0].nutrients[3].value,
          sodium: +jsonData.report.foods[0].nutrients[5].value,
          serving_size: +jsonData.report.foods[0].measure.substring(0, jsonData.report.foods[0].measure.indexOf(" "))
        };
        if (this.state.tempAllergen == "None") {
          item.allergen = null;
        }
        if (isNaN(item.calories)){
          item.calories = 0;
        }
        item.calories *= item.amount;
        if (isNaN(item.sodium)){
          item.sodium = 0;
        }
        item.sodium *= item.amount;
        if (isNaN(item.protein)){
          item.protein = 0;
        }
        item.protein *= item.amount;
        if (isNaN(item.total_fat)){
          item.total_fat = 0;
        }
        item.total_fat *= item.amount;
        if (isNaN(item.trans_fat)){
          item.trans_fat = 0;
        }
        item.trans_fat *= item.amount;
        if (isNaN(item.total_carbs)){
          item.total_carbs = 0;
        }
        item.total_carbs *= item.amount;
        if (isNaN(item.cholesterol)){
          item.cholesterol = 0;
        }
        item.cholesterol *= item.amount;
        var carbs = this.state.total_carbs;
        carbs += item.total_carbs;
        var fat = this.state.total_fat;
        fat += item.total_fat;
        var calories = this.state.total_calories;
        calories += item.calories;
        var trans_fat = this.state.total_trans_fat;
        trans_fat += item.trans_fat;
        var protein = this.state.total_protein;
        protein += item.protein;
        var cholesterol = this.state.total_cholesterol;
        cholesterol += item.cholesterol;
        var sodium = this.state.total_sodium;
        sodium += item.sodium;
        var arrayIngredients = this.state.ingredients.slice();
        arrayIngredients.push(item);
        this.setState({
          items: arrayItems,
          ingredients: arrayIngredients,
          dropdownItems: [],
          selectedItem: null,
          specifics: arrayTerms,
          specific: null,
          total_carbs: carbs,
          total_fat: fat,
          total_calories: calories,
          total_trans_fat: trans_fat,
          total_protein: protein,
          total_cholesterol: cholesterol,
          total_sodium: sodium
        });
        this.refs.foodSearch.value = '';
        console.log(this.state.ingredients);
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
      'total_calories': this.state.total_calories,
      'total_fat': this.state.total_fat,
      'total_carbs': this.state.total_carbs,
      'total_trans_fat': this.state.total_trans_fat,
      'total_protein': this.state.total_protein,
      'total_cholesterol': this.state.total_cholesterol,
      'total_sodium': this.state.total_sodium,
      'difficulty': this.state.difficulty,
      'num_ingredients': this.state.ingredients.length
    };
    //apiPost('add_recipes', recipeInfo)
    apiPost('add_recipes', recipeInfo)
      .then(({data})=> {
        console.log(data);
        if (data.status === "SUCCESS") {
          alert('Recipe successfully added');
          this.props.history.push('/home');
        }
      })

      .catch((err) => {
        alert('Failed to add recipe');
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-control">
            <div class="row">
              <label className="col-lg-3" for="recipe_name">Recipe Name:</label>
              <input type="text" className="form-control col-lg-9" id="recipe_name" placeholder="Recipe Name..." onChange={this.updaterecipe_name}/>
            </div>
            <div class="row">
              <label className="col-lg-3" for="ingredient">Ingredient:</label>
              <input type="text"
                onChange={event => this.doSearch(event.target.value)}
                className="form-control col-lg-3"
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
              <input type="number" className="form-control col-lg-2" id="ingredientCount" placeholder="1" step="1" min="1" onChange={this.updateAmount} />
              <input type="text" className="form-control col-lg-2" id="unit" placeholder="Unit Type (Tablespoons, teaspoons, etc.)" onChange={this.updateUom} />
              <select name="allergens" className="form-control col-lg-2" id="allergens" placeholder="Allergens" onChange={this.updateAllergen}>
                <option value="None">None</option>
                <option value="Lactose">lactose</option>
                <option value="Eggs">eggs</option>
                <option value="Fish">fish</option>
                <option value="Shellfish">shellfish</option>
                <option value="Nuts">nuts</option>
                <option value="Peanuts">peanuts</option>
                <option value="Gluten">gluten</option>
                <option value="Soy">soy</option>
              </select>
            </div>
            <div>
              <div className="btn btn-large btn-success" onClick={() => this.addItemToSpecificIngredientsList()}>Add Ingredient</div>
            </div>
            <br />
            <div class="row">
              <label className="col-lg-3" for="ingredients">Ingredients:</label>
              {this.state.specifics.map((item, index) => (
                <div key={item} className="selected-item-row row">
                  <div className="col-lg-9">{item}</div>
                </div>
              ))}
            </div>
            <div class="row">
              <label className="col-lg-3" for="instructions">Instructions:</label>
              <input type="text" className="form-control col-lg-9" id="instructions" placeholder="Instructions to cook..." onChange={this.updateInstructions} />
            </div>
            <div class="row">
              <label className="col-lg-3" for="cookTime">Time to Cook:</label>
              <input type="string" className="col-lg-1" id="cookTime" placeholder="00:00" onChange={this.updateTime}/>
            </div>
            <div class="row">
              <label className="col-lg" for="calories">Total Calories: {this.state.total_calories}</label>
            </div>
            <div class="row">
              <label className="col-lg-2" for="total_fat">Total Fat: {this.state.total_fat}</label>
              <label className="col-lg-2" for="total_trans_fat">Total Trans Fat: {this.state.total_trans_fat}</label>
              <label className="col-lg-2" for="total_carbs">Total Carbohydrates: {this.state.total_carbs}</label>
              <label className="col-lg-2" for="total_protein">Total Protein: {this.state.total_protein}</label>
              <label className="col-lg-2" for="total_cholesterol">Total Cholesterol: {this.state.total_cholesterol}</label>
              <label className="col-lg-2" for="total_sodium">Total Sodium: {this.state.total_sodium}</label>
            </div>
            <button className="btn btn-large btn-success">Add Recipe</button>
          </div>
        </form>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
              integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
              crossorigin="anonymous"></link>
      </div>

    );
  }
}

export default AddRecipe;
