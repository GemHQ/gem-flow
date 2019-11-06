import isEmail from 'isemail';

export const validateEmail = email => isEmail.validate(email);

export const trimmed = length => str =>
  str.substring(0, length);

export const stringHasLength = str => str.length > 0;

export const onlyNumbers = str => str.replace(/\D/g, '');

export const onlyAlpha = str => str.replace(/[^a-zA-Z]+/g, '');

export const withSSNDashes = str => {
  const firstPart = str.substring(0, 3);
  if (str.length < 4) {
    return firstPart;
  }
  const secondPart = str.substring(3, 5);
  if (str.length < 6) {
    return `${firstPart}-${secondPart}`;
  }
  const thirdPart = trimmed(4)(str.substring(5));
  return `${firstPart}-${secondPart}-${thirdPart}`;
};

export const withDateSpacing = str => {
  const firstPart = str
    .substring(0, 4)
    .replace(/(\d{2})/g, '$1 ')
    .trim();
  if (str.length < 5) {
    return firstPart;
  }
  const secondPart = trimmed(4)(str.substring(4));
  return `${firstPart} ${secondPart}`;
};

export const toDateSpacedString = str =>
  withDateSpacing(onlyNumbers(str));

export const toSSNDashedString = str =>
  withSSNDashes(onlyNumbers(str));

export const twoUpperAlphas = str =>
  trimmed(2)(onlyAlpha(str)).toUpperCase();

  export const isUsStateCode = str => {
    return str.length === 2 && usStateCodes.includes(str);
  };
  
  export const usStateCodes = [
    'AL',
    'AK',
    'AS',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'DC',
    'FM',
    'FL',
    'GA',
    'GU',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MH',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'MP',
    'OH',
    'OK',
    'OR',
    'PW',
    'PA',
    'PR',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VI',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
  ];
  