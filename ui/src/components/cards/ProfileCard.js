import React from 'react';
import GenericCard from './GenericCard';

const ProfileCard = ({ profile, createConnection, primaryColor }) => (
  <GenericCard 
    titlesAndValues={[
      { title: 'PROFILE_ID', value: profile.id },
      { title: 'PROFILE_NAME', value: profile.name },
      { title: 'CREATED_AT', value: profile.created_at },
    ]}
    buttonText="Create Connection"
    onButtonClick={createConnection}
    primaryColor={primaryColor}
  />
);

export default ProfileCard;