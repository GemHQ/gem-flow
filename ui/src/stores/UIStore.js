import { observable, action, computed } from "mobx";
import { FlowNames, PrimaryColors } from './Constants';

class UserStore {
  @observable flowName = FlowNames.ONRAMP;

  @action setFlowName = flowName => this.flowName = flowName;

  @computed get primaryColor() {
    return PrimaryColors[this.flowName];
  }
}

export default UserStore;
