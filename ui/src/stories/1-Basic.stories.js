import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from '../components/basic/button/Button';
import Input from '../components/basic/input/Input';
import { PrimaryColors } from '../stores/Constants';
import DropdownSelector from '../components/basic/dropdownSelector/DropdownSelector';

export default {
  title: 'Basic Components',
};

export const buttonShort = () => <Button onClick={action('clicked')} backgroundColor={PrimaryColors.ONRAMP}>Create</Button>;

export const buttonLong = () => <Button onClick={action('clicked')} backgroundColor={PrimaryColors.ONRAMP}>Create Transaction</Button>;

export const buttonDiabled = () => <Button onClick={action('clicked')} backgroundColor={PrimaryColors.ONRAMP} disabled>Create</Button>;

export const inputWithoutValue = () => <Input value="" placeholder="User Email" />

export const inputWithValue = () => <Input value="rawad@gem.co" placeholder="User Email" />

export const dropdown = () => <DropdownSelector selectedOption="Connect" setSelectedOption={() => {}} />
