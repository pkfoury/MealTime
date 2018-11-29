import React, { Component } from 'react';
import './general.css'
import { apiPatch, apiGet, apiPost } from '../functions/Api';

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

        this.doSearch(); // Populate recipes.
    }

    changeFilter(filter, event) {
        let value = event.target.value;
        if (filter === 'preperationFilter') {
            this.setState({ preperationFilter: value });
        } else if (filter === 'timeFilter') {
            this.setState({ timeFilter: value });
        } else if (filter === 'ingredientsFilter') {
            this.setState( {ingredientsFilter: value });
        }

        this.doSearch();
    }

    toggleOnlyUserRecipesFilter() {
        this.setState({ onlyUserRecipesFilter: !this.state.onlyUserRecipesFilter });
        this.doSearch();
    }

    doSearch() {
        if (this.state.searchTerm === '' && this.state.preperationFilter === '0' && 
            this.state.timeFilter === '0' && this.state.ingredientsFilter === '0' && 
            this.state.onlyUserRecipesFilter === false)
            this.doEmptySearch();
        else
            this.doFilteredSearch();
    }

    doEmptySearch() {
        apiGet('search').then((response) => {
            this.setState({ recipes: response.data.data }, () => { console.log(this.state.recipes) });
        });
    }

    doFilteredSearch() {
        let apiCall = 'searchWithFilters/' + (this.state.searchTerm ? this.state.searchTerm : 'none') + '/' + this.state.preperationFilter + '/' + this.state.timeFilter + '/' + this.state.onlyUserRecipesFilter;
        console.log('Filtered search : ' + apiCall);
        apiGet(apiCall).then((response) => {
            this.setState({ recipes: response.data.data }, () => { console.log(this.state.recipes) });
        });
    }


    likeRecipe(recipe) {
        apiPost('recipe_preference', recipe).then((response) => {});
    }

    render() {
        return (
            <div>
                <br/>
                <div className="title col-lg-12 text-center">
                    <h1>Find Recipes <i className="fas fa-utensils"></i></h1>
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
                    <div className="col-lg-8 col-centered">
                        {this.state.recipes.map((recipe, index) => (
                            <div key={index} className="recipe-container col-centered">
                                <h5>{recipe.recipe_name}</h5>
                                <p><i className="fas fa-clock"></i> {recipe.cook_time}</p>
                                <p><b>Instructions:</b> {recipe.instructions}<button onClick={() => this.likeRecipe(recipe)} className="btn favorite-btn">Add to Favorites</button></p>
                            </div>
                        ))}
                    </div>
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css" integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns" crossOrigin="anonymous"></link>
            </div>
        );
    }
}

export default FindRecipesPage;