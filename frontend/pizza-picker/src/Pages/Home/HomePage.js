import React from 'react';
import Axios from 'axios';
import './HomePage.css';

class HomePage extends React.Component {

  render() {
    return (
      <div className='home-page'>
        <div className="main-wrapper">
          <div className="column1">
            <div className="center-content">
              <p>Enter your Provided Code</p>
              <input type="text" placeholder="Enter Code"></input>
            </div>
          </div>
          <p className="column2">- OR -</p>
          <div className="column3">
            <div className="center-content">
              <button onClick={() => this.createNewLobby()}>Start your Pizza Picking Experience</button>
            </div>  
          </div>
        </div>
      </div>
    );
  }

}

export default HomePage;