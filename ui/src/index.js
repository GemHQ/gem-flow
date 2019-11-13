import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import UIStore from './stores/UIStore';
import FlowStore from './stores/FlowStore';
import { Provider } from 'mobx-react';

const uiStore = new UIStore();
const flowStore = new FlowStore();

ReactDOM.render(
  <Provider uiStore={uiStore} flowStore={flowStore}>
    <App />
  </Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
