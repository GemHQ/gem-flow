import { InstitutionIds } from "../stores/Constants";

export const filterPaymentInstitutions = connections =>
  connections.filter(connection => connection.institution_id !== InstitutionIds.WYRE);
