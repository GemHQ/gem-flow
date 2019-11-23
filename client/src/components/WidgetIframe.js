import React, { useEffect } from 'react';

export default props => {
  console.log(props);
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
