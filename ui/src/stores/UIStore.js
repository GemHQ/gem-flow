import { observable, action, computed, decorate } from "mobx";
import { FlowNames, PrimaryColors } from './Constants';

class UIStore {
  flowName = FlowNames.Onramp;

  setFlowName = flowName => this.flowName = flowName;

  get primaryColor() {
    return PrimaryColors[this.flowName];
  }
}

decorate(UIStore, {
  flowName: observable,
  setFlowName: action,
  primaryColor: computed,
});

export default UIStore;
