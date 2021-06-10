import React, { useEffect, useState } from 'react';
import { ClearableInput } from '../../components/basic/input/Input';
import ExchangeList from './ExchangeList';
import './credentials.scss';
import Button from '../../components/basic/button/Button';
import { sendContinueMessage, sendCloseMessage } from '../../util/MessageUtil';

const ScreenStates = {
  DEFAULT: 'default',
  ENTER_CREDENTIALS: 'enter-credentials',
  ERROR: 'error',
  TRANSFERRING: 'transferring',
};

const Titles = {
  [ScreenStates.DEFAULT]: `Let's Get a picture of your profits`,
  [ScreenStates.ENTER_CREDENTIALS]: `Enter credentials`,
  [ScreenStates.ERROR]: `Let's try again`,
  [ScreenStates.TRANSFERRING]: `Transferring you to Coinbase`,
};

const setIframeHeight = (height) => {
  const container = document.getElementById('iframe-container');
  container.style.height = height;
};

const CredentialsScreen = () => {
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [currentScreenState, setCurrentScreenState] = useState(
    ScreenStates.DEFAULT
  );
  const [exchangeSearchValue, setExchangeSearchValue] = useState('');

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.origin !== 'http://localhost:8080') return;
      const data = JSON.parse(event.data);
      setIframeHeight(data.height);
      if (data.eventType === 'form-ready') {
        console.log('Form Ready!');
      }
      if (data.eventType === 'connection-error') {
        console.log('Connection Error!');
        setCurrentScreenState(ScreenStates.ERROR);
      }
    });
  }, []);

  if (currentScreenState === ScreenStates.TRANSFERRING) {
    return (
      <div className="screen-container no-border">
        <div className="center">
          <h1>{Titles[currentScreenState]}</h1>
          <div className="loading-container">
            <div className="lds-dual-ring" />
            <img
              className="coinbase-loading"
              alt="Coinbase"
              src="https://gem-widgets-assets.s3.us-west-2.amazonaws.com/institutions/icons/square/coinbase_square.svg"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-container">
      <h1>{Titles[currentScreenState]}</h1>

      {currentScreenState === ScreenStates.DEFAULT ? (
        <>
          <h4>Connect your exchange account to bring in your transactions.</h4>
          <ClearableInput
            placeholder="Search Exchanges"
            value={exchangeSearchValue}
            onChange={(e) => setExchangeSearchValue(e.target.value)}
            onClear={() => setExchangeSearchValue('')}
          />
          <ExchangeList
            query={exchangeSearchValue}
            onSelect={(exchange) => {
              if (exchange.id === 'coinbase') {
                return setCurrentScreenState(ScreenStates.TRANSFERRING);
                // setTimeout(
                //   () => (window.location = `https://coinbase.com`),
                //   1500
                // );
              }
              setSelectedExchange(exchange);
              setCurrentScreenState(ScreenStates.ENTER_CREDENTIALS);
            }}
          />
        </>
      ) : (
        <>
          <ExchangeHeader exchange={selectedExchange} />
          <div id="iframe-container">
            <iframe src="http://localhost:8080" id="inuit-connect" />
          </div>
          <div className="divider" />
          <div className="buttons-container">
            <Button
              className="bordered"
              onClick={() => {
                sendCloseMessage();
                setCurrentScreenState(ScreenStates.DEFAULT);
                setSelectedExchange(null);
              }}
            >
              Back
            </Button>
            <Button onClick={sendContinueMessage}>Continue</Button>
          </div>
        </>
      )}
    </div>
  );
};

const ExchangeHeader = ({ exchange }) => {
  return (
    <div className="exchange-header">
      <div className="exchange-icon-container">
        <img src={exchange.logo} alt={exchange.name} />
      </div>
      <div className="exchange-info">
        <h6>{exchange.name}</h6>
        <p>{exchange.website}</p>
      </div>
    </div>
  );
};

export default CredentialsScreen;
