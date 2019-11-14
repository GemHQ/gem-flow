import { observable, action, computed, decorate } from 'mobx';
import { Flows, ScreenNames } from './Constants';
import { 
  persistSelectedFlowId,
  getPersistedFlowId,
  getPersistedScreen,
  persistCurrentScreen,
} from '../util/PersistUtil';

class UIStore {
  flow = Flows.Onramp;
  currentScreen = ScreenNames.USER;
  initialScreenStates = new Map();

  constructor() {
    const persistedFlowId = getPersistedFlowId();
    const persistedScreen = getPersistedScreen();
    if (persistedFlowId) this.setFlow(persistedFlowId);
    if (persistedScreen) this.setCurrentScreen(persistedScreen);
  }

  setFlow = flowId => {
    this.flow = Flows[flowId];
    persistSelectedFlowId(flowId);
  };

  setCurrentScreen = (screen, initialState) => {
    this.currentScreen = screen;
    initialState && this.initialScreenStates.set(screen, initialState);
    persistCurrentScreen(screen);
  }

  get primaryColor() {
    return this.flow.primaryColor;
  }

  get dropdownOptions() {
    return Object.values(Flows)
      .filter(flow => flow.id !== this.flow.id)
      .map(flow => ({ value: flow.id, label: flow.dropdownTitle, className: flow.colorClassname }));
  }

  get showInstructions() {
    return this.currentScreen === ScreenNames.USER;
  }

  get withOpenForm() {
    const initialState = this.initialScreenStates.get(this.currentScreen);
    return initialState && initialState.withOpenForm;
  }
}

decorate(UIStore, {
  flow: observable,
  currentScreen: observable,
  setFlowName: action,
  setCurrentScreen: action,
  primaryColor: computed,
  dropdownOptions: computed,
  withOpenForm: computed,
});

export default UIStore;
