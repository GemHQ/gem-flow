import React from 'react';
import './App.css';
import './components/forms/forms.css';
import { Container, Divider } from 'semantic-ui-react'
import UserScreen from './screens/UserScreen';
import ProgressMap from './components/composite/progressMap/ProgressMap';
import UIStore from './stores/UIStore';
import Instructions from './components/composite/instructions/Instructions';

const uiStore = new UIStore();

export default () => {

  return (
    <Container className="App">
      <Instructions uiStore={uiStore} />
      <ProgressMap progressStore={uiStore.progressStore} primaryColor={uiStore.flow.primaryColor} />
      <UserScreen />
    </Container>
  );
}




