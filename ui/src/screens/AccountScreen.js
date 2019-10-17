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
  >
  {
    flowStore.accounts.map(account => (
    <AccountCard
      account={account} 
      key={account.id} 
      removeAccount={() => flowStore.removeAccount(account.id)}
      createTransaction={() => {
        flowStore.selectAccount(account.id);
        uiStore.progressStore.setCurrentScreen(ScreenNames.TRANSACTION);
      }}
      withUnderButton
    />))
  }
  </GenericScreen>
)

export default withStores(AccountScreen);