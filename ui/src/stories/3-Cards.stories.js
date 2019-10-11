import React from 'react';
import '../components/cards/cards.css';
import UserCard from '../components/cards/UserCard';
import { action } from '@storybook/addon-actions';
import { Flows } from '../stores/Constants';

const mockUser = {
  email: 'rawad@gem.co',
  id: '1',
  created_at: 'UTC +8 16:00 Sep 19, 2019'
}

export default {
  title: 'Cards',
};

export const user  = () => <UserCard user={mockUser} createProfile={action('create profile')} primaryColor={Flows.Onramp.primaryColor} />;

export const profile  = () => <div />;

export const connection  = () => <div />;

export const account  = () => <div />;