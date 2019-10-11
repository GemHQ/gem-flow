import React from 'react';
import './titleAndValue.css';

const TitleAndValue = ({ title, value, maxWidth, maxHeight, greyValue, boldValue, greyTitle, thinTitle, smallTitle }) => (
  <div className="TitleAndValueContainer" style={{ maxWidth, maxHeight }}>
    {
      typeof title === 'string' 
      ? <h3 className={`${greyTitle ? 'GreyText' : ''} ${thinTitle ? 'ThinText' : ''} ${smallTitle ? 'SmallText' : ''}`}>{title}</h3> 
      : title
    }
    {
      typeof value === 'string' 
      ? <p className={`${greyValue ? 'GreyText' : ''} ${boldValue ? 'BoldText' : ''}`}>{value}</p> 
      : value
    }
  </div>
);

export default TitleAndValue;