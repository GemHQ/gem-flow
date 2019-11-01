import React from 'react';
import { action } from '@storybook/addon-actions';
import { BorderedButton, Button } from '../components/basic/button/Button';
import Input, { TipInput } from '../components/basic/input/Input';
import DropdownSelector from '../components/basic/dropdownSelector/DropdownSelector';
import UIStore from '../stores/UIStore';
import { Flows } from '../stores/Constants';
import ThreeDots from '../components/basic/threeDots/ThreeDots';
import HelpTip from '../components/basic/helpTip/HelpTip';
import TitleAndValue from '../components/basic/titleAndValue/TitleAndValue';
import { ErrorMessage } from '../components/basic/errorMessage/ErrorMessage';

const uiStore = new UIStore();

export default {
  title: 'Basic Components',
};

export const buttonShort = () => <Button onClick={action('clicked')} primaryColor={Flows.Onramp.primaryColor}>Create</Button>;

export const buttonLong = () => <Button onClick={action('clicked')} primaryColor={Flows.Onramp.primaryColor}>Create Transaction</Button>;

export const buttonDisabled = () => <Button onClick={action('clicked')} primaryColor={Flows.Onramp.primaryColor} disabled>Create</Button>;

export const borderedButton = () => <BorderedButton onClick={action('clicked')} color={Flows.Onramp.primaryColor}>+ Add new user</BorderedButton>

export const inputWithoutValue = () => <Input value="" placeholder="User Email" />;

export const inputWithValue = () => <Input value="rawad@gem.co" placeholder="User Email" />;

export const tipInput = () => <TipInput value="" placeholder="Business account ID (optional)" tipText="Tooltip text here" />;

export const dropdown = () => <DropdownSelector 
  options={uiStore.dropdownOptions} 
  selectedOption={uiStore.flow.dropdownTitle} 
  selectOption={uiStore.setFlow} 
  selectedClassName={uiStore.flow.colorClassname}
/>;

export const threeDots = () => <ThreeDots />;

export const helpTip = () => <HelpTip text="Tooltip text here" />;

export const titleAndValue = () => <TitleAndValue title="Enter User's Email" value="Enter an email address for your new user" maxWidth="150px" />;

export const titleAndGreyValue = () => <TitleAndValue title="Enter User's Email" value="Enter an email address for your new user" maxWidth="150px" greyValue/>;

export const GreyTitleAndBoldValue = () => <TitleAndValue title="CONNECTION_NAME" value="Wyre" greyTitle thinTitle smallTitle boldValue/>;

export const titleWithTipAndValue = () => <TitleAndValue 
  title={<div className="FlexAlignCenter"><h3 style={{ paddingRight: '4px' }}>Create InstitutionUser</h3><HelpTip text="This form will open a new trading account at the selected Institution and return a Connection object." /></div>}
  value={<p>Choose an institution to create an <span className="OnrampColor Pointer">InstitutionUser</span> to establish the connection.Why do we need this?</p>} 
  maxWidth="175px"
/>;

export const errorMessage = () => <ErrorMessage errorMessage="This is an error message" />
