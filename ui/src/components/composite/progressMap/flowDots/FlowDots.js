import React from 'react';
import { observer } from 'mobx-react';
import './flowDots.css';

const FlowDots = ({ dots, activeMarker, primaryColor }) => (
  <div className="DotsContainer">
    {
      dots.map(([marker, isFilled], i) => <Dot isActive={marker === activeMarker} isFilled={isFilled} primaryColor={primaryColor} key={marker} isFirstDot={i === 0} />)
    }
  </div>
);

const Dot = ({ isActive, isFilled, primaryColor, isFirstDot }) => (
  <>
    {!isFirstDot && <div className="FlowLine" style={{ borderBottom: `2px solid ${isFilled || isActive ? primaryColor : '#D9D9D9' }`}} />}
    <div className="FlowDot" style={{ 
      backgroundColor: isFilled ? primaryColor : 'white',
      border: `2px solid ${isFilled || isActive ? primaryColor : '#D9D9D9'}`
    }} />
  </>
);

export default observer(FlowDots);