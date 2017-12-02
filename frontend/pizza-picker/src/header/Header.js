import React from 'react'
import './Header.css'

class Header extends React.Component {

  render() {
    return (
      <div className="header">
        <div className="pizza-logo" />
        <p className="header-title">Pizza Picker</p>
      </div>
    );
  }

}

export default Header
