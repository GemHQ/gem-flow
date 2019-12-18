export const filterPaymentInstitutions = connections =>
  connections.filter(connection => connection.institution_id !== 'wyre');
