import React from 'react';
import InstitutionUserForm from '../components/forms/InstitutionUserForm';
import ConnectionCard from '../components/cards/ConnectionCard';
import GenericScreen from './GenericScreen';
import { withFlowStore } from '../stores/StoresUtil';

const ConnectionScreen = ({ flowStore }) => (
  <GenericScreen
    ItemForm={InstitutionUserForm}
    numberOfItems={flowStore.connections.length}
    itemTitle="Connection"
    createItem={flowStore.createConnection}
  >
  {
    flowStore.connections.map(connection => (
    <ConnectionCard
      connection={connection} 
      key={connection.id} 
      removeConnection={() => flowStore.removeConnection(connection.id)}
    />))
  }
  </GenericScreen>
)

export default withFlowStore(ConnectionScreen);