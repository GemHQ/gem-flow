import React from 'react';
import AccountForm from '../components/forms/AccountForm';
import AccountCard from '../components/cards/AccountCard';
import GenericScreen from './GenericScreen';
import { withStores } from '../stores/StoresUtil';
import { ScreenNames } from '../stores/Constants';
import { openPmWidget } from '../components/PmWidget';
import ErrorMessage from '../components/basic/errorMessage/ErrorMessage';

const AccountScreen = ({ flowStore, uiStore }) => (
  <>
    <ErrorMessage />
    <GenericScreen
      ItemForm={AccountForm}
      numberOfItems={flowStore.accounts.length}
      itemTitle="Account"
      createItem={() => {
        openPmWidget(async plaidToken => {
          const account = {
            plaid_token: plaidToken,
            connection_id: flowStore.selectedInstitutionUser.connection_id,
            type: 'PlaidAccount'
          }
          await flowStore.createAccount(account);
        })
      }}
      hideButton={true}
      buttonDisabled={!flowStore.selectedInstitutionUser}
      withOpenForm={uiStore.withOpenForm}
    >
    {
      flowStore.accounts.map(account => (
      <AccountCard
        account={account} 
        key={account.id} 
        removeAccount={() => flowStore.removeAccount(account.id)}
        onButtonClick={() => {
          flowStore.selectAccount(account.id);
          uiStore.setCurrentScreen(ScreenNames.TRANSACTION, { withOpenForm: true });
        }}
        onViewClick={() => {
          flowStore.selectAccount(account.id);
          uiStore.setCurrentScreen(ScreenNames.TRANSACTION, { withOpenForm: false });
        }}
        flowId={uiStore.flow.id}
      />))
    }
    </GenericScreen>
  </>
)

export default withStores(AccountScreen);