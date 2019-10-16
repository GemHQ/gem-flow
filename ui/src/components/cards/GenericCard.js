import React from 'react';
import './cards.css';
import TitleAndValue from '../basic/titleAndValue/TitleAndValue';
import ThreeDots from '../basic/threeDots/ThreeDots';
import Button from '../basic/button/Button';

const GenericCard = ({ titlesAndValues, onButtonClick, buttonText, primaryColor, dotsMenuOptions }) => (
  <div className="Card">
    <div className="FlexAlignCenter">
      {titlesAndValues.map(({ title, value }) => <TitleAndValue key={title} title={title} value={value} greyTitle smallTitle boldValue rightPadding/>)}
    </div>
    <div className="FlexAlignCenter">
      <Button onClick={onButtonClick} backgroundColor={primaryColor} marginRight>{buttonText}</Button>
      <ThreeDots menuOptions={dotsMenuOptions} />
    </div>
  </div>
);

export default GenericCard;