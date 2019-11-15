import React, { useState } from 'react';
import TitleAndValue from '../basic/titleAndValue/TitleAndValue';
import { ButtonWithCancel } from '../basic/button/Button';
import Input from '../basic/input/Input';
import { withPrimaryColor } from '../../stores/StoresUtil';
import { validNumber } from '../../util/FormUtil';
import { capitalizeFirstLetter } from '../../util/TextUtil';

export const TransferForm = ({ accountId, accountName, asset, maxAmount, onCancel, onSubmit, primaryColor }) => {
  const [amount, setAmount] = useState('');
  const [twoFA, setTwoFA] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const disabled = (!amount) || (!destinationAddress) || (amount > maxAmount);
  return (
    <form onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}>
      <TitleAndValue 
        title="Enter information"
        value={`Enter the amount, destination address and Coinbase Two Factor Authentication code.`}
        maxHeight="60px"
      />
      <Input 
        value={validNumber(amount)} 
        onChange={({ target }) => setAmount(target.value)} 
        placeholder={`Amount (max ${maxAmount})`}
        autoFocus
      />
      <Input 
        value={capitalizeFirstLetter(asset)} 
        placeholder="Asset"
        readOnly
      />
      <div />
      <Input 
        value={accountName} 
        onChange={({ target }) => setAmount(target.value)} 
        placeholder={`Source Account`}
        readOnly
      />
      <Input 
        value={destinationAddress} 
        onChange={({ target }) => setDestinationAddress(target.value)} 
        placeholder="Destination Address" 
      />
      <div/>
      <Input 
        value={twoFA} 
        onChange={({ target }) => setTwoFA(target.value)} 
        placeholder="2FA Code" 
      />
      <div/>
      <div />
      <div />
      <ButtonWithCancel
        onCancel={onCancel}
        disabled={disabled || isNaN(amount)}
        primaryColor={primaryColor}
        onClick={() => {
          onSubmit({
            source_id: accountId,
            source_amount: amount,
            blockchain_address: {
              address: destinationAddress,
              asset_id: asset,
            },
            type: 'Transfer',
            preview: false,
            ext: {
              "2fa_code": twoFA
            }
          })
        }}
      >Create</ButtonWithCancel>
    </form>
  )
}

export default withPrimaryColor(TransferForm);