import React, { useState } from 'react';
import DropdownSelector from '../basic/dropdownSelector/DropdownSelector';
import TitleAndValue from '../basic/titleAndValue/TitleAndValue';
import { ButtonWithCancel } from '../basic/button/Button';
import { withPrimaryColor } from '../../stores/StoresUtil';

const description = `An account type is a payment method to purchase the assets.`;

const placeholderOption = 'Choose an Account Type';

const accountOptions = [
  { value: 'Bank ACH', label: 'Bank ACH (via Plaid)', className: 'OnrampColor' },
  // { value: 'Debit Card', label: 'Debit Card', className: 'OnrampColor' },
];

export const AccountForm = ({ onCancel, onSubmit, primaryColor }) => {
  const [selectedOption, selectOption] = useState(placeholderOption);
  const disabled = selectedOption === placeholderOption;
  return (
    <form onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}>
      <TitleAndValue title="Account Type" value={description} />
      <DropdownSelector selectedOption={selectedOption} selectOption={selectOption} options={accountOptions} selectedClassName={disabled ? 'LightGreyText ThinText MediumTextSize' : 'OnrampColor'} />
      <ButtonWithCancel onCancel={onCancel} onClick={() => onSubmit({ type: selectedOption, name: 'Bank of America'  })} disabled={disabled} primaryColor={primaryColor}>Add Account</ButtonWithCancel>
    </form>
  )
}

export default withPrimaryColor(AccountForm);