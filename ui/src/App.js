import React from 'react';
import './App.css';
import { Container, Divider } from 'semantic-ui-react'
import Instructions from './components/instructions';
import AddUser from "./components/addUser";
import Users from './components/users';
import Header from './components/header';
import Store from './state/Store';

export default () => {

  return (
    <Store>
      <Container className="App">
        <Header />
        <Divider />
        <Instructions />
        <Divider />
        <AddUser />
        <Divider />
        <Users />
      </Container>
    </Store>
  );
}




