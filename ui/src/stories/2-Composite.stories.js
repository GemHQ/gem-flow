import React from 'react';
import UIStore from '../stores/UIStore';
import Instructions from '../components/composite/instructions/Instructions';
import { ProgressMap } from '../components/composite/progressMap/ProgressMap';
import TransactionTable from '../components/composite/transactionTable/TransactionTable';
import mockTransactions from '../components/composite/transactionTable/MockTransactions';
import FlowStore from '../stores/FlowStore';

const uiStore = new UIStore();
const flowStore = new FlowStore();

export default {
  title: 'Composite Components',
};

export const instructions = () => <Instructions uiStore={uiStore} />;

export const progressMap = () => <ProgressMap uiStore={uiStore}  flowStore={flowStore} />

export const transactionTable = () => <TransactionTable transactions={mockTransactions} />
