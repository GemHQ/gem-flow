import React from 'react';
import ProfileForm from '../components/forms/profileForm/ProfileForm';
import ProfileCard from '../components/cards/ProfileCard';
import GenericScreen from './GenericScreen';
import { withStores } from '../stores/StoresUtil';
import { ScreenNames } from '../stores/Constants';
import ErrorMessage from '../components/basic/errorMessage/ErrorMessage';

const ProfileScreen = ({ dataStore, uiStore }) => (
  <>
    <ErrorMessage />
    <GenericScreen
      ItemForm={ProfileForm}
      numberOfItems={dataStore.profiles.length}
      itemTitle="Profile"
      createItem={dataStore.createProfile}
      buttonDisabled={!dataStore.selectedUser}
      withOpenForm={uiStore.withOpenForm}
    >
    {
      dataStore.profiles.map(profile => (
      <ProfileCard
        profile={profile} 
        key={profile.id} 
        removeProfile={() => dataStore.removeProfile(profile.id)}
        onButtonClick={() => {
          dataStore.selectProfile(profile.id);
          uiStore.setCurrentScreen(ScreenNames.CONNECTION, { withOpenForm: true });
        }}
        onViewClick={() => {
          dataStore.selectProfile(profile.id);
          uiStore.setCurrentScreen(ScreenNames.CONNECTION, { withOpenForm: false });
        }}
      />))
    }
    </GenericScreen>
  </>
)

export default withStores(ProfileScreen);