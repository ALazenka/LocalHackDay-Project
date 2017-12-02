import React, { Component } from 'react'
import './App.css'
import Header from '../header/Header'
import HomePage from '../Pages/Home/HomePage'
import Lobby from '../Pages/Lobby/LobbyPage'

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentPage: '',
      pageLoading: true
    }
  }

  componentWillMount() {
    const currentPage = localStorage.getItem('currentPage');
    let pageSet = false
    if (currentPage !== null) {
      pageSet = true
    }
    this.setState({
      currentPage: pageSet ? currentPage : 'home'
    })
  }

  componentWillUnmount() {
    localStorage.setItem('currentPage', this.state.currentPage)
  }

  setPage(pageName, newPizza = false) {
    localStorage.setItem('currentPage', pageName)
    this.setState({
      currentPage: pageName
    })
    if (newPizza) {

    }
  }

  render() {
    console.log(this.state.currentPage)
    return (
      <div className="app">
        <Header />
        {this.state.currentPage === 'home' && 
          <HomePage setPage={(pageName) => this.setPage(pageName)} />
        }
        {this.state.currentPage === 'pizza-lobby' && 
          <Lobby setPage={(pageName) => this.setPage(pageName)} />
        }
      </div>
    );
  }
}

export default App
