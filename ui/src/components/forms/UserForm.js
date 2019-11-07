import React, { useState } from 'react';
import TitleAndValue from '../basic/titleAndValue/TitleAndValue';
import Input from '../basic/input/Input';
import { ButtonWithCancel } from '../basic/button/Button';
import { injector } from '../../stores/StoresUtil';
import { validateEmail } from '../../util/FormUtil';
const description = `Enter an email address for your new user (optional)`;

export const UserForm = ({ onCancel, onSubmit, primaryColor, setError }) => {
  const [email, setEmail] = useState('');

  return (
    <form onSubmit={e => e.preventDefault()}>
      <TitleAndValue title="Enter User's Email" value={description} />
      <Input placeholder="User Email (Optional)" value={email} onChange={({ target }) => setEmail(target.value)} autoFocus />
      <ButtonWithCancel
        primaryColor={primaryColor}
        onCancel={onCancel} 
        onClick={() => {
          if (!email || validateEmail(email)) {
            onSubmit({ email });
          } else {
            setError('Not a valid email')
          }
        }}
      >Save User</ButtonWithCancel>
    </form>
  )
}

const mapStoresToProps = ({ flowStore, uiStore }) => ({
  setError: flowStore.setError,
  primaryColor: uiStore.primaryColor
})

export default injector(mapStoresToProps)(UserForm);