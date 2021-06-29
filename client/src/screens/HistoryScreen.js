import React, { useEffect, useState } from 'react';
import './transactionHistory.scss';
import { withStores } from '../stores/StoresUtil';
import { ScreenNames } from '../stores/Constants';
import { ExchangeAccountCard } from '../components/cards/AccountCard';
import ErrorMessage from '../components/basic/errorMessage/ErrorMessage';
import { formatTrxDay, formatTrxTime } from '../util/TextUtil';

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
    // dataStore.clearTransactions();
    loadTransactions();
  }, []);

  return (
    <>
      <ErrorMessage />
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
      <div className="center-cell">
        <p className="header-title-text">date</p>
      </div>
      <div className="center-cell">
        <p className="header-title-text">type</p>
      </div>
      <div className="right-align-cell">
        <p className="header-title-text">
          source
          <br />
          amount
        </p>
      </div>
      <div className="left-align-cell">
        <p className="header-title-text">
          source
          <br />
          currency
        </p>
      </div>
      <div className="right-align-cell">
        <p className="header-title-text">
          dest.
          <br />
          amount
        </p>
      </div>
      <div className="left-align-cell">
        <p className="header-title-text">
          dest.
          <br />
          currency
        </p>
      </div>
      <div className="center-cell">
        <p className="header-title-text">fees</p>
      </div>
      <div className="left-align-cell">
        <p className="header-title-text">transaction id</p>
      </div>
      {transactions.map((trx) => (
        <React.Fragment key={trx.transactionId}>
          <div className="left-align-cell">
            <p>{formatTrxDay(trx.transactionTimestamp)}</p>
            <p>{formatTrxTime(trx.transactionTimestamp)}</p>
          </div>
          <div className="left-align-cell">
            <p className="Capitalize">{trx.transactionType}</p>
          </div>
          <div className="right-align-cell">
            <p>{trx.amount}</p>
          </div>
          <div className="left-align-cell">
            <p>{trx.amountCurrency}</p>
          </div>
          <div className="right-align-cell">
            <p>{trx.amount}</p>
          </div>
          <div className="left-align-cell">
            <p>{trx.amountCurrency}</p>
          </div>
          <div className="center-cell">
            <p>{trx.amountCurrency}</p>
          </div>
          <p className="left-align-cell">{trx.transactionId}</p>
        </React.Fragment>
      ))}
    </div>
  );
};

export default withStores(HistoryScreen);
