import React, { useState } from 'react';
import './input.css';
import HelpTip from '../helpTip/HelpTip';
import CancelSVG from '../../../assets/cancel.svg';
import RegenerateSVG from '../../../assets/cached.svg';
import VisibilitySVG from '../../../assets/visibility.svg';
import VisibilityOffSVG from '../../../assets/visibility_off.svg';

const Input = ({
  placeholder,
  value,
  onChange,
  className,
  containerClassName = '',
  autoFocus,
  readOnly,
  children,
  type,
}) => {
  return (
    <div className={`InputContainer ${containerClassName}`}>
      {value.length > 0 && <p className="floatingLabel">{placeholder}</p>}
      <input
        className={className}
        type={type || 'text'}
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
          <div style={{ height: 18, marginRight: 5 }} onClick={onClear}>
            <img height="18" src={CancelSVG} alt="cancel" />
          </div>
        </div>
      )}
    </Input>
  );
};

export const PasswordInput = ({ onShow, onRegenerate, ...props }) => {
  const [show, setShow] = useState(false);
  return (
    <Input
      className="PasswordInput"
      {...props}
      type={show ? 'text' : 'password'}
    >
      <div
        className="InputRightSubcontainer"
        style={{ width: 'auto !important' }}
      >
        <div
          style={{ height: 22, marginRight: 8, cursor: 'pointer' }}
          onClick={onRegenerate}
        >
          <img height="22" src={RegenerateSVG} alt="regenerate" />
        </div>
        <div
          style={{ height: 22, marginRight: 12, cursor: 'pointer' }}
          onClick={() => setShow(!show)}
        >
          <img
            height="22"
            src={show ? VisibilityOffSVG : VisibilitySVG}
            alt="visibility"
          />
        </div>
      </div>
    </Input>
  );
};
