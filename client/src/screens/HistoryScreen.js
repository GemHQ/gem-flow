import React from 'react';
import { withStores } from '../stores/StoresUtil';
import { ScreenNames, FlowIds } from '../stores/Constants';

// as a function to avoid runtime initialization error
const CardsByFlowId = () => ({
  [FlowIds.ONRAMP]: ExchangeAccountCard,
  [FlowIds.TRANSFER]: ExchangeAccountCard,
  [FlowIds.CONNECT]: ExchangeAccountCard,
});

const HistoryScreen = ({ dataStore, uiStore }) => {
  return (
    <>
      <h1>History</h1>
    </>
  );
};
export default withStores(HistoryScreen);
