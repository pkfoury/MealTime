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
            allergensFilter: "",
            onlyUserRecipesFilter: false,
            user: null
        }

        apiGet('users').then ( ({data}) => {
            this.setState({
              user: data.data
            })
          })

        this.doSearch(); // Populate recipes.
    }

    changeFilter(filter, event) {
        let value = event.target.value;
        if (filter === 'preperationFilter') {
            this.setState({ preperationFilter: value }, () => { this.doSearch() });
        } else if (filter === 'timeFilter') {
            this.setState({ timeFilter: value }, () => { this.doSearch() });
        } else if (filter === 'ingredientsFilter') {
            this.setState({ ingredientsFilter: value }, () => { this.doSearch() });
        } else if (filter === 'allergensFilter') {
            this.setState({ allergensFilter: value }, () => { this.doSearch() });
        }
    }

    changeSearchTerm(val) {
        this.setState({ searchTerm: val }, () => { this.doSearch() });
    }

    toggleOnlyUserRecipesFilter() {
        this.setState({ onlyUserRecipesFilter: !this.state.onlyUserRecipesFilter }, () => { this.doSearch(); });
    }

    doSearch() {
        if (this.state.searchTerm === '' && this.state.preperationFilter === '0' &&
            this.state.timeFilter === '0' && this.state.ingredientsFilter === '0' &&
            this.state.onlyUserRecipesFilter === false)
            this.doEmptySearch();
        else if (this.state.allergensFilter !== ""){
            this.doAllergensFilteredSearch();
        }
        else
            this.doFilteredSearch();
    }

    doEmptySearch() {
        apiGet('search').then((response) => {
            this.setState({ recipes: response.data.data }, () => { console.log(this.state.recipes) });
        });
    }

    doFilteredSearch() {
        let apiCall = 'searchWithFilters/' + (this.state.searchTerm ? this.state.searchTerm : 'none');
        apiGet(apiCall).then((response) => {
            if (response === undefined) this.setState({ recipes: [] });
            else if (response.data.data === undefined) this.setState({ recipes: [] });
            else this.doFurtherFiltering(response.data.data);
        });
    }

    doAllergensFilteredSearch() {
        let apiCall = 'recipe_allergens/' + (this.state.searchTerm ? this.state.searchTerm : 'none') + '/'+ this.state.allergensFilter;
        apiGet(apiCall).then((response) => {
            if (response === undefined) this.setState({ recipes: [] });
            else if (response.data.data === undefined) this.setState({ recipes: [] });
            else this.doFurtherFiltering(response.data.data);
        })
    }

    doFurtherFiltering(recipes) {
        let remainingRecipes = recipes;
        let nextArray = [];
        let index = 0;

        if (this.state.preperationFilter !== '0') {
            remainingRecipes.forEach(recipe => {
                if (recipe.difficulty === +this.state.preperationFilter) nextArray.push(recipe);
            });
            remainingRecipes = nextArray;
            nextArray = [];
        }

        if (this.state.timeFilter !== '0') {
            remainingRecipes.forEach(recipe => {
                if (recipe.cook_time === this.state.timeFilter) nextArray.push(recipe);
            });
            remainingRecipes = nextArray;
            nextArray = [];
        }

        if (this.state.ingredientsFilter !== '0') {
            remainingRecipes.forEach(recipe => {
                if (this.state.ingredientsFilter === '1' && recipe.num_ingredients == 1 || recipe.num_ingredients == 2)
                    nextArray.push(recipe);
                else if (this.state.ingredientsFilter === '2' && (recipe.num_ingredients == 3 || recipe.num_ingredients == 4 || recipe.num_ingredients == 5))
                    nextArray.push(recipe);
                else if (this.state.ingredientsFilter === '3' && recipe.num_ingredients == 6 || recipe.num_ingredients == 7 || recipe.num_ingredients == 8)
                    nextArray.push(recipe);
                else if (this.state.ingredientsFilter == '4' && recipe.num_ingredients >= 9)
                    nextArray.push(recipe);
            });
            remainingRecipes = nextArray;
            nextArray = [];
        }

        if (this.state.onlyUserRecipesFilter) {
            remainingRecipes.forEach(recipe => {
                if (recipe.user_id == this.state.user.id) nextArray.push(recipe);
            });
            remainingRecipes = nextArray;
            nextArray = [];
        }

        this.setState({ recipes: remainingRecipes });
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
                        <input type="text" onChange={event => this.changeSearchTerm(event.target.value)} className="form-control" placeholder="Search recipes" id="restaurantSearch"/>
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
                                <option value="5:00">5:00 minutes</option>
                                <option value="10:00">10:00 minutes</option>
                                <option value="15:00">15:00 minutes</option>
                                <option value="20:00">20:00 minutes</option>
                            </select>
                        </div>
                        <div className="input-group-append" style={{ marginLeft: 10 + 'px' }} onChange={(event) => this.changeFilter('ingredientsFilter', event)}>
                            <select>
                                <option value="0">Number of Ingredients</option>
                                <option value="1">1-2</option>
                                <option value="2">3-5</option>
                                <option value="3">6-8</option>
                                <option value="4">9+</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-10">
                          <input type="text" onChange={event => this.changeFilter('allergensFilter', event)} placeholder="Allergens (separated by comma)" className="col-lg-10"/>

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
