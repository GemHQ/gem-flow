import React, { useEffect } from 'react';
import './widgets.css';

const WidgetIframe = ({ receiveCredentials, institutionId }) => {
  useEffect(() => {
    window.addEventListener('message', receiveCredentials, false);

    return () => {
      window.removeEventListener('message');
    };
  }, [window, receiveCredentials]);

  return (
    <iframe
      src={`http://localhost:3300?institution=${institutionId}&apiKey=${process.env.REACT_APP_GEM_API_KEY}`}
      frameBorder="0"
      className="WidgetIframe"
    />
  );
}

export default WidgetIframe;
