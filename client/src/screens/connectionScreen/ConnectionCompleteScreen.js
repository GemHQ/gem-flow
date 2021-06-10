import React, { useEffect } from 'react';
import CheckCircle from '../../assets/check_circle.svg';
import { ScreenNames } from '../../stores/Constants';
import { withUiStore } from '../../stores/StoresUtil';

const ConnectionCompleteScreen = ({ uiStore }) => {
  useEffect(() => {
    setTimeout(() => uiStore.setCurrentScreen(ScreenNames.HISTORY), 2000);
  }, []);
  return (
    <div className="screen-container no-border">
      <div className="center">
        <img className="connection-success" alt="Success" src={CheckCircle} />
        <h2>Connection Complete!</h2>
      </div>
    </div>
  );
};

export default withUiStore(ConnectionCompleteScreen);
