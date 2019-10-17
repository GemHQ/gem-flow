import React from 'react';
import GenericCard from './GenericCard';
import { withPrimaryColor } from '../../stores/StoresUtil';


const AccountCard = ({ account, createTransaction, primaryColor, removeAccount, dots, withUnderButton, disabled }) => (
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
    dotsMenuOptions={[{ title: 'Remove account', onClick: removeAccount }]}
    UnderButton={withUnderButton ? <UnderButton primaryColor={primaryColor} onClick={() => {}}/> : null}
    dots={dots}
    disabled={disabled}
  />
);

const UnderButton = ({ primaryColor, onClick }) => (
  <p 
    className="SmallText ExtraBold Pointer" 
    style={{ color: primaryColor, marginTop: '4px' }}
    onClick={onClick}
  >View Transactions{console.log(primaryColor)}</p>
)

export default withPrimaryColor(AccountCard);