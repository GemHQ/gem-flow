import passportDoc from '../../../assets/exampleImageSeeds/passport.json';

export const createMockPhoneNumber = () => {
  const rand = Math.random().toString();
  return `+1323${rand.split('.').join('').substr(0, 7)}`;
}

const mockEmail = (firstName, domain) => {
  const rand = (Math.random() * 1000).toFixed(7).replace(/\D/g, '');
  return `${firstName}${rand}@${domain}`;
}

const mockPhotoIdDoc = {
  files: passportDoc,
  type: 'passport',
  description: 'My passport',
}

const mockProfiles = [{
  firstName: 'Jean-Luc',
  lastName: 'Picard',
  email: mockEmail('jeanluc', 'starfleet.org'),
  dateOfBirth: '07-13-1980',
  ssn: '948-38-0021',
  addressLine1: '123 Enterprise St.',
  addressLine2: '',
  postalCode: '94016',
  city: 'San Fransisco',
  state: 'CA',
  country: 'US',
  document: mockPhotoIdDoc
},
{
  firstName: 'Samwise',
  lastName: 'Gamgee',
  email: mockEmail('samwise', '@theshire.com'),
  dateOfBirth: '04-06-1986',
  ssn: '548-29-0927',
  addressLine1: '123 Hobbiton St.',
  addressLine2: '',
  postalCode: '97035',
  city: 'Portland',
  state: 'OR',
  country: 'US',
  document: mockPhotoIdDoc
},
{
  firstName: 'Obi-Wan',
  lastName: 'Kenobi',
  email: mockEmail('obiwan', 'jedi.org'),
  dateOfBirth: '01-12-1953',
  ssn: '123-45-4321',
  addressLine1: '21 Tatooine Rd.',
  addressLine2: '',
  postalCode: '84532',
  city: 'Moab',
  state: 'UT',
  country: 'US',
  document: mockPhotoIdDoc
}];

export default mockProfiles;