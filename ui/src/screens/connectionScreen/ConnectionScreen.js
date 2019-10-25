import React from 'react';
import InstitutionUserForm from '../../components/forms/InstitutionUserForm';
import ConnectionCard from '../../components/cards/ConnectionCard';
import GenericScreen from '../GenericScreen';
import { withStores } from '../../stores/StoresUtil';
import { ScreenNames } from '../../stores/Constants';
import { openPmWidget } from './PmWidget';

const ConnectionScreen = ({ flowStore, uiStore }) => (
  <GenericScreen
    ItemForm={InstitutionUserForm}
    numberOfItems={flowStore.connections.length}
    itemTitle="Connection"
    createItem={flowStore.createConnection}
    buttonDisabled={!flowStore.selectedProfile}
  >
  {
    flowStore.connections.map(connection => (
    <ConnectionCard
      connection={connection} 
      key={connection.id} 
      removeConnection={() => flowStore.removeConnection(connection.id)}
      onButtonClick={() => {
        try {
          openPmWidget(async plaidToken => {
            const account = {
              plaid_token: plaidToken,
              connection_id: connection.id,
              type: 'PlaidAccount'
            }
            await flowStore.createAccount(account);
            flowStore.selectConnection(connection.id);
            uiStore.progressStore.setCurrentScreen(ScreenNames.ACCOUNT);
          });
        } catch(e) {}
      }}
    />))
  }
  </GenericScreen>
)

export default withStores(ConnectionScreen);