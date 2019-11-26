export const formatProfileRequestBody = profile => ({
  "name": {
    "given_names": profile.firstName,
    "family_names": profile.lastName
  },
  "phone_number": profile.phoneNumber,
  "address": {
    "street_1":  profile.addressLine1,
    "street_2":  profile.addressLine2,
    "city":  profile.city,
    "state":  profile.state,
    "country":  profile.country,
    "postal_code":  profile.postalCode
  },
  "email_address":  profile.email,
  "social_security_number":  profile.ssn,
  "date_of_birth":  profile.dateOfBirth
});

export const formatInstitutionUserRequestBody = (profileId, institutionUser) => ({
  "profile_id": profileId,
  "institution_id": institutionUser.institution_id,
  "business_account_id": institutionUser.businessAccountId
});

export const formatCoinbaseCredentialRequest = oauthCode => ({
  "credential_type": 'oauth2',
  "institution_id": 'coinbase',
  "credential": {
    "code": oauthCode
  }
})

export const formatConnectionRequest = ({ credentialId, userId }) => ({
  "user_id": userId,
  "credential_id": credentialId
})