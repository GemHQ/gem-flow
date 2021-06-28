import { observable, action, computed } from 'mobx';
import { FlowIds, Flows, ScreenNames } from './Constants';
import { persistSelectedFlowId, getPersistedFlowId } from '../util/PersistUtil';

class UIStore {
  @observable flow = Flows[FlowIds.CONNECT];
  @observable flowId = FlowIds.CONNECT;
  @observable currentScreen = ScreenNames.USER;
  @observable initialScreenStates = new Map();
  history;

  constructor() {
    const persistedFlowId = getPersistedFlowId();
    if (persistedFlowId) this.setFlow(persistedFlowId);
    this.currentScreen = window.location.pathname;
  }

  setHistory(history) {
    this.history = history;
  }

  @action setFlow = (flowId) => {
    this.flow = Flows[flowId];
    this.flowId = flowId;
    persistSelectedFlowId(flowId);
  };

  @action setCurrentScreen = (screen, initialState) => {
    console.log(screen, this.history);
    this.history.push(screen);
    this.currentScreen = screen;
    initialState && this.initialScreenStates.set(screen, initialState);
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

  // if a screen should render with an open form
  @computed get withOpenForm() {
    const initialState = this.initialScreenStates.get(this.currentScreen);
    return initialState && initialState.withOpenForm;
  }
}

export default UIStore;
