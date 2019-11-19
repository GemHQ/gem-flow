import React from 'react';
import { injector } from '../../../stores/StoresUtil';
import './errorMessage.css';

const ErrorMessage = ({ errorMessage, dismissError }) => {
  if (!errorMessage) return null;
  return (
    <div className="ErrorMessageContainer">
      <p className="ErrorMessage">{errorMessage.toString()}</p>
      <p className="Dismiss" onClick={dismissError}>Dismiss</p>
    </div>
  );
}

// fallback dataStore object for storybook
const storybookFlowStore = { errorMessage: 'This is an error' };
const mapStoresToProps = ({ dataStore = storybookFlowStore }) => ({ errorMessage: dataStore.errorMessage, dismissError: dataStore.clearError });

export default injector(mapStoresToProps)(ErrorMessage);