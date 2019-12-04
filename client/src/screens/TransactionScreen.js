import React, { useState } from 'react';
import { withStores } from '../stores/StoresUtil';
import AccountCard, { ExchangeAccountCard } from '../components/cards/AccountCard';
import TransactionForm from '../components/forms/TransactionForm';
import { ScreenNames, FlowIds } from '../stores/Constants';
import TransactionTable from '../components/composite/transactionTable/TransactionTable';
import ErrorMessage from '../components/basic/errorMessage/ErrorMessage';
import TransferForm from '../components/forms/TransferForm';

// as a function to avoid runtime initialization error
const CardsByFlowId = () => ({
  [FlowIds.ONRAMP]: AccountCard,
  [FlowIds.TRANSFER]: ExchangeAccountCard,
});

const FormsByFlowId = () => ({
  [FlowIds.ONRAMP]: TransactionForm,
  [FlowIds.TRANSFER]: TransferForm,
});

const TransactionScreen = ({ dataStore, uiStore }) => {
  const initialScreenState = uiStore.initialScreenStates.get(ScreenNames.TRANSACTION);
  const initiallyOpenForm = initialScreenState && initialScreenState.withOpenForm;
  const [creatingItem, setCreatingItem] = useState(initiallyOpenForm);
  const startCreatingItem = () => setCreatingItem(true);
  const stopCreatingItem = () => setCreatingItem(false);
  const { selectedAccount, transactions } = dataStore;
  const numberOfItems = transactions.length;

  const CardToRender = CardsByFlowId()[uiStore.flowId];
  const FormToRender = FormsByFlowId()[uiStore.flowId];

  return (
    <>
    <ErrorMessage />
    <PostingLabel isPosting={dataStore.isPosting} />
    {
      creatingItem
      ?
      <>
        <h2 className="ScreenHeading">{`Creating Transaction`}</h2>
        <FormToRender
          onCancel={stopCreatingItem}
          onSubmit={transaction => {
            dataStore.createTransaction(transaction);
            stopCreatingItem();
          }}
          accountId={selectedAccount.id}
          maxAmount={dataStore.selectedAccount.available_amount}
          asset={selectedAccount.asset_id}
          institutionId={selectedAccount.institution_id}
        />
      </>
      :
      (
        dataStore.isFetching
        ? <LoadingLabel />
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
      <CardToRender
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

const LoadingLabel = () => <p className="Loading">{`Loading Transactions...`}</p>;

const PostingLabel = ({ isPosting }) => {
  if (isPosting) return <p className="Creating">{`Creating Transaction...`}</p>
  return null;
}


export default withStores(TransactionScreen);