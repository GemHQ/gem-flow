import React, { useState, useEffect } from 'react';
import InstitutionUserForm from '../../components/forms/InstitutionUserForm';
import InstitutionUserCard from '../../components/cards/InstitutionUserCard';
import GenericScreen from '../GenericScreen';
import { withStores } from '../../stores/StoresUtil';
import { ScreenNames, FlowIds } from '../../stores/Constants';
import ErrorMessage from '../../components/basic/errorMessage/ErrorMessage';
import { observer } from 'mobx-react';
import ConnectionForm from '../../components/forms/ConnectionForm';
import {
  startCoinbaseOauthFlow,
  getOauthCode,
  filterPaymentInstitutions,
} from '../../util/PartnerUtil';
import ConnectionCard from '../../components/cards/ConnectionCard';
import WidgetIframe from '../../components/WidgetIframe';

// as a function to avoid runtime initialization error
const ScreensByFlowId = () => ({
  [FlowIds.ONRAMP]: OnrampConnectionScreen,
  [FlowIds.TRANSFER]: TransferConnectionScreen,
});

const ConnectionScreen = ({ dataStore, uiStore }) => {
  const ScreenToRender = ScreensByFlowId()[uiStore.flowId];
  return (
    <>
      <ErrorMessage errorMessage={dataStore.errorMessage} />
      <ScreenToRender dataStore={dataStore} uiStore={uiStore} />
    </>
  );
};

const OnrampConnectionScreen = observer(({ dataStore, uiStore }) => (
  <GenericScreen
    ItemForm={InstitutionUserForm}
    numberOfItems={dataStore.institutionUsers.length}
    itemTitle="Connection"
    createItem={dataStore.createInstitutionUser}
    buttonDisabled={!dataStore.selectedUser}
    withOpenForm={uiStore.withOpenForm}
  >
    {dataStore.institutionUsers.map(institutionUser => (
      <InstitutionUserCard
        institutionUser={institutionUser}
        key={institutionUser.id}
        removeInstitutionUser={() =>
          dataStore.removeInstitutionUser(institutionUser.id)
        }
        onButtonClick={() => {
          dataStore.selectInstitutionUser(institutionUser.id);
          uiStore.setCurrentScreen(ScreenNames.ACCOUNT, { withOpenForm: true });
        }}
        onViewClick={() => {
          dataStore.selectInstitutionUser(institutionUser.id);
          uiStore.setCurrentScreen(ScreenNames.ACCOUNT, {
            withOpenForm: false,
          });
        }}
      />
    ))}
  </GenericScreen>
));

// TODO: fetch exchange connections, create exchange connection

const TransferConnectionScreen = observer(({ dataStore, uiStore }) => {
  useEffect(() => {
    const oauthCode = getOauthCode();
    if (oauthCode) dataStore.createConnection(oauthCode);
  }, []);

  const [isRedirecting, setIsRedirecting] = useState(false);
  const [iframeState, setIframeState] = useState({ show: false, institutionId: null });

  const institutionOptions = dataStore.exchangeInstitutions.map(i => ({
    value: i.id,
    label: i.name,
    className: 'TransferColor',
  }));

  return (
    <>
      {iframeState.show && <WidgetIframe institutionId={iframeState.institutionId} 
        // receiveCredentials={creds => {
        //   dataStore.receiveCredentials(creds);
        //   setIframeState({ show: false, institutionId: null })
        // }} 
        receiveCredentials={dataStore.receiveCredentials}
      />}
      <RedirectingLabel isRedirecting={isRedirecting} />
      <GenericScreen
        ItemForm={props => (
          <ConnectionForm {...props} accountOptions={institutionOptions} />
        )}
        numberOfItems={filterPaymentInstitutions(dataStore.connections).length}
        itemTitle="Connection"
        createItem={selectedOption => {
          console.log(selectedOption)
          // TODO: handle OAuth flow not just for Coinbase.
          if (selectedOption === 'coinbase') {
            setIsRedirecting(true);
            startCoinbaseOauthFlow();
          } else {
            setIframeState({ show: true, institutionId: selectedOption });
          }
        }}
        buttonDisabled={isRedirecting || !dataStore.selectedUser}
        withOpenForm={uiStore.withOpenForm}
      >
        {filterPaymentInstitutions(dataStore.connections).map(connection => (
          <ConnectionCard
            connection={connection}
            key={connection.id}
            removeConnection={() => dataStore.removeConnection(connection.id)}
            onButtonClick={() => {
              dataStore.selectConnection(connection.id);
              uiStore.setCurrentScreen(ScreenNames.ACCOUNT, {
                withOpenForm: uiStore.flowId === FlowIds.ONRAMP,
              });
            }}
            onViewClick={() => {
              dataStore.selectConnection(connection.id);
              uiStore.setCurrentScreen(ScreenNames.ACCOUNT, {
                withOpenForm: false,
              });
            }}
          />
        ))}
      </GenericScreen>
    </>
  );
});

const RedirectingLabel = ({ isRedirecting, exchangeName = 'Coinbase' }) => {
  if (isRedirecting)
    return <p className="Creating">{`Redirecting to ${exchangeName}...`}</p>;
  return null;
};

export default withStores(ConnectionScreen);
