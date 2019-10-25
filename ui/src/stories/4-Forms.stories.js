import React from 'react';
import '../components/forms/forms.css';
import { UserForm } from '../components/forms/UserForm';
import { action } from '@storybook/addon-actions';
import { Flows } from '../stores/Constants';
import { AccountForm } from '../components/forms/AccountForm';
import { InstitutionUserForm } from '../components/forms/InstitutionUserForm';
import { TransactionForm } from '../components/forms/TransactionForm';
import { ProfileForm } from '../components/forms/profileForm/ProfileForm';

const props = {
  onCancel: action('cancel'),
  onSubmit: action('submit'),
  primaryColor: Flows.Onramp.primaryColor,
}

export default {
  title: 'Forms',
};

export const user = () => <UserForm {...props} />;

export const intitutionUser  = () => <InstitutionUserForm {...props} />;

export const profile  = () => <ProfileForm {...props} />;

export const account = () => <AccountForm {...props} />

export const transaction  = () => <TransactionForm {...props} />;