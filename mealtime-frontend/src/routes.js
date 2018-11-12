import React from 'react';
import { Route, Switch } from 'react-router';

import FirstTimeUserPage from './pages/FirstTimeUserPage';
import RegisterPage from './pages/RegisterPage';
import Calendar from './components/Calendar';
import AddRecipe from './components/AddRecipe';
import LoginPage from './pages/LoginPage';
import RestaurantsPage from './pages/RestaurantsPage';
import DailyEntryPage from './pages/DailyEntryPage';
import ProgressPage from './pages/ProgressPage';
import MainPage from './pages/MainPage';
import FavoritesPage from './pages/FavoritesPage';
import FindRecipesPage from './pages/FindRecipesPage';
import Profile from './pages/Profile';

 const Routes = () => (
  <Switch>
    <Route exact path='/' component={LoginPage} />
    <Route path='/first-time-user' component={FirstTimeUserPage} />
    <Route path='/register' component={RegisterPage} />
    <Route path='/login' component={LoginPage} />
    <Route path='/restaurants' component={RestaurantsPage} />
    <Route path='/enter-daily-data' component={DailyEntryPage} />
    <Route path='/calendar' component={Calendar} />
    <Route path='/add-recipe' component={AddRecipe} />
    <Route path='/find-recipes' component={FindRecipesPage} />
    <Route path='/progress' component={ProgressPage} />
    <Route path='/home' component={MainPage} />
    <Route path='/favorites' component={FavoritesPage} />
    <Route path='/profile' component={Profile} />
  </Switch>
);

export default Routes;
