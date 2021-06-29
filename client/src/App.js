import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import './App.css';
import './components/forms/forms.css';
import ProgressMap from './components/composite/progressMap/ProgressMap';
import Instructions from './components/composite/instructions/Instructions';
import Header from './components/header/Header';
import Divider from './components/basic/divider/Divider';
import { ScreenNames } from './stores/Constants';
import UserScreen from './screens/UserScreen';
import AccountScreen from './screens/AccountScreen';
import { withStores } from './stores/StoresUtil';
import HistoryScreen from './screens/HistoryScreen';
import CredentialsScreen from './screens/credentials/CredentialsScreen';
import ConnectionCompleteScreen from './screens/connectionScreen/ConnectionCompleteScreen';

const App = () => {
  return (
    <div className="AppContainer">
      <div className="App">
        <Header />
        <Divider marginBottom />
        <SmartInstructions />
        <ProgressMap />
        <Divider marginBottom marginTop />
        <BrowserRouter>
          <Screens />
        </BrowserRouter>
      </div>
    </div>
  );
};

const Screens = withStores(({ uiStore, dataStore }) => {
  let history = useHistory();
  useEffect(() => {
    uiStore.setHistory(history);
    history.listen((location) => {
      dataStore.clearError();
      dataStore.clearItemsOnScreenChange(location.pathname);
    });
  }, []);
  return (
    <Switch>
      <Route path={ScreenNames.USER} component={UserScreen} />
      <Route path={ScreenNames.CREDENTIALS} component={CredentialsScreen} />
      <Route
        path={ScreenNames.CONNECTION_COMPLETE}
        component={ConnectionCompleteScreen}
      />
      <Route path={ScreenNames.ACCOUNT} component={AccountScreen} />
      <Route path={ScreenNames.HISTORY} component={HistoryScreen} />
      <Route path="/" component={UserScreen} />
    </Switch>
  );
});

const SmartInstructions = withStores(({ dataStore, uiStore }) => {
  if (!dataStore.selectedUser)
    return (
      <>
        <Instructions uiStore={uiStore} />
        <Divider marginBottom marginTop />
      </>
    );
  return null;
});

export default App;
