import React, { Component } from 'react';
import './general.css'
import { apiPatch, apiGet } from '../functions/Api';

class FindRecipesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            recipes: [],
            preperationFilter: '0',
            timeFilter: '0',
            ingredientsFilter: '0',
            onlyUserRecipesFilter: false
        }
    }

    changeFilter(filter, event) {
        let value = event.target.value;
        console.log("filter: " + filter + ", val: " + value)
        if (filter === 'preperationFilter') {
            this.setState({ preperationFilter: value });
        } else if (filter === 'timeFilter') {
            this.setState({ timeFilter: value });
        } else if (filter === 'ingredientsFilter') {
            this.setState( {ingredientsFilter: value });
        }
    }

    toggleOnlyUserRecipesFilter() {
        this.setState({ onlyUserRecipesFilter: !this.state.onlyUserRecipesFilter });
    }

    doSearch(searchTerm) {
        this.setState({ searchTerm: searchTerm });
        apiGet('searchWithFilters/' + searchTerm + '/' + 
            this.state.preperationFilter + '/' + 
            this.state.timeFilter + '/' + 
            this.state.ingredientsFilter + '/' + 
            this.state.onlyUserRecipesFilter).then(({data}) => {
                this.setState({recipes: data});
            }
        );
    }

    render() {
        return (
            <div>
                <br/>
                <div className="title col-lg-12 text-center">
                    <h1>Find Recipes <i class="fas fa-utensils"></i></h1>
                </div>
                    <br/>
                
                    <div className="input-group col-lg-10">
                        <input type="text" onChange={event => this.doSearch(event.target.value)} className="form-control" placeholder="Search recipes" id="restaurantSearch"/>
                        <div className="input-group-append">
                            <button className="btn btn-secondary" onClick={() => this.doSearch(this.state.searchTerm)}>Search</button>
                        </div>
                        <div className="input-group-append" style={{ marginLeft: 10 + 'px' }} onChange={(event) => this.changeFilter('preperationFilter', event)}>
                            <select >
                                <option value="0">Preperation Difficulty</option>
                                <option value="1">Very Easy</option>
                                <option value="2">Easy</option>
                                <option value="3">Moderate</option>
                                <option value="4">Somewhat Challenging</option>
                                <option value="5">Challenging</option>
                            </select>
                        </div>
                        <div className="input-group-append" style={{ marginLeft: 10 + 'px' }} onChange={(event) => this.changeFilter('timeFilter', event)}>
                            <select>
                                <option value="0">Time</option>
                                <option value="1">Less than 15 minutes</option>
                                <option value="2">15 - 30 minutes</option>
                                <option value="3">30 minutes - 1 Hour</option>
                                <option value="4">1 Hour - Up</option>
                            </select>
                        </div>
                        <div className="input-group-append" style={{ marginLeft: 10 + 'px' }} onChange={(event) => this.changeFilter('ingredientsFilter', event)}>
                            <select>
                                <option value="0">Number of Ingredients</option>
                                <option value="1">0 - 5</option>
                                <option value="2">5 - 10</option>
                                <option value="3">10 - 20</option>
                                <option value="4">20+</option>
                            </select>
                        </div>
                    </div>
                    <input id="only-user-recipes" type="checkbox" onChange={() => this.toggleOnlyUserRecipesFilter()} />  Only show my recipes<br/>
                
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css" integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns" crossOrigin="anonymous"></link>
            </div>
        );
    }
}

export default FindRecipesPage;