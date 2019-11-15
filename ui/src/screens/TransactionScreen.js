import React, { useState } from 'react';
import { withStores } from '../stores/StoresUtil';
import AccountCard from '../components/cards/AccountCard';
import TransactionForm from '../components/forms/TransactionForm';
import { ScreenNames, FlowIds } from '../stores/Constants';
import TransactionTable from '../components/composite/transactionTable/TransactionTable';
import ErrorMessage from '../components/basic/errorMessage/ErrorMessage';
import TransferForm from '../components/forms/TransferForm';

const TransactionScreen = ({ flowStore, uiStore }) => {
  const initialScreenState = uiStore.initialScreenStates.get(ScreenNames.TRANSACTION);
  const initiallyOpenForm = initialScreenState && initialScreenState.withOpenForm;
  const [creatingItem, setCreatingItem] = useState(initiallyOpenForm);
  const startCreatingItem = () => setCreatingItem(true);
  const stopCreatingItem = () => setCreatingItem(false);
  const { selectedAccount, transactions } = flowStore;
  const numberOfItems = transactions.length;

  const FormToRender = uiStore.flow.id === FlowIds.ONRAMP ? TransactionForm : TransferForm;

  return (
    <>
    <ErrorMessage />
    {
      creatingItem
      ?
      <>
        <h2 className="ScreenHeading">{`Creating Transaction`}</h2>
        <FormToRender
          onCancel={stopCreatingItem}
          onSubmit={transaction => {
            flowStore.createTransaction(transaction);
            stopCreatingItem();
          }}
          accountId={selectedAccount.id}
          accountName={selectedAccount.name}
          maxAmount={flowStore.selectedAccount.available_amount}
          asset={selectedAccount.asset_id}
        />
      </>
      :
      (
        flowStore.isFetching
        ? <p className="Loading">{`Loading Transactions...`}</p>
        :<div className="FlexAlignCenter SpaceBetween">
          <h2 className="ScreenHeading noPadding">{`${numberOfItems} Transaction${numberOfItems === 1 ? '' : 's'}`}</h2>
        </div>
      )
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
      (selectedAccount && numberOfItems > 0)
      &&
      <TransactionTable transactions={transactions} />
    }
    </>
  )
}


export default withStores(TransactionScreen);