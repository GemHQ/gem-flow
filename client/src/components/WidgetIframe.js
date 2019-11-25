import React, { useEffect } from 'react';

const WidgetIframe = ({ receiveCredentials, institutionId }) => {
  useEffect(() => {
    window.addEventListener('message', receiveCredentials, false);

    return () => {
      window.removeEventListener('message');
    };
  }, [window, props.receiveCredentials]);

  return (
    <iframe
      src={`http://localhost:3300?institution=${institutionId}&apiKey=${process.env.REACT_APP_GEM_API_KEY}`}
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
}

export default WidgetIframe;
