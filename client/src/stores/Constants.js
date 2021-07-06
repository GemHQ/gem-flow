export const ScreenNames = {
  USER: '/user',
  PROFILE: '/profile',
  CONNECTION: '/connection',
  CONNECTION_COMPLETE: '/oauth/coinbase/callback',
  CREDENTIALS: '/credentials',
  ACCOUNT: '/account',
  TRANSACTION: '/transaction',
  HISTORY: '/history',
};

export const ScreenTitles = {
  [ScreenNames.USER]: 'User',
  [ScreenNames.CREDENTIALS]: 'Credential',
  [ScreenNames.ACCOUNT]: 'Account',
  [ScreenNames.HISTORY]: 'History',
};

export const FlowIds = {
  ONRAMP: 'Onramp',
  TRANSFER: 'Transfer',
  CONNECT: 'Connect',
};

export const Flows = {
  [FlowIds.ONRAMP]: {
    id: 'Onramp',
    dropdownTitle: 'Onramp',
    primaryColor: '#9C27B0',
    colorClassname: 'OnrampColor',
    screens: [
      ScreenNames.USER,
      ScreenNames.PROFILE,
      ScreenNames.CONNECTION,
      ScreenNames.ACCOUNT,
      ScreenNames.TRANSACTION,
    ],
  },
  [FlowIds.TRANSFER]: {
    id: 'Transfer',
    dropdownTitle: 'Transfer',
    primaryColor: '#478FCC',
    colorClassname: 'TransferColor',
    screens: [
      ScreenNames.USER,
      ScreenNames.CONNECTION,
      ScreenNames.ACCOUNT,
      ScreenNames.TRANSACTION,
    ],
  },
  [FlowIds.CONNECT]: {
    id: 'Connect',
    dropdownTitle: 'Connect',
    // primaryColor: '#C0CA33',
    primaryColor: '#478FCC',
    colorClassname: 'ConnectColor',
    screens: [
      ScreenNames.USER,
      ScreenNames.CREDENTIALS,
      ScreenNames.ACCOUNT,
      ScreenNames.HISTORY,
    ],
  },
};

export const Endpoints = {
  USER: '/user',
  PROFILE: '/profile',
  PROFILE_DOCUMENT: '/profile/document',
  INSTITUTION: '/institution',
  INSTITUTION_USER: '/institution/user',
  CONNECTIONS: '/connections',
  CREDENTIALS: '/credentials',
  ACCOUNT: '/account',
  TRANSACTION: '/transaction',
};
