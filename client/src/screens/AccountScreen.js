import React from 'react';
import AccountForm from '../components/forms/AccountForm';
import AccountCard, { ExchangeAccountCard } from '../components/cards/AccountCard';
import GenericScreen from './GenericScreen';
import { withStores } from '../stores/StoresUtil';
import { ScreenNames, FlowIds } from '../stores/Constants';
import { openPmWidget } from '../components/PmWidget';
import ErrorMessage from '../components/basic/errorMessage/ErrorMessage';

  const AccountScreen = ({ dataStore, uiStore }) => {
  const CardToRender = uiStore.flowId === FlowIds.ONRAMP ? AccountCard : ExchangeAccountCard;
  return (
    <>
      <ErrorMessage />
      <GenericScreen
        ItemForm={AccountForm}
        numberOfItems={dataStore.accounts.length}
        itemTitle="Account"
        createItem={() => {
          openPmWidget(async plaidToken => {
            const account = {
              plaid_token: plaidToken,
              connection_id: dataStore.selectedInstitutionUser.connection_id,
              type: 'PlaidAccount'
            }
            await dataStore.createAccount(account);
          })
        }}
        hideButton={true}
        buttonDisabled={!dataStore.selectedInstitutionUser}
        withOpenForm={uiStore.withOpenForm}
      >
      {
        dataStore.accounts.map(account => (
        <CardToRender
          account={account} 
          key={account.id} 
          removeAccount={() => dataStore.removeAccount(account.id)}
          onButtonClick={() => {
            dataStore.selectAccount(account.id);
            uiStore.setCurrentScreen(ScreenNames.TRANSACTION, { withOpenForm: true });
          }}
          onViewClick={() => {
            dataStore.selectAccount(account.id);
            uiStore.setCurrentScreen(ScreenNames.TRANSACTION, { withOpenForm: false });
          }}
        />))
      }
      </GenericScreen>
    </>
  )
}
export default withStores(AccountScreen);