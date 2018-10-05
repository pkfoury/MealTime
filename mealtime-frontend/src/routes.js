import React from 'react';
import { Route, Switch } from 'react-router';

import FirstTimeUserPage from './components/FirstTimeUserPage';
import RegisterPage from './components/RegisterPage';
import Calendar from './components/Calendar';
import AddRecipe from './components/AddRecipe';
import LoginPage from './components/LoginPage';
import RestaurantsPage from './components/RestaurantsPage';
import DailyEntryPage from './components/DailyEntryPage';
import ProgressPage from './components/ProgressPage';
import MainPage from './components/MainPage';
import FavoritesPage from './components/FavoritesPage';

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
    <Route path='/progress' component={ProgressPage} />
    <Route path='/mainpage' component={MainPage} />
    <Route path='/favorites' component={FavoritesPage} />
  </Switch>
);

export default Routes;
