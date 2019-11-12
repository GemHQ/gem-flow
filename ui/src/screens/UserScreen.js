import React from 'react';
import UserForm from '../components/forms/UserForm';
import UserCard from '../components/cards/UserCard';
import GenericScreen from './GenericScreen';
import { withStores } from '../stores/StoresUtil';
import { ScreenNames, FlowIds } from '../stores/Constants';
import ErrorMessage from '../components/basic/errorMessage/ErrorMessage';

const UserScreen = ({ flowStore, uiStore }) => {
  const nextScreen = uiStore.flow.id === FlowIds.ONRAMP ? ScreenNames.PROFILE : ScreenNames.CONNECTION;
  return (
    <>
      <ErrorMessage />
      <GenericScreen
        ItemForm={UserForm}
        numberOfItems={flowStore.users.length}
        itemTitle="User"
        createItem={flowStore.createUser}
        withOpenForm={false}
      >
      {
        flowStore.users.map(user => (
        <UserCard
          flowId={uiStore.flow.id}
          user={user} 
          key={user.id}
          removeUser={() => flowStore.removeUser(user.id)}
          onButtonClick={() => {
            flowStore.selectUser(user.id);
            uiStore.setCurrentScreen(nextScreen, { withOpenForm: true });
          }}
          onViewClick={() => {
            flowStore.selectUser(user.id);
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