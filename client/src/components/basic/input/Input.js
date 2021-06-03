import React from 'react';
import './input.css';
import HelpTip from '../helpTip/HelpTip';

const Input = ({
  placeholder,
  value,
  onChange,
  className,
  containerClassName = '',
  autoFocus,
  readOnly,
  children,
}) => {
  return (
    <div className={`InputContainer ${containerClassName}`}>
      {value.length > 0 && <p className="floatingLabel">{placeholder}</p>}
      <input
        className={className}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoFocus={autoFocus}
        readOnly={readOnly}
      />
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

export const ClearableInput = ({ onClear, ...props }) => {
  return (
    <Input className="ClearableInput" {...props}>
      {Boolean(props.value) && (
        <div className="InputRightSubcontainer">
          <div onClick={onClear}>X</div>
        </div>
      )}
    </Input>
  );
};
