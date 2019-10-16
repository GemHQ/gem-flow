import React, { useState } from 'react';
import UserForm from '../components/forms/UserForm';
import Button, { BorderedButton } from '../components/basic/button/Button';
import { withPrimaryColor } from '../stores/StoresUtil';
import UserCard from '../components/cards/UserCard';

const UserScreen = ({ flowStore, primaryColor }) => {
  const [creatingUser, setCreatingUser] = useState(false);
  const startCreating = () => setCreatingUser(true);
  const stopCreating = () => setCreatingUser(false);
  const numOfUsers = flowStore.users.length;

  if (!numOfUsers && !creatingUser) return (
    <Button onClick={startCreating}>Create New User</Button>
  )

  return (
    <>
    {
      creatingUser 
      ?
      <>
        <h2 className="ScreenHeading">Creating User</h2>
        <UserForm
          onCancel={stopCreating}
          onSubmit={() => {
            flowStore.createUser();
            stopCreating();
          }}
        />
      </>
      :
      <div className="FlexAlignCenter SpaceBetween">
        <h2 className="ScreenHeading noPadding">{`${numOfUsers} User${numOfUsers > 1 ? 's' : ''}`}</h2>
        <BorderedButton color={primaryColor} onClick={startCreating}>+ Add new user</BorderedButton>
      </div>
    }
    {
      flowStore.users.map(user => <UserCard user={user} primaryColor={primaryColor} key={user.id} />)
    }
    </>
  )
}

export default withPrimaryColor(UserScreen);