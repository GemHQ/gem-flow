import React, { useState } from 'react';
import { withStores } from '../stores/StoresUtil';
import AccountCard from '../components/cards/AccountCard';
import TransactionForm from '../components/forms/TransactionForm';
import { ScreenNames } from '../stores/Constants';

const TransactionScreen = ({ flowStore, uiStore }) => {
  const initialScreenState = uiStore.progressStore.initialScreenStates.get(ScreenNames.TRANSACTION);
  const initiallyOpenForm = initialScreenState && initialScreenState.withOpenForm;
  const [creatingItem, setCreatingItem] = useState(initiallyOpenForm);
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
        <h2 className="ScreenHeading noPadding">{`${numberOfItems} Transaction${numberOfItems === 1 ? '' : 's'}`}</h2>
      </div>
    }
    {
      flowStore.selectedAccount
      &&
      <AccountCard
        account={flowStore.selectedAccount}
        onButtonClick={startCreatingItem}
        key={flowStore.selectedAccount.id} 
        dots={false}
        disabled={creatingItem}
      />
    }
    </>
  )
}


export default withStores(TransactionScreen);