import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { ClearableInput } from '../../components/basic/input/Input';
import ExchangeList from './ExchangeList';
import './credentials.scss';
import Button from '../../components/basic/button/Button';
import {
  sendContinueMessage,
  sendCloseMessage,
  setMessageSharedData,
} from '../../util/MessageUtil';
import { withFlowStore, withStores } from '../../stores/StoresUtil';
import { ScreenNames } from '../../stores/Constants';
import { toJS } from 'mobx';
import ConnectionCard from '../../components/cards/ConnectionCard';
import { connection } from '../../stories/3-Cards.stories';

const ScreenStates = {
  DEFAULT: 'default',
  ENTER_CREDENTIALS: 'enter-credentials',
  ERROR: 'error',
  TRANSFERRING: 'transferring',
  LOADING_EXCHANGES: 'loading-exchanges',
};

const Titles = {
  [ScreenStates.DEFAULT]: `Let's get a picture of your profits`,
  [ScreenStates.ENTER_CREDENTIALS]: `Enter credentials`,
  [ScreenStates.ERROR]: `Let's try again`,
  [ScreenStates.TRANSFERRING]: `Transferring you to Coinbase`,
  [ScreenStates.LOADING_EXCHANGES]: `Loading Exchanges...`,
};

const setIframeHeight = (height) => {
  const container = document.getElementById('iframe-container');
  if (container) container.style.height = height;
};

const CredentialsScreen = ({ dataStore, uiStore }) => {
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [currentScreenState, setCurrentScreenState] = useState(
    ScreenStates.LOADING_EXCHANGES
  );
  const [exchangeSearchValue, setExchangeSearchValue] = useState('');
  const [exchanges, setExchanges] = useState([]);
  const [sdkUri, setSdkUri] = useState();

  const loadExchanges = async () => {
    let isLoading = false;
    const interval = setInterval(async () => {
      try {
        if (dataStore.client && !isLoading) {
          isLoading = true;
          dataStore.getCredentials();
          const { body } = await dataStore.getInstitutions();
          console.log('exchanges', body);
          setExchanges(body.data);
          setTimeout(() => setCurrentScreenState(ScreenStates.DEFAULT), 0);
          clearInterval(interval);
        }
      } catch (e) {}
    }, 1000);
  };

  useEffect(() => {
    loadExchanges();

    window.addEventListener('message', (event) => {
      if (event.origin !== 'http://localhost:8080') return;
      const data = JSON.parse(event.data);
      setIframeHeight(data.height);
      if (data.eventType === 'form-ready') {
        console.log('[Gem Flow] form-ready received', data);
        setMessageSharedData(data);
      }
      if (data.eventType === 'connection-error') {
        console.log('[Gem Flow] connection-error received', data);
        setCurrentScreenState(ScreenStates.ERROR);
      }
      if (data.eventType === 'connection-success') {
        console.log('[Gem Flow] connection-success received', data);
        dataStore.selectCredential({
          exchangeId: data.exchangeId,
          proxyToken: data.code,
        });
        console.log('[GemFlow] credential', toJS(dataStore.selectedCredential));
        dataStore.getAccounts();
        uiStore.setCurrentScreen(ScreenNames.ACCOUNT);
      }
      // return window.removeEventListener('message');
    });
  }, []);

  if (currentScreenState === ScreenStates.LOADING_EXCHANGES) {
    return (
      <div className="screen-container no-border">
        <div className="center">
          <h1>{Titles[currentScreenState]}</h1>
        </div>
      </div>
    );
  }

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
    <>
      <div className="screen-container">
        <h1>{Titles[currentScreenState]}</h1>

        {currentScreenState === ScreenStates.DEFAULT ? (
          <>
            <h4>
              Connect your exchange account to bring in your transactions.
            </h4>
            <ClearableInput
              placeholder="Search Exchanges"
              value={exchangeSearchValue}
              onChange={(e) => setExchangeSearchValue(e.target.value)}
              onClear={() => setExchangeSearchValue('')}
            />
            <ExchangeList
              exchanges={exchanges}
              query={exchangeSearchValue}
              onSelect={async (exchange) => {
                if (exchange.id === 'coinbase') {
                  try {
                    setCurrentScreenState(ScreenStates.TRANSFERRING);
                    const { body } =
                      await dataStore.getCoinbaseAuthorizationURI();
                    console.log('authorizationUri', body.authorizationUri);
                    setTimeout(
                      () => (window.location = body.authorizationUri),
                      1000
                    );
                  } catch (e) {}
                } else {
                  try {
                    const { body } = await dataStore.getSdkUri({
                      exchangeId: exchange.id,
                    });
                    const sdkUri = queryString.extract(body.data.sdkUri);
                    setSdkUri(sdkUri);
                    console.log('sdy uri', sdkUri);
                    setSelectedExchange(exchange);
                    setCurrentScreenState(ScreenStates.ENTER_CREDENTIALS);
                  } catch (e) {
                    console.error(e);
                  }
                }
              }}
            />
          </>
        ) : (
          <>
            <ExchangeHeader exchange={selectedExchange} />
            <div id="iframe-container">
              <iframe
                src={`http://localhost:8080?${sdkUri}`}
                id="inuit-connect"
              />
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
      {dataStore.credentials.map((credential) => (
        <ConnectionCard
          key={credential.proxyToken}
          connection={credential}
          onButtonClick={() => {
            dataStore.selectCredential({
              exchangeId: connection.exchangeId,
              proxyToken: connection.proxyToken,
            });
            dataStore.getAccounts();
            uiStore.setCurrentScreen(ScreenNames.ACCOUNT);
          }}
        />
      ))}
    </>
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

export default withStores(CredentialsScreen);
