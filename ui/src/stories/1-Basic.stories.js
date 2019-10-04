import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from '../components/basic/button/Button';
import Input from '../components/basic/input/Input';
import DropdownSelector from '../components/basic/dropdownSelector/DropdownSelector';
import UIStore from '../stores/UIStore';
import { FlowNames } from '../stores/Constants';

const uiStore = new UIStore();

export default {
  title: 'Basic Components',
};

export const buttonShort = () => <Button onClick={action('clicked')} backgroundColor={uiStore.primaryColor}>Create</Button>;

export const buttonLong = () => <Button onClick={action('clicked')} backgroundColor={uiStore.primaryColor}>Create Transaction</Button>;

export const buttonDiabled = () => <Button onClick={action('clicked')} backgroundColor={uiStore.primaryColor} disabled>Create</Button>;

export const inputWithoutValue = () => <Input value="" placeholder="User Email" />;

export const inputWithValue = () => <Input value="rawad@gem.co" placeholder="User Email" />;

export const dropdown = () => <DropdownSelector options={Object.values(FlowNames)} selectedOption={uiStore.flowName} selectOption={option => uiStore.setFlowName(option)} />;
