import React from 'react';
import GenericCard from './GenericCard';

const UserCard = ({ user, createProfile, primaryColor }) => (
  <GenericCard
    titlesAndValues={[
      { title: 'USER_ID', value: user.id },
      { title: 'USER_EMAIL', value: user.email },
      { title: 'CREATED_AT', value: user.created_at },
    ]}
    buttonText="Create Profile"
    onButtonClick={createProfile}
    primaryColor={primaryColor}
  />
);

export default UserCard;