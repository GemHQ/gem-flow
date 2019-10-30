import React, { useState } from 'react';
import './transactionTable.css'

const TRANSACTIONS_PER_PAGE = 4;

const TransactionTable = ({ transactions }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const trxToDisplay = sliceTransactions(currentPage, transactions);

  return (
    <div className="TransactionTableContainer">
      <TransactionHeader />
      {
        trxToDisplay.map(trx => <TransactionRow key={trx.id} trx={trx} />)
      }
    </div>
  )
}

const TransactionHeader = () => (
  <div className="TransactionRow">
    <p className="GreyText">DESTINATION</p>
    <p className="GreyText TextCenter">TYPE</p>
    <p className="GreyText TextCenter">AMOUNT</p>
    <p className="GreyText TextCenter">DATE</p>
    <p className="GreyText TextCenter">STATUS</p>
  </div>
)

const TransactionRow = ({ trx }) => (
  <div className="TransactionRow TransactionTopBorder">
    <p>{trx.destination}</p>
    <p className="TextCenter">{trx.type}</p>
    <p className="TextCenter">{trx.destination_amount}</p>
    <p className="TextCenter">{trx.created_at}</p>
    <p className="TextCenter">{trx.status}</p>
  </div>
)

const sliceTransactions = (currentPage, transactions) => {
  const startIndex = currentPage * TRANSACTIONS_PER_PAGE;
  const endIndex = (currentPage + 1) * TRANSACTIONS_PER_PAGE;
  return transactions.slice(startIndex, endIndex);
};

export default TransactionTable;