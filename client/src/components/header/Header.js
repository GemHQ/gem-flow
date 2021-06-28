import React from 'react';
import logo from '../../assets/logo.jpg';
import { withUiStore } from '../../stores/StoresUtil';
import './header.css';

const Header = ({ uiStore }) => {
  return (
    <header>
      <h3 className="SmallText LightGreyText">SANDBOX USER</h3>
      <div className="FlexAlignCenter">
        <img src={logo} className="Logo" alt="" />
        <h1>Gem {uiStore.flowName} Flow</h1>
      </div>
      <h2>
        This is an example app that demonstrates an end-to-end flow with Gem
        APIs.
      </h2>
    </header>
  );
};

export default withUiStore(Header);
