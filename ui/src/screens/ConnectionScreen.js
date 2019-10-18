import React from 'react';
import InstitutionUserForm from '../components/forms/InstitutionUserForm';
import ConnectionCard from '../components/cards/ConnectionCard';
import GenericScreen from './GenericScreen';
import { withStores } from '../stores/StoresUtil';
import { ScreenNames } from '../stores/Constants';

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
        flowStore.selectConnection(connection.id);
        uiStore.progressStore.setCurrentScreen(ScreenNames.ACCOUNT);
      }}
    />))
  }
  </GenericScreen>
)

export default withStores(ConnectionScreen);