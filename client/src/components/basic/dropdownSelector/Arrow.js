import React from 'react';

const BackIcon = ({
  size = '100%',
  fill = '#D9D9D9',
  rotate = 0,
}) => (
  <svg viewBox="0 0 4.46 8.04" height={size}>
    <g transform={`rotate(${rotate}, 2.23, 4.02)`}>
      <path
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.96.5L.5 4.04l3.46 3.5"
      />
    </g>
  </svg>
);

const Arrow = ({
  fill = '#D9D9D9',
  direction = 270,
  height = '12px',
}) => (
  <div
    className="FlexCenter"
    style={{
      height,
      width: height,
      transform: `rotate(${direction}deg)`,
    }}
  >
    <BackIcon fill={fill} />
  </div>
);

export const UpArrow = () => <Arrow direction={90} />

export const DownArrow = () => <Arrow direction={270} />

export default Arrow;
