import React from 'react';
import AccountForm from '../components/forms/AccountForm';
import AccountCard from '../components/cards/AccountCard';
import GenericScreen from './GenericScreen';
import { withFlowStore } from '../stores/StoresUtil';

const AccountScreen = ({ flowStore }) => (
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
    />))
  }
  </GenericScreen>
)

export default withFlowStore(AccountScreen);