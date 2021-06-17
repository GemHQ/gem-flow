import React, { useState } from 'react';
import UserForm from '../components/forms/UserForm';
import UserCard from '../components/cards/UserCard';
import GenericScreen from './GenericScreen';
import { withStores } from '../stores/StoresUtil';
import { ScreenNames, FlowIds } from '../stores/Constants';
import ErrorMessage from '../components/basic/errorMessage/ErrorMessage';

// as a function to avoid runtime initialization error
const NextScreenNamesByFlowId = () => ({
  [FlowIds.ONRAMP]: ScreenNames.PROFILE,
  [FlowIds.TRANSFER]: ScreenNames.CONNECTION,
  [FlowIds.CONNECT]: ScreenNames.CONNECTION,
});

const UserScreen = ({ dataStore, uiStore }) => {
  const [creatingUser, setCreatingUser] = useState(false);
  const nextScreen = ScreenNames.CREDENTIALS;
  return (
    <>
      <ErrorMessage />
      {creatingUser && <p>Creating user...</p>}
      <GenericScreen
        ItemForm={UserForm}
        numberOfItems={dataStore.users.length}
        itemTitle="User"
        createItem={async (user) => {
          setCreatingUser(true);
          await dataStore.createUser(user);
          setCreatingUser(false);
        }}
        withOpenForm={false}
      >
        {dataStore.users.map((user) => (
          <UserCard
            user={user}
            key={user.id}
            removeUser={() => dataStore.removeUser(user.userName)}
            onButtonClick={() => {
              dataStore.selectUser(user.userName, nextScreen);
              uiStore.setCurrentScreen(nextScreen, { withOpenForm: true });
            }}
            onViewClick={() => {
              dataStore.selectUser(user.userName, nextScreen);
              uiStore.setCurrentScreen(nextScreen, { withOpenForm: false });
            }}
            nextScreenName={nextScreen}
          />
        ))}
      </GenericScreen>
    </>
  );
};

export default withStores(UserScreen);
