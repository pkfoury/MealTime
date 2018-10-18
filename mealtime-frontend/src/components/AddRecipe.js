import React, { Component } from 'react';
import './AddRecipe.css';

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownItems: [],
      items: [],
      selectedItem: null,
      specific: null,
      specifics: [],
      term: null,
      terms: []
    }
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

  addItemToIngredientsList() {
    var arrayTerms = this.state.terms.slice();
    if (this.state.term == null) {
      return;
    }
    arrayTerms.push(this.state.term);
    this.setState({ terms: arrayTerms, term: null});
    this.refs.foodItem.value = '';
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
        this.setState({ items: arrayItems, dropdownItems: [], selectedItem: null, specifics: arrayTerms, specific: null });
        this.refs.foodSearch.value = '';
      }.bind(this));
    }
  }

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
              <label>Ingredient</label>
            </div>
            <div className="col-75">
              <input type="text"
                onChange={event => this.setState({term: event.target.value})}
                id="foodItem"
                ref="foodItem"
                name="ingredients"
                placeholder="Ingredients..."
                />
            </div>
            <div>
              <button type="button" className="btn-success btn" onClick={() => this.addItemToIngredientsList()}>Add Ingredient</button>
            </div>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
              integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
              crossOrigin="anonymous"></link>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Ingredients</label>
            </div>
            <div className="col-75">
              {this.state.terms.map((item, index) => (
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
              <label>Specific Ingredients (Optional)</label>
            </div>
            <div className="col-75">
              <input type="text"
                onChange={event => this.doSearch(event.target.value)}
                className="form-control"
                placeholder="Specific Ingredients (Optional)"
                id="foodSearch"
                list="items"
                ref="foodSearch"
                />
              <datalist id="items">
                {this.state.dropdownItems.map((dropdownItem, index) => (
                  <option key={index} value={dropdownItem.name}/>
                ))}
              </datalist>
              <div>
                <button type="button" className="btn-success btn" onClick={() => this.addItemToSpecificIngredientsList()}>Add Specific Ingredient</button>
              </div>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
                integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
                crossOrigin="anonymous"></link>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Specific Ingredient</label>
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
              <input type="text" id="instruct" name="instructions" placeholder="Instructions to cook..."/>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Time to Cook in Minutes</label>
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

export default AddRecipe;
