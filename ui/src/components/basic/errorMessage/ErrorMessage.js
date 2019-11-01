import React from 'react';
import { injector } from '../../../stores/StoresUtil';
import './errorMessage.css';

export const ErrorMessage = ({ errorMessage = 'error', dismissError }) => {
  console.log('error hi', errorMessage)
  if (!errorMessage) return null;
  return (
    <div className="ErrorMessageContainer">
      <p className="ErrorMessage">{errorMessage.toString()}</p>
      <p className="Dismiss" onClick={dismissError}>Dismiss</p>
    </div>
  );
}

const mapStoresToProps = ({ flowStore }) => ({ errorMessage: flowStore.errorMessage, dismissError: flowStore.clearError });

export default injector(mapStoresToProps)(ErrorMessage);