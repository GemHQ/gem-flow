import { observable, action, computed } from 'mobx';
import { FlowIds, Flows, ScreenNames } from './Constants';
import {
  persistSelectedFlowId,
  getPersistedFlowId,
  getPersistedScreen,
  persistCurrentScreen,
} from '../util/PersistUtil';

class UIStore {
  @observable flow = Flows[FlowIds.CONNECT];
  @observable flowId = FlowIds.CONNECT;
  @observable currentScreen = ScreenNames.USER;
  @observable initialScreenStates = new Map();

  constructor() {
    const persistedFlowId = getPersistedFlowId();
    if (persistedFlowId) this.setFlow(persistedFlowId);
    this.determineScreen();
  }

  @action determineScreen = () => {
    if (window.location.search.includes('coinbase-code')) {
      let params = new URL(document.location).searchParams;
      let coinbaseCode = params.get('coinbase-code');
      console.log('coinbase-code:', coinbaseCode);
      this.currentScreen = ScreenNames.CONNECTION_COMPLETE;
    } else {
      const persistedScreen = getPersistedScreen();
      // if (persistedScreen) this.setCurrentScreen(persistedScreen);
      this.setCurrentScreen(ScreenNames.CREDENTIALS);
    }
  };

  @action setFlow = (flowId) => {
    this.flow = Flows[flowId];
    this.flowId = flowId;
    persistSelectedFlowId(flowId);
  };

  @action setCurrentScreen = (screen, initialState) => {
    this.currentScreen = screen;
    initialState && this.initialScreenStates.set(screen, initialState);
    persistCurrentScreen(screen);
  };

  // each flow has it's own color
  @computed get primaryColor() {
    return this.flow.primaryColor;
  }

  // for the flow dropdown selector on first screen
  @computed get dropdownOptions() {
    return Object.values(Flows)
      .filter((flow) => flow.id !== this.flow.id)
      .map((flow) => ({
        value: flow.id,
        label: flow.dropdownTitle,
        className: flow.colorClassname,
      }));
  }

  // do the dropdown selector and instruction show
  @computed get showInstructions() {
    return this.currentScreen === ScreenNames.USER;
  }

  // if a screen should render with an open form
  @computed get withOpenForm() {
    const initialState = this.initialScreenStates.get(this.currentScreen);
    return initialState && initialState.withOpenForm;
  }
}

export default UIStore;
