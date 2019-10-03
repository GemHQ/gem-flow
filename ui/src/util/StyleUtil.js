import hexToRgba from 'hex-to-rgba';

export const bkgColorWithShadow = (backgroundColor) => ({
  backgroundColor,
  boxShadow: `0rem 6px 8px 0 ${hexToRgba(backgroundColor, 0.4)}`
});