import React, { useEffect } from 'react';
import CheckCircle from '../../assets/check_circle.svg';
import { ScreenNames } from '../../stores/Constants';
import { withStores, withUiStore } from '../../stores/StoresUtil';

const ConnectionCompleteScreen = ({ uiStore, dataStore }) => {
  // const [isPosting, setIsPosting] = useState(false);
  const createCredentialWithCode = async () => {
    const interval = setInterval(async () => {
      try {
        if (dataStore.client) {
          let params = new URL(document.location).searchParams;
          let coinbaseCode = params.get('code');
          console.log('coinbase code:', coinbaseCode);
          await dataStore.createCredentialWithOAuthCode(coinbaseCode);
          setTimeout(() => uiStore.setCurrentScreen(ScreenNames.ACCOUNT), 0);
          clearInterval(interval);
        }
      } catch (e) {}
    }, 1000);

    // try {
    //   let params = new URL(document.location).searchParams;
    //   let coinbaseCode = params.get('code');
    //   console.log('coinbase code:', coinbaseCode);
    //   await dataStore.createCredentialWithOAuthCode(coinbaseCode);
    //   setTimeout(() => uiStore.setCurrentScreen(ScreenNames.ACCOUNT), 0);
    // } catch (e) {}
  };
  useEffect(() => {
    createCredentialWithCode();
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

export default withStores(ConnectionCompleteScreen);
