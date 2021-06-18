import React, { useEffect, useState } from 'react';
import AccountCard, {
  ExchangeAccountCard,
} from '../components/cards/AccountCard';
import { withStores } from '../stores/StoresUtil';
import { ScreenNames } from '../stores/Constants';
import ErrorMessage from '../components/basic/errorMessage/ErrorMessage';

// as a function to avoid runtime initialization error
// const CardsByFlowId = () => ({
//   [FlowIds.ONRAMP]: AccountCard,
//   [FlowIds.TRANSFER]: ExchangeAccountCard,
//   [FlowIds.CONNECT]: ExchangeAccountCard,
// });

const AccountScreen = ({ dataStore, uiStore }) => {
  const [loading, setLoading] = useState(false);
  const loadAccounts = async () => {
    try {
      setLoading(true);
      await dataStore.getAccounts();
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadAccounts();
  }, []);

  const numberOfItems = dataStore.accounts.length;
  return (
    <>
      <ErrorMessage />
      <h2 className="ScreenHeading noPadding">
        {loading
          ? `Loading Accounts...`
          : `${numberOfItems} Account${numberOfItems > 1 ? 's' : ''}`}
      </h2>
      {dataStore.accounts.map((account) => (
        <ExchangeAccountCard
          account={account}
          key={account.accountId}
          onButtonClick={() => {
            dataStore.selectAccount(account.accountId);
            uiStore.setCurrentScreen(ScreenNames.HISTORY);
          }}
        />
      ))}
    </>
  );
};
export default withStores(AccountScreen);
