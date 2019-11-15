import React from 'react';
import GenericCard from './GenericCard';
import { withPrimaryColor } from '../../stores/StoresUtil';
import { formatDate, capitalizeFirstLetter } from '../../util/TextUtil';


const AccountCard = ({ account, onButtonClick, onViewClick, primaryColor, removeAccount, dots, disabled }) => (
  <GenericCard
    titlesAndValues={[
      { title: 'ACCOUNT_ID', value: account.id },
      { title: 'EXTERNAL_ID', value: account.external_id },
      // { title: 'ACCOUNT_NAME', value: account.name },
      { title: 'LAST_UPDATED_AT', value: formatDate(account.updated_at) },
      { title: 'STATUS', value: capitalizeFirstLetter(account.status) },
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