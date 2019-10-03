import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from '../components/basic/button/Button';

export default {
  title: 'Button',
};

export const shortText = () => <Button onClick={action('clicked')} backgroundColor="#9C27B0">Create</Button>;

export const longText = () => <Button onClick={action('clicked')} backgroundColor="#9C27B0">Create Transaction</Button>;
