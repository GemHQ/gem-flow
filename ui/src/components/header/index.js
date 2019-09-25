import React from 'react';
import { Header, Image } from 'semantic-ui-react'
import logo from '../../assets/logo.jpg'

import './header.css';

export default () => {

  return (


    <div className="HeaderContainer">

      <Image size="mini" src={logo} className="Logo" />
      <Header as='h1'>Welcome to Gem Flow.
        <Header.Subheader>
          This is an example app that demonstrates an end-to-end flow with Gem APIs.
        </Header.Subheader>
      </Header>


    </div>
  );
}
