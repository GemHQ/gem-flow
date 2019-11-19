import React from 'react';
import GenericCard from './GenericCard';
import { withPrimaryColor } from '../../stores/StoresUtil';
import { formatDate } from '../../util/TextUtil';

export const ProfileCard = ({ profile, onButtonClick, onViewClick, primaryColor, removeProfile }) => (
  <GenericCard 
    titlesAndValues={[
      { title: 'PROFILE_ID', value: profile.id },
      { title: 'CREATED_AT', value: formatDate(profile.created_at) },
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