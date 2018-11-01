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
