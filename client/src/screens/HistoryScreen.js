import React, { useEffect, useState } from 'react';
import './transactionHistory.scss';
import { withStores } from '../stores/StoresUtil';
import { ScreenNames, FlowIds } from '../stores/Constants';
import { ExchangeAccountCard } from '../components/cards/AccountCard';

// as a function to avoid runtime initialization error
const CardsByFlowId = () => ({
  [FlowIds.ONRAMP]: ExchangeAccountCard,
  [FlowIds.TRANSFER]: ExchangeAccountCard,
  [FlowIds.CONNECT]: ExchangeAccountCard,
});

const HistoryScreen = ({ dataStore, uiStore }) => {
  const account = dataStore.selectedAccount;
  if (!account) return null;
  const [loading, setLoading] = useState(false);
  const loadTransactions = async () => {
    try {
      setLoading(true);
      await dataStore.getTransactions();
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };

  useEffect(() => {
    dataStore.clearTransactions();
    loadTransactions();
  }, []);

  return (
    <>
      <h2 className="ScreenHeading noPadding">
        {loading ? 'Loading Transaction History...' : 'Transaction History'}
      </h2>
      <ExchangeAccountCard
        borderedButton
        buttonText="Back to Accounts"
        account={account}
        key={account.accountId}
        onButtonClick={() => {
          dataStore.selectAccount(null);
          uiStore.setCurrentScreen(ScreenNames.ACCOUNT);
        }}
      />
      <TransactionTable transactions={dataStore.transactions} />
    </>
  );
};

const TransactionTable = ({ transactions }) => {
  return (
    <div className="transaction-table">
      <p className="header-title-text">transaction id</p>
      <p className="header-title-text">type</p>
      <p className="header-title-text">amount</p>
      <p className="header-title-text">asset</p>
      <p className="header-title-text">usd value</p>
      <p className="header-title-text">status</p>
      {transactions.map((trx) => (
        <React.Fragment key={trx.transactionId}>
          <p>{trx.transactionId}</p>
          <p>{trx.transactionType}</p>
          <p>{trx.amount}</p>
          <p>{trx.amountCurrency}</p>
          <p>{`${trx.foreignAmount} ${trx.foreignAmountCurrency}`}</p>
          <p>{trx.status}</p>
        </React.Fragment>
      ))}
    </div>
  );
};

export default withStores(HistoryScreen);
