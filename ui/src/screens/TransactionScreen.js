import React, { useState } from 'react';
import { withFlowStore } from '../stores/StoresUtil';
import AccountCard from '../components/cards/AccountCard';
import TransactionForm from '../components/forms/TransactionForm';

const TransactionScreen = ({ flowStore }) => {
  const [creatingItem, setCreatingItem] = useState(true);
  const startCreatingItem = () => setCreatingItem(true);
  const stopCreatingItem = () => setCreatingItem(false);
  const numberOfItems = flowStore.transactions.length;

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
        />
      </>
      :
      <div className="FlexAlignCenter SpaceBetween">
        <h2 className="ScreenHeading noPadding">{`${numberOfItems} Transaction${numberOfItems > 1 ? 's' : ''}`}</h2>
      </div>
    }
    {
      flowStore.selectedAccount
      &&
      <AccountCard
        account={flowStore.selectedAccount} 
        createTransaction={startCreatingItem}
        key={flowStore.selectedAccount.id} 
        dots={false}
        disabled={creatingItem}
      />
    }
    </>
  )
}


export default withFlowStore(TransactionScreen);