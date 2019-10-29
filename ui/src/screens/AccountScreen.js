import React from 'react';
import AccountForm from '../components/forms/AccountForm';
import AccountCard from '../components/cards/AccountCard';
import GenericScreen from './GenericScreen';
import { withStores } from '../stores/StoresUtil';
import { ScreenNames } from '../stores/Constants';

const AccountScreen = ({ flowStore, uiStore }) => (
  <GenericScreen
    ItemForm={AccountForm}
    numberOfItems={flowStore.accounts.length}
    itemTitle="Account"
    createItem={flowStore.createAccount}
    buttonDisabled={!flowStore.selectedConnection}
  >
  {
    flowStore.accounts.map(account => (
    <AccountCard
      account={account} 
      key={account.id} 
      removeAccount={() => flowStore.removeAccount(account.id)}
      onButtonClick={() => {
        flowStore.selectAccount(account.id);
        uiStore.progressStore.setCurrentScreen(ScreenNames.TRANSACTION, { withOpenForm: true });
      }}
      onViewClick={() => {
        flowStore.selectAccount(account.id);
        uiStore.progressStore.setCurrentScreen(ScreenNames.TRANSACTION, { withOpenForm: false });
      }}
    />))
  }
  </GenericScreen>
)

export default withStores(AccountScreen);