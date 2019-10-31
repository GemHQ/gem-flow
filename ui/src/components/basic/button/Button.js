import React from 'react';
import './button.css';
import { bkgColorWithShadow } from '../../../util/StyleUtil'
import { withPrimaryColor } from '../../../stores/StoresUtil';

export const Button = ({
  disabled,
  onClick,
  primaryColor,
  marginRight,
  type,
  children
}) => (
  <button
    className={marginRight ? 'ButtonRightMargin' : ''}
    type={type || "submit"} 
    disabled={disabled} 
    onClick={onClick}
    style={bkgColorWithShadow(primaryColor)}>{children}</button>
);

export default withPrimaryColor(Button);

export const BorderedButton = ({
  disabled,
  onClick,
  color,
  children
}) => (
  <button className="BorderedButton" type="button" disabled={disabled} onClick={onClick} style={{ 
    color,
    border: `2px solid ${color}`,
  }}>{children}</button>
);

export const ButtonWithCancel = ({
  onCancel,
  ...props
}) => (
  <div className="FlexAlignCenter FlexEnd">
    <p className="Cancel" onClick={onCancel}>Cancel</p>
    <Button {...props}/>
  </div>
);
