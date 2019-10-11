import React from 'react';
import './App.css';
import { Container, Divider } from 'semantic-ui-react'
import Instructions from './components/old/instructions';
import AddUser from "./components/old/addUser";
import Users from './components/old/users';
import Header from './components/header';
import Store from './state/Store';

export default () => {

  return (
    <Store>
      <Container className="App">
        <Header />
        <Divider />
        {/* <Instructions />
        <Divider />
        <AddUser />
        <Divider />
        <Users /> */}
      </Container>
    </Store>
  );
}




