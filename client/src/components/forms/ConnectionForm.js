import React, { useState } from 'react';
import DropdownSelector from '../basic/dropdownSelector/DropdownSelector';
import TitleAndValue from '../basic/titleAndValue/TitleAndValue';
import { ButtonWithCancel } from '../basic/button/Button';
import { withPrimaryColor } from '../../stores/StoresUtil';

const description = `Choose the exchange that your user will authenticate with.`;

const placeholderOption = 'Choose an Exchange';

const accountOptions = [
  { value: 'coinbase', label: 'Coinbase', className: 'TransferColor' },
];

export const ConnectionForm = ({ onCancel, onSubmit, primaryColor }) => {
  const [selectedOption, selectOption] = useState(placeholderOption);
  const disabled = selectedOption === placeholderOption;
  return (
    <form onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}>
      <TitleAndValue title="Exchange" value={description} />
      <DropdownSelector selectedOption={selectedOption} selectOption={selectOption} options={accountOptions} selectedClassName={disabled ? 'LightGreyText ThinText MediumTextSize' : 'TransferColor'} />
      <ButtonWithCancel onCancel={onCancel} onClick={onSubmit} disabled={disabled} primaryColor={primaryColor}>Create Connection</ButtonWithCancel>
    </form>
  )
}

export default withPrimaryColor(ConnectionForm);