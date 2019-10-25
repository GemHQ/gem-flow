import React from 'react';
import ProfileForm from '../components/forms/profileForm/ProfileForm';
import ProfileCard from '../components/cards/ProfileCard';
import GenericScreen from './GenericScreen';
import { withStores } from '../stores/StoresUtil';
import { ScreenNames } from '../stores/Constants';

const ProfileScreen = ({ flowStore, uiStore }) => (
  <GenericScreen
    ItemForm={ProfileForm}
    numberOfItems={flowStore.profiles.length}
    itemTitle="Profile"
    createItem={flowStore.createProfile}
    buttonDisabled={!flowStore.selectedUser}
  >
  {
    flowStore.profiles.map(profile => (
    <ProfileCard
      profile={profile} 
      key={profile.id} 
      removeProfile={() => flowStore.removeProfile(profile.id)}
      onButtonClick={() => {
        flowStore.selectProfile(profile.id);
        uiStore.progressStore.setCurrentScreen(ScreenNames.CONNECTION);
      }}
    />))
  }
  </GenericScreen>
)

export default withStores(ProfileScreen);