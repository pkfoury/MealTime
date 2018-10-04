import React from 'react';
import { Route, Switch } from 'react-router';

import FirstTimeUserPage from './components/FirstTimeUserPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import RestaurantsPage from './components/RestaurantsPage';

 const Routes = () => (
  <Switch>
    <Route exact path='/' component={LoginPage} />
    <Route path='/first-time-user' component={FirstTimeUserPage} />
    <Route path='/register' component={RegisterPage} />
    <Route path='/login' component={LoginPage} />
    <Route path='/restaurants' component={RestaurantsPage} />
  </Switch>
);

export default Routes;