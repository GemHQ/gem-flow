import { observable, action, decorate, computed } from "mobx";

class ConnectStore {
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

  setActiveMarker = () => {

  }

  get markerTitles() {
    return [...this.markerSubtitles.entries()];
  }

  get dots() {
    return [...this.dotsMap.values];
  }
}

decorate(ConnectStore, {
  dotsMap: observable,
  activeMarker: observable,
  setActiveMarker: action,
  markerTitles: computed,
  dots: computed
});

export default ConnectStore;

const ProgressMarkers = {
  User: 'User', 
  Connection: 'Connection',
  Account: 'Account',
  Transaction: 'Transaction'
};