import React, { useState } from 'react';
import TitleAndValue from '../basic/titleAndValue/TitleAndValue';
import { ButtonWithCancel } from '../basic/button/Button';
import Input from '../basic/input/Input';
import { withPrimaryColor } from '../../stores/StoresUtil';
import { validNumber, onlyNumbers } from '../../util/FormUtil';
import { capitalizeFirstLetter } from '../../util/TextUtil';
import { InstitutionIds } from '../../stores/Constants';

export const TransferForm = ({ accountId, institutionId, asset, maxAmount, onCancel, onSubmit, primaryColor }) => {
  const [amount, setAmount] = useState('');
  const [twoFA, setTwoFA] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const isCoinbase = institutionId === InstitutionIds.COINBASE;
  const disabled = (!amount) || (!destinationAddress) || (isCoinbase && !twoFA) || (amount > maxAmount);
  const description = isCoinbase ? 
  `Enter the amount, destination address and Coinbase Two Factor Authentication code.`
  : `Enter the amount and destination address.`

  return (
    <form onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}>
      <TitleAndValue 
        title="Enter information"
        value={description}
        maxHeight="60px"
      />
      <Input 
        value={amount} 
        onChange={({ target }) => setAmount(validNumber(target.value))} 
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
        value={destinationAddress} 
        onChange={({ target }) => setDestinationAddress(target.value)} 
        placeholder="Destination Address"
        containerClassName={isCoinbase ? '' : 'DoubleColumnGridItem ResetInputContainerWidths'}
      />
      {isCoinbase && <Input 
        value={twoFA} 
        onChange={({ target }) => setTwoFA(onlyNumbers(target.value))} 
        placeholder="2FA Code" 
      />}
      <div/>
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