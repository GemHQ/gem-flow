import React, { useState } from 'react';

const TRANSACTIONS_PER_PAGE = 4;

const TransactionTable = ({ transactions }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const trxToDisplay = sliceTransactions(currentPage, transactions);

  return (
    <div className="TransactionTableContainer">
      <TransactionHeader />
      {
        trxToDisplay.map(trx => <TransactionRow key={trx.id} />)
      }
    </div>
  )
}

const TransactionHeader = () => {
  <div className="TransactionHeader"></div>
}

const TransactionRow = () => {
  <div className="TransactionRow"></div>
}

const sliceTransactions = (currentPage, transactions) => {
  const startIndex = currentPage * TRANSACTIONS_PER_PAGE;
  const endIndex = (currentPage + 1) * TRANSACTIONS_PER_PAGE;
  return transactions;
};

export default TransactionTable;