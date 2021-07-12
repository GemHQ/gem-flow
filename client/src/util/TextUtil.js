import dateformat from 'dateformat';

export const formatDate = (rawDateString) => {
  try {
    const date = new Date(rawDateString);
    return dateformat(date, 'mmm dd, yyyy H:MM');
  } catch (e) {
    return '';
  }
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

export const formatLocalCurrencyAmount = (amount, localCurrency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: localCurrency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatAmount = (amount) => {
  let amountString = amount.toString();
  if (amountString.includes('-')) {
    const hIndex = amountString.split('-');
    const exp = hIndex[1];
    if (exp) {
      amountString = amount.toFixed(exp);
    }
  }
  return amountString;
};
