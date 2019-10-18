import React from 'react';
import './input.css';
import HelpTip from '../helpTip/HelpTip';

const Input = ({
  placeholder,
  value,
  onChange,
  className,
  autoFocus,
  children,
}) => {

  return (
    <div className="InputContainer">
      {value.length > 0 && <p className="floatingLabel">{placeholder}</p>}
      <input className={className} type="text" value={value} placeholder={placeholder} onChange={onChange} autoFocus={autoFocus} />
      {children}
    </div>
  );
};

export default Input;

export const TipInput = ({ tipText, ...props }) => {
  return (
    <Input className="TipInput" {...props}>
      <div className="InputRightSubcontainer">
        <HelpTip text={tipText} />
      </div>
    </Input>
  );
};