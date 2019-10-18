import hexToRgba from 'hex-to-rgba';

export const bkgColorWithShadow = (backgroundColor, blur = '0rem 6px 8px 0') => ({
  backgroundColor,
  boxShadow: `${blur} ${hexToRgba(backgroundColor, 0.4)}`
});