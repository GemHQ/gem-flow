import React from 'react';
import GenericCard from './GenericCard';
import { withPrimaryColor } from '../../stores/StoresUtil';

const UserCard = ({ user, onButtonClick, onViewClick, primaryColor, removeUser }) => (
  <GenericCard
    titlesAndValues={[
      { title: 'USER_ID', value: user.id },
      { title: 'USER_EMAIL', value: user.email },
      { title: 'CREATED_AT', value: user.created_at },
    ]}
    buttonText="Create Profile"
    onButtonClick={onButtonClick}
    viewText="View Profiles"
    onViewClick={onViewClick}
    primaryColor={primaryColor}
    dotsMenuOptions={[{ title: 'Remove user', onClick: removeUser }]}
  />
);

export default withPrimaryColor(UserCard);