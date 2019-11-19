import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import UIStore from './stores/UIStore';
import DataStore from './stores/DataStore';
import { Provider } from 'mobx-react';
import { hydrateFlowStore } from './util/PersistUtil';

const uiStore = new UIStore();
const dataStore = new DataStore();

hydrateFlowStore(dataStore).then(() => {
  ReactDOM.render(
    <Provider uiStore={uiStore} dataStore={dataStore}>
      <App />
    </Provider>, 
    document.getElementById('root')
  );
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
