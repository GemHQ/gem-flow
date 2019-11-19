import React, { useState, useEffect } from 'react';
import InstitutionUserForm from '../../components/forms/InstitutionUserForm';
import InstitutionUserCard from '../../components/cards/InstitutionUserCard';
import GenericScreen from '../GenericScreen';
import { withStores } from '../../stores/StoresUtil';
import { ScreenNames, FlowIds } from '../../stores/Constants';
import ErrorMessage from '../../components/basic/errorMessage/ErrorMessage';
import { observer } from 'mobx-react';
import ConnectionForm from '../../components/forms/ConnectionForm';
import { startCoinbaseOauthFlow, getOauthCode, filterPaymentInstitutions } from '../../util/PartnerUtil';
import ConnectionCard from '../../components/cards/ConnectionCard';

const ConnectionScreen = ({ dataStore, uiStore }) => (
  <>
    <ErrorMessage errorMessage={dataStore.errorMessage} />
    {
      uiStore.flowId === FlowIds.ONRAMP 
      ? <OnrampConnectionScreen dataStore={dataStore} uiStore={uiStore} /> 
      : <TransferConnectionScreen dataStore={dataStore} uiStore={uiStore} />
    }
  </>
)

const OnrampConnectionScreen = observer(({ dataStore, uiStore }) => (
  <GenericScreen
    ItemForm={InstitutionUserForm}
    numberOfItems={dataStore.institutionUsers.length}
    itemTitle="Connection"
    createItem={dataStore.createInstitutionUser}
    buttonDisabled={!dataStore.selectedUser}
    withOpenForm={uiStore.withOpenForm}
  >
  {
    dataStore.institutionUsers.map(institutionUser => (
    <InstitutionUserCard
      institutionUser={institutionUser} 
      key={institutionUser.id} 
      removeInstitutionUser={() => dataStore.removeInstitutionUser(institutionUser.id)}
      onButtonClick={() => {
        dataStore.selectInstitutionUser(institutionUser.id);
        uiStore.setCurrentScreen(ScreenNames.ACCOUNT, { withOpenForm: true });
      }}
      onViewClick={() => {
        dataStore.selectInstitutionUser(institutionUser.id);
        uiStore.setCurrentScreen(ScreenNames.ACCOUNT, { withOpenForm: false });
      }}
    />))
  }
  </GenericScreen>
))

// TODO: fetch exchange connections, create exchange connection

const TransferConnectionScreen = observer(({ dataStore, uiStore }) => {
  useEffect(() => {
    const oauthCode = getOauthCode();
    if (oauthCode) dataStore.createConnection(oauthCode);
  }, []);
  const [isRedirecting, setIsRedirecting] = useState(false);

  return (
    <>
      <RedirectingLabel isRedirecting={isRedirecting} />
      <GenericScreen
        ItemForm={ConnectionForm}
        numberOfItems={filterPaymentInstitutions(dataStore.connections).length}
        itemTitle="Connection"
        createItem={() => {
          setIsRedirecting(true);
          startCoinbaseOauthFlow();
        }}
        buttonDisabled={isRedirecting || !dataStore.selectedUser}
        withOpenForm={uiStore.withOpenForm}
      >
      {
        filterPaymentInstitutions(dataStore.connections).map(connection => (
        <ConnectionCard
          connection={connection} 
          key={connection.id} 
          removeConnection={() => dataStore.removeConnection(connection.id)}
          onButtonClick={() => {
            dataStore.selectConnection(connection.id);
            uiStore.setCurrentScreen(ScreenNames.ACCOUNT, { withOpenForm: uiStore.flowId === FlowIds.ONRAMP });
          }}
          onViewClick={() => {
            dataStore.selectConnection(connection.id);
            uiStore.setCurrentScreen(ScreenNames.ACCOUNT, { withOpenForm: false });
          }}
        />))
      }
      </GenericScreen>
    </>
  )
})

const RedirectingLabel = ({ isRedirecting, exchangeName = 'Coinbase' }) => {
  if (isRedirecting) return <p className="Creating">{`Redirecting to ${exchangeName}...`}</p>
  return null;
}

export default withStores(ConnectionScreen);