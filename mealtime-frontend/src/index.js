import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {
    BrowserRouter as Router,
    Route
  } from 'react-router-dom';
import FirstTimeUserPage from './components/FirstTimeUserPage';


ReactDOM.render(
    <Router>
        <div>
            <Route path='/' component={App} />
            <Route path='/first-time-user' component={FirstTimeUserPage} />
        </div>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
