import React, { useState } from 'react';
import DropdownSelector from '../basic/dropdownSelector/DropdownSelector';
import TitleAndValue from '../basic/titleAndValue/TitleAndValue';
import { ButtonWithCancel } from '../basic/button/Button';
import HelpTip from '../basic/helpTip/HelpTip';
import { TipInput } from '../basic/input/Input';
import { withPrimaryColor } from '../../stores/StoresUtil';

const titleTip = `This form will open a new trading account at the selected Institution and return a Connection object.`;

const inputTip = `Gem will open new user accounts at each Institution under our master accounts by default. If you already have an established business relationship with the Institution, you may include your business account ID here to open new user accounts under your business account instead.`;

const placeholderOption = 'Choose an Institution';

const institutionOptions = [
  { value: 'wyre', label: 'Wyre', className: 'OnrampColor' },
  { value: 'coinify', label: 'Coinify', className: 'OnrampColor' },
];

export const InstitutionUserForm = ({ onCancel, onSubmit, primaryColor }) => {
  const [businessAccountId, setBusinessAccountId] = useState('');
  const [selectedOption, selectOption] = useState(placeholderOption);
  const disabled = selectedOption === placeholderOption;
  return (
    <form onSubmit={e => e.preventDefault()}>
      <TitleAndValue 
        title={<div className="FlexAlignCenter"><h3 style={{ paddingRight: '4px' }}>Create InstitutionUser</h3><HelpTip text={titleTip} /></div>}
        value={<p>Choose an institution to create an <span className="OnrampColor Pointer">InstitutionUser</span> to establish the connection.</p>}
        maxHeight="60px"
      />
      <DropdownSelector
        selectedOption={selectedOption} 
        selectOption={selectOption} 
        options={institutionOptions} 
        selectedClassName={disabled ? 'LightGreyText ThinText MediumTextSize' : 'OnrampColor'} 
      />
      <TipInput 
        value={businessAccountId} 
        onChange={({ target }) => setBusinessAccountId(target.value)} 
        placeholder="Business account ID (optional)" 
        tipText={inputTip} 
      />
      <div />
      <div />
      <ButtonWithCancel onCancel={onCancel} onClick={() => onSubmit({ name: selectedOption, businessAccountId })} disabled={disabled} primaryColor={primaryColor}>Create</ButtonWithCancel>
    </form>
  )
}

export default withPrimaryColor(InstitutionUserForm);