import React from 'react';
import GenericCard from './GenericCard';
import { withPrimaryColor } from '../../stores/StoresUtil';


const AccountCard = ({ account, onButtonClick, onViewClick, primaryColor, removeAccount, dots, disabled }) => (
  <GenericCard
    titlesAndValues={[
      { title: 'ACCOUNT_ID', value: account.id },
      { title: 'ACCOUNT_NAME', value: account.name },
      { title: 'ACCOUNT_TYPE', value: account.type },
      { title: 'LAST_UPDATED_AT', value: account.updated_at },
    ]}
    buttonText="Create Transaction"
    onButtonClick={onButtonClick}
    viewText="View Transactions"
    onViewClick={onViewClick}
    primaryColor={primaryColor}
    dotsMenuOptions={[{ title: 'Remove account', onClick: removeAccount }]}
    dots={dots}
    disabled={disabled}
    // iconUrl={account.institution.icon}
  />
);

export default withPrimaryColor(AccountCard);