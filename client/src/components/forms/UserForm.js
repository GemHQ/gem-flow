import React, { useState } from 'react';
import generatePassword from 'generate-password';
import TitleAndValue from '../basic/titleAndValue/TitleAndValue';
import { PasswordInput } from '../basic/input/Input';
import { ButtonWithCancel } from '../basic/button/Button';
import { injector } from '../../stores/StoresUtil';
const description = `Create a password for your new user`;

export const UserForm = ({ onCancel, onSubmit, primaryColor, setError }) => {
  const [password, setPassword] = useState(
    generatePassword.generate({ length: 16 })
  );

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <TitleAndValue title="Enter Password" value={description} />
      <PasswordInput
        placeholder="Password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        onRegenerate={() =>
          setPassword(generatePassword.generate({ length: 16 }))
        }
        autoFocus
      />
      <ButtonWithCancel
        primaryColor={primaryColor}
        onCancel={onCancel}
        onClick={() => {
          if (password.length > 12) {
            onSubmit({ password });
          } else {
            setError('Password must be more than 12 characters long.');
          }
        }}
      >
        Save User
      </ButtonWithCancel>
    </form>
  );
};

const mapStoresToProps = ({ dataStore, uiStore }) => ({
  setError: dataStore.setError,
  primaryColor: uiStore.primaryColor,
});

export default injector(mapStoresToProps)(UserForm);
