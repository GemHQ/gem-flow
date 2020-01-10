import React from 'react';
import Instructions from '../components/composite/instructions/Instructions';
import { ProgressMap } from '../components/composite/progressMap/ProgressMap';
import TransactionTable from '../components/composite/transactionTable/TransactionTable';
import mockTransactions from '../components/composite/transactionTable/MockTransactions';

// const uiStore = new UIStore();
// const dataStore = new DataStore();

export default {
  title: 'Composite Components',
};

// export const instructions = () => <Instructions uiStore={uiStore} />;

// export const progressMap = () => <ProgressMap uiStore={uiStore}  dataStore={dataStore} />

export const transactionTable = () => <TransactionTable transactions={mockTransactions} />
