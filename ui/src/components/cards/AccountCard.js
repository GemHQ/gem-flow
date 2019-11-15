import React from 'react';
import GenericCard from './GenericCard';
import { withPrimaryColor } from '../../stores/StoresUtil';
import { formatDate, capitalizeFirstLetter } from '../../util/TextUtil';
import { FlowIds } from '../../stores/Constants';
import { toJS } from 'mobx';


const AccountCard = ({ 
  account,
  onButtonClick,
  onViewClick,
  primaryColor,
  removeAccount,
  disabled,
  flowId
}) => {
  const titlesAndValues = flowId === FlowIds.ONRAMP ? [
      { title: 'ACCOUNT_ID', value: account.id },
      { title: 'EXTERNAL_ID', value: account.external_id },
      { title: 'LAST_UPDATED_AT', value: formatDate(account.updated_at) },
      { title: 'STATUS', value: capitalizeFirstLetter(account.status) },
    ] : [
      { title: 'ACCOUNT_ID', value: account.id },
      { title: 'ACCOUNT_NAME', value: account.name },
      { title: 'ASSET_NAME', value: capitalizeFirstLetter(account.asset_id) },
      { title: 'AMOUNT', value: account.available_amount.toString() },
    ]
  return (
    <GenericCard
      titlesAndValues={titlesAndValues}
      buttonText="Create Transaction"
      onButtonClick={onButtonClick}
      viewText="View Transactions"
      onViewClick={onViewClick}
      primaryColor={primaryColor}
      dotsMenuOptions={[{ title: 'Remove account', onClick: removeAccount }]}
      disabled={disabled}
      // iconUrl={account.institution.icon}
    />
  )
};

export default withPrimaryColor(AccountCard);