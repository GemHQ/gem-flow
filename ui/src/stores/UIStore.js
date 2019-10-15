import { observable, action, computed, decorate } from "mobx";
import { Flows } from './Constants';

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
  currentScreen = '';

  constructor(screens) {
    screens.forEach(screen => {
      this.dotsMap.set(screen, false);
      this.markerSubtitles.set(screen, '-');
    });
    this.markerSubtitles.set('User', 'Create a new user');
    this.currentScreen = screens[0];
  }

  setCurrentScreen = (screen) => {
    this.currentScreen = screen;
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
