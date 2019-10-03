import React from 'react';
import './button.css';
import { bkgColorWithShadow } from '../../../util/StyleUtil'

const Button = ({
  disabled,
  onClick,
  backgroundColor,
  children
}) => (
  <button type="submit" disabled={disabled} onSubmit={onClick} style={bkgColorWithShadow(backgroundColor)}>{children}</button>
);

export default Button;