import React from 'react';
import GenericCard from './GenericCard';
import { withPrimaryColor } from '../../stores/StoresUtil';
import { formatDate, capitalizeFirstLetter } from '../../util/TextUtil';
import bitcoinIcon from '../../assets/bitcoin.svg';
import ethereumIcon from '../../assets/ethereum.svg';
import litecoinIcon from '../../assets/litecoin.svg';
import { FlowIds } from '../../stores/Constants';

const AccountCard = ({
  account,
  onButtonClick,
  onViewClick,
  primaryColor,
  removeAccount,
  disabled,
  dots,
}) => {
  const titlesAndValues = [
    { title: 'ACCOUNT_ID', value: account.id },
    { title: 'EXTERNAL_ID', value: account.external_id },
    { title: 'LAST_UPDATED_AT', value: formatDate(account.updated_at) },
    { title: 'STATUS', value: capitalizeFirstLetter(account.status) },
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
      dots={dots}
    />
  );
};

export const ExchangeAccountCard = withPrimaryColor(
  ({ account, onButtonClick, primaryColor, hideButton, buttonText }) => {
    const titlesAndValues = [
      { title: 'ACCOUNT_ID', value: account.accountId },
      { title: 'BALANCE', value: account.currentBalance },
    ];

    return (
      <GenericCard
        titlesAndValues={titlesAndValues}
        buttonText={buttonText || 'View Transactions'}
        onButtonClick={onButtonClick}
        primaryColor={primaryColor}
        iconUrl={`https://gem-widgets-assets.s3-us-west-2.amazonaws.com/currencies/crypto/${account.accountId.toLowerCase()}.svg`}
        dots={false}
        hideButton={hideButton}
      />
    );
  }
);

export default withPrimaryColor(AccountCard);
