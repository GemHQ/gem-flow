import { create } from "mobx-persist";


const FLOW_ID_STORAGE_KEY = 'selected_flow_id';
const CURRENT_SCREEN_KEY = 'current_screen';
const FLOW_STORE_KEY = 'flow_store';


export const persistSelectedFlowId = flowId => {
  localStorage.setItem(FLOW_ID_STORAGE_KEY, flowId);
}
export const persistCurrentScreen = currentScreen => {
  localStorage.setItem(CURRENT_SCREEN_KEY, currentScreen);
}


export const getPersistedFlowId = () => {
  return localStorage.getItem(FLOW_ID_STORAGE_KEY);
}
export const getPersistedScreen = () => {
  return localStorage.getItem(CURRENT_SCREEN_KEY);
}


export const hydrateFlowStore = flowStore => create({ storage: localStorage })(FLOW_STORE_KEY, flowStore);

