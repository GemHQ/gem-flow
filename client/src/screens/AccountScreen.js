import React from 'react';
import AccountForm from '../components/forms/AccountForm';
import AccountCard, {
  ExchangeAccountCard,
} from '../components/cards/AccountCard';
import GenericScreen from './GenericScreen';
import { withStores } from '../stores/StoresUtil';
import { ScreenNames, FlowIds } from '../stores/Constants';
import { openPmWidget } from '../components/widgets/PmWidget';
import ErrorMessage from '../components/basic/errorMessage/ErrorMessage';

// as a function to avoid runtime initialization error
const CardsByFlowId = () => ({
  [FlowIds.ONRAMP]: AccountCard,
  [FlowIds.TRANSFER]: ExchangeAccountCard,
  [FlowIds.CONNECT]: ExchangeAccountCard,
});

const AccountScreen = ({ dataStore, uiStore }) => {
  const CardToRender = CardsByFlowId()[uiStore.flowId];
  return (
    <>
      <ErrorMessage />
      <GenericScreen
        ItemForm={AccountForm}
        numberOfItems={dataStore.accounts.length}
        itemTitle="Account"
        createItem={() => {}}
        hideButton={uiStore.flowId !== FlowIds.ONRAMP}
        buttonDisabled={false}
        withOpenForm={uiStore.withOpenForm}
      >
        {dataStore.accounts.map((account) => (
          <CardToRender
            flowId={uiStore.flowId}
            account={account}
            key={account.id}
            removeAccount={() => dataStore.removeAccount(account.id)}
            onButtonClick={() => {
              dataStore.selectAccount(account.id);
              uiStore.setCurrentScreen(ScreenNames.HISTORY);
            }}
            onViewClick={() => {
              dataStore.selectAccount(account.id);
              uiStore.setCurrentScreen(ScreenNames.HISTORY);
            }}
          />
        ))}
      </GenericScreen>
    </>
  );
};
export default withStores(AccountScreen);
