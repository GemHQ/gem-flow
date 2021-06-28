import React, { useEffect, useState } from 'react';
import CheckCircle from '../../assets/check_circle.svg';
import ErrorMessage from '../../components/basic/errorMessage/ErrorMessage';
import { ScreenNames } from '../../stores/Constants';
import { withStores } from '../../stores/StoresUtil';

const ScreenStates = {
  DEFAULT: 'default',
  SUCCESS: 'success',
  ERROR: 'error',
};

const ConnectionCompleteScreen = ({ uiStore, dataStore }) => {
  const [currentScreenState, setCurrentScreenState] = useState(
    ScreenStates.DEFAULT
  );
  const createCredentialWithCode = async () => {
    let isLoading = false;
    const interval = setInterval(async () => {
      try {
        if (dataStore.client && !isLoading) {
          isLoading = true;
          let params = new URL(document.location).searchParams;
          let coinbaseCode = params.get('code');
          console.log('coinbase code:', coinbaseCode);
          await dataStore.createCredentialWithOAuthCode(coinbaseCode);
          setCurrentScreenState(ScreenStates.SUCCESS);
          setTimeout(() => uiStore.setCurrentScreen(ScreenNames.ACCOUNT), 1000);
          clearInterval(interval);
        }
      } catch (e) {
        setCurrentScreenState(ScreenStates.ERROR);
      }
    }, 200);
  };
  useEffect(() => {
    createCredentialWithCode();
  }, []);

  if (currentScreenState === ScreenStates.SUCCESS) {
    return (
      <div className="screen-container no-border">
        <div className="center">
          <img className="connection-success" alt="Success" src={CheckCircle} />
          <h2>Connection Complete!</h2>
        </div>
      </div>
    );
  }

  if (currentScreenState === ScreenStates.ERROR) {
    return (
      <>
        <ErrorMessage />
        <div className="screen-container no-border">
          <div className="center">
            <h2
              className="Underline Pointer"
              onClick={() => {
                uiStore.setCurrentScreen(ScreenNames.CREDENTIALS);
              }}
            >
              Try again
            </h2>
          </div>
        </div>
      </>
    );
  }

  return <h1>Loading...</h1>;
};

export default withStores(ConnectionCompleteScreen);
