import dateformat from 'dateformat';

export const formatDate = (rawDateString) => {
  const date = new Date(rawDateString);
  return dateformat(date, 'mmm dd, yyyy H:MM');
};

export const capitalizeFirstLetter = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const formatTrxDay = (rawDateString) => {
  const date = new Date(rawDateString);
  return dateformat(date, 'yyyy-mm-dd');
};

export const formatTrxTime = (rawDateString) => {
  const date = new Date(rawDateString);
  return dateformat(date, 'HH:MM:ss');
};
