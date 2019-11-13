import React from 'react';
import InstitutionUserForm from '../../components/forms/InstitutionUserForm';
import ConnectionCard from '../../components/cards/ConnectionCard';
import GenericScreen from '../GenericScreen';
import { withStores } from '../../stores/StoresUtil';
import { ScreenNames, FlowIds } from '../../stores/Constants';
import ErrorMessage from '../../components/basic/errorMessage/ErrorMessage';

const ConnectionScreen = ({ flowStore, uiStore }) => (
  <>
    <ErrorMessage errorMessage={flowStore.errorMessage} />
    {
      uiStore.flow.id === FlowIds.ONRAMP 
      ? <OnrampConnectionScreen flowStore={flowStore} uiStore={uiStore} /> 
      : <TransferConnectionScreen flowStore={flowStore} uiStore={uiStore} />
    }
  </>
)

const OnrampConnectionScreen = ({ flowStore, uiStore }) => (
  <GenericScreen
    ItemForm={InstitutionUserForm}
    numberOfItems={flowStore.institutionUsers.length}
    itemTitle="Connection"
    createItem={flowStore.createInstitutionUser}
    buttonDisabled={!flowStore.selectedUser}
    withOpenForm={uiStore.withOpenForm}
  >
  {
    flowStore.institutionUsers.map(institutionUser => (
    <ConnectionCard
      institutionUser={institutionUser} 
      key={institutionUser.id} 
      removeInstitutionUser={() => flowStore.removeInstitutionUser(institutionUser.id)}
      onButtonClick={() => {
        flowStore.selectInstitutionUser(institutionUser.id);
        uiStore.setCurrentScreen(ScreenNames.ACCOUNT, { withOpenForm: true });
      }}
      onViewClick={() => {
        flowStore.selectInstitutionUser(institutionUser.id);
        uiStore.setCurrentScreen(ScreenNames.ACCOUNT, { withOpenForm: false });
      }}
    />))
  }
  </GenericScreen>
)

// TODO: fetch exchange connections, create exchange connection

const TransferConnectionScreen = ({ flowStore, uiStore }) => (
  <GenericScreen
    ItemForm={InstitutionUserForm}
    numberOfItems={flowStore.connections.length}
    itemTitle="Connection"
    createItem={flowStore.createInstitutionUser}
    buttonDisabled={!flowStore.selectedUser}
    withOpenForm={uiStore.withOpenForm}
  >
  {
    flowStore.connections.map(institutionUser => (
    <ConnectionCard
      institutionUser={institutionUser} 
      key={institutionUser.id} 
      removeInstitutionUser={() => flowStore.removeInstitutionUser(institutionUser.id)}
      onButtonClick={() => {
        flowStore.selectInstitutionUser(institutionUser.id);
        uiStore.setCurrentScreen(ScreenNames.ACCOUNT, { withOpenForm: true });
      }}
      onViewClick={() => {
        flowStore.selectInstitutionUser(institutionUser.id);
        uiStore.setCurrentScreen(ScreenNames.ACCOUNT, { withOpenForm: false });
      }}
    />))
  }
  </GenericScreen>
)

export default withStores(ConnectionScreen);