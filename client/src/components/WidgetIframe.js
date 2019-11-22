import React, { useEffect } from 'react';

/**
 * Receive an event/message from the child iframe.
 */
const receiveChildMessage = event => {
  try {
    const [msg, data] = event.data.split(':');

    switch (msg) {
      case 'LINK_CONNECTION_ID':
        // TODO: link creds
        console.log('Link Credentials', data);
      default:
        console.warn('Unknown child message received:', msg);
        return;
    }
  } catch (e) {
    console.error(e);
  }
};

export default props => {
  console.log(props)
  useEffect(() => {
    window.addEventListener('message', receiveChildMessage, false);

    return () => {
      window.removeEventListener('message');
    };
  }, [window, receiveChildMessage]);

  return (
    <iframe
      src={`http://localhost:3300?institution=${props.institutionId}`}
      allowfullscreen="true"
      allowtransparency="true"
      frameBorder="0"
      style={{
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100%',
        zIndex: 1,
      }}
      {...props}
    />
  );
};
