import React from 'react';
import './input.css';

const Input = ({
  placeholder,
  value,
  onChange
}) => {

  return (
    <div className="InputContainer">
      {value.length > 0 && <p className="floatingLabel">{placeholder}</p>}
      <input type="text" value={value} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default Input;