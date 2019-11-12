import { observable, action, computed, decorate } from "mobx";
import { Flows, ScreenNames } from './Constants';

class UIStore {
  flow = Flows.Onramp;
  currentScreen = ScreenNames.USER;
  initialScreenStates = new Map();

  setFlow = flowId => {
    this.flow = Flows[flowId];
  };

  setCurrentScreen = (screen, initialState) => {
    this.currentScreen = screen;
    initialState && this.initialScreenStates.set(screen, initialState);
  }

  get primaryColor() {
    return this.flow.primaryColor;
  }

  get dropdownOptions() {
    return Object.values(Flows).map(flow => ({ value: flow.id, label: flow.dropdownTitle, className: flow.colorClassname }));
  }

  // get progressStore() {
  //   return this.progressMaps.get(this.flow.id);
  // }

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

class ProgressStore {
  currentScreen = ScreenNames.USER;
  initialScreenStates = new Map();

  setCurrentScreen = (screen, initialState) => {
    this.currentScreen = screen;
    initialState && this.initialScreenStates.set(screen, initialState);
  }

  get withOpenForm() {
    const initialState = this.initialScreenStates.get(this.currentScreen);
    return initialState && initialState.withOpenForm;
  }
}

decorate(ProgressStore, {
  currentScreen: observable,
  setCurrentScreen: action,
  withOpenForm: computed,
});
