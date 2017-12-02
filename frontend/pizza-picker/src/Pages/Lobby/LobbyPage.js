import React from 'react'
import './LobbyPage.css'

class Lobby extends React.Component {

  constructor() {
    super();
    this.state = {
      lobbyInfo: {}
    }
  }

  createNewLobby() {
    this.props.setPage('pizza-lobby')
    args = Object.assign({
      method: 'get',
      headers: {
        Accept: 'application/json'
      },
      responseType: 'json'
    }, {url: 'http://localhost:5000/'});
    axios(args).then((data) => {
      this.setState({
        lobbyInfo: data
      })
    })
  }
  
  render() {
    return (
      <div className="lobby-page">
        <div className="top-wrapper">
        </div>
        <div className="menu-contents">
        </div>
        <div className="menu-grid">
        </div>
        <button onClick={() => this.props.setPage('home')}>Go Home</button>
      </div>
    );
  }

}

export default Lobby
