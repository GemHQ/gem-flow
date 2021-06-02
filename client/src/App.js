import React from 'react';
import './App.css';
import './components/forms/forms.css';
import ProgressMap from './components/composite/progressMap/ProgressMap';
import Instructions from './components/composite/instructions/Instructions';
import Header from './components/header/Header';
import Divider from './components/basic/divider/Divider';
import { ScreenNames } from './stores/Constants';
import UserScreen from './screens/UserScreen';
import ProfileScreen from './screens/ProfileScreen';
import ConnectionScreen from './screens/connectionScreen/ConnectionScreen';
import AccountScreen from './screens/AccountScreen';
import TransactionScreen from './screens/TransactionScreen';
import { withUiStore } from './stores/StoresUtil';
import HistoryScreen from './screens/HistoryScreen';

const App = ({ uiStore }) => {
  return (
    <div className="AppContainer">
      <div className="App">
        <Header flowName={uiStore.flow.id} />
        <Divider marginBottom />
        <SmartInstructions />
        <ProgressMap />
        <Divider marginBottom marginTop />
        <Screens />
      </div>
    </div>
  );
};

const Screens = withUiStore(({ uiStore }) => {
  switch (uiStore.currentScreen) {
    case (ScreenNames.USER): return <UserScreen />;
    case (ScreenNames.PROFILE): return <ProfileScreen />;
    case (ScreenNames.CONNECTION): return <ConnectionScreen />;
    case (ScreenNames.ACCOUNT): return <AccountScreen />;
    case (ScreenNames.TRANSACTION): return <TransactionScreen />;
    case (ScreenNames.HISTORY): return <HistoryScreen />;
    default: return <UserScreen />
  }
});

const SmartInstructions = withUiStore(({ uiStore }) => {
  if (uiStore.showInstructions) return (
    <>
      <Instructions uiStore={uiStore} />
      <Divider marginBottom marginTop />
    </>
  )
  return null;
});

export default withUiStore(App);



