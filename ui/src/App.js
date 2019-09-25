import React, { useState } from 'react';
import './App.css';
import { Container, Divider } from 'semantic-ui-react'
import Instructions from './components/instructions';
import AddUser from "./components/addUser";
import Users from './components/users';
import Header from './components/header';

export default () => {


  return (

    <Container className="App">

      <Header />
      <Divider />

      <Instructions />

      <Divider />

      <AddUser />
      <Divider />
      <Users />
    </Container>

  );

}








  //   const baseUrl = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`
  //   fetch(`${baseUrl}/api/greeting?name=${encodeURIComponent(this.state.name)}`)
  //     .then(response => response.json())
  //     .then(state => this.setState(state));
  // }
