import { observable, action, computed, decorate } from "mobx";
import { Flows } from './Constants';

class UIStore {
  flow = Flows.Onramp;
  progressMaps = new Map();

  constructor() {
    Object.values(Flows).forEach(flow => {
      this.progressMaps.set(flow.id, new ProgressStore(flow.progressMarkers));
    });
  }

  setFlow = flowId => this.flow = Flows[flowId];

  get primaryColor() {
    return this.flow.primaryColor;
  }

  get dropdownTitle() {
    return this.flow.dropdownTitle;
  }

  get dropdownOptions() {
    return Object.values(Flows).map(flow => ({ value: flow.id, label: flow.dropdownTitle }));
  }

  get progressStore() {
    return this.progressMaps.get(this.flow.id);
  }
}

decorate(UIStore, {
  flowName: observable,
  progressMaps: observable,
  setFlowName: action,
  primaryColor: computed,
  dropdownTitle: computed,
  dropdownOptions: computed,
  progressStore: computed,
});

export default UIStore;

class ProgressStore {
  dotsMap = new Map();
  markerSubtitles = new Map();
  activeMarker = '';

  constructor(progressMarkers) {
    progressMarkers.forEach(marker => {
      this.dotsMap.set(marker, false);
      this.markerSubtitles.set(marker, '-');
    });
    this.markerSubtitles.set('User', 'Create a new user');
    this.activeMarker = progressMarkers[0];
  }

  setActiveMarker = (marker) => {
    this.activeMarker = marker;
  }

  fillDot = (marker) => {
    this.dotsMap.set(marker, true);
  }

  get markerTitles() {
    return [...this.markerSubtitles.entries()];
  }

  get dots() {
    return [...this.dotsMap.values];
  }
}

decorate(ProgressStore, {
  dotsMap: observable,
  activeMarker: observable,
  setActiveMarker: action,
  markerTitles: computed,
  dots: computed
});
