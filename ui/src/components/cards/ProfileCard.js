import React from 'react';
import GenericCard from './GenericCard';
import { withPrimaryColor } from '../../stores/StoresUtil';

const ProfileCard = ({ profile, onButtonClick, onViewClick, primaryColor, removeProfile }) => (
  <GenericCard 
    titlesAndValues={[
      { title: 'PROFILE_ID', value: profile.id },
      { title: 'PROFILE_NAME', value: profile.profileName },
      { title: 'CREATED_AT', value: profile.created_at },
    ]}
    buttonText="Create Connection"
    onButtonClick={onButtonClick}
    viewText="View Connections"
    onViewClick={onViewClick}
    primaryColor={primaryColor}
    dotsMenuOptions={[{ title: 'Remove profile', onClick: removeProfile }]}
  />
);

export default withPrimaryColor(ProfileCard);