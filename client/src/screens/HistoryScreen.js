import React from 'react';
import GenericScreen from './GenericScreen';
import { withStores } from '../stores/StoresUtil';
import { ScreenNames, FlowIds } from '../stores/Constants';
import { openPmWidget } from '../components/widgets/PmWidget';
import ErrorMessage from '../components/basic/errorMessage/ErrorMessage';

// as a function to avoid runtime initialization error
const CardsByFlowId = () => ({
  [FlowIds.ONRAMP]: ExchangeAccountCard,
  [FlowIds.TRANSFER]: ExchangeAccountCard,
  [FlowIds.CONNECT]: ExchangeAccountCard,
})

const HistoryScreen = ({ dataStore, uiStore }) => {
  const CardToRender = CardsByFlowId()[uiStore.flowId];
  return (
    <>
      <ErrorMessage />
      <GenericScreen
        numberOfItems={0}
        itemTitle="History"
        createItem={() => {
          
        }}
        hideButton={true}
      >
      </GenericScreen>
    </>
  )
}
export default withStores(HistoryScreen);