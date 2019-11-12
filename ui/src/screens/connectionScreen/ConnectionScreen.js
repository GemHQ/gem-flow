import React from 'react';
import InstitutionUserForm from '../../components/forms/InstitutionUserForm';
import ConnectionCard from '../../components/cards/ConnectionCard';
import GenericScreen from '../GenericScreen';
import { withStores } from '../../stores/StoresUtil';
import { ScreenNames, FlowIds } from '../../stores/Constants';
import ErrorMessage from '../../components/basic/errorMessage/ErrorMessage';

const ConnectionScreen = ({ flowStore, uiStore }) => {
  const ItemForm = uiStore.flow.id === FlowIds.ONRAMP ? InstitutionUserForm : null;
  return (
    <>
      <ErrorMessage errorMessage={flowStore.errorMessage} />
      <GenericScreen
        ItemForm={ItemForm}
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
    </>
  )
}

export default withStores(ConnectionScreen);