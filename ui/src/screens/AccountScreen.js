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
        uiStore.progressStore.setCurrentScreen(ScreenNames.TRANSACTION, { withOpenForm: true });
      }}
      UnderButton={<UnderButton 
        primaryColor={uiStore.primaryColor}
        onClick={() => {
          flowStore.selectAccount(account.id);
          uiStore.progressStore.setCurrentScreen(ScreenNames.TRANSACTION, { withOpenForm: false });
        }}
      />}
    />))
  }
  </GenericScreen>
)

const UnderButton = ({ primaryColor, onClick }) => (
  <p 
    className="SmallText ExtraBold Pointer" 
    style={{ color: primaryColor, marginTop: '4px' }}
    onClick={onClick}
  >View Transactions</p>
)

export default withStores(AccountScreen);