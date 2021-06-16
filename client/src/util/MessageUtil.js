const URL = '*';

const data = {
  exchangeId: '',
  customerId: '',
  txnId: '',
};

export const setMessageSharedData = (newData) => {
  data.exchangeId = newData.exchangeId;
  data.customerId = newData.customerId;
  data.txnId = newData.txnId;
};

export const sendContinueMessage = () => {
  // console.log('sending continue message', window.frames[0]);
  const frame = document.getElementById('inuit-connect');
  frame.contentWindow.postMessage(
    JSON.stringify({ eventType: 'continue', ...data }),
    URL
  );
};

export const sendCloseMessage = () => {
  const frame = document.getElementById('inuit-connect');
  frame.contentWindow.postMessage(
    JSON.stringify({ eventType: 'close', ...data }),
    URL
  );
};
