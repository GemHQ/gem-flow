import React from 'react';
import TitleAndValue from '../basic/titleAndValue/TitleAndValue';
import ThreeDots from '../basic/threeDots/ThreeDots';
import Button from '../basic/button/Button';

const UserCard = ({ user, createProfile, primaryColor }) => (
  <div className="Card">
    <div className="FlexAlignCenter">
      <TitleAndValue title="USER_ID" value={user.id} greyTitle smallTitle boldValue rightPadding/>
      <TitleAndValue title="USER_EMAIL" value={user.email} greyTitle smallTitle boldValue rightPadding/>
      <TitleAndValue title="CREATED_AT" value={user.created_at} greyTitle smallTitle boldValue rightPadding/>
    </div>
    <div className="FlexAlignCenter">
      <Button onClick={createProfile} backgroundColor={primaryColor} marginRight>Create Profile</Button>
      <ThreeDots />
    </div>
  </div>
);

export default UserCard;