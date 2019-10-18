import React from 'react';
import { observer } from 'mobx-react';
import './flowDots.css';
import { bkgColorWithShadow } from '../../../../util/StyleUtil';

const FlowDots = ({ dots, primaryColor, currentScreenIndex }) => (
  <div className="DotsContainer">
    {
      dots.map(([marker, isFilled], i) => <Dot 
        isFilled={isFilled} 
        primaryColor={primaryColor} 
        key={marker} 
        isFirstDot={i === 0} 
        hasColoredLine={currentScreenIndex >= i}
      />)
    }
  </div>
);

const Dot = ({ isFilled, primaryColor, isFirstDot, hasColoredLine }) => {
  const background = isFilled ? bkgColorWithShadow(hasColoredLine ? primaryColor : '#D9D9D9', '0 0 4px 2px') : { backgroundColor: 'white '};
  return (
    <>
      {!isFirstDot && <div className="FlowLine" style={{ borderBottom: `2px solid ${hasColoredLine ? primaryColor : '#D9D9D9' }`}} />}
      <div className="FlowDot" style={{ 
        ...background,
        border: `2px solid ${hasColoredLine ? primaryColor : '#D9D9D9'}`
      }} />
    </>
)};

export default observer(FlowDots);