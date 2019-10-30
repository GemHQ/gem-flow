import React, { useState } from 'react';
import { withStores } from '../stores/StoresUtil';
import AccountCard from '../components/cards/AccountCard';
import TransactionForm from '../components/forms/TransactionForm';
import { ScreenNames } from '../stores/Constants';
import TransactionTable from '../components/composite/transactionTable/TransactionTable';

const TransactionScreen = ({ flowStore, uiStore }) => {
  const initialScreenState = uiStore.progressStore.initialScreenStates.get(ScreenNames.TRANSACTION);
  const initiallyOpenForm = initialScreenState && initialScreenState.withOpenForm;
  const [creatingItem, setCreatingItem] = useState(initiallyOpenForm);
  const startCreatingItem = () => setCreatingItem(true);
  const stopCreatingItem = () => setCreatingItem(false);
  const { selectedAccount, transactions } = flowStore;
  const numberOfItems = transactions.length;

  return (
    <>
    {
      creatingItem
      ?
      <>
        <h2 className="ScreenHeading">{`Creating Transaction`}</h2>
        <TransactionForm
          onCancel={stopCreatingItem}
          onSubmit={transaction => {
            flowStore.createTransaction(transaction);
            stopCreatingItem();
          }}
          accountId={selectedAccount.id}
        />
      </>
      :
      <div className="FlexAlignCenter SpaceBetween">
        <h2 className="ScreenHeading noPadding">{`${numberOfItems} Transaction${numberOfItems === 1 ? '' : 's'}`}</h2>
      </div>
    }
    {
      !creatingItem
      &&
      selectedAccount
      &&
      <AccountCard
        account={selectedAccount}
        onButtonClick={startCreatingItem}
        key={selectedAccount.id} 
        dots={false}
        disabled={creatingItem}
      />
    }
    {
      selectedAccount
      &&
      numberOfItems
      &&
      <TransactionTable transactions={transactions} />
    }
    </>
  )
}


export default withStores(TransactionScreen);