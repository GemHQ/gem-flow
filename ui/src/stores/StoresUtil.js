import { inject, observer } from 'mobx-react';
import { Flows } from './Constants';

export const injector = mapStoresToProps => Cmp => inject(mapStoresToProps)(observer(Cmp));

// default to Onramp color is not in Provider context (for storybook)
export const withPrimaryColor = (Cmp) => injector(({ uiStore }) => ({ 
  primaryColor: uiStore ? uiStore.primaryColor : Flows.Onramp.primaryColor
}))(Cmp);

export const withFlowStore = (Cmp) => injector(({ flowStore }) => ({ flowStore }))(Cmp);

export const withStores = (Cmp) => injector(stores => stores)(Cmp);

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

export const formatConnectionRequestBody = (profileId, institutionUser) => ({
  "profile_id": profileId,
  "institution_id": institutionUser.institution_id,
  "business_account_id": institutionUser.businessAccountId
})