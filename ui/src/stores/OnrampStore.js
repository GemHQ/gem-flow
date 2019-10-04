import { observable, action, decorate, computed } from "mobx";

class OnrampStore {
  dotsMap = new Map();
  markerSubtitles = new Map();
  activeMarker = ProgressMarkers.User;

  constructor() {
    Object.values(ProgressMarkers).forEach(marker => {
      this.dotsMap.set(marker, false);
      this.markerSubtitles.set(marker, '-');
    });
    this.markerSubtitles.set('User', 'Create a new user')
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

decorate(OnrampStore, {
  dotsMap: observable,
  activeMarker: observable,
  setActiveMarker: action,
  markerTitles: computed,
  dots: computed
});

export default OnrampStore;

const ProgressMarkers = {
  User: 'User', 
  Profile: 'Profile',
  Connection: 'Connection',
  Account: 'Account',
  Transaction: 'Transaction'
};