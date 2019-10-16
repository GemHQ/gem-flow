import React from 'react';
import ProfileForm from '../components/forms/ProfileForm';
import ProfileCard from '../components/cards/ProfileCard';
import GenericScreen from './GenericScreen';
import { withFlowStore } from '../stores/StoresUtil';

const ProfileScreen = ({ flowStore }) => (
  <GenericScreen
    ItemForm={ProfileForm}
    numberOfItems={flowStore.profiles.length}
    itemTitle="Profile"
    createItem={flowStore.createProfile}
  >
  {
    flowStore.profiles.map(profile => (
    <ProfileCard
      profile={profile} 
      key={profile.id} 
      removeProfile={() => flowStore.removeProfile(profile.id)}
    />))
  }
  </GenericScreen>
)

export default withFlowStore(ProfileScreen);