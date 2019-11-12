import React from 'react';
import UserForm from '../components/forms/UserForm';
import UserCard from '../components/cards/UserCard';
import GenericScreen from './GenericScreen';
import { withStores } from '../stores/StoresUtil';
import { ScreenNames } from '../stores/Constants';
import ErrorMessage from '../components/basic/errorMessage/ErrorMessage';

const UserScreen = ({ flowStore, uiStore }) => (
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
        user={user} 
        key={user.id} 
        removeUser={() => flowStore.removeUser(user.id)}
        onButtonClick={() => {
          flowStore.selectUser(user.id);
          uiStore.setCurrentScreen(ScreenNames.PROFILE, { withOpenForm: true });
        }}
        onViewClick={() => {
          flowStore.selectUser(user.id);
          uiStore.setCurrentScreen(ScreenNames.PROFILE, { withOpenForm: false });
        }}
      />))
    }
    </GenericScreen>
  </>
)

export default withStores(UserScreen);