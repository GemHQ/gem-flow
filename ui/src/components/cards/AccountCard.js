import React from 'react';
import GenericCard from './GenericCard';
import { withPrimaryColor } from '../../stores/StoresUtil';
import { formatDate, capitalizeFirstLetter } from '../../util/TextUtil';
import bitcoinIcon from '../../assets/bitcoin.svg';
import ethereumIcon from '../../assets/ethereum.svg';
import litecoinIcon from '../../assets/litecoin.svg';


const AccountCard = ({ 
  account,
  onButtonClick,
  onViewClick,
  primaryColor,
  removeAccount,
  disabled,
  dots
}) => {
  const titlesAndValues = [
    { title: 'ACCOUNT_ID', value: account.id },
    { title: 'EXTERNAL_ID', value: account.external_id },
    { title: 'LAST_UPDATED_AT', value: formatDate(account.updated_at) },
    { title: 'STATUS', value: capitalizeFirstLetter(account.status) },
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
      dots={dots}
    />
  )
};

export const ExchangeAccountCard = withPrimaryColor(({ 
  account,
  onButtonClick,
  onViewClick,
  primaryColor,
  removeAccount,
  disabled,
  dots
}) => {
  const titlesAndValues = [
    { title: 'ACCOUNT_ID', value: account.id },
    { title: 'ACCOUNT_NAME', value: account.name },
    { title: 'ASSET_NAME', value: capitalizeFirstLetter(account.asset_id) },
    { title: 'AMOUNT', value: account.available_amount.toString() },
  ];

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
      iconUrl={assetIconFromId(account.asset_id)}
      dots={dots}
    />
  )
});

const assetIconFromId = assetId => {
  switch(assetId) {
    case 'bitcoin': return bitcoinIcon;
    case 'ethereum': return ethereumIcon;
    case 'litecoin': return litecoinIcon;
    default: return null;
  }
}

export default withPrimaryColor(AccountCard);