import React from 'react';
import GenericCard from './GenericCard';
import { withPrimaryColor } from '../../stores/StoresUtil';


const AccountCard = ({ account, onButtonClick, primaryColor, removeAccount, dots, UnderButton, disabled }) => (
  <GenericCard
    titlesAndValues={[
      { title: 'ACCOUNT_ID', value: account.id },
      { title: 'ACCOUNT_NAME', value: account.name },
      { title: 'ACCOUNT_TYPE', value: account.type },
      { title: 'LAST_UPDATED_AT', value: account.last_updated_at },
    ]}
    buttonText="Create Transaction"
    onButtonClick={onButtonClick}
    primaryColor={primaryColor}
    dotsMenuOptions={[{ title: 'Remove account', onClick: removeAccount }]}
    UnderButton={UnderButton}
    dots={dots}
    disabled={disabled}
  />
);

export default withPrimaryColor(AccountCard);