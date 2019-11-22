import React, { useEffect } from 'react';
import { httpPost } from '../util/RequestUtil';
import { Endpoints } from '../stores/Constants';

/**
 * Receive an event/message from the child iframe.
 */
const receiveChildMessage = event => {
  try {
    const [msg, data] = event.data.split(':');
    console.log(event.data)

    switch (msg) {
      case 'LINK_CREDENTIAL_ID':
        // TODO: link creds
        console.log('Link Credentials', data);
        httpPost(Endpoints.CONNECTIONS, {

        });
        break;
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
    window.addEventListener('message', props.receiveCredentials, false);

    return () => {
      window.removeEventListener('message');
    };
  }, [window, props.receiveCredentials]);

  return (
    <iframe
      src={`http://localhost:3300?institution=${props.institutionId}`}
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
    />
  );
};
