import React from 'react';
import UserForm from '../components/forms/UserForm';
import { action } from '@storybook/addon-actions';
import { Flows } from '../stores/Constants';

export default {
  title: 'Forms',
};

export const user = () => <UserForm onCancel={action('cancel')} onSubmit={action('submit')} primaryColor={Flows.Onramp.primaryColor} />;

export const intitution  = () => <div />;

export const profile  = () => <div />;

export const transaction  = () => <div />;