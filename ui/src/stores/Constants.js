import wyreIcon from '../assets/wyre_icon.svg';
import coinifyIcon from '../assets/coinify_icon.svg';


export const ScreenNames = {
  USER: 'User',
  PROFILE: 'Profile',
  CONNECTION: 'Connection',
  ACCOUNT: 'Account',
  TRANSACTION: 'Transaction'
};

export const Flows = {
  Onramp: {
    id: 'Onramp',
    dropdownTitle: 'Onramp (Gem API)',
    primaryColor: '#9C27B0',
    colorClassname: 'OnrampColor',
    screens: [
      ScreenNames.USER, 
      ScreenNames.PROFILE,
      ScreenNames.CONNECTION,
      ScreenNames.ACCOUNT,
      ScreenNames.TRANSACTION
    ]
  },
  Connect: {
    id: 'Connect',
    dropdownTitle: 'Connect',
    primaryColor: '#C0CA33',
    colorClassname: 'ConnectColor',
    screens: [
      ScreenNames.USER, 
      ScreenNames.CONNECTION,
      ScreenNames.ACCOUNT,
    ],
  },
  Transfer: {
    id: 'Transfer',
    dropdownTitle: 'Transfer',
    primaryColor: '#478FCC',
    colorClassname: 'TransferColor',
    screens: [
      ScreenNames.USER, 
      ScreenNames.CONNECTION,
      ScreenNames.ACCOUNT,
      ScreenNames.TRANSACTION
    ]
  }
};

export const Endpoints = {
  USER: '/user',
  PROFILE: '/profile',
  PROFILE_DOCUMENT: '/profile/document',
  INSTITUTION: '/institution',
  INSTITUTION_USER: '/institution/user',
  CONNECTIONS: '/connections',
  ACCOUNT: '/account',
  TRANSACTION: '/transaction'
}

export const InstitutionIcons = {
  wyre: wyreIcon,
  coinify: coinifyIcon,
}