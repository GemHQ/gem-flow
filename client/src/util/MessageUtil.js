const URL = '*';

const data = {
  exchangeId: 'exg123',
  cusromerId: 'cust123',
  txnId: 'txn123',
};

export const sendContinueMessage = () => {
  // console.log('sending continue message', window.frames[0]);
  const frame = document.getElementById('inuit-connect');
  frame.contentWindow.postMessage(
    JSON.stringify({ eventType: 'continue', ...data }),
    URL
  );
};

export const sendCloseMessage = () =>
  window.frames[0].postMessage(
    JSON.stringify({ eventType: 'close', ...data }),
    URL
  );
