import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import Header from '../header/Header'
import HomePage from '../Pages/Home/HomePage'
import Lobby from '../Pages/Lobby/LobbyPage'

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentPage: '',
      pageLoading: true,
      lobbyInfo: {}
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

  createNewLobby() {
    const args = Object.assign({
      method: 'get',
      headers: {
        Accept: 'application/json'
      },
      responseType: 'json'
    }, {url: 'http://localhost:5000/create'});
    axios(args).then((data) => {
      this.setState({
        lobbyInfo: data.data
      })
      console.log(data.data)
      localStorage.setItem('lobbyId', data.data.sid)
      localStorage.setItem('lobbyList', data.data.sid)
    })
    this.setPage('pizza-lobby')
  }

  render() {
    return (
      <div className="app">
        <Header />
        {this.state.currentPage === 'home' && 
          <HomePage createNewLobby={() => this.createNewLobby()} />
        }
        {this.state.currentPage === 'pizza-lobby' && 
          <Lobby setPage={(pageName) => this.setPage(pageName)} lobbyInfo={this.state.lobbyInfo} />
        }
      </div>
    );
  }
}

export default App
