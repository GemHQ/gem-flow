export const Flows = {
  Onramp: {
    id: 'Onramp',
    dropdownTitle: 'Onramp (Gem API)',
    primaryColor: '#9C27B0',
    colorClassname: 'OnrampColor',
    screens: [
      'User', 
      'Profile',
      'Connection',
      'Account',
      'Transaction'
    ]
  },
  Connect: {
    id: 'Connect',
    dropdownTitle: 'Connect',
    primaryColor: '#C0CA33',
    colorClassname: 'ConnectColor',
    screens: [
      'User', 
      'Connection',
      'Account',
    ],
  },
  Transfer: {
    id: 'Transfer',
    dropdownTitle: 'Transfer',
    primaryColor: '#478FCC',
    colorClassname: 'TransferColor',
    screens: [
      'User', 
      'Connection',
      'Account',
      'Transaction'
    ]
  }
};

