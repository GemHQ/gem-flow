import React from 'react';
import ProfileForm from '../components/forms/profileForm/ProfileForm';
import ProfileCard from '../components/cards/ProfileCard';
import GenericScreen from './GenericScreen';
import { withStores } from '../stores/StoresUtil';
import { ScreenNames } from '../stores/Constants';
import ErrorMessage from '../components/basic/errorMessage/ErrorMessage';

const ProfileScreen = ({ flowStore, uiStore }) => (
  <>
    <ErrorMessage />
    <GenericScreen
      ItemForm={ProfileForm}
      numberOfItems={flowStore.profiles.length}
      itemTitle="Profile"
      createItem={flowStore.createProfile}
      buttonDisabled={!flowStore.selectedUser}
      withOpenForm={uiStore.withOpenForm}
    >
    {
      flowStore.profiles.map(profile => (
      <ProfileCard
        profile={profile} 
        key={profile.id} 
        removeProfile={() => flowStore.removeProfile(profile.id)}
        onButtonClick={() => {
          flowStore.selectProfile(profile.id);
          uiStore.setCurrentScreen(ScreenNames.CONNECTION, { withOpenForm: true });
        }}
        onViewClick={() => {
          flowStore.selectProfile(profile.id);
          uiStore.setCurrentScreen(ScreenNames.CONNECTION, { withOpenForm: false });
        }}
      />))
    }
    </GenericScreen>
  </>
)

export default withStores(ProfileScreen);