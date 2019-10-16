import React from 'react';
import './App.css';
import './components/forms/forms.css';
import UserScreen from './screens/UserScreen';
import ProgressMap from './components/composite/progressMap/ProgressMap';
import UIStore from './stores/UIStore';
import Instructions from './components/composite/instructions/Instructions';
import Header from './components/header/Header';
import Divider from './components/basic/divider/Divider';
import { observer, Provider } from 'mobx-react';
import { ScreenNames } from './stores/Constants';
import OnrampStore from './stores/OnrampStore';

const uiStore = new UIStore();
const onrampStore = new OnrampStore();

const App = () => {
  return (
    <Provider uiStore={uiStore}>
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
          <Screens flowStore={onrampStore} />
        </div>
      </div>
    </Provider>
  );
};

const Screens = observer(({ flowStore }) => {
  switch (uiStore.progressStore.currentScreen) {
    case (ScreenNames.USER): return <UserScreen flowStore={flowStore} />;
    default: return <UserScreen flowStore={flowStore} />
  }
});

export default observer(App);



