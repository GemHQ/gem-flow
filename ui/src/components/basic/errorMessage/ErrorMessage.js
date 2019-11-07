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

// fallback flowStore object for storybook
const storybookFlowStore = { errorMessage: 'This is an error' };
const mapStoresToProps = ({ flowStore = storybookFlowStore }) => ({ errorMessage: flowStore.errorMessage, dismissError: flowStore.clearError });

export default injector(mapStoresToProps)(ErrorMessage);