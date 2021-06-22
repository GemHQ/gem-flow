import React, { useState } from 'react';
import './cards.css';
import TitleAndValue from '../basic/titleAndValue/TitleAndValue';
import ThreeDots from '../basic/threeDots/ThreeDots';
import Button, { BorderedButton } from '../basic/button/Button';

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
  hideButton,
  borderedButton,
}) => {
  const [iconSrc, setIconSrc] = useState(iconUrl);
  return (
    <div className="Card">
      <div className="FlexAlignCenter">
        {iconUrl && (
          <img
            src={iconSrc}
            className="AccountIcon"
            onError={() =>
              setIconSrc(
                `https://gem-widgets-assets.s3-us-west-2.amazonaws.com/currencies/crypto/btc.svg`
              )
            }
          />
        )}
        {titlesAndValues.map(({ title, value }) => (
          <TitleAndValue
            key={title}
            title={title}
            value={value || '-'}
            greyTitle
            smallTitle
            boldValue
            rightPadding
          />
        ))}
      </div>
      {!hideButton && (
        <div className="FlexAlignCenter">
          <div className="ColumnCenter">
            {borderedButton ? (
              <BorderedButton
                onClick={onButtonClick}
                primaryColor={primaryColor}
                disabled={disabled}
                marginRight
              >
                {buttonText}
              </BorderedButton>
            ) : (
              <Button
                onClick={onButtonClick}
                primaryColor={primaryColor}
                disabled={disabled}
                marginRight
              >
                {buttonText}
              </Button>
            )}
            {viewText && onViewClick && (
              <UnderButton onClick={onViewClick} primaryColor={primaryColor}>
                {viewText}
              </UnderButton>
            )}
          </div>
          {dots && <ThreeDots menuOptions={dotsMenuOptions} />}
        </div>
      )}
    </div>
  );
};

const UnderButton = ({ primaryColor, onClick, children }) => (
  <p
    className="SmallText ExtraBold Pointer"
    style={{ color: primaryColor, marginTop: '4px' }}
    onClick={onClick}
  >
    {children}
  </p>
);

export default GenericCard;
