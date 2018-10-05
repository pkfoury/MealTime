import React, { Component } from 'react';
import './general.css'

class DailyEntryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownItems: [],
            items: [],
            selectedItem: null,
            totalCalorieCount: 0
        }
    }

    doSearch(term) {
        var link = 'https://api.nal.usda.gov/ndb/search/?format=json&q=' + term + '&sort=n&max=25&offset=0&api_key=WzLOlbq03SgcdDo2zPXUp5YgebYGwbcLcDnQJv8H';
        fetch(link).then(function(response) {
            return response.json();
        }).then(function(jsonData) {
            console.log(jsonData);
            if (jsonData.list == null) {
                return;
            }
            const items = jsonData.list.item;
            this.setState({ dropdownItems: items });

            console.log("hmm");
            if (items.length == 1) {
                console.log("adsafsd");
                console.log(items[0]);
                this.setState({ selectedItem: items[0] });
            }
        }.bind(this));
    }

    addItemToDailyList() {
        var link='https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=WzLOlbq03SgcdDo2zPXUp5YgebYGwbcLcDnQJv8H&ndbno=' + this.state.selectedItem.ndbno + '&nutrients=208';
        fetch(link).then(function(response) {
            return response.json();
        }).then(function(jsonData) {
            console.log(jsonData);
            var arrayItems = this.state.items.slice();
            arrayItems.push(jsonData.report.foods[0]);
            this.setState({ items: arrayItems, dropdownItems: [], totalCalorieCount: this.state.totalCalorieCount + +jsonData.report.foods[0].nutrients[0].value });
        }.bind(this));
    }

    render() {

        return(
            <div>
                <div className="row col-centered">
                    <h3>Add your daily items below:</h3>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-centered">
                        <input type="text"
                            onChange={event => this.doSearch(event.target.value)} 
                            className="form-control" 
                            placeholder="Search for foods" 
                            id="foodSearch"
                            list="items"
                            />
                        <datalist id="items">
                            {this.state.dropdownItems.map((dropdownItem, index) => (
                                <option key={dropdownItem.nbdno} value={dropdownItem.name}/>
                            ))}
                        </datalist>
                        <div>
                            <button className="btn-success btn" onClick={() => this.addItemToDailyList()}>Add Item</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <h3>Your Day So Far</h3>
                </div>
                <div className="row">
                    <div className="col-lg-8 col-centered">
                        <div className="row">
                            <h5 className="col-lg-5">Item</h5>
                            <h5 className="col-lg-3">Measurement</h5>
                            <h5 className="col-lg-3">Calories</h5>
                        </div>
                        {this.state.items.map((item, index) => (
                            <div key={item.name} className="selected-item-row row">
                                <div className="col-lg-5">{item.name}</div>
                                <div className="col-lg-3">{item.measure}</div>
                                <div className="col-lg-3">{item.nutrients[0].value} calories</div>
                            </div>
                        ))}
                        <div className="row">
                            <h3 className="col-lg-8">Total Calorie Count</h3>
                            <h3 className="col-lg-3">{this.state.totalCalorieCount}</h3>
                        </div>
                    </div>
                </div>
                <div class="row">
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