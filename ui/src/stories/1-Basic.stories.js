import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from '../components/basic/button/Button';
import Input from '../components/basic/input/Input';
import DropdownSelector from '../components/basic/dropdownSelector/DropdownSelector';
import UIStore from '../stores/UIStore';
import { Flows } from '../stores/Constants';

const uiStore = new UIStore();

export default {
  title: 'Basic Components',
};

export const buttonShort = () => <Button onClick={action('clicked')} backgroundColor={Flows.Onramp.primaryColor}>Create</Button>;

export const buttonLong = () => <Button onClick={action('clicked')} backgroundColor={Flows.Onramp.primaryColor}>Create Transaction</Button>;

export const buttonDisabled = () => <Button onClick={action('clicked')} backgroundColor={Flows.Onramp.primaryColor} disabled>Create</Button>;

export const inputWithoutValue = () => <Input value="" placeholder="User Email" />;

export const inputWithValue = () => <Input value="rawad@gem.co" placeholder="User Email" />;

export const dropdown = () => <DropdownSelector options={uiStore.dropdownOptions} selectedOption={uiStore.dropdownTitle} selectOption={option => uiStore.setFlow(option.value)} />;
