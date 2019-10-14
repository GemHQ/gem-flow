import React from 'react';
import './App.css';
import './components/forms/forms.css';
import UserScreen from './screens/UserScreen';
import ProgressMap from './components/composite/progressMap/ProgressMap';
import UIStore from './stores/UIStore';
import Instructions from './components/composite/instructions/Instructions';
import Header from './components/header/Header';

const uiStore = new UIStore();

export default () => {

  return (
    <div className="AppContainer">
      <div className="App">
        <Header flowName={uiStore.flow.id} />
        <Instructions uiStore={uiStore} />
        <ProgressMap progressStore={uiStore.progressStore} primaryColor={uiStore.flow.primaryColor} />
        <UserScreen />
      </div>
    </div>
  );
}




