
const FLOW_ID_STORAGE_KEY = 'selected_flow_id';

export const persistSelectedFlowId = (flowId) => {
  localStorage.setItem(FLOW_ID_STORAGE_KEY, flowId);
}

export const getPersistedFlowId = () => {
  return localStorage.getItem(FLOW_ID_STORAGE_KEY);
}
