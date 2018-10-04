import React, { Component } from 'react';
import './App.css';

import Routes from './routes'
import Nav from './components/Nav'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav/>
        <Routes />
      </div>
      
    );
  }
}

export default App;
