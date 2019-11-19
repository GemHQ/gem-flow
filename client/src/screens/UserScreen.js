import React from 'react';
import UserForm from '../components/forms/UserForm';
import UserCard from '../components/cards/UserCard';
import GenericScreen from './GenericScreen';
import { withStores } from '../stores/StoresUtil';
import { ScreenNames, FlowIds } from '../stores/Constants';
import ErrorMessage from '../components/basic/errorMessage/ErrorMessage';

const NextScreenNamesByFlowId = {
  [FlowIds.ONRAMP]: ScreenNames.PROFILE,
  [FlowIds.TRANSFER]: ScreenNames.CONNECTION,
}

const UserScreen = ({ dataStore, uiStore }) => {
  const nextScreen = NextScreenNamesByFlowId[uiStore.flowId];
  return (
    <>
      <ErrorMessage />
      <GenericScreen
        ItemForm={UserForm}
        numberOfItems={dataStore.users.length}
        itemTitle="User"
        createItem={dataStore.createUser}
        withOpenForm={false}
      >
      {
        dataStore.users.map(user => (
        <UserCard
          flowId={uiStore.flow.id}
          user={user} 
          key={user.id}
          removeUser={() => dataStore.removeUser(user.id)}
          onButtonClick={() => {
            dataStore.selectUser(user.id, nextScreen);
            uiStore.setCurrentScreen(nextScreen, { withOpenForm: true });
          }}
          onViewClick={() => {
            dataStore.selectUser(user.id, nextScreen);
            uiStore.setCurrentScreen(nextScreen, { withOpenForm: false });
          }}
          nextScreenName={nextScreen}
        />))
      }
      </GenericScreen>
    </>
  )
}

export default withStores(UserScreen);