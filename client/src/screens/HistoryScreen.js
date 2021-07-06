import React, { useEffect, useState } from 'react';
import './transactionHistory.scss';
import { withStores } from '../stores/StoresUtil';
import { ExchangeAccountCard } from '../components/cards/AccountCard';
import ErrorMessage from '../components/basic/errorMessage/ErrorMessage';
import {
  formatLocalCurrencyAmount,
  formatTrxDay,
  formatTrxTime,
} from '../util/TextUtil';
import ConnectionCard from '../components/cards/ConnectionCard';
import EastSVG from '../assets/east.svg';
import WestSVG from '../assets/west.svg';

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
      <ConnectionCard connection={dataStore.selectedCredential} hideButton />
      <div className="NestedDivider" />
      <ExchangeAccountCard account={dataStore.selectedAccount} hideButton />
      <div className="NestedDivider" />
      <h2 className="ScreenHeading noPadding">
        {loading
          ? 'Loading Transaction History...'
          : `${dataStore.transactionsMap.size} Transactions`}
      </h2>
      {/* <ExchangeAccountCard
        borderedButton
        buttonText="Back to Accounts"
        account={account}
        key={account.accountId}
        onButtonClick={() => {
          dataStore.selectAccount(null);
          uiStore.setCurrentScreen(ScreenNames.ACCOUNT);
        }}
      /> */}
      {dataStore.transactionsMap.size > 0 && (
        <TransactionTable transactions={dataStore.transactions} />
      )}
    </>
  );
};

const TransactionTable = ({ transactions }) => {
  return (
    <div className="transaction-table">
      <div className="center-cell header-cell">
        <p className="header-title-text">date</p>
      </div>
      <div className="center-cell header-cell">
        <p className="header-title-text">type</p>
      </div>
      <div className="right-align-cell header-cell">
        <p className="header-title-text">
          foreign
          <br />
          amount
        </p>
      </div>
      <div className="left-align-cell header-cell">
        <p className="header-title-text">
          foreign
          <br />
          currency
        </p>
      </div>
      <div className="center-cell" />
      <div className="right-align-cell header-cell">
        <p className="header-title-text">
          source
          <br />
          amount
        </p>
      </div>
      <div className="left-align-cell header-cell">
        <p className="header-title-text">
          source
          <br />
          currency
        </p>
      </div>
      <div className="right-align-cell header-cell">
        <p className="header-title-text">fees</p>
      </div>
      <div className="center-cell header-cell" />
      <div className="center-cell header-cell">
        <p className="header-title-text">transaction id</p>
      </div>
      {transactions.map((trx) => (
        <React.Fragment key={trx.transactionId}>
          <div className="line" />
          <div className="left-align-cell">
            <p>{formatTrxDay(trx.transactionTimestamp)}</p>
            <p className="LightGreyText">
              {formatTrxTime(trx.transactionTimestamp)}
            </p>
          </div>
          <div className="center-cell">
            <p className="Capitalize">{trx.transactionType.toLowerCase()}</p>
          </div>
          <div className="right-align-cell">
            <p>{trx.foreignAmount}</p>
            <p className="LightGreyText">
              {formatLocalCurrencyAmount(
                trx.foreignAmountLocal,
                trx.localCurrency
              )}
            </p>
          </div>
          <div className="left-align-cell">
            <p>{trx.foreignAmountCurrency}</p>
            <p className="LightGreyText">{trx.localCurrency}</p>
          </div>
          <div className="left-align-cell" style={{ paddingLeft: 0 }}>
            {trx.transactionType === 'PURCHASED' && (
              <img alt="trx.trx.transactionType" src={WestSVG} />
            )}
            {trx.transactionType === 'SOLD' && (
              <img alt="trx.trx.transactionType" src={EastSVG} />
            )}
          </div>
          <div className="right-align-cell">
            <p>{trx.amount}</p>
            <p className="LightGreyText">
              {formatLocalCurrencyAmount(trx.amountLocal, trx.localCurrency)}
            </p>
          </div>
          <div className="left-align-cell">
            <p>{trx.amountCurrency}</p>
            <p className="LightGreyText">{trx.localCurrency}</p>
          </div>
          <div className="right-align-cell">
            <p>{trx.fees}</p>
            <p className="LightGreyText">
              {formatLocalCurrencyAmount(trx.feesLocal, trx.localCurrency)}
            </p>
          </div>
          <div className="left-align-cell">
            <p>{trx.feesCurrency}</p>
            <p className="LightGreyText">{trx.localCurrency}</p>
          </div>
          <p className="right-align-cell">{trx.transactionId}</p>
        </React.Fragment>
      ))}
    </div>
  );
};

export default withStores(HistoryScreen);
