import React from 'react';
import './App.css';
import { Container, Divider } from 'semantic-ui-react'
import Instructions from './components/instructions';
import AddUser from "./components/addUser";
import Users from './components/users';
import Header from './components/header';
// import { httpGet } from './util';

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









// useEffect(() => {

//   const path = `/api/greeting?name=${encodeURIComponent('rawadss')}`;
//   httpGet(path).then(result => console.log(result))
// }, [])






