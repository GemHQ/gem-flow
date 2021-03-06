import React, { Component } from 'react';
import DropdownSelector from '../../basic/dropdownSelector/DropdownSelector';
import TitleAndValue from '../../basic/titleAndValue/TitleAndValue';
import { ButtonWithCancel } from '../../basic/button/Button';
import Input from '../../basic/input/Input';
import { withPrimaryColor } from '../../../stores/StoresUtil';
import DocumentUpload from './documentUpload/DocumentUpload';
import mockProfiles from './mockProfiles';
import { toDateDashedString, onlyNumbers, trimmed, toSSNDashedString, twoUpperAlphas, postalCodeFilter, phoneNumberFilter } from '../../../util/FormUtil';

const Placeholders = {
  FIRST_NAME: 'First Name',
  LAST_NAME: 'Last Name',
  EMAIL: 'Email',
  DATE_OF_BIRTH: 'Date of birth',
  SSN: 'SSN',
  PHONE_NUMBER: 'Phone number',
  ADDRESS_LINE_1: 'Address Line 1',
  ADDRESS_LINE_2: 'Address Line 2',
  POSTAL_CODE: 'Postal code',
  CITY: 'City',
  STATE: 'State/Province',
  COUNTRY: 'Country'
};

const countryOptions = [
  { value: 'US', label: 'United States', className: 'OnrampColor MediumTextSize' },
];

export class ProfileForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    ssn: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    postalCode: '',
    city: '',
    state: '',
    country: Placeholders.COUNTRY,
    document: null,
  }

  setInputValue = (field, value) => {
    this.setState({ [field]: value });
  }

  clearAll = () => {
    for (let i in this.state) {
      switch (i) {
        case 'country':
          this.setState({ [i]: Placeholders.COUNTRY });
          break;
        case 'document':
          this.setState({ [i]: null });
          break;
        default:
          this.setState({ [i]: '' });
          break;
      } 
    }
  }

  fillWithData = () => {
    const randomIndex = Math.floor(Math.random() * mockProfiles.length);
    const mockProfile = mockProfiles[randomIndex];
    for (let i in mockProfile) {
      this.setState({ [i]: mockProfile[i] });
    }
  }

  isButtonDisabled = () => {
    return !this.state.firstName
      || !this.state.lastName
      || !this.state.email
      || !this.state.dateOfBirth
      || !this.state.ssn
      || !this.state.phoneNumber
      || !this.state.addressLine1
      || !this.state.postalCode
      || !this.state.city
      || !this.state.state
      || !this.state.document
      || this.state.country === Placeholders.COUNTRY
  }

  render() {
    const { onCancel, onSubmit, primaryColor } = this.props;
    const {
      firstName,
      lastName,
      email,
      dateOfBirth,
      ssn,
      phoneNumber,
      addressLine1,
      addressLine2,
      postalCode,
      city,
      state,
      country,
      document
    } = this.state;
    const buttonDisabled = this.isButtonDisabled();
    return (
      <form 
        className="ShortGap"
        onSubmit={e => e.preventDefault()}>
        <div/>
        <div/>
        <div className="Flex FlexEnd FormPaddingBottomSmall">
          <p 
            className="OnrampColor Pointer ExtraBold SmallText" 
            onClick={buttonDisabled ? this.fillWithData : this.clearAll}
          >{buttonDisabled ? 'Fill in test data' : 'Clear all'}</p>
        </div>
        <TitleAndValue 
          title="Enter information"
          value="Enter the identifying information for your new user."
        />
        <div className="DoubleInputGrid">
          <Input 
            value={firstName} 
            onChange={({ target }) => this.setInputValue('firstName', target.value)} 
            placeholder={Placeholders.FIRST_NAME}
          />
          <Input 
            value={lastName} 
            onChange={({ target }) => this.setInputValue('lastName', target.value)} 
            placeholder={Placeholders.LAST_NAME}
          />
        </div>
        <Input 
          value={addressLine1} 
          onChange={({ target }) => this.setInputValue('addressLine1', target.value)} 
          placeholder={Placeholders.ADDRESS_LINE_1}
          />
        <div />
        <Input 
          value={email} 
          onChange={({ target }) => this.setInputValue('email', target.value)} 
          placeholder={Placeholders.EMAIL}
          />
        <Input 
          value={addressLine2} 
          onChange={({ target }) => this.setInputValue('addressLine2', target.value)} 
          placeholder={Placeholders.ADDRESS_LINE_2}
        />
        <div />
        <Input 
          value={dateOfBirth} 
          onChange={({ target }) => this.setInputValue('dateOfBirth', toDateDashedString(target.value))} 
          placeholder={Placeholders.DATE_OF_BIRTH}
        />
        <Input 
          value={postalCode} 
          onChange={({ target }) => this.setInputValue('postalCode', postalCodeFilter(target.value))} 
          placeholder={Placeholders.POSTAL_CODE}
        />
        <div />
        <Input 
          value={ssn} 
          onChange={({ target }) => this.setInputValue('ssn', toSSNDashedString(target.value))} 
          placeholder={Placeholders.SSN}
          />
        <div className="DoubleInputGrid">
          <Input 
            value={city} 
            onChange={({ target }) => this.setInputValue('city', target.value)} 
            placeholder={Placeholders.CITY}
          />
          <Input 
            value={state} 
            onChange={({ target }) => this.setInputValue('state', twoUpperAlphas(target.value))} 
            placeholder={Placeholders.STATE}
          />
        </div>
        <div />
        <div className="FormPaddingBottomBig">
          <Input 
            value={phoneNumber} 
            onChange={({ target }) => this.setInputValue('phoneNumber', phoneNumberFilter(target.value))} 
            placeholder={Placeholders.PHONE_NUMBER}
          />
        </div>
        <DropdownSelector
          selectedOption={country || Placeholders.COUNTRY}
          selectOption={option => this.setInputValue('country', option)}
          options={countryOptions}
          selectedClassName={`ThinText MediumTextSize ${country === Placeholders.COUNTRY ? 'LightGreyText' : 'BlackText'}`}
        />
        <TitleAndValue 
          title="Upload photo ID"
          value="A driver license, a ID card or a passport with a clear photo."
        />
        <DocumentUpload
          document={document}
          onUpload={document => this.setInputValue('document', document)}
          onClear={() => this.setInputValue('document', null)}
        />
        <div />
        <div />
        <div />
        <ButtonWithCancel onCancel={onCancel} onClick={() => onSubmit({ ...this.state })} disabled={buttonDisabled} primaryColor={primaryColor}>Create</ButtonWithCancel>
      </form>
    )
  }
};



export default withPrimaryColor(ProfileForm);