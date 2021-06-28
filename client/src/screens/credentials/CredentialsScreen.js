import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { ClearableInput } from '../../components/basic/input/Input';
import ExchangeList from './ExchangeList';
import './credentials.scss';
import Button, { BorderedButton } from '../../components/basic/button/Button';
import {
  sendContinueMessage,
  sendCloseMessage,
  setMessageSharedData,
} from '../../util/MessageUtil';
import { withStores } from '../../stores/StoresUtil';
import { ScreenNames } from '../../stores/Constants';
import { toJS } from 'mobx';
import ConnectionCard from '../../components/cards/ConnectionCard';
import { IntuiConnectURL } from '../../constants/Env';
import ErrorMessage from '../../components/basic/errorMessage/ErrorMessage';

const ScreenStates = {
  DEFAULT: 'default',
  LOADING: 'loading',
  CREATING: 'creating',
};

const ScreenTitles = {
  [ScreenStates.LOADING]: `Loading Credentials...`,
  [ScreenStates.LOADING_EXCHANGES]: `Loading Exchanges...`,
  [ScreenStates.CREATING]: `Create Credentials`,
  [ScreenStates.DEFAULT]: 'Credentials',
};

const setIframeHeight = (height) => {
  const container = document.getElementById('iframe-container');
  if (container) container.style.height = height;
};

const CredentialsScreen = ({ dataStore, uiStore }) => {
  const [connectingExchangeFormOpen, setConnectingExchangeFormOpen] = useState(
    uiStore.withOpenForm
  );
  const [exchanges, setExchanges] = useState([]);
  const [currentScreenState, setCurrentScreenState] = useState(
    uiStore.withOpenForm ? ScreenStates.LOADING_EXCHANGES : ScreenStates.LOADING
  );

  const getScreenTitle = (screenState) => {
    if (
      connectingExchangeFormOpen &&
      screenState !== ScreenStates.LOADING &&
      screenState !== ScreenStates.LOADING_EXCHANGES
    )
      return ScreenTitles[ScreenStates.CREATING];
    switch (screenState) {
      case ScreenStates.DEFAULT:
        return `${dataStore.credentials.length} Credential${
          dataStore.credentials.length === 1 ? '' : 's'
        }`;
      default:
        return ScreenTitles[screenState];
    }
  };

  const loadExchanges = async () => {
    let isLoading = false;
    const interval = setInterval(async () => {
      try {
        if (dataStore.client && !isLoading) {
          isLoading = true;
          if (uiStore.withOpenForm) {
            const { body } = await dataStore.getInstitutions();
            setExchanges(body.data);
          }
          await dataStore.getCredentials();
          if (!connectingExchangeFormOpen)
            setCurrentScreenState(ScreenStates.DEFAULT);
          if (!uiStore.withOpenForm) {
            const { body } = await dataStore.getInstitutions();
            setExchanges(body.data);
          }
          setCurrentScreenState(ScreenStates.DEFAULT);
          clearInterval(interval);
        }
      } catch (e) {
        setCurrentScreenState(ScreenStates.DEFAULT);
      }
    }, 200);
  };

  useEffect(() => {
    dataStore.clearCredentials();
    loadExchanges();
  }, []);
  return (
    <>
      <ErrorMessage />
      <div className="FlexAlignCenter SpaceBetween">
        <h2 className="ScreenHeading">{getScreenTitle(currentScreenState)}</h2>
        {currentScreenState === ScreenStates.LOADING ||
        currentScreenState === ScreenStates.LOADING_EXCHANGES ? (
          <div />
        ) : connectingExchangeFormOpen ? (
          <p
            className="Cancel"
            onClick={() => setConnectingExchangeFormOpen(false)}
          >
            Cancel
          </p>
        ) : (
          <BorderedButton
            color={uiStore.primaryColor}
            onClick={() => setConnectingExchangeFormOpen(true)}
          >{`+ Add new credentials`}</BorderedButton>
        )}
      </div>

      {connectingExchangeFormOpen &&
        currentScreenState !== ScreenStates.LOADING &&
        currentScreenState !== ScreenStates.LOADING_EXCHANGES && (
          <ExchangeForm exchanges={exchanges} dataStore={dataStore} />
        )}
      {currentScreenState !== ScreenStates.LOADING &&
        dataStore.credentials.map((credential) => (
          <ConnectionCard
            key={credential.proxyToken}
            connection={credential}
            onButtonClick={() => {
              dataStore.selectCredential({
                exchangeId: credential.exchangeId,
                proxyToken: credential.proxyToken,
              });
              uiStore.setCurrentScreen(ScreenNames.ACCOUNT);
            }}
          />
        ))}
    </>
  );
};

const FormStates = {
  DEFAULT: 'default',
  ENTER_CREDENTIALS: 'enter-credentials',
  ERROR: 'error',
  TRANSFERRING: 'transferring',
};

const ExchangeForm = ({ exchanges, dataStore }) => {
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [exchangeSearchValue, setExchangeSearchValue] = useState('');
  const [sdkUri, setSdkUri] = useState();
  const [currentFormState, setCurrentFormState] = useState(FormStates.DEFAULT);

  const Titles = {
    [FormStates.DEFAULT]: `Let's get a picture of your profits`,
    [FormStates.ENTER_CREDENTIALS]: `Enter credentials`,
    [FormStates.ERROR]: `Let's try again`,
    [FormStates.TRANSFERRING]: `Transferring you to Coinbase`,
  };

  useEffect(() => {
    const messageEventListener = (event) => {
      if (event.origin !== IntuiConnectURL) return;
      const data = JSON.parse(event.data);
      setIframeHeight(data.height);
      if (data.eventType === 'form-ready') {
        console.log('[Gem Flow] form-ready received', data);
        setMessageSharedData(data);
      }
      if (data.eventType === 'form-not-ready') {
        console.log('[Gem Flow] form-not-ready received', data);
        setMessageSharedData(data);
      }
      if (data.eventType === 'connection-error') {
        console.log('[Gem Flow] connection-error received', data);
        setCurrentFormState(FormStates.ERROR);
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
    };

    window.addEventListener('message', messageEventListener);
    // return window.removeEventListener('message', messageEventListener);
  }, []);

  if (currentFormState === FormStates.LOADING_EXCHANGES) {
    return (
      <div className="screen-container no-border">
        <div className="center">
          <h1>{Titles[currentFormState]}</h1>
        </div>
      </div>
    );
  }

  if (currentFormState === FormStates.TRANSFERRING) {
    return (
      <div className="screen-container no-border">
        <div className="center">
          <h1>{Titles[currentFormState]}</h1>
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
        <h1>{Titles[currentFormState]}</h1>

        {currentFormState === FormStates.DEFAULT ? (
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
                    setCurrentFormState(FormStates.TRANSFERRING);
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
                    setCurrentFormState(FormStates.ENTER_CREDENTIALS);
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
              <iframe src={`${IntuiConnectURL}?${sdkUri}`} id="inuit-connect" />
            </div>
            <div className="divider" />
            <div className="buttons-container">
              <Button
                className="bordered"
                onClick={() => {
                  sendCloseMessage();
                  setCurrentFormState(FormStates.DEFAULT);
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
