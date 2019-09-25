import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Dropdown, Label, Header, Divider, Card } from 'semantic-ui-react'
import Instructions from './components/instructions';

export default () => {



  // constructor(props) {
  //   super(props);

  // }

  // handleChange(event) {


  // }

  // handleSubmit(event) {

  //   const baseUrl = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`

  //   event.preventDefault();
  //   fetch(`${baseUrl}/api/greeting?name=${encodeURIComponent(this.state.name)}`)
  //     .then(response => response.json())
  //     .then(state => this.setState(state));
  // }



  return (

    <Container className="App">

      <Header as='h1'>Welcome to Gem Flow.
        <Header.Subheader>
          This is an example app that demonstrates an end-to-end flow with Gem APIs.
    </Header.Subheader>
      </Header>

      <Divider />

      <Instructions />
      {/* 
      <Card.Group>
        <Card fluid color='red' header='Option 1' className="Ta" />
        <Card fluid color='orange' header='Option 2' />
        <Card fluid color='yellow' header='Option 3' />
      </Card.Group> */}


    </Container>

  );

}
