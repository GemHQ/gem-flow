import React from 'react';
import GenericCard from './GenericCard';


const AccountCard = ({ account, createTransaction, primaryColor }) => (
  <GenericCard 
    titlesAndValues={[
      { title: 'ACCOUNT_ID', value: account.id },
      { title: 'ACCOUNT_NAME', value: account.name },
      { title: 'ACCOUNT_TYPE', value: account.type },
      { title: 'LAST_UPDATED_AT', value: account.last_updated_at },
    ]}
    buttonText="Create Transaction"
    onButtonClick={createTransaction}
    primaryColor={primaryColor}
  />
);

export default AccountCard;