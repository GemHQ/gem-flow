import React from 'react';
import logo from '../../assets/logo.jpg'
import './header.css';

const Header = ({ flowName }) => {
  return (
    <header>
      <div className="FlexAlignCenter">
        <img src={logo} className="Logo" />
        <h1>Gem {flowName} Flow</h1>
      </div>
      <h2>This is an example app that demonstrates an end-to-end flow with Gem APIs.</h2>
    </header>
  );
}

export default Header;
