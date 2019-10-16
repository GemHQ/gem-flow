import React from 'react';
import GenericCard from './GenericCard';

const ProfileCard = ({ profile, createConnection, primaryColor, removeProfile }) => (
  <GenericCard 
    titlesAndValues={[
      { title: 'PROFILE_ID', value: profile.id },
      { title: 'PROFILE_NAME', value: profile.profileName },
      { title: 'CREATED_AT', value: profile.created_at },
    ]}
    buttonText="Create Connection"
    onButtonClick={createConnection}
    primaryColor={primaryColor}
    dotsMenuOptions={[{ title: 'Remove profile', onClick: removeProfile }]}
  />
);

export default ProfileCard;