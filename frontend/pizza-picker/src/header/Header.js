import React from 'react'
import './Header.css'

class Header extends React.Component {

  render() {
    return (
      <header className="header">
        <div className="pizza-logo" />
        <p className="header-title">Pizza Picker</p>
      </header>
    );
  }

}

export default Header
