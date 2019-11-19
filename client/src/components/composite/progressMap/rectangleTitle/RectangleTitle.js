import React from 'react';
import './rectangleTitle.css';
import { observer } from 'mobx-react';

const RectangleTitle = ({ title, subtitle, color, isCurrentScreen, isCompleted, onClick }) => {
  let boxStyle = {  border: `2px solid #D9D9D9` };
  let titleStyle = { color: '#D9D9D9' };
  if (isCurrentScreen) {
    boxStyle = {  border: `2px solid ${color}` };
    titleStyle = { color };
  } else if (isCompleted) {
    boxStyle = {  backgroundColor: `#EEF1F4` };
    titleStyle = { color: '#424242' };
  }

  return (
    <div className="RectangleTitleContainer">
      <div className="TitleBox" style={boxStyle} onClick={onClick}>
        <p style={titleStyle}>{title}</p>
      </div>
      <p className="RectangleSubtitle">{subtitle}</p>
    </div>
  )
};

export default observer(RectangleTitle);