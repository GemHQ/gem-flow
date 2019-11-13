import React from 'react';
import UserCard from '../components/cards/UserCard';
import { action } from '@storybook/addon-actions';
import { Flows } from '../stores/Constants';
import ProfileCard from '../components/cards/ProfileCard';
import ConnectionCard from '../components/cards/ConnectionCard';
import AccountCard from '../components/cards/AccountCard';

const mockUser = {
  id: '1',
  email: 'rawad@gem.co',
  created_at: 'UTC +8 16:00 Sep 19, 2019'
}

const mockProfile = {
  id: '1',
  name: `Rawad's Profile`,
  created_at: 'UTC +8 16:00 Sep 19, 2019'
}

const mockConnection = {
  id: '1',
  name: `Wyre`,
  created_at: 'UTC +8 16:00 Sep 19, 2019'
}

const mockAccount = {
  id: '1',
  name: 'Bank of America',
  type: 'Bank ACH',
  updated_at: 'UTC +8 16:00 Sep 19, 2019'
}

export default {
  title: 'Cards',
};

export const user  = () => <UserCard user={mockUser} createProfile={action('create profile')} primaryColor={Flows.Onramp.primaryColor} />;

export const profile  = () => <ProfileCard profile={mockProfile} createInstitutionUser={action('create connection')} primaryColor={Flows.Onramp.primaryColor} />;

export const onrampConnection  = () => <ConnectionCard connection={mockConnection} createAccount={action('create account')} primaryColor={Flows.Onramp.primaryColor} />;

export const account  = () => <AccountCard account={mockAccount} createTransaction={action('create transaction')} primaryColor={Flows.Onramp.primaryColor} />;