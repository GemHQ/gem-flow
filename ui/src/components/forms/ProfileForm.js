import React, { Component } from 'react';
import DropdownSelector from '../basic/dropdownSelector/DropdownSelector';
import TitleAndValue from '../basic/titleAndValue/TitleAndValue';
import Button, { ButtonWithCancel } from '../basic/button/Button';
import Input from '../basic/input/Input';

const mockProfiles = [{
    profileName: 'Jean-Luc Picard',
    firstName: 'Jean-Luc',
    lastName: 'Picard',
    email: 'jeanluc@starfleet.org',
    dateOfBirth: '07-13-2305',
    ssn: '948-38-0021',
    phoneNumber: '(555) 555-5555',
    addressLine1: '123 Enterprise St.',
    addressLine2: '',
    postalCode: '94016',
    city: 'San Fransisco',
    state: 'CA',
    country: 'United States'
  },
  {
    profileName: 'Samwise Gamgee',
    firstName: 'Samwise',
    lastName: 'Gamgee',
    email: 'samwise@theshire.com',
    dateOfBirth: '04-06-2980',
    ssn: '548-29-0927',
    phoneNumber: '(888) 888-8888',
    addressLine1: '123 Hobbiton St.',
    addressLine2: '',
    postalCode: '97035',
    city: 'Portland',
    state: 'OR',
    country: 'United States'
}];

const Placeholders = {
  PROFILE_NAME: 'Profile Name',
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
  { value: 'united states', label: 'United States', className: 'OnrampColor MediumTextSize' },
];

class ProfileForm extends Component {
  state = {
    profileName: '',
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
    country: ''
  }

  setInputValue = (field, value) => {
    this.setState({ [field]: value });
  }

  clearAll = () => {
    for (let i in this.state) {
      this.setState({ [i]: '' });
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
    return !this.state.profileName
      || !this.state.firstName
      || !this.state.lastName
      || !this.state.email
      || !this.state.dateOfBirth
      || !this.state.ssn
      || !this.state.phoneNumber
      || !this.state.addressLine1
      || !this.state.postalCode
      || !this.state.city
      || !this.state.state
      || !this.state.country
  }

  render() {
    const { onCancel, onSubmit, primaryColor } = this.props;
    const {
      profileName,
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
      country
    } = this.state;
    const buttonDisabled = this.isButtonDisabled();
    return (
      <form 
        className="ShortGap"
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
      }}>
        <TitleAndValue 
          title="Name the profile"
          value=""
        />
        <div className="TallRow">
          <Input 
            value={profileName} 
            onChange={({ target }) => this.setInputValue('profileName', target.value)} 
            placeholder={Placeholders.PROFILE_NAME}
          />
        </div>
        <div className="Flex FlexEnd">
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
          onChange={({ target }) => this.setInputValue('dateOfBirth', target.value)} 
          placeholder={Placeholders.DATE_OF_BIRTH}
        />
        <Input 
          value={postalCode} 
          onChange={({ target }) => this.setInputValue('postalCode', target.value)} 
          placeholder={Placeholders.POSTAL_CODE}
        />
        <div />
        <Input 
          value={ssn} 
          onChange={({ target }) => this.setInputValue('ssn', target.value)} 
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
            onChange={({ target }) => this.setInputValue('state', target.value)} 
            placeholder={Placeholders.STATE}
          />
        </div>
        <div />
        <div className="TallRow">
          <Input 
            value={phoneNumber} 
            onChange={({ target }) => this.setInputValue('phoneNumber', target.value)} 
            placeholder={Placeholders.PHONE_NUMBER}
          />
        </div>
        <DropdownSelector
          selectedOption={country || Placeholders.COUNTRY}
          selectOption={option => this.setInputValue('country', option.value)}
          options={countryOptions}
          selectedClassName={country === Placeholders.COUNTRY ? 'LightGreyText ThinText MediumTextSize' : 'BlackText ThinText MediumTextSize'}
        />
        <TitleAndValue 
          title="Upload photo ID"
          value="A driver license, a ID card or a passport with a clear photo."
        />
        <div className="MaxButtonWidth"><Button backgroundColor={primaryColor} onClick={() => {}}>Upload</Button></div>
        <div />
        <div />
        <div />
        <ButtonWithCancel onCancel={onCancel} onClick={onSubmit} disabled={buttonDisabled} backgroundColor={primaryColor}>Create</ButtonWithCancel>
      </form>
    )
  }
};

export default ProfileForm;