import React, { Component } from 'react';
import './general.css'

class DailyEntryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownItems: [],
            breakfastItems: [],
            lunchItems: [],
            dinnerItems: [],
            snackItems: [],
            selectedItem: null,
            totalCalorieCount: 0
        }
    }

    doSearch(term) {
        var link = 'https://api.nal.usda.gov/ndb/search/?format=json&q=' + term + '&sort=n&max=25&offset=0&api_key=WzLOlbq03SgcdDo2zPXUp5YgebYGwbcLcDnQJv8H';
        fetch(link).then(function(response) {
            return response.json();
        }).then(function(jsonData) {
            if (jsonData.list == null) {
                return;
            }
            const items = jsonData.list.item;
            this.setState({ dropdownItems: items });

            if (items.length == 1) {
                this.setState({ selectedItem: items[0] });
            }
        }.bind(this));
    }

    addItemToDailyList(meal) {
        if (this.state.selectedItem == null) {
            return; // Failure
        }
        var link='https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=WzLOlbq03SgcdDo2zPXUp5YgebYGwbcLcDnQJv8H&ndbno=' + this.state.selectedItem.ndbno + '&nutrients=208&nutrients=203&nutrients=204&nutrients=205';
        fetch(link).then(function(response) {
            return response.json();
        }).then(function(jsonData) {
            console.log(jsonData);
            var arrayItems = this.grabMealArray(meal).slice();
            arrayItems.push(jsonData.report.foods[0]);
            this.setState({ dropdownItems: [], selectedItem: null, totalCalorieCount: this.state.totalCalorieCount + +jsonData.report.foods[0].nutrients[0].value });
            this.setMealArray(meal, arrayItems);
            this.refs.foodSearch.value = '';
        }.bind(this));
    }

    grabMealArray(meal) {
        switch (meal) {
            case "breakfast":
                return this.state.breakfastItems;
            case "lunch":
                return this.state.lunchItems;
            case "dinner":
                return this.state.dinnerItems;
            case "snacks":
                return this.state.snackItems;
        }
    }

    setMealArray(meal, arrayItems) {
        switch(meal) {
            case "breakfast":
                this.setState({ breakfastItems: arrayItems });
                break;
            case "lunch":
                this.setState({ lunchItems: arrayItems });
                break;
            case "dinner":
                this.setState({ dinnerItems: arrayItems });
                break;
            case "snacks":
                this.setState({ snackItems: arrayItems });
                break;
        }
    }

    deleteItemFromMeal(meal, itemName) {
        var mealArray = this.grabMealArray(meal);
        for (let i = 0; i < mealArray.length; i++) {
            if (mealArray[i].name === itemName) {
                this.setState({ totalCalorieCount: this.state.totalCalorieCount - mealArray[i].nutrients[0].value });
                mealArray.splice(i, 1);
                break;
            }
        }
        this.setMealArray(meal, mealArray);
    }

    render() {
        return(
            <div>
                <br/>
                <div className="row">
                    <div className="col-lg-4 col-centered">
                        <input type="text"
                            onChange={event => this.doSearch(event.target.value)}
                            className="form-control"
                            placeholder="Search for foods"
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
                            <div className="btn-group">
                                <button className="btn-outline-success btn" onClick={() => this.addItemToDailyList("breakfast")}>Breakfast</button>
                                <button className="btn-outline-primary btn" onClick={() => this.addItemToDailyList("lunch")}>Lunch</button>
                                <button className="btn-outline-info btn" onClick={() => this.addItemToDailyList("dinner")}>Dinner</button>
                                <button className="btn-outline-danger btn" onClick={() => this.addItemToDailyList("snacks")}>Snacks</button>
                            </div>
                            <button className="btn-warning btn">Cheat Day</button>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div className="your-day-title row">
                    <h3 className="col-lg-4 col-centered">Your Day So Far</h3>
                    <br />
                </div>
                <div className="row">
                    <div className="col-lg-9 col-centered">
                        <div className="breakfast-container">
                            <div className="row">
                                <h3 className="col-lg-4">Breakfast</h3>
                                <hr />
                            </div>
                            <div className="row">
                                <h6 className="col-lg-3">Item</h6>
                                <h6 className="col-lg-2">Measurement</h6>
                                <h6 className="col-lg-2">Calories</h6>
                                <h6 className="col-lg-1">Protein</h6>
                                <h6 className="col-lg-1">Fat</h6>
                                <h6 className="col-lg-1">Carbs</h6>
                                <h6 className="col-lg-1"></h6>
                            </div>
                            {this.state.breakfastItems.map((item, index) => (
                                <div key={item.name} className="selected-item-row row">
                                    <div className="col-lg-3">{item.name}</div>
                                    <div className="col-lg-2">{item.measure}</div>
                                    <div className="col-lg-2">{item.nutrients[0].value}</div>
                                    <div className="col-lg-1">{item.nutrients[1].value} g</div>
                                    <div className="col-lg-1">{item.nutrients[2].value} g</div>
                                    <div className="col-lg-1">{item.nutrients[3].value} g</div>
                                    <div className="col-lg-1">
                                        <button className="btn btn-danger removeButton" onClick={() => this.deleteItemFromMeal("breakfast", item.name)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="lunch-container">
                            <div className="row">
                                <h3 className="col-lg-4">Lunch</h3>
                                <hr />
                            </div>
                            <div className="row">
                                <h6 className="col-lg-3">Item</h6>
                                <h6 className="col-lg-2">Measurement</h6>
                                <h6 className="col-lg-2">Calories</h6>
                                <h6 className="col-lg-1">Protein</h6>
                                <h6 className="col-lg-1">Fat</h6>
                                <h6 className="col-lg-1">Carbs</h6>
                                <h6 className="col-lg-1"></h6>
                            </div>
                            {this.state.lunchItems.map((item, index) => (
                                <div key={item.name} className="selected-item-row row">
                                    <div className="col-lg-3">{item.name}</div>
                                    <div className="col-lg-2">{item.measure}</div>
                                    <div className="col-lg-2">{item.nutrients[0].value}</div>
                                    <div className="col-lg-1">{item.nutrients[1].value} g</div>
                                    <div className="col-lg-1">{item.nutrients[2].value} g</div>
                                    <div className="col-lg-1">{item.nutrients[3].value} g</div>
                                    <div className="col-lg-1">
                                        <button className="btn btn-danger removeButton" onClick={() => this.deleteItemFromMeal("lunch", item.name)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="dinner-container">
                            <div className="row">
                                <h3 className="col-lg-4">Dinner</h3>
                                <hr />
                            </div>
                            <div className="row">
                                <h6 className="col-lg-3">Item</h6>
                                <h6 className="col-lg-2">Measurement</h6>
                                <h6 className="col-lg-2">Calories</h6>
                                <h6 className="col-lg-1">Protein</h6>
                                <h6 className="col-lg-1">Fat</h6>
                                <h6 className="col-lg-1">Carbs</h6>
                                <h6 className="col-lg-1"></h6>
                            </div>
                            {this.state.dinnerItems.map((item, index) => (
                                <div key={item.name} className="selected-item-row row">
                                    <div className="col-lg-3">{item.name}</div>
                                    <div className="col-lg-2">{item.measure}</div>
                                    <div className="col-lg-2">{item.nutrients[0].value}</div>
                                    <div className="col-lg-1">{item.nutrients[1].value} g</div>
                                    <div className="col-lg-1">{item.nutrients[2].value} g</div>
                                    <div className="col-lg-1">{item.nutrients[3].value} g</div>
                                    <div className="col-lg-1">
                                        <button className="btn btn-danger removeButton" onClick={() => this.deleteItemFromMeal("dinner", item.name)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="snack-container">
                            <div className="row">
                                <h3 className="col-lg-4">Snacks</h3>
                                <hr />
                            </div>
                            <div className="row">
                                <h6 className="col-lg-3">Item</h6>
                                <h6 className="col-lg-2">Measurement</h6>
                                <h6 className="col-lg-2">Calories</h6>
                                <h6 className="col-lg-1">Protein</h6>
                                <h6 className="col-lg-1">Fat</h6>
                                <h6 className="col-lg-1">Carbs</h6>
                                <h6 className="col-lg-1"></h6>
                            </div>
                            {this.state.snackItems.map((item, index) => (
                                <div key={item.name} className="selected-item-row row">
                                    <div className="col-lg-3">{item.name}</div>
                                    <div className="col-lg-2">{item.measure}</div>
                                    <div className="col-lg-2">{item.nutrients[0].value}</div>
                                    <div className="col-lg-1">{item.nutrients[1].value} g</div>
                                    <div className="col-lg-1">{item.nutrients[2].value} g</div>
                                    <div className="col-lg-1">{item.nutrients[3].value} g</div>
                                    <div className="col-lg-1">
                                        <button className="btn btn-danger removeButton" onClick={() => this.deleteItemFromMeal("snacks", item.name)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <br />
                        <hr />
                        <div className="row">
                            <h3 className="col-lg-8">Total Calorie Count</h3>
                            <h3 className="col-lg-3">{this.state.totalCalorieCount}</h3>
                        </div>
                        <div className="row">
                            <h3 className="col-lg-8">Total Amount of Money Spent</h3>
                            <label className="biggerLabel">$</label><input className="col-lg-3 input-group" type="number"></input>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <button className="btn btn-success col-lg-8 col-centered">Save Results for Day</button>
                </div>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
              integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
              crossOrigin="anonymous"></link>
            </div>
        );
    }
  }

  export default DailyEntryPage;
