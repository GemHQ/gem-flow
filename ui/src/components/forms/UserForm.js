import React, { useState } from 'react';
import './forms.css';
import TitleAndValue from '../basic/titleAndValue/TitleAndValue';
import Input from '../basic/input/Input';
import { ButtonWithCancel } from '../basic/button/Button';

const UserForm = ({ onCancel, onSubmit, primaryColor }) => {
  const [email, setEmail] = useState('');

  return (
    <form onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}>
      <TitleAndValue title="Enter User's Email" value="Enter an email address for your new user" />
      <Input placeholder="User Email" value={email} onChange={({ target }) => setEmail(target.value)} />
      <ButtonWithCancel onCancel={onCancel} onClick={onSubmit} disabled={!email.length} backgroundColor={primaryColor}>Save User</ButtonWithCancel>
    </form>
  )
}

export default UserForm;