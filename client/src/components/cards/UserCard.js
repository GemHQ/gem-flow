import React from 'react';
import GenericCard from './GenericCard';
import { withPrimaryColor } from '../../stores/StoresUtil';
import { formatDate } from '../../util/TextUtil';

const UserCard = ({
  user,
  onButtonClick,
  onViewClick,
  primaryColor,
  removeUser,
  nextScreenName,
}) => (
  <GenericCard
    titlesAndValues={[
      { title: 'USERNAME', value: user.userName },
      // { title: 'USER_EMAIL', value: user.email },
      // { title: 'CREATED_AT', value: formatDate(user.created_at) },
    ]}
    buttonText={`Create ${nextScreenName}`}
    onButtonClick={onButtonClick}
    viewText={`View ${nextScreenName}s`}
    onViewClick={onViewClick}
    primaryColor={primaryColor}
    dotsMenuOptions={[{ title: 'Remove user', onClick: removeUser }]}
  />
);

export default withPrimaryColor(UserCard);
