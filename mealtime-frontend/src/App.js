import React, { Component } from 'react';
import './App.css';

import Routes from './routes';
import { browserRouter } from 'react-router';
import Nav from './components/Nav';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav/>
        <Routes />
        {/* <div className="Footer">
          <p>MealTime 2018 Team 10</p>
        </div> */}
      </div>
    );
  }
}

export default App;
