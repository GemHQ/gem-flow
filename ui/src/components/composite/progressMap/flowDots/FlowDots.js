import React from 'react';
import { observer } from 'mobx-react';
import './flowDots.css';
import { bkgColorWithShadow } from '../../../../util/StyleUtil';

const FlowDots = ({ dots, activeMarker, primaryColor }) => (
  <div className="DotsContainer">
    {
      dots.map(([marker, isFilled], i) => <Dot isActive={marker === activeMarker} isFilled={isFilled} primaryColor={primaryColor} key={marker} isFirstDot={i === 0} />)
    }
  </div>
);

const Dot = ({ isActive, isFilled, primaryColor, isFirstDot }) => {
  const background = isFilled ? bkgColorWithShadow(primaryColor, '0 0 4px 2px') : { backgroundColor: 'white '};
  return (
    <>
      {!isFirstDot && <div className="FlowLine" style={{ borderBottom: `2px solid ${isFilled || isActive ? primaryColor : '#D9D9D9' }`}} />}
      <div className="FlowDot" style={{ 
        ...background,
        border: `2px solid ${isFilled || isActive ? primaryColor : '#D9D9D9'}`
      }} />
    </>
)};

export default observer(FlowDots);