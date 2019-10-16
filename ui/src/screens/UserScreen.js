import React from 'react';
import UserForm from '../components/forms/UserForm';
import UserCard from '../components/cards/UserCard';
import GenericScreen from './GenericScreen';
import { withFlowStore } from '../stores/StoresUtil';

const UserScreen = ({ flowStore, primaryColor }) => (
  <GenericScreen
    ItemForm={UserForm}
    numberOfItems={flowStore.users.length}
    itemTitle="User"
    createItem={flowStore.createUser}
  >
  {
    flowStore.users.map(user => (
    <UserCard
      user={user} 
      primaryColor={primaryColor} 
      key={user.id} 
      removeUser={() => flowStore.removeUser(user.id)}
    />))
  }
  </GenericScreen>
)

export default withFlowStore(UserScreen);