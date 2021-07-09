import React from 'react';
import GenericCard from './GenericCard';
import { withPrimaryColor } from '../../stores/StoresUtil';
import { formatDate, capitalizeFirstLetter } from '../../util/TextUtil';

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
      { title: 'ACCOUNT_ID', value: account.currency.currencyCode },
      { title: 'BALANCE', value: account.currentBalance },
    ];

    return (
      <div className="FlexAlignCenter">
        <div className="nested-horizontal-line" />
        <GenericCard
          className="ExchangeAccountCard"
          titlesAndValues={titlesAndValues}
          buttonText={buttonText || 'View Transactions'}
          onButtonClick={onButtonClick}
          primaryColor={primaryColor}
          iconUrl={`https://gem-widgets-assets.s3-us-west-2.amazonaws.com/currencies/crypto/${account.currency.currencyCode.toLowerCase()}.svg`}
          fallbackIconUrl="https://gem-widgets-assets.s3-us-west-2.amazonaws.com/currencies/crypto/placeholder.svg"
          dots={false}
          hideButton={hideButton}
        />
      </div>
    );
  }
);

export default withPrimaryColor(AccountCard);
