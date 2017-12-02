import React, { Component } from 'react';
import './App.css';
import Header from '../header/Header';

class App extends Component {

  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div className="app">
        <Header />
      </div>
    );
  }
}

export default App;
