import React, { useState } from 'react';
import TitleAndValue from '../basic/titleAndValue/TitleAndValue';
import Input from '../basic/input/Input';
import { ButtonWithCancel } from '../basic/button/Button';
import { withPrimaryColor } from '../../stores/StoresUtil';
const description = `Enter an email address for your new user`;

export const UserForm = ({ onCancel, onSubmit, primaryColor }) => {
  const [email, setEmail] = useState('');
  console.log(primaryColor);
  return (
    <form onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}>
      <TitleAndValue title="Enter User's Email" value={description} />
      <Input placeholder="User Email" value={email} onChange={({ target }) => setEmail(target.value)} />
      <ButtonWithCancel onCancel={onCancel} onClick={onSubmit} disabled={!email.length} primaryColor={primaryColor}>Save User</ButtonWithCancel>
    </form>
  )
}

export default withPrimaryColor(UserForm);