import React, { useState } from 'react';
import DropdownSelector from '../basic/dropdownSelector/DropdownSelector';
import TitleAndValue from '../basic/titleAndValue/TitleAndValue';
import { ButtonWithCancel } from '../basic/button/Button';
import Input from '../basic/input/Input';
import { withPrimaryColor } from '../../stores/StoresUtil';

const assetPlaceholder = `Asset`;

const fiatPlaceholder = `Pay with`;

const assetOptions = [
  { value: 'bitcoin', label: 'Bitcoin', className: 'OnrampColor MediumTextSize' },
  { value: 'ethereum', label: 'Ethereum', className: 'OnrampColor MediumTextSize' },
];

const fiatOptions = [
  { value: 'usd', label: 'USD', className: 'OnrampColor MediumTextSize' },
  { value: 'eur', label: 'EUR', className: 'OnrampColor MediumTextSize' },
];

export const TransactionForm = ({ accountId, onCancel, onSubmit, primaryColor }) => {
  const [amount, setAmount] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [selectedAsset, selectAsset] = useState(assetPlaceholder);
  const [selectedFiat, selectFiat] = useState(fiatPlaceholder);
  const disabled = (selectedAsset === assetPlaceholder) || (selectedFiat === fiatPlaceholder) || (!amount) || (!destinationAddress);
  return (
    <form onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}>
      <TitleAndValue 
        title="Enter information"
        value="Select an asset and enter the amount."
        maxHeight="60px"
      />
      <DropdownSelector
        selectedOption={selectedAsset}
        selectOption={selectAsset}
        options={assetOptions}
        selectedClassName={selectedAsset === assetPlaceholder ? 'LightGreyText ThinText MediumTextSize' : 'BlackText ThinText MediumTextSize'}
      />
      <DropdownSelector
        selectedOption={selectedFiat}
        selectOption={selectFiat}
        options={fiatOptions}
        selectedClassName={selectedFiat === fiatPlaceholder ? 'LightGreyText ThinText MediumTextSize' : 'BlackText ThinText MediumTextSize'}
      />
      <div />
      <Input 
        value={amount} 
        onChange={({ target }) => setAmount(target.value)} 
        placeholder="Amount" 
      />
      <Input 
        value={destinationAddress} 
        onChange={({ target }) => setDestinationAddress(target.value)} 
        placeholder="Destination Address" 
      />
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
              asset_id: selectedAsset,
            },
            type: 'buy',
            preview: false,
          })
        }}
      >Create</ButtonWithCancel>
    </form>
  )
}

export default withPrimaryColor(TransactionForm);