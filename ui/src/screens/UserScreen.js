import React, { useState } from 'react';
import UserForm from '../components/forms/UserForm';
import Button from '../components/basic/button/Button';

const UserScreen = ({ flowStore }) => {
  const [creatingUser, setCreatingUser] = useState(false);

  if (flowStore.users.length || creatingUser) return (
    <UserForm onCancel={() => setCreatingUser(false)} />
  )
  return (
    <Button 
      onClick={() => setCreatingUser(true)}>Create New User</Button>
  )
}

export default UserScreen;