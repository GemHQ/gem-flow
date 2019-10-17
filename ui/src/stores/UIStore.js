import { observable, action, computed, decorate } from "mobx";
import { Flows, ScreenNames } from './Constants';

class UIStore {
  flow = Flows.Onramp;
  progressMaps = new Map();

  constructor() {
    Object.values(Flows).forEach(flow => {
      this.progressMaps.set(flow.id, new ProgressStore(flow.screens));
    });
  }

  setFlow = flowId => {
    this.flow = Flows[flowId];
  };

  get primaryColor() {
    return this.flow.primaryColor;
  }

  get dropdownOptions() {
    return Object.values(Flows).map(flow => ({ value: flow.id, label: flow.dropdownTitle, className: flow.colorClassname }));
  }

  get progressStore() {
    return this.progressMaps.get(this.flow.id);
  }

  get showInstructions() {
    return this.progressStore.currentScreen === ScreenNames.USER;
  }
}

decorate(UIStore, {
  flow: observable,
  progressMaps: observable,
  setFlowName: action,
  primaryColor: computed,
  dropdownOptions: computed,
  progressStore: computed,
});

export default UIStore;

class ProgressStore {
  dotsMap = new Map();
  markerSubtitles = new Map();
  currentScreen = ScreenNames.ACCOUNT;
  // currentScreen = ScreenNames.USER;
  initialScreenStates = new Map();

  constructor(screens) {
    screens.forEach(screen => {
      this.dotsMap.set(screen, false);
      this.markerSubtitles.set(screen, '-');
    });
    this.markerSubtitles.set(ScreenNames.USER, 'Create a new user');
    // this.currentScreen = screens[0];
  }

  setCurrentScreen = (screen, initialState) => {
    this.currentScreen = screen;
    initialState && this.initialScreenStates.set(screen, initialState);
  }

  fillDot = (screen) => {
    this.dotsMap.set(screen, true);
  }

  get markerTitles() {
    return [...this.markerSubtitles.entries()];
  }

  get dots() {
    return [...this.dotsMap.entries()];
  }
}

decorate(ProgressStore, {
  dotsMap: observable,
  currentScreen: observable,
  setCurrentScreen: action,
  markerTitles: computed,
  dots: computed
});
