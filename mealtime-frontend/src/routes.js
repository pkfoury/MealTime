import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import FirstTimeUserPage from './components/FirstTimeUserPage';

export default (
    <Route path="/" component={App}>
      {/*<IndexRoute component={MainPage} />*/}
      <Route path="/first-time-user" component={FirstTimeUserPage} />
    </Route>
  );
  