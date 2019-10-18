import React from 'react';
import './divider.css';

const Divider = ({ marginTop, marginBottom }) => {
  const style = {};
  if (marginTop) style.marginTop = '40px';
  if (marginBottom) style.marginBottom = '40px';
  return (
    <div className="Divider" style={style} />
)};

export default Divider;