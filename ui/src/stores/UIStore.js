import { observable, action, computed } from 'mobx';
import { Flows, ScreenNames } from './Constants';
import { 
  persistSelectedFlowId,
  getPersistedFlowId,
  getPersistedScreen,
  persistCurrentScreen,
} from '../util/PersistUtil';

class UIStore {
  @observable flow = Flows.Onramp;
  @observable currentScreen = ScreenNames.USER;
  @observable initialScreenStates = new Map();

  constructor() {
    const persistedFlowId = getPersistedFlowId();
    const persistedScreen = getPersistedScreen();
    if (persistedFlowId) this.setFlow(persistedFlowId);
    if (persistedScreen) this.setCurrentScreen(persistedScreen);
  }

  @action setFlow = flowId => {
    this.flow = Flows[flowId];
    persistSelectedFlowId(flowId);
  };

  @action setCurrentScreen = (screen, initialState) => {
    this.currentScreen = screen;
    initialState && this.initialScreenStates.set(screen, initialState);
    persistCurrentScreen(screen);
  }

  // each flow has it's own color
  @computed get primaryColor() {
    return this.flow.primaryColor;
  }

  // for the flow dropdown selector on first screen
  @computed get dropdownOptions() {
    return Object.values(Flows)
      .filter(flow => flow.id !== this.flow.id)
      .map(flow => ({ value: flow.id, label: flow.dropdownTitle, className: flow.colorClassname }));
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
