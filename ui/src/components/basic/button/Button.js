import React from 'react';
import './button.css';
import { bkgColorWithShadow } from '../../../util/StyleUtil'

const Button = ({
  disabled,
  onClick,
  backgroundColor,
  marginRight,
  children
}) => (
  <button
    className={marginRight ? 'ButtonRightMargin' : ''}
    type="submit" 
    disabled={disabled} 
    onSubmit={e => {
      e.preventDefault();
      onClick();
    }}
    style={bkgColorWithShadow(backgroundColor)}>{children}</button>
);

export default Button;

export const BorderedButton = ({
  disabled,
  onClick,
  color,
  children
}) => (
  <button type="submit" disabled={disabled} onSubmit={onClick} style={{ 
    color,
    border: `2px solid ${color}`,
    height: '40px'
  }}>{children}</button>
);

export const ButtonWithCancel = ({
  onCancel,
  ...props
}) => (
  <div className="FlexAlignCenter FlexEnd">
    <p className="Cancel">Cancel</p>
    <Button {...props}/>
  </div>
)