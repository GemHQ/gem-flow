import React from 'react';
import './App.css';
import './components/forms/forms.css';
import ProgressMap from './components/composite/progressMap/ProgressMap';
import UIStore from './stores/UIStore';
import Instructions from './components/composite/instructions/Instructions';
import Header from './components/header/Header';
import Divider from './components/basic/divider/Divider';
import { observer, Provider } from 'mobx-react';
import { ScreenNames } from './stores/Constants';
import FlowStore from './stores/FlowStore';
import UserScreen from './screens/UserScreen';
import ProfileScreen from './screens/ProfileScreen';
import ConnectionScreen from './screens/connectionScreen/ConnectionScreen';
import AccountScreen from './screens/AccountScreen';
import TransactionScreen from './screens/TransactionScreen';

const uiStore = new UIStore();
const flowStore = new FlowStore();

const App = () => {
  return (
    <Provider uiStore={uiStore} flowStore={flowStore}>
      <div className="AppContainer">
        <div className="App">
          <Header flowName={uiStore.flow.id} />
          <Divider marginBottom />
          {
            uiStore.showInstructions &&
            <>
              <Instructions uiStore={uiStore} />
              <Divider marginBottom marginTop />
            </>
          }
          <ProgressMap progressStore={uiStore.progressStore} />
          <Divider marginBottom marginTop />
          <Screens />
        </div>
      </div>
    </Provider>
  );
};

const Screens = observer(() => {
  switch (uiStore.progressStore.currentScreen) {
    case (ScreenNames.USER): return <UserScreen />;
    case (ScreenNames.PROFILE): return <ProfileScreen />;
    case (ScreenNames.CONNECTION): return <ConnectionScreen />;
    case (ScreenNames.ACCOUNT): return <AccountScreen />;
    case (ScreenNames.TRANSACTION): return <TransactionScreen />;
    default: return <UserScreen />
  }
});

export default observer(App);



