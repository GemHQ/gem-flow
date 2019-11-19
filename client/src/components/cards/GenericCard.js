import React from 'react';
import './cards.css';
import TitleAndValue from '../basic/titleAndValue/TitleAndValue';
import ThreeDots from '../basic/threeDots/ThreeDots';
import Button from '../basic/button/Button';

const GenericCard = ({ 
  titlesAndValues, 
  onButtonClick, 
  buttonText, 
  onViewClick, 
  viewText,
  primaryColor, 
  dotsMenuOptions, 
  disabled, 
  dots = true,
  iconUrl,
}) => (
  <div className="Card">
    <div className="FlexAlignCenter">
      {iconUrl && <img src={iconUrl} className="AccountIcon" />}
      {titlesAndValues.map(({ title, value }) => <TitleAndValue key={title} title={title} value={value || '-'} greyTitle smallTitle boldValue rightPadding/>)}
    </div>
    <div className="FlexAlignCenter">
      <div className="ColumnCenter">
        <Button onClick={onButtonClick} primaryColor={primaryColor} disabled={disabled} marginRight>{buttonText}</Button> 
        {viewText && onViewClick && <UnderButton onClick={onViewClick} primaryColor={primaryColor}>{viewText}</UnderButton>}
      </div>
      {dots && <ThreeDots menuOptions={dotsMenuOptions} />}
    </div>
  </div>
);

const UnderButton = ({ primaryColor, onClick, children }) => (
  <p 
    className="SmallText ExtraBold Pointer" 
    style={{ color: primaryColor, marginTop: '4px' }}
    onClick={onClick}
  >{children}</p>
)

export default GenericCard;