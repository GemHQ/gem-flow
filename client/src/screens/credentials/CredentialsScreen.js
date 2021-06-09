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
};

const Titles = {
  [ScreenStates.DEFAULT]: `Let's Get a picture of your profits`,
  [ScreenStates.ENTER_CREDENTIALS]: `Enter credentials`,
  [ScreenStates.ERROR]: `Let's try again`,
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
      console.log(event.origin);
      const data = JSON.parse(event.data);
      if (data.eventType === 'form-ready') {
        console.log('Form Ready!');
      }
      if (data.eventType === 'connection-error') {
        console.log('Connection Error!');
        setCurrentScreenState(ScreenStates.ERROR);
      }
    });
  }, []);

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
              setSelectedExchange(exchange);
              setCurrentScreenState(ScreenStates.ENTER_CREDENTIALS);
            }}
          />
        </>
      ) : (
        <>
          <ExchangeHeader exchange={selectedExchange} />
          <div className="iframe-container">
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
