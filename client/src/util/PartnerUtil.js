export const getOauthCode = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get('code');
  if (code) {
    window.history.replaceState(null, null, window.location.pathname);
    console.log('Coinbase code:', code);
  }
  return code;
};

export const filterPaymentInstitutions = connections =>
  connections.filter(connection => connection.institution_id !== 'wyre');
