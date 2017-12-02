import React from 'react'
import './LobbyPage.css'
import axios from 'axios'

class Lobby extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lobbyInfo: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      lobbyInfo: nextProps.lobbyInfo
    })
  }
  
  render() {
    console.log(this.state.lobbyInfo)
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
